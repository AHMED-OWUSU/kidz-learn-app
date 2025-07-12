
import React from 'react';

const FloatingAnimations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating Clouds */}
      <div className="absolute top-10 left-10 w-16 h-10 bg-white rounded-full opacity-70 animate-pulse">
        <div className="absolute top-2 left-2 w-8 h-6 bg-white rounded-full"></div>
        <div className="absolute top-1 right-2 w-6 h-4 bg-white rounded-full"></div>
      </div>
      
      <div className="absolute top-20 right-20 w-20 h-12 bg-white rounded-full opacity-60 animate-bounce">
        <div className="absolute top-2 left-3 w-10 h-8 bg-white rounded-full"></div>
        <div className="absolute top-1 right-3 w-8 h-6 bg-white rounded-full"></div>
      </div>

      {/* Floating Stars */}
      <div className="absolute top-32 left-1/4 text-yellow-300 text-2xl animate-spin">⭐</div>
      <div className="absolute top-48 right-1/3 text-yellow-400 text-xl animate-pulse">⭐</div>
      <div className="absolute bottom-32 left-1/3 text-yellow-300 text-lg animate-bounce">⭐</div>

      {/* Floating Balloons */}
      <div className="absolute top-16 left-1/2 text-4xl animate-bounce">🎈</div>
      <div className="absolute top-40 right-10 text-3xl animate-pulse">🎈</div>
      <div className="absolute bottom-20 right-1/4 text-2xl animate-bounce">🎈</div>

      {/* Floating Hearts */}
      <div className="absolute top-24 right-1/2 text-pink-400 text-xl animate-pulse">💝</div>
      <div className="absolute bottom-40 left-20 text-red-400 text-lg animate-bounce">❤️</div>
    </div>
  );
};

export default FloatingAnimations;
