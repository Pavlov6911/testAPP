import React, { useCallback, useEffect, useState } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

interface ParticlesBackgroundProps {
  className?: string;
  variant?: 'default' | 'connections' | 'bubbles' | 'stars';
  color?: string;
}

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  className = '',
  variant = 'default',
  color = '#F97316', // Default to accent color
}) => {
  // Add state to track if component is mounted and browser is ready
  const [isMounted, setIsMounted] = useState(false);
  
  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined';
  
  // Use effect to set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  const particlesInit = useCallback(async (engine: any) => {
    try {
      await loadSlim(engine);
    } catch (error) {
      console.error('Error initializing particles:', error);
    }
  }, []);

  const getConfig = () => {
    switch (variant) {
      case 'connections':
        return {
          particles: {
            number: {
              value: 120,
              density: {
                enable: true,
                value_area: 600,
              },
            },
            color: {
              value: [color, '#3B82F6', '#8B5CF6', '#06B6D4'],
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
            },
            opacity: {
              value: 0.8,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                opacity_min: 0.3,
                sync: false,
              },
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: true,
                speed: 3,
                size_min: 0.5,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 180,
              color: color,
              opacity: 0.6,
              width: 1.5,
            },
            move: {
              enable: true,
              speed: 8,
              direction: 'none' as const,
              random: true,
              straight: false,
              out_mode: 'bounce' as const,
              bounce: true,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'canvas' as const,
            events: {
              onhover: {
                enable: true,
                mode: 'grab',
              },
              onclick: {
                enable: true,
                mode: 'push',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1,
                },
              },
              push: {
                particles_nb: 4,
              },
            },
          },
          retina_detect: true,
        };
      case 'bubbles':
        return {
          particles: {
            number: {
              value: 40,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: [color, '#3B82F6', '#8B5CF6', '#06B6D4'],
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
            },
            opacity: {
              value: 0.6,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 10,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 1,
              direction: 'none' as const,
              random: true,
              straight: false,
              out_mode: 'out' as const,
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'canvas' as const,
            events: {
              onhover: {
                enable: true,
                mode: 'bubble',
              },
              onclick: {
                enable: true,
                mode: 'repulse',
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 250,
                size: 12,
                duration: 2,
                opacity: 0.8,
                speed: 3,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          retina_detect: true,
        };
      case 'stars':
        return {
          particles: {
            number: {
              value: 160,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: [color, '#3B82F6', '#8B5CF6', '#06B6D4'],
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: false,
                speed: 4,
                size_min: 0.3,
                sync: false,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 1,
              direction: 'none' as const,
              random: true,
              straight: false,
              out_mode: 'out' as const,
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'canvas' as const,
            events: {
              onhover: {
                enable: true,
                mode: 'repulse',
              },
              onclick: {
                enable: true,
                mode: 'push',
              },
              resize: true,
            },
            modes: {
              repulse: {
                distance: 100,
                duration: 0.4,
              },
              push: {
                particles_nb: 4,
              },
            },
          },
          retina_detect: true,
        };
      default:
        return {
          particles: {
            number: {
              value: 120,
              density: {
                enable: true,
                value_area: 600,
              },
            },
            color: {
              value: [color, '#3B82F6', '#8B5CF6', '#06B6D4'],
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000',
              },
            },
            opacity: {
              value: 0.4,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false,
              },
            },
            size: {
              value: 4,
              random: true,
              anim: {
                enable: true,
                speed: 3,
                size_min: 0.5,
                sync: false,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: color,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 8,
              direction: 'none' as const,
              random: true,
              straight: false,
              out_mode: 'bounce' as const,
              bounce: true,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detect_on: 'canvas' as const,
            events: {
              onhover: {
                enable: true,
                mode: 'grab',
              },
              onclick: {
                enable: true,
                mode: 'push',
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                line_linked: {
                  opacity: 1,
                },
              },
              push: {
                particles_nb: 4,
              },
            },
          },
          retina_detect: true,
        };
    }
  };

  // Don't render if not in browser or component not mounted
  if (!isBrowser || !isMounted) {
    return null;
  }

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Particles
        id={`tsparticles-${variant}`} // Use unique ID for each instance
        init={particlesInit}
        options={getConfig()}
        className="h-full w-full"
      />
    </div>
  );
};

export default ParticlesBackground;