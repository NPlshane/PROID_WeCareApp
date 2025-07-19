import { useState } from 'react';
import { ArrowLeft, Brain, Star, Play, Trophy, Timer, Target, Smile, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'memory' | 'logic' | 'word'>('all');

  const games = [
    {
      id: 1,
      title: 'Memory Cards',
      category: 'memory',
      difficulty: 'Easy',
      description: 'Match pairs of cards to improve memory and concentration.',
      rating: 4.8,
      playTime: '5-10 min',
      played: true,
      bestScore: 85,
      icon: '🃏',
      path: '/games/memory-cards',
    },
    {
      id: 2,
      title: 'Word Search',
      category: 'word',
      difficulty: 'Medium',
      description: 'Find hidden words in a grid of letters.',
      rating: 4.6,
      playTime: '10-15 min',
      played: true,
      bestScore: 92,
      icon: '🔤',
    },
    {
      id: 3,
      title: 'Sudoku Puzzles',
      category: 'logic',
      difficulty: 'Hard',
      description: 'Fill the grid with numbers using logic and reasoning.',
      rating: 4.7,
      playTime: '15-25 min',
      played: false,
      bestScore: 0,
      icon: '🔢',
    },
    {
      id: 4,
      title: 'Pattern Recognition',
      category: 'logic',
      difficulty: 'Medium',
      description: 'Identify and complete visual patterns.',
      rating: 4.5,
      playTime: '5-8 min',
      played: true,
      bestScore: 78,
      icon: '🧩',
    },
    {
      id: 5,
      title: 'Crossword Puzzles',
      category: 'word',
      difficulty: 'Medium',
      description: 'Classic crossword puzzles with varying themes.',
      rating: 4.9,
      playTime: '20-30 min',
      played: true,
      bestScore: 95,
      icon: '📝',
    },
    {
      id: 6,
      title: 'Number Sequence',
      category: 'memory',
      difficulty: 'Easy',
      description: 'Remember and repeat number sequences.',
      rating: 4.4,
      playTime: '3-5 min',
      played: false,
      bestScore: 0,
      icon: '🔢',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-[#B8F2E6] text-[#5E6472]';
      case 'Medium': return 'bg-[#FFD6A5] text-[#5E6472]';
      case 'Hard': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredGames = selectedCategory === 'all' 
    ? games 
    : games.filter(game => game.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF3DD] pb-24 font-[Quicksand]">
      {/* Header */}
      <header className="bg-[#5E6472] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-white">
              <ArrowLeft size={32} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Games</h1>
              <p className="text-white/80 text-lg">Keep your mind sharp</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center">
            <div className="text-[#5E6472] text-sm font-semibold">Text Size</div>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <button className="w-6 h-6 bg-slate-300 rounded text-[#5E6472]">-</button>
              <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center text-[#5E6472] font-bold">3</div>
              <button className="w-6 h-6 bg-slate-300 rounded text-[#5E6472]">+</button>
            </div>
          </div>
        </div>
      </header>

      {/* Games Grid */}
      <section className="mx-4 mt-6">
        <h2 className="text-2xl font-bold text-[#5E6472] mb-4">Brain Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="bg-[#B8F2E6] rounded-2xl p-6 border border-[#5E6472] shadow"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-5xl bg-[#AED9E0] p-4 rounded-xl">{game.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#5E6472] mb-2">{game.title}</h3>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-4 py-2 rounded-full text-lg font-bold ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Star className="text-yellow-500" size={20} fill="currentColor" />
                      <span className="text-lg font-bold text-[#5E6472]">{game.rating}</span>
                    </div>
                  </div>
                  <p className="text-[#5E6472] text-lg">{game.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 text-lg text-[#5E6472]">
                <div className="flex items-center space-x-2">
                  <Timer size={20} />
                  <span>{game.playTime}</span>
                </div>
                {game.played && (
                  <div className="flex items-center space-x-2">
                    <Trophy size={20} />
                    <span>Best: {game.bestScore}%</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                {game.path ? (
                  <Link
                    to={game.path}
                    className="flex-1 py-4 px-6 bg-[#AED9E0] text-[#5E6472] rounded-xl font-bold text-lg hover:bg-blue-300 flex items-center justify-center space-x-3"
                  >
                    <Play size={24} />
                    <span>{game.played ? 'Play Again' : 'Start Game'}</span>
                  </Link>
                ) : (
                  <button className="flex-1 py-4 px-6 bg-[#AED9E0] text-[#5E6472] rounded-xl font-bold text-lg hover:bg-blue-300 flex items-center justify-center space-x-3">
                    <Play size={24} />
                    <span>{game.played ? 'Play Again' : 'Start Game'}</span>
                  </button>
                )}
                <button className="px-6 py-4 bg-[#DDBDD5] text-[#5E6472] rounded-xl font-bold text-lg hover:bg-purple-300">
                  ℹ️
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-[#AED9E0] flex justify-around items-center p-4 rounded-t-3xl shadow-inner">
        <Link to="/" className="text-[#5E6472] text-center">
          <Smile size={28} />
          <p className="text-sm">Home</p>
        </Link>
        <Link to="/chat" className="text-[#5E6472] text-center">
          <Smile size={28} />
          <p className="text-sm">Chats</p>
        </Link>
        <Link to="/appointments" className="text-[#5E6472] text-center">
          <Clock size={28} />
          <p className="text-sm">Bookings</p>
        </Link>
        <Link to="/food-map" className="text-[#5E6472] text-center">
          <Smile size={28} />
          <p className="text-sm">Food</p>
        </Link>
        <Link to="/games" className="text-[#5E6472] text-center">
          <Brain size={28} />
          <p className="text-sm">Games</p>
        </Link>
      </nav>
    </div>
  );
};

export default Games;
