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
    period: "2025 – 2027",
    focus: "Distributed Systems, AI Systems, Machine Learning, Graph Intelligence & Simulation",
    highlights: [
      "Graduate coursework and research in Advanced Operating Systems, Distributed Systems, Machine Learning Systems, and Big Data.",
      "NYU x Annapurna Labs AWS Trainium2 AI Systems Hackathon contributor (Verifier-Guided PDE Agent).",
      "Focusing on reliable, scalable intelligent systems and autonomous developer tooling."
    ]
  },
  {
    degree: "Bachelor of Engineering in Artificial Intelligence & Machine Learning",
    institution: "B.N.M Institute of Technology",
    location: "Bangalore, India",
    period: "2021 – 2025",
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
