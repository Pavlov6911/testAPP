import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';
type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'flip';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: AnimationDirection;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  once?: boolean;
  staggerChildren?: number;
  staggerDirection?: 'forward' | 'reverse';
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  direction = 'up',
  type = 'fade',
  delay = 0,
  duration = 0.5,
  distance = 50,
  threshold = 0.1,
  once = true,
  staggerChildren = 0,
  staggerDirection = 'forward',
}) => {
  // Initial animation states
  const getInitialState = () => {
    const initial: any = {};
    
    // Add fade effect
    if (type === 'fade' || type === 'slide') {
      initial.opacity = 0;
    }
    
    // Add slide effect
    if (type === 'slide') {
      switch (direction) {
        case 'up':
          initial.y = distance;
          break;
        case 'down':
          initial.y = -distance;
          break;
        case 'left':
          initial.x = distance;
          break;
        case 'right':
          initial.x = -distance;
          break;
        default:
          break;
      }
    }
    
    // Add scale effect
    if (type === 'scale') {
      initial.opacity = 0;
      initial.scale = 0.8;
    }
    
    // Add rotate effect
    if (type === 'rotate') {
      initial.opacity = 0;
      initial.rotate = direction === 'left' ? -90 : 90;
    }
    
    // Add flip effect
    if (type === 'flip') {
      initial.opacity = 0;
      if (direction === 'up' || direction === 'down') {
        initial.rotateX = direction === 'down' ? 90 : -90;
      } else {
        initial.rotateY = direction === 'right' ? 90 : -90;
      }
    }
    
    return initial;
  };
  
  // Animation variants
  const variants = {
    hidden: getInitialState(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth animation
        staggerChildren,
        staggerDirection: staggerDirection === 'forward' ? 1 : -1,
      },
    },
  };
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;