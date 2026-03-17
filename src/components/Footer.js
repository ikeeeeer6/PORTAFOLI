import React from 'react';
import '../styles/Footer.css';

export const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>AutoHub</h3>
          <p>Tu plataforma de confianza para comprar y vender coches</p>
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
          <p>📧 info@autohub.com</p>
          <p>📞 +34 666 777 888</p>
          <p>📍 Barcelona, España</p>
        </div>
        
        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-links">
            <a href="#facebook">Facebook</a>
            <a href="#instagram">Instagram</a>
            <a href="#twitter">Twitter</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 AutoHub. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};
