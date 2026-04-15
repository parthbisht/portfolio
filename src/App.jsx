import { lazy, Suspense } from 'react';
import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero';
import CustomCursor from './components/ui/CustomCursor';
import Footer from './components/ui/Footer';

// Lazy-load below-the-fold sections for better performance
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Simple loading placeholder that doesn't flash
function SectionFallback() {
  return (
    <div className="w-full py-32 flex items-center justify-center">
      <div className="w-8 h-8 border border-purple-500/40 border-t-purple-400 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-200 overflow-x-hidden">
      {/* Custom cursor — hidden on touch devices via CSS */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero loads eagerly — it's above the fold */}
        <Hero />

        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
