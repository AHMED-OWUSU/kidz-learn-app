
import React from 'react';

interface MainMenuProps {
  onLearnABC: () => void;
  onLearn123: () => void;
  onLearnPhonics: () => void;
  onExercises: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onLearnABC, onLearn123, onLearnPhonics, onExercises }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg mb-4">
          Learning Fun! 🎉
        </h1>
        <p className="text-2xl text-white drop-shadow-md">What would you like to learn today?</p>
      </div>

      {/* Menu Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Learn ABC */}
        <button
          onClick={onLearnABC}
          className="bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[200px]"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🔤</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Learn ABC</h2>
            <p className="text-xl">Discover letters and words!</p>
          </div>
        </button>

        {/* Learn 123 */}
        <button
          onClick={onLearn123}
          className="bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[200px]"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🔢</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Learn 123</h2>
            <p className="text-xl">Count and explore numbers!</p>
          </div>
        </button>

        {/* Learn Phonics */}
        <button
          onClick={onLearnPhonics}
          className="bg-gradient-to-br from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[200px]"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🎵</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Learn Phonics</h2>
            <p className="text-xl">Master letter sounds!</p>
          </div>
        </button>

        {/* Fun Exercises */}
        <button
          onClick={onExercises}
          className="bg-gradient-to-br from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[200px]"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Fun Exercises</h2>
            <p className="text-xl">Play learning games!</p>
          </div>
        </button>
      </div>

      {/* Encouragement */}
      <div className="mt-12 bg-white bg-opacity-90 rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-2xl font-bold text-purple-600 text-center mb-4">🌟 You're Amazing! 🌟</h3>
        <p className="text-center text-purple-600 font-semibold">Every step you take makes you smarter. Keep learning and having fun!</p>
      </div>
    </div>
  );
};

export default MainMenu;
