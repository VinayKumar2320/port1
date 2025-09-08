import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, TrendingUp } from "lucide-react";
const Experience = () => {
  const experiences = [{
    title: "Software Developer Intern",
    company: "Healium Intelliscan Corp",
    period: "2025",
    location: "New York, USA",
    description: "Built medical image pipelines, reduced preprocessing time by 79%.",
    achievements: ["Developed advanced medical image processing algorithms", "Optimized data pipelines for real-time analysis", "Implemented computer vision solutions for diagnostic tools"],
    tech: ["Python", "OpenCV", "PyTorch", "Medical Imaging"],
    current: true
  }, {
    title: "Data Science Intern",
    company: "KreditBee Pvt Ltd",
    period: "2024",
    location: "Bangalore, India",
    description: "Developed AI fraud detection systems, cut false positives by 76%.",
    achievements: ["Built machine learning models for fraud detection", "Reduced false positives significantly improving user experience", "Implemented real-time scoring systems"],
    tech: ["Python", "TensorFlow", "Scikit-learn", "AWS"],
    current: false
  }, {
    title: "Machine Learning Intern",
    company: "369 Data Solution",
    period: "2023",
    location: "Bangalore, India",
    description: "Built deep learning models for protein crystallization analysis, improved accuracy by 92%.",
    achievements: ["Developed CNN models for protein structure analysis", "Achieved 92% accuracy improvement in crystallization prediction", "Collaborated with biochemistry researchers"],
    tech: ["Python", "Keras", "NumPy", "Pandas"],
    current: false
  }];
  return <section id="experience" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 hero-text">Experience</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Building innovative AI solutions across healthcare, fintech, and biotech industries
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => <Card key={index} className={`bg-card border-border/50 card-hover relative overflow-hidden ${exp.current ? 'border-primary/50 bg-gradient-to-r from-primary/5 to-transparent' : ''}`}>
              {exp.current && <div className="absolute top-4 right-4">
                  
                </div>}
              
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Company Info */}
                  <div className="lg:col-span-1">
                    <h3 className="text-2xl font-bold text-primary mb-2">{exp.title}</h3>
                    <h4 className="text-xl font-semibold mb-4">{exp.company}</h4>
                    
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Experience Details */}
                  <div className="lg:col-span-2">
                    <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Key Achievements */}
                    <div className="mb-6">
                      <h5 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Key Achievements
                      </h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => <li key={achIndex} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>)}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h5 className="text-lg font-semibold mb-3">Technologies Used</h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, techIndex) => <Badge key={techIndex} variant="secondary" className="bg-secondary/50 text-foreground border border-border/50">
                            {tech}
                          </Badge>)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Experience;