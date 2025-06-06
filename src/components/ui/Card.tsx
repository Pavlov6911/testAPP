import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon,
  children,
  className = '',
  hoverEffect = true,
  delay = 0,
}) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay * 0.1,
      }
    }
  };

  return (
    <motion.div 
      className={`bg-background-light rounded-2xl p-6 shadow-soft ${hoverEffect ? 'shadow-glow transition-shadow duration-300' : ''} ${className}`}
      variants={cardVariants}
      whileHover={hoverEffect ? { y: -10 } : undefined}
    >
      {icon && (
        <div className="text-accent mb-4">
          {icon}
        </div>
      )}
      
      {title && (
        <h3 className="text-xl font-bold mb-2">{title}</h3>
      )}
      
      {subtitle && (
        <p className="text-white mb-4">{subtitle}</p>
      )}
      
      <div className={`${title || subtitle ? 'mt-4' : ''}`}>
        {children}
      </div>
    </motion.div>
  );
};

export default Card;