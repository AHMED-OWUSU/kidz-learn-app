
import React from 'react';

interface WordGridProps {
  words: string[];
  numbers: number[];
  selectedWord: string | null;
  matchedPairs: Set<number>;
  getNumberWord: (num: number) => string;
  onWordClick: (word: string) => void;
}

const WordGrid: React.FC<WordGridProps> = ({
  words,
  numbers,
  selectedWord,
  matchedPairs,
  getNumberWord,
  onWordClick
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Words</h2>
      <div className="grid grid-cols-2 gap-4 max-w-lg">
        {words.map((word, index) => {
          const wordNumber = numbers.find(num => getNumberWord(num) === word);
          const isMatched = wordNumber !== undefined && matchedPairs.has(wordNumber);
          
          return (
            <button
              key={index}
              onClick={() => onWordClick(word)}
              disabled={isMatched}
              className={`px-4 py-3 text-lg font-bold rounded-xl shadow-lg transform transition-all duration-200 ${
                isMatched
                  ? 'bg-green-400 text-white scale-105'
                  : selectedWord === word
                  ? 'bg-yellow-400 text-black scale-110'
                  : 'bg-purple-500 text-white hover:scale-105 hover:bg-purple-600'
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WordGrid;
