import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useInView } from 'react-intersection-observer'

const cardIcons = ['material-symbols:precision-manufacturing', 'material-symbols:energy-savings-leaf']

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const childVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

export default function About({ t, isDarkMode }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  const headingColor = isDarkMode ? 'text-white' : 'text-slate-900'
  const statColor = isDarkMode ? 'text-white' : 'text-slate-900'

  return (
    <section className="py-20 px-8 relative overflow-hidden" id="about" ref={ref}>
      <div className="orb bg-primary-container w-[800px] h-[800px] top-1/4 -right-40 opacity-[0.08]" />
      <div className="circuit-vertical left-1/4 top-0 h-1/2 opacity-20" />
      <div className="circuit-line top-1/3 left-0 opacity-10" />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <motion.div initial={{ x: -40, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.6 }}>
              <span className="font-[Inter] text-xs font-semibold text-cyan-brand tracking-[0.1em] uppercase mb-4 block">
                {t.label}
              </span>
              <h2 className={`font-[Syne] text-[clamp(32px,5vw,48px)] leading-[1.2] font-bold mb-8 ${headingColor}`}>
                {t.title}
              </h2>
            </motion.div>

            <motion.div variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {t.stats.map((stat) => (
                <motion.div key={stat.label} variants={childVariant}
                  className="glass-panel p-6 rounded-xl border-l-4 border-l-cyan-brand">
                  <div className={`font-[Syne] text-[32px] leading-[1.3] font-medium mb-1 ${statColor}`}>
                    {stat.value}
                  </div>
                  <div className="font-[Inter] text-xs font-semibold tracking-[0.1em] uppercase text-on-surface-variant">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } }}
            className="grid grid-cols-1 gap-6">
            {t.cards.map((card, i) => (
              <motion.div key={card.title}
                variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
                className="glass-panel p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="flex gap-4 mb-4">
                  <Icon icon={cardIcons[i]} className="text-cyan-brand text-3xl" />
                  <h3 className={`font-[Syne] text-xl font-medium ${headingColor}`}>{card.title}</h3>
                </div>
                <p className="text-on-surface-variant leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
