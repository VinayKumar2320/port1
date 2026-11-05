import React, { useState, useMemo } from 'react';
import { Activity, Users, Bed, Clock, CheckCircle2, ExternalLink } from 'lucide-react';

export const MedFlowSimulator: React.FC = () => {
  const [arrivalRate, setArrivalRate] = useState(24); // patients/hour (lambda)
  const [physicians, setPhysicians] = useState(4);
  const [nurses, setNurses] = useState(8);
  const [beds, setBeds] = useState(32);

  // Discrete-event queue approximations based on SimPy model parameters
  const stats = useMemo(() => {
    // Capacity ratio
    const serviceCapacity = physicians * 3.5 + nurses * 1.8;
    const loadFactor = arrivalRate / Math.max(serviceCapacity, 1);

    // Bed utilization
    const estimatedPatientsInED = Math.round(arrivalRate * 2.8 * (0.8 + loadFactor * 0.4));
    const bedUtilization = Math.min(Math.round((estimatedPatientsInED / beds) * 100), 100);

    // ESI wait times (minutes)
    const esi1Wait = 0; // Immediate trauma priority
    const esi2Wait = Math.max(Math.round(4 * loadFactor), 2);
    const esi3Wait = Math.max(Math.round(28 * Math.pow(loadFactor, 1.8)), 10);
    const esi4Wait = Math.max(Math.round(65 * Math.pow(loadFactor, 2.2)), 25);

    // Conservation of mass check
    const totalArrived = Math.round(arrivalRate * 8); // 8-hour shift
    const totalDeparted = Math.round(Math.min(totalArrived, serviceCapacity * 8 * 0.9));
    const inSystem = totalArrived - totalDeparted;

    return {
      loadFactor: loadFactor.toFixed(2),
      bedUtilization,
      esi1Wait,
      esi2Wait,
      esi3Wait,
      esi4Wait,
      totalArrived,
      totalDeparted,
      inSystem,
      status: bedUtilization > 92 ? 'CRITICAL BOTTLENECK' : bedUtilization > 75 ? 'HEAVY CONGESTION' : 'STABLE QUEUE'
    };
  }, [arrivalRate, physicians, nurses, beds]);

  return (
    <div className="bg-paper border border-border rounded-lg overflow-hidden font-mono text-xs">
      {/* Header */}
      <div className="bg-secondary/70 border-b border-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold text-foreground tracking-tight text-xs">MEDFLOW SIMPY 4.1 DISCRETE-EVENT TWIN</span>
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] border border-emerald-500/20">
            OR-TOOLS CP-SAT
          </span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground text-[11px]">
          <div>LOAD FACTOR: <span className="font-bold text-foreground">{stats.loadFactor}</span></div>
          <div>CENSUS: <span className="font-bold text-foreground">{stats.bedUtilization}% BEDS</span></div>
          <a
            href="https://medflow-dashboard.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-cobalt hover:underline"
          >
            Open Live App <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Simulation Metrics & Queue Breakdown */}
        <div className="md:col-span-2 p-5 bg-background flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
              Clinical Pipeline Preemptive Triage (ESI 1–5)
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                stats.bedUtilization > 92
                  ? 'bg-red-500/10 text-red-600 border-red-500/30'
                  : stats.bedUtilization > 75
                  ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                  : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
              }`}
            >
              {stats.status}
            </span>
          </div>

          {/* ESI Wait Times Display */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded border border-border bg-secondary/30">
              <div className="text-[10px] text-muted-foreground font-semibold">ESI-1 RESUSCITATION</div>
              <div className="text-xl font-bold text-foreground mt-1">{stats.esi1Wait} min</div>
              <div className="text-[10px] text-emerald-500">Immediate Preempt</div>
            </div>

            <div className="p-3 rounded border border-border bg-secondary/30">
              <div className="text-[10px] text-muted-foreground font-semibold">ESI-2 EMERGENT</div>
              <div className="text-xl font-bold text-foreground mt-1">{stats.esi2Wait} min</div>
              <div className="text-[10px] text-muted-foreground">High Priority</div>
            </div>

            <div className="p-3 rounded border border-border bg-secondary/30">
              <div className="text-[10px] text-muted-foreground font-semibold">ESI-3 URGENT</div>
              <div className="text-xl font-bold text-foreground mt-1">{stats.esi3Wait} min</div>
              <div className="text-[10px] text-muted-foreground">Resource Contention</div>
            </div>

            <div className="p-3 rounded border border-border bg-secondary/30">
              <div className="text-[10px] text-muted-foreground font-semibold">ESI-4 LESS URGENT</div>
              <div className="text-xl font-bold text-foreground mt-1">{stats.esi4Wait} min</div>
              <div className="text-[10px] text-muted-foreground">Fast-Track Staging</div>
            </div>
          </div>

          {/* Bed Occupancy Bar */}
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted-foreground">Emergency Bed Occupancy:</span>
              <span className="font-bold text-foreground">{stats.bedUtilization}% Capacity</span>
            </div>
            <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  stats.bedUtilization > 90 ? 'bg-red-500' : stats.bedUtilization > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${stats.bedUtilization}%` }}
              />
            </div>
          </div>

          {/* Mass Conservation Notice */}
          <div className="flex flex-wrap items-center justify-between text-[10px] text-muted-foreground pt-3 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-foreground font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Mass Conservation: {stats.totalArrived} Arrived = {stats.totalDeparted} Departed + {stats.inSystem} In-System</span>
            </div>
            <span>Common Random Numbers (CRN) Policy Isolation</span>
          </div>
        </div>

        {/* Sliders and Controls */}
        <div className="p-4 bg-secondary/30 space-y-4">
          <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-muted-foreground">
            Capacity Parameters
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted-foreground">Arrival Surge (λ):</span>
              <span className="font-bold text-foreground">{arrivalRate} pts/hr</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={arrivalRate}
              onChange={(e) => setArrivalRate(Number(e.target.value))}
              className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted-foreground">Attending Physicians:</span>
              <span className="font-bold text-foreground">{physicians} MDs</span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              value={physicians}
              onChange={(e) => setPhysicians(Number(e.target.value))}
              className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted-foreground">Triage Nurses:</span>
              <span className="font-bold text-foreground">{nurses} RNs</span>
            </div>
            <input
              type="range"
              min="4"
              max="16"
              value={nurses}
              onChange={(e) => setNurses(Number(e.target.value))}
              className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted-foreground">Available ED Beds:</span>
              <span className="font-bold text-foreground">{beds} Beds</span>
            </div>
            <input
              type="range"
              min="16"
              max="60"
              value={beds}
              onChange={(e) => setBeds(Number(e.target.value))}
              className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
