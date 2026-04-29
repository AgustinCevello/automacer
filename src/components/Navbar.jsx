import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Languages, Sun, Moon, Menu, X } from 'lucide-react'
import LogoBlanco from '../images/LogoAutomacerBlanco.webp'
import LogoNegro from '../images/LogoAutomacerNegro.webp'


export default function Navbar({ language, toggleLanguage, isDarkMode, toggleTheme, t }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#hero')
  const navRef = useRef(null)

  const navLinks = [
    { label: t.inicio,   href: '#hero' },
    { label: t.nosotros, href: '#about' },
    { label: t.servicios,href: '#services' },
    { label: t.galeria,  href: '#gallery' },
    { label: t.contacto, href: '#contact' },
  ]

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((s) => observer.observe(s))
    return () => sections.forEach((s) => observer.unobserve(s))
  }, [])

  const textMuted = isDarkMode ? 'text-white/70' : 'text-slate-600'
  const bgNav = scrolled
    ? isDarkMode ? 'bg-slate-950/90 backdrop-blur-2xl border-b border-white/10 shadow-lg'
                 : 'bg-white/90 backdrop-blur-2xl border-b border-black/10 shadow-lg'
    : isDarkMode ? 'bg-slate-950/50 backdrop-blur-md border-b border-white/5'
                 : 'bg-white/60 backdrop-blur-md border-b border-black/5'

  const mobileMenuBg = isDarkMode
    ? 'bg-slate-950/95 backdrop-blur-2xl border-t border-white/10'
    : 'bg-white/95 backdrop-blur-2xl border-t border-black/10'

  // Shared icon button class
  const iconBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer
    ${isDarkMode
      ? 'text-white/60 hover:text-cyan-brand hover:bg-white/10'
      : 'text-slate-500 hover:text-cyan-brand hover:bg-black/5'}`

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${bgNav}`}
    >
      <div className="flex justify-between items-center px-8 h-20 w-full max-w-[1280px] mx-auto">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 cursor-pointer">
          <img src={isDarkMode ? LogoBlanco : LogoNegro} alt="AUTOMACER Logo" className="h-8 md:h-10 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href
            return (
              <motion.a
                key={link.label}
                href={link.href}
                initial={false}
                whileHover="hovered"
                animate={isActive ? 'active' : 'idle'}
                className={`relative font-[Syne] text-sm uppercase tracking-widest font-bold pb-1 transition-colors duration-200 ${
                  isActive
                    ? 'text-cyan-brand'
                    : isDarkMode ? 'text-white/70 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
                {/* Animated underline bar */}
                <motion.span
                  className="absolute bottom-0 left-0 h-[2px] bg-cyan-brand rounded-full"
                  variants={{
                    idle:    { scaleX: 0, originX: 0, opacity: 0 },
                    hovered: { scaleX: 1, originX: 0, opacity: 1 },
                    active:  { scaleX: 1, originX: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ width: '100%' }}
                />
              </motion.a>
            )
          })}
        </nav>

        {/* Controls: Theme + Lang + Hamburger */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className={`group ${iconBtn}`}
            title="Cambiar Idioma"
            aria-label="Toggle language"
          >
            <Languages size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="font-[Syne] text-xs font-bold uppercase tracking-wider">
              {language}
            </span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={iconBtn}
            title="Cambiar Tema"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Hamburger — mobile only */}
          <button
            className={`md:hidden cursor-pointer p-2 rounded-lg ml-2 ${
              isDarkMode ? 'text-white/70 hover:bg-white/10' : 'text-slate-600 hover:bg-black/5'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`md:hidden px-8 py-6 flex flex-col gap-4 shadow-xl ${mobileMenuBg}`}
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              whileHover={{ x: 6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`font-[Syne] text-sm uppercase tracking-widest font-bold transition-colors py-2 border-l-2 pl-3 ${
                activeSection === link.href
                  ? 'text-cyan-brand border-cyan-brand'
                  : `${textMuted} ${isDarkMode ? 'border-white/10 hover:text-white hover:border-cyan-brand' : 'border-slate-200 hover:text-slate-900 hover:border-cyan-brand'}`
              }`}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.nav>
      )}
    </motion.header>
  )
}
