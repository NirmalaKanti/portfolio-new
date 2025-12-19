import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const riddles = [
  {
    id: 1,
    riddle: "What word becomes shorter when you add two letters to it?",
    answer: "Short (add 'er' = Shorter)",
    hint: "Think about the word itself",
    difficulty: "Hard",
  },
  {
    id: 2,
    riddle: "What is full of keys but cannot open any door?",
    answer: "A piano",
    hint: "It's a musical instrument",
    difficulty: "Easy",
  },
  {
    id: 3,
    riddle: "I have a face and two hands, but no arms or legs. What am I?",
    answer: "A clock",
    hint: "You use me to tell time",
    difficulty: "Easy",
  },
  {
    id: 4,
    riddle: "What has a neck but no head?",
    answer: "A bottle",
    hint: "Used for drinks",
    difficulty: "Easy",
  },
  {
    id: 5,
    riddle: "What can be cracked, made, told, and played?",
    answer: "A joke",
    hint: "Something funny",
    difficulty: "Medium",
  },
  {
    id: 6,
    riddle: "I'm tall when I'm young, and I'm short when I'm old. What am I?",
    answer: "A candle",
    hint: "Burns at night",
    difficulty: "Medium",
  },
];

export default function Riddles() {
  const [, navigate] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [solved, setSolved] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const current = riddles[currentIndex];
  const isSolved = solved.includes(current.id);

  const backgrounds = isDark
    ? ["from-purple-950 via-black to-purple-900", "from-purple-900 via-black to-purple-950", "from-black via-purple-950 to-black"]
    : ["from-blue-50 via-white to-blue-50", "from-blue-50 via-gray-50 to-white", "from-white via-blue-50 to-white"];

  const checkAnswer = () => {
    if (inputValue.toLowerCase().includes(current.answer.toLowerCase().split("(")[0].trim())) {
      setSolved([...solved, current.id]);
      setShowAnswer(true);
    }
  };

  const revealAnswer = () => {
    setShowAnswer(true);
    if (!isSolved) {
      setSolved([...solved, current.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex < riddles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setShowHint(false);
      setInputValue("");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
      setShowHint(false);
      setInputValue("");
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgrounds[currentIndex % backgrounds.length]} transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"} relative overflow-hidden`}>
      {/* Animated Background Elements */}
      {!isDark && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-15 animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-200 rounded-full blur-3xl opacity-15 animate-pulse delay-700" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-10 animate-pulse delay-1000" />
        </div>
      )}
      {/* Navigation */}
      <nav className={`sticky top-0 backdrop-blur-xl transition-colors duration-300 ${isDark ? "bg-black/40 border-b border-white/10" : "bg-white/80 border-b border-gray-200"} px-6 py-4 z-50 relative`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className={`flex items-center gap-2 transition-colors ${isDark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"}`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold"
          >
            🔍 Riddles
          </motion.h1>
          <div className="flex items-center gap-4">
            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {currentIndex + 1} / {riddles.length}
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDark ? "bg-white/10 hover:bg-white/20 text-yellow-400" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Solved</span>
              <span className="text-sm font-semibold text-purple-400">
                {solved.length} / {riddles.length}
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: `${(solved.length / riddles.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 p-12 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />

              <div className="relative z-10">
                {/* Difficulty */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold">
                    {current.difficulty}
                  </span>
                  <span className="text-3xl animate-spin" style={{ animationDuration: "3s" }}>
                    🔍
                  </span>
                </div>

                {/* Riddle */}
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold mb-12 leading-relaxed text-white"
                >
                  {current.riddle}
                </motion.h2>

                {/* Hint */}
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-8"
                  >
                    <div className="text-sm text-yellow-400 font-semibold mb-2">💡 HINT</div>
                    <p className="text-yellow-100">{current.hint}</p>
                  </motion.div>
                )}

                {/* Answer */}
                <AnimatePresence>
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8"
                    >
                      <div className="text-sm text-green-400 font-semibold mb-2">✓ ANSWER</div>
                      <p className="text-2xl font-bold text-green-400">{current.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Input */}
                {!showAnswer && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-8"
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && checkAnswer()}
                      placeholder="Type your answer here..."
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                    />
                  </motion.div>
                )}

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  {!showAnswer ? (
                    <>
                      <Button
                        onClick={checkAnswer}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
                        size="lg"
                      >
                        Check Answer
                      </Button>
                      <Button
                        onClick={() => setShowHint(!showHint)}
                        variant="outline"
                        className="border-white/20 hover:bg-white/10 text-white"
                        size="lg"
                      >
                        💡 {showHint ? "Hide" : "Show"} Hint
                      </Button>
                      <Button
                        onClick={revealAnswer}
                        variant="outline"
                        className="border-yellow-500/30 hover:bg-yellow-500/10 text-yellow-400 ml-auto"
                        size="lg"
                      >
                        Give Up
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                      size="lg"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Solved! ✓
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Navigation */}
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
              className="border-white/20 hover:bg-white/10 disabled:opacity-50 text-white"
              size="lg"
            >
              ← Previous
            </Button>

            <div className="hidden sm:flex gap-2 flex-wrap justify-center">
              {riddles.map((r, idx) => (
                <motion.button
                  key={r.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowAnswer(false);
                    setShowHint(false);
                    setInputValue("");
                  }}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                    currentIndex === idx
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110"
                      : solved.includes(r.id)
                      ? "bg-green-500/30 text-green-400 border border-green-500/50"
                      : "bg-white/10 text-gray-400 hover:bg-white/20 border border-white/10"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {solved.includes(r.id) ? "✓" : idx + 1}
                </motion.button>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentIndex === riddles.length - 1}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white"
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
