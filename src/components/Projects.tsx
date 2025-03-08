
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const revealElements = sectionRef.current?.querySelectorAll('.reveal-animation');
            revealElements?.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('active');
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Sample projects
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-featured e-commerce platform with real-time inventory management and payment processing.",
      imageUrl: "https://placehold.co/600x400/252b37/e6e8ec?text=E-Commerce+Platform",
      tags: ["Web App", "React", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/ujjwalnepal",
      liveUrl: "#",
      category: "web"
    },
    {
      title: "AR Product Visualizer",
      description: "Augmented reality application for visualizing products in real-world environments.",
      imageUrl: "https://placehold.co/600x400/252b37/e6e8ec?text=AR+Visualizer",
      tags: ["AR", "Unity", "Mobile", "3D"],
      githubUrl: "https://github.com/ujjwalnepal",
      liveUrl: "#",
      category: "ar"
    },
    {
      title: "DevOps Automation Suite",
      description: "Comprehensive automation tools for CI/CD pipelines, infrastructure management, and monitoring.",
      imageUrl: "https://placehold.co/600x400/252b37/e6e8ec?text=DevOps+Automation",
      tags: ["DevOps", "AWS", "Docker", "Terraform"],
      githubUrl: "https://github.com/ujjwalnepal",
      liveUrl: "#",
      category: "devops"
    },
    {
      title: "3D Interactive Dashboard",
      description: "Data visualization dashboard featuring interactive 3D charts and real-time data updates.",
      imageUrl: "https://placehold.co/600x400/252b37/e6e8ec?text=3D+Dashboard",
      tags: ["3D", "WebGL", "Three.js", "Data Viz"],
      githubUrl: "https://github.com/ujjwalnepal",
      liveUrl: "#",
      category: "3d"
    },
    {
      title: "LLM-Powered Assistant",
      description: "Custom AI assistant built with the latest large language models for specialized industry knowledge.",
      imageUrl: "https://placehold.co/600x400/252b37/e6e8ec?text=AI+Assistant",
      tags: ["ML", "LLM", "Python", "API"],
      githubUrl: "https://github.com/ujjwalnepal",
      liveUrl: "#",
      category: "ml"
    },
    {
      title: "Mobile Health App",
      description: "Cross-platform mobile application for health tracking, featuring sync with wearable devices.",
      imageUrl: "https://placehold.co/600x400/252b37/e6e8ec?text=Health+App",
      tags: ["Mobile", "React Native", "iOS/Android", "Health Tech"],
      githubUrl: "https://github.com/ujjwalnepal",
      liveUrl: "#",
      category: "mobile"
    }
  ];
  
  // Categories for filtering
  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Apps" },
    { id: "ar", label: "AR/VR" },
    { id: "3d", label: "3D/WebGL" },
    { id: "devops", label: "DevOps" },
    { id: "ml", label: "ML/AI" },
    { id: "mobile", label: "Mobile" }
  ];
  
  // Filter projects based on active tab
  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(project => project.category === activeTab);
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative py-20"
    >
      {/* Background decorations */}
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="inline-block text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mb-3 reveal-animation">
              My Projects
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 reveal-animation">
              Featured Work
            </h3>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto reveal-animation">
              A collection of projects that showcase my technical skills and problem-solving abilities.
            </p>
          </div>
          
          {/* Category tabs */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-2 reveal-animation">
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === category.id
                      ? "bg-primary text-white"
                      : "bg-secondary/50 text-foreground/60 hover:bg-secondary"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div 
                key={index} 
                className="group glass-card rounded-xl overflow-hidden transition-all duration-500 hover:transform hover:translate-y-[-4px] reveal-animation"
              >
                {/* Project image with overlay effect */}
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/20 opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  
                  {/* Quick action buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                      aria-label="View GitHub Repository"
                    >
                      <Github size={18} />
                    </a>
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors"
                      aria-label="View Live Project"
                    >
                      <Globe size={18} />
                    </a>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="bg-secondary/30 text-foreground/70 border-none text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Title and description */}
                  <h4 className="text-xl font-bold mb-2">{project.title}</h4>
                  <p className="text-foreground/70 text-sm mb-4">
                    {project.description}
                  </p>
                  
                  {/* View details button */}
                  <Button 
                    variant="ghost" 
                    className="group/btn text-primary hover:text-primary/80 hover:bg-primary/5 p-0"
                  >
                    <span className="mr-1">View Details</span>
                    <ArrowUpRight 
                      size={16} 
                      className="transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" 
                    />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* View all projects button */}
          <div className="flex justify-center mt-12">
            <Button 
              variant="outline" 
              className="px-8 reveal-animation"
            >
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
