import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useInView } from 'react-intersection-observer'
import Foto6 from '../images/Foto6.webp'


export default function Hero({ t, isDarkMode }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  const secondaryBtnClass = isDarkMode
    ? 'glass-panel text-white hover:bg-white/10 border border-white/20'
    : 'bg-slate-800/10 text-slate-800 hover:bg-slate-800/20 border border-slate-800/20'

  return (
    <section id="hero" ref={ref} className="relative min-h-[795px] flex flex-col items-center justify-center px-8 overflow-hidden pt-32 md:pt-56 pb-20">
      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
        className="orb bg-cyan-brand w-[600px] h-[600px] -top-40 -left-40 opacity-10" />
      <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 1 }}
        className="orb bg-primary-container w-[700px] h-[700px] top-1/2 -right-60 opacity-10" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="max-w-[1280px] w-full text-center relative z-10">
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="font-[Inter] text-xs font-semibold text-cyan-brand tracking-[0.3em] uppercase mb-4 block">
          {t.tagline}
        </motion.span>

        <motion.h1 initial={{ y: 40, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          className="font-[Syne] text-[clamp(36px,6vw,64px)] leading-[1.1] tracking-[-0.02em] font-extrabold mb-6 max-w-4xl mx-auto"
          style={{ color: isDarkMode ? '#ffffff' : '#0d1b3e' }}>
          {t.h1_1}{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-brand to-primary">
            {t.h1_2}
          </span>
        </motion.h1>

        <motion.p initial={{ y: 40, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }}
          className="font-[Inter] text-lg leading-relaxed text-on-surface-variant mb-12 max-w-2xl mx-auto">
          {t.subtitle}
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href="#services"
            className="px-10 py-4 bg-cyan-brand text-on-secondary font-[Syne] text-sm font-bold uppercase tracking-widest rounded-lg hover:scale-105 transition-all glow-cyan flex items-center justify-center gap-2">
            {t.cta_primary}
            <Icon icon="material-symbols:rocket-launch" className="text-xl" />
          </a>
          <a href="#contact"
            className={`px-10 py-4 font-[Syne] text-sm font-bold uppercase tracking-widest rounded-lg transition-all ${secondaryBtnClass}`}>
            {t.cta_secondary}
          </a>
        </motion.div>
      </div>

      <motion.div initial={{ scale: 0.97, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-20 w-full max-w-5xl glass-panel rounded-2xl p-4 relative z-10">
        <img alt="Modern industrial facility"
          className="w-full h-[400px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700 opacity-60 hover:opacity-100"
          src={Foto6} />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent rounded-xl" />
      </motion.div>
    </section>
  )
}
