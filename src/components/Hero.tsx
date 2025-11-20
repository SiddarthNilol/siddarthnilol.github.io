import { Button } from "@/components/ui/button";
import { ArrowDown, Download, Github, Linkedin, Mail } from "@/lib/icons";
import profilePhoto from "@/assets/profile-photo.png";

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

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                <span className="gradient-text">Siddarth</span>
                <br />
                <span className="text-foreground">Nilol Kundur Satish</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in animation-delay-300">
                Data Science @ NYU || Honda Motors, Japan || IIT Madras 2022 || Gen AI Enthusiast || Interests in Autonomous Driving
              </p>

              {/* Career Journey Tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-12 animate-fade-in animation-delay-500">
                <div className="skill-pill bg-current/20 border-current/30 text-current">
                  NYU • MS Data Science
                </div>
                <div className="skill-pill bg-work/20 border-work/30 text-work">
                  Honda Motors • Product DS
                </div>
                <div className="skill-pill bg-internship/20 border-internship/30 text-internship">
                  Data Science Intern
                </div>
                <div className="skill-pill bg-education/20 border-education/30 text-education">
                  IIT Madras • Civil Engineering
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-16 animate-slide-in-right">
                <Button 
                  onClick={scrollToTimeline}
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg"
                >
                  Explore My Journey
                  <ArrowDown className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start gap-6 animate-scale-in">
                <a 
                  href="https://www.linkedin.com/in/siddarth-nilol-k-s" 
                  className="p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-6 w-6 text-primary" />
                </a>
                <a 
                  href="https://github.com/SiddarthNilol"  
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

            {/* Right Column - Profile Photo */}
            <div className="relative animate-scale-in">
              <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                {/* Glowing Background Circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl animate-glow"></div>
                
                {/* Profile Photo Container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl hover:scale-105 transition-transform duration-500">
                  <img 
                    src={profilePhoto}
                    alt="Siddarth Nilol Kundur Satish - Data Scientist and AI Engineer"
                    className="w-full h-full object-cover object-center"
                  />
                  
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent/20 rounded-full blur-sm float"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary/20 rounded-full blur-sm float-delayed"></div>
              </div>
            </div>

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