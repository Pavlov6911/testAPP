import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionContainer from '../layout/SectionContainer';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import { Shield, TrendingUp, Users, BarChart4, Percent, Lock, Headphones, Cpu, Award, Zap, Globe, Target, Layers, Sparkles, Rocket } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';


const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      key: 'whoWeAre',
      title: t('about.whoWeAre.title'),
      content: t('about.whoWeAre.content'),
      icon: <Users size={36} />,
      color: 'blue',
      description: t('about.features.whoWeAre.description')
    },
    {
      key: 'approach',
      title: t('about.approach.title'),
      content: t('about.approach.content'),
      icon: <TrendingUp size={36} />,
      color: 'orange',
      description: t('about.features.approach.description')
    },
    {
      key: 'partnership',
      title: t('about.partnership.title'),
      content: t('about.partnership.content'),
      icon: <BarChart4 size={36} />,
      color: 'orange',
      description: t('about.features.partnership.description')
    },
    {
      key: 'profitSharing',
      title: t('about.profitSharing.title'),
      content: t('about.profitSharing.content'),
      icon: <Percent size={36} />,
      color: 'green',
      description: t('about.features.profitSharing.description')
    },
    {
      key: 'transparency',
      title: t('about.transparency.title'),
      content: t('about.transparency.content'),
      icon: <Shield size={36} />,
      color: 'cyan',
      description: t('about.features.transparency.description')
    },
    {
      key: 'security',
      title: t('about.features.security.title'),
      content: t('about.features.security.description'),
      icon: <Lock size={36} />,
      color: 'red',
      description: t('about.features.security.description')
    },
    {
      key: 'expertise',
      title: t('about.features.expertise.title'),
      content: t('about.features.expertise.description'),
      icon: <Award size={36} />,
      color: 'purple',
      description: t('about.features.expertise.description')
    },
    {
      key: 'support',
      title: t('about.features.support.title'),
      content: t('about.features.support.description'),
      icon: <Headphones size={36} />,
      color: 'indigo',
      description: t('about.features.support.description')
    },
    {
      key: 'technology',
      title: t('about.features.technology.title'),
      content: t('about.features.technology.description'),
      icon: <Cpu size={36} />,
      color: 'emerald',
      description: t('about.features.technology.description')
    },
    {
      key: 'innovation',
      title: t('about.features.innovation.title'),
      content: t('about.features.innovation.description'),
      icon: <Rocket size={36} />,
      color: 'orange',
      description: t('about.features.innovation.description')
    },
    {
      key: 'globalReach',
      title: t('about.features.globalReach.title'),
      content: t('about.features.globalReach.description'),
      icon: <Globe size={36} />,
      color: 'blue',
      description: t('about.features.globalReach.description')
    },
    {
      key: 'precisionTrading',
      title: t('about.features.precisionTrading.title'),
      content: t('about.features.precisionTrading.description'),
      icon: <Target size={36} />,
      color: 'green',
      description: t('about.features.precisionTrading.description')
    }
  ];

  const handleFeatureClick = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSelectedFeature(index);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <SectionContainer id="about" className="relative overflow-hidden bg-[#121212]">
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-orange-500/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Interactive Mouse Trail */}
      <motion.div
        className="fixed w-6 h-6 bg-orange-500/20 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
      />

      <div className="relative z-10">
        <ScrollReveal type="fade" direction="up">
          <SectionTitle 
            title={t('about.title')} 
            subtitle={t('home.about.content')}
          />
        </ScrollReveal>
        
        {/* Central Display Area */}
        <ScrollReveal type="fade" direction="up" delay={0.2}>
          <motion.div 
            className="mb-16 mx-auto max-w-4xl"
            layout
          >
            <motion.div 
              className="relative h-80 md:h-96 rounded-3xl bg-black border border-orange-500/30 shadow-2xl overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(255, 106, 0, 0.25)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background with orange theme */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-orange-500/15 to-orange-400/10"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(255, 106, 0, 0.1), rgba(255, 140, 0, 0.15), rgba(255, 165, 0, 0.1))",
                    "linear-gradient(135deg, rgba(255, 140, 0, 0.15), rgba(255, 165, 0, 0.1), rgba(255, 106, 0, 0.1))",
                    "linear-gradient(225deg, rgba(255, 165, 0, 0.1), rgba(255, 106, 0, 0.1), rgba(255, 140, 0, 0.15))"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Pulsing energy rings */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  rotate: [0, 360]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="w-32 h-32 border border-orange-500/20 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute w-48 h-48 border border-orange-400/15 rounded-full"
                  animate={{
                    scale: [1.2, 0.8, 1.2],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </motion.div>
              
              {/* Content Display */}
              <div className="relative z-10 h-full flex items-center justify-center p-8">
                <AnimatePresence mode="wait">
                  {selectedFeature !== null ? (
                    <motion.div
                      key={selectedFeature}
                      initial={{ 
                        scale: 0.3, 
                        rotateX: -90, 
                        opacity: 0,
                        y: 100
                      }}
                      animate={{ 
                        scale: 1, 
                        rotateX: 0, 
                        opacity: 1,
                        y: 0
                      }}
                      exit={{ 
                        scale: 0.8, 
                        rotateX: 90, 
                        opacity: 0,
                        y: -50
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20,
                        duration: 0.8
                      }}
                      className="text-center"
                    >
                      <motion.div 
                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-orange-500/20 border-2 border-orange-500/40 flex items-center justify-center relative overflow-hidden"
                        animate={{ 
                          rotateY: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          rotateY: { duration: 1, ease: "easeInOut" },
                          scale: { duration: 0.6, ease: "easeOut" }
                        }}
                      >
                        {/* Glowing effect */}
                        <motion.div
                          className="absolute inset-0 bg-orange-500/10 rounded-full"
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          {features[selectedFeature].icon}
                        </motion.div>
                      </motion.div>
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-4"
                        animate={{ y: [20, 0] }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {features[selectedFeature].title}
                      </motion.h3>
                      <motion.p 
                        className="text-white text-lg leading-relaxed"
                        animate={{ y: [20, 0] }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        {features[selectedFeature].description}
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center"
                    >
                      <motion.div 
                        className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-400/20 flex items-center justify-center border border-orange-500/30"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        <Sparkles size={32} className="text-orange-400" />
                      </motion.div>
                      <motion.h3 
                        className="text-xl font-semibold text-white mb-2"
                        animate={{
                          textShadow: [
                            "0 0 10px rgba(255, 106, 0, 0.3)",
                            "0 0 20px rgba(255, 106, 0, 0.5)",
                            "0 0 10px rgba(255, 106, 0, 0.3)"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        Discover SafeTrade Excellence
                      </motion.h3>
                      <p className="text-gray-300">{t('about.clickFeature')}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Slap effect overlay */}
              <AnimatePresence>
                {isAnimating && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.5, 1], 
                      opacity: [0, 0.3, 0],
                      rotate: [0, 180, 360]
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-orange-600/25 to-orange-500/20 rounded-3xl"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal type="fade" direction="up" delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="cursor-pointer"
                onClick={() => handleFeatureClick(index)}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                {/* Feature Card */}
                <motion.div 
                  className={`relative h-56 md:h-64 bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-2xl border overflow-hidden group transition-all duration-300 ${
                    selectedFeature === index 
                      ? 'ring-2 ring-orange-500/50 bg-black/90 border-orange-500/50 shadow-lg shadow-orange-500/25'
                      : 'hover:bg-black/90 hover:border-orange-500/30 border-gray-600/30'
                  }`}
                  whileHover={{
                    boxShadow: "0 20px 40px -12px rgba(255, 106, 0, 0.3)",
                    borderColor: "rgba(255, 106, 0, 0.5)"
                  }}
                >
                  {/* Background Animation */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-orange-600/10 to-orange-500/5"
                    animate={{
                      background: [
                        "linear-gradient(45deg, rgba(255, 106, 0, 0.05), rgba(255, 106, 0, 0.1), rgba(255, 106, 0, 0.05))",
                        "linear-gradient(135deg, rgba(255, 106, 0, 0.1), rgba(255, 106, 0, 0.05), rgba(255, 106, 0, 0.1))",
                        "linear-gradient(225deg, rgba(255, 106, 0, 0.05), rgba(255, 106, 0, 0.1), rgba(255, 106, 0, 0.05))"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: "linear-gradient(45deg, transparent, rgba(255, 106, 0, 0.1), transparent)"
                    }}
                    animate={{
                      rotate: [0, 360]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* Floating orbs */}
                  <motion.div
                    className="absolute top-4 right-4 w-3 h-3 bg-orange-400/60 rounded-full"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-2 h-2 bg-orange-300/40 rounded-full"
                    animate={{
                      y: [0, 8, 0],
                      opacity: [0.4, 0.8, 0.4],
                      scale: [0.8, 1.1, 0.8]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  />
                  
                  {/* Content */}
                  <div className="relative z-20 p-6 md:p-8 h-full flex flex-col justify-center text-center">
                    <motion.div 
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30 relative overflow-hidden"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                      whileInView={{
                        rotateY: [0, 360],
                        scale: [1, 1.1, 1],
                        transition: {
                          rotateY: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                          scale: { duration: 0.6, ease: "easeOut" }
                        }
                      }}
                      viewport={{ once: true, amount: 0.5 }}
                    >
                      {/* Icon glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-orange-500/10 rounded-full"
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 }}
                      />
                      <motion.div
                        className="relative z-10 text-orange-400"
                        animate={{
                          filter: [
                            "drop-shadow(0 0 5px rgba(255, 106, 0, 0.5))",
                            "drop-shadow(0 0 15px rgba(255, 106, 0, 0.8))",
                            "drop-shadow(0 0 5px rgba(255, 106, 0, 0.5))"
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {feature.icon}
                      </motion.div>
                    </motion.div>
                    <motion.h4 
                      className="text-lg font-semibold text-white mb-3"
                      whileHover={{
                        color: "#ff6a00",
                        textShadow: "0 0 10px rgba(255, 106, 0, 0.5)"
                      }}
                    >
                      {feature.title}
                    </motion.h4>
                    <motion.p 
                      className="text-sm text-gray-300 leading-relaxed"
                      whileHover={{ color: "#e5e7eb" }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>
                  
                  {/* Enhanced click indicator */}
                  <motion.div 
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30 backdrop-blur-sm"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                      boxShadow: [
                        "0 0 10px rgba(255, 106, 0, 0.3)",
                        "0 0 20px rgba(255, 106, 0, 0.6)",
                        "0 0 10px rgba(255, 106, 0, 0.3)"
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                    whileHover={{
                      scale: 1.3,
                      backgroundColor: "rgba(255, 106, 0, 0.3)"
                    }}
                  >
                    <motion.div 
                      className="w-2 h-2 rounded-full bg-orange-400"
                      animate={{ 
                        scale: [0.8, 1.2, 0.8],
                        boxShadow: [
                          "0 0 5px rgba(255, 106, 0, 0.8)",
                          "0 0 15px rgba(255, 106, 0, 1)",
                          "0 0 5px rgba(255, 106, 0, 0.8)"
                        ]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                    />
                  </motion.div>
                  
                  {/* Hover overlay effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
        
        {/* Additional Information Section */}
        <ScrollReveal type="fade" direction="up" delay={0.6}>
          <motion.div 
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Section Title */}
            <motion.div 
              className="col-span-full text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255, 106, 0, 0.3)",
                    "0 0 30px rgba(255, 106, 0, 0.5)",
                    "0 0 20px rgba(255, 106, 0, 0.3)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {t('about.whyChoose.title')}
              </motion.h2>
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-400 mx-auto rounded-full"
                animate={{
                  scaleX: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-orange-400/30 relative overflow-hidden min-h-[320px] group"
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(255, 106, 0, 0.4)",
                borderColor: "rgba(255, 106, 0, 0.6)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background elements */}
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-24 h-24 bg-orange-400/5 rounded-full blur-xl"
                animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              {/* Floating particles */}
              <motion.div
                className="absolute top-6 left-6 w-2 h-2 bg-orange-400/60 rounded-full"
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-12 right-8 w-1.5 h-1.5 bg-orange-300/40 rounded-full"
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 border border-orange-500/30"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Shield className="text-orange-400" size={24} />
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold text-orange-400 mb-4"
                  whileHover={{
                    textShadow: "0 0 15px rgba(255, 106, 0, 0.8)"
                  }}
                >
                  {t('about.additionalInfo.riskManagement.title')}
                </motion.h3>
                <motion.p 
                  className="text-gray-300 leading-relaxed"
                  whileHover={{ color: "#e5e7eb" }}
                >
                  {t('about.additionalInfo.riskManagement.content')}
                </motion.p>
              </div>
              
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
              />
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-orange-400/30 relative overflow-hidden min-h-[320px] group"
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(255, 106, 0, 0.4)",
                borderColor: "rgba(255, 106, 0, 0.6)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background elements */}
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-28 h-28 bg-orange-400/5 rounded-full blur-xl"
                animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
              
              {/* Floating particles */}
              <motion.div
                className="absolute top-8 right-6 w-2 h-2 bg-orange-400/60 rounded-full"
                animate={{
                  y: [0, -12, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-8 right-12 w-1.5 h-1.5 bg-orange-300/40 rounded-full"
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 border border-orange-500/30"
                  animate={{
                    rotate: [0, -360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <TrendingUp className="text-orange-400" size={24} />
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold text-orange-400 mb-4"
                  whileHover={{
                    textShadow: "0 0 15px rgba(255, 106, 0, 0.8)"
                  }}
                >
                  {t('about.additionalInfo.trackRecord.title')}
                </motion.h3>
                <motion.p 
                  className="text-gray-300 leading-relaxed"
                  whileHover={{ color: "#e5e7eb" }}
                >
                  {t('about.additionalInfo.trackRecord.content')}
                </motion.p>
              </div>
              
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
              />
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-black/90 to-gray-900/90 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-orange-400/30 relative overflow-hidden min-h-[320px] group"
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(255, 106, 0, 0.4)",
                borderColor: "rgba(255, 106, 0, 0.6)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background elements */}
              <motion.div 
                className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
              />
              <motion.div 
                className="absolute bottom-0 left-0 w-26 h-26 bg-orange-400/5 rounded-full blur-xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              />
              
              {/* Floating particles */}
              <motion.div
                className="absolute top-10 left-8 w-2 h-2 bg-orange-400/60 rounded-full"
                animate={{
                  y: [0, -14, 0],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div
                className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-orange-300/40 rounded-full"
                animate={{
                  y: [0, -9, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              />
              
              <div className="relative z-10">
                <motion.div
                  className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 border border-orange-500/30"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  <Award className="text-orange-400" size={24} />
                </motion.div>
                <motion.h3 
                  className="text-2xl font-bold text-orange-400 mb-4"
                  whileHover={{
                    textShadow: "0 0 15px rgba(255, 106, 0, 0.8)"
                  }}
                >
                  {t('about.additionalInfo.compliance.title')}
                </motion.h3>
                <motion.p 
                  className="text-gray-300 leading-relaxed"
                  whileHover={{ color: "#e5e7eb" }}
                >
                  {t('about.additionalInfo.compliance.content')}
                </motion.p>
              </div>
              
              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
              />
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;