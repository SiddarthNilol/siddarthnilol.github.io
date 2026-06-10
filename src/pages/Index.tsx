import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CareerTimeline from "@/components/CareerTimeline";
import ProjectShowcase from "@/components/ProjectShowcase";
import VisitorMap from "@/components/VisitorMap";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CareerTimeline />
      <ProjectShowcase />
      <VisitorMap />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
