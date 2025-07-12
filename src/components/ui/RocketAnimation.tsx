
import React, { useEffect, useState } from 'react';
import { Rocket } from 'lucide-react';

interface RocketAnimationProps {
  show: boolean;
  onComplete: () => void;
}

const RocketAnimation: React.FC<RocketAnimationProps> = ({ show, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      // Play rocket sound
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Create rocket whoosh sound
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.5);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
      } catch (error) {
        console.log('Audio not supported');
      }

      // Hide after animation completes
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <>
      <style>
        {`
          @keyframes rocket-fly {
            0% {
              left: -60px;
              transform: translateY(-50%) rotate(45deg);
            }
            50% {
              transform: translateY(-50%) rotate(45deg) scale(1.2);
            }
            100% {
              left: calc(100vw + 60px);
              transform: translateY(-50%) rotate(45deg);
            }
          }
          
          @keyframes rocket-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .rocket-container {
            position: absolute;
            left: -60px;
            top: 50%;
            transform: translateY(-50%);
            animation: rocket-fly 3s ease-in-out forwards;
          }
          
          .rocket-animation {
            animation: rocket-spin 0.5s linear infinite;
            filter: drop-shadow(0 0 10px #fbbf24);
          }
        `}
      </style>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="rocket-container">
          <Rocket 
            size={48} 
            className="text-yellow-400 rocket-animation"
          />
        </div>
      </div>
    </>
  );
};

export default RocketAnimation;
