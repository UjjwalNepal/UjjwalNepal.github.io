import { useEffect, useRef } from "react";
import { Code, Server, Globe, Layers, Cpu, Database } from "lucide-react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Add active class to all reveal elements within the section
            const revealElements = sectionRef.current?.querySelectorAll('.reveal-animation');
            revealElements?.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('active');
              }, i * 100); // Stagger animation
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
  
  // Key skills with icons based on resume
  const skills = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Full Stack Development",
      description: "Expert in MERN/MEVN stack development with MongoDB, React, Vue, and Node.js using Nest."
    },
    {
      icon: <Layers className="h-6 w-6 text-primary" />,
      title: "AR & VR Technologies",
      description: "Creating immersive AR experiences with ARKit, RealityKit, and integrating with AI technologies."
    },
    {
      icon: <Server className="h-6 w-6 text-primary" />,
      title: "Software Architecture",
      description: "Designing and implementing efficient, scalable software solutions with focus on DevOps practices."
    },
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      title: "Machine Learning",
      description: "Implementing ML solutions for various applications including IoT systems and fleet management."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Mobile Development",
      description: "Building native iOS and Android applications as well as cross-platform solutions."
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "Project Management",
      description: "Leading cross-functional teams, driving product strategy, and ensuring successful project execution."
    }
  ];
  
  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="inline-block text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mb-3 reveal-animation">
              About Me
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 reveal-animation">
              8+ Years of Software Engineering Excellence
            </h3>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto reveal-animation">
              I am a full stack and mobile app developer specializing in native iOS/Android development and
              advanced AR technologies with strong experience in product management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card p-8 rounded-2xl reveal-animation">
              <h3 className="text-xl font-bold mb-4">My Profile</h3>
              <p className="text-foreground/70 mb-3">
                With over 8 years of experience in software development, I specialize in full stack
                and mobile app development (native iOS and Android), as well as advanced
                AR technologies. I am proficient in MERN stack development, with extensive
                knowledge of MongoDB, React, Vue, and Node.js using Nest.
              </p>
              <p className="text-foreground/70">
                My expertise extends to software architecture, DevOps practices, and deployment pipelines,
                where I have demonstrated success in designing and implementing efficient and scalable
                software solutions.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl reveal-animation">
              <h3 className="text-xl font-bold mb-4">My Approach</h3>
              <p className="text-foreground/70 mb-3">
                As a Product Manager, I leverage my technical background to lead cross-functional teams,
                drive product strategy, and ensure successful project execution. I focus on creating innovative
                solutions that solve real problems while maintaining high technical standards.
              </p>
              <p className="text-foreground/70">
                Whether I'm developing an ERP system for agritech, an AR storytelling app, or a parenting platform,
                I'm committed to excellence in engineering and user experience, focusing on scalability
                and performance optimization.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="glass-card p-6 rounded-xl transition-all duration-300 hover:translate-y-[-4px] hover:shadow-primary/5 reveal-animation"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-secondary">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{skill.title}</h3>
                <p className="text-foreground/70 text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
