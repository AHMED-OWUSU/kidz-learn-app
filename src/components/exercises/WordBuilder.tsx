import React, { useState, useEffect } from 'react';
import { ChevronLeft, RotateCcw, Star, Trophy, VolumeX, Volume2 } from 'lucide-react';
import { voiceFeedback } from '../../utils/voiceFeedback';
import RocketAnimation from '../ui/RocketAnimation';

interface WordBuilderProps {
  onBack: () => void;
}

const WordBuilder: React.FC<WordBuilderProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showRocket, setShowRocket] = useState(false);

  const words = [
    { word: 'CAT', image: '🐱', hint: 'A furry pet that says meow' },
    { word: 'DOG', image: '🐶', hint: 'A furry friend that barks' },
    { word: 'SUN', image: '☀️', hint: 'Bright yellow in the sky' },
    { word: 'BALL', image: '⚽', hint: 'Round object you can kick' },
    { word: 'TREE', image: '🌳', hint: 'Tall green plant with leaves' },
    { word: 'HOUSE', image: '🏠', hint: 'Where people live' },
    { word: 'FLOWER', image: '🌸', hint: 'Pretty plant that smells nice' },
    { word: 'RAINBOW', image: '🌈', hint: 'Colorful arc in the sky' }
  ];

  const currentWord = words[currentWordIndex];

  useEffect(() => {
    voiceFeedback.setEnabled(voiceEnabled);
  }, [voiceEnabled]);

  useEffect(() => {
    resetWord();
  }, [currentWordIndex]);

  const resetWord = () => {
    const wordLetters = currentWord.word.split('');
    const extraLetters = ['A', 'E', 'I', 'O', 'U', 'B', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']
      .filter(letter => !wordLetters.includes(letter))
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(4, 8 - wordLetters.length));
    
    const allLetters = [...wordLetters, ...extraLetters].sort(() => Math.random() - 0.5);
    setAvailableLetters(allLetters);
    setPlacedLetters(new Array(currentWord.word.length).fill(''));
    setShowSuccess(false);
  };

  const handleLetterClick = (letter: string, fromAvailable: boolean, index?: number) => {
    if (fromAvailable) {
      // Find first empty slot
      const emptyIndex = placedLetters.findIndex(slot => slot === '');
      if (emptyIndex !== -1) {
        const newPlaced = [...placedLetters];
        newPlaced[emptyIndex] = letter;
        setPlacedLetters(newPlaced);
        
        const newAvailable = [...availableLetters];
        const letterIndex = newAvailable.indexOf(letter);
        newAvailable.splice(letterIndex, 1);
        setAvailableLetters(newAvailable);
      }
    } else {
      // Remove from placed letters
      if (index !== undefined && placedLetters[index] !== '') {
        const letter = placedLetters[index];
        const newPlaced = [...placedLetters];
        newPlaced[index] = '';
        setPlacedLetters(newPlaced);
        
        setAvailableLetters([...availableLetters, letter]);
      }
    }
  };

  const checkWord = () => {
    const formedWord = placedLetters.join('');
    if (formedWord === currentWord.word) {
      setScore(score + 10);
      setShowSuccess(true);
      
      const newConsecutive = consecutiveCorrect + 1;
      setConsecutiveCorrect(newConsecutive);
      
      if (newConsecutive === 3) {
        setShowRocket(true);
        setConsecutiveCorrect(0);
      }
      
      voiceFeedback.excellent();
      
      setTimeout(() => {
        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          if ((currentWordIndex + 1) % 3 === 0) {
            setCurrentLevel(currentLevel + 1);
          }
        } else {
          setGameComplete(true);
          voiceFeedback.gameComplete();
        }
      }, 2000);
    }
  };

  useEffect(() => {
    if (placedLetters.every(letter => letter !== '')) {
      checkWord();
    }
  }, [placedLetters]);

  const restartGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setCurrentWordIndex(0);
    setGameComplete(false);
    setConsecutiveCorrect(0);
    resetWord();
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
        <div className="bg-white bg-opacity-95 rounded-3xl p-8 text-center max-w-md w-full shadow-2xl">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-purple-600 mb-4">Amazing Work!</h2>
          <p className="text-xl text-gray-700 mb-4">You completed all words!</p>
          <p className="text-2xl font-bold text-green-600 mb-6">Final Score: {score}</p>
          <div className="flex flex-col gap-4">
            <button
              onClick={restartGame}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold text-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
            <button
              onClick={onBack}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-2xl font-bold text-lg transition-colors duration-200"
            >
              Back to Exercises
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      <RocketAnimation 
        show={showRocket} 
        onComplete={() => setShowRocket(false)} 
      />
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-24 left-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Voice Toggle Button */}
      <button
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        className="absolute top-24 right-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        {voiceEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
          Word Builder
        </h1>
        <div className="flex items-center justify-center gap-4 text-white">
          <span className="text-lg font-semibold">Level {currentLevel}</span>
          <span className="text-lg font-semibold flex items-center gap-1">
            <Star className="fill-yellow-400 text-yellow-400" size={20} />
            {score}
          </span>
        </div>
      </div>

      {/* Game Area */}
      <div className="bg-white bg-opacity-95 rounded-3xl p-8 w-full max-w-2xl shadow-2xl">
        {/* Word Image and Hint */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4">{currentWord.image}</div>
          <p className="text-lg text-gray-600 font-semibold mb-2">Build the word:</p>
          <p className="text-sm text-gray-500 italic">"{currentWord.hint}"</p>
        </div>

        {/* Word Slots */}
        <div className="flex justify-center gap-3 mb-8">
          {currentWord.word.split('').map((letter, index) => (
            <button
              key={index}
              onClick={() => handleLetterClick('', false, index)}
              className={`w-16 h-16 border-4 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-200 ${
                placedLetters[index] 
                  ? 'bg-blue-100 border-blue-400 text-blue-600 hover:bg-blue-200' 
                  : 'hover:border-gray-400'
              }`}
            >
              {placedLetters[index]}
            </button>
          ))}
        </div>

        {/* Available Letters */}
        <div className="border-t-2 border-gray-200 pt-6">
          <p className="text-center text-gray-600 font-semibold mb-4">Available Letters:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {availableLetters.map((letter, index) => (
              <button
                key={`${letter}-${index}`}
                onClick={() => handleLetterClick(letter, true)}
                className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center mt-6">
          <button
            onClick={resetWord}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={16} />
            Reset Word
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-500 text-white p-8 rounded-3xl text-center shadow-2xl animate-scale-in">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">Excellent!</h3>
              <p className="text-lg">You built the word correctly!</p>
            </div>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="mt-6 text-center text-white">
        <p className="text-lg font-semibold">
          Word {currentWordIndex + 1} of {words.length}
        </p>
        <div className="w-64 bg-white bg-opacity-30 rounded-full h-3 mt-2">
          <div 
            className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentWordIndex + 1) / words.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WordBuilder;
