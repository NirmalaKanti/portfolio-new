import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Lightbulb,
  Laugh,
  Brain,
  BookOpen,
  Gamepad2,
  Sparkles,
  ArrowRight,
  Trophy,
} from "lucide-react";

const games = [
  {
    id: "puzzles",
    title: "🧩 Puzzles",
    description: "Solve amazing puzzles with answers and explanations",
    icon: Lightbulb,
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "hover:shadow-blue-500/50",
  },
  {
    id: "riddles",
    title: "🔍 Riddles",
    description: "Guess the riddles and test your wit",
    icon: BookOpen,
    color: "from-purple-500 to-pink-500",
    bgColor: "from-purple-500/20 to-pink-500/20",
    hoverColor: "hover:shadow-purple-500/50",
  },
  {
    id: "jokes",
    title: "😂 Jokes",
    description: "Laugh out loud with hilarious jokes",
    icon: Laugh,
    color: "from-yellow-500 to-orange-500",
    bgColor: "from-yellow-500/20 to-orange-500/20",
    hoverColor: "hover:shadow-yellow-500/50",
  },
  {
    id: "brain-teasers",
    title: "🧠 Brain Teasers",
    description: "Challenge your mind with tricky brain teasers",
    icon: Brain,
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-500/20 to-teal-500/20",
    hoverColor: "hover:shadow-emerald-500/50",
  },
  {
    id: "tongue-twisters",
    title: "👅 Tongue Twisters",
    description: "Try to say these without stuttering",
    icon: Gamepad2,
    color: "from-red-500 to-rose-500",
    bgColor: "from-red-500/20 to-rose-500/20",
    hoverColor: "hover:shadow-red-500/50",
  },
  {
    id: "trivia",
    title: "🎯 Trivia",
    description: "Test your knowledge with fun trivia questions",
    icon: Trophy,
    color: "from-indigo-500 to-blue-500",
    bgColor: "from-indigo-500/20 to-blue-500/20",
    hoverColor: "hover:shadow-indigo-500/50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const [, navigate] = useLocation();
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-950 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 backdrop-blur-xl bg-black/40 border-b border-white/10 px-6 py-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold">
                🎮
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                GameHub
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-6"
            >
              <span className="text-sm text-gray-400">Fun & Brain Workouts</span>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-20"
            >
              <div className="inline-block mb-6">
                <span className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/50 text-sm font-semibold text-blue-300 flex items-center gap-2 w-fit mx-auto">
                  <Sparkles className="w-4 h-4" />
                  Welcome to the Fun Zone
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Unlock Your Inner Genius
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                Challenge yourself with puzzles, riddles, jokes, brain teasers, and more. Have fun while sharpening your mind!
              </p>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-block"
              >
                <div className="text-7xl animate-bounce">🎯</div>
              </motion.div>
            </motion.div>

            {/* Games Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {games.map((game) => {
                const Icon = game.icon;
                return (
                  <motion.div
                    key={game.id}
                    variants={cardVariants}
                    onMouseEnter={() => setHoveredGame(game.id)}
                    onMouseLeave={() => setHoveredGame(null)}
                    onClick={() => navigate(`/${game.id}`)}
                  >
                    <Card
                      className={`relative overflow-hidden cursor-pointer group bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 h-full ${game.hoverColor} shadow-2xl`}
                    >
                      {/* Animated gradient background */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${game.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      />

                      {/* Shine effect */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                          background:
                            "linear-gradient(45deg, transparent 30%, white 50%, transparent 70%)",
                          transform: hoveredGame === game.id ? "translateX(100%)" : "translateX(-100%)",
                          transition: "transform 0.5s ease-in-out",
                        }}
                      />

                      <div className="relative z-10 p-8 h-full flex flex-col">
                        <motion.div
                          animate={{ scale: hoveredGame === game.id ? 1.1 : 1 }}
                          transition={{ duration: 0.3 }}
                          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-6 shadow-lg`}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        <h2 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">
                          {game.title}
                        </h2>
                        <p className="text-gray-300 mb-8 flex-grow">{game.description}</p>

                        <motion.div
                          animate={{
                            x: hoveredGame === game.id ? 5 : 0,
                          }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all"
                        >
                          Play Now
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>

                      {/* Border shine */}
                      <div className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-inset" />
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              {[
                { number: "100+", label: "Games & Activities" },
                { number: "50K+", label: "Happy Players" },
                { number: "24/7", label: "Fun Available" },
                { number: "∞", label: "Laughs Guaranteed" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-white/10 text-center text-gray-400">
          <p>Made with 💜 for fun & learning</p>
        </footer>
      </div>
    </div>
  );
}
