import Hero from "@/components/Hero";
import CareerTimeline from "@/components/CareerTimeline";
import ProjectShowcase from "@/components/ProjectShowcase";
import Contact from "@/components/Contact";
import VisitorMap from "@/components/VisitorMap";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <CareerTimeline />
      <ProjectShowcase />
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Visitor Map</h3>
          <VisitorMap />
        </div>
      <Contact />
    </div>
  );
};

export default Index;
