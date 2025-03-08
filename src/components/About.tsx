
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
  
  // Key skills with icons
  const skills = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Full Stack Development",
      description: "Expert in building complete web applications from frontend to backend using modern technologies."
    },
    {
      icon: <Layers className="h-6 w-6 text-primary" />,
      title: "3D & AR Technologies",
      description: "Creating immersive experiences through 3D visualization and augmented reality applications."
    },
    {
      icon: <Server className="h-6 w-6 text-primary" />,
      title: "DevOps & Cloud",
      description: "Deep expertise in AWS, GCP, and modern DevOps practices for scalable infrastructure."
    },
    {
      icon: <Cpu className="h-6 w-6 text-primary" />,
      title: "ML & LLMs",
      description: "Implementing machine learning solutions and working with large language models."
    },
    {
      icon: <Globe className="h-6 w-6 text-primary" />,
      title: "Mobile Development",
      description: "Building native mobile applications for iOS and Android platforms."
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: "Business Growth",
      description: "Helping businesses scale through technical solutions from the ground up."
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
              Over a Decade of Software Engineering Excellence
            </h3>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto reveal-animation">
              I am a passionate full-stack developer with more than 10 years of experience building cutting-edge applications 
              and helping businesses grow through technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card p-8 rounded-2xl reveal-animation">
              <h3 className="text-xl font-bold mb-4">My Journey</h3>
              <p className="text-foreground/70 mb-3">
                With over a decade of experience in software development, I've built a diverse skillset 
                that spans the entire development lifecycle. My journey has taken me from web applications 
                to 3D technologies, AR experiences, and cloud infrastructure.
              </p>
              <p className="text-foreground/70">
                I pride myself on staying at the cutting edge of technology, constantly learning and 
                adapting to new tools and frameworks that enhance the development process and deliver 
                exceptional results for clients and users.
              </p>
            </div>
            
            <div className="glass-card p-8 rounded-2xl reveal-animation">
              <h3 className="text-xl font-bold mb-4">My Approach</h3>
              <p className="text-foreground/70 mb-3">
                I believe in building software that's not just functional, but also intuitive, 
                scalable, and maintainable. My approach combines technical expertise with a deep 
                understanding of business needs to create solutions that drive real value.
              </p>
              <p className="text-foreground/70">
                Whether I'm developing a complex web application, implementing DevOps practices, 
                or exploring the possibilities of AR and machine learning, I'm committed to excellence 
                in every line of code and every user interaction.
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
