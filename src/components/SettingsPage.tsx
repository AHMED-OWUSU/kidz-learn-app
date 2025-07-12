
import React, { useState } from 'react';
import { ChevronLeft, Volume2, VolumeX } from 'lucide-react';
import { voiceFeedback } from '../utils/voiceFeedback';

interface SettingsPageProps {
  onBack: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(voiceFeedback.isVoiceEnabled());
  const [difficulty, setDifficulty] = useState('medium');
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [showHints, setShowHints] = useState(true);

  const handleVoiceToggle = () => {
    const newVoiceState = !voiceEnabled;
    setVoiceEnabled(newVoiceState);
    voiceFeedback.setEnabled(newVoiceState);
    
    if (newVoiceState) {
      voiceFeedback.speak("Voice feedback is now enabled!");
    }
  };

  const SettingItem = ({ 
    title, 
    description, 
    children 
  }: { 
    title: string; 
    description: string; 
    children: React.ReactNode; 
  }) => (
    <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-purple-600 mb-1">{title}</h3>
          <p className="text-purple-500 text-sm">{description}</p>
        </div>
        <div className="ml-4">
          {children}
        </div>
      </div>
    </div>
  );

  const Toggle = ({ 
    checked, 
    onChange, 
    icon 
  }: { 
    checked: boolean; 
    onChange: () => void; 
    icon?: React.ReactNode; 
  }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-12 w-20 items-center rounded-full transition-colors duration-200 ${
        checked ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-10 w-10 transform rounded-full bg-white shadow-lg transition-transform duration-200 flex items-center justify-center ${
          checked ? 'translate-x-9' : 'translate-x-1'
        }`}
      >
        {icon}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 pt-24">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-24 left-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
          Settings
        </h1>
        <div className="text-4xl mb-4">⚙️</div>
        <p className="text-xl text-white drop-shadow-lg">
          Customize your learning experience
        </p>
      </div>

      {/* Settings List */}
      <div className="w-full max-w-3xl space-y-6">
        <SettingItem
          title="Sound Effects"
          description="Play sound effects during games"
        >
          <Toggle
            checked={soundEnabled}
            onChange={() => setSoundEnabled(!soundEnabled)}
            icon={soundEnabled ? <Volume2 size={20} className="text-green-600" /> : <VolumeX size={20} className="text-gray-400" />}
          />
        </SettingItem>

        <SettingItem
          title="Voice Feedback"
          description="Hear encouraging voice messages"
        >
          <Toggle
            checked={voiceEnabled}
            onChange={handleVoiceToggle}
            icon={<span className="text-sm">{voiceEnabled ? '🔊' : '🔇'}</span>}
          />
        </SettingItem>

        <SettingItem
          title="Game Difficulty"
          description="Choose your preferred difficulty level"
        >
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-purple-100 border-2 border-purple-300 rounded-lg px-4 py-2 text-purple-700 font-semibold focus:outline-none focus:border-purple-500"
          >
            <option value="easy">Easy 😊</option>
            <option value="medium">Medium 🙂</option>
            <option value="hard">Hard 😎</option>
          </select>
        </SettingItem>

        <SettingItem
          title="Auto Advance"
          description="Automatically move to next level after completion"
        >
          <Toggle
            checked={autoAdvance}
            onChange={() => setAutoAdvance(!autoAdvance)}
            icon={<span className="text-sm">{autoAdvance ? '⏭️' : '⏸️'}</span>}
          />
        </SettingItem>

        <SettingItem
          title="Show Hints"
          description="Display helpful hints during games"
        >
          <Toggle
            checked={showHints}
            onChange={() => setShowHints(!showHints)}
            icon={<span className="text-sm">{showHints ? '💡' : '🚫'}</span>}
          />
        </SettingItem>
      </div>

      {/* Reset Section */}
      <div className="mt-8 w-full max-w-3xl">
        <div className="bg-red-100 bg-opacity-90 rounded-xl p-6 shadow-lg border-2 border-red-200">
          <h3 className="text-lg font-bold text-red-600 mb-2">Reset Progress</h3>
          <p className="text-red-500 text-sm mb-4">This will reset all your game progress and achievements</p>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                alert('Progress reset! (This is just a demo)');
              }
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Reset All Progress
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="mt-6 bg-white bg-opacity-50 rounded-xl p-4 w-full max-w-3xl text-center">
        <p className="text-purple-600 text-sm">
          Kidz Learn v1.0 • Made with ❤️ for little learners
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
