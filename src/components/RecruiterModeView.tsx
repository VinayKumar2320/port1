import React from 'react';
import { EXPERIENCES } from '@/data/experience';
import { EDUCATION } from '@/data/education';
import { PROJECTS } from '@/data/projects';
import { PUBLICATIONS } from '@/data/publications';
import { ACHIEVEMENTS } from '@/data/achievements';
import { SKILL_CATEGORIES } from '@/data/skills';
import {
  Download,
  Mail,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface RecruiterModeViewProps {
  onExitRecruiterMode: () => void;
}

export const RecruiterModeView: React.FC<RecruiterModeViewProps> = ({ onExitRecruiterMode }) => {
  return (
    <div className="bg-background text-foreground min-h-screen py-12 md:py-20 font-sans">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Floating Top Banner to Switch to Playground */}
        <div className="mb-8 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">RECRUITER MODE ACTIVE</span>
            <span className="text-muted-foreground">— Clean, high-density, 30-second executive summary.</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/Vinay_Kumar_Resume.pdf"
              download="Vinay_Kumar_Resume.pdf"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume PDF</span>
            </a>

            <button
              type="button"
              onClick={onExitRecruiterMode}
              className="px-3.5 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-foreground font-semibold flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-cobalt" />
              <span>Switch to Playground</span>
            </button>
          </div>
        </div>

        {/* Executive Header */}
        <div className="border-b border-border pb-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-foreground">
                Vinay Kumar
              </h1>
              <p className="text-lg sm:text-xl font-medium text-cobalt mt-1">
                Software & AI/ML Systems Engineer · M.S. Computer Science @ NYU Tandon
              </p>
              <p className="text-sm text-muted-foreground mt-3 max-w-2xl leading-relaxed">
                Graduate student at New York University specializing in distributed systems, real-time graph intelligence, and simulation engineering. 3 industry internships (Healium, KreditBee, 369 Data), 1 patent, 8 peer-reviewed research papers. <span className="text-foreground font-semibold">Currently seeking New Grad roles in Software Engineering, AI/ML Systems, and Distributed Systems.</span>
              </p>
            </div>

            {/* Contact Matrix */}
            <div className="font-mono text-xs space-y-2 p-4 rounded-xl border border-border bg-card shrink-0">
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Brooklyn, New York, USA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                <a href="mailto:vinaykumarmd02@gmail.com" className="text-cobalt hover:underline">
                  vinaykumarmd02@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Seeking New Grad Roles</span>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <a
                  href="https://www.linkedin.com/in/vinay-kumar-md-9196711b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cobalt hover:underline flex items-center gap-1"
                >
                  <Linkedin className="w-3 h-3" /> LinkedIn
                </a>
                <span>·</span>
                <a
                  href="https://github.com/VinayKumar2320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cobalt hover:underline flex items-center gap-1"
                >
                  <Github className="w-3 h-3" /> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-12">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-cobalt mb-4">
            01 // EDUCATION
          </h2>
          <div className="space-y-4">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-border bg-card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono mb-1">
                  <span className="font-bold text-foreground text-sm font-sans">{edu.institution}</span>
                  <span className="text-muted-foreground">{edu.period} · {edu.location}</span>
                </div>
                <div className="text-sm font-semibold text-cobalt">
                  {edu.degree} {edu.gpa && <span className="text-muted-foreground font-mono text-xs">({edu.gpa})</span>}
                </div>
                <ul className="mt-3 space-y-1 text-xs text-muted-foreground list-disc list-inside">
                  {edu.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Work Experience */}
        <div className="mb-12">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-cobalt mb-4">
            02 // PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-6">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="p-6 rounded-xl border border-border bg-card space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono">
                  <div className="text-base font-bold text-foreground font-display">
                    {exp.role} <span className="text-muted-foreground font-normal">@ {exp.company}</span>
                  </div>
                  <span className="text-muted-foreground">{exp.period} · {exp.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {exp.built}
                </p>

                <div className="space-y-1.5 pt-1">
                  {exp.outcomes.map((out, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {exp.tech.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-secondary text-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flagship Engineering Systems */}
        <div className="mb-12">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-cobalt mb-4">
            03 // FLAGSHIP SYSTEMS & ENGINEERING WORK
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.slice(0, 4).map((p) => (
              <div key={p.id} className="p-6 rounded-xl border border-border bg-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-1">
                    <span>{p.categoryLabel}</span>
                    <span>{p.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground font-display">{p.title}</h3>
                  <p className="text-xs font-semibold text-cobalt mt-0.5">{p.tagline}</p>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{p.summary}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between font-mono text-xs">
                  <div className="text-[11px] text-foreground font-semibold">
                    {p.impactMetrics[0].value} <span className="text-muted-foreground text-[10px]">({p.impactMetrics[0].label})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {p.links.liveDemo && (
                      <a href={p.links.liveDemo} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                        Live Demo
                      </a>
                    )}
                    <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="text-cobalt hover:underline">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills Matrix */}
        <div className="mb-12">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-cobalt mb-4">
            04 // TECHNICAL SKILLS
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card space-y-4 font-mono text-xs">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2">
                <span className="w-48 font-bold text-foreground shrink-0">{cat.title}:</span>
                <span className="text-muted-foreground">
                  {cat.skills.map((s) => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Publications & Patent */}
        <div className="mb-12">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-cobalt mb-4">
            05 // PATENT & PUBLICATIONS
          </h2>
          <div className="p-6 rounded-xl border border-border bg-card space-y-3 font-mono text-xs">
            <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300">
              <span className="font-bold">PATENT (Co-Inventor):</span> AI and IoT-Based Sprinkler for Automated Agricultural Irrigation (2024).
            </div>
            <div className="text-muted-foreground space-y-1.5 pt-1">
              {PUBLICATIONS.filter((p) => p.type !== 'Patent').slice(0, 4).map((pub, idx) => (
                <div key={idx}>
                  • <span className="text-foreground font-semibold">{pub.title}</span> — {pub.venue} ({pub.year})
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
