import React from 'react';
import { infoEmpresa } from '../data';

const Hero = () => {
  return (
    <section style={{ padding: '80px 20px', textAlign: 'center', background: '#003366', color: 'white' }}>
      <h1 style={{ fontSize: '3rem', margin: '0' }}>{infoEmpresa.nombre}</h1>
      <p style={{ fontSize: '1.4rem', marginTop: '20px', opacity: '0.9' }}>{infoEmpresa.eslogan}</p>
      <div style={{ marginTop: '30px' }}>
        <a href="#servicios" style={{ background: '#ffcc00', color: '#000', padding: '12px 24px', textDecoration: 'none', fontWeight: 'bold', borderRadius: '5px' }}>Ver Servicios</a>
      </div>
    </section>
  );
};

export default Hero;