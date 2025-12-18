// ============================================
// src/components/layout/Header.jsx
// ============================================
import React from 'react';
import './Header.css';
import { infoEmpresa } from '../../data';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          {infoEmpresa.nombre}
        </div>
        <nav className="header__nav">
          <a href="#inicio" className="header__link">Inicio</a>
          <a href="#nosotros" className="header__link">Nosotros</a>
          <a href="#servicios" className="header__link">Servicios</a>
          <a href="#galeria" className="header__link">Galería</a>
          <a href="#contacto" className="header__link">Contacto</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;