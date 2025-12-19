import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  Code2, 
  Layers, 
  Zap, 
  Database,
  ArrowRight,
  Terminal,
  Cpu,
  CheckCircle2,
  Sparkles,
  Upload,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const projects = [
  {
    title: "Nebula Dashboard",
    description: "Real-time analytics platform with AI-powered insights and predictive modeling for enterprise data visualization.",
    tags: ["React", "TypeScript", "D3.js", "WebSockets"],
    link: "#",
    color: "from-blue-500/20 to-cyan-500/20",
    impact: "100K+ Daily Active Users"
  },
  {
    title: "Echo Protocol",
    description: "Decentralized messaging infrastructure with quantum-resistant encryption and blockchain integration.",
    tags: ["Rust", "WASM", "Node.js", "Redis"],
    link: "#",
    color: "from-purple-500/20 to-pink-500/20",
    impact: "256-bit Encryption"
  },
  {
    title: "Vortex Design System",
    description: "Comprehensive component library with 200+ components, complete accessibility compliance, and extensive documentation.",
    tags: ["Storybook", "React", "Tailwind", "WCAG AAA"],
    link: "#",
    color: "from-emerald-500/20 to-teal-500/20",
    impact: "200+ Components"
  },
  {
    title: "Zenith Finance AI",
    description: "Algorithmic trading platform with machine learning predictions and real-time market analysis.",
    tags: ["Python", "TensorFlow", "FastAPI", "Next.js"],
    link: "#",
    color: "from-orange-500/20 to-red-500/20",
    impact: "250K CAGR"
  }
];

const expertise = [
  { 
    name: "Frontend Architecture", 
    icon: <Layers className="w-5 h-5" />,
    description: "Building scalable, maintainable design systems" 
  },
  { 
    name: "Performance Optimization", 
    icon: <Zap className="w-5 h-5" />,
    description: "Core Web Vitals excellence" 
  },
  { 
    name: "System Design", 
    icon: <Database className="w-5 h-5" />,
    description: "Cloud-native architecture" 
  },
  { 
    name: "Full-Stack Development", 
    icon: <Code2 className="w-5 h-5" />,
    description: "End-to-end product delivery" 
  },
  { 
    name: "DevOps & Infrastructure", 
    icon: <Terminal className="w-5 h-5" />,
    description: "Kubernetes, CI/CD, cloud platforms" 
  },
  { 
    name: "AI/ML Integration", 
    icon: <Cpu className="w-5 h-5" />,
    description: "LLM integration & ML pipelines" 
  },
];

const achievements = [
  { metric: "20+", label: "Projects Built", icon: "🚀" },
  { metric: "300+", label: "Problems Solved", icon: "🧠" },
  { metric: "8+", label: "Technologies Used", icon: "🛠️" },
  { metric: "∞", label: "Curiosity & Growth", icon: "⚡" },
];

export default function Portfolio() {
  const [, navigate] = useLocation();
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-x-hidden selection:bg-primary/30">
      
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.button
            onClick={() => navigate("/")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-bold font-display tracking-tight"
          >
            PORTFOLIO<span className="text-primary">.</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-6 items-center"
          >
            <a href="#work" className="text-sm hover:text-primary transition-colors">Work</a>
            <a href="#about" className="text-sm hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">Contact</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-lg"><Github className="w-4 h-4" /></a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-mono text-primary">Available for Projects</span>
              </div>
            <h1 className="text-6xl md:text-7xl font-bold font-display leading-tight tracking-tighter">
              Software <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Development Engineer
              </span>
            </h1>

            <p className="mt-4 text-sm uppercase tracking-widest text-slate-400">
              Code • Create • Ship 🚀
            </p>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-lg text-slate-300 max-w-xl leading-relaxed font-light">
              Computer Science graduate passionate about building scalable, well-designed software.
I enjoy solving real-world problems through clean code, thoughtful architecture, and continuous learning.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-4">
              {["React", "Java", "Node.js", "AI/ML","Cloud","C++"].map((tech) => (
                <span key={tech} className="px-4 py-2 text-sm font-mono rounded-full bg-white/5 border border-white/10 hover:border-primary/50 transition-colors">
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex gap-4 pt-6">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-0 shadow-lg shadow-primary/20 font-semibold">
                View My Work
              </Button>
              <Button size="lg" variant="outline" className="glass hover:bg-white/10 border-white/10 font-semibold">
                Get in Touch
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            className="hidden md:block relative"
          >
            {/* Profile Image Upload Area */}
            <div className="relative w-full aspect-square">
              {profileImage ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/20"
                >
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                  <label htmlFor="profile-upload" className="absolute bottom-4 right-4 p-3 bg-cyan-500 hover:bg-cyan-600 rounded-full cursor-pointer transition-colors shadow-lg">
                    <Upload className="w-5 h-5 text-white" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative w-full h-full"
                >
                  <motion.div 
                    className="absolute inset-0 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute inset-8 rounded-2xl border border-purple-500/20 bg-white/5 backdrop-blur-md"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
                  <label 
                    htmlFor="profile-upload"
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group rounded-3xl hover:bg-white/5 transition-colors"
                  >
                    <Upload className="w-12 h-12 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-cyan-400 font-semibold">Upload Your Image</span>
                    <span className="text-sm text-slate-400 mt-1">Click to add profile picture</span>
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </motion.div>
              )}
            </div>
            
            {/* Stats cards */}
            <motion.div 
              className="absolute -bottom-6 -left-6 glass-card p-5 rounded-xl flex items-center gap-3 w-56 bg-slate-900/80 backdrop-blur-xl border border-white/10"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div>
                <div className="text-xs text-slate-400 font-mono">Success Rate</div>
                <div className="font-bold text-lg">99.8%</div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute top-0 -right-6 glass-card p-5 rounded-xl flex items-center gap-3 w-56 bg-slate-900/80 backdrop-blur-xl border border-white/10"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <div>
                <div className="text-xs text-slate-400 font-mono">Average Rating</div>
                <div className="font-bold text-lg">4.9/5.0</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="relative z-10 py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((item, i) => (
              <motion.div
                key={item.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-4xl font-bold font-display mb-2">{item.metric}</div>
                <div className="text-sm text-slate-400">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="about" className="relative z-10 py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Core Expertise</h2>
            <p className="text-lg text-slate-300 max-w-2xl">
              Deep technical knowledge across modern web technologies and cloud infrastructure.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {expertise.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="bg-slate-900/40 backdrop-blur-xl border-white/10 hover:border-primary/50 transition-all duration-300 h-full group cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                      {skill.icon}
                    </div>
                    <CardTitle className="text-xl font-display">{skill.name}</CardTitle>
                    <CardDescription className="text-base mt-2">{skill.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="relative z-10 py-32 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-300 max-w-2xl">
              Showcasing selected works that demonstrate technical depth and design excellence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.title)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group"
              >
                <Card className="bg-slate-900/40 backdrop-blur-xl border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-500 h-full flex flex-col hover:shadow-2xl hover:shadow-primary/10">
                  <div className={`h-56 bg-gradient-to-br ${project.color} opacity-30 group-hover:opacity-50 transition-opacity duration-500 relative overflow-hidden`}>
                    <motion.div
                      animate={{ 
                        rotate: hoveredProject === project.title ? 360 : 0,
                        scale: hoveredProject === project.title ? 1.1 : 1
                      }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <CardTitle className="font-display text-2xl group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <motion.div
                        animate={{ x: hoveredProject === project.title ? 5 : 0 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
                      </motion.div>
                    </div>
                    <CardDescription className="text-base leading-relaxed text-slate-300">
                      {project.description}
                    </CardDescription>
                    <div className="mt-4 text-sm font-semibold text-primary">
                      {project.impact}
                    </div>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/5 group-hover:border-primary/30 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative z-10 py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/40 backdrop-blur-2xl p-16 rounded-3xl border border-white/10"
          >
            <h2 className="text-5xl md:text-6xl font-bold font-display mb-6 leading-tight">
              Let's Create <br /> Something <span className="text-primary">Extraordinary</span>
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Ready to elevate your digital presence? Let's collaborate to build products that users love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 shadow-lg shadow-primary/30">
                <Mail className="mr-2 w-4 h-4" /> hello@alex.dev
              </Button>
              <Button size="lg" variant="outline" className="glass hover:bg-white/10 border-white/10 font-semibold px-8">
                Schedule Call
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center text-sm text-slate-400 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center gap-8 mb-6">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Twitter</a>
            <a href="mailto:hello@alex.dev" className="hover:text-primary transition-colors">Email</a>
          </div>
          <p>© 2025 Your Name. Crafted with React, TypeScript & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
