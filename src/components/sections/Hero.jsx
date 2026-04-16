import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

// Lazy-load the heavy Three.js scene
const HeroScene = lazy(() => import('../three/HeroScene'));

// Typewriter effect for the tagline words
const WORDS = ['Scalable', 'Decentralized', 'Performant', 'Secure', 'Innovative'];

function TypewriterWord() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[index];
    let timeout;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 50);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="neon-text-cyan">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-black"
    >
      {/* 3D Background — lazy loaded */}
      <Suspense fallback={<div className="absolute inset-0 bg-cyber-black" />}>
        <HeroScene mouseX={mouse.x} mouseY={mouse.y} />
      </Suspense>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(10,10,15,0.8) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        {/* Intro badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 border border-purple-500/30"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs text-slate-300 tracking-widest">
            AVAILABLE FOR WORK
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight tracking-tight text-white mb-4"
        >
          {personalInfo.name.split(' ').map((word, i) => (
            <span key={i} className={`block ${i === 2 ? 'gradient-text' : ''}`}>
              {word}
            </span>
          ))}
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-mono text-lg md:text-xl text-slate-400 mb-6 tracking-wider"
        >
          <span className="text-purple-400">&lt;</span>
          {personalInfo.title}
          <span className="text-purple-400">/&gt;</span>
        </motion.p>

        {/* Typewriter tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl mx-auto"
        >
          Building{' '}
          <TypewriterWord />
          {' '}applications for the decentralized web.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#projects" className="cyber-btn cyber-btn-primary font-mono text-sm px-8 py-3">
            View Projects
          </a>
          <a href="#contact" className="cyber-btn font-mono text-sm px-8 py-3">
            Get In Touch
          </a>
        </motion.div>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'Ethers.js', 'AWS'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 font-mono text-xs glass-card text-slate-400 border-purple-500/20"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-slate-500 tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-purple-500 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
