import React from 'react';
// Importación de imágenes
import iny1 from '../assets/images/inyectora1.png';
import iny2 from '../assets/images/inyectora2.png';
import iny3 from '../assets/images/inyectora3.png';
import iny4 from '../assets/images/inyectora4.png';
import cat1 from '../assets/images/catalogo1.png';
import cat2 from '../assets/images/catalogo2.png';
import cat3 from '../assets/images/catalogo3.png';
import cat4 from '../assets/images/catalogo4.png';

const Gallery = () => {
  const maquinas = [iny1, iny2, iny3, iny4];
  const productos = [cat1, cat2, cat3, cat4];

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '40px'
  };

  const imgStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  };

  return (
    <section id="galeria" style={{ padding: '60px 5%', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', color: '#003366' }}>Nuestras Máquinas</h2>
      <div style={gridStyle}>
        {maquinas.map((img, index) => (
          <img key={index} src={img} alt={`Inyectora ${index + 1}`} style={imgStyle} />
        ))}
      </div>

      <h2 style={{ textAlign: 'center', color: '#003366' }}>Catálogo de Producción</h2>
      <div style={gridStyle}>
        {productos.map((img, index) => (
          <img key={index} src={img} alt={`Producto ${index + 1}`} style={imgStyle} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;