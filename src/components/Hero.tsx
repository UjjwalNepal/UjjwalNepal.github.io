
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, FileText, Send } from "lucide-react";

// Simulated 3D effect with mouse movement
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = hero.getBoundingClientRect();
      
      // Calculate the position relative to the center of the container
      const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((clientY - rect.top) / rect.height - 0.5) * 2;
      
      // Apply transforms to create subtle 3D effect
      hero.style.transform = `perspective(1000px) rotateY(${x * 2}deg) rotateX(${-y * 2}deg)`;
      
      // Move the circle with the cursor
      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${clientX - rect.left - 150}px, ${clientY - rect.top - 150}px)`;
      }
    };
    
    const handleMouseLeave = () => {
      hero.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      
      if (circleRef.current) {
        circleRef.current.style.opacity = '0';
      }
    };
    
    const handleMouseEnter = () => {
      if (circleRef.current) {
        circleRef.current.style.opacity = '0.2';
      }
    };
    
    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);
    hero.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      hero.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);
  
  // SVG pattern to be used as background decoration
  const pattern = (
    <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
      <pattern
        id="grid-pattern"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 0 40 L 40 40 40 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
  
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden"
      ref={heroRef}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {pattern}
      </div>
      
      {/* Animated circle that follows the cursor */}
      <div 
        ref={circleRef}
        className="absolute w-80 h-80 rounded-full bg-primary opacity-0 blur-3xl pointer-events-none transition-opacity duration-300"
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>
      
      {/* Gradient circles in background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-30 animate-pulse-slow pointer-events-none"></div>
      <div className="absolute -bottom-14 -right-14 w-72 h-72 bg-accent/30 rounded-full filter blur-3xl opacity-30 animate-pulse-slow pointer-events-none"></div>
      
      <div className="container mx-auto px-4 z-10 transition-all duration-500">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 space-y-4">
            <div className="flex items-center mb-4">
              <div className="animate-fade-in animate-delay-100 glass-button py-1.5 px-3 rounded-full">
                <p className="text-foreground/90 text-sm font-medium">Full Stack Engineer & Tech Enthusiast</p>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter animate-fade-in animate-delay-200">
              <span className="text-foreground">Hi, I'm</span>{" "}
              <span className="text-shimmer">Ujjwal Raj Nepal</span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-foreground/70 max-w-3xl animate-fade-in animate-delay-300">
              <span className="opacity-85">Building innovative solutions with</span>{" "}
              <span className="font-semibold text-gradient">10+ years</span>{" "}
              <span className="opacity-85">of experience in software development.</span>
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in animate-delay-400">
            <Button 
              className="text-base group transition-all duration-300 transform hover:translate-y-[-2px]"
              size="lg"
            >
              <Send className="mr-2 h-4 w-4 group-hover:animate-pulse" />
              Contact Me
            </Button>
            <Button 
              variant="outline" 
              className="text-base group transition-all duration-300 transform hover:translate-y-[-2px]"
              size="lg"
            >
              <FileText className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              View Resume
            </Button>
          </div>
          
          <div className="mt-16 text-center animate-fade-in animate-delay-500">
            <a 
              href="#about" 
              className="inline-flex flex-col items-center text-foreground/60 hover:text-primary transition-colors group"
            >
              <span className="mb-1 text-sm">Scroll Down</span>
              <ChevronDown className="animate-bounce" size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
