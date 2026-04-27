import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Foto1 from '../images/Foto1.svg'
import Foto3 from '../images/Foto3.svg'
import Foto4 from '../images/Foto4.svg'
import Foto5 from '../images/Foto5.svg'

const images = [
  { src: Foto1, span: true },
  { src: Foto3 },
  { src: Foto4 },
  { src: Foto5, colSpan2: true },
]

export default function Gallery({ t, isDarkMode }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const headingColor = isDarkMode ? 'text-white' : 'text-slate-900'

  return (
    <section className="py-20 px-8 relative overflow-hidden" id="gallery" ref={ref}>
      <div className="circuit-line top-1/4 right-0 w-1/2 opacity-20" />
      <div className="circuit-vertical right-1/4 bottom-0 h-1/3 opacity-20" />

      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
        className="max-w-[1280px] mx-auto text-center mb-16 relative z-10">
        <span className="font-[Inter] text-xs font-semibold text-cyan-brand tracking-[0.1em] uppercase mb-4 block">
          {t.label}
        </span>
        <h2 className={`font-[Syne] text-[clamp(32px,5vw,48px)] leading-[1.2] font-bold ${headingColor}`}>
          {t.title}
        </h2>
      </motion.div>

      <motion.div
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
        initial="hidden" animate={inView ? 'visible' : 'hidden'}
        className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
        {images.map((img, i) => (
          <motion.div key={i}
            variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } }}
            className={`glass-panel p-2 rounded-2xl overflow-hidden group ${img.span ? 'md:col-span-2 md:row-span-2' : ''} ${img.colSpan2 ? 'md:col-span-2' : ''}`}>
            <img src={img.src} alt={t.alts[i]}
              className={`w-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500 ${img.span ? 'h-full scale-100 group-hover:scale-105' : 'h-64'}`} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
