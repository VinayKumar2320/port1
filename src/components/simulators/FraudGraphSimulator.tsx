import React, { useState, useMemo } from 'react';
import { ShieldAlert, Zap, RefreshCw, ExternalLink, Play, Radio } from 'lucide-react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  type: 'account' | 'merchant' | 'device';
  label: string;
  x: number;
  y: number;
  isFraud?: boolean;
}

interface Edge {
  from: string;
  to: string;
  amount: number;
  isFraud?: boolean;
}

export const FraudGraphSimulator: React.FC = () => {
  const [velocity, setVelocity] = useState(450); // tps
  const [smurfingActive, setSmurfingActive] = useState(false);
  const [sybilActive, setSybilActive] = useState(false);
  const [isStreaming, setIsStreaming] = useState(true);

  // Compute graph state
  const { nodes, edges, riskScore, latencyMs } = useMemo(() => {
    const baseNodes: Node[] = [
      { id: 'acc-1', type: 'account', label: 'ACC:0x91A', x: 20, y: 30 },
      { id: 'acc-2', type: 'account', label: 'ACC:0x34B', x: 50, y: 20 },
      { id: 'acc-3', type: 'account', label: 'ACC:0x77C', x: 80, y: 30 },
      { id: 'm-1', type: 'merchant', label: 'GATEWAY_PAY', x: 50, y: 70 },
      { id: 'dev-1', type: 'device', label: 'DEV:FINGERPRINT', x: 25, y: 75 },
    ];

    const baseEdges: Edge[] = [
      { from: 'acc-1', to: 'm-1', amount: 120 },
      { from: 'acc-2', to: 'm-1', amount: 350 },
      { from: 'acc-3', to: 'm-1', amount: 95 },
    ];

    let score = 12; // baseline low risk
    let latency = 3.4;

    if (smurfingActive) {
      score += 48;
      latency += 0.4;
      baseNodes.push(
        { id: 'mule-1', type: 'account', label: 'MULE:A1', x: 35, y: 48, isFraud: true },
        { id: 'mule-2', type: 'account', label: 'MULE:A2', x: 65, y: 48, isFraud: true }
      );
      baseEdges.push(
        { from: 'acc-1', to: 'mule-1', amount: 9800, isFraud: true },
        { from: 'mule-1', to: 'mule-2', amount: 9750, isFraud: true },
        { from: 'mule-2', to: 'acc-3', amount: 9600, isFraud: true }
      );
    }

    if (sybilActive) {
      score += 35;
      latency += 0.3;
      baseNodes.forEach((n) => {
        if (n.type === 'device' || n.id === 'acc-2') n.isFraud = true;
      });
      baseEdges.push({ from: 'acc-2', to: 'dev-1', amount: 4800, isFraud: true });
    }

    const calculatedLatency = (latency + (velocity / 1000) * 0.8).toFixed(1);
    return {
      nodes: baseNodes,
      edges: baseEdges,
      riskScore: Math.min(score, 99),
      latencyMs: calculatedLatency,
    };
  }, [velocity, smurfingActive, sybilActive]);

  return (
    <div className="bg-paper border border-border rounded-lg overflow-hidden font-mono text-xs">
      {/* Telemetry Header */}
      <div className="bg-secondary/70 border-b border-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-foreground tracking-tight text-xs">FRAUDGRAPH STREAMING WORKER</span>
          <span className="px-1.5 py-0.5 rounded bg-cobalt/10 text-cobalt text-[10px] border border-cobalt/20">KAFKA: transactions.raw</span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground text-[11px]">
          <div>INFERENCE: <span className="font-bold text-foreground">{latencyMs} ms</span></div>
          <div>VELOCITY: <span className="font-bold text-foreground">{velocity} TPS</span></div>
          <a
            href="https://fraudgraph-dashboard.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-cobalt hover:underline"
          >
            Open Live App <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Interactive Graph Canvas */}
        <div className="md:col-span-2 p-5 bg-background relative min-h-[280px] flex flex-col justify-between">
          <div className="text-[11px] text-muted-foreground flex justify-between">
            <span>Heterogeneous Entity Graph Topology</span>
            <span className={riskScore > 50 ? "text-orange-500 font-bold" : "text-emerald-500 font-bold"}>
              RISK: {riskScore}% {riskScore > 50 ? "[SUSPICIOUS CLUSTER]" : "[CLEAN STREAM]"}
            </span>
          </div>

          {/* SVG Diagram Canvas */}
          <div className="relative w-full h-56 my-2">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Edges */}
              {edges.map((e, i) => {
                const source = nodes.find((n) => n.id === e.from);
                const target = nodes.find((n) => n.id === e.to);
                if (!source || !target) return null;
                return (
                  <g key={i}>
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={e.isFraud ? "#F97316" : "rgba(100, 116, 139, 0.4)"}
                      strokeWidth={e.isFraud ? "1.5" : "0.8"}
                      strokeDasharray={e.isFraud ? "2, 1" : undefined}
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const isWarning = node.isFraud;
                return (
                  <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                    <circle
                      r={node.type === 'merchant' ? 6 : 4.5}
                      fill={isWarning ? "#EA580C" : node.type === 'merchant' ? "#2563EB" : "#475569"}
                      stroke="#fff"
                      strokeWidth="1"
                    />
                    <text
                      y={-6}
                      textAnchor="middle"
                      fill="currentColor"
                      fontSize="3.2"
                      className="font-mono font-medium fill-foreground"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-border/50">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-600 inline-block" /> Account</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block" /> Merchant Gateway</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" /> Flagged Entity</span>
            </div>
            <span>Sub-5ms GraphSAGE Embeddings</span>
          </div>
        </div>

        {/* Live Controls & Scoring Breakdown */}
        <div className="p-4 bg-secondary/30 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="font-semibold text-foreground text-xs uppercase tracking-wider text-muted-foreground">
              Inject Fraud Topologies
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSmurfingActive(!smurfingActive)}
                className={`w-full py-2 px-3 text-left rounded border flex items-center justify-between transition-colors ${
                  smurfingActive
                    ? 'bg-orange-500/10 border-orange-500/50 text-orange-600 dark:text-orange-400 font-bold'
                    : 'bg-background border-border text-foreground hover:bg-secondary'
                }`}
              >
                <span>Structured Smurfing Ring</span>
                <span className="text-[10px]">{smurfingActive ? 'ACTIVE' : 'INJECT'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSybilActive(!sybilActive)}
                className={`w-full py-2 px-3 text-left rounded border flex items-center justify-between transition-colors ${
                  sybilActive
                    ? 'bg-orange-500/10 border-orange-500/50 text-orange-600 dark:text-orange-400 font-bold'
                    : 'bg-background border-border text-foreground hover:bg-secondary'
                }`}
              >
                <span>Sybil Device Takeover</span>
                <span className="text-[10px]">{sybilActive ? 'ACTIVE' : 'INJECT'}</span>
              </button>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-muted-foreground">Streaming Velocity:</span>
                <span className="font-bold text-foreground">{velocity} TPS</span>
              </div>
              <input
                type="range"
                min="100"
                max="2500"
                step="50"
                value={velocity}
                onChange={(e) => setVelocity(Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-cobalt"
              />
            </div>
          </div>

          <div className="bg-background p-3 rounded border border-border space-y-2">
            <div className="text-[10px] uppercase font-bold text-muted-foreground">Scoring Pipeline Breakdown</div>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction XGBoost:</span>
                <span className="font-mono">{smurfingActive || sybilActive ? '0.84' : '0.08'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GraphSAGE Embedding:</span>
                <span className="font-mono">{smurfingActive ? '0.91 [Anomaly]' : '0.12 [Normal]'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Isolation Forest:</span>
                <span className="font-mono">{sybilActive ? '0.89 [Outlier]' : '0.05 [Inlier]'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
