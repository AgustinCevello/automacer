import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
const panel = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: 20, scale: 0.97, transition: { duration: 0.2 } },
}

export default function LegalModal({ isOpen, onClose, title, children, isDarkMode }) {
  const contentRef = useRef(null)

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  const bgPanel = isDarkMode
    ? 'bg-slate-900/95 border-white/10'
    : 'bg-white/95 border-slate-200'
  const textColor = isDarkMode ? 'text-white/90' : 'text-slate-800'
  const headingColor = isDarkMode ? 'text-white' : 'text-slate-900'
  const scrollbarStyle = isDarkMode
    ? '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full'
    : '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-2xl max-h-[80vh] rounded-2xl border backdrop-blur-2xl shadow-2xl flex flex-col ${bgPanel}`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-8 py-5 border-b ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <h3 className={`font-[Syne] text-lg font-bold ${headingColor}`}>
                {title}
              </h3>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isDarkMode ? 'hover:bg-white/10 text-white/60' : 'hover:bg-slate-100 text-slate-500'
                }`}
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              ref={contentRef}
              className={`overflow-y-auto px-8 py-6 font-[Inter] text-sm leading-relaxed space-y-4 ${textColor} ${scrollbarStyle}`}
            >
              {children}
            </div>

            {/* Footer */}
            <div className={`px-8 py-4 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
              <button
                onClick={onClose}
                className="w-full py-3 bg-cyan-brand text-on-secondary font-[Syne] text-sm font-bold uppercase tracking-widest rounded-lg hover:scale-[1.02] transition-all cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
