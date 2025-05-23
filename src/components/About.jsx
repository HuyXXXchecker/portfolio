
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 hover-target">About Me</h2>
          <div className="h-1 w-20 bg-primary mb-8"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            className="reveal"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img  alt="Professional portrait photo" className="w-full h-full object-cover hover-target" src="https://images.unsplash.com/flagged/photo-1572561701232-6c3bc9ef5aea" />
            </div>
          </motion.div>
          
          <motion.div 
            className="reveal flex flex-col justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className="text-lg mb-6 hover-target">
              I'm a passionate developer with a keen eye for design and a love for creating clean, 
              minimalist interfaces that deliver exceptional user experiences.
            </p>
            <p className="text-lg mb-6 hover-target">
              With expertise in modern web technologies, I build responsive and interactive applications 
              that combine aesthetic appeal with functional excellence.
            </p>
            <p className="text-lg hover-target">
              When I'm not coding, you can find me exploring new design trends, experimenting with creative 
              projects, or enjoying the outdoors for fresh inspiration.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
