export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'hackathon' | 'competition' | 'certification' | 'academic';
  badge: string;
  summary: string;
  verified: boolean;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "sih-2023",
    title: "Smart India Hackathon 2023 — 2nd Place",
    issuer: "Government of India & AICTE",
    year: "2023",
    category: "hackathon",
    badge: "National Finalist / 2nd Place",
    summary:
      "Secured 2nd place nationwide among tens of thousands of engineering participants, building software systems under high-pressure competitive constraints.",
    verified: true
  },
  {
    id: "techfest-iitb",
    title: "Atom-Quest Competition — Top 5 Finalist",
    issuer: "Atomberg Technologies & Techfest, IIT Bombay",
    year: "2023",
    category: "competition",
    badge: "Top 5 Nationwide",
    summary:
      "Placed in the top 5 nationwide at Asia's largest science and technology festival (Techfest IIT Bombay) for intelligent home automation and edge IoT algorithms.",
    verified: true
  },
  {
    id: "codecode-iitb",
    title: "National Coding Competition (CoDecode) — Top 4",
    issuer: "IIT Bombay",
    year: "2023",
    category: "competition",
    badge: "Top 4 Southern Zone",
    summary:
      "Finalist in the national algorithmic coding competition CoDecode, finishing in the top 4 across the Southern Zone.",
    verified: true
  },
  {
    id: "ieee-bnmit-2022",
    title: "IEEE BNMIT Hackathon Winner",
    issuer: "IEEE Student Branch",
    year: "2022",
    category: "hackathon",
    badge: "1st Place Winner",
    summary:
      "Won 1st place for innovative software engineering solutions tackling real-world distributed challenges.",
    verified: true
  },
  {
    id: "gsssit-expo",
    title: "8th National Level GSSSIT IEEE Project Expo 2024",
    issuer: "IEEE Mysore",
    year: "2024",
    category: "academic",
    badge: "National Showcase",
    summary:
      "Selected and showcased engineering innovations in embedded AI and automation to industry judges and academic scholars.",
    verified: true
  },
  {
    id: "stanford-dl",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI & Stanford University (Andrew Ng)",
    year: "2023",
    category: "certification",
    badge: "Stanford / DeepLearning.AI",
    summary:
      "Comprehensive 5-course sequence covering Neural Networks, Backpropagation, Hyperparameter Tuning, CNNs, and Sequence Models.",
    verified: true
  },
  {
    id: "ibm-ml",
    title: "IBM Professional Certification: Machine Learning with Python",
    issuer: "IBM",
    year: "2023",
    category: "certification",
    badge: "IBM Professional",
    summary:
      "Certified in supervised & unsupervised learning, model evaluation metrics, and enterprise pipelines in Python.",
    verified: true
  },
  {
    id: "azure-az900",
    title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    year: "2024",
    category: "certification",
    badge: "Microsoft Certified",
    summary:
      "Core cloud architectural concepts, Azure compute, storage, virtual networking, security, and governance.",
    verified: true
  },
  {
    id: "azure-ai900",
    title: "Microsoft Certified: Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft",
    year: "2024",
    category: "certification",
    badge: "Microsoft Certified",
    summary:
      "Certified in cloud AI workloads, Azure Cognitive Services, Computer Vision, and conversational AI architecture.",
    verified: true
  }
];
