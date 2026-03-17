import React from 'react';
import '../styles/header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>AUTOHUB</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Inicio</a></li>
            <li><a href="#cars">Coches</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
