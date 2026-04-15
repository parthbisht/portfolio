import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { projects } from '../../data/portfolio';

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="glass-card border border-white/8 p-6 cursor-none group relative overflow-hidden"
      onClick={() => onClick(project)}
      data-cursor-hover
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.glowColor} 0%, transparent 60%)` }}
      />

      {/* Category badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="px-2 py-1 text-xs font-mono rounded border"
          style={{ color: project.color, borderColor: `${project.color}44`, background: `${project.color}11` }}
        >
          {project.category}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Live demo"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-white transition-colors">
        {project.title}
      </h3>

      <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Stats */}
      {project.stats && (
        <div className="flex gap-4 mb-4">
          {Object.entries(project.stats).map(([key, val]) => (
            <div key={key}>
              <div className="font-mono text-sm font-bold" style={{ color: project.color }}>{val}</div>
              <div className="font-mono text-xs text-slate-500 capitalize">{key}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span key={t} className="px-2 py-0.5 text-xs font-mono text-slate-400 bg-white/5 rounded">
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="px-2 py-0.5 text-xs font-mono text-slate-500 bg-white/5 rounded">
            +{project.tech.length - 4}
          </span>
        )}
      </div>

      {/* Bottom border glow on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
      />
    </motion.div>
  );
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <motion.div
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-2xl glass-card border p-8 overflow-y-auto max-h-[90vh]"
        style={{ borderColor: `${project.color}44` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/30 transition-all"
        >
          ×
        </button>

        {/* Header */}
        <div className="mb-6">
          <span
            className="inline-block px-2 py-1 text-xs font-mono rounded border mb-3"
            style={{ color: project.color, borderColor: `${project.color}44`, background: `${project.color}11` }}
          >
            {project.category}
          </span>
          <h2 className="text-3xl font-bold font-display text-white mb-2">{project.title}</h2>
          <p className="text-slate-400 leading-relaxed">{project.longDescription}</p>
        </div>

        {/* Stats */}
        {project.stats && (
          <div className="flex gap-6 p-4 rounded-xl mb-6" style={{ background: `${project.color}11` }}>
            {Object.entries(project.stats).map(([key, val]) => (
              <div key={key} className="text-center">
                <div className="text-xl font-bold font-mono" style={{ color: project.color }}>{val}</div>
                <div className="text-xs text-slate-400 capitalize">{key}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="mb-6">
          <h3 className="font-mono text-sm text-slate-300 mb-3 uppercase tracking-wider">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 text-sm font-mono rounded-lg border"
                style={{ color: project.color, borderColor: `${project.color}44`, background: `${project.color}11` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <a href={project.github} target="_blank" rel="noreferrer" className="cyber-btn text-xs py-2 px-6">
            View Code
          </a>
          <a href={project.live} target="_blank" rel="noreferrer" className="cyber-btn cyber-btn-primary text-xs py-2 px-6">
            Live Demo
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="section-container">
        <SectionHeading
          tag="// 03. projects"
          title={<>Featured <span className="gradient-text">Projects</span></>}
          subtitle="A selection of Web3 protocols, DeFi systems, and full-stack applications I've built."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelected}
              index={i}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
