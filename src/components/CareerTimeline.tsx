import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Rocket, Brain } from "@/lib/icons";

interface TimelineEvent {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
  type: "education" | "internship" | "work" | "current";
}

const typeStyles: Record<TimelineEvent["type"], { badge: string; icon: string }> = {
  current: { badge: "border-primary/40 text-primary bg-primary/10", icon: "text-primary" },
  work: { badge: "border-work/40 text-work bg-work/10", icon: "text-work" },
  internship: { badge: "border-internship/40 text-internship bg-internship/10", icon: "text-internship" },
  education: { badge: "border-education/40 text-education bg-education/10", icon: "text-education" },
};

const timelineEvents: TimelineEvent[] = [
  {
    id: "4",
    title: "Master of Science in Data Science",
    organization: "New York University",
    location: "New York, NY",
    period: "Sept 2025 - present",
    description: "Advanced studies in Computer Vision, Deep Learning, and Reinforcement Learning",
    highlights: ["GPA: 3.89/4.0", "Computer Vision Research", "Deep Learning", "Probabilistic Time Series Analysis", "Reinforcement Learning"],
    icon: Rocket,
    type: "current",
  },
  {
    id: "3",
    title: "Product Data Scientist",
    organization: "Honda Motors .Co .Ltd",
    location: "Tochigi, Japan",
    period: "July 2022 - July 2025",
    description: "Led AI/ML projects for automotive ADAS and market research",
    highlights: ["Applied AI/ML engineering", "Market Research and Data Analysis", "Promoted to Product Owner", "Spearheaded team of 6 members", "N3 Japanese proficiency"],
    icon: Briefcase,
    type: "work",
  },
  {
    id: "2",
    title: "Data Science Intern",
    organization: "Manifolds Lab",
    location: "Portland, Oregon (Remote)",
    period: "June 2021 - Aug 2021",
    description: "Heart rate estimation using physiological time series from wrist-worn devices",
    highlights: ["CNN regression model", "Activity classification integration", "35% signal-to-noise improvement", "1.5 BPM MAE accuracy"],
    icon: Brain,
    type: "internship",
  },
  {
    id: "1",
    title: "Bachelor of Technology in Civil Engineering",
    organization: "Indian Institute of Technology Madras",
    location: "Chennai, India",
    period: "Aug 2018 - May 2022",
    description: "Strong foundation in engineering with focus on ML and operations research",
    highlights: ["GPA: 9.16/10", "Machine Learning", "Advanced Operations Research", "Linear Algebra", "Probability, Statistics and Stochastic Processes"],
    icon: GraduationCap,
    type: "education",
  },
];

const skills = [
  "Python", "PyTorch", "TensorFlow", "AWS", "GCP", "LangChain",
  "Computer Vision", "Time Series Analysis", "ADAS", "RAG Systems",
  "CUDA", "Streamlit", "Docker", "Agile Leadership",
];

const CareerTimeline = () => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => (prev.includes(entry.target.id) ? prev : [...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.3 }
    );

    timelineEvents.forEach((event) => {
      const element = document.getElementById(`timeline-${event.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-6xl mx-auto mb-16">
          <p className="eyebrow">// 01 — trajectory</p>
          <h2 className="section-title">
            Career <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From civil engineering to cutting-edge AI research — a journey of continuous learning and innovation
          </p>
        </div>

        {/* Timeline: left rail on mobile, centered alternating on lg+ */}
        <div className="relative max-w-4xl mx-auto">
          <div className="timeline-line absolute left-4 lg:left-1/2 lg:-translate-x-1/2 w-px h-full" aria-hidden="true"></div>

          <div className="space-y-12 lg:space-y-16">
            {timelineEvents.map((event, index) => {
              const isVisible = visibleItems.includes(`timeline-${event.id}`);
              const isLeft = index % 2 === 0;
              const Icon = event.icon;
              const styles = typeStyles[event.type];

              return (
                <div
                  key={event.id}
                  id={`timeline-${event.id}`}
                  className={`relative flex items-start lg:items-center ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 z-20 top-6 lg:top-auto">
                    <div className={`timeline-dot ${isVisible ? "active" : ""}`}></div>
                  </div>

                  {/* Card */}
                  <div className={`w-full pl-12 lg:w-5/12 lg:pl-0 ${isLeft ? "lg:pr-10" : "lg:pl-10"}`}>
                    <Card
                      className={`signal-card transform transition-all duration-700 ${
                        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline" className={`font-mono text-xs ${styles.badge}`}>
                          {event.period}
                        </Badge>
                        <Icon className={`h-5 w-5 ${styles.icon}`} />
                      </div>

                      <h3 className="text-xl font-bold mb-1 text-foreground">{event.title}</h3>
                      <p className="font-medium text-primary mb-1">{event.organization}</p>
                      <p className="font-mono text-xs text-muted-foreground mb-4">{event.location}</p>

                      <p className="text-sm text-muted-foreground mb-4">{event.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {event.highlights.map((highlight) => (
                          <span key={highlight} className="skill-pill">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </div>

                  <div className="hidden lg:block lg:w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills summary */}
        <div className="mt-24 max-w-4xl mx-auto text-center">
          <p className="eyebrow mb-3">// toolkit</p>
          <h3 className="text-2xl font-bold mb-8">Technical Expertise</h3>
          <div className="flex flex-wrap justify-center gap-2.5">
            {skills.map((skill) => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
