import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionContainer from '../layout/SectionContainer';
import SectionTitle from '../ui/SectionTitle';
import { UserPlus, CheckCircle, Lock, LineChart, DollarSign, ArrowRight, Sparkles } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';

const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      title: t('howItWorks.steps.step1.title'),
      content: t('howItWorks.steps.step1.content'),
      icon: <UserPlus size={28} />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-400/30',
      glowColor: 'shadow-blue-500/20'
    },
    {
      title: t('howItWorks.steps.step2.title'),
      content: t('howItWorks.steps.step2.content'),
      icon: <CheckCircle size={28} />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-400/30',
      glowColor: 'shadow-green-500/20'
    },
    {
      title: t('howItWorks.steps.step3.title'),
      content: t('howItWorks.steps.step3.content'),
      icon: <Lock size={28} />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-400/30',
      glowColor: 'shadow-orange-500/20'
    },
    {
      title: t('howItWorks.steps.step4.title'),
      content: t('howItWorks.steps.step4.content'),
      icon: <LineChart size={28} />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-400/30',
      glowColor: 'shadow-purple-500/20'
    },
    {
      title: t('howItWorks.steps.step5.title'),
      content: t('howItWorks.steps.step5.content'),
      icon: <DollarSign size={28} />,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-400/30',
      glowColor: 'shadow-yellow-500/20'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8
      }
    },
  };

  return (
    <SectionContainer id="how-it-works" className="py-20 relative">
      {/* Horizontal Lines from both sides */}
      <div className="absolute inset-0 overflow-visible">
        {[15, 30, 50, 70, 85].map((topPosition, index) => (
           <div key={`line-${index}`} className="absolute w-full" style={{ top: `${topPosition}%` }}>
               {/* Left line */}
               <motion.div 
                 className="absolute left-0 bg-orange-500 shadow-lg shadow-orange-500/50" 
                 style={{ width: '300px', height: '6.5px', transformOrigin: 'left', boxShadow: '0 0 10px rgba(249, 115, 22, 0.8)' }}
                 initial={{ scaleX: 0, opacity: 0 }}
                 whileInView={{ scaleX: 1, opacity: 1 }}
                 transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
               />
               {/* Right line */}
               <motion.div 
                 className="absolute right-0 bg-orange-500 shadow-lg shadow-orange-500/50" 
                 style={{ width: '300px', height: '6.5px', transformOrigin: 'right', boxShadow: '0 0 10px rgba(249, 115, 22, 0.8)' }}
                 initial={{ scaleX: 0, opacity: 0 }}
                 whileInView={{ scaleX: 1, opacity: 1 }}
                 transition={{ duration: 1.2, delay: index * 0.2 + 0.1, ease: "easeOut" }}
               />
           </div>
         ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
            >
              <Sparkles size={16} />
              Процес на регистрация
            </motion.div>
            <SectionTitle
              title={t('howItWorks.title')}
              className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              {t('howItWorks.subtitle')}
            </motion.p>
          </div>
        </ScrollReveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative"
        >
          {/* Modern grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative group"
              >
                {/* Step number badge */}
                <motion.div
                  className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-lg z-20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {index + 1}
                </motion.div>

                {/* Flip Card Container */}
                <motion.div
                  className="perspective-1000 h-80 w-full"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <motion.div
                    className="relative w-full h-full preserve-3d transition-transform duration-700 group-hover:rotateY-180"
                  >
                    {/* Front of card */}
                    <div className={`absolute inset-0 backface-hidden ${step.bgColor} ${step.borderColor} border-2 rounded-3xl shadow-xl ${step.glowColor} shadow-2xl p-8 backdrop-blur-sm`}>
                      <motion.div
                        className="h-full flex flex-col items-center justify-center text-center relative"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {/* Floating particles effect */}
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                          }}
                          transition={{
                            duration: 15,
                            repeat: Infinity,
                            repeatType: 'reverse',
                          }}
                          style={{
                            backgroundImage: `radial-gradient(circle, ${step.color.includes('blue') ? '#3b82f6' : step.color.includes('green') ? '#10b981' : step.color.includes('orange') ? '#f97316' : step.color.includes('purple') ? '#8b5cf6' : '#eab308'} 1px, transparent 1px)`,
                            backgroundSize: '30px 30px',
                          }}
                        />
                        
                        <motion.div
                          className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center text-white mb-6 shadow-lg relative z-10`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.8, type: "spring" }}
                        >
                          {step.icon}
                          <motion.div
                            className="absolute inset-0 bg-white/20 rounded-3xl"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        </motion.div>
                        
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-inter relative z-10">
                          {step.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm font-medium relative z-10">
                          {step.content}
                        </p>
                        
                        {/* Hover indicator */}
                        <motion.div
                          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: 10 }}
                          whileHover={{ x: 0 }}
                        >
                          <ArrowRight size={20} className="text-gray-500 dark:text-gray-400" />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Back of card */}
                    <div className={`absolute inset-0 backface-hidden rotateY-180 bg-gradient-to-br ${step.color} rounded-3xl shadow-xl p-8 relative overflow-hidden`}>
                      <motion.div
                        className="h-full flex flex-col items-center justify-center text-center relative z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        {/* Animated background pattern */}
                        <motion.div
                          className="absolute inset-0 opacity-20"
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{
                            backgroundImage: 'conic-gradient(from 0deg, transparent, white, transparent)',
                            backgroundSize: '100px 100px',
                          }}
                        />
                        
                        <motion.div
                          className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-6 backdrop-blur-sm"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {step.icon}
                        </motion.div>
                        
                        <h3 className="text-xl font-bold text-white mb-4 font-inter">
                          {t('howItWorks.steps.step1.title')}
                        </h3>
                        <p className="text-white/90 leading-relaxed text-sm font-medium">
                          {t('howItWorks.steps.step1.content')}
                        </p>
                        
                        {/* Decorative elements */}
                        <motion.div
                          className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.div
                          className="absolute bottom-4 left-4 w-1 h-1 bg-white/40 rounded-full"
                          animate={{ scale: [1, 2, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          

        </motion.div>
      </div>
    </SectionContainer>
  );
};

export default HowItWorksSection;