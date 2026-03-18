import React, { useState, useMemo } from 'react';
import { CarCard } from './CarCard';
import '../styles/CarsList.css';
import '../styles/Filters.css';

export const CarsList = ({ cars, onSelect }) => {
  const [filters, setFilters] = useState({
    search: '',
    minYear: '',
    maxKm: '',
    fuel: '',
    maxPrice: '',
    sortBy: '',
  });

  const fuels = [...new Set(cars.map(c => c.fuel))];
  const maxCarPrice = cars.length > 0 ? Math.max(...cars.map(c => c.price)) : 0;

  const handleChange = (e) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({ search: '', minYear: '', maxKm: '', fuel: '', maxPrice: '', sortBy: '' });
  };

  const filtered = useMemo(() => {
    let result = [...cars];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q));
    }
    if (filters.minYear) {
      result = result.filter(c => c.year >= Number(filters.minYear));
    }
    if (filters.maxKm) {
      result = result.filter(c => c.km <= Number(filters.maxKm));
    }
    if (filters.fuel) {
      result = result.filter(c => c.fuel === filters.fuel);
    }
    if (filters.maxPrice) {
      result = result.filter(c => c.price <= Number(filters.maxPrice));
    }
    if (filters.sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (filters.sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (filters.sortBy === 'year-desc') result.sort((a, b) => b.year - a.year);
    if (filters.sortBy === 'km-asc') result.sort((a, b) => a.km - b.km);

    return result;
  }, [cars, filters]);

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <section id="cars" className="cars-section">
      <div className="section-header">
        <h2>Nuestros Vehículos</h2>
        <p>Encuentra tu coche perfecto</p>
      </div>

      <div className="filters-bar">
        <div className="filter-group filter-search">
          <input
            type="text"
            name="search"
            placeholder="Buscar por marca o modelo..."
            value={filters.search}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <input
            type="number"
            name="minYear"
            placeholder="Año mínimo"
            min="1950"
            max="2100"
            value={filters.minYear}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <input
            type="number"
            name="maxKm"
            placeholder="Kilómetros máximos"
            min="0"
            value={filters.maxKm}
            onChange={handleChange}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <select name="fuel" value={filters.fuel} onChange={handleChange} className="filter-select">
            <option value="">Combustible</option>
            {fuels.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>

        <div className="filter-group filter-price">
          <label className="filter-label">
            Precio max.: {filters.maxPrice ? `${Number(filters.maxPrice).toLocaleString('es-ES')} €` : 'Todos'}
          </label>
          <input
            type="range"
            name="maxPrice"
            min={0}
            max={maxCarPrice}
            step={1000}
            value={filters.maxPrice || maxCarPrice}
            onChange={handleChange}
            className="filter-range"
          />
        </div>

        <div className="filter-group">
          <select name="sortBy" value={filters.sortBy} onChange={handleChange} className="filter-select">
            <option value="">Ordenar por</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="year-desc">Año: más nuevo</option>
            <option value="km-asc">Kilometraje: menor</option>
          </select>
        </div>

        {hasActiveFilters && (
          <button className="filter-clear" onClick={clearFilters}>
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="results-count">
        <span>{filtered.length} vehículo{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {filtered.length > 0 ? (
        <div className="cars-grid">
          {filtered.map(car => (
            <CarCard key={car.id} car={car} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No se han encontrado vehículos con estos filtros.</p>
          <button className="filter-clear" onClick={clearFilters}>Limpiar filtros</button>
        </div>
      )}
    </section>
  );
};
