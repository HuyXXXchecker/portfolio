
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
              <img  alt="Professional portrait photo" className="w-full h-full object-cover hover-target" src="https://i.ibb.co/GvNw9MNs/495322202-17878231440316704-2575904424573598996-n.jpg" />
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
              I like coding, gaming and climbing.
            </p>
            <p className="text-lg mb-6 hover-target">
              I'm always trying to be the better version of myself everyday.
            </p>
            <p className="text-lg hover-target">
              I hope I insipired and inspiring others to do the same.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
