
import React from 'react';
import { Volume2, ChevronLeft, RotateCcw, Star } from 'lucide-react';
import RocketAnimation from '../ui/RocketAnimation';
import GameHeader from '../shared/GameHeader';
import NumberGrid from './NumberMatch/NumberGrid';
import WordGrid from './NumberMatch/WordGrid';
import { useNumberMatch } from './NumberMatch/hooks/useNumberMatch';

interface NumberMatchProps {
  onBack: () => void;
}

const NumberMatch: React.FC<NumberMatchProps> = ({ onBack }) => {
  const {
    score,
    currentRound,
    gameComplete,
    selectedNumber,
    selectedWord,
    matchedPairs,
    showRocket,
    roundData,
    setSelectedNumber,
    setSelectedWord,
    setShowRocket,
    getNumberWord,
    playSound,
    checkMatch,
    resetGame
  } = useNumberMatch();

  const handleNumberClick = (number: number) => {
    if (matchedPairs.has(number)) return;
    
    setSelectedNumber(number);
    playSound(number.toString());
    
    if (selectedWord) {
      checkMatch(number, selectedWord);
    }
  };

  const handleWordClick = (word: string) => {
    const wordNumber = roundData.numbers.find(num => getNumberWord(num) === word);
    if (wordNumber !== undefined && matchedPairs.has(wordNumber)) return;
    
    setSelectedWord(word);
    playSound(word);
    
    if (selectedNumber !== null) {
      checkMatch(selectedNumber, word);
    }
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
        <button
          onClick={onBack}
          className="absolute top-24 left-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="text-center">
          <div className="text-8xl mb-8">🎉</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
            Congratulations!
          </h1>
          <p className="text-2xl text-white mb-8">
            You completed all rounds with {score} points!
          </p>
          
          <div className="flex justify-center space-x-2 mb-8 text-4xl">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={48} className="text-yellow-400 fill-current" />
            ))}
          </div>

          <button
            onClick={resetGame}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-lg hover:scale-105 transition-all duration-200"
          >
            Play Again
          </button>
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

      {/* Header */}
      <GameHeader 
        title="Number Match"
        description="Match numbers with their words!"
        currentRound={currentRound}
        totalRounds={3}
        score={score}
        additionalInfo="Matched"
        additionalValue={matchedPairs.size}
      />

      {/* Numbers Grid */}
      <NumberGrid 
        numbers={roundData.numbers}
        selectedNumber={selectedNumber}
        matchedPairs={matchedPairs}
        onNumberClick={handleNumberClick}
      />

      {/* Words Grid */}
      <WordGrid 
        words={roundData.words}
        numbers={roundData.numbers}
        selectedWord={selectedWord}
        matchedPairs={matchedPairs}
        getNumberWord={getNumberWord}
        onWordClick={handleWordClick}
      />

      {/* Instructions */}
      <div className="text-center">
        <p className="text-white text-lg mb-4">
          {selectedNumber !== null || selectedWord !== null
            ? "Now select the matching pair!"
            : "Click a number, then click its matching word!"}
        </p>
        
        <button
          onClick={() => playSound("Click a number first, then click the word that matches it!")}
          className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
        >
          <Volume2 size={24} />
        </button>
      </div>
    </div>
  );
};

export default NumberMatch;
