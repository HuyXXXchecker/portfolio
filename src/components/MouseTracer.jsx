
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MouseTracer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
    },
  };

  return (
    <>
      <motion.div
        className="cursor-dot"
        variants={variants}
        animate="default"
        transition={{ type: 'spring', stiffness: 1000, damping: 50 }}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <motion.div
        className="cursor-outline"
        variants={variants}
        animate="default"
        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
};

export default MouseTracer;
