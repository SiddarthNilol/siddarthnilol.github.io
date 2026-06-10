import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "@/lib/icons";
import profilePhoto from "@/assets/profile-photo.png";

const focusAreas = [
  "Computer Vision",
  "Gen AI",
  "Autonomous Driving",
  "Time Series",
];

const stats = [
  { value: "3+", label: "years in industry" },
  { value: "6", label: "person team led" },
  { value: "2", label: "countries worked in" },
];

const Hero = () => {
  const scrollToTimeline = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="relative min-h-screen flex items-center hero-bg overflow-hidden">
      {/* Blueprint grid + aurora background */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true"></div>
      <div className="aurora w-96 h-96 bg-primary/20 -top-20 right-0" aria-hidden="true"></div>
      <div className="aurora w-80 h-80 bg-accent/15 bottom-10 -left-20" aria-hidden="true"></div>

      <div className="container mx-auto px-6 relative z-10 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-14 items-center max-w-6xl mx-auto">
          {/* Left — text */}
          <div>
            <p className="eyebrow mb-6 animate-fade-in">// data scientist &amp; ai engineer</p>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6 animate-fade-in">
              Siddarth
              <br />
              <span className="gradient-text">Nilol Kundur Satish</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-6 animate-fade-in animation-delay-300">
              MS Data Science at <span className="text-foreground">NYU</span>. Previously Product
              Data Scientist at <span className="text-foreground">Honda Motors, Japan</span>,
              building AI for ADAS and autonomous driving. IIT Madras &rsquo;22.
            </p>

            {/* Focus areas */}
            <div className="flex flex-wrap gap-2 mb-10 animate-fade-in animation-delay-500">
              {focusAreas.map((area) => (
                <span key={area} className="skill-pill">
                  {area}
                </span>
              ))}
            </div>

            {/* Stats strip */}
            <div className="flex gap-10 mb-10 animate-fade-in animation-delay-500">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="font-mono text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6 animate-fade-in animation-delay-500">
              <Button
                onClick={scrollToTimeline}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow px-8 py-6 text-base font-display"
              >
                Explore my journey
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>

              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/siddarth-nilol-k-s"
                  className="p-3 rounded-full border border-border hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                </a>
                <a
                  href="https://github.com/SiddarthNilol"
                  className="p-3 rounded-full border border-border hover:border-accent/60 hover:bg-accent/10 transition-all duration-300 hover:scale-110"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 text-accent" />
                </a>
                <a
                  href="mailto:sk12590@nyu.edu"
                  className="p-3 rounded-full border border-border hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Right — portrait */}
          <div className="relative animate-fade-in animation-delay-300">
            <div className="relative mx-auto w-72 h-72 lg:w-80 lg:h-80">
              {/* Rotated frame behind the photo */}
              <div className="absolute -inset-3 rounded-2xl border border-primary/30 rotate-3" aria-hidden="true"></div>
              <div className="absolute -inset-3 rounded-2xl border border-accent/20 -rotate-2" aria-hidden="true"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/25 to-accent/20 blur-2xl" aria-hidden="true"></div>

              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border shadow-2xl">
                <img
                  src={profilePhoto}
                  alt="Siddarth Nilol Kundur Satish - Data Scientist and AI Engineer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Mono caption card */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg glass-nav border border-border font-mono text-xs text-muted-foreground whitespace-nowrap">
                <span className="text-work">●</span> open to opportunities · NYC
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <div className="w-px h-14 bg-gradient-to-b from-primary to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
