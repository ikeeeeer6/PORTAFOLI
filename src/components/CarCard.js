import React from 'react';
import { CarouselImages } from './CarouselImages';
import '../styles/CarCard.css';

export const CarCard = ({ car, onSelect }) => {
  return (
    <div className="car-card">
      <CarouselImages
        images={car.images}
        carName={car.name}
      />

      <div className="car-info">
        <h2 className="car-name">{car.name}</h2>

        <p className="car-description">{car.description}</p>

        <div className="car-specs">
          <div className="spec">
            <span className="spec-label">Año:</span>
            <span className="spec-value">{car.year}</span>
          </div>
          <div className="spec">
            <span className="spec-label">KM:</span>
            <span className="spec-value">{car.km.toLocaleString()}</span>
          </div>
          <div className="spec">
            <span className="spec-label">Combustible:</span>
            <span className="spec-value">{car.fuel}</span>
          </div>
          <div className="spec">
            <span className="spec-label">Transmisión:</span>
            <span className="spec-value">{car.transmission}</span>
          </div>
          <div className="spec">
            <span className="spec-label">Color:</span>
            <span className="spec-value">{car.color}</span>
          </div>
        </div>

        <div className="car-price">
          <p className="price">{Number(car.price).toLocaleString('es-ES')} €</p>
        </div>

        <button className="btn-primary" onClick={() => onSelect(car)}>
          Ver detalles
        </button>
      </div>
    </div>
  );
};
