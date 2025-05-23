
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { GitCommit as GitHub, Linkedin, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const socialLinks = [
    { icon: <GitHub size={20} />, url: "https://github.com/HuyXXXchecker", label: "GitHub" },

    { icon: <Mail size={20} />, url: "mailto:omgbotcomedy@gmail.com", label: "Email" }
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
        <h2 className="text-3xl md:text-4xl font-bold mb-6 hover-target">Get In Touch</h2>
        <div className="h-1 w-20 bg-primary mb-8"></div>
        <p className="text-lg mb-12 hover-target">
          Have a project in mind or want to discuss potential opportunities? Feel free to reach out.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h3 className="text-xl font-semibold mb-6 hover-target">Contact Information</h3>
          <p className="mb-8 hover-target">
            I'm currently available for freelance work and open to discussing new opportunities.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 hover-target">
              <Mail size={20} className="text-primary" />
              <span>omgbotcomedy@gmail.com</span>
            </div>
          </div>
          
          <h3 className="text-xl font-semibold mb-4 hover-target">Connect With Me</h3>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-colors hover-target"
                aria-label={link.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.5 }}
                viewport={{ once: true }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium hover-target">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary hover-target"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium hover-target">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary hover-target"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium hover-target">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary hover-target"
              ></textarea>
            </div>
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 hover-target"
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
