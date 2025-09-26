import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Eye } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  impact: string;
  technologies: string[];
  category: string;
  status: "completed" | "ongoing" | "research";
}

const projects: Project[] = [
  {
    id: "1",
    title: "Zero-shot Low-light Image Enhancement",
    description: "Novel approaches to improve CV model robustness in challenging illumination environments",
    longDescription: "Ongoing research at NYU under Prof. Saining Xie, exploring zero-shot techniques for enhancing images in low-light conditions while maintaining semantic segmentation accuracy.",
    impact: "Advancing computer vision capabilities for autonomous systems",
    technologies: ["PyTorch", "Computer Vision", "Zero-shot Learning", "Image Enhancement"],
    category: "Research",
    status: "ongoing"
  },
  {
    id: "2", 
    title: "Traffic Intersection VRU Analysis",
    description: "Deep learning pipeline for vulnerable road user trajectory extraction and safety analysis",
    longDescription: "Implemented YOLOv8 + Bot-SORT achieving 92.27% mAP@0.5 for VRU detection. Applied numerical safety models (TTC, PET) to identify high-risk zones.",
    impact: "25% reduction in predicted accident rates through improved infrastructure strategies",
    technologies: ["PyTorch", "YOLOv8", "Bot-SORT", "Computer Vision", "Safety Analysis"],
    category: "Computer Vision",
    status: "completed"
  },
  {
    id: "3",
    title: "ADAS Feature Engagement Prediction",
    description: "XGBoost model predicting autonomous driving system disengagement risk",
    longDescription: "Built predictive model using customer drive logs, map data, and weather conditions. Achieved ~80% ROC-AUC with SHAP analysis explaining 70% of disengagements.",
    impact: "15% reduction in field validation time through prioritized scenario testing",
    technologies: ["XGBoost", "SHAP", "Streamlit", "Feature Engineering", "AWS"],
    category: "Machine Learning",
    status: "completed"
  },
  {
    id: "4",
    title: "Multi-Agent Graph RAG System",
    description: "Internal knowledge retrieval chatbot with specialized agent architecture",
    longDescription: "Engineered multi-agent Graph-RAG system integrating Confluence APIs, Neo4j graph construction, and semantic information retrieval with specialized agents for ingestion, retrieval, synthesis, and compliance.",
    impact: "Improved knowledge accessibility and collaboration across teams",
    technologies: ["LangChain", "Neo4j", "Graph RAG", "Multi-Agent Systems", "NLP"],
    category: "AI Systems",
    status: "completed"
  },
  {
    id: "5",
    title: "Face Anonymization Pipeline",
    description: "PyTorch-based automated face anonymization for automotive data",
    longDescription: "Deployed production pipeline on AWS SageMaker for processing automotive video data while maintaining privacy compliance and data utility.",
    impact: "75% reduction in outsourcing costs with maintained data quality",
    technologies: ["PyTorch", "AWS SageMaker", "Computer Vision", "Privacy Tech"],
    category: "Production ML",
    status: "completed"
  },
  {
    id: "6",
    title: "COVID-19 Traffic Impact Analysis",
    description: "Causal analysis of lockdown policies on urban traffic patterns in Chennai",
    longDescription: "Processed 2M+ Wi-Fi sensor records to model traffic behavior across pre-, mid-, and post-lockdown phases using advanced statistical methods.",
    impact: "Insights into urban mobility patterns during crisis situations",
    technologies: ["R", "Causal Inference", "Time Series", "Statistical Modeling"],
    category: "Data Analysis",
    status: "completed"
  }
];

const ProjectShowcase = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing": return "text-current border-current/30 bg-current/10";
      case "research": return "text-education border-education/30 bg-education/10";
      default: return "text-work border-work/30 bg-work/10";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Research": "text-education border-education/30 bg-education/10",
      "Computer Vision": "text-primary border-primary/30 bg-primary/10",
      "Machine Learning": "text-accent border-accent/30 bg-accent/10",
      "AI Systems": "text-internship border-internship/30 bg-internship/10",
      "Production ML": "text-work border-work/30 bg-work/10",
      "Data Analysis": "text-muted-foreground border-muted/30 bg-muted/10"
    };
    return colors[category as keyof typeof colors] || "text-muted-foreground border-muted/30 bg-muted/10";
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exploring the intersection of AI, computer vision, and real-world impact
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`project-card h-full animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10 h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <Badge className={getCategoryColor(project.category)}>
                    {project.category}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(project.status)}
                  >
                    {project.status}
                  </Badge>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 text-sm">
                    {project.description}
                  </p>

                  <p className="text-xs text-muted-foreground/80 mb-4">
                    {project.longDescription}
                  </p>

                  {/* Impact */}
                  <div className="mb-4 p-3 rounded-lg bg-accent/5 border border-accent/20">
                    <p className="text-sm font-medium text-accent">
                      🎯 {project.impact}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="skill-pill text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="skill-pill text-xs">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border/50">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-primary/30 hover:border-primary/50 hover:bg-primary/10"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                  {project.status !== "research" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-accent/30 hover:border-accent/50 hover:bg-accent/10"
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-primary/30 hover:border-primary/50 hover:bg-primary/10 px-8"
          >
            View All Projects
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;