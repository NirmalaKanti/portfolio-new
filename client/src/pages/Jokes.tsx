import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Laugh } from "lucide-react";

const jokes = [
  {
    id: 1,
    setup: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything!",
    category: "Science",
  },
  {
    id: 2,
    setup: "What do you call a bear with no teeth?",
    punchline: "A gummy bear!",
    category: "Animals",
  },
  {
    id: 3,
    setup: "Why did the scarecrow win an award?",
    punchline: "Because he was outstanding in his field!",
    category: "Work",
  },
  {
    id: 4,
    setup: "Why don't eggs tell jokes?",
    punchline: "They'd crack each other up!",
    category: "Food",
  },
  {
    id: 5,
    setup: "What's the best thing about Switzerland?",
    punchline: "I don't know, but the flag is a big plus!",
    category: "Geography",
  },
  {
    id: 6,
    setup: "Why did the coffee file a police report?",
    punchline: "It got mugged!",
    category: "Food",
  },
  {
    id: 7,
    setup: "What do you call a sleeping bull?",
    punchline: "A bulldozer!",
    category: "Animals",
  },
  {
    id: 8,
    setup: "Why don't skeletons fight each other?",
    punchline: "They don't have the guts!",
    category: "Halloween",
  },
];

export default function Jokes() {
  const [, navigate] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPunchline, setShowPunchline] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const current = jokes[currentIndex];
  const isFavorited = favorites.includes(current.id);

  const backgrounds = [
    "from-purple-950 via-black to-purple-900",
    "from-purple-900 via-black to-purple-950",
    "from-black via-purple-950 to-black",
  ];

  const handleNext = () => {
    if (currentIndex < jokes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowPunchline(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowPunchline(false);
    }
  };

  const toggleFavorite = () => {
    if (isFavorited) {
      setFavorites(favorites.filter((id) => id !== current.id));
    } else {
      setFavorites([...favorites, current.id]);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgrounds[currentIndex % backgrounds.length]} text-white`}>
      {/* Navigation */}
      <nav className="sticky top-0 backdrop-blur-xl bg-black/40 border-b border-white/10 px-6 py-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold"
          >
            😂 Jokes
          </motion.h1>
          <div className="text-sm text-gray-400">
            {currentIndex + 1} / {jokes.length}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 text-center">
            <div className="text-4xl mb-4 animate-bounce">😆</div>
            <p className="text-gray-400">Laughs attempted: <span className="text-orange-400 font-bold">{currentIndex + 1}</span> • Favorites: <span className="text-red-400 font-bold">{favorites.length}</span></p>
          </motion.div>

          {/* Main Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, rotateX: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 p-12 mb-8 relative overflow-hidden min-h-96 flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-yellow-500/10 to-red-500/10" />

              <div className="relative z-10 flex-grow flex flex-col justify-center">
                {/* Category */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-block w-fit px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white text-sm font-semibold mb-8"
                >
                  {current.category}
                </motion.span>

                {/* Setup */}
                <motion.h2
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl font-bold mb-16 leading-tight text-white"
                >
                  {current.setup}
                </motion.h2>

                {/* Punchline */}
                <AnimatePresence>
                  {showPunchline && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 150 }}
                      className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-2xl p-8 mb-8"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-5xl flex-shrink-0">🎭</div>
                        <div>
                          <div className="text-sm text-yellow-400 font-bold mb-2">THE PUNCHLINE</div>
                          <p className="text-3xl font-bold text-yellow-100">{current.punchline}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 flex flex-wrap gap-4 items-center justify-between mt-8"
              >
                {!showPunchline ? (
                  <Button
                    onClick={() => setShowPunchline(true)}
                    className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 text-white font-bold px-8 py-6 text-lg flex-grow md:flex-grow-0"
                    size="lg"
                  >
                    <Laugh className="w-5 h-5 mr-2" />
                    Tell Me the Punchline!
                  </Button>
                ) : (
                  <div className="flex-grow md:flex-grow-0" />
                )}

                <Button
                  onClick={toggleFavorite}
                  variant="outline"
                  className={`border-white/20 font-semibold px-6 ${
                    isFavorited
                      ? "bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                      : "hover:bg-white/10 text-white"
                  }`}
                  size="lg"
                >
                  {isFavorited ? "❤️ Favorited" : "🤍 Add to Favorites"}
                </Button>
              </motion.div>
            </Card>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between gap-4"
          >
            <Button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              variant="outline"
              className="border-white/20 hover:bg-white/10 disabled:opacity-50 text-white flex-1 md:flex-none"
              size="lg"
            >
              ← Previous
            </Button>

            <div className="hidden sm:flex gap-2 flex-wrap justify-center">
              {jokes.map((j, idx) => (
                <motion.button
                  key={j.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowPunchline(false);
                  }}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                    currentIndex === idx
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white scale-110"
                      : favorites.includes(j.id)
                      ? "bg-red-500/30 text-red-400 border border-red-500/50"
                      : "bg-white/10 text-gray-400 hover:bg-white/20 border border-white/10"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {favorites.includes(j.id) ? "❤" : idx + 1}
                </motion.button>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentIndex === jokes.length - 1}
              className="bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 disabled:opacity-50 text-white font-semibold flex-1 md:flex-none"
              size="lg"
            >
              Next →
            </Button>
          </motion.div>

          {/* Favorites List */}
          {favorites.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 pt-8 border-t border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6">❤️ Your Favorite Jokes ({favorites.length})</h3>
              <div className="space-y-4">
                {jokes
                  .filter((j) => favorites.includes(j.id))
                  .map((j) => (
                    <Card
                      key={j.id}
                      className="bg-black/40 backdrop-blur-xl border-white/10 p-6 hover:border-orange-500/50 transition-all"
                    >
                      <p className="text-lg font-semibold mb-2">{j.setup}</p>
                      <p className="text-orange-400">{j.punchline}</p>
                    </Card>
                  ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
