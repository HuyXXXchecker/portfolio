import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, GitCommit as GitHub, Linkedin, Mail, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import MouseTracer from '@/components/MouseTracer';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Reels from '@/components/Reels';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const sectionsRef = useRef([]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    toast({
      title: `Switched to ${theme === 'light' ? 'dark' : 'light'} mode`,
      duration: 2000,
    });
  };

  const scrollToSection = (index) => {
    if (sectionsRef.current[index]) {
      sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'reels', label: 'Reels' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <MouseTracer />
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        sections={sections}
        scrollToSection={scrollToSection}
      />
      
      <main>
        <section ref={el => sectionsRef.current[0] = el} id="home" className="section">
          <Hero />
        </section>
        
        <section ref={el => sectionsRef.current[1] = el} id="about" className="section">
          <About />
        </section>
        
        <section ref={el => sectionsRef.current[2] = el} id="projects" className="section">
          <Projects />
        </section>
        
        <section ref={el => sectionsRef.current[3] = el} id="skills" className="section">
          <Skills />
        </section>

        <section ref={el => sectionsRef.current[4] = el} id="reels" className="section">
          <Reels />
        </section>
        
        <section ref={el => sectionsRef.current[5] = el} id="contact" className="section">
          <Contact />
        </section>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;