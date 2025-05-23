import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Reels = () => {
  const reels = [
    {
      title: "Reel Title 1",
      description: "A short description of your amazing reel content.",
      thumbnail: "Abstract background for a reel thumbnail",
      link: "https://www.instagram.com/reel/your-reel-id-1/" 
    },
    {
      title: "Reel Title 2",
      description: "Another captivating reel showcasing your skills or interests.",
      thumbnail: "Colorful gradient background for reel thumbnail",
      link: "https://www.instagram.com/reel/your-reel-id-2/"
    },
    {
      title: "Reel Title 3",
      description: "This reel highlights a specific project or moment.",
      thumbnail: "Dynamic motion blur effect for reel thumbnail",
      link: "https://www.instagram.com/reel/your-reel-id-3/"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      </div>
       <motion.div
        className="reveal text-center mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: reels.length * 0.2 + 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Button
          variant="outline"
          className="hover-target"
          asChild
        >
          <a href="https://www.instagram.com/foreign.perycent/" target="_blank" rel="noopener noreferrer">
            View All Reels on Instagram
            <ExternalLink size={16} className="ml-2" />
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default Reels;
