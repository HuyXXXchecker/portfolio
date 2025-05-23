
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 pt-20 flex flex-col items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 hover-target"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hello, I'm <span className="text-primary">Huy</span>
        </motion.h1>
        
        <motion.div
          className="h-1 w-20 bg-primary mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        
        <motion.p 
          className="text-xl md:text-2xl text-foreground/80 mb-8 hover-target"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Better known as Perycent, this is a walkthrough of my life and work.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button 
            onClick={scrollToAbout}
            className="rounded-full px-6 py-6 hover-target"
          >
            Explore My Work
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-10"
      >
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={scrollToAbout}
          className="animate-bounce rounded-full hover-target"
          aria-label="Scroll down"
        >
          <ArrowDown size={24} />
        </Button>
      </motion.div>
    </div>
  );
};

export default Hero;
