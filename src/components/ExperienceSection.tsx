import React, { useState } from 'react';
import { EXPERIENCES, ExperienceItem } from '@/data/experience';
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2, AlertCircle, Wrench } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>(EXPERIENCES[0].id);

  return (
    <section id="experience" className="py-20 md:py-28 border-b border-border bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cobalt mb-3">
            <span className="w-2 h-2 rounded-full bg-cobalt inline-block" />
            SECTION 04 // VERIFIED INDUSTRY & RESEARCH RECORD
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
            A Living Career Timeline
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-2">
            Real production systems under high-stakes conditions—from clinical imaging pipelines to high-scale credit fraud detection.
          </p>
        </div>

        {/* Roles List */}
        <div className="space-y-6">
          {EXPERIENCES.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'border-cobalt/60 bg-card shadow-editorial'
                    : 'border-border bg-card/60 hover:border-foreground/30 hover:bg-card'
                }`}
              >
                {/* Accordion / Card Header */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                  className="w-full p-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      <span className="font-bold text-cobalt">{item.period}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                      {item.current && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground font-display">
                      {item.role} <span className="text-muted-foreground font-normal">@ {item.company}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground font-sans line-clamp-1">
                      {item.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                    <div className="hidden sm:flex flex-wrap gap-1 max-w-xs justify-end font-mono text-[10px]">
                      {item.tech.slice(0, 3).map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-secondary text-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className={`p-2 rounded-lg bg-secondary text-foreground transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Expanded Deep Case Study */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-border/60 bg-secondary/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      {/* Left: Problem & Solution */}
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-border bg-card">
                          <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground uppercase mb-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                            <span>The Problem & Context</span>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {item.problem}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl border border-border bg-card">
                          <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground uppercase mb-1.5">
                            <Wrench className="w-3.5 h-3.5 text-cobalt" />
                            <span>What I Engineered</span>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {item.built}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl border border-border bg-card">
                          <div className="font-mono text-xs font-bold text-foreground uppercase mb-1.5">
                            Core Engineering Hurdle
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {item.hurdles}
                          </p>
                        </div>
                      </div>

                      {/* Right: Quantifiable Outcomes & Stack */}
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl border border-border bg-card">
                          <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground uppercase mb-3">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Verified Outcomes & Quantitative Impact</span>
                          </div>
                          <div className="space-y-2.5">
                            {item.outcomes.map((outcome, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                <span className="text-foreground leading-relaxed">{outcome}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-border bg-card">
                          <div className="font-mono text-xs font-bold text-foreground uppercase mb-2">
                            Technologies & Tools Deployed
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.tech.map((t, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 rounded-md bg-secondary border border-border font-mono text-xs text-foreground"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
