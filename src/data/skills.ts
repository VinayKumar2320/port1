export interface SkillCategory {
  title: string;
  tagline: string;
  iconName: string;
  skills: { name: string; level: 'expert' | 'proficient' | 'competent'; highlight?: boolean }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    tagline: "Deep architectures, graph neural nets, and probabilistic modeling",
    iconName: "Cpu",
    skills: [
      { name: "PyTorch & PyTorch Geometric", level: "expert", highlight: true },
      { name: "Graph Neural Networks (GraphSAGE)", level: "expert", highlight: true },
      { name: "LightGBM & XGBoost", level: "expert", highlight: true },
      { name: "TensorFlow & Keras", level: "proficient" },
      { name: "TreeSHAP Explainability", level: "expert", highlight: true },
      { name: "LangGraph & FAISS", level: "expert", highlight: true },
      { name: "OpenCV & MediaPipe", level: "expert" },
      { name: "Scikit-Learn & NumPy", level: "expert" }
    ]
  },
  {
    title: "Distributed Systems & Cloud",
    tagline: "Event streams, containerization, and high-throughput pipelines",
    iconName: "Network",
    skills: [
      { name: "Apache Kafka", level: "expert", highlight: true },
      { name: "Docker & Docker Compose", level: "expert", highlight: true },
      { name: "FastAPI & REST APIs", level: "expert", highlight: true },
      { name: "PostgreSQL & SQLite", level: "proficient" },
      { name: "Amazon Web Services (AWS)", level: "proficient", highlight: true },
      { name: "Microsoft Azure (AZ-900 / AI-900)", level: "proficient" },
      { name: "Linux & Bash Scripting", level: "expert" },
      { name: "Redis Caching", level: "proficient" }
    ]
  },
  {
    title: "Operations Research & Simulation",
    tagline: "Mathematical optimization and discrete-event modeling",
    iconName: "Activity",
    skills: [
      { name: "SimPy (Discrete-Event Simulation)", level: "expert", highlight: true },
      { name: "Google OR-Tools (CP-SAT)", level: "expert", highlight: true },
      { name: "Monte Carlo Policy Evaluation", level: "expert", highlight: true },
      { name: "Common Random Numbers (CRN)", level: "proficient" },
      { name: "Non-Homogeneous Poisson Queues", level: "proficient" },
      { name: "SymPy Symbolic Mathematics", level: "proficient" }
    ]
  },
  {
    title: "Programming & Frontend",
    tagline: "Type-safe engineering and high-performance interactive interfaces",
    iconName: "Code",
    skills: [
      { name: "Python 3.12+", level: "expert", highlight: true },
      { name: "TypeScript & JavaScript", level: "expert", highlight: true },
      { name: "React 18 / 19", level: "expert", highlight: true },
      { name: "Tailwind CSS & Modern CSS", level: "expert" },
      { name: "C & Java", level: "proficient" },
      { name: "Git & GitHub Actions CI/CD", level: "expert", highlight: true },
      { name: "Tree-sitter AST Parsing", level: "proficient" },
      { name: "SQL", level: "proficient" }
    ]
  }
];
