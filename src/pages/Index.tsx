import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProjectPlayground } from '@/components/ProjectPlayground';
import { AboutJourney } from '@/components/AboutJourney';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ResearchPublications } from '@/components/ResearchPublications';
import { SkillsMatrix } from '@/components/SkillsMatrix';
import { ContactSection } from '@/components/ContactSection';
import { RecruiterModeView } from '@/components/RecruiterModeView';
import { TerminalModal } from '@/components/TerminalModal';
import { EasterEggs } from '@/components/EasterEggs';
import { Footer } from '@/components/Footer';

const Index: React.FC = () => {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Global keybindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal on `~` or backtick when not focused on an input
      if ((e.key === '`' || e.key === '~') && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isTerminalOpen) {
        setIsTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTerminalOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      {/* Header Bar */}
      <Header
        onOpenTerminal={() => setIsTerminalOpen(true)}
        isRecruiterMode={isRecruiterMode}
        onToggleRecruiterMode={() => setIsRecruiterMode(!isRecruiterMode)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Content Area: Recruiter Mode vs Playground Universe */}
      {isRecruiterMode ? (
        <RecruiterModeView onExitRecruiterMode={() => setIsRecruiterMode(false)} />
      ) : (
        <main>
          <Hero
            onOpenTerminal={() => setIsTerminalOpen(true)}
            onToggleRecruiterMode={() => setIsRecruiterMode(true)}
            isRecruiterMode={isRecruiterMode}
          />
          <ProjectPlayground />
          <AboutJourney />
          <ExperienceSection />
          <ResearchPublications />
          <SkillsMatrix />
          <ContactSection />
        </main>
      )}

      {/* Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Interactive UNIX Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onToggleRecruiterMode={() => setIsRecruiterMode(!isRecruiterMode)}
      />

      {/* Konami Easter Egg Controller */}
      <EasterEggs />
    </div>
  );
};

export default Index;
