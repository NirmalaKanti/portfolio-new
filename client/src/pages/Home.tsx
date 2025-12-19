import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Import generated asset
import heroBg from '@assets/generated_images/abstract_dark_digital_background_with_neon_gradients.png';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
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
      staggerChildren: 0.1
    }
  }
};

const projects = [
  {
    title: "Nebula Dashboard",
    description: "AI-powered analytics platform for visualizing high-dimensional data streams in real-time.",
    tags: ["React", "TypeScript", "D3.js", "WebSockets"],
    link: "#",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    title: "Echo Protocol",
    description: "Decentralized messaging architecture with end-to-end quantum-resistant encryption.",
    tags: ["Rust", "WASM", "Node.js", "Redis"],
    link: "#",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    title: "Vortex UI",
    description: "A composable design system optimized for performance and accessibility standards.",
    tags: ["Storybook", "React", "Tailwind", "A11y"],
    link: "#",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Zenith Finance",
    description: "Algorithmic trading bot interface with predictive market modeling capabilities.",
    tags: ["Python", "TensorFlow", "FastAPI", "Next.js"],
    link: "#",
    color: "from-orange-500/20 to-red-500/20"
  }
];

const skills = [
  { name: "Frontend Architecture", icon: <Layers className="w-4 h-4" /> },
  { name: "System Design", icon: <Database className="w-4 h-4" /> },
  { name: "Performance Tuning", icon: <Zap className="w-4 h-4" /> },
  { name: "Creative Coding", icon: <Code2 className="w-4 h-4" /> },
  { name: "Command Line", icon: <Terminal className="w-4 h-4" /> },
  { name: "Machine Learning", icon: <Cpu className="w-4 h-4" /> },
];

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold font-display tracking-tight"
          >
            DEV<span className="text-primary">.PORTFOLIO</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-6"
          >
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="outline" className="glass border-primary/30 text-primary px-4 py-1 mb-4">
                Available for hire
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight tracking-tighter">
                Crafting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                  Digital Reality
                </span>
              </h1>
            </motion.div>
            
            <motion.p variants={fadeIn} className="text-lg text-muted-foreground max-w-md leading-relaxed">
              I'm a full-stack design engineer specializing in building exceptional digital experiences. 
              I merge technical depth with visual artistry.
            </motion.p>

            <motion.div variants={fadeIn} className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-0 shadow-lg shadow-primary/20">
                View Projects
              </Button>
              <Button size="lg" variant="outline" className="glass hover:bg-white/10 border-white/10">
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            className="hidden md:block relative"
          >
            {/* Abstract visual representation of code/structure */}
            <div className="relative w-full aspect-square rounded-full border border-white/10 bg-white/5 backdrop-blur-sm p-8 flex items-center justify-center animate-spin-slow" style={{ animationDuration: '20s' }}>
              <div className="absolute inset-0 rounded-full border border-white/5 border-dashed" />
              <div className="w-3/4 h-3/4 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md flex items-center justify-center">
                 <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-primary to-blue-600 blur-2xl opacity-60" />
              </div>
            </div>
            
            <motion.div 
              className="absolute -bottom-10 -left-10 glass-card p-4 rounded-xl flex items-center gap-3 w-48"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Projects</div>
                <div className="font-bold">24+ Shipped</div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute top-10 -right-10 glass-card p-4 rounded-xl flex items-center gap-3 w-48"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Performance</div>
                <div className="font-bold">100% Optimized</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowRight className="w-4 h-4 rotate-90" />
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-display mb-4">Tech Stack & Expertise</h2>
            <p className="text-muted-foreground">The tools I use to create the extraordinary.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {skills.map((skill, i) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Badge variant="secondary" className="px-4 py-2 text-sm gap-2 hover:bg-primary/20 transition-colors cursor-default border border-white/5">
                  {skill.icon}
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-bold font-display mb-4">Selected Works</h2>
              <p className="text-muted-foreground max-w-lg">
                A collection of projects that push the boundaries of performance and design.
              </p>
            </div>
            <Button variant="ghost" className="gap-2 group">
              View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Card className="bg-black/40 backdrop-blur-xl border-white/10 overflow-hidden hover:border-primary/50 transition-colors duration-500 h-full flex flex-col">
                  <div className={`h-48 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                  <CardHeader>
                    <CardTitle className="font-display text-2xl group-hover:text-primary transition-colors flex items-center justify-between">
                      {project.title}
                      <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded">
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

      {/* Contact Section */}
      <section className="relative z-10 py-32 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-3xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Let's Build Together</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white min-w-[200px]">
                <Mail className="mr-2 w-4 h-4" /> Say Hello
              </Button>
              <Button size="lg" variant="outline" className="glass hover:bg-white/10 border-white/10 min-w-[200px]">
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-sm text-muted-foreground border-t border-white/5">
        <p>© 2025 Creative Developer Portfolio. Crafted with React & Tailwind.</p>
      </footer>
    </div>
  );
}