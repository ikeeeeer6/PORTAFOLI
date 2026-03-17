import React, { useState } from 'react';
import './styles/App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CarsList } from './components/CarsList';
import { CarDetail } from './components/CarDetail';
import { Footer } from './components/Footer';
import { carsData } from './data/cars';

function App() {
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <div className="App">
      <Header onLogoClick={() => setSelectedCar(null)} />
      {selectedCar ? (
        <CarDetail car={selectedCar} onBack={() => setSelectedCar(null)} />
      ) : (
        <>
          <Hero />
          <CarsList cars={carsData} onSelect={setSelectedCar} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
