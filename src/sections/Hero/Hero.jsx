// ============================================
// src/sections/Hero/Hero.jsx
// ============================================
import React from 'react';
import './Hero.css';
import { infoEmpresa } from '../../data';

const Hero = () => {
  return (
    <section id="inicio" className="hero">
      <div className="hero__container">
        <h1 className="hero__title">
          <span className="hero__highlight">{infoEmpresa.nombre}</span>
        </h1>
        <p className="hero__subtitle">
          {infoEmpresa.eslogan}
        </p>
        <a href="#servicios" className="hero__cta">
          Ver Servicios
        </a>
      </div>
    </section>
  );
};

export default Hero;