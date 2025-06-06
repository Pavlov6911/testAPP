import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GradientBackgroundProps {
  className?: string;
  variant?: 'radial' | 'linear' | 'conic' | 'mesh';
  colors?: string[];
  animate?: boolean;
  speed?: number;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  className = '',
  variant = 'radial',
  colors = ['#6B46C1', '#3B82F6', '#F97316', '#8B5CF6', '#06B6D4'],
  animate = true,
  speed = 10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Mesh gradient implementation
  useEffect(() => {
    if (variant !== 'mesh' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let time = 0;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create color stops from provided colors
    const colorStops = colors.map((color, i) => {
      return { color, stop: i / (colors.length - 1) };
    });
    
    // Animation loop
    const render = () => {
      if (!ctx) return;
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Create mesh of circles with gradients
      const circleSize = Math.max(width, height) / 6;
      const cols = Math.ceil(width / circleSize) + 3;
      const rows = Math.ceil(height / circleSize) + 3;
      
      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = (i * circleSize) + (Math.sin((j * 0.8) + time) * circleSize * 0.5);
          const y = (j * circleSize) + (Math.cos((i * 0.8) + time) * circleSize * 0.5);
          
          const gradient = ctx.createRadialGradient(
            x, y, 0,
            x, y, circleSize * 1.2
          );
          
          const colorIndex = (i + j) % colors.length;
          const color = colors[colorIndex] || '#6B46C1'; // Fallback color
          
          gradient.addColorStop(0, color + 'AA');
          gradient.addColorStop(0.5, color + '60');
          gradient.addColorStop(1, color + '00');
          
          ctx.globalCompositeOperation = 'screen';
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, circleSize * 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      if (animate) {
        time += 0.005 * speed;
        animationFrameId = requestAnimationFrame(render);
      }
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant, colors, animate, speed]);
  
  // For CSS gradients (radial, linear, conic)
  const getCssGradient = () => {
    const colorStops = colors.map((color, i) => {
      return `${color} ${(i / (colors.length - 1)) * 100}%`;
    }).join(', ');
    
    switch (variant) {
      case 'radial':
        return `radial-gradient(circle, ${colorStops})`;
      case 'conic':
        return `conic-gradient(from 0deg, ${colorStops})`;
      case 'linear':
      default:
        return `linear-gradient(45deg, ${colorStops})`;
    }
  };
  
  const animationVariants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 20 / speed,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
    static: {
      backgroundPosition: '0% 0%',
    },
  };
  
  return variant === 'mesh' ? (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: 0.9 }}
    />
  ) : (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        background: getCssGradient(),
        backgroundSize: '200% 200%',
        opacity: 0.8,
      }}
      initial="static"
      animate={animate ? 'animate' : 'static'}
      variants={animationVariants}
    />
  );
};

export default GradientBackground;