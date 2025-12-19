import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Volume2 } from "lucide-react";

const puzzles = [
  {
    id: 1,
    question: "What has hands but cannot clap?",
    answer: "A clock",
    explanation: "A clock has hour and minute hands, but they are inanimate and cannot clap together.",
    difficulty: "Easy",
  },
  {
    id: 2,
    question: "I have keys but no locks. I have space but no room. You can enter, but you can't go outside. What am I?",
    answer: "A keyboard",
    explanation: "A keyboard has keys, a space bar, and an enter key, but it's just a computer input device.",
    difficulty: "Medium",
  },
  {
    id: 3,
    question: "What can travel around the world while staying in a corner?",
    answer: "A stamp",
    explanation: "A postage stamp travels around the world on mail while it remains in the corner of an envelope.",
    difficulty: "Medium",
  },
  {
    id: 4,
    question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
    answer: "An echo",
    explanation: "An echo is a reflected sound that 'speaks' without a mouth and is influenced by the wind and environment.",
    difficulty: "Hard",
  },
  {
    id: 5,
    question: "What gets wetter the more it dries?",
    answer: "A towel",
    explanation: "A towel gets wet as it dries things, absorbing moisture while performing its drying function.",
    difficulty: "Easy",
  },
  {
    id: 6,
    question: "What can run but never walks, has a mouth but never talks, has a head but never weeps, has a bed but never sleeps?",
    answer: "A river",
    explanation: "A river runs (flows), has a mouth where it meets the ocean, has a head (source), and has a river bed.",
    difficulty: "Hard",
  },
];

export default function Puzzles() {
  const [, navigate] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);

  const current = puzzles[currentIndex];
  const isCompleted = completed.includes(current.id);

  const handleNext = () => {
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const markComplete = () => {
    if (!isCompleted) {
      setCompleted([...completed, current.id]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "from-green-500 to-emerald-500";
      case "Medium":
        return "from-yellow-500 to-orange-500";
      case "Hard":
        return "from-red-500 to-pink-500";
      default:
        return "from-blue-500 to-cyan-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900/20 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 backdrop-blur-xl bg-black/40 border-b border-white/10 px-6 py-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold"
          >
            🧩 Puzzles
          </motion.h1>
          <div className="text-sm text-gray-400">
            {currentIndex + 1} / {puzzles.length}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm font-semibold text-blue-400">
                {completed.length} / {puzzles.length} Solved
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${(completed.length / puzzles.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Main Puzzle Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 p-12 mb-8 relative overflow-hidden">
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getDifficultyColor(current.difficulty)} opacity-5`} />

              <div className="relative z-10">
                {/* Difficulty Badge */}
                <div className="flex items-center gap-4 mb-8">
                  <motion.span
                    className={`px-4 py-2 rounded-full bg-gradient-to-r ${getDifficultyColor(current.difficulty)} text-white text-sm font-semibold`}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                  >
                    {current.difficulty}
                  </motion.span>
                  <motion.span
                    className="text-lg"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    🧠
                  </motion.span>
                </div>

                {/* Question */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
                >
                  <h2 className="text-4xl font-bold mb-6 leading-relaxed text-white">
                    {current.question}
                  </h2>
                </motion.div>

                {/* Answer Section */}
                <AnimatePresence>
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6 mb-8"
                    >
                      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                        <div className="text-sm text-green-400 font-semibold mb-2">ANSWER</div>
                        <div className="text-3xl font-bold text-green-400">{current.answer}</div>
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                        <div className="text-sm text-blue-400 font-semibold mb-2">EXPLANATION</div>
                        <p className="text-blue-100 leading-relaxed">{current.explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 items-center">
                  {!showAnswer ? (
                    <>
                      <Button
                        onClick={() => setShowAnswer(true)}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-8"
                        size="lg"
                      >
                        Reveal Answer
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 hover:bg-white/10 text-white font-semibold px-8"
                        size="lg"
                      >
                        <Volume2 className="w-5 h-5 mr-2" />
                        Read Aloud
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={markComplete}
                      className={`font-semibold px-8 ${
                        isCompleted
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      }`}
                      size="lg"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {isCompleted ? "Marked Complete ✓" : "Mark Complete"}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between"
          >
            <Button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              variant="outline"
              className="border-white/20 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold"
              size="lg"
            >
              ← Previous
            </Button>

            {/* Mini Cards */}
            <div className="hidden sm:flex items-center gap-2 flex-wrap justify-center">
              {puzzles.map((puzzle, idx) => (
                <motion.button
                  key={puzzle.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowAnswer(false);
                  }}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                    currentIndex === idx
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white scale-110"
                      : completed.includes(puzzle.id)
                      ? "bg-green-500/30 text-green-400 border border-green-500/50"
                      : "bg-white/10 text-gray-400 hover:bg-white/20 border border-white/10"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {completed.includes(puzzle.id) ? "✓" : idx + 1}
                </motion.button>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentIndex === puzzles.length - 1}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold"
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
