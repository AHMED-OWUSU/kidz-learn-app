
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface PhonicsLevelSelectorProps {
  onBack: () => void;
  onSelectLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;
}

const PhonicsLevelSelector: React.FC<PhonicsLevelSelectorProps> = ({ onBack, onSelectLevel }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-24 left-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
          Choose Your Phonics Level
        </h1>
        <p className="text-xl text-white drop-shadow-md">What sounds do you want to learn?</p>
        <div className="text-4xl mb-4">🔤</div>
      </div>

      {/* Level Selection Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Beginner Level */}
        <button
          onClick={() => onSelectLevel('beginner')}
          className="bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[250px]"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🌱</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Beginner</h2>
            <p className="text-xl mb-4">Basic Letter Sounds</p>
            <p className="text-lg opacity-90">Learn the sounds each letter makes!</p>
            <div className="flex justify-center space-x-2 mt-4 text-2xl">
              <span>/a/</span>
              <span>/b/</span>
              <span>/c/</span>
            </div>
          </div>
        </button>

        {/* Intermediate Level */}
        <button
          onClick={() => onSelectLevel('intermediate')}
          className="bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[250px]"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Intermediate</h2>
            <p className="text-xl mb-4">Blends & Digraphs</p>
            <p className="text-lg opacity-90">Two letters working together!</p>
            <div className="flex justify-center space-x-2 mt-4 text-2xl">
              <span>/ch/</span>
              <span>/sh/</span>
              <span>/th/</span>
            </div>
          </div>
        </button>

        {/* Advanced Level */}
        <button
          onClick={() => onSelectLevel('advanced')}
          className="bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[250px]"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Advanced</h2>
            <p className="text-xl mb-4">Complex Sounds</p>
            <p className="text-lg opacity-90">Master tricky pronunciations!</p>
            <div className="flex justify-center space-x-2 mt-4 text-2xl">
              <span>/ough/</span>
              <span>/tion/</span>
              <span>/igh/</span>
            </div>
          </div>
        </button>
      </div>

      {/* Encouragement Section */}
      <div className="mt-12 bg-white bg-opacity-90 rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-purple-600 text-center mb-4">🎵 Sound It Out! 🎵</h3>
        <p className="text-center text-purple-600 font-semibold">Choose the level that sounds right for you. Practice makes perfect!</p>
      </div>
    </div>
  );
};

export default PhonicsLevelSelector;
