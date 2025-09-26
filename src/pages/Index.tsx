import Hero from "@/components/Hero";
import CareerTimeline from "@/components/CareerTimeline";
import ProjectShowcase from "@/components/ProjectShowcase";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <CareerTimeline />
      <ProjectShowcase />
      <Contact />
    </div>
  );
};

export default Index;
