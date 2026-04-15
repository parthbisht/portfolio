import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(10,10,15,0.85)] backdrop-blur-xl border-b border-purple-900/30'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-md rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm font-mono">P</span>
              </div>
              <span className="font-mono text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                parth<span className="text-purple-400">.dev</span>
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 font-mono text-sm text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="text-purple-400 mr-1 opacity-0 group-hover:opacity-100 transition-opacity">{'>'}</span>
                  {link.label}
                  <span className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-purple-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </a>
              ))}
              <a href="#contact" className="ml-4 cyber-btn text-xs py-2 px-5">
                Hire Me
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-6 h-0.5 bg-purple-400"
                  animate={
                    menuOpen
                      ? i === 0
                        ? { rotate: 45, y: 8 }
                        : i === 2
                        ? { rotate: -45, y: -8 }
                        : { opacity: 0 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.2 }}
                />
              ))}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 inset-x-0 z-40 bg-[rgba(10,10,15,0.97)] backdrop-blur-xl border-b border-purple-900/30 md:hidden"
          >
            <div className="section-container py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-mono text-slate-300 hover:text-white py-2 border-b border-white/5 flex items-center gap-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-purple-400">{'0' + (i + 1) + '.'}</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
