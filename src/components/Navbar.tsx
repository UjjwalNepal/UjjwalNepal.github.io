
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Moon, 
  Sun 
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

  // Theme toggle is just for show - we're using dark mode by default
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container px-4 mx-auto flex justify-between items-center">
        <a 
          href="#home" 
          className="text-2xl font-bold text-gradient"
        >
          Ujjwal
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-foreground/70 hover:text-primary transition-colors relative group text-sm font-medium"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ujjwalnepal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="https://np.linkedin.com/in/ujjwal-raj-nepal-6526a2b0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="text-foreground/70 hover:text-primary transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background/95 backdrop-blur-lg z-40 lg:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container h-full flex flex-col justify-center items-center">
          <ul className="flex flex-col items-center gap-6 mb-8">
            {navLinks.map((link) => (
              <li key={link.name} className="w-full text-center">
                <a
                  href={link.href}
                  className="text-foreground text-2xl font-medium block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/ujjwalnepal"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://np.linkedin.com/in/ujjwal-raj-nepal-6526a2b0"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={toggleTheme}
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
