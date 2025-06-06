import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  centered = true,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
}) => {
  const alignClass = centered ? 'text-center' : 'text-left';

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const accentLineVariants = {
    hidden: { width: 0 },
    visible: { width: '60px', transition: { duration: 0.8 } }
  };

  return (
    <div className={`mb-12 ${alignClass} ${className}`}>
      <motion.h2 
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${titleClassName}`}
        variants={titleVariants}
      >
        {title}
      </motion.h2>
      
      <motion.div 
        className={`h-1 bg-accent rounded-full mx-auto mb-6 ${!centered && 'ml-0'}`}
        variants={accentLineVariants}
      />
      
      {subtitle && (
        <motion.p 
          className={`text-lg text-white max-w-3xl ${centered ? 'mx-auto' : ''} ${subtitleClassName}`}
          variants={subtitleVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionTitle;