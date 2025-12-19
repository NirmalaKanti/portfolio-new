import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const teasers = [
  {
    id: 1,
    title: "The Coin Problem",
    description: "A man pushes his car to a hotel and tells the owner he's bankrupt. What happened?",
    answer: "He's playing Monopoly!",
    type: "Logic",
  },
  {
    id: 2,
    title: "Family Riddle",
    description: "A woman shoots her husband, then holds him underwater for 5 minutes. Right after, they enjoy a lovely dinner together. How is this possible?",
    answer: "She's a photographer! She shot his picture and developed it underwater in a darkroom.",
    type: "Lateral Thinking",
  },
  {
    id: 3,
    title: "The Lightbulb Mystery",
    description: "Three switches downstairs, one light bulb upstairs. You can't see the light from the switches. How do you know which switch controls the bulb?",
    answer: "Turn on the first switch for a few minutes, then turn it off. Turn on the second switch. Go upstairs. If the bulb is on, it's switch 2. If off but warm, it's switch 1. If off and cold, it's switch 3.",
    type: "Logic",
  },
  {
    id: 4,
    title: "The Classroom Mystery",
    description: "A teacher asks her class 'Are there more people in the world or more people sitting in this classroom right now?'",
    answer: "It's a trick question! The question contains the answer - 'people sitting in this classroom' includes people from the world, so you're comparing a part to the whole.",
    type: "Wordplay",
  },
  {
    id: 5,
    title: "The Age Problem",
    description: "Mary's father has 5 daughters: Nana, Nene, Nini, Nono. What is the name of the fifth daughter?",
    answer: "Mary! Those are her sisters.",
    type: "Wordplay",
  },
  {
    id: 6,
    title: "The Speed Challenge",
    description: "A woman shoots an arrow, then runs in the opposite direction. The arrow catches up and hits her. How?",
    answer: "She shot the arrow straight up into the air!",
    type: "Lateral Thinking",
  },
];

export default function BrainTeasers() {
  const [, navigate] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [solved, setSolved] = useState<number[]>([]);

  const current = teasers[currentIndex];
  const isSolved = solved.includes(current.id);

  const backgrounds = [
    "from-green-950 to-green-900",
    "from-emerald-950 to-green-900",
    "from-slate-900 to-emerald-800",
  ];

  const handleNext = () => {
    if (currentIndex < teasers.length - 1) {
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

  const markSolved = () => {
    if (!isSolved) {
      setSolved([...solved, current.id]);
    }
    setShowAnswer(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Logic":
        return "bg-blue-500/20 border-blue-500/50 text-blue-300";
      case "Lateral Thinking":
        return "bg-purple-500/20 border-purple-500/50 text-purple-300";
      case "Wordplay":
        return "bg-green-500/20 border-green-500/50 text-green-300";
      default:
        return "bg-cyan-500/20 border-cyan-500/50 text-cyan-300";
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
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold"
          >
            🧠 Brain Teasers
          </motion.h1>
          <div className="text-sm text-gray-400">
            {currentIndex + 1} / {teasers.length}
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
              <span className="text-sm font-semibold text-emerald-400">
                {solved.length} / {teasers.length}
              </span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                initial={{ width: 0 }}
                animate={{ width: `${(solved.length / teasers.length) * 100}%` }}
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
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 p-12 mb-8 relative overflow-hidden min-h-96 flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10" />

              <div className="relative z-10">
                {/* Type Badge */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getTypeColor(current.type)} mb-8`}
                >
                  {current.type}
                </motion.span>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-bold mb-8 text-white"
                >
                  {current.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-200 leading-relaxed mb-12"
                >
                  {current.description}
                </motion.p>

                {/* Answer Section */}
                {showAnswer && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/50 rounded-xl p-8 mb-8"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-4xl flex-shrink-0">💡</span>
                      <div className="flex-grow">
                        <div className="text-sm text-emerald-400 font-bold mb-3">THE ANSWER</div>
                        <p className="text-xl text-emerald-100 leading-relaxed">{current.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Buttons */}
              <div className="relative z-10 flex flex-wrap gap-4 mt-8">
                {!showAnswer ? (
                  <>
                    <Button
                      onClick={markSolved}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold px-8"
                      size="lg"
                    >
                      Show Answer
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/20 hover:bg-white/10 text-white font-semibold px-8"
                      size="lg"
                    >
                      Think Longer...
                    </Button>
                  </>
                ) : (
                  <Button
                    disabled
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold px-8"
                    size="lg"
                  >
                    ✓ Got It!
                  </Button>
                )}
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
              {teasers.map((t, idx) => (
                <motion.button
                  key={t.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowAnswer(false);
                  }}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                    currentIndex === idx
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white scale-110"
                      : solved.includes(t.id)
                      ? "bg-green-500/30 text-green-400 border border-green-500/50"
                      : "bg-white/10 text-gray-400 hover:bg-white/20 border border-white/10"
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {solved.includes(t.id) ? "✓" : idx + 1}
                </motion.button>
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={currentIndex === teasers.length - 1}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 text-white font-semibold flex-1 md:flex-none"
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
