import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Download, ArrowDown, Sparkles, ExternalLink, ShieldCheck, Activity } from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
  onToggleRecruiterMode: () => void;
  isRecruiterMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenTerminal,
  onToggleRecruiterMode,
  isRecruiterMode,
}) => {
  const [draggedCount, setDraggedCount] = useState(0);

  const physicsBadges = [
    { id: 'nyu', label: '🗽 NYU Tandon MS CS', bg: 'bg-purple-600/10 text-purple-700 dark:text-purple-300 border-purple-500/30' },
    { id: 'graph', label: '⚡ Graph Intelligence (PyG)', bg: 'bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-500/30' },
    { id: 'sim', label: '🏥 SimPy 4.1 Digital Twin', bg: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' },
    { id: 'agent', label: '🧠 LangGraph Autonomous Agent', bg: 'bg-orange-600/10 text-orange-700 dark:text-orange-300 border-orange-500/30' },
    { id: 'kafka', label: '🚀 Apache Kafka Streaming', bg: 'bg-slate-700/10 text-slate-800 dark:text-slate-200 border-slate-600/30' },
    { id: 'shap', label: '📊 TreeSHAP + XGBoost', bg: 'bg-amber-600/10 text-amber-700 dark:text-amber-300 border-amber-500/30' },
    { id: 'trainium', label: '🔬 AWS Trainium2 & SymPy', bg: 'bg-cyan-600/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30' },
    { id: 'cv', label: '🛰️ Computer Vision & AR', bg: 'bg-rose-600/10 text-rose-700 dark:text-rose-300 border-rose-500/30' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border overflow-hidden bg-background">
      {/* Blueprint Grid Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-70 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* System Telemetry Bar */}
        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded border border-border bg-card shadow-sm font-mono text-xs text-muted-foreground mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-semibold text-foreground">VINAY.EXE // v2.6.0</span>
          <span className="text-border">|</span>
          <span>NYU TANDON CS</span>
          <span className="text-border">|</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">SEEKING NEW GRAD ROLES</span>
          <span className="text-border hidden sm:inline">|</span>
          <span className="text-cobalt font-semibold hidden sm:inline">PLAYGROUND ACTIVE</span>
        </div>

        {/* Main Headline */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground font-display leading-[1.08]">
            I build systems that <span className="underline decoration-cobalt decoration-4 underline-offset-8">think</span>,{' '}
            <span className="text-cobalt">simulate</span>, predict, and scale.
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl font-normal">
            <span className="text-foreground font-semibold">Vinay Kumar</span> — Graduate student at{' '}
            <span className="text-foreground font-semibold">NYU Tandon School of Engineering</span>. Building at the intersection of{' '}
            <span className="text-foreground font-medium">Distributed Systems</span>,{' '}
            <span className="text-foreground font-medium">Graph Intelligence</span>, and{' '}
            <span className="text-foreground font-medium">Simulation Engineering</span>. <span className="text-foreground font-semibold">Currently seeking New Grad roles in Software Engineering & AI/ML Systems.</span>
          </p>
        </div>

        {/* Physics Playground Area */}
        <div className="my-10 p-5 rounded-xl border border-border bg-card/60 backdrop-blur-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="uppercase tracking-wider font-semibold text-foreground">Interactive Physics Sandbox</span>
              <span className="text-[10px] hidden sm:inline">(Drag & fling items to inspect core domains)</span>
            </div>
            <div className="text-[11px]">
              INTERACTIONS: <span className="font-bold text-foreground font-mono">{draggedCount}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 py-4 min-h-[90px] items-center">
            {physicsBadges.map((badge) => (
              <motion.div
                key={badge.id}
                drag
                dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
                dragElastic={0.4}
                whileHover={{ scale: 1.06, cursor: 'grab' }}
                whileTap={{ scale: 0.96, cursor: 'grabbing' }}
                onDragStart={() => setDraggedCount((c) => c + 1)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-medium shadow-sm select-none transition-shadow ${badge.bg}`}
              >
                {badge.label}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="px-6 py-3 rounded-lg bg-cobalt hover:bg-cobalt-dark text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all"
          >
            <span>Explore Engineering Lab</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenTerminal}
            className="px-5 py-3 rounded-lg border border-border bg-card hover:bg-secondary text-foreground font-mono text-sm font-medium flex items-center gap-2 shadow-sm transition-all"
          >
            <Terminal className="w-4 h-4 text-cobalt" />
            <span>Open Terminal (`~`)</span>
          </button>

          <button
            type="button"
            onClick={onToggleRecruiterMode}
            className="px-5 py-3 rounded-lg border border-border bg-card hover:bg-secondary text-foreground text-sm font-medium flex items-center gap-2 shadow-sm transition-all"
          >
            <Activity className="w-4 h-4 text-emerald-500" />
            <span>Recruiter Mode {isRecruiterMode ? '(ON)' : '(OFF)'}</span>
          </button>

          <a
            href="/Vinay_Kumar_Resume.pdf"
            download="Vinay_Kumar_Resume.pdf"
            className="px-5 py-3 rounded-lg border border-border bg-card hover:bg-secondary text-muted-foreground hover:text-foreground text-sm font-medium flex items-center gap-2 transition-all ml-auto"
          >
            <Download className="w-4 h-4" />
            <span>Resume PDF</span>
          </a>
        </div>

        {/* Real Verified Telemetry Stats */}
        <div className="mt-14 pt-8 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-6 font-mono">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground">35</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Audited GitHub Repos</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground">1 Patent</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">AI & IoT Irrigation</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground">8 Papers</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Peer-Reviewed Publications</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-500">3 Demos</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">Live Production Endpoints</div>
          </div>
        </div>
      </div>
    </section>
  );
};
