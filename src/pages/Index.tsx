
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const RevealAnimations = () => {
  useEffect(() => {
    // Function to initialize the animation observer
    const initObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        { threshold: 0.1 }
      );
      
      // Observe all elements with the reveal-animation class
      const revealElements = document.querySelectorAll(".reveal-animation");
      revealElements.forEach((el) => observer.observe(el));
      
      return observer;
    };
    
    const observer = initObserver();
    
    return () => {
      // Clean up the observer
      observer.disconnect();
    };
  }, []);
  
  return null;
};

const Index = () => {
  return (
    <main className="bg-background text-foreground">
      <RevealAnimations />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
