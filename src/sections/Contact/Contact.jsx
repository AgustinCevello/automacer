// ============================================
// src/sections/Contact/Contact.jsx
// ============================================
import React from 'react';
import './Contact.css';
import { infoEmpresa } from '../../data';

const Contact = () => {
  return (
    <section id="contacto" className="contact section">
      <div className="contact__container container">
        <h2 className="contact__title">Contacto</h2>
        <div className="contact__content">
          <p className="contact__text">
            Estamos ubicados en <strong>{infoEmpresa.ubicacion}</strong>
          </p>
          <p className="contact__text">
            ¿Necesitás una cotización o más información sobre nuestros servicios?
          </p>
          <a 
            href={`mailto:${infoEmpresa.email}`} 
            className="contact__email"
          >
            📧 {infoEmpresa.email}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;