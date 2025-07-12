
import React, { useState, useMemo } from 'react';
import { Volume2, ChevronLeft, ChevronRight } from 'lucide-react';

interface PhonicsPageProps {
  onBack: () => void;
  level: 'beginner' | 'intermediate' | 'advanced';
}

const PhonicsPage: React.FC<PhonicsPageProps> = ({ onBack, level }) => {
  const phonicsData = useMemo(() => {
    const getPhonicsForLevel = () => {
      switch (level) {
        case 'beginner':
          return [
            { letter: 'A', sound: '/æ/', word: 'Apple', emoji: '🍎', example: 'cat, hat, bat' },
            { letter: 'B', sound: '/b/', word: 'Ball', emoji: '⚽', example: 'big, baby, book' },
            { letter: 'C', sound: '/k/', word: 'Cat', emoji: '🐱', example: 'car, cup, cake' },
            { letter: 'D', sound: '/d/', word: 'Dog', emoji: '🐶', example: 'dad, duck, day' },
            { letter: 'E', sound: '/ɛ/', word: 'Egg', emoji: '🥚', example: 'red, bed, net' },
            { letter: 'F', sound: '/f/', word: 'Fish', emoji: '🐠', example: 'fun, fox, fire' },
            { letter: 'G', sound: '/g/', word: 'Goat', emoji: '🐐', example: 'go, game, girl' },
            { letter: 'H', sound: '/h/', word: 'Hat', emoji: '👒', example: 'hop, hand, house' },
            { letter: 'I', sound: '/ɪ/', word: 'Igloo', emoji: '🏠', example: 'sit, big, fit' },
            { letter: 'J', sound: '/dʒ/', word: 'Jump', emoji: '🦘', example: 'jam, joy, jet' },
            { letter: 'K', sound: '/k/', word: 'Kite', emoji: '🪁', example: 'key, kid, kick' },
            { letter: 'L', sound: '/l/', word: 'Lion', emoji: '🦁', example: 'let, love, late' },
            { letter: 'M', sound: '/m/', word: 'Moon', emoji: '🌙', example: 'mom, map, make' },
            { letter: 'N', sound: '/n/', word: 'Net', emoji: '🥅', example: 'no, name, new' },
            { letter: 'O', sound: '/ɒ/', word: 'Orange', emoji: '🍊', example: 'hot, top, pot' },
            { letter: 'P', sound: '/p/', word: 'Pig', emoji: '🐷', example: 'pop, pen, pet' },
            { letter: 'Q', sound: '/kw/', word: 'Queen', emoji: '👑', example: 'quick, quiet, quiz' },
            { letter: 'R', sound: '/r/', word: 'Rabbit', emoji: '🐰', example: 'run, red, road' },
            { letter: 'S', sound: '/s/', word: 'Sun', emoji: '☀️', example: 'see, sit, same' },
            { letter: 'T', sound: '/t/', word: 'Tiger', emoji: '🐅', example: 'top, toy, take' },
            { letter: 'U', sound: '/ʌ/', word: 'Umbrella', emoji: '☂️', example: 'up, cup, bug' },
            { letter: 'V', sound: '/v/', word: 'Van', emoji: '🚐', example: 'very, vine, vest' },
            { letter: 'W', sound: '/w/', word: 'Water', emoji: '💧', example: 'we, win, way' },
            { letter: 'X', sound: '/ks/', word: 'Fox', emoji: '🦊', example: 'box, six, wax' },
            { letter: 'Y', sound: '/j/', word: 'Yes', emoji: '✅', example: 'you, yellow, year' },
            { letter: 'Z', sound: '/z/', word: 'Zebra', emoji: '🦓', example: 'zoo, zip, buzz' }
          ];
        case 'intermediate':
          return [
            { letter: 'CH', sound: '/tʃ/', word: 'Chair', emoji: '🪑', example: 'cheese, church, much' },
            { letter: 'SH', sound: '/ʃ/', word: 'Ship', emoji: '🚢', example: 'shoe, fish, wash' },
            { letter: 'TH', sound: '/θ/', word: 'Think', emoji: '🤔', example: 'three, math, bath' },
            { letter: 'WH', sound: '/w/', word: 'Whale', emoji: '🐋', example: 'what, where, when' },
            { letter: 'PH', sound: '/f/', word: 'Phone', emoji: '📱', example: 'graph, laugh, photo' },
            { letter: 'CK', sound: '/k/', word: 'Duck', emoji: '🦆', example: 'back, rock, pick' },
            { letter: 'NG', sound: '/ŋ/', word: 'Ring', emoji: '💍', example: 'sing, long, king' },
            { letter: 'ST', sound: '/st/', word: 'Star', emoji: '⭐', example: 'stop, fast, first' },
            { letter: 'SK', sound: '/sk/', word: 'Skate', emoji: '⛸️', example: 'sky, ask, desk' },
            { letter: 'SP', sound: '/sp/', word: 'Spider', emoji: '🕷️', example: 'spin, grasp, crisp' },
            { letter: 'SC', sound: '/sk/', word: 'Scare', emoji: '👻', example: 'scale, score, scout' },
            { letter: 'SM', sound: '/sm/', word: 'Smile', emoji: '😊', example: 'small, smoke, smart' }
          ];
        case 'advanced':
          return [
            { letter: 'OUGH', sound: '/ʌf/', word: 'Tough', emoji: '💪', example: 'rough, enough, cough' },
            { letter: 'TION', sound: '/ʃən/', word: 'Nation', emoji: '🏛️', example: 'action, station, motion' },
            { letter: 'IGH', sound: '/aɪ/', word: 'Light', emoji: '💡', example: 'night, right, bright' },
            { letter: 'EIGH', sound: '/eɪ/', word: 'Eight', emoji: '8️⃣', example: 'weight, neighbor, sleigh' },
            { letter: 'EAR', sound: '/ɪər/', word: 'Hear', emoji: '👂', example: 'clear, dear, year' },
            { letter: 'AIR', sound: '/eər/', word: 'Hair', emoji: '💇', example: 'fair, chair, pair' },
            { letter: 'URE', sound: '/jʊər/', word: 'Pure', emoji: '💎', example: 'sure, cure, picture' },
            { letter: 'OUR', sound: '/aʊər/', word: 'Hour', emoji: '⏰', example: 'sour, flour, power' },
            { letter: 'AWE', sound: '/ɔː/', word: 'Awesome', emoji: '🤩', example: 'law, raw, draw' },
            { letter: 'EW', sound: '/juː/', word: 'New', emoji: '🆕', example: 'few, grew, threw' }
          ];
        default:
          return [];
      }
    };

    const data = getPhonicsForLevel();
    const colors = [
      'from-red-400 to-red-600', 'from-blue-400 to-blue-600', 'from-green-400 to-green-600',
      'from-yellow-400 to-yellow-600', 'from-purple-400 to-purple-600', 'from-pink-400 to-pink-600',
      'from-orange-400 to-orange-600', 'from-teal-400 to-teal-600', 'from-indigo-400 to-indigo-600',
      'from-cyan-400 to-cyan-600', 'from-amber-400 to-amber-600', 'from-rose-400 to-rose-600'
    ];

    return data.map((item, index) => ({
      ...item,
      color: colors[index % colors.length]
    }));
  }, [level]);

  const getLevelTitle = () => {
    switch (level) {
      case 'beginner':
        return 'Beginner Phonics (Letter Sounds)';
      case 'intermediate':
        return 'Intermediate Phonics (Blends & Digraphs)';
      case 'advanced':
        return 'Advanced Phonics (Complex Sounds)';
      default:
        return 'Phonics';
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = phonicsData[currentIndex];

  const nextSound = () => {
    setCurrentIndex((prev) => (prev + 1) % phonicsData.length);
  };

  const prevSound = () => {
    setCurrentIndex((prev) => (prev - 1 + phonicsData.length) % phonicsData.length);
  };

  const playPhonicsSound = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.6;
      utterance.pitch = 1.1;
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

  const playSound = () => {
    const sentence = `${currentItem.letter} makes the ${currentItem.sound} sound, like in ${currentItem.word}`;
    playPhonicsSound(sentence);
  };

  const playSoundClick = (letter: string, sound: string, word: string) => {
    const sentence = `${letter} makes the ${sound} sound, like in ${word}`;
    playPhonicsSound(sentence);
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

      {/* Phonics Display */}
      <div className="text-center mb-8">
        <div 
          className={`bg-gradient-to-br ${currentItem.color} rounded-3xl p-8 shadow-2xl mb-6 transform hover:scale-105 transition-all duration-300 cursor-pointer`}
          onClick={() => playSoundClick(currentItem.letter, currentItem.sound, currentItem.word)}
        >
          <div className="text-white text-center">
            <div className="text-6xl md:text-8xl font-bold mb-4">{currentItem.letter}</div>
            <div className="text-4xl md:text-5xl font-mono mb-4 bg-black bg-opacity-20 rounded-2xl py-2">{currentItem.sound}</div>
            <div className="text-6xl mb-4">{currentItem.emoji}</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentItem.word}</h2>
            <p className="text-lg md:text-xl font-semibold opacity-90 mb-2">
              Examples: {currentItem.example}
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
          onClick={prevSound}
          className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
        >
          <ChevronLeft size={32} />
        </button>
        
        <span className="text-2xl font-bold text-white bg-black bg-opacity-30 px-6 py-3 rounded-full">
          {currentIndex + 1} / {phonicsData.length}
        </span>
        
        <button
          onClick={nextSound}
          className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md bg-white bg-opacity-50 rounded-full h-4 mb-8">
        <div 
          className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / phonicsData.length) * 100}%` }}
        ></div>
      </div>

      {/* Phonics Grid Preview */}
      <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-w-4xl">
        {phonicsData.map((item, index) => (
          <button
            key={item.letter}
            onClick={() => {
              setCurrentIndex(index);
              playSoundClick(item.letter, item.sound, item.word);
            }}
            className={`p-2 rounded-lg text-sm font-bold transition-all duration-200 ${
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

export default PhonicsPage;
