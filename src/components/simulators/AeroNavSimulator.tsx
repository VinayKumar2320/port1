import React, { useState, useMemo, useEffect } from 'react';
import { Compass, Navigation, Zap, ExternalLink, ShieldCheck, AlertTriangle, Play, RefreshCw, Cpu, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

export const AeroNavSimulator: React.FC = () => {
  const [scenario, setScenario] = useState<'dense' | 'narrow' | 'pylons'>('dense');
  const [noiseLevel, setNoiseLevel] = useState<'low' | 'moderate' | 'severe'>('moderate');
  const [planner, setPlanner] = useState<'uncertainty_aware' | 'baseline'>('uncertainty_aware');
  const [flightProgress, setFlightProgress] = useState(0);
  const [isFlying, setIsFlying] = useState(true);

  // Auto-advance flight position
  useEffect(() => {
    if (!isFlying) return;
    const interval = setInterval(() => {
      setFlightProgress((prev) => (prev >= 100 ? 0 : prev + 2.5));
    }, 80);
    return () => clearInterval(interval);
  }, [isFlying]);

  // Compute flight statistics & obstacles
  const simulation = useMemo(() => {
    const isAeroNav = planner === 'uncertainty_aware';

    // Obstacle layouts based on scenario
    let obstacles = [
      { x: 30, y: 35, r: 10, label: 'OBS_01' },
      { x: 50, y: 65, r: 12, label: 'OBS_02' },
      { x: 70, y: 40, r: 10, label: 'OBS_03' },
    ];

    if (scenario === 'narrow') {
      obstacles = [
        { x: 45, y: 25, r: 15, label: 'CHOKE_L' },
        { x: 45, y: 75, r: 15, label: 'CHOKE_R' },
        { x: 75, y: 45, r: 10, label: 'DEFLECT' },
      ];
    } else if (scenario === 'pylons') {
      obstacles = [
        { x: 25, y: 50, r: 8, label: 'PYLON_1' },
        { x: 50, y: 30, r: 9, label: 'PYLON_2' },
        { x: 75, y: 65, r: 8, label: 'PYLON_3' },
      ];
    }

    // Noise parameters
    const noiseMap = {
      low: { sigmaD: 0.2, desc: 'Ideal Depth Observation (σ_d = 0.2)' },
      moderate: { sigmaD: 0.8, desc: 'Moderate Ambient Noise (σ_d = 0.8)' },
      severe: { sigmaD: 1.8, desc: 'Severe Range-Squared Blur (σ_z² ∝ z⁴)' },
    };

    // Trajectory waypoints
    let waypoints: { x: number; y: number }[] = [];
    let hasCollision = false;
    let collisionPoint: { x: number; y: number } | null = null;

    if (isAeroNav) {
      // Uncertainty-aware path: smooth wide arc with adaptive safety inflation
      if (scenario === 'dense') {
        waypoints = [
          { x: 10, y: 50 },
          { x: 25, y: 68 },
          { x: 50, y: 32 },
          { x: 72, y: 72 },
          { x: 92, y: 50 },
        ];
      } else if (scenario === 'narrow') {
        waypoints = [
          { x: 10, y: 50 },
          { x: 30, y: 50 },
          { x: 45, y: 50 }, // perfectly centered in the chokepoint
          { x: 65, y: 30 },
          { x: 92, y: 50 },
        ];
      } else {
        waypoints = [
          { x: 10, y: 30 },
          { x: 35, y: 70 },
          { x: 65, y: 20 },
          { x: 92, y: 50 },
        ];
      }
    } else {
      // Conventional baseline A*: cuts corners close to obstacles
      if (scenario === 'dense') {
        waypoints = [
          { x: 10, y: 50 },
          { x: 32, y: 44 }, // grazes OBS_01
          { x: 52, y: 54 }, // grazes OBS_02
          { x: 70, y: 48 },
          { x: 92, y: 50 },
        ];
        if (noiseLevel !== 'low') {
          hasCollision = true;
          collisionPoint = { x: 33, y: 43 }; // corner collision
        }
      } else if (scenario === 'narrow') {
        waypoints = [
          { x: 10, y: 50 },
          { x: 44, y: 38 }, // clips CHOKE_L corner
          { x: 60, y: 48 },
          { x: 92, y: 50 },
        ];
        if (noiseLevel !== 'low') {
          hasCollision = true;
          collisionPoint = { x: 44, y: 38 };
        }
      } else {
        waypoints = [
          { x: 10, y: 30 },
          { x: 26, y: 43 }, // clips PYLON_1
          { x: 52, y: 38 },
          { x: 92, y: 50 },
        ];
        if (noiseLevel === 'severe') {
          hasCollision = true;
          collisionPoint = { x: 26, y: 43 };
        }
      }
    }

    // Interpolate current drone position along waypoints
    const totalSegments = waypoints.length - 1;
    const progressNorm = flightProgress / 100;
    const currentSegmentFloat = progressNorm * totalSegments;
    const currentSegmentIndex = Math.min(Math.floor(currentSegmentFloat), totalSegments - 1);
    const segmentT = currentSegmentFloat - currentSegmentIndex;

    const p0 = waypoints[currentSegmentIndex];
    const p1 = waypoints[currentSegmentIndex + 1];

    const dronePos = {
      x: p0.x + (p1.x - p0.x) * segmentT,
      y: p0.y + (p1.y - p0.y) * segmentT,
    };

    // Calculate heading angle
    const angleRad = Math.atan2(p1.y - p0.y, p1.x - p0.x);
    const angleDeg = (angleRad * 180) / Math.PI;

    return {
      isAeroNav,
      obstacles,
      noiseInfo: noiseMap[noiseLevel],
      waypoints,
      dronePos,
      headingDeg: angleDeg,
      hasCollision,
      collisionPoint,
      successRate: isAeroNav ? '100.0%' : noiseLevel === 'low' ? '85.0%' : '33.3%',
      collisionRate: isAeroNav ? '0.0%' : noiseLevel === 'low' ? '15.0%' : '66.7%',
      meanClearance: isAeroNav ? '1.45 m' : '1.15 m',
      raycastLatency: '1.16 ms',
      cSpeedup: '306.5x',
      searchLatency: '82.5 µs',
      status: isAeroNav
        ? 'NOMINAL FLIGHT // 100% COLLISION FREE'
        : hasCollision
        ? 'FATAL CORNER-CUT COLLISION (PERCEPTION UNCERTAINTY)'
        : 'MARGINAL CLEARANCE',
    };
  }, [scenario, noiseLevel, planner, flightProgress]);

  // Generate SVG path string from waypoints
  const pathD = useMemo(() => {
    return simulation.waypoints.reduce((acc, pt, i) => {
      return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
    }, '');
  }, [simulation.waypoints]);

  return (
    <div className="bg-paper border border-border rounded-lg overflow-hidden font-mono text-xs">
      {/* Header */}
      <div className="bg-secondary/70 border-b border-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-cyan-500 animate-pulse" />
          <span className="font-semibold text-foreground tracking-tight text-xs">
            AERONAV 3D CLOSED-LOOP QUADROTOR DIGITAL TWIN
          </span>
          <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] border border-cyan-500/20">
            C++17 FASTVOXELMAP // 306.5X ACCELERATION
          </span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground text-[11px]">
          <div>
            RAYCAST: <span className="font-bold text-foreground">{simulation.raycastLatency}</span>
          </div>
          <div>
            COLLISION RISK:{' '}
            <span
              className={`font-bold ${
                simulation.collisionRate === '0.0%' ? 'text-emerald-500' : 'text-red-500'
              }`}
            >
              {simulation.collisionRate}
            </span>
          </div>
          <a
            href="https://VinayKumar2320.github.io/AeroNav-Uncertainty-Aware-Drone-Navigation/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-cobalt hover:underline font-bold"
          >
            Launch 3D Web Lab <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Interactive Radar Flight View */}
        <div className="lg:col-span-2 p-5 bg-background flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-cobalt" />
              <span>Simulated 2.5D Occupancy Voxel Grid & FOV Perception Horizon</span>
            </div>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                simulation.collisionRate === '0.0%'
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
                  : 'bg-red-500/10 text-red-600 border-red-500/30'
              }`}
            >
              {simulation.status}
            </span>
          </div>

          {/* SVG Flight Arena */}
          <div className="relative w-full h-56 sm:h-64 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden select-none">
            {/* Grid Lines */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full relative z-10">
              <defs>
                {/* Glow filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="fovGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Obstacles with Range Uncertainty Halos */}
              {simulation.obstacles.map((obs, idx) => (
                <g key={idx}>
                  {/* Outer Uncertainty Halo (scaled by distance variance model) */}
                  <circle
                    cx={obs.x}
                    cy={obs.y}
                    r={obs.r + (simulation.isAeroNav ? 4 : 1)}
                    fill={simulation.isAeroNav ? '#10b981' : '#f59e0b'}
                    fillOpacity={simulation.isAeroNav ? '0.12' : '0.18'}
                    stroke={simulation.isAeroNav ? '#10b981' : '#f59e0b'}
                    strokeWidth="0.5"
                    strokeDasharray="1.5 1.5"
                  />
                  {/* Solid Voxel Obstacle Core */}
                  <circle
                    cx={obs.x}
                    cy={obs.y}
                    r={obs.r}
                    fill="#1e293b"
                    stroke="#475569"
                    strokeWidth="1"
                  />
                  <text
                    x={obs.x}
                    y={obs.y + 1}
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="2.8"
                    fontFamily="monospace"
                  >
                    {obs.label}
                  </text>
                </g>
              ))}

              {/* Flight Trajectory Path */}
              <path
                d={pathD}
                fill="none"
                stroke={simulation.isAeroNav ? '#10b981' : simulation.hasCollision ? '#ef4444' : '#f59e0b'}
                strokeWidth="1.2"
                strokeDasharray="2 1"
                filter="url(#glow)"
              />

              {/* Waypoints */}
              {simulation.waypoints.map((wp, i) => (
                <circle
                  key={i}
                  cx={wp.x}
                  cy={wp.y}
                  r="1.2"
                  fill={i === 0 ? '#38bdf8' : i === simulation.waypoints.length - 1 ? '#4ade80' : '#64748b'}
                />
              ))}

              {/* Start & Goal Labels */}
              <text x="7" y="55" fill="#38bdf8" fontSize="3" fontWeight="bold">START</text>
              <text x="84" y="55" fill="#4ade80" fontSize="3" fontWeight="bold">GOAL</text>

              {/* Collision Marker if applicable */}
              {simulation.hasCollision && simulation.collisionPoint && (
                <g transform={`translate(${simulation.collisionPoint.x}, ${simulation.collisionPoint.y})`}>
                  <circle r="3.5" fill="#ef4444" fillOpacity="0.4" className="animate-ping" />
                  <circle r="2" fill="#ef4444" />
                  <text x="3" y="-1" fill="#ef4444" fontSize="2.8" fontWeight="bold">
                    COLLISION DETECTED
                  </text>
                </g>
              )}

              {/* Moving Drone Representation */}
              <g
                transform={`translate(${simulation.dronePos.x}, ${simulation.dronePos.y}) rotate(${simulation.headingDeg})`}
              >
                {/* Visual Perception FOV Cone (Pinhole Stereo Camera) */}
                <polygon
                  points="0,0 20,-10 20,10"
                  fill="url(#fovGrad)"
                  stroke="#38bdf8"
                  strokeWidth="0.4"
                  strokeOpacity="0.6"
                />

                {/* Quadrotor Cross Arms */}
                <line x1="-3" y1="-3" x2="3" y2="3" stroke="#38bdf8" strokeWidth="0.8" />
                <line x1="-3" y1="3" x2="3" y2="-3" stroke="#38bdf8" strokeWidth="0.8" />

                {/* 4 Rotors */}
                <circle cx="-3" cy="-3" r="1.1" fill="#0284c7" />
                <circle cx="3" cy="-3" r="1.1" fill="#0284c7" />
                <circle cx="-3" cy="3" r="1.1" fill="#0284c7" />
                <circle cx="3" cy="3" r="1.1" fill="#0284c7" />

                {/* Central Body Avionics */}
                <circle cx="0" cy="0" r="1.4" fill="#f8fafc" />
              </g>
            </svg>

            {/* In-Canvas Telemetry HUD */}
            <div className="absolute top-2 left-3 z-20 flex items-center gap-3 font-mono text-[9px] text-slate-400">
              <div>
                POS: <span className="text-white">({simulation.dronePos.x.toFixed(1)}, {simulation.dronePos.y.toFixed(1)}) m</span>
              </div>
              <div>
                HDG: <span className="text-white">{Math.round(simulation.headingDeg)}°</span>
              </div>
              <div className="hidden sm:block">
                CLEARANCE: <span className="text-emerald-400 font-bold">{simulation.meanClearance}</span>
              </div>
            </div>

            <div className="absolute bottom-2 right-3 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFlying(!isFlying)}
                className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-white font-mono text-[10px] flex items-center gap-1 border border-slate-700"
              >
                {isFlying ? <RefreshCw className="w-2.5 h-2.5 animate-spin" /> : <Play className="w-2.5 h-2.5" />}
                <span>{isFlying ? 'Pause Flight' : 'Resume Flight'}</span>
              </button>
            </div>
          </div>

          {/* Benchmark Comparison Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-border">
            <div className="p-2 rounded bg-secondary/30 border border-border">
              <div className="text-[10px] text-muted-foreground uppercase">Goal Success</div>
              <div className="text-sm font-bold text-foreground mt-0.5">{simulation.successRate}</div>
              <div className="text-[9px] text-muted-foreground">Dense field evaluation</div>
            </div>
            <div className="p-2 rounded bg-secondary/30 border border-border">
              <div className="text-[10px] text-muted-foreground uppercase">Collision Rate</div>
              <div
                className={`text-sm font-bold mt-0.5 ${
                  simulation.collisionRate === '0.0%' ? 'text-emerald-500' : 'text-red-500'
                }`}
              >
                {simulation.collisionRate}
              </div>
              <div className="text-[9px] text-muted-foreground">0% with adaptive inflation</div>
            </div>
            <div className="p-2 rounded bg-secondary/30 border border-border">
              <div className="text-[10px] text-muted-foreground uppercase">C++17 Raycasting</div>
              <div className="text-sm font-bold text-cobalt mt-0.5">{simulation.raycastLatency}</div>
              <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">
                {simulation.cSpeedup} faster than Python
              </div>
            </div>
            <div className="p-2 rounded bg-secondary/30 border border-border">
              <div className="text-[10px] text-muted-foreground uppercase">Native 3D A*</div>
              <div className="text-sm font-bold text-foreground mt-0.5">{simulation.searchLatency}</div>
              <div className="text-[9px] text-muted-foreground">100×60×20 grid search</div>
            </div>
          </div>
        </div>

        {/* Configuration Controls & Technical Diagnostics */}
        <div className="p-5 bg-card flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="text-[11px] font-bold text-foreground uppercase tracking-wider pb-1 border-b border-border flex items-center justify-between">
              <span>Simulation Controls</span>
              <Cpu className="w-3.5 h-3.5 text-cobalt" />
            </div>

            {/* Planner Toggle */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-muted-foreground font-semibold flex items-center justify-between">
                <span>Motion Planner</span>
                <span className="text-cobalt font-bold">
                  {planner === 'uncertainty_aware' ? 'AeroNav (Risk-Weighted)' : 'Conventional A*'}
                </span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setPlanner('uncertainty_aware');
                    setFlightProgress(0);
                  }}
                  className={`py-1.5 px-2 rounded text-[11px] font-bold text-center border transition-all ${
                    planner === 'uncertainty_aware'
                      ? 'bg-cobalt text-white border-cobalt shadow-sm'
                      : 'bg-secondary text-muted-foreground border-border hover:text-foreground'
                  }`}
                >
                  AeroNav (Ours)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPlanner('baseline');
                    setFlightProgress(0);
                  }}
                  className={`py-1.5 px-2 rounded text-[11px] font-bold text-center border transition-all ${
                    planner === 'baseline'
                      ? 'bg-slate-700 text-white border-slate-600 shadow-sm'
                      : 'bg-secondary text-muted-foreground border-border hover:text-foreground'
                  }`}
                >
                  Baseline A*
                </button>
              </div>
            </div>

            {/* Environment Scenario */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-muted-foreground font-semibold">
                Obstacle Field
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(['dense', 'narrow', 'pylons'] as const).map((sc) => (
                  <button
                    key={sc}
                    type="button"
                    onClick={() => {
                      setScenario(sc);
                      setFlightProgress(0);
                    }}
                    className={`py-1 px-1.5 rounded text-[10px] font-medium uppercase border transition-all ${
                      scenario === sc
                        ? 'bg-foreground text-background font-bold border-foreground'
                        : 'bg-secondary text-muted-foreground border-border hover:text-foreground'
                    }`}
                  >
                    {sc}
                  </button>
                ))}
              </div>
            </div>

            {/* Perception Degradation Noise Level */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase text-muted-foreground font-semibold flex items-center justify-between">
                <span>Perception Degradation</span>
                <span className="text-foreground">{noiseLevel.toUpperCase()}</span>
              </label>
              <div className="grid grid-cols-3 gap-1">
                {(['low', 'moderate', 'severe'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      setNoiseLevel(lvl);
                      setFlightProgress(0);
                    }}
                    className={`py-1 px-1.5 rounded text-[10px] font-medium uppercase border transition-all ${
                      noiseLevel === lvl
                        ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border-amber-500/40'
                        : 'bg-secondary text-muted-foreground border-border hover:text-foreground'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground italic mt-1">
                {simulation.noiseInfo.desc}
              </p>
            </div>

            {/* Research Insight Callout */}
            <div className="p-3 rounded-lg border border-border bg-secondary/20 text-[11px] space-y-1">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cobalt" />
                <span>The Perception Uncertainty Problem</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Stereo triangulation variance scales quartically: <code className="text-foreground">σ_z² ∝ z⁴</code>. Conventional planners graze noisy boundaries and collide. AeroNav computes voxel risk-weights to guarantee clearance.
              </p>
            </div>
          </div>

          {/* CTA Link to Full Live 3D Laboratory */}
          <div className="pt-3 border-t border-border">
            <a
              href="https://VinayKumar2320.github.io/AeroNav-Uncertainty-Aware-Drone-Navigation/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-lg bg-cobalt hover:bg-cobalt-dark text-white font-semibold flex items-center justify-center gap-2 text-xs shadow-sm transition-all"
            >
              <span>Explore Interactive 3D Web Lab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
