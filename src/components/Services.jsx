import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useInView } from 'react-intersection-observer'

const serviceIcons = [
  'material-symbols:construction',
  'material-symbols:settings',
  'material-symbols:build',
  'material-symbols:computer',
  'material-symbols:solar-power',
]
const badgeStyle = {
  CORE: 'bg-primary-container text-cyan-brand',
  NEW: 'bg-secondary-container text-on-secondary',
  NUEVO: 'bg-secondary-container text-on-secondary',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

export default function Services({ t, isDarkMode }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const headingColor = isDarkMode ? 'text-white' : 'text-slate-900'

  return (
    <section className="py-20 px-8 relative overflow-hidden" id="services" ref={ref}>
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />
      <div className="orb bg-cyan-brand w-[500px] h-[500px] -bottom-20 -left-20 opacity-[0.07]" />
      <div className="orb bg-cyan-brand w-[600px] h-[600px] top-1/4 -right-20 opacity-[0.05]" />

      <motion.div initial={{ opacity: 0, y: -20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}
        className="max-w-[1280px] mx-auto text-center mb-16 relative z-10">
        <span className="font-[Inter] text-xs font-semibold text-cyan-brand tracking-[0.1em] uppercase mb-4 block">
          {t.label}
        </span>
        <h2 className={`font-[Syne] text-[clamp(32px,5vw,48px)] leading-[1.2] font-bold ${headingColor}`}>
          {t.title}
        </h2>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {t.items.map((service, i) => (
          <motion.div key={service.title} variants={cardVariants} whileHover={{ scale: 1.02 }}
            className="glass-panel p-8 rounded-2xl hover:border-cyan-brand/60 hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] transition-colors group relative overflow-hidden">
            {service.badge && (
              <div className="absolute top-0 right-0 p-4">
                <span className={`font-[Inter] text-[10px] font-semibold tracking-[0.1em] uppercase py-1 px-3 rounded-full ${badgeStyle[service.badge] || ''}`}>
                  {service.badge}
                </span>
              </div>
            )}
            <Icon icon={serviceIcons[i]} className="text-4xl text-cyan-brand mb-6 block transition-transform group-hover:scale-110" />
            <h4 className={`font-[Syne] text-xl font-medium mb-4 ${headingColor}`}>{service.title}</h4>
            <p className="font-[Inter] text-sm leading-relaxed text-on-surface-variant">{service.description}</p>
          </motion.div>
        ))}

        <motion.div variants={cardVariants} whileHover={{ scale: 1.02 }}
          className={`p-8 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-colors cursor-pointer
            ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-300 hover:bg-slate-100'}`}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          <p className={`font-[Syne] text-lg font-medium mb-4 ${isDarkMode ? 'text-white/50' : 'text-slate-400'}`}>
            {t.cta_label}
          </p>
          <span className="text-cyan-brand font-bold flex items-center gap-2 hover:gap-4 transition-all">
            {t.cta_link}
            <Icon icon="material-symbols:arrow-forward" />
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
