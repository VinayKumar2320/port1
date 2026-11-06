export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  focus: string;
  highlights: string[];
}

export const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Science in Computer Science",
    institution: "New York University (NYU Tandon School of Engineering)",
    location: "Brooklyn, New York, USA",
    period: "Aug 2025 – May 2027",
    gpa: "GPA: 3.67 / 4.0",
    focus: "Distributed Systems, AI Systems, Deep Learning, Big Data Analytics & Algorithms",
    highlights: [
      "Graduate Coursework: Deep Learning Systems, Machine Learning for Signal Processing, Big Data Analytics, Distributed Systems, Advanced Algorithms.",
      "NYU x Annapurna Labs AWS Trainium2 AI Systems Hackathon contributor (Verifier-Guided PDE Agent).",
      "Focusing on high-throughput AI infrastructure, autonomous agentic workflows, and distributed inference engines."
    ]
  },
  {
    degree: "Bachelor of Engineering in Artificial Intelligence & Machine Learning",
    institution: "B.N.M Institute of Technology",
    location: "Bangalore, India",
    period: "2021 – Apr 2025",
    gpa: "CGPA: 8.69 / 10",
    focus: "Artificial Intelligence, Deep Learning, Computer Vision, Algorithms & Data Structures",
    highlights: [
      "Graduated with First Class with Distinction (CGPA: 8.69 / 10).",
      "Co-inventor on patent for AI & IoT-based automated agricultural irrigation.",
      "Smart India Hackathon 2023 2nd place winner & IIT Bombay Techfest Top 5 finalist.",
      "Published 8 peer-reviewed research papers during undergraduate studies."
    ]
  }
];
