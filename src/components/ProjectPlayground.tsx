import React, { useState } from 'react';
import { PROJECTS, Project } from '@/data/projects';
import { FraudGraphSimulator } from './simulators/FraudGraphSimulator';
import { MedFlowSimulator } from './simulators/MedFlowSimulator';
import { CodeImpactSimulator } from './simulators/CodeImpactSimulator';
import {
  Layers,
  Cpu,
  GitBranch,
  Calendar,
  ExternalLink,
  Github,
  CheckCircle2,
  SlidersHorizontal,
  Table,
  Workflow,
  Sparkles,
} from 'lucide-react';

export const ProjectPlayground: React.FC = () => {
  const [activeView, setActiveView] = useState<'gallery' | 'blueprint' | 'timeline' | 'recruiter'>('gallery');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('fraudgraph');

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const activeProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-border bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cobalt mb-3">
              <span className="w-2 h-2 rounded-full bg-cobalt inline-block" />
              SECTION 02 // ENGINEERING LABORATORY
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
              The Project Playground
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-2 max-w-2xl">
              Deterministic architectures, graph intelligence, and operations research. Not toy tutorials—enterprise systems engineered to think, simulate, and scale.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-lg border border-border bg-secondary/50 font-mono text-xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveView('gallery')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                activeView === 'gallery'
                  ? 'bg-card text-foreground font-semibold shadow-sm border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive Gallery</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('blueprint')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                activeView === 'blueprint'
                  ? 'bg-card text-foreground font-semibold shadow-sm border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" />
              <span>Blueprint</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('timeline')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                activeView === 'timeline'
                  ? 'bg-card text-foreground font-semibold shadow-sm border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveView('recruiter')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                activeView === 'recruiter'
                  ? 'bg-card text-foreground font-semibold shadow-sm border border-border'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Recruiter Grid</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
          {[
            { id: 'all', label: 'ALL SYSTEMS' },
            { id: 'distributed', label: 'DISTRIBUTED & STREAMING' },
            { id: 'simulation', label: 'OPERATIONS RESEARCH & SIMULATION' },
            { id: 'ai-systems', label: 'AI SYSTEMS & DEV TOOLS' },
            { id: 'research-agents', label: 'RESEARCH & AWS TRAINIUM' },
            { id: 'vision-hci', label: 'VISION & HCI' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                activeCategory === cat.id
                  ? 'bg-foreground text-background font-semibold border-foreground'
                  : 'bg-card border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* VIEW 1: INTERACTIVE GALLERY */}
        {activeView === 'gallery' && (
          <div className="space-y-12">
            {/* Top Project Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {filteredProjects.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden ${
                    selectedProjectId === p.id
                      ? 'bg-card border-cobalt shadow-sm ring-1 ring-cobalt'
                      : 'bg-card/60 border-border hover:bg-secondary/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase">{p.date}</span>
                    {p.simulatorType && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] border border-emerald-500/20">
                        LIVE SIM
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-foreground font-display">{p.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{p.tagline}</p>
                </button>
              ))}
            </div>

            {/* Active Selected Project Spec Sheet */}
            <div className="border border-border rounded-2xl bg-card overflow-hidden shadow-editorial">
              {/* Spec Sheet Header */}
              <div className="p-6 sm:p-8 border-b border-border bg-gradient-to-r from-secondary/40 via-background to-secondary/40">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="font-mono text-xs uppercase px-2.5 py-1 rounded bg-secondary border border-border text-foreground font-medium">
                      {activeProject.categoryLabel}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground font-display mt-3">
                      {activeProject.title}
                    </h3>
                    <p className="text-base text-muted-foreground font-medium mt-1">
                      {activeProject.tagline}
                    </p>
                  </div>

                  {/* External Links */}
                  <div className="flex flex-wrap items-center gap-3">
                    {activeProject.links.liveDemo && (
                      <a
                        href={activeProject.links.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Live Production Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {activeProject.links.apiDocs && (
                      <a
                        href={activeProject.links.apiDocs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg border border-border bg-background hover:bg-secondary text-foreground font-mono text-xs font-medium flex items-center gap-2 transition-all"
                      >
                        <span>OpenAPI Docs</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    <a
                      href={activeProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg border border-border bg-background hover:bg-secondary text-foreground font-mono text-xs font-medium flex items-center gap-2 transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub Repository</span>
                    </a>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-foreground/85 leading-relaxed max-w-4xl mt-4">
                  {activeProject.summary}
                </p>

                {/* Verified Impact Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/60">
                  {activeProject.impactMetrics.map((metric, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-background border border-border/70 font-mono">
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                      <div className="text-xl sm:text-2xl font-bold text-foreground mt-0.5">{metric.value}</div>
                      <div className="text-[10px] text-muted-foreground mt-1 leading-tight">{metric.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Embedded Interactive Miniature Experience (if available) */}
              {activeProject.simulatorType && (
                <div className="p-6 sm:p-8 bg-secondary/20 border-b border-border">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
                    <SlidersHorizontal className="w-4 h-4 text-cobalt" />
                    <span className="font-bold text-foreground">Interactive Portfolio Demonstration</span>
                    <span>(Real-Time Browser Simulation of Core System Dynamics)</span>
                  </div>

                  {activeProject.simulatorType === 'fraud' && <FraudGraphSimulator />}
                  {activeProject.simulatorType === 'hospital' && <MedFlowSimulator />}
                  {activeProject.simulatorType === 'risk' && <CodeImpactSimulator />}
                </div>
              )}

              {/* Architecture Deep Dive */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-cobalt" />
                    <span>System Architecture & Pipeline Execution</span>
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {activeProject.architecture.overview}
                  </p>

                  <div className="space-y-2 mt-4">
                    {activeProject.architecture.flowSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs font-mono">
                        <span className="w-5 h-5 rounded bg-secondary flex items-center justify-center font-bold text-muted-foreground shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-foreground leading-normal">{step}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs">
                    <div className="font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                      Core Engineering Challenge
                    </div>
                    <div className="text-muted-foreground leading-relaxed">
                      {activeProject.architecture.keyChallenge}
                    </div>
                  </div>
                </div>

                {/* Tech Stack Matrix */}
                <div className="space-y-4">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cobalt" />
                    <span>Technologies & Protocols</span>
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-secondary border border-border text-foreground text-xs font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Remaining Projects in clean card grid */}
            <div className="pt-6">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground mb-6">
                All Systems & Explorations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects
                  .filter((p) => p.id !== selectedProjectId)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="p-6 rounded-xl border border-border bg-card flex flex-col justify-between hover:border-foreground/30 transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
                          <span className="uppercase">{p.categoryLabel}</span>
                          <span>{p.date}</span>
                        </div>
                        <h4 className="text-xl font-bold text-foreground font-display">{p.title}</h4>
                        <p className="text-xs font-semibold text-cobalt mt-0.5">{p.tagline}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-3">{p.summary}</p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                          {p.tech.slice(0, 3).map((t, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-secondary text-[10px] font-mono text-muted-foreground">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          {p.simulatorType && (
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedProjectId(p.id);
                                window.scrollTo({ top: document.getElementById('projects')?.offsetTop || 0, behavior: 'smooth' });
                              }}
                              className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                            >
                              Launch Demo →
                            </button>
                          )}
                          <a
                            href={p.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"
                            aria-label={`GitHub repo for ${p.title}`}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ENGINEERING BLUEPRINT */}
        {activeView === 'blueprint' && (
          <div className="space-y-8 font-mono text-xs">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-bold text-lg text-foreground font-display mb-2">
                System Topology & Data Pipeline Blueprints
              </h3>
              <p className="text-muted-foreground text-xs mb-6">
                Architectural schematics mapping event ingestion, real-time feature computation, inference orchestration, and automated remediation.
              </p>

              <div className="space-y-6">
                {PROJECTS.map((p) => (
                  <div key={p.id} className="p-5 rounded-lg border border-border bg-secondary/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm text-foreground">{p.title} // ARCHITECTURE FLOW</div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-background border border-border text-muted-foreground">
                        {p.categoryLabel}
                      </span>
                    </div>

                    {/* Flow diagram steps */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {p.architecture.flowSteps.map((step, idx) => (
                        <div key={idx} className="p-3 rounded bg-background border border-border/80 flex flex-col justify-between">
                          <div className="text-[10px] font-bold text-cobalt mb-1">STAGE 0{idx + 1}</div>
                          <div className="text-[11px] text-foreground font-mono leading-tight">{step}</div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-muted-foreground border-t border-border/50">
                      <div>KEY HURDLE: <span className="text-foreground">{p.architecture.keyChallenge}</span></div>
                      <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="text-cobalt hover:underline flex items-center gap-1">
                        View Source <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: TIMELINE */}
        {activeView === 'timeline' && (
          <div className="space-y-8 font-mono text-xs">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-bold text-lg text-foreground font-display mb-2">
                Chronological Systems Evolution (2021 – 2026)
              </h3>
              <p className="text-muted-foreground text-xs mb-6">
                From foundational computer vision & robotics prototypes to distributed streaming platforms and discrete-event twins.
              </p>

              <div className="relative pl-6 border-l-2 border-border space-y-8 my-6">
                {PROJECTS.map((p, idx) => (
                  <div key={p.id} className="relative group">
                    <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-cobalt ring-4 ring-background" />
                    <div className="p-5 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors">
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                        <span className="font-bold text-cobalt">{p.date}</span>
                        <span>{p.categoryLabel}</span>
                      </div>
                      <h4 className="text-base font-bold text-foreground font-display">{p.title}</h4>
                      <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{p.summary}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {p.tech.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-background border border-border text-[10px] text-foreground">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: RECRUITER COMPACT GRID */}
        {activeView === 'recruiter' && (
          <div className="border border-border rounded-xl bg-card overflow-x-auto shadow-sm">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-secondary/70 border-b border-border text-muted-foreground uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">System / Project</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Verified Key Metrics</th>
                  <th className="py-3 px-4">Core Technology Stack</th>
                  <th className="py-3 px-4">Live Links</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {PROJECTS.map((p) => (
                  <tr key={p.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-4 px-4 font-bold text-foreground font-display">
                      {p.title}
                      <div className="text-[10px] font-normal text-muted-foreground font-mono mt-0.5">{p.tagline}</div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{p.categoryLabel}</td>
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        {p.impactMetrics.slice(0, 2).map((m, i) => (
                          <div key={i} className="text-foreground">
                            <span className="font-bold text-cobalt">{m.value}</span>{' '}
                            <span className="text-muted-foreground text-[10px]">({m.label})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground text-[11px] max-w-xs">
                      {p.tech.slice(0, 5).join(', ')}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {p.links.liveDemo && (
                          <a
                            href={p.links.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] hover:underline"
                          >
                            Demo
                          </a>
                        )}
                        <a
                          href={p.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 rounded bg-secondary text-foreground text-[10px] hover:underline"
                        >
                          Code
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
