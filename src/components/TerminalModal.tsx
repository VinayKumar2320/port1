import React, { useState, useRef, useEffect } from 'react';
import { PROJECTS } from '@/data/projects';
import { EXPERIENCES } from '@/data/experience';
import { PUBLICATIONS } from '@/data/publications';
import { ACHIEVEMENTS } from '@/data/achievements';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleRecruiterMode: () => void;
}

interface CommandLog {
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onToggleRecruiterMode,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <div className="text-emerald-400 font-bold">VINAY.EXE UNIX TERMINAL [Version 2.6.0]</div>
          <div>Type <span className="text-amber-400 font-bold">help</span> to list available commands.</div>
          <div>Try: <span className="text-cyan-400">projects</span>, <span className="text-cyan-400">simulate fraud</span>, <span className="text-cyan-400">cat resume</span></div>
        </div>
      ),
    },
  ]);

  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <div className="text-amber-400 font-bold">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-2 gap-2 max-w-md pt-1">
              <div><span className="text-cyan-400 font-semibold">about</span> : Brief biography & NYU journey</div>
              <div><span className="text-cyan-400 font-semibold">projects</span> : List all engineering systems</div>
              <div><span className="text-cyan-400 font-semibold">simulate &lt;type&gt;</span> : Launch simulator (fraud|hospital|risk)</div>
              <div><span className="text-cyan-400 font-semibold">experience</span> : Career history & roles</div>
              <div><span className="text-cyan-400 font-semibold">publications</span> : Patent & 8 research papers</div>
              <div><span className="text-cyan-400 font-semibold">education</span> : NYU & BNMIT credentials</div>
              <div><span className="text-cyan-400 font-semibold">cat resume</span> : Output raw verified resume</div>
              <div><span className="text-cyan-400 font-semibold">recruiter</span> : Toggle Recruiter Mode</div>
              <div><span className="text-cyan-400 font-semibold">contact</span> : Email, phone & social profiles</div>
              <div><span className="text-cyan-400 font-semibold">clear</span> : Clear terminal console</div>
              <div><span className="text-cyan-400 font-semibold">matrix</span> : Neo mode easter egg</div>
            </div>
          </div>
        );
        break;

      case 'about':
        outputNode = (
          <div className="space-y-1.5 text-slate-300 leading-relaxed">
            <div className="text-emerald-400 font-bold">VINAY KUMAR // M.S. CS @ NYU TANDON (2025–2027)</div>
            <div>B.E. in Artificial Intelligence & Machine Learning, BNMIT (CGPA: 8.69 / 10).</div>
            <div>Specializing in Distributed Systems, AI Platform Infrastructure, Graph Neural Networks, and Discrete-Event Simulation.</div>
            <div className="text-slate-400">Based in Brooklyn, New York. Curious by default.</div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-slate-300">
            <div className="text-amber-400 font-bold">FLAGSHIP SYSTEMS ARCHIVED:</div>
            {PROJECTS.map((p, idx) => (
              <div key={p.id} className="border-l-2 border-slate-700 pl-2">
                <span className="text-cyan-400 font-bold">{idx + 1}. {p.title}</span> — {p.tagline}
                <div className="text-[11px] text-slate-400">{p.tech.slice(0, 4).join(', ')} | GitHub: {p.links.github}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'simulate':
        if (arg === 'fraud' || arg === 'hospital' || arg === 'risk') {
          outputNode = (
            <div className="text-emerald-400">
              Launching interactive simulator for <span className="font-bold underline">{arg}</span> in the Project Playground...
            </div>
          );
          setTimeout(() => {
            onClose();
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }, 600);
        } else {
          outputNode = (
            <div className="text-orange-400">
              Unknown simulation target. Try: <span className="text-white">simulate fraud</span>, <span className="text-white">simulate hospital</span>, or <span className="text-white">simulate risk</span>.
            </div>
          );
        }
        break;

      case 'experience':
        outputNode = (
          <div className="space-y-2 text-slate-300">
            <div className="text-amber-400 font-bold">VERIFIED ROLES:</div>
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="border-l-2 border-slate-700 pl-2">
                <div className="font-bold text-white">{exp.role} @ {exp.company} ({exp.period})</div>
                <div className="text-[11px] text-slate-400">{exp.summary}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'publications':
        outputNode = (
          <div className="space-y-2 text-slate-300">
            <div className="text-amber-400 font-bold">INTELLECTUAL PROPERTY & PUBLICATIONS:</div>
            <div className="text-emerald-400 font-semibold">1 Patent: AI and IoT-Based Sprinkler for Automated Agricultural Irrigation (2024)</div>
            <div className="text-slate-300">8 Published Research Papers spanning EV multi-agent RL, precision robotics, HCI, and healthcare neural nets.</div>
          </div>
        );
        break;

      case 'education':
        outputNode = (
          <div className="space-y-2 text-slate-300">
            <div className="text-amber-400 font-bold">ACADEMIC CREDENTIALS:</div>
            <div>• <span className="text-white font-semibold">M.S. in Computer Science</span> — New York University (2025–2027)</div>
            <div>• <span className="text-white font-semibold">B.E. in Artificial Intelligence & ML</span> — BNMIT Bangalore (2021–2025, CGPA: 8.69/10)</div>
          </div>
        );
        break;

      case 'recruiter':
        onToggleRecruiterMode();
        outputNode = <div className="text-emerald-400">Toggled Recruiter Mode!</div>;
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <div>Email: <a href="mailto:vinaykumarmd02@gmail.com" className="text-cyan-400 underline">vinaykumarmd02@gmail.com</a></div>
            <div>Status: <span className="text-emerald-400 font-semibold">Currently seeking New Grad roles</span></div>
            <div>LinkedIn: <a href="https://www.linkedin.com/in/vinay-kumar-md-9196711b8/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">linkedin.com/in/vinay-kumar-md-9196711b8</a></div>
            <div>GitHub: <a href="https://github.com/VinayKumar2320" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">github.com/VinayKumar2320</a></div>
          </div>
        );
        break;

      case 'cat':
        if (arg === 'resume' || arg === 'resume.txt' || arg === 'resume.pdf') {
          outputNode = (
            <div className="space-y-2 text-slate-300 text-xs">
              <div className="text-emerald-400 font-bold">VINAY KUMAR — RESUME SUMMARY</div>
              <div>M.S. Computer Science @ NYU Tandon (2025-2027) · B.E. AI/ML BNMIT (CGPA: 8.69)</div>
              <div>Software Dev Intern @ Healium (NY) · Data Science Intern @ KreditBee · ML Intern @ 369 Data</div>
              <div>1 Patent · 8 Published Papers · Smart India Hackathon 2nd Place · IIT Bombay Techfest Top 5</div>
              <div className="pt-1">
                <a href="/Vinay_Kumar_Resume.pdf" download className="text-amber-400 font-bold underline">
                  Download Full PDF Resume [/Vinay_Kumar_Resume.pdf]
                </a>
              </div>
            </div>
          );
        } else {
          outputNode = <div className="text-orange-400">File not found. Try: <span className="text-white">cat resume</span></div>;
        }
        break;

      case 'matrix':
        outputNode = (
          <div className="text-emerald-500 font-mono text-xs">
            Wake up, Neo... The Matrix has you. Follow the white rabbit. Knock, knock, Neo.
          </div>
        );
        break;

      case 'sudo':
        outputNode = <div className="text-red-400 font-bold">Permission denied: Vinay Kumar owns root. Try asking politely!</div>;
        break;

      case 'clear':
        setLogs([]);
        return;

      default:
        outputNode = (
          <div className="text-red-400">
            command not found: {cmd}. Type <span className="text-white font-semibold">help</span> for a list of commands.
          </div>
        );
    }

    setLogs((prev) => [...prev, { command: trimmed, output: outputNode }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      if (history.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInputVal(history[history.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`bg-slate-950 text-slate-100 rounded-xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col font-mono text-xs transition-all duration-300 ${
          isMaximized ? 'w-full h-full' : 'w-full max-w-3xl h-[520px]'
        }`}
      >
        {/* Terminal Titlebar */}
        <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" onClick={() => setIsMaximized(!isMaximized)} />
            <span className="ml-3 text-slate-400 text-xs flex items-center gap-1.5 font-semibold">
              <TerminalIcon className="w-3.5 h-3.5 text-cobalt" />
              vinay@nyu-tandon: ~ (bash)
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              type="button"
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 hover:text-white transition-colors"
              aria-label="Toggle Fullscreen"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:text-white transition-colors"
              aria-label="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Command Stream */}
        <div ref={scrollRef} className="flex-1 p-5 overflow-y-auto space-y-4 font-mono leading-relaxed">
          {logs.map((log, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400">vinay@nyu-tandon</span>
                <span>:</span>
                <span className="text-cobalt">~</span>
                <span>$</span>
                <span className="text-white font-semibold">{log.command}</span>
              </div>
              <div className="pl-4">{log.output}</div>
            </div>
          ))}
        </div>

        {/* Input Line */}
        <div className="bg-slate-900/60 border-t border-slate-800 px-4 py-3 flex items-center gap-2">
          <span className="text-emerald-400 font-bold">vinay@nyu-tandon:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-white outline-none border-none font-mono text-xs placeholder:text-slate-600"
          />
          <CornerDownLeft className="w-3.5 h-3.5 text-slate-500" />
        </div>
      </div>
    </div>
  );
};
