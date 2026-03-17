import React, { useState } from 'react';
import { CarouselImages } from './CarouselImages';
import '../styles/CarCard.css';

export const CarCard = ({ car }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="car-card">
      <CarouselImages images={car.images} carName={car.name} />
      
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
          <p className="price">${car.price.toLocaleString()}</p>
        </div>

        <button 
          className="btn-primary"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Ver menos' : 'Ver detalles'}
        </button>

        {isExpanded && (
          <div className="expanded-details">
            <p>¡Contacta con nosotros para más información sobre este vehículo!</p>
            <button className="btn-contact">Contactar</button>
          </div>
        )}
      </div>
    </div>
  );
};
