
import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      {/* Logo and Title */}
      <div className="mb-8 animate-bounce">
        <div className="text-8xl mb-4">🌟</div>
        <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg mb-2">
          Kidz Learn
        </h1>
        <p className="text-2xl md:text-3xl text-yellow-200 font-semibold">
          Fun Learning for Little Minds!
        </p>
      </div>

      {/* Mascot Characters */}
      <div className="flex space-x-4 mb-8 text-6xl">
        <div className="animate-bounce">🐻</div>
        <div className="animate-pulse">🦊</div>
        <div className="animate-bounce">🐰</div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-3xl md:text-4xl font-bold py-6 px-12 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse hover:animate-none"
      >
        🚀 Start Learning! 🚀
      </button>

      {/* Age indicator */}
      <p className="mt-6 text-xl text-white bg-purple-500 bg-opacity-50 px-6 py-3 rounded-full">
        Perfect for ages 1-6!
      </p>
    </div>
  );
};

export default WelcomeScreen;
