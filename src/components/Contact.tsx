import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, MessageSquare, Send, Github, Linkedin, MapPin, ArrowUpRight } from "lucide-react";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
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
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      formRef.current?.reset();
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon!",
        duration: 5000,
      });
    }, 1500);
  };
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative py-20"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-secondary/30 to-transparent opacity-50 pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="inline-block text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mb-3 reveal-animation">
              Get In Touch
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 reveal-animation">
              Let's Work Together
            </h3>
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto reveal-animation">
              Have a project in mind or want to explore possibilities? I'd love to hear from you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <div className="glass-card p-8 rounded-xl reveal-animation">
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                Send a Message
              </h4>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground/80">
                        Your Name
                      </label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        required 
                        className="bg-secondary/50 border-transparent focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground/80">
                        Email Address
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                        className="bg-secondary/50 border-transparent focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground/80">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      placeholder="Project Inquiry" 
                      required 
                      className="bg-secondary/50 border-transparent focus:border-primary"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground/80">
                      Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell me about your project or inquiry..." 
                      required 
                      rows={5} 
                      className="bg-secondary/50 border-transparent focus:border-primary resize-none"
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      Sending...
                      <svg className="animate-spin ml-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
            
            {/* Contact information */}
            <div className="space-y-6">
              <div className="glass-card p-8 rounded-xl reveal-animation">
                <h4 className="text-xl font-bold mb-6 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  Contact Information
                </h4>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 text-primary mt-1" />
                    <div>
                      <h5 className="text-sm font-medium text-foreground/80 mb-1">Email</h5>
                      <a 
                        href="mailto:nepalujjwal95@gmail.com"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        nepalujjwal95@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-primary mt-1" />
                    <div>
                      <h5 className="text-sm font-medium text-foreground/80 mb-1">Location</h5>
                      <p className="text-foreground">Nepal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-primary mt-1">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <div>
                      <h5 className="text-sm font-medium text-foreground/80 mb-1">Phone</h5>
                      <a
                        href="tel:9849514336"
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        984-9514336
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Github className="w-5 h-5 mr-3 text-primary mt-1" />
                    <div>
                      <h5 className="text-sm font-medium text-foreground/80 mb-1">GitHub</h5>
                      <a 
                        href="https://github.com/ujjwalnepal" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors flex items-center group"
                      >
                        github.com/ujjwalnepal
                        <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Linkedin className="w-5 h-5 mr-3 text-primary mt-1" />
                    <div>
                      <h5 className="text-sm font-medium text-foreground/80 mb-1">LinkedIn</h5>
                      <a 
                        href="https://np.linkedin.com/in/ujjwal-raj-nepal-6526a2b0" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-foreground hover:text-primary transition-colors flex items-center group"
                      >
                        linkedin.com/in/ujjwal-raj-nepal
                        <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-8 rounded-xl reveal-animation">
                <h4 className="text-xl font-bold mb-6">Let's Connect</h4>
                <p className="text-foreground/70 mb-6">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  <span className="text-gradient">Schedule a Call</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
