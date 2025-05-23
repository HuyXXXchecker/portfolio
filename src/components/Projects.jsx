
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitCommit as GitHub } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const projects = [
    {
      title: "Proxyless SEO Parser",
      description: "A light-weight SEO tool that runs completely proxyless.",
      tags: ["Rust", "Google", "SEO"],
      image: "Minimalist e-commerce website with product grid layout",
      link: "#",
      github: "#"
    },
    {
      title: "SolChain mempool explorer",
      description: "A flexible and customizable mempool explorer for Solana.",
      tags: ["Rust", "Python", "Blockchain"],
      image: "Clean portfolio website template with project showcase",
      link: "#",
      github: "#"
    },
    {
      title: "Palhitter",
      description: "A multitool revolves around paypal payment gateway.",
      tags: ["Rust", "Python", "0Day"],
      image: "Minimal task management application with clean interface",
      link: "#",
      github: "#"
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
        <h2 className="text-3xl md:text-4xl font-bold mb-6 hover-target">Projects</h2>
        <div className="h-1 w-20 bg-primary mb-8"></div>
        <p className="text-lg mb-12 hover-target">
          Here are some of my most recent projects.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="reveal project-card bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="aspect-video bg-muted">
              <img  alt={project.title} className="w-full h-full object-cover hover-target" src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 hover-target">{project.title}</h3>
              <p className="text-foreground/80 mb-4 hover-target">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full hover-target"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center space-x-1 hover-target"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <GitHub size={16} />
                    <span>Code</span>
                  </a>
                </Button>
                
                <Button 
                  size="sm" 
                  className="flex items-center space-x-1 hover-target"
                  asChild
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />
                    <span>Demo</span>
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
