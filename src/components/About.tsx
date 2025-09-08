import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, GraduationCap, Target } from "lucide-react";

const About = () => {
  const achievements = [
    "Smart India Hackathon 2023 Finalist",
    "IEEE Hackathon Winner",
    "IIT Bombay Competition Recognition",
    "GPA 8.69/10 in AI & ML"
  ];

  return (
    <section id="about" className="py-20 gradient-bg relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl floating-animation" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-2xl floating-animation" style={{animationDelay: '2s'}} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-black mb-6 hero-text text-shadow-soft">About Me</h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed font-medium">
            Passionate about creating <span className="text-primary font-bold">intelligent systems</span> that solve real-world problems
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Section */}
          <div className="space-y-6 animate-fade-in">
            <Card className="glass-effect morphing-border card-hover">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center pulse-glow">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Education Journey</h3>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-primary/5 to-blue-500/5 border border-primary/20">
                    <h4 className="text-lg font-bold text-primary">Master of Science in Computer Science</h4>
                    <p className="text-foreground/70 font-medium">New York University (2025–2027)</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                    <h4 className="text-lg font-bold text-purple-600">B.E. in Artificial Intelligence & Machine Learning</h4>
                    <p className="text-foreground/70 font-medium">BNM Institute of Technology, Bangalore (2021–2025)</p>
                    <Badge variant="secondary" className="mt-2 bg-gradient-to-r from-primary to-blue-500 text-white font-bold">GPA: 8.69/10</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50 card-hover">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-semibold">Passion & Focus</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  I specialize in deep learning, computer vision, and intelligent systems. 
                  My work focuses on building AI solutions that make a real impact, from 
                  medical image processing to fraud detection systems. I believe in the 
                  power of artificial intelligence to transform industries and improve lives.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Section */}
          <div className="animate-slide-in">
            <Card className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-primary/20 card-hover">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <Trophy className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-semibold">Key Achievements</h3>
                </div>
                
                <div className="grid gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-colors"
                    >
                      <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                      <span className="text-foreground font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-background/50 rounded-lg border border-border/50">
                  <h4 className="text-lg font-semibold mb-4 text-primary">Current Status</h4>
                  <p className="text-muted-foreground">
                  I'm now studying for my Master's in Computer Science while investigating the latest AI and machine learning technologies. enthusiastic about conducting research, coming up with creative solutions to problems, and creating intelligent systems.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;