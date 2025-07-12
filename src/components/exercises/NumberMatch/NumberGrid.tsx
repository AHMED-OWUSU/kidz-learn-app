
import React from 'react';

interface NumberGridProps {
  numbers: number[];
  selectedNumber: number | null;
  matchedPairs: Set<number>;
  onNumberClick: (number: number) => void;
}

const NumberGrid: React.FC<NumberGridProps> = ({
  numbers,
  selectedNumber,
  matchedPairs,
  onNumberClick
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white text-center mb-4">Numbers</h2>
      <div className="grid grid-cols-3 gap-4">
        {numbers.map((number) => (
          <button
            key={number}
            onClick={() => onNumberClick(number)}
            disabled={matchedPairs.has(number)}
            className={`w-20 h-20 text-2xl font-bold rounded-xl shadow-lg transform transition-all duration-200 ${
              matchedPairs.has(number)
                ? 'bg-green-400 text-white scale-105'
                : selectedNumber === number
                ? 'bg-yellow-400 text-black scale-110'
                : 'bg-blue-500 text-white hover:scale-105 hover:bg-blue-600'
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumberGrid;
