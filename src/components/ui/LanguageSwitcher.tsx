import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'bg' ? 'en' : 'bg';
    changeLanguage(newLanguage);
  };

  return (
    <motion.div 
      className="flex items-center space-x-2 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
    >
      <div className="relative w-12 h-6 bg-background-light rounded-full p-1 transition-colors duration-300 ease-in-out">
        <motion.div 
          className="absolute w-4 h-4 bg-accent rounded-full shadow-md"
          animate={{ x: language === 'bg' ? 2 : 26 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </div>
      <span className="text-sm font-medium">
        {language === 'bg' ? 'BG' : 'EN'}
      </span>
    </motion.div>
  );
};

export default LanguageSwitcher;