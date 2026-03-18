import React from 'react';
import '../styles/header.css';
import logo from '../imatges/logo_bcn_motor_group.png';

export const Header = ({ onOpenAdmin }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="BCN MOTOR GROUP" className="header-logo" />
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Inicio</a></li>
            <li><a href="#cars">Coches</a></li>
            <li><a href="#contact">Contacto</a></li>
            <li>
              <button type="button" className="login-toggle" onClick={onOpenAdmin}>Perfil</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
