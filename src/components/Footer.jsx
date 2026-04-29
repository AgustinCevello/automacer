import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useInView } from 'react-intersection-observer'
import LogoBlanco from '../images/LogoAutomacerBlanco.webp'
import LogoNegro from '../images/LogoAutomacerNegro.webp'


export default function Footer({ t, isDarkMode }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  const footerBg = isDarkMode ? 'bg-[#050810]' : 'bg-slate-100'
  const logoColor = isDarkMode ? 'text-white' : 'text-slate-900'
  const subtleText = isDarkMode ? 'text-white/40' : 'text-slate-400'
  const linkHover = 'hover:text-cyan-brand'

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className={`border-t ${isDarkMode ? 'border-white/5' : 'border-slate-200'} py-12 px-8 relative overflow-hidden ${footerBg}`}
    >
      <div className="absolute inset-0 bg-dots opacity-[0.03] pointer-events-none" />
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1280px] mx-auto gap-8 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="#hero" className="flex items-center gap-2 cursor-pointer">
            <img src={isDarkMode ? LogoBlanco : LogoNegro} alt="AUTOMACER Logo" className="h-8 md:h-10 w-auto" />
          </a>
          <span className={`text-xs uppercase tracking-tighter font-[Inter] ${subtleText}`}>
            {t.tagline}
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {t.links.map((link) => (
            <a key={link} href="#"
              className={`font-[Inter] text-xs font-semibold tracking-[0.1em] uppercase transition-colors ${subtleText} ${linkHover}`}>
              {link}
            </a>
          ))}
        </div>

        <p className={`font-[Inter] text-xs font-semibold tracking-[0.1em] uppercase text-center md:text-right ${subtleText}`}>
          {t.copy}
        </p>
      </div>
    </motion.footer>
  )
}
