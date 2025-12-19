import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trophy, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const triviaQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correct: 0,
    category: "Geography",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
    category: "Science",
  },
  {
    id: 3,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Jane Austen", "Charles Dickens", "William Shakespeare", "Mark Twain"],
    correct: 2,
    category: "Literature",
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
    category: "Geography",
  },
  {
    id: 5,
    question: "In what year did the Titanic sink?",
    options: ["1912", "1905", "1920", "1898"],
    correct: 0,
    category: "History",
  },
  {
    id: 6,
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Liechtenstein", "Vatican City", "San Marino"],
    correct: 2,
    category: "Geography",
  },
  {
    id: 7,
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    category: "Geography",
  },
  {
    id: 8,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correct: 2,
    category: "Science",
  },
];

export default function Trivia() {
  const [, navigate] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);

  const current = triviaQuestions[currentIndex];
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const backgrounds = isDark
    ? ["from-purple-950 via-black to-purple-900", "from-purple-900 via-black to-purple-950", "from-black via-purple-950 to-black"]
    : ["from-blue-50 via-white to-blue-50", "from-blue-50 via-gray-50 to-white", "from-white via-blue-50 to-white"];

  const handleAnswer = (index: number) => {
    if (!answered) {
      setSelected(index);
      setAnswered(true);
      if (index === current.correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < triviaQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setAnswered(false);
    setCompleted(false);
  };

  const percentage = Math.round((score / triviaQuestions.length) * 100);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${backgrounds[currentIndex % backgrounds.length]} transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 backdrop-blur-xl transition-colors duration-300 ${isDark ? "bg-black/40 border-b border-white/10" : "bg-white/80 border-b border-gray-200"} px-6 py-4 z-50`}>
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
            🎯 Trivia
          </motion.h1>
          <div className="flex items-center gap-4">
            <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {currentIndex + 1} / {triviaQuestions.length}
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
          <AnimatePresence mode="wait">
            {!completed ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Score Card */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                >
                  <Card className="bg-black/40 backdrop-blur border-white/10 p-4 text-center">
                    <div className="text-2xl font-bold text-indigo-400">{score}</div>
                    <div className="text-xs text-gray-400">Correct</div>
                  </Card>
                  <Card className="bg-black/40 backdrop-blur border-white/10 p-4 text-center">
                    <div className="text-2xl font-bold text-gray-400">
                      {currentIndex + 1 - score}
                    </div>
                    <div className="text-xs text-gray-400">Wrong</div>
                  </Card>
                  <Card className="bg-black/40 backdrop-blur border-white/10 p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{percentage}%</div>
                    <div className="text-xs text-gray-400">Accuracy</div>
                  </Card>
                  <Card className="bg-black/40 backdrop-blur border-white/10 p-4 text-center">
                    <div className="text-lg font-bold text-blue-400">{current.category}</div>
                    <div className="text-xs text-gray-400">Category</div>
                  </Card>
                </motion.div>

                {/* Question Card */}
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card className="bg-black/40 backdrop-blur-xl border-white/10 p-12 mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10" />

                    <div className="relative z-10">
                      {/* Progress Bar */}
                      <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-400">Question Progress</span>
                          <span className="text-sm font-semibold text-indigo-400">
                            {currentIndex + 1}/{triviaQuestions.length}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${((currentIndex + 1) / triviaQuestions.length) * 100}%`,
                            }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>

                      {/* Question */}
                      <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl font-bold mb-12 text-white"
                      >
                        {current.question}
                      </motion.h2>

                      {/* Options */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                      >
                        {current.options.map((option, index) => {
                          const isSelected = selected === index;
                          const isCorrect = index === current.correct;
                          const showCorrect = answered && isCorrect;
                          const showWrong = answered && isSelected && !isCorrect;

                          return (
                            <motion.button
                              key={index}
                              onClick={() => handleAnswer(index)}
                              disabled={answered}
                              whileHover={{ scale: answered ? 1 : 1.02 }}
                              whileTap={{ scale: answered ? 1 : 0.98 }}
                              className={`w-full p-6 rounded-xl text-lg font-semibold transition-all text-left ${
                                showCorrect
                                  ? "bg-green-500/20 border-2 border-green-500 text-green-100"
                                  : showWrong
                                  ? "bg-red-500/20 border-2 border-red-500 text-red-100"
                                  : isSelected && !answered
                                  ? "bg-indigo-500/30 border-2 border-indigo-500 text-white"
                                  : "bg-white/5 border-2 border-white/10 text-gray-200 hover:bg-white/10 hover:border-white/20"
                              } disabled:cursor-not-allowed`}
                            >
                              <span className="flex items-center gap-4">
                                <span
                                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                    showCorrect
                                      ? "bg-green-500/50 text-green-200"
                                      : showWrong
                                      ? "bg-red-500/50 text-red-200"
                                      : "bg-white/10"
                                  }`}
                                >
                                  {String.fromCharCode(65 + index)}
                                </span>
                                {option}
                                {showCorrect && <span className="ml-auto text-2xl">✓</span>}
                                {showWrong && <span className="ml-auto text-2xl">✗</span>}
                              </span>
                            </motion.button>
                          );
                        })}
                      </motion.div>
                    </div>
                  </Card>
                </motion.div>

                {/* Next Button */}
                {answered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center"
                  >
                    <Button
                      onClick={handleNext}
                      className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-12"
                      size="lg"
                    >
                      {currentIndex === triviaQuestions.length - 1
                        ? "See Results"
                        : "Next Question"}
                      →
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <Card className="bg-black/40 backdrop-blur-xl border-white/10 p-16 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-purple-500/10" />

                  <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="text-6xl mb-8 flex justify-center">
                      <motion.span
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ duration: 1 }}
                      >
                        🏆
                      </motion.span>
                    </div>

                    <h1 className="text-5xl font-bold mb-6">Quiz Complete!</h1>

                    <div className="space-y-6 mb-12">
                      <div>
                        <div className="text-6xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                          {percentage}%
                        </div>
                        <p className="text-gray-400 text-lg">Final Score</p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <Card className="bg-green-500/10 border border-green-500/30 p-6">
                          <div className="text-4xl font-bold text-green-400">{score}</div>
                          <p className="text-green-300">Correct</p>
                        </Card>
                        <Card className="bg-red-500/10 border border-red-500/30 p-6">
                          <div className="text-4xl font-bold text-red-400">
                            {triviaQuestions.length - score}
                          </div>
                          <p className="text-red-300">Wrong</p>
                        </Card>
                      </div>

                      {percentage === 100 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl p-6"
                        >
                          <p className="text-2xl font-bold text-yellow-300">Perfect Score! 🌟</p>
                        </motion.div>
                      )}
                    </div>

                    <Button
                      onClick={restart}
                      className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold px-12"
                      size="lg"
                    >
                      <Trophy className="w-5 h-5 mr-2" />
                      Try Again
                    </Button>
                  </motion.div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
