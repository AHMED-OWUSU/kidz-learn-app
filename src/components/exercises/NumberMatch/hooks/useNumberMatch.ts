
import { useState, useEffect } from 'react';

export const useNumberMatch = () => {
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameComplete, setGameComplete] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set());
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showRocket, setShowRocket] = useState(false);

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
    return num.toString();
  };

  const generateRoundData = () => {
    const baseStart = (currentRound - 1) * 6;
    const numbers = Array.from({ length: 6 }, (_, i) => baseStart + i);
    const words = numbers.map(num => getNumberWord(num));
    
    // Shuffle words for the matching challenge
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    
    return { numbers, words: shuffledWords };
  };

  const [roundData, setRoundData] = useState(() => generateRoundData());

  const playSound = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.7;
      utterance.pitch = 1.2;
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

  const checkMatch = (number: number, word: string) => {
    const correctWord = getNumberWord(number);
    
    if (word === correctWord) {
      // Correct match
      setMatchedPairs(prev => new Set([...prev, number]));
      setScore(prev => prev + 10);
      setSelectedNumber(null);
      setSelectedWord(null);
      
      // Track consecutive correct answers
      const newConsecutive = consecutiveCorrect + 1;
      setConsecutiveCorrect(newConsecutive);
      
      // Trigger rocket animation after 3 consecutive correct
      if (newConsecutive === 3) {
        setShowRocket(true);
        setConsecutiveCorrect(0);
      }
      
      // Celebration sound
      playSound("Excellent!");
      
      // Check if round is complete
      if (matchedPairs.size + 1 >= 6) {
        setTimeout(() => {
          if (currentRound >= 3) {
            setGameComplete(true);
            playSound("Congratulations! You completed all rounds!");
          } else {
            setCurrentRound(prev => prev + 1);
            setMatchedPairs(new Set());
            setRoundData(generateRoundData());
            playSound(`Great job! Round ${currentRound + 1} starting!`);
          }
        }, 1500);
      }
    } else {
      // Wrong match
      setWrongAttempts(prev => prev + 1);
      setConsecutiveCorrect(0); // Reset consecutive correct on wrong answer
      playSound("Try again!");
      
      // Reset selections after a brief pause
      setTimeout(() => {
        setSelectedNumber(null);
        setSelectedWord(null);
      }, 1000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentRound(1);
    setGameComplete(false);
    setSelectedNumber(null);
    setSelectedWord(null);
    setMatchedPairs(new Set());
    setWrongAttempts(0);
    setConsecutiveCorrect(0);
    setRoundData(generateRoundData());
  };

  useEffect(() => {
    setRoundData(generateRoundData());
  }, [currentRound]);

  return {
    score,
    currentRound,
    gameComplete,
    selectedNumber,
    selectedWord,
    matchedPairs,
    wrongAttempts,
    consecutiveCorrect,
    showRocket,
    roundData,
    setSelectedNumber,
    setSelectedWord,
    setShowRocket,
    getNumberWord,
    playSound,
    checkMatch,
    resetGame
  };
};
