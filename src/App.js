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
const DELETED_BASE_CARS_KEY = 'deletedBaseCars';

const getCarsFromStorage = () => {
  const storedCars = localStorage.getItem(CUSTOM_CARS_KEY);
  const storedDeletedBaseCars = localStorage.getItem(DELETED_BASE_CARS_KEY);

  let deletedBaseIds = [];
  if (storedDeletedBaseCars) {
    try {
      deletedBaseIds = JSON.parse(storedDeletedBaseCars);
    } catch {
      deletedBaseIds = [];
    }
  }

  const visibleBaseCars = carsData.filter((car) => !deletedBaseIds.includes(car.id));

  if (!storedCars) {
    return visibleBaseCars;
  }

  try {
    const parsedCars = JSON.parse(storedCars);
    return [...parsedCars, ...visibleBaseCars];
  } catch {
    return visibleBaseCars;
  }
};

const saveCarsToStorage = (updatedCars) => {
  const customCars = updatedCars.filter((car) => !carsData.some((baseCar) => baseCar.id === car.id));
  const deletedBaseIds = carsData
    .filter((baseCar) => !updatedCars.some((car) => car.id === baseCar.id))
    .map((car) => car.id);

  localStorage.setItem(CUSTOM_CARS_KEY, JSON.stringify(customCars));
  localStorage.setItem(DELETED_BASE_CARS_KEY, JSON.stringify(deletedBaseIds));
};

function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [cars, setCars] = useState(getCarsFromStorage);

  useEffect(() => {
    const handleStorageUpdate = (event) => {
      if (event.key === CUSTOM_CARS_KEY || event.key === DELETED_BASE_CARS_KEY) {
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
    saveCarsToStorage(updatedCars);
  };

  const handleUpdateCar = (carId, updatedCarData) => {
    const updatedCars = cars.map((car) => {
      if (car.id !== carId) {
        return car;
      }

      const hasUpdatedImages = Array.isArray(updatedCarData.images) && updatedCarData.images.length > 0;

      return {
        ...car,
        name: updatedCarData.name,
        price: Number(updatedCarData.price),
        year: Number(updatedCarData.year),
        km: Number(updatedCarData.km),
        fuel: updatedCarData.fuel,
        transmission: updatedCarData.transmission,
        color: updatedCarData.color,
        description: updatedCarData.description,
        images: hasUpdatedImages
          ? updatedCarData.images
          : ['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=400&fit=crop']
      };
    });

    setCars(updatedCars);
    saveCarsToStorage(updatedCars);

    if (selectedCar && selectedCar.id === carId) {
      const refreshedSelectedCar = updatedCars.find((car) => car.id === carId) || null;
      setSelectedCar(refreshedSelectedCar);
    }
  };

  const handleDeleteCar = (carId) => {
    const updatedCars = cars.filter((car) => car.id !== carId);
    setCars(updatedCars);
    saveCarsToStorage(updatedCars);

    if (selectedCar && selectedCar.id === carId) {
      setSelectedCar(null);
    }
  };

  return (
    <div className="App">
      <Header onOpenAdmin={handleOpenAdmin} />
      {selectedCar ? (
        <CarDetail car={selectedCar} onBack={() => setSelectedCar(null)} />
      ) : showAdmin ? (
        <AdminAccess
          cars={cars}
          onAddCar={handleAddCar}
          onUpdateCar={handleUpdateCar}
          onDeleteCar={handleDeleteCar}
          onClose={handleCloseAdmin}
        />
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
