import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import { about, personalInfo } from '../../data/portfolio';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container">
        <SectionHeading
          tag="// 01. about"
          title={<>Who <span className="gradient-text">Am I</span></>}
          subtitle="A builder at the intersection of Web2 reliability and Web3 innovation."
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="space-y-4 text-slate-400 leading-relaxed">
              {about.bio.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="cyber-btn text-xs py-2 px-6">
                GitHub
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="cyber-btn text-xs py-2 px-6">
                LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4">
            {about.highlights.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, borderColor: 'rgba(168,85,247,0.5)' }}
                className="glass-card p-6 border border-white/8 cursor-none"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-2xl font-bold font-display text-white mb-1 gradient-text">
                  {item.label}
                </div>
                <div className="font-mono text-xs text-slate-400 tracking-wider">
                  {item.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative code block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 glass-card p-6 font-mono text-sm border border-purple-500/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-4 text-slate-500 text-xs">developer.ts</span>
          </div>
          <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`const developer = {
  name: "${personalInfo.name}",
  role: "Software Engineer | Web3 Developer",
  stack: {
    frontend: ["React", "Next.js", "TypeScript", "MUI"],
    backend:  ["Node.js", "MongoDB", "REST APIs", "AWS"],
    web3:     ["Ethers.js", "DeFi", "NFT Standards", "dApps"],
  },
  passion: "Building the decentralized future",
  status: `}<span className="text-emerald-400">"open_to_opportunities"</span>{`,
};`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
