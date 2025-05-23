
import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "TailwindCSS", "Framer Motion"]
    },
    {
      title: "Design",
      skills: ["UI/UX Design", "Figma", "Adobe XD", "Responsive Design", "Animation"]
    },
    {
      title: "Tools & Others",
      skills: ["Git", "Webpack", "Vite", "RESTful APIs", "Performance Optimization"]
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
        <h2 className="text-3xl md:text-4xl font-bold mb-6 hover-target">Skills</h2>
        <div className="h-1 w-20 bg-primary mb-8"></div>
        <p className="text-lg mb-12 hover-target">
          My technical toolkit and areas of expertise that I bring to every project.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {skillCategories.map((category, index) => (
          <motion.div
            key={index}
            className="reveal bg-card rounded-lg p-6 border border-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-xl font-semibold mb-4 hover-target">{category.title}</h3>
            <ul className="space-y-2">
              {category.skills.map((skill, skillIndex) => (
                <motion.li
                  key={skillIndex}
                  className="flex items-center hover-target"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * skillIndex + 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                  <span>{skill}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
