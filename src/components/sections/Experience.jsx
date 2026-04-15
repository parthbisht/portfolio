import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { experience } from '../../data/portfolio';

function TimelineItem({ item, index, isLast }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex gap-8 md:gap-0 ${
        // On desktop: alternate left/right. On mobile: always left
        'md:w-1/2 ' + (isEven ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto')
      }`}
    >
      {/* Timeline dot — absolute positioned relative to the parent track */}
      <div
        className="hidden md:block absolute top-6 w-4 h-4 rounded-full border-2 border-white z-10"
        style={{
          background: item.color,
          boxShadow: `0 0 12px ${item.color}`,
          [isEven ? 'right' : 'left']: '-8px',
        }}
      />

      {/* Mobile dot */}
      <div
        className="md:hidden flex-shrink-0 w-3 h-3 rounded-full border-2 border-white mt-2"
        style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
      />

      {/* Card */}
      <div className="glass-card border border-white/8 p-6 w-full group hover:border-purple-500/30 transition-all duration-300">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-lg font-bold font-display text-white">{item.role}</h3>
            <p className="font-mono text-sm" style={{ color: item.color }}>{item.company}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-mono text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">
              {item.period}
            </span>
            <span className="font-mono text-xs text-slate-500">{item.type}</span>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>

        <ul className="space-y-1.5 mb-4">
          {item.achievements.map((ach, i) => (
            <li key={i} className="flex gap-2 text-sm text-slate-300">
              <span style={{ color: item.color }} className="flex-shrink-0 mt-0.5">▸</span>
              {ach}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {item.tech.map((t) => (
            <span key={t} className="px-2 py-0.5 text-xs font-mono text-slate-400 bg-white/5 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="section-container">
        <SectionHeading
          tag="// 04. experience"
          title={<>Career <span className="gradient-text">Timeline</span></>}
          subtitle="My professional journey building products that scale."
        />

        {/* Timeline track */}
        <div className="relative">
          {/* Vertical center line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/30 to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-10 md:gap-16">
            {experience.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} isLast={i === experience.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
