
import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight } from 'lucide-react';

interface AlphabetPageProps {
  onBack: () => void;
}

const alphabetData = [
  { letter: 'A', word: 'Apple', emoji: '🍎', color: 'from-red-400 to-red-600' },
  { letter: 'B', word: 'Ball', emoji: '⚽', color: 'from-blue-400 to-blue-600' },
  { letter: 'C', word: 'Cat', emoji: '🐱', color: 'from-green-400 to-green-600' },
  { letter: 'D', word: 'Dog', emoji: '🐶', color: 'from-yellow-400 to-yellow-600' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', color: 'from-purple-400 to-purple-600' },
  { letter: 'F', word: 'Fish', emoji: '🐠', color: 'from-pink-400 to-pink-600' },
  { letter: 'G', word: 'Giraffe', emoji: '🦒', color: 'from-orange-400 to-orange-600' },
  { letter: 'H', word: 'House', emoji: '🏠', color: 'from-teal-400 to-teal-600' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦', color: 'from-indigo-400 to-indigo-600' },
  { letter: 'J', word: 'Jellyfish', emoji: '🎐', color: 'from-cyan-400 to-cyan-600' },
  { letter: 'K', word: 'Kite', emoji: '🪁', color: 'from-amber-400 to-amber-600' },
  { letter: 'L', word: 'Lion', emoji: '🦁', color: 'from-rose-400 to-rose-600' },
  { letter: 'M', word: 'Moon', emoji: '🌙', color: 'from-violet-400 to-violet-600' },
  { letter: 'N', word: 'Nest', emoji: '🪺', color: 'from-emerald-400 to-emerald-600' },
  { letter: 'O', word: 'Orange', emoji: '🍊', color: 'from-sky-400 to-sky-600' },
  { letter: 'P', word: 'Penguin', emoji: '🐧', color: 'from-lime-400 to-lime-600' },
  { letter: 'Q', word: 'Queen', emoji: '👑', color: 'from-fuchsia-400 to-fuchsia-600' },
  { letter: 'R', word: 'Rainbow', emoji: '🌈', color: 'from-slate-400 to-slate-600' },
  { letter: 'S', word: 'Sun', emoji: '☀️', color: 'from-red-500 to-pink-500' },
  { letter: 'T', word: 'Tree', emoji: '🌳', color: 'from-purple-500 to-blue-500' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', color: 'from-green-500 to-teal-500' },
  { letter: 'V', word: 'Volcano', emoji: '🌋', color: 'from-orange-500 to-red-500' },
  { letter: 'W', word: 'Whale', emoji: '🐋', color: 'from-blue-500 to-indigo-500' },
  { letter: 'X', word: 'Xylophone', emoji: '🎵', color: 'from-yellow-500 to-orange-500' },
  { letter: 'Y', word: 'Yacht', emoji: '⛵', color: 'from-teal-500 to-blue-500' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', color: 'from-gray-500 to-black' },
];

const AlphabetPage: React.FC<AlphabetPageProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const currentItem = alphabetData[currentIndex];

  const nextLetter = () => {
    setCurrentIndex((prev) => (prev + 1) % alphabetData.length);
  };

  const prevLetter = () => {
    setCurrentIndex((prev) => (prev - 1 + alphabetData.length) % alphabetData.length);
  };

  const playLetterSound = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.7; // Slower speed for kids
      utterance.pitch = 1.2; // Higher pitch for kids
      utterance.volume = 0.8;
      
      // Try to use a child-friendly voice if available
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
    } else {
      console.log(`Playing sound for ${text}`);
    }
  };

  const playSound = () => {
    const sentence = `${currentItem.letter} for ${currentItem.word}`;
    playLetterSound(sentence);
  };

  const playLetterClick = (letter: string, word: string) => {
    const sentence = `${letter} for ${word}`;
    playLetterSound(sentence);
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

      {/* Letter Display */}
      <div className="text-center mb-8">
        <div 
          className={`bg-gradient-to-br ${currentItem.color} rounded-3xl p-8 shadow-2xl mb-6 transform hover:scale-105 transition-all duration-300 cursor-pointer`}
          onClick={() => playLetterClick(currentItem.letter, currentItem.word)}
        >
          <div className="text-white text-center">
            <div className="text-9xl md:text-[12rem] font-bold mb-4">{currentItem.letter}</div>
            <div className="text-6xl mb-4">{currentItem.emoji}</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentItem.word}</h2>
            <p className="text-xl md:text-2xl font-semibold opacity-90">
              {currentItem.letter} for {currentItem.word}
            </p>
          </div>
        </div>

        {/* Sound Button */}
        <button
          onClick={playSound}
          className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-200 mb-6"
        >
          <Volume2 size={32} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex items-center space-x-8 mb-8">
        <button
          onClick={prevLetter}
          className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
        >
          <ChevronLeft size={32} />
        </button>
        
        <span className="text-2xl font-bold text-white bg-black bg-opacity-30 px-6 py-3 rounded-full">
          {currentIndex + 1} / {alphabetData.length}
        </span>
        
        <button
          onClick={nextLetter}
          className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-white bg-opacity-50 rounded-full h-4 mb-8">
        <div 
          className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / alphabetData.length) * 100}%` }}
        ></div>
      </div>

      {/* Alphabet Grid Preview - Arranged in rows like numbers */}
      <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-w-4xl">
        {alphabetData.map((item, index) => (
          <button
            key={item.letter}
            onClick={() => {
              setCurrentIndex(index);
              playLetterClick(item.letter, item.word);
            }}
            className={`p-2 rounded-lg text-lg font-bold transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-white text-purple-600 scale-110' 
                : 'bg-white bg-opacity-50 text-white hover:bg-opacity-75'
            }`}
          >
            {item.letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlphabetPage;
