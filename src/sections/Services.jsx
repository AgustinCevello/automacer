import React from 'react';
import { servicios } from '../data';

const Services = () => {
  return (
    <section id="servicios" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Nuestros Servicios</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {servicios.map((s) => (
          <div key={s.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', position: 'relative' }}>
            {s.tag && <span style={{ background: 'red', color: 'white', padding: '2px 8px', fontSize: '12px', borderRadius: '4px', position: 'absolute', top: '10px', right: '10px' }}>{s.tag}</span>}
            <h3>{s.titulo}</h3>
            <p>{s.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;