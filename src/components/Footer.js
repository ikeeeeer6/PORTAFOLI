import React from 'react';
import '../styles/Footer.css';

export const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>BCN GROUP MOTORS</h3>
          <p>Tu plataforma de confianza para comprarn coches</p>
        </div>
        
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="#home">Inicio</a></li>
            <li><a href="#cars">Catálogo</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>📞 +34 627 076 235</p>
          <p>📞 +34 658 650 669</p>
          <p>📍 Barcelona, España</p>
        </div>
        
        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-links">
            <a href="https://www.instagram.com/groupmotorsbcn/">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 BCN GROUP MOTORS. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
