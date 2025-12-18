// ============================================
// src/sections/Services/Services.jsx
// ============================================
import React from 'react';
import './Services.css';
import ServiceCard from '../../components/common/ServiceCard';
import { servicios } from '../../data';

const Services = () => {
  return (
    <section id="servicios" className="services section">
      <div className="services__container container">
        <h2 className="services__title">Nuestros Servicios</h2>
        <div className="services__grid">
          {servicios.map((servicio) => (
            <ServiceCard key={servicio.id} servicio={servicio} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;