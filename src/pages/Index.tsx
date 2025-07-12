
import React, { useState } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import MainMenu from '../components/MainMenu';
import AlphabetPage from '../components/AlphabetPage';
import NumbersPage from '../components/NumbersPage';
import NumberLevelSelector from '../components/NumberLevelSelector';
import PhonicsLevelSelector from '../components/PhonicsLevelSelector';
import PhonicsPage from '../components/PhonicsPage';
import ExercisesPage from '../components/ExercisesPage';
import ABCQuiz from '../components/exercises/ABCQuiz';
import NumberMatch from '../components/exercises/NumberMatch';
import MemoryGame from '../components/exercises/MemoryGame';
import TopNavigation from '../components/TopNavigation';
import FloatingAnimations from '../components/FloatingAnimations';
import ShapeSorting from '../components/exercises/ShapeSorting';
import CountingFun from '../components/exercises/CountingFun';
import WordBuilder from '../components/exercises/WordBuilder';
import PuzzleGame from '../components/exercises/PuzzleGame';
import ProfilePage from '../components/ProfilePage';
import SettingsPage from '../components/SettingsPage';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [selectedNumberLevel, setSelectedNumberLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [selectedPhonicsLevel, setSelectedPhonicsLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomeScreen onStart={() => setCurrentPage('menu')} />;
      case 'menu':
        return <MainMenu 
          onLearnABC={() => setCurrentPage('alphabet')} 
          onLearn123={() => setCurrentPage('number-levels')}
          onLearnPhonics={() => setCurrentPage('phonics-levels')}
          onExercises={() => setCurrentPage('exercises')}
        />;
      case 'alphabet':
        return <AlphabetPage onBack={() => setCurrentPage('menu')} />;
      case 'number-levels':
        return <NumberLevelSelector 
          onBack={() => setCurrentPage('menu')}
          onSelectLevel={(level) => {
            setSelectedNumberLevel(level);
            setCurrentPage('numbers');
          }}
        />;
      case 'numbers':
        return <NumbersPage 
          onBack={() => setCurrentPage('number-levels')} 
          level={selectedNumberLevel}
        />;
      case 'phonics-levels':
        return <PhonicsLevelSelector 
          onBack={() => setCurrentPage('menu')}
          onSelectLevel={(level) => {
            setSelectedPhonicsLevel(level);
            setCurrentPage('phonics');
          }}
        />;
      case 'phonics':
        return <PhonicsPage 
          onBack={() => setCurrentPage('phonics-levels')} 
          level={selectedPhonicsLevel}
        />;
      case 'exercises':
        return <ExercisesPage 
          onBack={() => setCurrentPage('menu')} 
          onStartABCQuiz={() => setCurrentPage('abc-quiz')}
          onStartNumberMatch={() => setCurrentPage('number-match')}
          onStartMemoryGame={() => setCurrentPage('memory-game')}
          onStartShapeSorting={() => setCurrentPage('shape-sorting')}
          onStartCountingFun={() => setCurrentPage('counting-fun')}
          onStartWordBuilder={() => setCurrentPage('word-builder')}
          onStartPuzzleGame={() => setCurrentPage('puzzle-game')}
        />;
      case 'abc-quiz':
        return <ABCQuiz onBack={() => setCurrentPage('exercises')} />;
      case 'number-match':
        return <NumberMatch onBack={() => setCurrentPage('exercises')} />;
      case 'memory-game':
        return <MemoryGame onBack={() => setCurrentPage('exercises')} />;
      case 'shape-sorting':
        return <ShapeSorting onBack={() => setCurrentPage('exercises')} />;
      case 'counting-fun':
        return <CountingFun onBack={() => setCurrentPage('exercises')} />;
      case 'word-builder':
        return <WordBuilder onBack={() => setCurrentPage('exercises')} />;
      case 'puzzle-game':
        return <PuzzleGame onBack={() => setCurrentPage('exercises')} />;
      case 'profile':
        return <ProfilePage onBack={() => setCurrentPage('menu')} />;
      case 'settings':
        return <SettingsPage onBack={() => setCurrentPage('menu')} />;
      default:
        return <WelcomeScreen onStart={() => setCurrentPage('menu')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 relative overflow-hidden">
      <FloatingAnimations />
      {currentPage !== 'welcome' && (
        <TopNavigation 
          onHome={() => setCurrentPage('menu')}
          onProfile={() => setCurrentPage('profile')}
          onSettings={() => setCurrentPage('settings')}
          onKidzLearn={() => setCurrentPage('welcome')}
        />
      )}
      {renderPage()}
    </div>
  );
};

export default Index;
