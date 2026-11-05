import React, { useState, useEffect } from 'react';
import { Terminal, Activity, Moon, Sun, Download, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenTerminal: () => void;
  isRecruiterMode: boolean;
  onToggleRecruiterMode: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTerminal,
  isRecruiterMode,
  onToggleRecruiterMode,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 cursor-pointer font-mono text-sm font-bold tracking-tight text-foreground select-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cobalt inline-block" />
          <span>VINAY.EXE</span>
          <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 rounded bg-secondary text-muted-foreground font-normal border border-border">
            NYU // CS
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs">
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            // 01.Projects
          </button>
          <button
            type="button"
            onClick={() => scrollTo('about')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            // 02.About
          </button>
          <button
            type="button"
            onClick={() => scrollTo('experience')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            // 03.Experience
          </button>
          <button
            type="button"
            onClick={() => scrollTo('publications')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            // 04.Research
          </button>
          <button
            type="button"
            onClick={() => scrollTo('skills')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            // 05.Skills
          </button>
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            // 06.Contact
          </button>
        </nav>

        {/* Right Tools & Mode Switches */}
        <div className="flex items-center gap-2.5 font-mono text-xs">
          {/* Terminal Launcher */}
          <button
            type="button"
            onClick={onOpenTerminal}
            className="p-2 rounded-lg border border-border bg-card hover:bg-secondary text-foreground transition-all flex items-center gap-1.5 shadow-sm"
            title="Open Interactive Terminal (~)"
            aria-label="Open Interactive Terminal"
          >
            <Terminal className="w-3.5 h-3.5 text-cobalt" />
            <span className="hidden lg:inline text-[11px]">Terminal</span>
            <kbd className="hidden lg:inline text-[9px] px-1 py-0.5 rounded bg-secondary border border-border text-muted-foreground">~</kbd>
          </button>

          {/* Recruiter Mode Toggle */}
          <button
            type="button"
            onClick={onToggleRecruiterMode}
            className={`px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              isRecruiterMode
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'border-border bg-card hover:bg-secondary text-foreground'
            }`}
            title="Toggle Clean Recruiter Brief"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Recruiter</span>
          </button>

          {/* Theme Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg border border-border bg-card hover:bg-secondary text-foreground transition-all shadow-sm"
            title="Toggle Studio Theme"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-cobalt" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg border border-border bg-card hover:bg-secondary text-foreground md:hidden"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background p-6 font-mono text-xs space-y-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="p-2.5 rounded-lg border border-border text-left hover:bg-secondary text-foreground"
            >
              // Projects
            </button>
            <button
              type="button"
              onClick={() => scrollTo('about')}
              className="p-2.5 rounded-lg border border-border text-left hover:bg-secondary text-foreground"
            >
              // About
            </button>
            <button
              type="button"
              onClick={() => scrollTo('experience')}
              className="p-2.5 rounded-lg border border-border text-left hover:bg-secondary text-foreground"
            >
              // Experience
            </button>
            <button
              type="button"
              onClick={() => scrollTo('publications')}
              className="p-2.5 rounded-lg border border-border text-left hover:bg-secondary text-foreground"
            >
              // Research & Patent
            </button>
            <button
              type="button"
              onClick={() => scrollTo('skills')}
              className="p-2.5 rounded-lg border border-border text-left hover:bg-secondary text-foreground"
            >
              // Skills
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="p-2.5 rounded-lg border border-border text-left hover:bg-secondary text-foreground"
            >
              // Contact
            </button>
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between">
            <a
              href="/Vinay_Kumar_Resume.pdf"
              download
              className="text-cobalt font-semibold flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download Resume PDF
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
