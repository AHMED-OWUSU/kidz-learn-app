
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { voiceFeedback } from '../../utils/voiceFeedback';

interface PuzzleGameProps {
  onBack: () => void;
}

interface PuzzlePiece {
  id: number;
  row: number;
  col: number;
  currentRow: number;
  currentCol: number;
  isPlaced: boolean;
}

const PuzzleGame: React.FC<PuzzleGameProps> = ({ onBack }) => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [selectedImage, setSelectedImage] = useState(0);
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [draggedPiece, setDraggedPiece] = useState<number | null>(null);
  const [completedPieces, setCompletedPieces] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const puzzleImages = [
    { src: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=400&fit=crop', name: 'Starry Night' },
    { src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=400&fit=crop', name: 'Beautiful Flowers' },
    { src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=400&fit=crop', name: 'Mountain View' },
    { src: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=400&fit=crop', name: 'Forest Light' }
  ];

  const getDimensions = () => {
    switch (difficulty) {
      case 'easy': return { rows: 3, cols: 3 };
      case 'medium': return { rows: 4, cols: 4 };
      case 'hard': return { rows: 5, cols: 5 };
      default: return { rows: 3, cols: 3 };
    }
  };

  const initializePuzzle = () => {
    const { rows, cols } = getDimensions();
    const newPieces: PuzzlePiece[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newPieces.push({
          id: row * cols + col,
          row,
          col,
          currentRow: Math.floor(Math.random() * rows),
          currentCol: Math.floor(Math.random() * cols),
          isPlaced: false
        });
      }
    }
    
    // Shuffle pieces
    for (let i = newPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tempRow = newPieces[i].currentRow;
      const tempCol = newPieces[i].currentCol;
      newPieces[i].currentRow = newPieces[j].currentRow;
      newPieces[i].currentCol = newPieces[j].currentCol;
      newPieces[j].currentRow = tempRow;
      newPieces[j].currentCol = tempCol;
    }
    
    setPieces(newPieces);
    setCompletedPieces(0);
    setTimeElapsed(0);
    setIsCompleted(false);
    setGameStarted(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, isCompleted]);

  const handleDragStart = (e: React.DragEvent, pieceId: number) => {
    setDraggedPiece(pieceId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetRow: number, targetCol: number) => {
    e.preventDefault();
    if (draggedPiece === null) return;

    const draggedPieceData = pieces[draggedPiece];
    const targetPiece = pieces.find(p => p.currentRow === targetRow && p.currentCol === targetCol);

    setPieces(prevPieces => {
      const newPieces = [...prevPieces];
      
      if (targetPiece) {
        // Swap positions
        const draggedIndex = draggedPiece;
        const targetIndex = pieces.indexOf(targetPiece);
        
        newPieces[draggedIndex].currentRow = targetRow;
        newPieces[draggedIndex].currentCol = targetCol;
        newPieces[targetIndex].currentRow = draggedPieceData.currentRow;
        newPieces[targetIndex].currentCol = draggedPieceData.currentCol;
      } else {
        // Move to empty position
        newPieces[draggedPiece].currentRow = targetRow;
        newPieces[draggedPiece].currentCol = targetCol;
      }

      // Check if piece is correctly placed
      newPieces[draggedPiece].isPlaced = 
        newPieces[draggedPiece].currentRow === newPieces[draggedPiece].row &&
        newPieces[draggedPiece].currentCol === newPieces[draggedPiece].col;

      return newPieces;
    });

    setDraggedPiece(null);
  };

  useEffect(() => {
    const completed = pieces.filter(p => p.isPlaced).length;
    setCompletedPieces(completed);
    
    if (completed === pieces.length && pieces.length > 0) {
      setIsCompleted(true);
      voiceFeedback.excellent();
    }
  }, [pieces]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const { rows, cols } = getDimensions();

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
        <button
          onClick={onBack}
          className="absolute top-24 left-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
            Puzzle Game 🧩
          </h1>
          <p className="text-xl text-white drop-shadow-lg mb-8">
            Choose your difficulty and image to start solving!
          </p>
        </div>

        {/* Difficulty Selection */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white text-center mb-4">Choose Difficulty</h3>
          <div className="flex gap-4">
            {(['easy', 'medium', 'hard'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-6 py-3 rounded-xl font-bold text-lg transition-all duration-200 ${
                  difficulty === level
                    ? 'bg-yellow-400 text-purple-600 scale-110'
                    : 'bg-white bg-opacity-90 text-purple-600 hover:scale-105'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
                <div className="text-sm opacity-75">
                  {level === 'easy' && '3×3'}
                  {level === 'medium' && '4×4'}
                  {level === 'hard' && '5×5'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Image Selection */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white text-center mb-4">Choose Your Puzzle</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {puzzleImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
                  selectedImage === index
                    ? 'ring-4 ring-yellow-400 scale-110'
                    : 'hover:scale-105'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.name}
                  className="w-24 h-24 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 text-center">
                  {image.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={initializePuzzle}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Start Puzzle! 🎯
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      <button
        onClick={onBack}
        className="absolute top-24 left-6 bg-white bg-opacity-90 text-purple-600 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Game Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
          {puzzleImages[selectedImage].name} Puzzle
        </h1>
        <div className="flex justify-center gap-4 text-lg font-bold text-white">
          <span className="bg-blue-500 px-4 py-2 rounded-full">
            Time: {formatTime(timeElapsed)}
          </span>
          <span className="bg-green-500 px-4 py-2 rounded-full">
            Progress: {completedPieces}/{pieces.length}
          </span>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="bg-purple-500 px-4 py-2 rounded-full hover:scale-105 transition-all duration-200 flex items-center gap-2"
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div className="mb-6">
          <img
            src={puzzleImages[selectedImage].src}
            alt="Preview"
            className="w-32 h-32 rounded-xl shadow-lg border-4 border-white"
          />
        </div>
      )}

      {/* Puzzle Grid */}
      <div className="relative">
        <div 
          className="grid gap-1 bg-white p-2 rounded-xl shadow-2xl"
          style={{ 
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            width: '400px',
            height: '400px'
          }}
        >
          {Array.from({ length: rows * cols }).map((_, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const piece = pieces.find(p => p.currentRow === row && p.currentCol === col);
            
            return (
              <div
                key={index}
                className={`relative border-2 border-dashed border-gray-300 rounded ${
                  piece?.isPlaced ? 'border-green-400 bg-green-50' : ''
                }`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, row, col)}
              >
                {piece && (
                  <div
                    draggable
                    onDragStart={(e) => handleDragStart(e, pieces.indexOf(piece))}
                    className={`w-full h-full cursor-move rounded transition-all duration-200 ${
                      piece.isPlaced 
                        ? 'opacity-100 ring-2 ring-green-400' 
                        : 'opacity-90 hover:opacity-100 hover:scale-105'
                    }`}
                    style={{
                      backgroundImage: `url(${puzzleImages[selectedImage].src})`,
                      backgroundSize: `${cols * 100}% ${rows * 100}%`,
                      backgroundPosition: `${(piece.col / (cols - 1)) * 100}% ${(piece.row / (rows - 1)) * 100}%`
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={initializePuzzle}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-200 flex items-center gap-2"
        >
          <RotateCcw size={20} />
          Reset Puzzle
        </button>
      </div>

      {/* Completion Modal */}
      {isCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              Puzzle Completed!
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              You solved the {puzzleImages[selectedImage].name} puzzle in {formatTime(timeElapsed)}!
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={initializePuzzle}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-200"
              >
                Play Again
              </button>
              <button
                onClick={() => setGameStarted(false)}
                className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-200"
              >
                New Puzzle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PuzzleGame;
