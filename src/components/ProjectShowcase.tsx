import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "@/lib/icons";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  impact: string;
  technologies: string[];
  category: string;
  link: string;
  status: "completed" | "ongoing" | "research";
}

const projects: Project[] = [
  {
    id: "1",
    title: "Physics Aware Video Generation",
    description: "Novel approach to improve standard Diffusion Transformer based video generation model's physics understanding.",
    longDescription: "Course project at NYU under Prof. Saining Xie as part of Computer Vision course, exploring techniques for enhancing video generation models to better grasp physical dynamics in generated content.",
    impact: "Advancing video generation realism and applicability in dynamic scenarios",
    technologies: ["PyTorch", "Computer Vision", "World Models", "Diffusion Transformers", "Multi-GPU Training"],
    category: "Computer Vision",
    link: "https://github.com/CVFall2025-Project/PhysVideoGenerator",
    status: "completed",
  },
  {
    id: "2",
    title: "Modeling Information Blackouts in MNAR Time Series Data",
    description: "Latent Dynamic Models to handle Missing Not At Random (MNAR) time series data with information blackouts.",
    longDescription: "Course project at NYU under Prof. Erin Grant as part of Probabilistic Time Series Analysis course, developing models to effectively forecast and impute MNAR time series data, particularly focusing on scenarios with structured information blackouts.",
    impact: "Observed improvement in imputation/forecasting accuracy over baseline methods",
    technologies: ["Latent Dynamic Models", "Kalman Filters", "Variational Inference", "EM Algorithm", "Time Series Analysis"],
    category: "Time Series Analysis",
    link: "https://github.com/BlackoutBayes/Modeling-Information-Blackouts-in-MNAR-Time-Series",
    status: "completed",
  },
  {
    id: "3",
    title: "Live ASL Video Translation System",
    description: "Computer vision pipeline for real-time American Sign Language translation from video feed.",
    longDescription: "Implemented VJEPA2 powered ASL recognition system achieving 85% accuracy on test set. Integrated with a Qwen2.5-based language model for contextual translation, enabling real-time ASL to English conversion.",
    impact: "Enhanced accessibility for the deaf and hard-of-hearing community through real-time translation",
    technologies: ["PyTorch", "VJEPA2", "Qwen2.5-3B", "Computer Vision", "GPU", "Dell Pro Max GB10"],
    category: "Computer Vision",
    link: "https://github.com/SiddarthNilol/ASLVideoTranslate",
    status: "completed",
  },
  {
    id: "4",
    title: "Traffic Intersection VRU Analysis",
    description: "Deep learning pipeline for vulnerable road user trajectory extraction and safety analysis",
    longDescription: "Implemented YOLOv8 + Bot-SORT achieving 92.27% mAP@0.5 for VRU detection. Applied numerical safety models (TTC, PET) to identify high-risk zones.",
    impact: "25% reduction in predicted accident rates through improved infrastructure strategies",
    technologies: ["PyTorch", "YOLOv8", "Bot-SORT", "Computer Vision", "Safety Analysis"],
    category: "Computer Vision",
    link: "",
    status: "completed",
  },
  {
    id: "5",
    title: "ADAS Feature Engagement Prediction",
    description: "XGBoost model predicting autonomous driving system disengagement risk",
    longDescription: "Built predictive model using customer drive logs, map data, and weather conditions. Achieved ~80% ROC-AUC with SHAP analysis explaining 70% of disengagements.",
    impact: "15% reduction in field validation time through prioritized scenario testing",
    technologies: ["XGBoost", "SHAP", "Streamlit", "Feature Engineering", "AWS"],
    category: "Machine Learning",
    link: "",
    status: "completed",
  },
  {
    id: "6",
    title: "Cross-Platform Multimodal Social Listening Pipeline for Customer Experience Insights",
    description: "Scalable system aggregating and analyzing customer feedback from diverse social media platforms",
    longDescription: "Engineered sentiment analysis and topic modeling pipeline using Azure OpenAI API, enabling real-time insights from Twitter, Instagram, Blog Post data.",
    impact: "Improved decision-making through timely customer feedback analysis",
    technologies: ["LangChain", "LLMs", "NLP", "Azure OpenAI"],
    category: "Gen AI Systems",
    link: "",
    status: "completed",
  },
  {
    id: "7",
    title: "COVID-19 Traffic Impact Analysis",
    description: "Causal analysis of lockdown policies on urban traffic patterns in Chennai",
    longDescription: "Processed 2M+ Wi-Fi sensor records to model traffic behavior across pre-, mid-, and post-lockdown phases using advanced statistical methods.",
    impact: "Insights into urban mobility patterns during crisis situations",
    technologies: ["R", "Causal Inference", "Time Series", "Statistical Modeling"],
    category: "Data Analysis",
    link: "",
    status: "completed",
  },
];

const categoryStyles: Record<string, string> = {
  "Computer Vision": "border-primary/40 text-primary bg-primary/10",
  "Machine Learning": "border-accent/40 text-accent bg-accent/10",
  "Gen AI Systems": "border-education/40 text-education bg-education/10",
  "Time Series Analysis": "border-internship/40 text-internship bg-internship/10",
  "Data Analysis": "border-work/40 text-work bg-work/10",
};

const ProjectShowcase = () => {
  return (
    <section id="projects" className="py-24 relative">
      <div className="aurora w-96 h-96 bg-primary/10 top-40 -right-32" aria-hidden="true"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="max-w-6xl mx-auto mb-16">
          <p className="eyebrow">// 02 — selected work</p>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Exploring the intersection of AI, computer vision, and real-world impact
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => {
            const inner = (
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-4 gap-3">
                  <Badge
                    variant="outline"
                    className={`font-mono text-xs ${
                      categoryStyles[project.category] ?? "border-border text-muted-foreground"
                    }`}
                  >
                    {project.category}
                  </Badge>
                  {project.link && (
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 text-foreground leading-snug">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <p className="text-xs text-muted-foreground/70 mb-4">{project.longDescription}</p>
                </div>

                <div className="mb-4 px-3 py-2.5 rounded-lg bg-accent/5 border border-accent/15">
                  <p className="font-mono text-xs text-accent leading-relaxed">▸ {project.impact}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="skill-pill">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="skill-pill">+{project.technologies.length - 4}</span>
                  )}
                </div>
              </div>
            );

            return (
              <Card
                key={project.id}
                className="signal-card group h-full animate-fade-in p-0"
                style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "both" }}
              >
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full p-6"
                    aria-label={`${project.title} on GitHub`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="h-full p-6">{inner}</div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
