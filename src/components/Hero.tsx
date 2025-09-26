import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-bg">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl float"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-accent/10 rounded-full blur-xl float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-lg float"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text">Siddarth</span>
            <br />
            <span className="text-foreground">Nilol Kundur Satish</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in animation-delay-300">
            Product Data Scientist • AI/ML Engineer • MS Data Science @ NYU
          </p>

          {/* Career Journey Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in animation-delay-500">
            <div className="skill-pill bg-education/20 border-education/30 text-education">
              IIT Madras • Civil Engineering
            </div>
            <div className="skill-pill bg-internship/20 border-internship/30 text-internship">
              Data Science Intern
            </div>
            <div className="skill-pill bg-work/20 border-work/30 text-work">
              Honda Motors • Product DS
            </div>
            <div className="skill-pill bg-current/20 border-current/30 text-current">
              NYU • MS Data Science
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-in-right">
            <Button 
              onClick={scrollToTimeline}
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg"
            >
              Explore My Journey
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                size="lg"
                className="border-border hover:border-primary/50 bg-card/50 backdrop-blur-sm hover:bg-primary/10 transition-all duration-300"
                asChild
              >
                <a href="mailto:sk12590@nyu.edu">
                  <Mail className="h-5 w-5 mr-2" />
                  Contact
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-border hover:border-accent/50 bg-card/50 backdrop-blur-sm hover:bg-accent/10 transition-all duration-300"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Download className="h-5 w-5 mr-2" />
                  Resume
                </a>
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 animate-scale-in">
            <a 
              href="#" 
              className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-6 w-6 text-primary" />
            </a>
            <a 
              href="#" 
              className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-6 w-6 text-accent" />
            </a>
            <a 
              href="mailto:sk12590@nyu.edu" 
              className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
            >
              <Mail className="h-6 w-6 text-primary" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-to-b from-primary to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;