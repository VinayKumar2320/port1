export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'ai-systems' | 'distributed' | 'simulation' | 'research-agents' | 'vision-hci';
  categoryLabel: string;
  featured: boolean;
  date: string;
  summary: string;
  impactMetrics: { label: string; value: string; detail: string }[];
  architecture: {
    overview: string;
    flowSteps: string[];
    keyChallenge: string;
  };
  tech: string[];
  links: {
    github: string;
    liveDemo?: string;
    apiDocs?: string;
    paper?: string;
  };
  simulatorType?: 'fraud' | 'hospital' | 'risk' | 'pde';
}

export const PROJECTS: Project[] = [
  {
    id: "fraudgraph",
    title: "FraudGraph",
    tagline: "Real-Time Financial Fraud Intelligence Platform",
    category: "distributed",
    categoryLabel: "Graph ML & Distributed Streaming",
    featured: true,
    date: "2025",
    summary:
      "Enterprise-grade financial fraud intelligence platform engineered to detect coordinated fraud rings, smurfing structures, account takeovers, and synthetic identities under streaming load with sub-5ms inference latency.",
    impactMetrics: [
      { label: "Inference Latency", value: "< 5ms", detail: "Real-time edge scoring on streaming Kafka topics" },
      { label: "Architecture", value: "Multi-Model", detail: "XGBoost + GraphSAGE (PyG) + Isolation Forest" },
      { label: "Infrastructure", value: "Distributed", detail: "Apache Kafka 3.7 + FastAPI + PostgreSQL 16 + React 18" },
      { label: "Detection Scope", value: "Rings & Mules", detail: "Smurfing clusters & heterogeneous graph centrality" }
    ],
    architecture: {
      overview:
        "Raw transaction events stream into Apache Kafka topics (`transactions.raw`). A streaming worker calculates point-in-time temporal features alongside dynamic heterogeneous graph topologies in NetworkX / PyTorch Geometric. Scoring ensembles evaluate transaction-level anomalies, graph structural embeddings, and cluster density simultaneously.",
      flowSteps: [
        "Synthetic / Live Replay Ingestion via FastAPI gateway",
        "Kafka partitioning across `transactions.raw` message bus",
        "Point-in-time rolling feature calculations (velocities, burst ratios)",
        "Incremental graph topology updates with heterogeneous node-edge types",
        "Ensemble scoring: Transaction XGBoost + GraphSAGE + Isolation Forest",
        "Fraud ring cluster resolution & sub-5ms alerting payload"
      ],
      keyChallenge:
        "Sustaining sub-5ms per-transaction scoring while dynamically computing graph centrality and multi-hop neighborhood features without lookahead data leakage."
    },
    tech: ["Python 3.12", "FastAPI", "Apache Kafka", "PostgreSQL", "PyTorch Geometric", "GraphSAGE", "XGBoost", "React 18", "TypeScript", "Docker"],
    links: {
      github: "https://github.com/VinayKumar2320/FraudGraph-Real-Time-Fraud-Intelligence",
      liveDemo: "https://fraudgraph-dashboard.onrender.com",
      apiDocs: "https://fraudgraph-api-ef6g.onrender.com/docs"
    },
    simulatorType: "fraud"
  },
  {
    id: "medflow",
    title: "MedFlow",
    tagline: "AI Hospital Operations Digital Twin & ED Capacity Planner",
    category: "simulation",
    categoryLabel: "Operations Research & Simulation",
    featured: true,
    date: "2025",
    summary:
      "High-fidelity healthcare operations digital twin combining non-homogeneous Poisson arrival forecasting, SimPy discrete-event clinical simulations, and Google OR-Tools constraint optimization for emergency department shift planning.",
    impactMetrics: [
      { label: "Arrival Forecasting", value: "80% & 95% CI", detail: "LightGBM Quantile GBDT across 1h, 4h, 12h, 24h horizons" },
      { label: "Discrete Event", value: "SimPy 4.1", detail: "7-stage clinical pipeline with ESI 1–5 preemptive queueing" },
      { label: "Optimization", value: "OR-Tools CP-SAT", detail: "Integer programming for physician, nurse, and bed allocation" },
      { label: "Evaluation", value: "CRN Monte Carlo", detail: "Common Random Numbers to isolate policy delta from noise" }
    ],
    architecture: {
      overview:
        "Combines probabilistic machine learning with operations research: LightGBM models stochastic patient arrivals with calibrated uncertainty intervals; SimPy executes discrete-event simulations through triage, bed allocation, labs, and disposition; Google OR-Tools CP-SAT solves multi-shift integer programming problems subject to labor budgets and skill ratios.",
      flowSteps: [
        "Time-series feature extraction (lags, cyclic temporal encodings, surges)",
        "Probabilistic arrival modeling via LightGBM Quantile regression",
        "7-stage discrete-event simulation with ESI 1-5 priority queues",
        "Multi-resource contention tracking (physicians, nurses, diagnostic imaging)",
        "CP-SAT integer optimization for physician and nurse shift schedules",
        "Monte Carlo policy comparison using Common Random Numbers (CRN)"
      ],
      keyChallenge:
        "Guaranteeing strict conservation of mass (Arrived = Departed + In-System) while handling stochastic preemptive interruptions for life-critical ESI-1 traumas."
    },
    tech: ["Python 3.12", "SimPy 4.1", "Google OR-Tools", "LightGBM", "FastAPI", "React 19", "TypeScript", "Render Cloud"],
    links: {
      github: "https://github.com/VinayKumar2320/MedFlow-AI-Hospital-Digital-Twin",
      liveDemo: "https://medflow-dashboard.onrender.com",
      apiDocs: "https://medflow-api-kgsv.onrender.com/docs"
    },
    simulatorType: "hospital"
  },
  {
    id: "codeimpact",
    title: "CodeImpact",
    tagline: "Predictive Software Change Risk Analyzer & Intelligent CI",
    category: "ai-systems",
    categoryLabel: "Developer Tools & Static Analysis",
    featured: true,
    date: "2025",
    summary:
      "Developer tools platform that reconstructs AST syntactical differences, calculates cyclomatic complexity deltas, builds transitive call graphs, predicts pull request regression risk with TreeSHAP explanations, and executes budgeted greedy test selection.",
    impactMetrics: [
      { label: "Defect Recall", value: "100%", detail: "Zero regression leakage on benchmarked test suites" },
      { label: "CI Runtime", value: "-73.7%", detail: "Reduction in test execution time via greedy marginal coverage" },
      { label: "Model Gain", value: "+69.2% PR-AUC", detail: "Outperformed code churn baselines on 1,200 mined PRs" },
      { label: "Explainability", value: "TreeSHAP", detail: "Local game-theoretic attribution per code change feature" }
    ],
    architecture: {
      overview:
        "Ingests GitHub pull request webhooks, parses hunks with Tree-sitter for AST scope localization, measures cyclomatic complexity deltas with Radon, computes transitive call graph betweenness in NetworkX, scores merge risk with calibrated XGBoost, and generates budgeted test execution subsets.",
      flowSteps: [
        "HMAC-verified webhook ingestion with Redis deduplication",
        "Tree-sitter AST parsing for Python and TypeScript hunks",
        "Radon cyclomatic complexity delta calculation (ΔCC)",
        "NetworkX call and dependency graph centrality mapping",
        "Calibrated XGBoost risk scoring with TreeSHAP explanations",
        "Budgeted greedy maximum-coverage test suite selection"
      ],
      keyChallenge:
        "Preventing look-ahead temporal leakage by strictly partitioning open-source PR training data using chronological release splits."
    },
    tech: ["Python 3.12", "FastAPI", "Tree-sitter", "Radon", "NetworkX", "XGBoost", "TreeSHAP", "React 18", "GitHub Actions"],
    links: {
      github: "https://github.com/VinayKumar2320/CodeImpact",
      liveDemo: "https://VinayKumar2320.github.io/CodeImpact/"
    },
    simulatorType: "risk"
  },
  {
    id: "autonomous-diagnostics",
    title: "Autonomous Diagnostics Agent",
    tagline: "Distributed System Telemetry & SRE Remediation Agent",
    category: "ai-systems",
    categoryLabel: "Autonomous Agents & SRE",
    featured: true,
    date: "2025",
    summary:
      "Enterprise autonomous incident diagnostics platform that ingests distributed trace headers, pinpoints root-cause failure spans, queries historical incidents via FAISS vector search, and executes a 10-node LangGraph investigation workflow in under 4 seconds.",
    impactMetrics: [
      { label: "Root Cause Latency", value: "< 4s", detail: "Sub-4-second automated diagnostic conclusions" },
      { label: "Workflow Graph", value: "10 Nodes", detail: "Stateful LangGraph agent with deterministic safety gates" },
      { label: "Semantic Search", value: "FAISS Dense", detail: "Multi-stage retrieval over historical incident bug reports" },
      { label: "Verification", value: "Repro Scripts", detail: "Automated reproduction plans and structured defect reports" }
    ],
    architecture: {
      overview:
        "Ingests distributed spans (`X-Trace-ID`, `X-Span-ID`), reconstructs directed execution acyclic graphs, flags anomaly origins (e.g. Redis timeouts causing downstream HTTP 500s), queries FAISS incident memory, executes a 10-node LangGraph StateGraph, and verifies proposed remediations through safety gates.",
      flowSteps: [
        "Distributed trace header ingestion and span timeline reconstruction",
        "Earliest-failure anomaly isolation across microservice boundaries",
        "FAISS dense vector retrieval over historical post-mortems",
        "LangGraph 10-node stateful investigation agent execution",
        "Root cause hypothesis generation and ranked confidence scoring",
        "Automated reproduction plan and remediation safety gate check"
      ],
      keyChallenge:
        "Distinguishing root-cause upstream failures from cascading downstream network timeouts without alerting storms."
    },
    tech: ["Python 3.12", "LangGraph", "FAISS", "FastAPI", "Docker Compose", "React 18", "OpenTelemetry Traces"],
    links: {
      github: "https://github.com/VinayKumar2320/autonomous-diagnostics-agent"
    }
  },
  {
    id: "pde-agent",
    title: "Verifier-Guided PDE Agent",
    tagline: "Symbolic Verification-Driven Scientific Problem Solver",
    category: "research-agents",
    categoryLabel: "Scientific AI & AWS Trainium2",
    featured: true,
    date: "2025",
    summary:
      "AI-assisted partial differential equation problem-solving system developed for the NYU x Annapurna Labs hackathon. Employs Qwen3-8B on AWS Trainium2 paired with a closed-loop SymPy symbolic verifier to iteratively critique and refine mathematical candidate solutions.",
    impactMetrics: [
      { label: "Verification", value: "100% Pass", detail: "5/5 problems passed in verifier-guided revision loop" },
      { label: "Hardware", value: "AWS Trainium2", detail: "vLLM inference acceleration with custom Annapurna neuron kernels" },
      { label: "Reasoning Loop", value: "Closed-Loop", detail: "Symbolic error feedback injected directly into revision prompts" },
      { label: "Symbolic Solver", value: "SymPy Core", detail: "Exact boundary, initial condition, and governing PDE verification" }
    ],
    architecture: {
      overview:
        "A generator-verifier architecture where candidate mathematical expressions are evaluated against boundary conditions, initial values, and differential operators using SymPy. Exact residual errors are fed back to guide iterative candidate revision until satisfaction.",
      flowSteps: [
        "Heat-equation and wave-equation specification ingestion",
        "Qwen3-8B candidate solution generation on AWS Trainium2",
        "SymPy algebraic and differential condition verification",
        "Residual calculation and symbolic verification scoring",
        "Iterative error feedback loop for candidate refinement",
        "Accepted analytical solution logging and verification report"
      ],
      keyChallenge:
        "Overcoming LLM algebraic hallucinations by bounding generation within a deterministic symbolic computer algebra verifier."
    },
    tech: ["Python", "SymPy", "Qwen3-8B", "AWS Trainium2", "vLLM", "Streamlit", "Neuron SDK"],
    links: {
      github: "https://github.com/VinayKumar2320/Verifier-Guided-PDE-Agent"
    }
  },
  {
    id: "geoai",
    title: "GeoAI — Earth on a Table",
    tagline: "Interactive Unity AR/XR Geographic Intelligence & Geolocation",
    category: "vision-hci",
    categoryLabel: "Computer Vision & AR/XR",
    featured: false,
    date: "2024",
    summary:
      "Interactive Unity AR/XR geographic exploration system utilizing mobile device sensors, gaze interaction, and live camera environments paired with MobileNetV3 image-based worldwide geolocation.",
    impactMetrics: [
      { label: "Platform", value: "Unity AR/XR", detail: "6-DoF sensor fusion and camera pass-through interaction" },
      { label: "Vision Backbone", value: "MobileNetV3", detail: "Lightweight on-device image geolocation" },
      { label: "HCI Mode", value: "Gaze & Touch", detail: "Spatial tabletop holographic interaction" }
    ],
    architecture: {
      overview:
        "Combines mobile augmented reality tracking with deep learning image recognition to project high-resolution geospatial terrain onto tabletop surfaces with interactive marker interrogation.",
      flowSteps: [
        "ARCore / ARKit planar surface estimation",
        "Tabletop mesh anchoring and dynamic scaling",
        "MobileNetV3 vision feature extraction for geolocation",
        "Interactive gaze and touch spatial raycasting"
      ],
      keyChallenge: "Balancing high-poly terrain rendering with real-time mobile neural network inference."
    },
    tech: ["Unity 3D", "C#", "ARCore", "MobileNetV3", "PyTorch", "OpenCV"],
    links: {
      github: "https://github.com/VinayKumar2320/GeoNet-Image-Based-Geolocation-using-MobileNetV3"
    }
  },
  {
    id: "virtual-mouse",
    title: "Canva On Air & VirtualMouse",
    tagline: "Vision-Based Touchless Human-Computer Interaction",
    category: "vision-hci",
    categoryLabel: "Computer Vision & Published Research",
    featured: false,
    date: "2023 - 2024",
    summary:
      "Touchless computer vision control system integrating real-time hand landmark tracking and voice commands for ergonomic human-computer interaction, published in the Journal of Propulsion Technology (2024).",
    impactMetrics: [
      { label: "Latency", value: "< 16ms", detail: "Real-time 60 FPS gesture tracking on consumer webcams" },
      { label: "Publication", value: "Peer-Reviewed", detail: "Journal of Propulsion Technology, 45(2), 2024" },
      { label: "Tracking", value: "21 Keypoints", detail: "MediaPipe hand landmark tracking and dynamic gesture mapping" }
    ],
    architecture: {
      overview:
        "Dual-modal interface combining OpenCV/MediaPipe optical landmark extraction with speech recognition commands for virtual mouse control and air canvas painting.",
      flowSteps: [
        "Live camera frame capture and preprocessing",
        "Hand landmark regression (21 3D coordinates)",
        "Pinch, swipe, and point gesture classification",
        "Direct OS cursor event synthesis via PyAutoGUI"
      ],
      keyChallenge: "Eliminating cursor jitter through adaptive Kalman filtering and velocity thresholds."
    },
    tech: ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "SpeechRecognition", "Tkinter"],
    links: {
      github: "https://github.com/VinayKumar2320/VirtualMouse"
    }
  },
  {
    id: "closet-stylist",
    title: "AI Closet Stylist",
    tagline: "Multimodal Deep Learning Fashion Recommendation",
    category: "vision-hci",
    categoryLabel: "Computer Vision & Multimodal AI",
    featured: false,
    date: "2024",
    summary:
      "Computer vision fashion intelligence system analyzing wardrobe imagery, segmenting apparel items, extracting color harmonies and style semantics, and generating coordinated outfit pairings.",
    impactMetrics: [
      { label: "Segmentation", value: "Apparel Parsing", detail: "Instance-level clothing item isolation" },
      { label: "Embeddings", value: "Multimodal", detail: "Joint visual and textual style semantic representations" },
      { label: "Pairing", value: "Graph Harmony", detail: "Color wheel and occasion compatibility scoring" }
    ],
    architecture: {
      overview:
        "Upload wardrobe photos to automatically detect, catalog, and pair garments based on color theory, weather forecasts, and occasion criteria.",
      flowSteps: [
        "Image upload and background subtraction",
        "Deep learning apparel categorization and feature embedding",
        "Color histogram and palette compatibility analysis",
        "Ranked outfit candidate generation"
      ],
      keyChallenge: "Handling diverse lighting, folds, and unconstrained photo angles in user-submitted garments."
    },
    tech: ["Python", "PyTorch", "Torchvision", "Streamlit", "Scikit-learn"],
    links: {
      github: "https://github.com/VinayKumar2320/Smart_fashion_recommender"
    }
  }
];
