import React from 'react';
import { CarCard } from './CarCard';
import '../styles/CarsList.css';

export const CarsList = ({ cars }) => {
  return (
    <section id="cars" className="cars-section">
      <div className="section-header">
        <h2>Nuestros Vehículos</h2>
        <p>Encuentra tu coche perfecto</p>
      </div>
      
      <div className="cars-grid">
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
};
