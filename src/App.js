import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CarsList } from './components/CarsList';
import { CarDetail } from './components/CarDetail';
import { Footer } from './components/Footer';
import { AdminAccess } from './components/AdminAccess';
import { carsData } from './data/cars';

const CUSTOM_CARS_KEY = 'customCars';

const getCarsFromStorage = () => {
  const storedCars = localStorage.getItem(CUSTOM_CARS_KEY);

  if (!storedCars) {
    return carsData;
  }

  try {
    const parsedCars = JSON.parse(storedCars);
    return [...parsedCars, ...carsData];
  } catch {
    return carsData;
  }
};

function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [cars, setCars] = useState(getCarsFromStorage);

  useEffect(() => {
    const handleStorageUpdate = (event) => {
      if (event.key === CUSTOM_CARS_KEY) {
        setCars(getCarsFromStorage());
      }
    };

    window.addEventListener('storage', handleStorageUpdate);
    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, []);

  const handleOpenAdmin = () => {
    setSelectedCar(null);
    setShowAdmin(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseAdmin = () => {
    setShowAdmin(false);
  };

  const handleAddCar = (newCarData) => {
    const nextId = cars.length ? Math.max(...cars.map((car) => car.id)) + 1 : 1;
    const hasUploadedImages = Array.isArray(newCarData.images) && newCarData.images.length > 0;

    const newCar = {
      id: nextId,
      name: newCarData.name,
      price: Number(newCarData.price),
      year: Number(newCarData.year),
      km: Number(newCarData.km),
      fuel: newCarData.fuel,
      transmission: newCarData.transmission,
      color: newCarData.color,
      description: newCarData.description,
      images: hasUploadedImages
        ? newCarData.images
        : ['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=400&fit=crop']
    };

    const updatedCars = [newCar, ...cars];
    setCars(updatedCars);

    const customCars = updatedCars.filter((car) => !carsData.some((baseCar) => baseCar.id === car.id));
    localStorage.setItem(CUSTOM_CARS_KEY, JSON.stringify(customCars));
  };

  return (
    <div className="App">
      <Header onOpenAdmin={handleOpenAdmin} />
      {selectedCar ? (
        <CarDetail car={selectedCar} onBack={() => setSelectedCar(null)} />
      ) : showAdmin ? (
        <AdminAccess onAddCar={handleAddCar} onClose={handleCloseAdmin} />
      ) : (
        <>
          <Hero />
          <CarsList cars={cars} onSelect={setSelectedCar} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
