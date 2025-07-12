import React, { useState, useEffect } from 'react';
import { ChevronLeft, RotateCcw, Star, VolumeX, Volume2 } from 'lucide-react';
import { voiceFeedback } from '../../utils/voiceFeedback';
import RocketAnimation from '../ui/RocketAnimation';

interface Shape {
  id: string;
  type: 'circle' | 'square' | 'triangle' | 'hexagon';
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange';
  sorted: boolean;
}

interface ShapeSortingProps {
  onBack: () => void;
}

const ShapeSorting: React.FC<ShapeSortingProps> = ({ onBack }) => {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [sortingMode, setSortingMode] = useState<'color' | 'type'>('color');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [draggedShape, setDraggedShape] = useState<Shape | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [showRocket, setShowRocket] = useState(false);

  const shapeTypes = ['circle', 'square', 'triangle', 'hexagon'];
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

  useEffect(() => {
    voiceFeedback.setEnabled(voiceEnabled);
  }, [voiceEnabled]);

  const generateShapes = () => {
    const newShapes: Shape[] = [];
    const shapesPerLevel = Math.min(6 + level * 2, 12);
    
    for (let i = 0; i < shapesPerLevel; i++) {
      newShapes.push({
        id: `shape-${i}`,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)] as Shape['type'],
        color: colors[Math.floor(Math.random() * colors.length)] as Shape['color'],
        sorted: false
      });
    }
    setShapes(newShapes);
    setGameCompleted(false);
  };

  useEffect(() => {
    generateShapes();
  }, [level]);

  useEffect(() => {
    const allSorted = shapes.length > 0 && shapes.every(shape => shape.sorted);
    if (allSorted && !gameCompleted) {
      setGameCompleted(true);
      setScore(score + level * 10);
      
      const newConsecutive = consecutiveCorrect + 1;
      setConsecutiveCorrect(newConsecutive);
      
      if (newConsecutive === 3) {
        setShowRocket(true);
        setConsecutiveCorrect(0);
      }
      
      voiceFeedback.levelComplete();
      setTimeout(() => {
        if (level < 5) {
          setLevel(level + 1);
          setSortingMode(level % 2 === 0 ? 'type' : 'color');
        } else {
          voiceFeedback.gameComplete();
        }
      }, 2000);
    }
  }, [shapes, gameCompleted, level, score, consecutiveCorrect]);

  const handleDragStart = (shape: Shape) => {
    setDraggedShape(shape);
  };

  const handleDrop = (targetCategory: string) => {
    if (!draggedShape) return;

    const isCorrect = sortingMode === 'color' 
      ? draggedShape.color === targetCategory
      : draggedShape.type === targetCategory;

    if (isCorrect) {
      setShapes(shapes.map(shape => 
        shape.id === draggedShape.id 
          ? { ...shape, sorted: true }
          : shape
      ));
      voiceFeedback.excellent();
    } else {
      // Shake animation for wrong answer
      const element = document.getElementById(`shape-${draggedShape.id}`);
      if (element) {
        element.classList.add('animate-pulse');
        setTimeout(() => element.classList.remove('animate-pulse'), 500);
      }
      setConsecutiveCorrect(0);
      voiceFeedback.encouragement();
    }
    setDraggedShape(null);
  };

  const resetGame = () => {
    setLevel(1);
    setScore(0);
    setSortingMode('color');
    setConsecutiveCorrect(0);
    generateShapes();
  };

  const getShapeElement = (shape: Shape) => {
    const baseClasses = `w-16 h-16 mx-2 my-2 cursor-move transition-all duration-200 hover:scale-110 ${
      shape.sorted ? 'opacity-50' : ''
    }`;

    const style = { backgroundColor: shape.color };

    switch (shape.type) {
      case 'circle':
        return (
          <div
            key={shape.id}
            id={`shape-${shape.id}`}
            className={`${baseClasses} rounded-full`}
            style={style}
            draggable
            onDragStart={() => handleDragStart(shape)}
          />
        );
      case 'square':
        return (
          <div
            key={shape.id}
            id={`shape-${shape.id}`}
            className={baseClasses}
            style={style}
            draggable
            onDragStart={() => handleDragStart(shape)}
          />
        );
      case 'triangle':
        return (
          <div
            key={shape.id}
            id={`shape-${shape.id}`}
            className={`${baseClasses} triangle`}
            style={{
              width: 0,
              height: 0,
              backgroundColor: 'transparent',
              borderLeft: '32px solid transparent',
              borderRight: '32px solid transparent',
              borderBottom: `56px solid ${shape.color}`,
            }}
            draggable
            onDragStart={() => handleDragStart(shape)}
          />
        );
      case 'hexagon':
        return (
          <div
            key={shape.id}
            id={`shape-${shape.id}`}
            className={`${baseClasses} hexagon`}
            style={{
              width: '60px',
              height: '34px',
              backgroundColor: shape.color,
              position: 'relative',
            }}
            draggable
            onDragStart={() => handleDragStart(shape)}
          >
            <div
              style={{
                position: 'absolute',
                top: '-17px',
                left: 0,
                width: 0,
                height: 0,
                borderLeft: '30px solid transparent',
                borderRight: '30px solid transparent',
                borderBottom: `17px solid ${shape.color}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-17px',
                left: 0,
                width: 0,
                height: 0,
                borderLeft: '30px solid transparent',
                borderRight: '30px solid transparent',
                borderTop: `17px solid ${shape.color}`,
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const getSortingBins = () => {
    if (sortingMode === 'color') {
      return colors.map(color => (
        <div
          key={color}
          className="w-32 h-32 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center m-2 bg-white bg-opacity-50"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(color)}
        >
          <div className="text-center">
            <div className={`w-8 h-8 rounded-full mx-auto mb-2`} style={{ backgroundColor: color }} />
            <span className="text-sm font-bold capitalize">{color}</span>
          </div>
        </div>
      ));
    } else {
      return shapeTypes.map(type => (
        <div
          key={type}
          className="w-32 h-32 border-4 border-dashed border-gray-400 rounded-lg flex items-center justify-center m-2 bg-white bg-opacity-50"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(type)}
        >
          <div className="text-center">
            <div className="mb-2">
              {type === 'circle' && <div className="w-8 h-8 bg-gray-600 rounded-full mx-auto" />}
              {type === 'square' && <div className="w-8 h-8 bg-gray-600 mx-auto" />}
              {type === 'triangle' && (
                <div 
                  className="mx-auto"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '16px solid transparent',
                    borderRight: '16px solid transparent',
                    borderBottom: '28px solid #4b5563',
                  }}
                />
              )}
              {type === 'hexagon' && (
                <div 
                  className="mx-auto bg-gray-600 relative"
                  style={{ width: '30px', height: '17px' }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      left: 0,
                      width: 0,
                      height: 0,
                      borderLeft: '15px solid transparent',
                      borderRight: '15px solid transparent',
                      borderBottom: '8px solid #4b5563',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-8px',
                      left: 0,
                      width: 0,
                      height: 0,
                      borderLeft: '15px solid transparent',
                      borderRight: '15px solid transparent',
                      borderTop: '8px solid #4b5563',
                    }}
                  />
                </div>
              )}
            </div>
            <span className="text-sm font-bold capitalize">{type}</span>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      <RocketAnimation 
        show={showRocket} 
        onComplete={() => setShowRocket(false)} 
      />
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-24 left-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Voice Toggle Button */}
      <button
        onClick={() => setVoiceEnabled(!voiceEnabled)}
        className="absolute top-24 right-20 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        {voiceEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="absolute top-24 right-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        <RotateCcw size={24} />
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
          Shape Sorting
        </h1>
        <div className="text-4xl mb-4">🔷</div>
        <p className="text-xl text-white drop-shadow-lg">
          Sort by {sortingMode === 'color' ? 'Color' : 'Shape'}
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="bg-white bg-opacity-90 rounded-lg px-4 py-2">
            <span className="text-purple-600 font-bold">Level: {level}</span>
          </div>
          <div className="bg-white bg-opacity-90 rounded-lg px-4 py-2">
            <span className="text-purple-600 font-bold">Score: {score}</span>
          </div>
        </div>
      </div>

      {gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
            <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-purple-600 mb-2">Level Complete!</h2>
            <p className="text-xl text-gray-600">Great job sorting!</p>
            {level < 5 && (
              <p className="text-lg text-purple-600 mt-2">Next: Sort by {level % 2 === 0 ? 'Type' : 'Color'}</p>
            )}
          </div>
        </div>
      )}

      {/* Shapes to Sort */}
      <div className="bg-white bg-opacity-90 rounded-2xl p-6 mb-8 w-full max-w-4xl">
        <h3 className="text-2xl font-bold text-purple-600 text-center mb-4">Shapes to Sort</h3>
        <div className="flex flex-wrap justify-center">
          {shapes.filter(shape => !shape.sorted).map(shape => getShapeElement(shape))}
        </div>
      </div>

      {/* Sorting Bins */}
      <div className="bg-white bg-opacity-90 rounded-2xl p-6 w-full max-w-6xl">
        <h3 className="text-2xl font-bold text-purple-600 text-center mb-4">
          Sort by {sortingMode === 'color' ? 'Color' : 'Shape'}
        </h3>
        <div className="flex flex-wrap justify-center">
          {getSortingBins()}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-white bg-opacity-90 rounded-2xl p-4 w-full max-w-2xl">
        <p className="text-center text-purple-600 font-semibold">
          Drag and drop shapes into the correct bins!
        </p>
      </div>
    </div>
  );
};

export default ShapeSorting;
