// ============================================
// src/components/common/ServiceCard.jsx
// ============================================
import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ servicio }) => {
  return (
    <div className="service-card">
      {servicio.tag && (
        <span className="service-card__badge">{servicio.tag}</span>
      )}
      <div className="service-card__icon">{servicio.icono}</div>
      <h3 className="service-card__title">{servicio.titulo}</h3>
      <p className="service-card__description">{servicio.descripcion}</p>
    </div>
  );
};

export default ServiceCard;