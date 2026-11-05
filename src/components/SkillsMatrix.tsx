import React from 'react';
import { SKILL_CATEGORIES } from '@/data/skills';
import { Cpu, Network, Activity, Code, Check } from 'lucide-react';

export const SkillsMatrix: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cobalt" />;
      case 'Network':
        return <Network className="w-5 h-5 text-emerald-500" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-amber-500" />;
      case 'Code':
      default:
        return <Code className="w-5 h-5 text-orange-500" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 border-b border-border bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cobalt mb-3">
            <span className="w-2 h-2 rounded-full bg-cobalt inline-block" />
            SECTION 06 // TECHNICAL REPERTOIRE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
            Engineering Competencies
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-2">
            Spanning low-latency streaming infrastructure, graph neural networks, and mathematical operations research.
          </p>
        </div>

        {/* 4 Clean Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between hover:border-foreground/30 transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                  {getIcon(cat.iconName)}
                </div>

                <h3 className="text-lg font-bold text-foreground font-display mb-1">{cat.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 leading-normal">{cat.tagline}</p>

                <div className="space-y-2 font-mono text-xs">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`px-3 py-1.5 rounded-lg border flex items-center justify-between ${
                        skill.highlight
                          ? 'bg-secondary/70 border-border text-foreground font-medium'
                          : 'bg-background border-border/50 text-muted-foreground'
                      }`}
                    >
                      <span>{skill.name}</span>
                      {skill.highlight && <span className="text-[10px] text-cobalt font-bold">CORE</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
