import React, { useState, useEffect } from 'react';
import '../styles/CarDetail.css';

export const CarDetail = ({ car, onBack }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll al top al abrir
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Navegación con teclado
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') setActiveIndex(i => (i + 1) % car.images.length);
      if (e.key === 'ArrowLeft')  setActiveIndex(i => (i - 1 + car.images.length) % car.images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [car.images.length]);

  return (
    <div className="car-detail-page">

      {/* Breadcrumb / botón volver */}
      <div className="detail-breadcrumb">
        <button className="detail-back-btn" onClick={onBack}>
          ← Volver al catálogo
        </button>
        <span className="detail-breadcrumb-sep">/</span>
        <span className="detail-breadcrumb-name">{car.name}</span>
      </div>

      <div className="detail-layout">

        {/* ── COLUMNA IZQUIERDA: fotos ── */}
        <div className="detail-left">

          {/* Foto principal */}
          <div className="detail-main-photo">
            <img
              src={car.images[activeIndex]}
              alt={`${car.name} - foto ${activeIndex + 1}`}
              className="detail-main-img"
            />

            {/* Flechas */}
            <button
              className="detail-arrow detail-arrow-left"
              onClick={() => setActiveIndex(i => (i - 1 + car.images.length) % car.images.length)}
            >&#8249;</button>
            <button
              className="detail-arrow detail-arrow-right"
              onClick={() => setActiveIndex(i => (i + 1) % car.images.length)}
            >&#8250;</button>

            {/* Contador */}
            <span className="detail-counter">{activeIndex + 1} / {car.images.length}</span>
          </div>

          {/* Miniaturas */}
          <div className="detail-thumbs">
            {car.images.map((img, i) => (
              <button
                key={i}
                className={`detail-thumb ${i === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(i)}
              >
                <img src={img} alt={`${car.name} miniatura ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* ── COLUMNA DERECHA: detalles ── */}
        <div className="detail-right">

          <h1 className="detail-car-name">{car.name}</h1>
          <p className="detail-car-desc">{car.description}</p>

          {/* Precio */}
          <div className="detail-price-block">
            <span className="detail-price-label">Precio</span>
            <span className="detail-price">${car.price.toLocaleString()}</span>
          </div>

          {/* Especificaciones */}
          <div className="detail-specs-title">Especificaciones</div>
          <div className="detail-specs-grid">
            <div className="detail-spec">
              <span className="ds-label">Año</span>
              <span className="ds-value">{car.year}</span>
            </div>
            <div className="detail-spec">
              <span className="ds-label">Kilómetros</span>
              <span className="ds-value">{car.km.toLocaleString()} km</span>
            </div>
            <div className="detail-spec">
              <span className="ds-label">Combustible</span>
              <span className="ds-value">{car.fuel}</span>
            </div>
            <div className="detail-spec">
              <span className="ds-label">Transmisión</span>
              <span className="ds-value">{car.transmission}</span>
            </div>
            <div className="detail-spec">
              <span className="ds-label">Color</span>
              <span className="ds-value">{car.color}</span>
            </div>
            <div className="detail-spec">
              <span className="ds-label">Fotos</span>
              <span className="ds-value">{car.images.length} imágenes</span>
            </div>
          </div>

          {/* Acciones */}
          <div className="detail-actions">
            <button className="detail-btn-contact">Contactar</button>
            <button className="detail-btn-back" onClick={onBack}>← Volver</button>
          </div>
        </div>

      </div>
    </div>
  );
};
