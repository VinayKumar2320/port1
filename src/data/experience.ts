export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string;
  current: boolean;
  type: 'industry' | 'research';
  summary: string;
  problem: string;
  built: string;
  hurdles: string;
  outcomes: string[];
  tech: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "nyu-it",
    role: "Learning Management System (LMS) Specialist",
    company: "NYU Information Technology (NYU IT)",
    location: "New York, NY",
    period: "Jan 2026 – Present",
    startDate: "2026-01",
    endDate: "Present",
    current: true,
    type: "industry",
    summary:
      "Architecting autonomous agentic workflows and automated prompt-chaining pipelines to ingest, summarize, and categorize unstructured faculty consultations across enterprise instructional software.",
    problem:
      "Enterprise instructional platforms receive thousands of unstructured faculty technical inquiries, creating triage bottlenecks, manual routing overhead, and variable response latencies.",
    built:
      "Architected autonomous multi-agent ingestion workflows using Python and LLM APIs, and engineered prompt-chaining evaluation scripts with strict JSON schema outputs for deterministic incident triage.",
    hurdles:
      "Ensuring strict JSON schema adherence and deterministic output quality across highly ambiguous, multi-domain instructional software queries.",
    outcomes: [
      "Architected autonomous agentic workflows using Python and LLM APIs to ingest, summarize, and categorize unstructured faculty consultations, expediting resolution velocity.",
      "Built automated prompt-chaining evaluation scripts with strict JSON schema outputs to triage technical incidents, cutting manual routing overhead and ensuring deterministic operational telemetry.",
      "Integrated operational monitoring to track pipeline routing precision and automate escalation queues."
    ],
    tech: ["Python", "LLM APIs", "LangChain / Agents", "JSON Schema", "Prompt Engineering", "Operational Telemetry", "Enterprise SaaS"]
  },
  {
    id: "healium",
    role: "Machine Learning Systems Intern",
    company: "Healium Intelliscan",
    location: "India",
    period: "Mar 2025 – May 2025",
    startDate: "2025-03",
    endDate: "2025-05",
    current: false,
    type: "industry",
    summary:
      "Constructed deep learning computer vision pipelines in PyTorch for renal ultrasound analysis, applying CLAHE, deep feature extractors, and ONNX Runtime inference optimization.",
    problem:
      "Clinical diagnostic systems require low-latency preprocessing and inference across high-resolution medical imaging scans without acoustic noise distortion or excessive memory consumption under volumetric batch loads.",
    built:
      "Constructed CV pipelines in PyTorch for renal ultrasound analysis; trained EfficientNet-B7 deep feature extraction networks and XGBoost ensembles; engineered distributed data loaders and batch inference routines using ONNX Runtime.",
    hurdles:
      "Mitigating acoustic noise and speckle across 80K frames while preventing GPU memory bottlenecks during multi-slice volumetric evaluation.",
    outcomes: [
      "Constructed CV pipelines in PyTorch for renal ultrasound analysis, applying CLAHE across 80K frames and geometric augmentations across 40K scans to mitigate acoustic noise and speckle.",
      "Trained deep feature extraction networks (EfficientNet-B7) and gradient-boosted ensembles (XGBoost) for structural pathology localization, boosting out-of-distribution F1 score by 14%.",
      "Engineered distributed data loaders and batch inference routines using ONNX Runtime, reducing end-to-end model latency by 79% and memory consumption by 35% during multi-slice volumetric evaluation."
    ],
    tech: ["Python", "PyTorch", "ONNX Runtime", "EfficientNet-B7", "XGBoost", "OpenCV", "CLAHE", "Medical Imaging", "NumPy"]
  },
  {
    id: "kreditbee",
    role: "Machine Learning Intern",
    company: "KreditBee",
    location: "India",
    period: "Sep 2024 – Dec 2024",
    startDate: "2024-09",
    endDate: "2024-12",
    current: false,
    type: "industry",
    summary:
      "Trained and deployed real-time identity anti-spoofing classifiers in Python and TensorFlow/Keras across high-concurrency verification streams to halt presentation attacks.",
    problem:
      "Digital lending onboarding faces presentation attacks, spoofing attempts, and identity falsification that bypass static KYC validation checks.",
    built:
      "Engineered real-time identity anti-spoofing models with hard-negative mining routines and multi-task loss functions; quantized convolutional weights to INT8 for edge execution.",
    hurdles:
      "Mitigating false rejections caused by varying lighting conditions and sensor noise while maintaining strict sub-50ms execution on CPU nodes.",
    outcomes: [
      "Trained and deployed real-time identity anti-spoofing classifiers in Python and TensorFlow/Keras across high-concurrency verification streams to halt presentation attacks.",
      "Formulated hard-negative mining routines and multi-task loss functions across face embeddings, reducing presentation spoof attack error rates by 76% across production benchmarks.",
      "Optimized inference throughput by quantizing convolutional model weights to INT8, achieving sub-45ms execution on edge CPU nodes."
    ],
    tech: ["Python", "TensorFlow", "Keras", "Model Quantization (INT8)", "OpenCV", "Hard-Negative Mining", "Face Embeddings", "AWS", "Docker"]
  },
  {
    id: "369data",
    role: "Machine Learning Intern",
    company: "369 Data Solutions",
    location: "India",
    period: "Sep 2023 – Dec 2023",
    startDate: "2023-09",
    endDate: "2023-12",
    current: false,
    type: "industry",
    summary:
      "Trained and evaluated ResNet and VGG backbone models in PyTorch for automated defect verification across high-variance crystallization imagery.",
    problem:
      "High-variance crystallization imagery requires automated defect and crystal structure verification without high false-positive rates that contaminate downstream analytical pipelines.",
    built:
      "Authored end-to-end training and inference scripts across 5 experimental architectures (ResNet, VGG); engineered confidence-calibration and out-of-distribution (OOD) rejection layers.",
    hurdles:
      "Severe morphological variation and image noise in crystallization droplets leading to false positive classifications.",
    outcomes: [
      "Trained and evaluated ResNet and VGG backbone models in PyTorch for automated defect verification across high-variance crystallization imagery.",
      "Engineered confidence-calibration and out-of-distribution rejection layers that curbed false-positive classifications by 85% across test batches, safeguarding downstream analytical workflows.",
      "Authored end-to-end training and inference scripts, establishing reproducible evaluation pipelines across 5 experimental model architectures."
    ],
    tech: ["Python", "PyTorch", "ResNet", "VGG", "Confidence Calibration", "OOD Rejection", "OpenCV", "NumPy", "Pandas"]
  },
  {
    id: "hsiao-bnmit",
    role: "Research Assistant & Lab Scholar",
    company: "HSIAO Labs & BNMIT AI Research",
    location: "Bangalore & New York",
    period: "2023 – 2025",
    startDate: "2023-01",
    endDate: "2025-05",
    current: false,
    type: "research",
    summary:
      "Conducted foundational and applied research across reinforcement learning for EV smart charging, precision agricultural robotics, brain-computer interfaces, and deep learning medical diagnostics.",
    problem:
      "Modern physical systems (power grids, agricultural machinery, medical imaging) require adaptive intelligence that respects strict physics, resource limits, and real-time execution constraints.",
    built:
      "Co-invented patented IoT automation architectures and co-authored 8 peer-reviewed research papers in computational optimization, reinforcement learning, and human-computer interaction.",
    hurdles:
      "Bridging the sim-to-real gap when translating reinforcement learning and vision models to physical embedded hardware and unpredictable field conditions.",
    outcomes: [
      "Co-invented a patent for AI and IoT-Based Sprinkler for Automated Agricultural Irrigation.",
      "Authored/co-authored 8 published research papers spanning multi-agent RL, precision seeding, and medical diagnostics.",
      "Achieved 2nd place in Smart India Hackathon 2023 and top finishes at IIT Bombay Techfest."
    ],
    tech: ["Multi-Agent RL", "PyTorch", "IoT & Embedded Sensors", "SimPy", "OpenCV", "MATLAB", "SymPy"]
  }
];
