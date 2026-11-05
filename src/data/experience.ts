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
    id: "healium",
    role: "Software Developer Intern",
    company: "Healium Intelliscan Corp",
    location: "New York, NY",
    period: "2025",
    startDate: "2025-01",
    endDate: "Present",
    current: true,
    type: "industry",
    summary:
      "Engineering real-time high-throughput medical image processing pipelines and computer vision diagnostic algorithms in Python, PyTorch, and OpenCV.",
    problem:
      "Clinical diagnostic systems require low-latency preprocessing and inference across high-resolution medical imaging scans without introducing artifact distortions or memory leaks under batch loads.",
    built:
      "Architected optimized medical image transformation pipelines, automated quality-control heuristics, and integrated deep learning inference engines for clinician decision support.",
    hurdles:
      "Optimizing memory allocation and GPU tensor caching during high-resolution multi-slice volumetric reconstructions to prevent OOM errors.",
    outcomes: [
      "Reduced image preprocessing latency by 79% through vectorized parallel tensor operations and memory mapping.",
      "Engineered real-time computer vision feature extractors for clinical diagnostic tools.",
      "Stabilized high-throughput streaming pipelines for automated image quality triage."
    ],
    tech: ["Python", "PyTorch", "OpenCV", "Medical Imaging", "NumPy", "Docker", "Linux"]
  },
  {
    id: "kreditbee",
    role: "Data Science Intern",
    company: "KreditBee",
    location: "Bangalore, India",
    period: "Sep 2024 – Jan 2025",
    startDate: "2024-09",
    endDate: "2025-01",
    current: false,
    type: "industry",
    summary:
      "Engineered a real-time biometric liveliness detection platform using Convolutional Neural Networks and transfer learning for high-consequence fraud prevention.",
    problem:
      "Digital lending onboarding faces presentation attacks, spoofing attempts, and identity falsification that bypass static KYC validation checks.",
    built:
      "Developed an end-to-end computer vision liveliness detection service with transfer learning, custom attention heads, and hyperparameter tuning deployed via Docker on AWS.",
    hurdles:
      "Mitigating false rejections caused by varying lighting conditions, low-end mobile front cameras, and motion blur during live verification.",
    outcomes: [
      "Cut biometric false positives by 76%, substantially improving genuine customer conversion and reducing manual audit load.",
      "Enhanced detection accuracy by over 15% through batch normalization, dropout calibration, and data augmentation.",
      "Containerized and deployed inference service with Docker and AWS for scalable production traffic."
    ],
    tech: ["Python", "TensorFlow", "OpenCV", "CNNs", "Transfer Learning", "AWS", "Docker", "Scikit-learn"]
  },
  {
    id: "369data",
    role: "Machine Learning Intern",
    company: "369 Data Solution PTE. LTD",
    location: "Bangalore, India",
    period: "Sep 2023 – Dec 2023",
    startDate: "2023-09",
    endDate: "2023-12",
    current: false,
    type: "industry",
    summary:
      "Developed automated deep learning computer vision models to identify protein crystal structures and expedite pharmaceutical drug discovery pipelines.",
    problem:
      "Biochemists manually reviewed thousands of microscopic crystallization droplets to identify micro-crystals, creating a severe operational bottleneck in high-throughput drug screening.",
    built:
      "Trained, benchmarked, and evaluated five deep neural network architectures (Custom CNNs, ResNet, VGG, Inception, and DenseNet) on microscopic crystal image sets.",
    hurdles:
      "Severe class imbalance between clear droplets, amorphous precipitate, phase separation, and actual crystalline formations.",
    outcomes: [
      "Selected the optimal deep model, boosting crystal detection accuracy by over 15% compared to prior baseline classifiers.",
      "Reduced manual inspection effort by 50% and slashed data processing time by 30% through automated image analysis pipelines.",
      "Collaborated closely with biochemistry domain specialists to validate classification edge cases."
    ],
    tech: ["Python", "Keras", "TensorFlow", "ResNet", "DenseNet", "OpenCV", "NumPy", "Pandas"]
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
