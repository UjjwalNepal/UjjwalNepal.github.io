
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a new QueryClient
const queryClient = new QueryClient();

// Create custom cursor effect
const CursorEffect = () => {
  useEffect(() => {
    // Check if gsap is available
    if (typeof window.gsap === 'undefined') {
      console.warn('GSAP not loaded yet');
      return;
    }
    
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    cursor.style.position = 'fixed';
    cursor.style.width = '40px';
    cursor.style.height = '40px';
    cursor.style.borderRadius = '50%';
    cursor.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transition = 'width 0.2s, height 0.2s, background-color 0.2s';
    document.body.appendChild(cursor);
    
    const dot = document.createElement('div');
    dot.classList.add('cursor-dot');
    dot.style.position = 'fixed';
    dot.style.width = '8px';
    dot.style.height = '8px';
    dot.style.borderRadius = '50%';
    dot.style.backgroundColor = 'hsl(var(--primary))';
    dot.style.transform = 'translate(-50%, -50%)';
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = '9999';
    dot.style.transition = 'width 0.2s, height 0.2s, background-color 0.1s';
    document.body.appendChild(dot);
    
    const moveCursor = (e: MouseEvent) => {
      // Use simple transition instead of GSAP for compatibility
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };
    
    const handleMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      cursor.style.backgroundColor = 'rgba(67, 97, 238, 0.15)';
      dot.style.transform = 'translate(-50%, -50%) scale(0.5)';
    };
    
    const handleMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'transparent';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    };
    
    const handleLinkHover = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.backgroundColor = 'rgba(67, 97, 238, 0.1)';
      cursor.style.borderColor = 'hsl(var(--primary))';
      dot.style.backgroundColor = 'hsl(var(--primary))';
      dot.style.width = '4px';
      dot.style.height = '4px';
    };
    
    const handleLinkLeave = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'transparent';
      cursor.style.borderColor = 'rgba(255, 255, 255, 0.3)';
      dot.style.backgroundColor = 'hsl(var(--primary))';
      dot.style.width = '8px';
      dot.style.height = '8px';
    };
    
    // Add event listeners
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Add hover effect to links and buttons
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });
    
    return () => {
      // Clean up event listeners and elements on unmount
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
      
      if (cursor.parentNode) {
        document.body.removeChild(cursor);
      }
      
      if (dot.parentNode) {
        document.body.removeChild(dot);
      }
    };
  }, []);
  
  return null;
};

// Add this interface to make TypeScript happy
interface Window {
  gsap?: any;
}

declare global {
  interface Window {
    gsap?: any;
  }
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
