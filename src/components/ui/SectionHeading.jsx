import { motion } from 'framer-motion';

export default function SectionHeading({ tag, title, subtitle, align = 'left' }) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-16 ${isCenter ? 'text-center' : ''}`}>
      <motion.p
        className="section-tag"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {tag}
      </motion.p>

      <motion.h2
        className="text-4xl md:text-5xl font-bold font-display tracking-tight text-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {title}
      </motion.h2>

      {/* Decorative underline */}
      <motion.div
        className={`mt-4 h-px bg-gradient-to-r from-purple-500 via-cyan-500 to-transparent ${isCenter ? 'mx-auto' : ''}`}
        style={{ maxWidth: isCenter ? '200px' : '300px' }}
        initial={{ scaleX: 0, originX: isCenter ? 0.5 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {subtitle && (
        <motion.p
          className="mt-4 text-slate-400 text-lg max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={isCenter ? { margin: '16px auto 0' } : {}}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
