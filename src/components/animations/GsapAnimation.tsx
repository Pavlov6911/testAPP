import React, { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'stagger' | 'timeline' | 'parallax';
type AnimationDirection = 'up' | 'down' | 'left' | 'right';

interface GsapAnimationProps {
  children: ReactNode;
  className?: string;
  type?: AnimationType;
  direction?: AnimationDirection;
  duration?: number;
  delay?: number;
  ease?: string;
  scrollTrigger?: boolean;
  start?: string;
  markers?: boolean;
  scrub?: boolean | number;
  pin?: boolean;
  staggerAmount?: number;
  staggerFrom?: 'start' | 'end' | 'center' | 'edges';
  childrenSelector?: string;
  customAnimation?: (element: HTMLElement, timeline: gsap.core.Timeline) => void;
}

const GsapAnimation: React.FC<GsapAnimationProps> = ({
  children,
  className = '',
  type = 'fade',
  direction = 'up',
  duration = 1,
  delay = 0,
  ease = 'power2.out',
  scrollTrigger = true,
  start = 'top 80%',
  markers = false,
  scrub = false,
  pin = false,
  staggerAmount = 0.2,
  staggerFrom = 'start',
  childrenSelector = '> *',
  customAnimation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const element = containerRef.current;
    let timeline = gsap.timeline({
      paused: !scrollTrigger,
      delay,
      defaults: { duration, ease },
      scrollTrigger: scrollTrigger ? {
        trigger: element,
        start,
        markers,
        scrub: typeof scrub === 'number' ? scrub : scrub ? 1 : false,
        pin: pin ? element : false,
      } : undefined,
    });
    
    // If custom animation is provided, use it
    if (customAnimation) {
      customAnimation(element, timeline);
      return;
    }
    
    // Default animations based on type
    switch (type) {
      case 'fade':
        timeline.fromTo(element, { opacity: 0 }, { opacity: 1 });
        break;
        
      case 'slide':
        const slideProps: any = { opacity: 0 };
        const slideValues: any = { opacity: 1 };
        
        switch (direction) {
          case 'up':
            slideProps.y = 100;
            slideValues.y = 0;
            break;
          case 'down':
            slideProps.y = -100;
            slideValues.y = 0;
            break;
          case 'left':
            slideProps.x = 100;
            slideValues.x = 0;
            break;
          case 'right':
            slideProps.x = -100;
            slideValues.x = 0;
            break;
        }
        
        timeline.fromTo(element, slideProps, slideValues);
        break;
        
      case 'scale':
        timeline.fromTo(element, 
          { opacity: 0, scale: 0.5 }, 
          { opacity: 1, scale: 1 }
        );
        break;
        
      case 'rotate':
        timeline.fromTo(element, 
          { opacity: 0, rotation: direction === 'left' ? -90 : 90 }, 
          { opacity: 1, rotation: 0 }
        );
        break;
        
      case 'stagger':
        const children = element.querySelectorAll(childrenSelector);
        
        // Different stagger patterns
        let staggerConfig: any = { amount: staggerAmount };
        
        if (staggerFrom === 'end') {
          staggerConfig.from = 'end';
        } else if (staggerFrom === 'center') {
          staggerConfig.from = 'center';
        } else if (staggerFrom === 'edges') {
          staggerConfig.from = 'edges';
        }
        
        timeline.fromTo(children, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, stagger: staggerConfig }
        );
        break;
        
      case 'parallax':
        // Create parallax effect on scroll
        if (scrollTrigger) {
          gsap.fromTo(element, 
            { y: 0 }, 
            {
              y: -100, // Move opposite to scroll direction
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }
        break;
        
      case 'timeline':
        // For timeline, we don't do anything here as it's expected to be handled by customAnimation
        break;
    }
    
    // If not scroll triggered, play the animation immediately
    if (!scrollTrigger) {
      timeline.play();
    }
    
    // Cleanup
    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
      timeline.kill();
    };
  }, [type, direction, duration, delay, ease, scrollTrigger, start, markers, scrub, pin, staggerAmount, staggerFrom, childrenSelector, customAnimation]);
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default GsapAnimation;