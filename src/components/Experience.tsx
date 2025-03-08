
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { BriefcaseBusiness, Calendar } from "lucide-react";

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
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
  
  // Sample work experiences
  const experiences = [
    {
      title: "Lead Full Stack Developer",
      company: "Tech Innovators Inc.",
      period: "2019 - Present",
      description: "Leading development of complex web applications from concept to deployment. Implementing best practices in code quality and architecture.",
      technologies: ["React", "Node.js", "AWS", "MongoDB", "Docker", "CI/CD"]
    },
    {
      title: "Senior Software Engineer",
      company: "Digital Solutions Ltd.",
      period: "2016 - 2019",
      description: "Architected and developed scalable web applications and services. Improved system performance and implemented DevOps practices.",
      technologies: ["Angular", "Python", "GCP", "PostgreSQL", "Kubernetes"]
    },
    {
      title: "3D & AR Developer",
      company: "Immersive Technologies",
      period: "2014 - 2016",
      description: "Created immersive 3D and AR experiences for web and mobile platforms. Optimized graphics for performance across different devices.",
      technologies: ["Three.js", "WebGL", "AR.js", "Unity", "Mobile AR"]
    },
    {
      title: "Full Stack Developer",
      company: "Web Solutions Group",
      period: "2011 - 2014",
      description: "Developed responsive web applications and e-commerce solutions. Collaborated with designers to implement intuitive user interfaces.",
      technologies: ["JavaScript", "PHP", "MySQL", "HTML/CSS", "jQuery"]
    }
  ];
  
  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="relative py-20 bg-secondary/30"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern
            id="grid-pattern-experience"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="60"
              y1="0"
              x2="60"
              y2="60"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <line
              x1="0"
              y1="60"
              x2="60"
              y2="60"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid-pattern-experience)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="inline-block text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mb-3 reveal-animation">
              Professional Experience
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 reveal-animation">
              My Career Journey
            </h3>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto reveal-animation">
              A timeline of my professional growth and key roles throughout my career.
            </p>
          </div>
          
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border transform md:translate-x-[-50%] hidden md:block"></div>
            
            {/* Experience cards */}
            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={`mb-12 md:mb-0 relative flex ${
                  index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                } reveal-animation`}
              >
                {/* Timeline dot on the center line */}
                <div className="hidden md:block absolute left-1/2 top-6 w-5 h-5 rounded-full bg-primary transform translate-x-[-50%]"></div>
                
                {/* Experience card */}
                <div 
                  className={`w-full md:w-[calc(50%-40px)] relative ${
                    index % 2 === 0 ? 'md:mr-10' : 'md:ml-10'
                  }`}
                >
                  <div className="glass-card p-6 md:p-8 rounded-xl relative mb-6">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                      <h4 className="text-xl font-bold">{exp.title}</h4>
                      <div className="flex items-center text-foreground/60 text-sm mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4 text-foreground/80">
                      <BriefcaseBusiness className="w-4 h-4 mr-2" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    
                    <p className="text-foreground/70 mb-4">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-secondary text-foreground/80">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
