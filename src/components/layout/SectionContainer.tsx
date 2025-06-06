import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionContainerProps {
  id: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
  withPadding?: boolean;
  withContainer?: boolean;
  bgColor?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  children,
  className = '',
  fullHeight = false,
  withPadding = true,
  withContainer = true,
  bgColor,
}) => {
  const heightClass = fullHeight ? 'min-h-screen' : '';
  const paddingClass = withPadding ? 'py-16 md:py-24' : '';
  const bgColorClass = bgColor || '';

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.section
      id={id}
      className={`${heightClass} ${paddingClass} ${bgColorClass} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      {withContainer ? (
        <div className="container mx-auto px-4">
          {children}
        </div>
      ) : (
        children
      )}
    </motion.section>
  );
};

export default SectionContainer;