import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Copy, Check, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('vinaykumarmd02@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-border bg-background relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cobalt mb-3">
            <span className="w-2 h-2 rounded-full bg-cobalt inline-block" />
            SECTION 07 // TRANSMISSION & INQUIRIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
            Initiate Contact
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg mt-2">
            Interested in distributed systems engineering, AI platform architecture, research collaborations, or software engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Direct Channels */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-4 font-mono text-xs text-muted-foreground">
                <span className="font-bold uppercase text-foreground">DIRECT COMMUNICATION CHANNELS</span>
                <span className="text-emerald-500 font-bold">RESPONSE_TIME: &lt; 24H</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Card */}
                <div className="p-4 rounded-xl border border-border bg-secondary/30 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <Mail className="w-4 h-4 text-cobalt" />
                      <span>PRIMARY EMAIL</span>
                    </div>
                    <div className="text-base font-bold text-foreground font-mono mt-1 break-all">
                      vinaykumarmd02@gmail.com
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <a
                      href="mailto:vinaykumarmd02@gmail.com"
                      className="px-3 py-1.5 rounded-lg bg-cobalt hover:bg-cobalt-dark text-white font-mono text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <Send className="w-3 h-3" /> Compose
                    </a>
                    <button
                      type="button"
                      onClick={copyEmail}
                      className="px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-foreground font-mono text-xs flex items-center gap-1.5 transition-all"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="p-4 rounded-xl border border-border bg-secondary/30 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <Phone className="w-4 h-4 text-emerald-500" />
                      <span>MOBILE CONTACT</span>
                    </div>
                    <div className="text-base font-bold text-foreground font-mono mt-1">
                      +1 (347) 940-9376
                    </div>
                  </div>
                  <div className="pt-2">
                    <a
                      href="tel:+13479409376"
                      className="inline-flex px-3 py-1.5 rounded-lg border border-border bg-background hover:bg-secondary text-foreground font-mono text-xs font-semibold items-center gap-1.5 transition-all"
                    >
                      Call Mobile
                    </a>
                  </div>
                </div>
              </div>

              {/* Geographic Coordinates */}
              <div className="p-4 rounded-xl border border-border bg-secondary/20 font-mono text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-foreground">
                  <MapPin className="w-4 h-4 text-cobalt" />
                  <span>Brooklyn, New York (NYU Tandon Campus)</span>
                </div>
                <span className="text-muted-foreground text-[10px]">TIMEZONE: EST (UTC-5)</span>
              </div>
            </div>
          </div>

          {/* Social Profiles & Availability */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-card shadow-sm space-y-4">
              <div className="font-mono text-xs font-bold uppercase text-foreground border-b border-border pb-3">
                Professional Repositories & Profiles
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <a
                  href="https://www.linkedin.com/in/vinay-kumar-md-9196711b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary flex items-center justify-between text-foreground transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span>LinkedIn Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground" />
                </a>

                <a
                  href="https://github.com/VinayKumar2320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary flex items-center justify-between text-foreground transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-foreground" />
                    <span>GitHub Repositories</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground" />
                </a>

                <a
                  href="https://scholar.google.com/citations?user=lX3caZQAAAAJ&hl=en&authuser=2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary flex items-center justify-between text-foreground transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <ExternalLink className="w-4 h-4 text-emerald-500" />
                    <span>Google Scholar Profile</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground" />
                </a>
              </div>
            </div>

            {/* Current Availability Status Card */}
            <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 font-mono text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Current Availability</span>
              </div>
              <p className="text-foreground/80 font-sans text-xs leading-relaxed">
                Actively seeking Software Engineering, AI/ML Platform, and Distributed Systems roles starting Summer 2027 / Internships 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
