import React from 'react';
import { infoEmpresa } from '../data';

const Contact = () => {
  return (
    <section style={{ padding: '60px 20px', textAlign: 'center', background: '#f4f4f4' }}>
      <h2>Contacto</h2>
      <p>Estamos en {infoEmpresa.ubicacion}</p>
      <a href={`mailto:${infoEmpresa.email}`} style={{ fontSize: '1.2rem', color: '#003366', fontWeight: 'bold' }}>
        {infoEmpresa.email}
      </a>
    </section>
  );
};

export default Contact;