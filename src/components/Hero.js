import React from 'react';
import '../styles/Hero.css';

export const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Bienvenido a BCN GROUP MOTORS</h1>
        <p className="hero-subtitle">Los mejores coches a los mejores precios</p>
        <a href="#cars" className="btn-hero">Explorar Coches</a>
      </div>
      <div className="hero-overlay"></div>
    </section>
  );
};
