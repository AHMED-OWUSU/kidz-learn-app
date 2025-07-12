import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, RotateCcw, VolumeX, Volume2 } from 'lucide-react';
import { voiceFeedback } from '../../utils/voiceFeedback';
import RocketAnimation from '../ui/RocketAnimation';

interface MemoryGameProps {
  onBack: () => void;
}

const colors = [
  { name: 'red', bg: 'bg-red-500', hover: 'hover:bg-red-600', sound: 'C4' },
  { name: 'blue', bg: 'bg-blue-500', hover: 'hover:bg-blue-600', sound: 'D4' },
  { name: 'green', bg: 'bg-green-500', hover: 'hover:bg-green-600', sound: 'E4' },
  { name: 'yellow', bg: 'bg-yellow-500', hover: 'hover:bg-yellow-600', sound: 'F4' },
  { name: 'purple', bg: 'bg-purple-500', hover: 'hover:bg-purple-600', sound: 'G4' },
  { name: 'orange', bg: 'bg-orange-500', hover: 'hover:bg-orange-600', sound: 'A4' }
];

const MemoryGame: React.FC<MemoryGameProps> = ({ onBack }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeColor, setActiveColor] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'won' | 'lost'>('waiting');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState('Watch the sequence, then repeat it!');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showRocket, setShowRocket] = useState(false);

  useEffect(() => {
    voiceFeedback.setEnabled(voiceEnabled);
  }, [voiceEnabled]);

  const playSound = (frequency: string) => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      const frequencies: { [key: string]: number } = {
        'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00
      };
      
      oscillator.frequency.setValueAtTime(frequencies[frequency] || 440, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const generateSequence = (length: number) => {
    const newSequence = [];
    for (let i = 0; i < length; i++) {
      newSequence.push(Math.floor(Math.random() * colors.length));
    }
    return newSequence;
  };

  const startGame = () => {
    const newSequence = generateSequence(2 + level);
    setSequence(newSequence);
    setPlayerSequence([]);
    setGameState('playing');
    setMessage('Watch carefully...');
    showSequence(newSequence);
  };

  const showSequence = async (seq: number[]) => {
    setIsShowingSequence(true);
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setActiveColor(seq[i]);
      playSound(colors[seq[i]].sound);
      await new Promise(resolve => setTimeout(resolve, 400));
      setActiveColor(null);
    }
    
    setIsShowingSequence(false);
    setMessage('Now repeat the sequence!');
  };

  const handleColorClick = (colorIndex: number) => {
    if (isShowingSequence || gameState !== 'playing') return;

    playSound(colors[colorIndex].sound);
    const newPlayerSequence = [...playerSequence, colorIndex];
    setPlayerSequence(newPlayerSequence);

    // Check if the current input is correct
    if (sequence[newPlayerSequence.length - 1] !== colorIndex) {
      setGameState('lost');
      setMessage('Oops! Try again!');
      setConsecutiveCorrect(0);
      voiceFeedback.encouragement();
      return;
    }

    // Check if sequence is complete
    if (newPlayerSequence.length === sequence.length) {
      setGameState('won');
      setScore(score + sequence.length * 10);
      setLevel(level + 1);
      setMessage(`Great job! Level ${level} complete!`);
      
      const newConsecutive = consecutiveCorrect + 1;
      setConsecutiveCorrect(newConsecutive);
      
      if (newConsecutive === 3) {
        setShowRocket(true);
        setConsecutiveCorrect(0);
      }
      
      voiceFeedback.levelComplete();
    }
  };

  const resetGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setGameState('waiting');
    setScore(0);
    setLevel(1);
    setMessage('Watch the sequence, then repeat it!');
    setConsecutiveCorrect(0);
  };

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
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
          Memory Game
        </h1>
        <div className="text-4xl mb-4">🧠</div>
        <p className="text-xl text-white drop-shadow-lg mb-4">{message}</p>
        
        {/* Score and Level */}
        <div className="flex justify-center space-x-8 mb-6">
          <div className="bg-white bg-opacity-90 rounded-lg px-4 py-2">
            <div className="text-sm text-purple-600 font-semibold">Score</div>
            <div className="text-2xl font-bold text-purple-700">{score}</div>
          </div>
          <div className="bg-white bg-opacity-90 rounded-lg px-4 py-2">
            <div className="text-sm text-purple-600 font-semibold">Level</div>
            <div className="text-2xl font-bold text-purple-700">{level}</div>
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="mb-8">
        {gameState === 'waiting' && (
          <button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full shadow-lg text-xl font-bold flex items-center gap-2 hover:scale-105 transition-all duration-200"
          >
            <Play size={24} />
            Start Game
          </button>
        )}
        
        {gameState === 'won' && (
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg text-xl font-bold hover:scale-105 transition-all duration-200"
          >
            Next Level
          </button>
        )}
        
        {gameState === 'lost' && (
          <div className="flex gap-4">
            <button
              onClick={startGame}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-bold hover:scale-105 transition-all duration-200"
            >
              Try Again
            </button>
            <button
              onClick={resetGame}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-bold flex items-center gap-2 hover:scale-105 transition-all duration-200"
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>
        )}
      </div>

      {/* Color Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-lg">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorClick(index)}
            disabled={isShowingSequence || gameState === 'waiting'}
            className={`
              ${color.bg} ${color.hover}
              ${activeColor === index ? 'scale-110 ring-4 ring-white' : ''}
              ${isShowingSequence || gameState === 'waiting' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              w-20 h-20 md:w-24 md:h-24 rounded-full shadow-lg transform transition-all duration-200
            `}
          >
            <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>

      {/* Player Progress */}
      {gameState === 'playing' && !isShowingSequence && (
        <div className="mt-8 text-center">
          <p className="text-white text-lg mb-2">
            Progress: {playerSequence.length} / {sequence.length}
          </p>
          <div className="flex justify-center space-x-2">
            {sequence.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < playerSequence.length ? 'bg-green-400' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
