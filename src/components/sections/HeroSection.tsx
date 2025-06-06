import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import { ArrowRight, Zap, TrendingUp, Shield } from 'lucide-react';
import ScrollReveal from '../animations/ScrollReveal';





const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate floating particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);

    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#121212]">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-[#121212] to-black/80" />
        
        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay
            }}
          />
        ))}
        
        {/* Pulsing energy rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-96 h-96 border border-orange-500/20 rounded-full" />
        </motion.div>
        
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <div className="w-64 h-64 border border-orange-400/30 rounded-full" />
        </motion.div>
        
        {/* Interactive mouse trail */}
        <motion.div
          className="absolute w-32 h-32 pointer-events-none z-10"
          animate={{
            x: mousePosition.x - 64,
            y: mousePosition.y - 64,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        >
          <div className="w-full h-full bg-gradient-radial from-orange-500/10 via-orange-400/5 to-transparent rounded-full blur-xl" />
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-20">
        <ScrollReveal type="fade" direction="up" threshold={0.5}>
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left side - Main content */}
            <motion.div
              className="text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
              variants={itemVariants}
            >
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-orange-300"
                animate={{
                  textShadow: [
                    "0 0 30px rgba(255, 106, 0, 0.5)",
                    "0 0 50px rgba(255, 106, 0, 0.8)",
                    "0 0 30px rgba(255, 106, 0, 0.5)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {t('home.hero.title')}
              </motion.span>
            </motion.h1>
            
            {/* Floating icons around title */}
            <motion.div
              className="absolute -top-8 -left-8 w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-500/30"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="text-orange-400" size={20} />
            </motion.div>
            
            <motion.div
              className="absolute -top-4 -right-12 w-10 h-10 bg-orange-500/15 rounded-full flex items-center justify-center border border-orange-500/25"
              animate={{
                rotate: [0, -360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 1 }}
            >
              <TrendingUp className="text-orange-300" size={16} />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 left-4 w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center border border-orange-500/20"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.15, 1]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
            >
              <Shield className="text-orange-200" size={14} />
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 relative"
              variants={itemVariants}
              whileHover={{
                color: "#ffffff",
                textShadow: "0 0 20px rgba(255, 106, 0, 0.3)"
              }}
            >
              {t('home.hero.subtitle')}
              
              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent rounded-lg -z-10"
                animate={{
                  opacity: [0, 0.3, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <Button 
                  variant="accent" 
                  size="lg" 
                  icon={<ArrowRight />}
                  iconPosition="right"
                  onClick={() => {
                    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative overflow-hidden group"
                >
                  <span className="relative z-10">{t('common.getStarted')}</span>
                  
                  {/* Button glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </Button>
                
                {/* Button surrounding glow */}
                <motion.div
                  className="absolute inset-0 bg-orange-500/20 rounded-lg blur-xl -z-10"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </motion.div>
            </motion.div>
            
            {/* Right side - Hero image */}
            <motion.div
              className="relative lg:block hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="relative">
                {/* Main image container */}
                <motion.div
                  className="relative z-10"
                  animate={{
                    y: [0, -10, 0]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <img
                    src="/images/image_2025-06-04_231413808.png"
                    alt="Trading Platform Visualization"
                    className="w-full h-auto max-w-md mx-auto rounded-2xl shadow-2xl"
                  />
                </motion.div>
                
                {/* Floating elements around image */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-orange-500/20 rounded-full border border-orange-500/30 flex items-center justify-center"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <TrendingUp className="text-orange-400" size={24} />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-orange-500/15 rounded-full border border-orange-500/25 flex items-center justify-center"
                  animate={{
                    rotate: [0, -360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1
                  }}
                >
                  <Zap className="text-orange-300" size={18} />
                </motion.div>
                
                {/* Glow effect behind image */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-orange-400/10 to-orange-300/20 rounded-2xl blur-2xl -z-10"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative"
        >
          <motion.a 
            href="#about" 
            className="flex flex-col items-center text-gray-300 hover:text-orange-400 transition-colors duration-300 group"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{
              textShadow: "0 0 15px rgba(255, 106, 0, 0.6)"
            }}
          >
            <motion.span 
              className="mb-2 text-sm"
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {t('common.learnMore')}
            </motion.span>
            
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="group-hover:drop-shadow-[0_0_10px_rgba(255,106,0,0.6)]"
              >
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
              
              {/* Glow ring around arrow */}
              <motion.div
                className="absolute inset-0 border border-orange-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;