
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Linkedin, Mail, LogIn } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "py-5"
      }`}
    >
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gradient">
          Ujjwal Raj Nepal
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-x-1">
            <a href="#home" className="px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors">Home</a>
            <a href="#about" className="px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors">About</a>
            <a href="#experience" className="px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors">Experience</a>
            <a href="#projects" className="px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors">Projects</a>
            <a href="#skills" className="px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors">Skills</a>
            <a href="#contact" className="px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors">Contact</a>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/ujjwalnepal"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://np.linkedin.com/in/ujjwal-raj-nepal-6526a2b0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            <Link to="/admin" className="p-2 rounded-full hover:bg-secondary/50 transition-colors" aria-label="Admin Login">
              <LogIn size={20} />
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md md:hidden hover:bg-secondary/50 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-[5rem] bg-background/95 backdrop-blur-sm md:hidden z-50">
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <div className="flex flex-col items-center gap-4">
                <a href="#home" className="text-xl py-2" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#about" className="text-xl py-2" onClick={() => setIsMenuOpen(false)}>About</a>
                <a href="#experience" className="text-xl py-2" onClick={() => setIsMenuOpen(false)}>Experience</a>
                <a href="#projects" className="text-xl py-2" onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a href="#skills" className="text-xl py-2" onClick={() => setIsMenuOpen(false)}>Skills</a>
                <a href="#contact" className="text-xl py-2" onClick={() => setIsMenuOpen(false)}>Contact</a>
                <Link to="/admin" className="text-xl py-2 flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <LogIn size={20} />
                  Admin
                </Link>
              </div>
              
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/ujjwalnepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://np.linkedin.com/in/ujjwal-raj-nepal-6526a2b0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
