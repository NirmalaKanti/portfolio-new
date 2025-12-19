import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Volume2 } from "lucide-react";

const twisters = [
  {
    id: 1,
    text: "She sells seashells by the seashore.",
    difficulty: "Easy",
    attempts: 0,
  },
  {
    id: 2,
    text: "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    difficulty: "Medium",
    attempts: 0,
  },
  {
    id: 3,
    text: "Red lorry, yellow lorry.",
    difficulty: "Easy",
    attempts: 0,
  },
  {
    id: 4,
    text: "I scream, you scream, we all scream for ice cream!",
    difficulty: "Medium",
    attempts: 0,
  },
  {
    id: 5,
    text: "Unique New York, you need New York.",
    difficulty: "Hard",
    attempts: 0,
  },
  {
    id: 6,
    text: "Toy boat. Toy boat. Toy boat. (3x fast)",
    difficulty: "Hard",
    attempts: 0,
  },
  {
    id: 7,
    text: "Sister Susie's sewing socks for soldiers.",
    difficulty: "Hard",
    attempts: 0,
  },
  {
    id: 8,
    text: "Pad kid poured curd pulled cod.",
    difficulty: "Impossible",
    attempts: 0,
  },
];

export default function TongueTwisters() {
  const [, navigate] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attemptCounts, setAttemptCounts] = useState<{ [key: number]: number }>({});
  const [successList, setSuccessList] = useState<number[]>([]);

  const current = twisters[currentIndex];
  const attempts = attemptCounts[current.id] || 0;
  const isSuccessful = successList.includes(current.id);

  const backgrounds = [
    "from-blue-50 via-white to-blue-50",
    "from-blue-50 via-gray-50 to-white",
    "from-white via-blue-50 to-white",
  ];

  const recordAttempt = () => {
    setAttemptCounts({
      ...attemptCounts,
      [current.id]: (attemptCounts[current.id] || 0) + 1,
    });
  };

  const markSuccess = () => {
    if (!isSuccessful) {
      setSuccessList([...successList, current.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex < twisters.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const getDiffColor = (diff: string) => {
    switch (diff) {
      case "Easy":
        return "from-green-500 to-emerald-500";
      case "Medium":
        return "from-yellow-500 to-orange-500";
      case "Hard":
        return "from-red-500 to-pink-500";
      case "Impossible":
        return "from-purple-500 to-indigo-500";
      default:
        return "from-blue-500 to-cyan-500";
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgrounds[currentIndex % backgrounds.length]} text-gray-900`}>
      {/* Navigation */}
      <nav className="sticky top-0 backdrop-blur-xl bg-white/80 border-b border-gray-200 px-6 py-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold"
          >
            👅 Tongue Twisters
          </motion.h1>
          <div className="text-sm text-gray-600">
            {currentIndex + 1} / {twisters.length}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <div className="grid grid-cols-3 gap-4 text-center mb-8">
              <Card className="bg-black/40 backdrop-blur border-white/10 p-6">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-red-400">{successList.length}</div>
                <div className="text-xs text-gray-400">Mastered</div>
              </Card>
              <Card className="bg-black/40 backdrop-blur border-white/10 p-6">
                <div className="text-3xl mb-2">🔄</div>
                <div className="text-2xl font-bold text-yellow-400">{attempts}</div>
                <div className="text-xs text-gray-400">Attempts</div>
              </Card>
              <Card className="bg-black/40 backdrop-blur border-white/10 p-6">
                <div className="text-3xl mb-2">👏</div>
                <div className="text-2xl font-bold text-blue-400">
                  {Math.round((successList.length / twisters.length) * 100)}%
                </div>
                <div className="text-xs text-gray-400">Complete</div>
              </Card>
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 p-12 mb-8 relative overflow-hidden min-h-96 flex flex-col justify-center">
              <div className={`absolute inset-0 bg-gradient-to-br ${getDiffColor(current.difficulty)} opacity-5`} />

              <div className="relative z-10">
                {/* Difficulty */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${getDiffColor(current.difficulty)} text-white text-sm font-semibold mb-8`}
                >
                  {current.difficulty}
                </motion.span>

                {/* Tongue Twister */}
                <motion.h2
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-6xl font-bold mb-12 leading-tight text-white text-center"
                >
                  {current.text}
                </motion.h2>

                {/* Audio Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-center mb-12"
                >
                  <Button
                    className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold px-8"
                    size="lg"
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    Hear It (Example)
                  </Button>
                </motion.div>

                {/* Challenge Text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-gray-300 mb-8"
                >
                  Try to say it 3 times as fast as you can! 🚀
                </motion.p>

                {/* Attempts Display */}
                {attempts > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 text-center mb-8"
                  >
                    <p className="text-yellow-400 font-semibold">
                      You've tried {attempts} time{attempts !== 1 ? "s" : ""} 
                      {isSuccessful && " - Great job! 🎉"}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Buttons */}
              <div className="relative z-10 flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={() => {
                    recordAttempt();
                    markSuccess();
                  }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8"
                  size="lg"
                >
                  ✓ I Did It!
                </Button>
                <Button
                  onClick={recordAttempt}
                  variant="outline"
                  className="border-white/20 hover:bg-white/10 text-white font-semibold px-8"
                  size="lg"
                >
                  Try Again
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
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
              {twisters.map((t, idx) => (
                <motion.button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                    currentIndex === idx
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white scale-110"
                      : successList.includes(t.id)
                      ? "bg-green-500/30 text-green-400 border border-green-500/50"
                      : "bg-white/10 text-gray-400 hover:bg-white/20 border border-white/10"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {successList.includes(t.id) ? "✓" : idx + 1}
                </motion.button>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentIndex === twisters.length - 1}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 disabled:opacity-50 text-white font-semibold flex-1 md:flex-none"
              size="lg"
            >
              Next →
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
