export interface PublicationItem {
  id: string;
  title: string;
  type: 'Patent' | 'Journal' | 'Conference';
  status: 'Published' | 'Patent Submitted / Granted';
  year: string;
  authors: string;
  venue: string;
  category: 'Reinforcement Learning' | 'Healthcare AI' | 'Computer Vision & HCI' | 'Robotics & IoT' | 'Cloud & Quantum';
  summary: string;
  impactMetrics?: string;
  link?: string;
}

export const PUBLICATIONS: PublicationItem[] = [
  {
    id: "patent-sprinkler",
    title: "AI and IoT-Based Sprinkler for Automated Agricultural Irrigation",
    type: "Patent",
    status: "Patent Submitted / Granted",
    year: "2024",
    authors: "Vinay Kumar (Co-inventor) et al.",
    venue: "Intellectual Property India",
    category: "Robotics & IoT",
    summary:
      "Co-inventor of an intelligent automated agricultural irrigation system integrating soil moisture telemetry, weather micro-forecasting, and adaptive valve actuators to optimize water conservation.",
    impactMetrics: "Autonomous closed-loop water management"
  },
  {
    id: "paper-ev-charging",
    title: "Hierarchical Multi-Agent Deep Reinforcement Learning Framework for EV Charging",
    type: "Journal",
    status: "Published",
    year: "2024",
    authors: "Vinay Kumar et al.",
    venue: "International Journal / Research Paper",
    category: "Reinforcement Learning",
    summary:
      "Hierarchical multi-agent reinforcement learning architecture optimizing charging station allocation across dynamic electric vehicle fleets under renewable energy intermittency.",
    impactMetrics: "30% lower wait times, 15% higher renewable usage, 22% reduced system latency"
  },
  {
    id: "paper-precision-seeding",
    title: "Precision Seeding Robot Integrating GPS, Computer Vision, and AI",
    type: "Journal",
    status: "Published",
    year: "2024",
    authors: "Vinay Kumar et al.",
    venue: "Agricultural Robotics & Automation Research",
    category: "Robotics & IoT",
    summary:
      "Autonomous agricultural field robot coupling real-time GPS telemetry, computer vision seed depth tracking, and micro-actuators for optimized crop planting.",
    impactMetrics: "30.77% higher maize yield, 28.57% better seed depth accuracy, 25% lower resource usage"
  },
  {
    id: "paper-voice-gesture-hci",
    title: "Enhancing Human-Computer Interaction: Integrating Voice Assistants and Gesture Recognition for Innovative Mouse Control",
    type: "Journal",
    status: "Published",
    year: "2024",
    authors: "Vinay Kumar, Ankith H Bharadwaj, Mahanthesha U.",
    venue: "Tuijin Jishu / Journal of Propulsion Technology, 45(2)",
    category: "Computer Vision & HCI",
    summary:
      "Ergonomic dual-modal human-computer interaction system combining MediaPipe optical hand tracking with NLP speech command pipelines for contactless OS cursor interaction.",
    impactMetrics: "Real-time 60 FPS sub-16ms latency"
  },
  {
    id: "paper-bci-vehicle",
    title: "A Hybrid Brain-Computer Interface and Computer Vision-Based Human-Vehicle Collaborative Simulated Driving System",
    type: "Journal",
    status: "Published",
    year: "2024",
    authors: "Vinay Kumar, Shri Ranjani S M, Milan Srinivas, Shravya Bhat",
    venue: "International Journal of Innovative Research in Computer and Communication Engineering (IJIRCCE), Vol. 12, Issue 8",
    category: "Computer Vision & HCI",
    summary:
      "Collaborative human-vehicle driving simulator merging EEG brain-computer interface signal telemetry with real-time computer vision driver attention monitoring.",
    impactMetrics: "Multi-sensor cognitive state tracking"
  },
  {
    id: "paper-inverse-recipe",
    title: "Inverse Recipe Generation and Food Quality Detection",
    type: "Journal",
    status: "Published",
    year: "2023",
    authors: "Dr. Mahanthesha U, Vinay Kumar, Suzane Fernandes, Shri Ranjani S M, Shrividya K P",
    venue: "YMER Journal, 23(5)",
    category: "Computer Vision & HCI",
    summary:
      "Multimodal deep learning model analyzing prepared food imagery to predict constituent ingredients, culinary preparation steps, and shelf-life freshness indices.",
    impactMetrics: "YMER Journal Publication"
  },
  {
    id: "paper-llm-robot",
    title: "Improving LLM-Based Robot Control via Human-Robot Cooperation",
    type: "Journal",
    status: "Published",
    year: "2024",
    authors: "Vinay Kumar et al.",
    venue: "International Journal of Innovative Research in Computer and Communication Engineering (IJIRCCE), Vol. 12, Issue 8",
    category: "Robotics & IoT",
    summary:
      "Investigation into grounding large language model task planning with physical robot kinematic verification and real-time human supervisor feedback.",
    impactMetrics: "Human-in-the-loop task grounding"
  },
  {
    id: "paper-quantum-cloud",
    title: "A Hybrid Reference Architecture Enabling Quantum Computing Capabilities for Cloud Utilization: Toward a Quantum-Science Gateway",
    type: "Journal",
    status: "Published",
    year: "2024",
    authors: "Vinay Kumar et al.",
    venue: "International Advanced Research Journal in Science, Engineering and Technology (IARJSET), Vol. 11, Issue 8",
    category: "Cloud & Quantum",
    summary:
      "Architectural blueprint for hybrid classical-quantum cloud gateways, abstracting quantum circuit execution, hybrid variational solvers, and classical queuing middleware.",
    impactMetrics: "Hybrid cloud orchestration pattern"
  },
  {
    id: "paper-histopathology",
    title: "Breast Cancer Histopathology Classification Using Levenberg–Marquardt Optimised Deep Neural Networks",
    type: "Journal",
    status: "Published",
    year: "2024",
    authors: "Vinay Kumar et al.",
    venue: "International Journal of Advanced Research in Computer and Communication Engineering (IJARCCE), Vol. 13, Issue 8",
    category: "Healthcare AI",
    summary:
      "Computer-aided diagnostic deep neural network using Levenberg-Marquardt second-order optimization for high-sensitivity biopsy tissue histopathology classification.",
    impactMetrics: "High-accuracy diagnostic classification"
  }
];
