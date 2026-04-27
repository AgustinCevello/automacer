import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { TRANSLATIONS } from './constants'

function App() {
  const [language, setLanguage] = useState('ES')
  const [isDarkMode, setIsDarkMode] = useState(true)

  const toggleLanguage = () => setLanguage((prev) => (prev === 'ES' ? 'EN' : 'ES'))
  const toggleTheme = () => setIsDarkMode((prev) => !prev)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const t = TRANSLATIONS[language]

  return (
    <>
      <Navbar language={language} toggleLanguage={toggleLanguage} isDarkMode={isDarkMode} toggleTheme={toggleTheme} t={t.nav} />
      <main className="relative">
        <Hero t={t.hero} isDarkMode={isDarkMode} />
        <div className="section-glow-divider"></div>
        <About t={t.about} isDarkMode={isDarkMode} />
        <div className="section-glow-divider"></div>
        <Services t={t.services} isDarkMode={isDarkMode} />
        <div className="section-glow-divider"></div>
        <Gallery t={t.gallery} isDarkMode={isDarkMode} />
        <div className="section-glow-divider"></div>
        <Contact t={t.contact} isDarkMode={isDarkMode} />
      </main>
      <Footer t={t.footer} isDarkMode={isDarkMode} />
    </>
  )
}

export default App
