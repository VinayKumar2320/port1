import React from 'react';
import { Terminal, Github, Linkedin, Mail, Heart, Sparkles, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenTerminal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-background border-t border-border font-mono text-xs">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-border">
          {/* Brand */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-bold text-foreground text-sm">
              <span className="w-2 h-2 rounded-full bg-cobalt inline-block" />
              <span>VINAY.EXE // KINETIC COMPILER</span>
            </div>
            <p className="text-muted-foreground text-xs font-sans max-w-md">
              Handcrafted portfolio & interactive developer universe for Vinay Kumar. Built with React 18, TypeScript, Tailwind CSS & Framer Motion.
            </p>
          </div>

          {/* Quick Telemetry & Terminal Button */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <button
              type="button"
              onClick={onOpenTerminal}
              className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-foreground font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5 text-cobalt" />
              <span>Launch Terminal (`~`)</span>
            </button>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/VinayKumar2320"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border bg-card hover:bg-secondary text-foreground transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/vinay-kumar-md-9196711b8/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border bg-card hover:bg-secondary text-foreground transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href="mailto:vinaykumarmd02@gmail.com"
                className="p-2 rounded-lg border border-border bg-card hover:bg-secondary text-foreground transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground text-[11px]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>All metrics, benchmarks, and publications independently verified. Zero fabricated claims.</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Brooklyn, NY · © {currentYear} Vinay Kumar</span>
            <span className="hidden sm:inline">|</span>
            <span className="text-[10px] text-muted-foreground/70 hidden sm:inline">Konami code active: ↑ ↑ ↓ ↓ ← → ← → B A</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
