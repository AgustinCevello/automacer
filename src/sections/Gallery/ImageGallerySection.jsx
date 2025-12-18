// ============================================
// src/sections/Gallery/ImageGallerySection.jsx
// ============================================
import React from 'react';
import './ImageGallerySection.css';
import iny1 from '../../assets/images/inyectora1.png';
import iny2 from '../../assets/images/inyectora2.png';
import iny3 from '../../assets/images/inyectora3.png';
import iny4 from '../../assets/images/inyectora4.png';
import cat1 from '../../assets/images/catalogo1.png';
import cat2 from '../../assets/images/catalogo2.png';
import cat3 from '../../assets/images/catalogo3.png';
import cat4 from '../../assets/images/catalogo4.png';

const ImageGallerySection = () => {
  const maquinas = [
    { src: iny1, alt: 'Inyectora 1' },
    { src: iny2, alt: 'Inyectora 2' },
    { src: iny3, alt: 'Inyectora 3' },
    { src: iny4, alt: 'Inyectora 4' }
  ];

  const productos = [
    { src: cat1, alt: 'Producto 1' },
    { src: cat2, alt: 'Producto 2' },
    { src: cat3, alt: 'Producto 3' },
    { src: cat4, alt: 'Producto 4' }
  ];

  return (
    <section id="galeria" className="gallery section">
      <div className="gallery__container container">
        <h2 className="gallery__title">Nuestras Máquinas</h2>
        <div className="gallery__grid">
          {maquinas.map((img, index) => (
            <div key={index} className="gallery__item">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="gallery__image" 
              />
            </div>
          ))}
        </div>

        <h2 className="gallery__title gallery__title--spacing">
          Catálogo de Producción
        </h2>
        <div className="gallery__grid">
          {productos.map((img, index) => (
            <div key={index} className="gallery__item">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="gallery__image" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallerySection;