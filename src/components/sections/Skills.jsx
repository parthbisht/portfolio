import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { skills } from '../../data/portfolio';

const SkillsScene = lazy(() => import('../three/SkillsScene'));

const CATEGORY_COLORS = {
  Frontend: { bar: 'from-purple-500 to-purple-300', badge: 'text-purple-400 border-purple-500/30' },
  Backend: { bar: 'from-cyan-500 to-cyan-300', badge: 'text-cyan-400 border-cyan-500/30' },
  Blockchain: { bar: 'from-pink-500 to-pink-300', badge: 'text-pink-400 border-pink-500/30' },
};

function SkillBar({ name, level, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-mono text-sm text-slate-300 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="font-mono text-xs text-slate-500">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.07 + 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('Frontend');

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container">
        <SectionHeading
          tag="// 02. skills"
          title={<>Tech <span className="gradient-text">Arsenal</span></>}
          subtitle="Technologies I've mastered across the full stack — from pixels to protocols."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: 3D orbit visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-square rounded-2xl overflow-hidden glass-card border border-white/5"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-16 h-16 border-2 border-purple-500/50 border-t-purple-400 rounded-full animate-spin" />
              </div>
            }>
              <SkillsScene />
            </Suspense>
          </motion.div>

          {/* Right: Skill bars */}
          <div>
            {/* Category tabs */}
            <div className="flex gap-2 mb-8">
              {Object.keys(skills).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 font-mono text-xs rounded-lg border transition-all duration-300 ${
                    activeTab === cat
                      ? `bg-purple-600/20 border-purple-500/60 text-purple-300`
                      : 'bg-transparent border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Skill bars for active tab */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {skills[activeTab].map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={CATEGORY_COLORS[activeTab].bar}
                  index={i}
                />
              ))}
            </motion.div>

            {/* Category summary badges */}
            <div className="mt-10 flex flex-wrap gap-2">
              {Object.entries(skills).map(([cat, items]) => (
                <div key={cat} className={`px-3 py-1.5 glass-card border text-xs font-mono ${CATEGORY_COLORS[cat].badge}`}>
                  {cat}: {items.length} skills
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
