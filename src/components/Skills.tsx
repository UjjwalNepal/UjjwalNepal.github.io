import { useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";

const Skills = () => {
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
            
            // Animate progress bars
            const progressBars = sectionRef.current?.querySelectorAll('.skill-progress');
            progressBars?.forEach((el, i) => {
              setTimeout(() => {
                const targetValue = parseInt(el.getAttribute('data-value') || "0");
                (el as HTMLElement).style.width = `${targetValue}%`;
              }, i * 100 + 300);
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
  
  // Technical skills based on resume
  const technicalSkills = [
    { name: "Full Stack Development", level: 95 },
    { name: "MERN/MEVN Stack", level: 92 },
    { name: "Mobile Development (iOS/Android)", level: 90 },
    { name: "Augmented Reality", level: 88 },
    { name: "Project Management", level: 85 },
    { name: "Software Architecture", level: 92 },
    { name: "DevOps & Infrastructure", level: 88 },
    { name: "Machine Learning", level: 82 }
  ];
  
  // Tool categories based on resume
  const toolCategories = [
    {
      category: "Frontend & Mobile",
      tools: ["React", "Vue", "Swift", "React Native", "Flutter", "ARKit", "RealityKit", "Cross-Platform"]
    },
    {
      category: "Backend",
      tools: ["Node.js", "NestJS", "MongoDB", "NoSQL", "AWS Lambda", "Express", "REST API"]
    },
    {
      category: "Infrastructure",
      tools: ["AWS", "Google Cloud Platform", "CI/CD", "DevOps", "Scalability", "Amazon CloudFront"]
    },
    {
      category: "Software Architecture",
      tools: ["System Design", "Microservices", "API Design", "Cloud Architecture", "Scalable Systems"]
    },
    {
      category: "AI & ML",
      tools: ["Machine Learning", "CoreML", "LLMs", "Research", "Data Analysis", "IoT Integration"]
    },
    {
      category: "Management",
      tools: ["Project Management", "Product Management", "Agile", "Team Leadership", "Supply Chain Management"]
    }
  ];
  
  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="relative py-20 bg-secondary/30"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="grid grid-cols-6 h-full">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-full border-r border-foreground/5 last:border-r-0"></div>
          ))}
        </div>
        <div className="grid grid-rows-6 h-full">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="w-full border-b border-foreground/5 last:border-b-0"></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="inline-block text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mb-3 reveal-animation">
              My Expertise
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 reveal-animation">
              Technical Skills
            </h3>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto reveal-animation">
              A comprehensive overview of my technical capabilities and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Technical skill progress bars */}
            <div className="glass-card p-8 rounded-xl reveal-animation">
              <h4 className="text-xl font-bold mb-6">Proficiency Levels</h4>
              
              <div className="space-y-6">
                {technicalSkills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground font-medium">{skill.name}</span>
                      <span className="text-foreground/70 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="skill-progress h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                        style={{ width: "0%" }}
                        data-value={skill.level}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Technology pill clouds */}
            <div className="glass-card p-8 rounded-xl reveal-animation">
              <h4 className="text-xl font-bold mb-6">Technologies & Tools</h4>
              
              <div className="space-y-8">
                {toolCategories.map((category, index) => (
                  <div key={index} className="space-y-3">
                    <h5 className="text-lg font-medium text-primary">{category.category}</h5>
                    <div className="flex flex-wrap gap-2">
                      {category.tools.map((tool, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 rounded-full bg-secondary text-foreground/80 text-sm"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Experience metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { value: "8+", label: "Years Experience" },
              { value: "5+", label: "Companies" },
              { value: "Multiple", label: "Products Built" },
              { value: "AR/VR/AI", label: "Specializations" }
            ].map((metric, idx) => (
              <div 
                key={idx} 
                className="glass-card p-6 rounded-xl text-center transform hover:translate-y-[-4px] transition-all duration-300 reveal-animation"
              >
                <h4 className="text-3xl md:text-4xl font-bold text-gradient mb-2">{metric.value}</h4>
                <p className="text-foreground/70">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
