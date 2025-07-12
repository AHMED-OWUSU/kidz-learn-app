import React, { useState, useEffect } from 'react';
import { ChevronLeft, RotateCcw, CheckCircle, XCircle, VolumeX, Volume2 } from 'lucide-react';
import { voiceFeedback } from '../../utils/voiceFeedback';
import RocketAnimation from '../ui/RocketAnimation';

interface CountingFunProps {
  onBack: () => void;
}

const CountingFun: React.FC<CountingFunProps> = ({ onBack }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showRocket, setShowRocket] = useState(false);

  // Object types with emojis
  const objectTypes = [
    { emoji: '🍎', name: 'apples' },
    { emoji: '🌟', name: 'stars' },
    { emoji: '🎈', name: 'balloons' },
    { emoji: '🦋', name: 'butterflies' },
    { emoji: '🌸', name: 'flowers' },
    { emoji: '🐸', name: 'frogs' },
    { emoji: '🍓', name: 'strawberries' },
    { emoji: '🐠', name: 'fish' }
  ];

  const [currentQuestion, setCurrentQuestion] = useState({
    count: 0,
    object: objectTypes[0],
    options: [1, 2, 3, 4]
  });

  useEffect(() => {
    voiceFeedback.setEnabled(voiceEnabled);
  }, [voiceEnabled]);

  const generateQuestion = () => {
    const count = Math.min(currentLevel + 2, 10); // Increase difficulty gradually
    const randomObject = objectTypes[Math.floor(Math.random() * objectTypes.length)];
    
    // Generate options with one correct answer
    const correctAnswer = count;
    const options = [correctAnswer];
    
    // Add 3 wrong answers
    while (options.length < 4) {
      const wrongAnswer = Math.max(1, Math.floor(Math.random() * (count + 3)) + 1);
      if (!options.includes(wrongAnswer)) {
        options.push(wrongAnswer);
      }
    }
    
    // Shuffle options
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    
    setCurrentQuestion({
      count: correctAnswer,
      object: randomObject,
      options: shuffledOptions
    });
  };

  useEffect(() => {
    generateQuestion();
  }, [currentLevel]);

  const handleAnswerSelect = (answer: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.count;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 10);
      
      const newConsecutive = consecutiveCorrect + 1;
      setConsecutiveCorrect(newConsecutive);
      
      if (newConsecutive === 3) {
        setShowRocket(true);
        setConsecutiveCorrect(0);
      }
      
      voiceFeedback.excellent();
      setTimeout(() => {
        if (currentLevel >= 8) {
          setGameComplete(true);
          voiceFeedback.gameComplete();
        } else {
          nextQuestion();
        }
      }, 1500);
    } else {
      setConsecutiveCorrect(0);
      voiceFeedback.encouragement();
    }
  };

  const nextQuestion = () => {
    setCurrentLevel(currentLevel + 1);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    setGameComplete(false);
    setConsecutiveCorrect(0);
    generateQuestion();
  };

  const renderObjects = () => {
    const objects = [];
    for (let i = 0; i < currentQuestion.count; i++) {
      objects.push(
        <div
          key={i}
          className="text-4xl md:text-6xl animate-scale-in"
          style={{ 
            animationDelay: `${i * 0.1}s`,
            animationFillMode: 'both'
          }}
        >
          {currentQuestion.object.emoji}
        </div>
      );
    }
    return objects;
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24 bg-gradient-to-br from-green-300 via-blue-300 to-purple-300">
        <button
          onClick={onBack}
          className="absolute top-24 left-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="text-center bg-white bg-opacity-90 rounded-3xl p-8 max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-purple-600 mb-4">Congratulations!</h2>
          <p className="text-xl text-gray-700 mb-4">
            You completed all levels!
          </p>
          <p className="text-2xl font-bold text-green-600 mb-6">
            Final Score: {score} points
          </p>
          <button
            onClick={resetGame}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-200 hover:scale-105"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24 bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300">
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
        className="absolute top-24 right-20 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        {voiceEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="absolute top-24 right-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        <RotateCcw size={24} />
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-2">
          Counting Fun
        </h1>
        <div className="flex items-center justify-center gap-4 text-white">
          <span className="text-lg font-semibold">Level: {currentLevel}</span>
          <span className="text-lg font-semibold">Score: {score}</span>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="bg-white bg-opacity-90 rounded-3xl p-8 max-w-2xl w-full">
        {/* Question */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600 mb-4">
            How many {currentQuestion.object.name} do you see?
          </h2>
          
          {/* Objects Display */}
          <div className="grid grid-cols-5 gap-4 justify-items-center mb-8 p-4 bg-gray-50 rounded-2xl">
            {renderObjects()}
          </div>
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={showResult}
              className={`
                p-4 rounded-2xl text-2xl font-bold transition-all duration-200 transform hover:scale-105
                ${selectedAnswer === option 
                  ? showResult
                    ? isCorrect && option === currentQuestion.count
                      ? 'bg-green-500 text-white'
                      : option === currentQuestion.count
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    : 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }
                ${showResult && option === currentQuestion.count && selectedAnswer !== option 
                  ? 'bg-green-500 text-white ring-4 ring-green-300' 
                  : ''
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Result Feedback */}
        {showResult && (
          <div className="text-center">
            {isCorrect ? (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle size={32} />
                <span className="text-2xl font-bold">Correct! Great job!</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-red-600">
                  <XCircle size={32} />
                  <span className="text-xl font-bold">Try again!</span>
                </div>
                <p className="text-gray-600">The correct answer is {currentQuestion.count}</p>
                <button
                  onClick={nextQuestion}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-2xl font-bold mt-4 transition-all duration-200"
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountingFun;
