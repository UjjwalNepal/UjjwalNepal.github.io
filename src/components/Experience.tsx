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
  
  // Work experiences based on resume
  const experiences = [
    {
      title: "Lead Technical Consultant",
      company: "Fresh KTM",
      period: "Apr 2022 - Present",
      description: "Led development of an innovative ERP system for agritech, focusing on supply chain efficiency and POS functionality. Architected scalable systems with CI/CD pipelines and created compliant Accounting and Billing modules.",
      technologies: ["ERP Systems", "CI/CD", "Agile", "Data Security", "DevOps", "Supply Chain"]
    },
    {
      title: "Lead Full-stack Developer",
      company: "Stealth AI Startup",
      period: "Oct 2021 - Present",
      description: "Led development of an innovative AR storytelling app for iOS using ARKit and RealityKit. Integrated CoreML and LLMs for AI features and engineered a scalable NoSQL database backend on AWS.",
      technologies: ["ARKit", "RealityKit", "CoreML", "LLMs", "AWS", "NoSQL", "Lambda"]
    },
    {
      title: "Full-stack Developer/Project Manager",
      company: "HowApp: Play at Home",
      period: "Apr 2019 - Present",
      description: "Spearheaded development of a pioneering parenting app, leading from concept to delivery. Managed team of developers and designers while driving product vision focusing on community and practicality.",
      technologies: ["Full Stack", "Project Management", "Mobile Apps", "UX Design", "Community Features"]
    },
    {
      title: "ML Engineer/Full Stack Developer",
      company: "Otonomis",
      period: "May 2017 - Present",
      description: "Led development of a comprehensive tracking system for vehicle fleet management. Created scalable tracking server and native mobile apps for iOS and Android with real-time tracking and reporting.",
      technologies: ["ML", "IoT", "iOS", "Android", "Fleet Management", "Real-time Tracking"]
    },
    {
      title: "Engineer",
      company: "Computer Science Research and Development Center",
      period: "Apr 2016 - Present",
      description: "Led research and development for cross-platform mobile applications with focus on seamless functionality across iOS and Android. Pioneered adaptive design principles and uniform user experience strategies.",
      technologies: ["React Native", "Flutter", "Cross-Platform", "Mobile Development", "UX"]
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
