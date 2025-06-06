import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  animationData?: any;
  animationPath?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  style?: React.CSSProperties;
  onComplete?: () => void;
  onClick?: () => void;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  animationPath,
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
  style,
  onComplete,
  onClick,
}) => {
  const [loadedAnimationData, setLoadedAnimationData] = useState<any>(animationData);
  
  useEffect(() => {
    // If animationPath is provided, fetch the animation data
    if (animationPath && !animationData) {
      fetch(animationPath)
        .then(response => response.json())
        .then(data => setLoadedAnimationData(data))
        .catch(error => console.error('Error loading animation:', error));
    }
  }, [animationPath, animationData]);
  return (
    <div 
      className={className} 
      style={style}
      onClick={onClick}
    >
      {loadedAnimationData ? (
        <Lottie
          animationData={loadedAnimationData}
          loop={loop}
          autoplay={autoplay}
          onComplete={onComplete}
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full text-white">
          Loading animation...
        </div>
      )}
    </div>
  );
};

export default LottieAnimation;