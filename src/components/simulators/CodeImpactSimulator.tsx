import React, { useState, useMemo } from 'react';
import { GitPullRequest, ShieldCheck, AlertTriangle, Layers, ExternalLink } from 'lucide-react';

export const CodeImpactSimulator: React.FC = () => {
  const [prType, setPrType] = useState<'infra' | 'api' | 'logic' | 'doc'>('logic');
  const [scopes, setScopes] = useState(6);
  const [deltaCC, setDeltaCC] = useState(14);
  const [callers, setCallers] = useState(12);

  const evaluation = useMemo(() => {
    // Base weight by PR type
    const typeWeights = {
      infra: 35,
      api: 20,
      logic: 15,
      doc: 0,
    };

    const rawScore =
      typeWeights[prType] +
      scopes * 2.2 +
      deltaCC * 1.8 +
      callers * 1.4;

    const probability = Math.min(Math.max(Math.round(rawScore), 4), 98);

    let tier: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    if (probability > 75) tier = 'CRITICAL';
    else if (probability > 50) tier = 'HIGH';
    else if (probability > 25) tier = 'MEDIUM';

    // Greedy marginal test coverage simulation
    const totalTests = 42;
    const selectedTests =
      tier === 'CRITICAL' ? 18 : tier === 'HIGH' ? 12 : tier === 'MEDIUM' ? 7 : 3;
    const timeSavedPercent = Math.round(((totalTests - selectedTests) / totalTests) * 100);

    return {
      probability,
      tier,
      totalTests,
      selectedTests,
      timeSavedPercent,
    };
  }, [prType, scopes, deltaCC, callers]);

  return (
    <div className="bg-paper border border-border rounded-lg overflow-hidden font-mono text-xs">
      {/* Header */}
      <div className="bg-secondary/70 border-b border-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <GitPullRequest className="w-4 h-4 text-cobalt" />
          <span className="font-semibold text-foreground tracking-tight text-xs">CODEIMPACT AST REGRESSION EVALUATOR</span>
          <span className="px-1.5 py-0.5 rounded bg-cobalt/10 text-cobalt text-[10px] border border-cobalt/20">
            TREESHAP EXPLAINABILITY
          </span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground text-[11px]">
          <div>CI TIME SAVED: <span className="font-bold text-emerald-500">-{evaluation.timeSavedPercent}%</span></div>
          <div>DEFECT RECALL: <span className="font-bold text-foreground">100%</span></div>
          <a
            href="https://VinayKumar2320.github.io/CodeImpact/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-cobalt hover:underline"
          >
            Open Live Demo <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Risk Prediction & TreeSHAP Attributions */}
        <div className="md:col-span-2 p-5 bg-background flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
              PR Risk Prediction & Tree-Sitter AST Localization
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                evaluation.tier === 'CRITICAL'
                  ? 'bg-red-500/10 text-red-600 border-red-500/30'
                  : evaluation.tier === 'HIGH'
                  ? 'bg-orange-500/10 text-orange-600 border-orange-500/30'
                  : evaluation.tier === 'MEDIUM'
                  ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                  : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30'
              }`}
            >
              TIER: {evaluation.tier} ({evaluation.probability}% P_REGRESS)
            </span>
          </div>

          {/* TreeSHAP Feature Attributions */}
          <div className="space-y-2.5 bg-secondary/30 p-3 rounded border border-border">
            <div className="text-[10px] font-bold uppercase text-muted-foreground">
              Local TreeSHAP Attribution Vector ($\phi_i$)
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span>Cyclomatic Complexity Growth (ΔCC = +{deltaCC}):</span>
                <span className="text-orange-500 font-bold">+{(deltaCC * 0.02).toFixed(2)}</span>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${Math.min(deltaCC * 3, 100)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span>Transitive Dependency Centrality ({callers} callers):</span>
                <span className="text-orange-500 font-bold">+{(callers * 0.015).toFixed(2)}</span>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${Math.min(callers * 4, 100)}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span>Modified Scope Breadth ({scopes} AST nodes):</span>
                <span className="text-cobalt font-bold">+{(scopes * 0.01).toFixed(2)}</span>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-cobalt rounded-full" style={{ width: `${Math.min(scopes * 5, 100)}%` }} />
              </div>
            </div>
          </div>

          {/* Budgeted Test Selection */}
          <div className="p-3 rounded border border-border bg-emerald-500/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <div>
                <div className="font-bold text-foreground">Intelligent CI Test Selection</div>
                <div className="text-[10px] text-muted-foreground">
                  Running {evaluation.selectedTests} of {evaluation.totalTests} tests covers 100% modified call branches
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-emerald-500 font-bold text-base">-{evaluation.timeSavedPercent}%</span>
              <div className="text-[9px] text-muted-foreground">Runtime Delta</div>
            </div>
          </div>
        </div>

        {/* PR Controls */}
        <div className="p-4 bg-secondary/30 space-y-4">
          <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-muted-foreground">
            Pull Request Parameters
          </div>

          <div>
            <div className="text-[11px] text-muted-foreground mb-1.5">Change Archetype:</div>
            <div className="grid grid-cols-2 gap-1.5">
              {(['infra', 'api', 'logic', 'doc'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPrType(type)}
                  className={`py-1.5 px-2 rounded text-[11px] border uppercase transition-colors ${
                    prType === type
                      ? 'bg-cobalt text-white border-cobalt font-bold'
                      : 'bg-background border-border text-foreground hover:bg-secondary'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted-foreground">Modified Scopes:</span>
              <span className="font-bold text-foreground">{scopes} AST scopes</span>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={scopes}
              onChange={(e) => setScopes(Number(e.target.value))}
              className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-cobalt"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted-foreground">Complexity Delta (ΔCC):</span>
              <span className="font-bold text-foreground">+{deltaCC} branches</span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              value={deltaCC}
              onChange={(e) => setDeltaCC(Number(e.target.value))}
              className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-cobalt"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-muted-foreground">Transitive Callers:</span>
              <span className="font-bold text-foreground">{callers} callers</span>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              value={callers}
              onChange={(e) => setCallers(Number(e.target.value))}
              className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-cobalt"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
