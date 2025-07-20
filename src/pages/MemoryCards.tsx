
import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Timer, Target, Plus, Minus, MessageCircle, Clock, Brain, Calendar, Smile, Home, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTextZoom } from "@/contexts/TextZoomContext";
import TextZoomControls from "@/components/TextZoomControls";

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryCards = () => {
  const { textZoom } = useTextZoom();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);

  const cardValues = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌊', '⭐'];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameWon) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  useEffect(() => {
    if (matches === cardValues.length) {
      setGameWon(true);
      setGameStarted(false);
    }
  }, [matches]);

  const initializeGame = () => {
    const gameCards = [...cardValues, ...cardValues]
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false,
      }));
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameStarted(false);
    setGameWon(false);
    setTime(0);
  };

  const handleCardClick = (cardId: number) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched || flippedCards.length >= 2) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update card to be flipped
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstCardId);
      const secondCard = cards.find(c => c.id === secondCardId);

      if (firstCard?.value === secondCard?.value) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstCardId || c.id === secondCardId 
              ? { ...c, isMatched: true } 
              : c
          ));
          setMatches(matches + 1);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            c.id === firstCardId || c.id === secondCardId 
              ? { ...c, isFlipped: false } 
              : c
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScore = () => {
    if (!gameWon) return 0;
    const baseScore = 1000;
    const timeBonus = Math.max(0, 300 - time) * 2;
    const moveBonus = Math.max(0, 20 - moves) * 10;
    return baseScore + timeBonus + moveBonus;
  };

  return (
    <>
      <TextZoomControls />
      <div className={`min-h-screen bg-[#FAF3DD] pb-24 font-[Quicksand] elderly-text-zoom-${textZoom}`} style={{fontSize: `${14 + textZoom * 2}px`}}>
      {/* Header */}
      <header className="bg-[#5E6472] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/games">
              <ArrowLeft size={32} className="text-white" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Memory Cards</h1>
              <p className="text-white/80 text-lg">Match pairs to improve memory</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={initializeGame}
              className="bg-[#AED9E0] text-[#5E6472] p-3 rounded-xl hover:bg-[#9BC9D0] transition-colors"
            >
              <RotateCcw size={28} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-4 mt-6">
        {/* Game Stats */}
        <div className="bg-[#5E6472] text-white rounded-3xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Game Stats</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#AED9E0] rounded-2xl p-4 text-center">
              <Timer size={32} className="mx-auto mb-2 text-[#5E6472]" />
              <p className="text-2xl font-bold text-[#5E6472]">{formatTime(time)}</p>
              <p className="text-lg text-[#5E6472]">Time</p>
            </div>
            <div className="bg-[#B8F2E6] rounded-2xl p-4 text-center">
              <Target size={32} className="mx-auto mb-2 text-[#5E6472]" />
              <p className="text-2xl font-bold text-[#5E6472]">{moves}</p>
              <p className="text-lg text-[#5E6472]">Moves</p>
            </div>
            <div className="bg-[#FFD6A5] rounded-2xl p-4 text-center">
              <Trophy size={32} className="mx-auto mb-2 text-[#5E6472]" />
              <p className="text-2xl font-bold text-[#5E6472]">{matches}/{cardValues.length}</p>
              <p className="text-lg text-[#5E6472]">Matches</p>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-white rounded-3xl p-6 mb-6 border-4 border-[#5E6472]">
          <h3 className="text-2xl font-bold text-[#5E6472] mb-4">Game Board</h3>
          <div className="grid grid-cols-4 gap-4">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`aspect-square rounded-2xl text-5xl font-bold transition-all duration-300 border-4 ${
                  card.isFlipped || card.isMatched
                    ? 'bg-[#B8F2E6] border-[#5E6472] text-[#5E6472]'
                    : 'bg-[#AED9E0] border-[#5E6472] text-[#5E6472] hover:bg-[#9BC9D0]'
                } ${card.isMatched ? 'ring-4 ring-green-400 shadow-lg' : ''}`}
                disabled={card.isFlipped || card.isMatched || flippedCards.length >= 2}
              >
                {card.isFlipped || card.isMatched ? card.value : '❓'}
              </button>
            ))}
          </div>
        </div>

        {/* Game Won Message */}
        {gameWon && (
          <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-3xl p-8 mb-6 border-4 border-green-400">
            <div className="text-center">
              <Trophy className="mx-auto mb-4 text-green-600" size={64} />
              <h2 className="text-4xl font-bold text-green-800 mb-4">Congratulations!</h2>
              <p className="text-xl text-green-700 mb-6">
                You completed the game in {formatTime(time)} with {moves} moves!
              </p>
              <div className="bg-white/70 rounded-2xl p-6 mb-6">
                <p className="text-3xl font-bold text-green-800">Score: {getScore()}</p>
              </div>
              <button
                onClick={initializeGame}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl text-xl font-bold transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-[#DDBDD5] rounded-3xl p-6 border-4 border-purple-300">
          <h3 className="text-2xl font-bold text-[#5E6472] mb-4">How to Play:</h3>
          <ul className="text-lg text-[#5E6472] space-y-3">
            <li>• Tap cards to flip them over</li>
            <li>• Find matching pairs of cards</li>
            <li>• Complete all matches to win</li>
            <li>• Try to finish with fewer moves for a higher score</li>
          </ul>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-[#AED9E0] flex justify-around items-center p-6 rounded-t-3xl shadow-inner">
        <Link to="/" className="text-[#5E6472] text-center">
          <Home size={28} />
          <p className="text-sm font-semibold">Home</p>
        </Link>
        <Link to="/chat" className="text-[#5E6472] text-center">
          <MessageCircle size={28} />
          <p className="text-sm font-semibold">Chats</p>
        </Link>
        <Link to="/appointments" className="text-[#5E6472] text-center">
          <Clock size={28} />
          <p className="text-sm font-semibold">Bookings</p>
        </Link>
        <Link to="/events" className="text-[#5E6472] text-center">
          <div className="flex space-x-1">
            <Calendar size={20} />
            <Utensils size={20} />
          </div>
          <p className="text-sm font-semibold">Events & Food</p>
        </Link>
        <Link to="/games" className="text-[#5E6472] text-center">
          <Brain size={28} />
          <p className="text-sm font-semibold">Games</p>
        </Link>
      </nav>
    </div>
    </>
  );
};

export default MemoryCards;
