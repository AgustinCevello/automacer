// ============================================
// src/sections/About/AboutUs.jsx
// ============================================
import React from 'react';
import './AboutUs.css';
import { infoEmpresa } from '../../data';

const AboutUs = () => {
  return (
    <section id="nosotros" className="about section">
      <div className="about__container container">
        <h2 className="about__title">Sobre Nosotros</h2>
        <p className="about__description">
          Desde <span className="about__year">{infoEmpresa.anioFundacion}</span>, nos dedicamos 
          a proveer soluciones integrales para la industria del plástico. Con más de 30 años 
          de experiencia, nos hemos consolidado como referentes en la instalación, mantenimiento 
          y reparación de maquinaria industrial.
        </p>
        <p className="about__description">
          Nuestro compromiso es ofrecer servicios de calidad, respaldados por un equipo de 
          profesionales altamente capacitados y una atención personalizada que garantiza 
          la satisfacción de nuestros clientes.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;