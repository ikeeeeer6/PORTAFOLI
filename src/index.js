import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CarsList } from './components/CarsList';
import { Footer } from './components/Footer';
import { carsData } from './data/cars';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Header />
        <Hero />
        <CarsList cars={carsData} />
        <Footer />
    </React.StrictMode>
);
