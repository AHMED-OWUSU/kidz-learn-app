
import React, { useState, useEffect } from 'react';
import { Volume2, ChevronLeft, RotateCcw } from 'lucide-react';

interface ABCQuizProps {
  onBack: () => void;
}

const alphabetData = [
  { letter: 'A', word: 'Apple', emoji: '🍎' },
  { letter: 'B', word: 'Ball', emoji: '⚽' },
  { letter: 'C', word: 'Cat', emoji: '🐱' },
  { letter: 'D', word: 'Dog', emoji: '🐶' },
  { letter: 'E', word: 'Elephant', emoji: '🐘' },
  { letter: 'F', word: 'Fish', emoji: '🐠' },
  { letter: 'G', word: 'Giraffe', emoji: '🦒' },
  { letter: 'H', word: 'House', emoji: '🏠' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦' },
  { letter: 'J', word: 'Jellyfish', emoji: '🎐' },
  { letter: 'K', word: 'Kite', emoji: '🪁' },
  { letter: 'L', word: 'Lion', emoji: '🦁' },
  { letter: 'M', word: 'Moon', emoji: '🌙' },
  { letter: 'N', word: 'Nest', emoji: '🪺' },
  { letter: 'O', word: 'Orange', emoji: '🍊' },
  { letter: 'P', word: 'Penguin', emoji: '🐧' },
  { letter: 'Q', word: 'Queen', emoji: '👑' },
  { letter: 'R', word: 'Rainbow', emoji: '🌈' },
  { letter: 'S', word: 'Sun', emoji: '☀️' },
  { letter: 'T', word: 'Tree', emoji: '🌳' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️' },
  { letter: 'V', word: 'Volcano', emoji: '🌋' },
  { letter: 'W', word: 'Whale', emoji: '🐋' },
  { letter: 'X', word: 'Xylophone', emoji: '🎵' },
  { letter: 'Y', word: 'Yacht', emoji: '⛵' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓' },
];

const ABCQuiz: React.FC<ABCQuizProps> = ({ onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [options, setOptions] = useState<typeof alphabetData>([]);

  const generateQuestion = () => {
    const correctAnswer = alphabetData[currentQuestion];
    const wrongAnswers = alphabetData
      .filter(item => item.letter !== correctAnswer.letter)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  useEffect(() => {
    generateQuestion();
  }, [currentQuestion]);

  const playLetterSound = (letter: string, word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(`${letter} for ${word}`);
      utterance.rate = 0.7;
      utterance.pitch = 1.2;
      utterance.volume = 0.8;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Female') ||
        voice.lang.startsWith('en')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAnswer = (selectedLetter: string) => {
    const correctAnswer = alphabetData[currentQuestion];
    setSelectedAnswer(selectedLetter);
    setShowResult(true);
    
    if (selectedLetter === correctAnswer.letter) {
      setScore(score + 1);
      // Play success sound
      playLetterSound('Correct', `${correctAnswer.letter} for ${correctAnswer.word}`);
    } else {
      // Play the correct answer
      playLetterSound(correctAnswer.letter, correctAnswer.word);
    }

    setTimeout(() => {
      if (currentQuestion < alphabetData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameFinished(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameFinished(false);
    generateQuestion();
  };

  const playCurrentQuestion = () => {
    const current = alphabetData[currentQuestion];
    playLetterSound(current.letter, current.word);
  };

  if (gameFinished) {
    const percentage = Math.round((score / alphabetData.length) * 100);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
        <button
          onClick={onBack}
          className="absolute top-24 left-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
            Quiz Complete!
          </h1>
          <div className="bg-white bg-opacity-90 rounded-3xl p-8 mb-8">
            <div className="text-6xl mb-4">⭐</div>
            <h2 className="text-3xl font-bold text-purple-600 mb-2">Your Score</h2>
            <p className="text-4xl font-bold text-purple-600">{score} / {alphabetData.length}</p>
            <p className="text-2xl text-purple-600 mt-2">{percentage}%</p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <RotateCcw size={24} />
              Play Again
            </button>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  const correctAnswer = alphabetData[currentQuestion];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      <button
        onClick={onBack}
        className="absolute top-24 left-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
          ABC Quiz
        </h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-2xl font-bold text-white bg-black bg-opacity-30 px-4 py-2 rounded-full">
            Question {currentQuestion + 1} / {alphabetData.length}
          </span>
          <span className="text-2xl font-bold text-white bg-black bg-opacity-30 px-4 py-2 rounded-full">
            Score: {score}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl text-white mb-6 font-semibold">
          Listen to the letter and choose the correct option:
        </h2>
        
        <button
          onClick={playCurrentQuestion}
          className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-full shadow-2xl hover:scale-110 transition-all duration-200 mb-6"
        >
          <Volume2 size={48} />
        </button>
        
        <p className="text-xl text-white font-semibold">
          Click the speaker to hear the letter again
        </p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl mb-8">
        {options.map((option, index) => (
          <button
            key={option.letter}
            onClick={() => !showResult && handleAnswer(option.letter)}
            disabled={showResult}
            className={`p-6 rounded-3xl text-white font-bold text-xl shadow-2xl transform transition-all duration-300 ${
              showResult
                ? option.letter === correctAnswer.letter
                  ? 'bg-gradient-to-br from-green-400 to-green-600 scale-105'
                  : selectedAnswer === option.letter
                  ? 'bg-gradient-to-br from-red-400 to-red-600'
                  : 'bg-gradient-to-br from-gray-400 to-gray-600 opacity-50'
                : 'bg-gradient-to-br from-blue-400 to-purple-500 hover:scale-105 hover:from-blue-500 hover:to-purple-600'
            }`}
          >
            <div className="text-4xl mb-2">{option.emoji}</div>
            <div className="text-3xl font-bold mb-1">{option.letter}</div>
            <div className="text-lg">{option.word}</div>
          </button>
        ))}
      </div>

      {/* Result feedback */}
      {showResult && (
        <div className="text-center">
          {selectedAnswer === correctAnswer.letter ? (
            <div className="text-6xl animate-bounce">🎉</div>
          ) : (
            <div className="text-6xl animate-pulse">😊</div>
          )}
          <p className="text-2xl text-white font-bold mt-2">
            {selectedAnswer === correctAnswer.letter ? 'Correct!' : `It's ${correctAnswer.letter} for ${correctAnswer.word}`}
          </p>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-white bg-opacity-50 rounded-full h-4 mt-8">
        <div 
          className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / alphabetData.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ABCQuiz;
