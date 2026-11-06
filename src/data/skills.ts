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
      { name: "ONNX Runtime & TensorRT", level: "expert", highlight: true },
      { name: "Graph Neural Networks (GraphSAGE)", level: "expert", highlight: true },
      { name: "LightGBM & XGBoost", level: "expert", highlight: true },
      { name: "TensorFlow & Keras", level: "proficient" },
      { name: "Model Quantization (INT8)", level: "expert", highlight: true },
      { name: "Hugging Face Transformers", level: "proficient" },
      { name: "OpenCV & Computer Vision", level: "expert" },
      { name: "Scikit-Learn & NumPy", level: "expert" }
    ]
  },
  {
    title: "LLMs & Agentic Systems",
    tagline: "Autonomous workflows, RAG, and protocol engineering",
    iconName: "Cpu",
    skills: [
      { name: "LangGraph Multi-Agent Workflows", level: "expert", highlight: true },
      { name: "Model Context Protocol (MCP)", level: "expert", highlight: true },
      { name: "Hybrid RAG & FAISS Vector Indexing", level: "expert", highlight: true },
      { name: "Prompt Chaining & JSON Schema", level: "expert", highlight: true },
      { name: "LLM-as-a-Judge Evaluation Harnesses", level: "expert", highlight: true },
      { name: "LangChain & Vector Databases", level: "proficient" }
    ]
  },
  {
    title: "Distributed Systems & Cloud",
    tagline: "Event streams, containerization, and high-throughput pipelines",
    iconName: "Network",
    skills: [
      { name: "Apache Kafka", level: "expert", highlight: true },
      { name: "Docker & Kubernetes", level: "expert", highlight: true },
      { name: "FastAPI & RESTful APIs", level: "expert", highlight: true },
      { name: "PostgreSQL & SQLite", level: "proficient" },
      { name: "Amazon Web Services (AWS)", level: "proficient", highlight: true },
      { name: "Redis Caching & Asynchronous Queues", level: "expert", highlight: true },
      { name: "Linux & Bash Scripting", level: "expert" },
      { name: "CI/CD & GitHub Actions", level: "expert", highlight: true }
    ]
  },
  {
    title: "Languages & Operations Research",
    tagline: "Systems programming, mathematical optimization, and simulation",
    iconName: "Activity",
    skills: [
      { name: "Python 3.12+", level: "expert", highlight: true },
      { name: "C++ & Go", level: "proficient", highlight: true },
      { name: "TypeScript & React", level: "expert", highlight: true },
      { name: "SQL", level: "proficient" },
      { name: "SimPy (Discrete-Event Simulation)", level: "expert", highlight: true },
      { name: "Google OR-Tools (CP-SAT)", level: "expert", highlight: true },
      { name: "Monte Carlo Policy Evaluation", level: "expert", highlight: true },
      { name: "Java & Bash", level: "proficient" }
    ]
  }
];
