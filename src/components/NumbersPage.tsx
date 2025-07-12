import React, { useState, useMemo } from 'react';
import { Volume2, ChevronLeft, ChevronRight } from 'lucide-react';

interface NumbersPageProps {
  onBack: () => void;
  level: 'beginner' | 'intermediate' | 'advanced';
}

const NumbersPage: React.FC<NumbersPageProps> = ({ onBack, level }) => {
  // Move getNumberWord function before useMemo
  const getNumberWord = (num: number): string => {
    const ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) {
      const tenDigit = Math.floor(num / 10);
      const oneDigit = num % 10;
      return oneDigit === 0 ? tens[tenDigit] : `${tens[tenDigit]}-${ones[oneDigit]}`;
    }
    if (num === 100) return 'One Hundred';
    return num.toString();
  };

  // Generate numbers data based on level
  const numbersData = useMemo(() => {
    const getNumberRange = () => {
      switch (level) {
        case 'beginner':
          return { start: 0, end: 20 };
        case 'intermediate':
          return { start: 20, end: 50 };
        case 'advanced':
          return { start: 50, end: 100 };
        default:
          return { start: 0, end: 20 };
      }
    };

    const { start, end } = getNumberRange();
    const data = [];
    
    const colors = [
      'from-red-400 to-red-600', 'from-blue-400 to-blue-600', 'from-yellow-400 to-yellow-600',
      'from-purple-400 to-purple-600', 'from-pink-400 to-pink-600', 'from-orange-400 to-orange-600',
      'from-green-400 to-green-600', 'from-teal-400 to-teal-600', 'from-indigo-400 to-indigo-600',
      'from-cyan-400 to-cyan-600', 'from-amber-400 to-amber-600', 'from-rose-400 to-rose-600',
      'from-violet-400 to-violet-600', 'from-emerald-400 to-emerald-600', 'from-sky-400 to-sky-600',
      'from-lime-400 to-lime-600', 'from-fuchsia-400 to-fuchsia-600', 'from-slate-400 to-slate-600'
    ];

    const emojis = ['🍎', '🐶', '🌟', '🦋', '🌸', '🍊', '🌈', '🐙', '⭐', '🎈', '🌻', '🎯', '🎪', '🎨', '🎭', '🎵', '🎊', '🎁'];

    for (let i = start; i <= end; i++) {
      const colorIndex = i % colors.length;
      const emojiIndex = i % emojis.length;
      
      data.push({
        number: i.toString(),
        word: getNumberWord(i),
        emoji: emojis[emojiIndex],
        count: Math.min(i, 10), // Cap visual count at 10 for display
        color: colors[colorIndex]
      });
    }

    return data;
  }, [level]);

  const getLevelTitle = () => {
    switch (level) {
      case 'beginner':
        return 'Beginner Numbers (0-20)';
      case 'intermediate':
        return 'Intermediate Numbers (20-50)';
      case 'advanced':
        return 'Advanced Numbers (50-100)';
      default:
        return 'Numbers';
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  
  const currentItem = numbersData[currentIndex];

  const nextNumber = () => {
    setCurrentIndex((prev) => (prev + 1) % numbersData.length);
  };

  const prevNumber = () => {
    setCurrentIndex((prev) => (prev - 1 + numbersData.length) % numbersData.length);
  };

  const playNumberSound = (text: string) => {
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
    playNumberSound(currentItem.word);
  };

  const playNumberClick = (number: string, word: string) => {
    playNumberSound(word);
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

      {/* Level Title */}
      <div className="text-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
          {getLevelTitle()}
        </h1>
      </div>

      {/* Number Display */}
      <div className="text-center mb-8">
        <div 
          className={`bg-gradient-to-br ${currentItem.color} rounded-3xl p-8 shadow-2xl mb-6 transform hover:scale-105 transition-all duration-300 cursor-pointer`}
          onClick={() => playNumberClick(currentItem.number, currentItem.word)}
        >
          <div className="text-white text-center">
            <div className="text-9xl md:text-[12rem] font-bold mb-4">{currentItem.number}</div>
            <div className="flex justify-center space-x-2 mb-4 text-4xl flex-wrap max-w-md">
              {Array.from({ length: Math.min(currentItem.count, 10) }, (_, i) => (
                <span 
                  key={i} 
                  className="animate-bounce cursor-pointer" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playNumberClick(currentItem.number, currentItem.word);
                  }}
                >
                  {currentItem.emoji}
                </span>
              ))}
              {currentItem.count > 10 && (
                <span className="text-2xl font-bold text-white ml-2">
                  + {currentItem.count - 10} more
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{currentItem.word}</h2>
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
          onClick={prevNumber}
          className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
        >
          <ChevronLeft size={32} />
        </button>
        
        <span className="text-2xl font-bold text-white bg-black bg-opacity-30 px-6 py-3 rounded-full">
          {currentIndex + 1} / {numbersData.length}
        </span>
        
        <button
          onClick={nextNumber}
          className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-white bg-opacity-50 rounded-full h-4 mb-8">
        <div 
          className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / numbersData.length) * 100}%` }}
        ></div>
      </div>

      {/* Numbers Grid Preview */}
      <div className="grid grid-cols-10 gap-2 max-w-4xl">
        {numbersData.map((item, index) => (
          <button
            key={item.number}
            onClick={() => {
              setCurrentIndex(index);
              playNumberClick(item.number, item.word);
            }}
            className={`p-2 rounded-lg text-lg font-bold transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-white text-purple-600 scale-110' 
                : 'bg-white bg-opacity-50 text-white hover:bg-opacity-75'
            }`}
          >
            {item.number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumbersPage;
