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
      <motion.div 
        className="reveal max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 hover-target">Instagram Reels</h2>
        <div className="h-1 w-20 bg-primary mb-8"></div>
        <p className="text-lg mb-12 hover-target">
          Check out some of my latest Instagram Reels.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {reels.map((reel, index) => (
          <motion.div
            key={index}
            className="reveal project-card bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="aspect-[9/16] bg-muted relative">
              <img  alt={reel.thumbnail} className="w-full h-full object-cover hover-target" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold hover-target">{reel.title}</h3>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-foreground/80 mb-4 text-sm hover-target">{reel.description}</p>
              <Button 
                size="sm" 
                className="w-full flex items-center justify-center space-x-1 hover-target"
                asChild
              >
                <a href={reel.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  <span>Watch on Instagram</span>
                </a>
              </Button>
            </div>
          </motion.div>
        ))}
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
          <a href="https://www.instagram.com/your-instagram-username/reels/" target="_blank" rel="noopener noreferrer">
            View All Reels on Instagram
            <ExternalLink size={16} className="ml-2" />
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default Reels;