import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Compass, Terminal, Cpu, Coffee, Sparkles, GraduationCap, Award } from 'lucide-react';
import profileImage from '@/assets/vinay-profile.jpg';

export const AboutJourney: React.FC = () => {
  const [activeMood, setActiveMood] = useState<'build' | 'research' | 'explore'>('build');

  const milestones = [
    {
      year: '2021 – 2025',
      location: 'Bangalore, India (12.9716° N)',
      title: 'Undergraduate Foundations in AI & Machine Learning',
      institution: 'B.N.M Institute of Technology',
      details:
        'Graduated with CGPA 8.69 / 10. Built deep neural architectures, co-invented a patented automated agricultural irrigation system, published 8 peer-reviewed research papers, and placed 2nd nationwide in the Smart India Hackathon 2023.',
    },
    {
      year: '2023 – 2024',
      location: 'Bangalore, India',
      title: 'Industry Internships: Drug Discovery & Fintech Fraud',
      institution: '369 Data Solution & KreditBee',
      details:
        'Engineered protein crystallization deep learning classifiers cutting drug discovery data processing time by 30%. Built real-time CNN liveliness verification pipelines cutting false positive KYC fraud by 76%.',
    },
    {
      year: '2025',
      location: 'New York City (40.7128° N)',
      title: 'Transatlantic Leap & Medical Image Processing',
      institution: 'Healium Intelliscan Corp',
      details:
        'Relocated to New York City. Engineered high-throughput medical image transformation pipelines in Python and PyTorch, achieving a 79% latency reduction in diagnostic scan preprocessing.',
    },
    {
      year: '2025 – 2027',
      location: 'Brooklyn, New York',
      title: 'Graduate Studies in Computer Science',
      institution: 'NYU Tandon School of Engineering',
      details:
        'Focusing on Distributed Systems, AI Platform Infrastructure, and Operations Research. Building high-consequence systems like FraudGraph (sub-5ms streaming fraud intelligence) and MedFlow (SimPy 4.1 hospital digital twin).',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-b border-border bg-secondary/20 relative">
      <div className="container mx-auto px-6">
        {/* Section Tag */}
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cobalt mb-3">
          <span className="w-2 h-2 rounded-full bg-cobalt inline-block" />
          SECTION 03 // ORIGIN & STORY
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
              The Human Behind the Terminal
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-3 leading-relaxed">
              I am an engineer fascinated by complex, stochastic environments—whether that is a hospital emergency department on a Friday night, a high-throughput financial streaming bus with coordinated fraud rings, or a distributed microservice mesh under cascading timeout failure.
            </p>
          </div>

          {/* Profile Card & Coordinate Compass */}
          <div className="flex items-center gap-5 p-4 rounded-xl border border-border bg-card shadow-sm self-start">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-border shrink-0 bg-secondary">
              <img
                src={profileImage}
                alt="Vinay Kumar"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="font-mono text-xs space-y-1">
              <div className="font-bold text-foreground text-sm">Vinay Kumar</div>
              <div className="text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cobalt" />
                <span>NYC (40.7128° N, 74.0060° W)</span>
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                ● STATUS: GRADUATE CS @ NYU
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Milestones Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
              Transcontinental Trajectory: Bangalore → New York
            </h3>

            <div className="space-y-6 relative pl-6 border-l-2 border-border font-mono text-xs">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative group">
                  <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-cobalt ring-4 ring-background" />
                  <div className="p-5 rounded-xl border border-border bg-card shadow-sm">
                    <div className="flex flex-wrap items-center justify-between text-muted-foreground mb-1">
                      <span className="font-bold text-cobalt">{m.year}</span>
                      <span className="text-[10px]">{m.location}</span>
                    </div>
                    <h4 className="text-base font-bold text-foreground font-display mt-0.5">{m.title}</h4>
                    <div className="text-xs font-semibold text-muted-foreground mt-0.5">{m.institution}</div>
                    <p className="text-xs text-foreground/80 font-sans mt-3 leading-relaxed">
                      {m.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Live Status & Philosophy */}
          <div className="space-y-6">
            {/* Terminal Now Card */}
            <div className="rounded-xl border border-border bg-card p-5 font-mono text-xs shadow-sm">
              <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cobalt" />
                  <span className="font-bold text-foreground">CURRENT_FOCUS.LOG</span>
                </div>
                <span className="text-[10px] text-muted-foreground">LIVE_DAEMON</span>
              </div>

              <div className="space-y-3 text-[11px] text-foreground/90 leading-relaxed">
                <div>
                  <span className="text-muted-foreground">$ cat /etc/current_status</span>
                  <p className="mt-1 font-sans text-foreground">
                    Deep in graduate systems coursework at NYU Tandon. Studying distributed consensus, high-throughput queuing theory, and graph neural network representations.
                  </p>
                </div>

                <div>
                  <span className="text-muted-foreground">$ cat /etc/philosophy</span>
                  <p className="mt-1 font-sans text-foreground">
                    "Deterministic verification over generative hype. Every metric must be reproducible. Code that isn't measured under pressure isn't complete."
                  </p>
                </div>
              </div>
            </div>

            {/* Draggable Desk Stickers */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="text-xs font-mono text-muted-foreground mb-3 flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider text-foreground">Desk Artifacts</span>
                <span className="text-[10px]">(Draggable)</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2 min-h-[100px]">
                {[
                  { label: '☕ Double Espresso', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30' },
                  { label: '🏍️ Weekend Motorcyclist', color: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30' },
                  { label: '⌨️ Mechanical Keyboards', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/30' },
                  { label: '🗽 Subway Rider', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30' },
                  { label: '🎧 Lo-Fi Focus Loop', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30' },
                ].map((st, i) => (
                  <motion.div
                    key={i}
                    drag
                    dragConstraints={{ left: -30, right: 30, top: -20, bottom: 20 }}
                    whileHover={{ scale: 1.05, cursor: 'grab' }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-2.5 py-1 rounded-md border text-[11px] font-mono select-none ${st.color}`}
                  >
                    {st.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
