
import React from 'react';
import { Home, Settings, Volume2 } from 'lucide-react';

interface TopNavigationProps {
  onHome: () => void;
  onProfile: () => void;
  onSettings: () => void;
  onKidzLearn: () => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({ onHome, onProfile, onSettings, onKidzLearn }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm shadow-lg z-50 p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo - Clickable */}
        <button
          onClick={onKidzLearn}
          className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200"
        >
          <span className="text-2xl">🌟</span>
          <h2 className="text-xl font-bold text-purple-600">Kidz Learn</h2>
        </button>

        {/* Navigation Icons */}
        <div className="flex space-x-4">
          <button
            onClick={onHome}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
            title="Home"
          >
            <Home size={24} />
          </button>
          
          <button
            onClick={onProfile}
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
            title="Profile"
          >
            <span className="text-xl">👤</span>
          </button>
          
          <button
            onClick={onSettings}
            className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
            title="Settings"
          >
            <Settings size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;
