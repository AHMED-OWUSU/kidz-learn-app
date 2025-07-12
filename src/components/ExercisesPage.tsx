import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface ExercisesPageProps {
  onBack: () => void;
  onStartABCQuiz: () => void;
  onStartNumberMatch: () => void;
  onStartMemoryGame: () => void;
  onStartShapeSorting: () => void;
  onStartCountingFun: () => void;
  onStartWordBuilder: () => void;
  onStartPuzzleGame: () => void;
}

const ExercisesPage: React.FC<ExercisesPageProps> = ({ 
  onBack, 
  onStartABCQuiz, 
  onStartNumberMatch, 
  onStartMemoryGame, 
  onStartShapeSorting,
  onStartCountingFun,
  onStartWordBuilder,
  onStartPuzzleGame
}) => {
  const exercises = [
    {
      title: "ABC Quiz",
      description: "Test your alphabet knowledge!",
      emoji: "🔤",
      color: "from-red-400 to-pink-500",
      difficulty: "Easy",
      onClick: onStartABCQuiz
    },
    {
      title: "Number Match",
      description: "Match numbers with their words!",
      emoji: "🔢",
      color: "from-blue-400 to-purple-500",
      difficulty: "Medium",
      onClick: onStartNumberMatch
    },
    {
      title: "Memory Game",
      description: "Remember the sequence!",
      emoji: "🧠",
      color: "from-orange-400 to-red-500",
      difficulty: "Hard",
      onClick: onStartMemoryGame
    },
    {
      title: "Shape Sorting",
      description: "Sort shapes by color and type!",
      emoji: "🔷",
      color: "from-green-400 to-teal-500",
      difficulty: "Easy",
      onClick: onStartShapeSorting
    },
    {
      title: "Counting Fun",
      description: "Count objects and learn!",
      emoji: "🧮",
      color: "from-purple-400 to-indigo-500",
      difficulty: "Medium",
      onClick: onStartCountingFun
    },
    {
      title: "Word Builder",
      description: "Build words letter by letter!",
      emoji: "🏗️",
      color: "from-yellow-400 to-orange-500",
      difficulty: "Hard",
      onClick: onStartWordBuilder
    },
    {
      title: "Puzzle Game",
      description: "Solve beautiful jigsaw puzzles!",
      emoji: "🧩",
      color: "from-pink-400 to-purple-500",
      difficulty: "Medium",
      onClick: onStartPuzzleGame
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-24 left-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
          Choose Your Exercise
        </h1>
        <div className="text-4xl mb-4">💪</div>
        <p className="text-xl text-white drop-shadow-lg">
          Practice makes perfect! Pick an exercise to start learning.
        </p>
      </div>

      {/* Exercises Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {exercises.map((exercise, index) => (
          <button
            key={index}
            onClick={exercise.onClick}
            className={`bg-gradient-to-br ${exercise.color} hover:scale-105 text-white p-6 rounded-3xl shadow-2xl transform transition-all duration-300 min-h-[220px] relative overflow-hidden`}
          >
            <div className="text-center relative z-10">
              <div className="text-6xl mb-4">{exercise.emoji}</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">{exercise.title}</h3>
              <p className="text-lg mb-4 opacity-90">{exercise.description}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty}
              </span>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full translate-y-8 -translate-x-8"></div>
          </button>
        ))}
      </div>

      {/* Coming Soon Section */}
      <div className="mt-12 bg-white bg-opacity-90 rounded-2xl p-6 w-full max-w-2xl">
        <h3 className="text-2xl font-bold text-purple-600 text-center mb-4">Coming Soon! 🚀</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="text-3xl mb-2">🎨</div>
          <div className="text-3xl mb-2">🎵</div>
          <div className="text-3xl mb-2">🌟</div>
          <div className="text-3xl mb-2">🎭</div>
        </div>
        <p className="text-center text-purple-600 font-semibold">
          Art, Music, Science & Drama exercises coming soon!
        </p>
      </div>
    </div>
  );
};

export default ExercisesPage;
