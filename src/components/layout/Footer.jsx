// ============================================
// src/components/layout/Footer.jsx
// ============================================
import React from 'react';
import './Footer.css';
import { infoEmpresa } from '../../data';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__text">
          &copy; {new Date().getFullYear()} {infoEmpresa.nombre} - {infoEmpresa.ubicacion}
        </p>
        <p className="footer__text">{infoEmpresa.eslogan}</p>
        <div className="footer__contact">
          <a 
            href={`mailto:${infoEmpresa.email}`} 
            className="footer__link"
          >
            {infoEmpresa.email}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;