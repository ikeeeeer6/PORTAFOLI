import React, { useEffect, useState } from 'react';
import '../styles/CarModal.css';

export const CarModal = ({ car, startIndex, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(startIndex);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIndex(i => (i + 1) % car.images.length);
      if (e.key === 'ArrowLeft') setActiveIndex(i => (i - 1 + car.images.length) % car.images.length);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, car.images.length]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <span className="modal-header-name">{car.name}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">

          {/* Columna izquierda: foto grande + miniaturas */}
          <div className="modal-left">
            <div className="modal-main-image-wrap">
              <img
                src={car.images[activeIndex]}
                alt={`${car.name} - ${activeIndex + 1}`}
                className="modal-main-image"
              />
              <button
                className="modal-arrow modal-arrow-left"
                onClick={() => setActiveIndex(i => (i - 1 + car.images.length) % car.images.length)}
              >&#8249;</button>
              <button
                className="modal-arrow modal-arrow-right"
                onClick={() => setActiveIndex(i => (i + 1) % car.images.length)}
              >&#8250;</button>
              <span className="modal-counter">{activeIndex + 1} / {car.images.length}</span>
            </div>

            {/* Miniaturas */}
            <div className="modal-thumbs">
              {car.images.map((img, i) => (
                <button
                  key={i}
                  className={`modal-thumb ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                >
                  <img src={img} alt={`${car.name} miniatura ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Columna derecha: todos los detalles */}
          <div className="modal-right">
            <h2 className="modal-title">{car.name}</h2>
            <p className="modal-desc">{car.description}</p>

            <div className="modal-price">
              <span className="modal-price-label">Precio</span>
              <span className="modal-price-value">${car.price.toLocaleString()}</span>
            </div>

            <div className="modal-specs-grid">
              <div className="modal-spec-box">
                <span className="msb-label">Año</span>
                <span className="msb-value">{car.year}</span>
              </div>
              <div className="modal-spec-box">
                <span className="msb-label">Kilómetros</span>
                <span className="msb-value">{car.km.toLocaleString()} km</span>
              </div>
              <div className="modal-spec-box">
                <span className="msb-label">Combustible</span>
                <span className="msb-value">{car.fuel}</span>
              </div>
              <div className="modal-spec-box">
                <span className="msb-label">Transmisión</span>
                <span className="msb-value">{car.transmission}</span>
              </div>
              <div className="modal-spec-box">
                <span className="msb-label">Color</span>
                <span className="msb-value">{car.color}</span>
              </div>
              <div className="modal-spec-box">
                <span className="msb-label">Fotos</span>
                <span className="msb-value">{car.images.length} imágenes</span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="modal-btn-contact">📞 Contactar</button>
              <button className="modal-btn-close" onClick={onClose}>Cerrar</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
