import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-sm text-slate-500"
          >
            © {new Date().getFullYear()}{' '}
            <span className="gradient-text font-semibold">{personalInfo.name}</span>
            {' '}— Designed & Built with{' '}
            <span className="text-red-400">♥</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-slate-600"
          >
            React · Three.js · Framer Motion · TailwindCSS
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
