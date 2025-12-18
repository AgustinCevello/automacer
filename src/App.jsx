// ============================================
// src/App.jsx
// ============================================
import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero/Hero';
import AboutUs from './sections/About/AboutUs';
import Services from './sections/Services/Services';
import ImageGallerySection from './sections/Gallery/ImageGallerySection';
import Contact from './sections/Contact/Contact';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Hero />
        <AboutUs />
        <Services />
        <ImageGallerySection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;