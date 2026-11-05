import React, { useState } from 'react';
import { PUBLICATIONS, PublicationItem } from '@/data/publications';
import { ACHIEVEMENTS, AchievementItem } from '@/data/achievements';
import { Award, FileText, CheckCircle2, ExternalLink, Bookmark, Trophy, ShieldCheck, Sparkles } from 'lucide-react';

export const ResearchPublications: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'papers' | 'patent' | 'awards' | 'certs'>('papers');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPublications = PUBLICATIONS.filter((p) => {
    if (activeTab === 'patent') return p.type === 'Patent';
    if (p.type === 'Patent') return false;
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <section id="publications" className="py-20 md:py-28 border-b border-border bg-secondary/20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cobalt mb-3">
              <span className="w-2 h-2 rounded-full bg-cobalt inline-block" />
              SECTION 05 // INTELLECTUAL PROPERTY & RESEARCH
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
              Research, Patent & Honors
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-2 max-w-2xl">
              1 Co-Invented Patent, 8 Published Papers, and Top National Hackathon Finishes.
            </p>
          </div>

          {/* Navigation Pill Switcher */}
          <div className="flex flex-wrap items-center p-1 rounded-lg border border-border bg-card font-mono text-xs shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('papers')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                activeTab === 'papers'
                  ? 'bg-foreground text-background font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Papers (8)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('patent')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                activeTab === 'patent'
                  ? 'bg-foreground text-background font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Patent (1)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('awards')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                activeTab === 'awards'
                  ? 'bg-foreground text-background font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Competitions & Awards</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('certs')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                activeTab === 'certs'
                  ? 'bg-foreground text-background font-semibold shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certifications</span>
            </button>
          </div>
        </div>

        {/* Category Filters for Papers */}
        {activeTab === 'papers' && (
          <div className="flex flex-wrap gap-2 mb-8 font-mono text-xs">
            {[
              { id: 'all', label: 'ALL FIELDS' },
              { id: 'Reinforcement Learning', label: 'REINFORCEMENT LEARNING' },
              { id: 'Robotics & IoT', label: 'ROBOTICS & IOT' },
              { id: 'Computer Vision & HCI', label: 'VISION & HCI' },
              { id: 'Healthcare AI', label: 'HEALTHCARE AI' },
              { id: 'Cloud & Quantum', label: 'CLOUD & QUANTUM' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cobalt text-white font-semibold border-cobalt'
                    : 'bg-card border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* TAB 1: RESEARCH PAPERS */}
        {activeTab === 'papers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPublications.map((pub) => (
              <div
                key={pub.id}
                className="p-6 rounded-2xl border border-border bg-card flex flex-col justify-between hover:border-cobalt/40 transition-all shadow-sm group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3">
                    <span className="px-2 py-0.5 rounded bg-secondary text-foreground text-[10px] font-semibold">
                      {pub.category}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {pub.status} ({pub.year})
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground font-display group-hover:text-cobalt transition-colors leading-snug">
                    {pub.title}
                  </h3>

                  <p className="text-xs font-mono text-muted-foreground mt-2">
                    {pub.venue}
                  </p>

                  <p className="text-xs text-foreground/80 font-sans mt-3 leading-relaxed">
                    {pub.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between font-mono text-xs">
                  <div className="text-[11px] text-muted-foreground">
                    IMPACT: <span className="font-bold text-foreground">{pub.impactMetrics}</span>
                  </div>
                  <a
                    href="https://scholar.google.com/citations?user=lX3caZQAAAAJ&hl=en&authuser=2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cobalt hover:underline text-[11px] font-semibold"
                  >
                    Google Scholar <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: PATENT */}
        {activeTab === 'patent' && (
          <div className="border border-border rounded-2xl bg-card p-6 sm:p-10 shadow-editorial">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
              <div>
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 uppercase font-bold">
                  OFFICIAL PATENT CO-INVENTOR
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground font-display mt-3">
                  AI and IoT-Based Sprinkler for Automated Agricultural Irrigation
                </h3>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  Jurisdiction: Intellectual Property India · Co-Inventor: Vinay Kumar
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-secondary/40 font-mono text-xs space-y-1 self-start">
                <div className="text-muted-foreground">STATUS: <span className="text-emerald-500 font-bold">SUBMITTED & GRANTED</span></div>
                <div className="text-muted-foreground">YEAR: <span className="text-foreground font-bold">2024</span></div>
                <div className="text-muted-foreground">DOMAIN: <span className="text-foreground font-bold">SUSTAINABLE IOT</span></div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed max-w-3xl mb-8">
              Contributed as co-inventor to the architectural design, sensor telemetry orchestration, and embedded automation algorithm of an intelligent irrigation sprinkler. Couples in-situ soil moisture telemetry, historical evaporation curves, and microclimate forecasting to minimize freshwater dissipation in precision agriculture.
            </p>

            {/* Technical Diagram Schematic */}
            <div className="p-6 rounded-xl border border-dashed border-border bg-secondary/20 font-mono text-xs">
              <div className="text-xs uppercase font-bold text-muted-foreground mb-4">
                Schematic Functional Flow // Patent Architecture
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded bg-card border border-border">
                  <div className="font-bold text-cobalt">01. INGEST</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Soil telemetry & microclimate sensors</div>
                </div>
                <div className="p-3 rounded bg-card border border-border">
                  <div className="font-bold text-cobalt">02. ESTIMATE</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Evapotranspiration deficit curve</div>
                </div>
                <div className="p-3 rounded bg-card border border-border">
                  <div className="font-bold text-cobalt">03. OPTIMIZE</div>
                  <div className="text-[11px] text-muted-foreground mt-1">Volumetric valve duty cycle solver</div>
                </div>
                <div className="p-3 rounded bg-card border border-border">
                  <div className="font-bold text-cobalt">04. ACTUATE</div>
                  <div className="text-[11px] text-muted-foreground mt-1">PWM sprinkler head precision distribution</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AWARDS & HACKATHONS */}
        {activeTab === 'awards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACHIEVEMENTS.filter((a) => a.category === 'hackathon' || a.category === 'competition' || a.category === 'academic').map((ach) => (
              <div key={ach.id} className="p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-3">
                    <span className="font-bold text-cobalt">{ach.year}</span>
                    <span className="px-2 py-0.5 rounded bg-secondary text-foreground text-[10px] font-semibold">
                      {ach.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-foreground font-display">{ach.title}</h4>
                  <div className="text-xs font-mono text-muted-foreground mt-1">{ach.issuer}</div>
                  <p className="text-xs text-foreground/80 font-sans mt-3 leading-relaxed">
                    {ach.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified National Record</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: CERTIFICATIONS */}
        {activeTab === 'certs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ACHIEVEMENTS.filter((a) => a.category === 'certification').map((cert) => (
              <div key={cert.id} className="p-6 rounded-xl border border-border bg-card shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
                    <span className="font-bold text-cobalt">{cert.year}</span>
                    <span className="px-2 py-0.5 rounded bg-secondary text-foreground text-[10px] font-semibold">
                      {cert.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-foreground font-display">{cert.title}</h4>
                  <div className="text-xs font-mono text-muted-foreground mt-0.5">{cert.issuer}</div>
                  <p className="text-xs text-foreground/80 font-sans mt-3 leading-relaxed">
                    {cert.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Credential Verified</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
