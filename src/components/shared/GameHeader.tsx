
import React from 'react';

interface GameHeaderProps {
  title: string;
  description: string;
  currentRound?: number;
  totalRounds?: number;
  score: number;
  additionalInfo?: string;
  additionalValue?: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  title,
  description,
  currentRound,
  totalRounds,
  score,
  additionalInfo,
  additionalValue
}) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
        {title}
      </h1>
      <p className="text-xl text-white drop-shadow-lg mb-4">
        {description}
      </p>
      <div className="flex justify-center space-x-6 text-lg font-bold text-white">
        {currentRound && totalRounds && (
          <span className="bg-blue-500 px-4 py-2 rounded-full">
            Round {currentRound}/{totalRounds}
          </span>
        )}
        <span className="bg-green-500 px-4 py-2 rounded-full">Score: {score}</span>
        {additionalInfo && additionalValue !== undefined && (
          <span className="bg-purple-500 px-4 py-2 rounded-full">
            {additionalInfo}: {additionalValue}
          </span>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
