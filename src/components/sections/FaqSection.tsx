import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionContainer from '../layout/SectionContainer';
import SectionTitle from '../ui/SectionTitle';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  index: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, toggleOpen, index }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: index * 0.1,
        duration: 0.5 
      } 
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <motion.div 
      className="mb-4 last:mb-0 border border-accent/50 rounded-xl overflow-hidden shadow-soft"
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <motion.button
        className={`w-full p-4 text-left flex justify-between items-center ${isOpen ? 'bg-primary/10' : 'bg-background-light'} hover:bg-primary/10 transition-colors duration-300`}
        onClick={toggleOpen}
        whileTap={{ scale: 0.98 }}
      >
        <span className="font-bold text-lg flex items-center">
          <motion.span 
            className="inline-block mr-2 text-accent"
            initial={false}
            animate={isOpen ? { y: [0, -2, 0] } : { y: 0 }}
            transition={{ repeat: isOpen ? Infinity : 0, repeatDelay: 1.5 }}
          >
            <HelpCircle size={18} />
          </motion.span>
          {question}
        </span>
        <motion.span 
          className="text-accent"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={iconVariants}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            className="bg-background-light/50 px-4 overflow-hidden"
          >
            <div className="py-4">
              <p className="text-white">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FaqSection: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const faqs = [
    {
      question: t('faq.questions.q1'),
      answer: t('faq.answers.a1'),
    },
    {
      question: t('faq.questions.q2'),
      answer: t('faq.answers.a2'),
    },
    {
      question: t('faq.questions.q3'),
      answer: t('faq.answers.a3'),
    },
    {
      question: t('faq.questions.q4'),
      answer: t('faq.answers.a4'),
    },
    {
      question: t('faq.questions.q5'),
      answer: t('faq.answers.a5'),
    },
    {
      question: t('faq.questions.q6'),
      answer: t('faq.answers.a6'),
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      rotateX: -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      } 
    },
  };

  return (
    <SectionContainer id="faq" className="relative overflow-hidden" bgColor="#121212">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <ScrollReveal type="fade" direction="up">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <SectionTitle 
              title={t('faq.title')} 
              subtitle={t('faq.subtitle')}
            />
          </motion.div>
        </ScrollReveal>

        <ScrollReveal type="fade" direction="up" delay={0.3}>
          <motion.div
            className="max-w-4xl mx-auto space-y-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="group relative"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02, 
                  y: -4,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Main container with glassmorphism effect */}
                <motion.div
                  className="relative bg-gradient-to-br from-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 cursor-pointer overflow-hidden shadow-2xl"
                  onClick={() => toggleFaq(index)}
                  whileHover={{
                    borderColor: "rgba(249, 115, 22, 0.5)",
                    boxShadow: "0 20px 40px rgba(249, 115, 22, 0.1), 0 0 0 1px rgba(249, 115, 22, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, 
                        rgba(249, 115, 22, 0.05) 0%, 
                        rgba(251, 146, 60, 0.08) 25%,
                        rgba(249, 115, 22, 0.03) 50%,
                        rgba(251, 146, 60, 0.08) 75%,
                        rgba(249, 115, 22, 0.05) 100%)`
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between">
                      <motion.h3 
                        className="text-lg font-semibold text-white group-hover:text-orange-300 transition-colors duration-300 flex items-center"
                        layout
                      >
                        <motion.span 
                          className="inline-block mr-3 text-orange-500"
                          animate={{
                            rotate: openIndex === index ? [0, 10, -10, 0] : 0,
                            scale: openIndex === index ? [1, 1.1, 1] : 1
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <HelpCircle size={20} />
                        </motion.span>
                        {faq.question}
                      </motion.h3>
                      
                      <motion.div
                        className="flex-shrink-0 ml-4"
                        animate={{ 
                          rotate: openIndex === index ? 180 : 0,
                          scale: openIndex === index ? 1.1 : 1
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/30 backdrop-blur-sm border border-orange-500/30 shadow-lg group-hover:shadow-orange-500/20">
                          <ChevronDown className="w-5 h-5 text-orange-400" />
                        </div>
                      </motion.div>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {openIndex === index && (
                        <motion.div
                          initial={{ 
                            opacity: 0, 
                            height: 0, 
                            y: -10,
                            scale: 0.95
                          }}
                          animate={{ 
                            opacity: 1, 
                            height: "auto", 
                            y: 0,
                            scale: 1
                          }}
                          exit={{ 
                            opacity: 0, 
                            height: 0, 
                            y: -10,
                            scale: 0.95
                          }}
                          transition={{ 
                            duration: 0.4,
                            ease: "easeInOut",
                            layout: { duration: 0.3 }
                          }}
                          className="overflow-hidden"
                        >
                          <motion.div 
                            className="mt-6 pt-4 border-t border-gray-600/30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                          >
                            <p className="text-gray-300 leading-relaxed text-base">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Subtle border glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.1), transparent)',
                      filter: 'blur(1px)'
                    }}
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </SectionContainer>
  );
};

export default FaqSection;