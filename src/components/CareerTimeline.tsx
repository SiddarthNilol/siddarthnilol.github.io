import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, Rocket, Brain } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  type: 'education' | 'internship' | 'work' | 'current';
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Bachelor of Technology in Civil Engineering",
    organization: "Indian Institute of Technology Madras",
    location: "Chennai, India",
    period: "Aug 2018 - May 2022",
    description: "Strong foundation in engineering with focus on ML and operations research",
    highlights: ["GPA: 9.16/10", "Machine Learning", "Advanced Operations Research", "Linear Algebra"],
    icon: GraduationCap,
    color: "education",
    type: "education"
  },
  {
    id: "2",
    title: "Data Science Intern",
    organization: "Manifolds Lab",
    location: "Portland, Oregon (Remote)",
    period: "June 2021 - Aug 2021",
    description: "Heart rate estimation using physiological time series from wrist-worn devices",
    highlights: ["35% signal-to-noise improvement", "CNN regression model", "1.5 BPM MAE accuracy", "Activity classification integration"],
    icon: Brain,
    color: "internship",
    type: "internship"
  },
  {
    id: "3",
    title: "Product Data Scientist",
    organization: "Honda Motors",
    location: "Tochigi, Japan",
    period: "July 2022 - July 2025",
    description: "Led AI/ML projects for automotive ADAS and market research",
    highlights: ["75% cost reduction in face anonymization", "95% automation in geo-spatial querying", "Promoted to Product Owner", "Led team of 6 members", "N3 Japanese proficiency"],
    icon: Briefcase,
    color: "work",
    type: "work"
  },
  {
    id: "4",
    title: "Master of Science in Data Science",
    organization: "New York University",
    location: "New York, NY",
    period: "Sept 2025 - May 2027",
    description: "Advanced studies in Computer Vision, Deep Learning, and Time Series Analysis",
    highlights: ["Computer Vision Research", "Deep Learning from Small Data", "Probabilistic Time Series Analysis", "Zero-shot Image Enhancement"],
    icon: Rocket,
    color: "current",
    type: "current"
  }
];

const CareerTimeline = () => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.5 }
    );

    timelineEvents.forEach((event) => {
      const element = document.getElementById(`timeline-${event.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Career <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From civil engineering to cutting-edge AI research - a journey of continuous learning and innovation
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line animate-timeline-draw"></div>

          {/* Timeline Events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => {
              const isVisible = visibleItems.includes(`timeline-${event.id}`);
              const isLeft = index % 2 === 0;
              const Icon = event.icon;

              return (
                <div
                  key={event.id}
                  id={`timeline-${event.id}`}
                  className={`relative flex items-center ${
                    isLeft ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                    <div className={`timeline-dot ${isVisible ? 'active' : ''}`}>
                      <Icon className="absolute inset-0 m-auto h-2 w-2 text-primary" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                    <Card 
                      className={`project-card transform transition-all duration-700 ${
                        isVisible 
                          ? 'translate-y-0 opacity-100' 
                          : `${isLeft ? 'translate-x-8' : '-translate-x-8'} opacity-0`
                      }`}
                    >
                      <div className="relative z-10">
                        {/* Period Badge */}
                        <Badge 
                          variant="outline" 
                          className={`mb-4 border-${event.color}/30 text-${event.color} bg-${event.color}/10`}
                        >
                          {event.period}
                        </Badge>

                        {/* Title and Organization */}
                        <h3 className="text-xl font-bold mb-2 text-foreground">
                          {event.title}
                        </h3>
                        <p className="text-lg font-semibold text-primary mb-1">
                          {event.organization}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                          {event.location}
                        </p>

                        {/* Description */}
                        <p className="text-muted-foreground mb-4">
                          {event.description}
                        </p>

                        {/* Highlights */}
                        <div className="flex flex-wrap gap-2">
                          {event.highlights.map((highlight, idx) => (
                            <span
                              key={idx}
                              className="skill-pill text-xs"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Empty space for alignment */}
                  <div className="w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8">Technical Expertise</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              "Python", "PyTorch", "TensorFlow", "AWS", "GCP", "LangChain", 
              "Computer Vision", "Time Series Analysis", "ADAS", "RAG Systems",
              "CUDA", "Streamlit", "Docker", "Agile Leadership"
            ].map((skill) => (
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