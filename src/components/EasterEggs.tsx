import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, X } from 'lucide-react';

export const EasterEggs: React.FC = () => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const sequence = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ];
    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === sequence[currentIndex] || e.key.toLowerCase() === sequence[currentIndex]) {
        currentIndex++;
        if (currentIndex === sequence.length) {
          triggerEasterEgg();
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerEasterEgg = () => {
    setUnlocked(true);

    // Audio chime using Web Audio API
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {
      // Audio might be restricted by browser policy; safe fallback
    }

    // Confetti burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  if (!unlocked) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl border border-amber-500/40 bg-slate-950 text-white shadow-2xl font-mono text-xs max-w-sm animate-in slide-in-from-bottom-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-amber-400 font-bold">
          <Trophy className="w-4 h-4" />
          <span>SECRET UNLOCKED: THE ARCHITECT</span>
        </div>
        <button
          type="button"
          onClick={() => setUnlocked(false)}
          className="text-slate-400 hover:text-white"
          aria-label="Close"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <p className="text-slate-300 font-sans text-xs mt-2 leading-relaxed">
        You triggered the Konami code! 30 extra simulation lives granted to your SimPy queue and sub-5ms Kafka cluster.
      </p>
    </div>
  );
};
