
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  return (
    <footer className="relative bg-card py-12">
      {/* Divider line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gradient mb-2">Ujjwal Raj Nepal</h2>
              <p className="text-foreground/60 text-sm">Full Stack Engineer & Tech Enthusiast</p>
            </div>
            
            <div className="flex space-x-6 items-center">
              <a
                href="https://github.com/ujjwalnepal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://np.linkedin.com/in/ujjwal-raj-nepal-6526a2b0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:contact@example.com"
                className="text-foreground/70 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <button
                onClick={scrollToTop}
                className="w-9 h-9 rounded-full bg-secondary/80 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-secondary transition-colors"
                aria-label="Scroll to top"
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
          
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-foreground/60 text-sm mb-4 sm:mb-0">
              &copy; {new Date().getFullYear()} Ujjwal Raj Nepal. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-foreground/60">
              <a href="#home" className="hover:text-primary transition-colors">Home</a>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
              <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
              <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
              <a href="#skills" className="hover:text-primary transition-colors">Skills</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
