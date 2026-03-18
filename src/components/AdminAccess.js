import React, { useEffect, useState } from 'react';
import '../styles/AdminAccess.css';

const ADMIN_USER = 'admin';
const ADMIN_PASSWORD = '1234';
const ADMIN_SESSION_COOKIE = 'adminSession';

const initialFormState = {
  name: '',
  price: '',
  year: '',
  km: '',
  fuel: 'Gasolina',
  transmission: 'Manual',
  color: '',
  description: ''
};

export const AdminAccess = ({ cars, onAddCar, onUpdateCar, onDeleteCar, onClose }) => {
  const [credentials, setCredentials] = useState({ user: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [carForm, setCarForm] = useState(initialFormState);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingCarId, setEditingCarId] = useState(null);
  const [editingImages, setEditingImages] = useState([]);

  const getCookieValue = (cookieName) => {
    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const targetCookie = cookies.find((cookie) => cookie.startsWith(`${cookieName}=`));
    return targetCookie ? targetCookie.split('=')[1] : '';
  };

  const setAdminSessionCookie = () => {
    const oneWeekInSeconds = 60 * 60 * 24 * 7;
    document.cookie = `${ADMIN_SESSION_COOKIE}=1; path=/; max-age=${oneWeekInSeconds}; SameSite=Lax`;
  };

  useEffect(() => {
    if (getCookieValue(ADMIN_SESSION_COOKIE) === '1') {
      setIsLoggedIn(true);
      setLoginError('');
    }
  }, []);

  const handleLoginChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    if (credentials.user === ADMIN_USER && credentials.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
      setAdminSessionCookie();
      return;
    }

    setLoginError('Usuario o contraseña incorrectos.');
  };

  const handleCarChange = (e) => {
    setCarForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImagesChange = (e) => {
    setSelectedFiles(Array.from(e.target.files || []));
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('No se ha podido leer la imagen.'));
      reader.readAsDataURL(file);
    });

  const handleCarSubmit = async (e) => {
    e.preventDefault();

    let uploadedImageList = [];

    if (selectedFiles.length > 0) {
      uploadedImageList = await Promise.all(selectedFiles.map((file) => fileToDataUrl(file)));
    }

    if (editingCarId !== null) {
      const finalImages = [...editingImages, ...uploadedImageList];
      onUpdateCar(editingCarId, { ...carForm, images: finalImages });
      setSuccessMessage('Coche actualizado correctamente.');
    } else {
      onAddCar({ ...carForm, images: uploadedImageList });
      setSuccessMessage('Coche añadido correctamente al catálogo.');
    }

    setCarForm(initialFormState);
    setSelectedFiles([]);
    setEditingCarId(null);
    setEditingImages([]);

    setTimeout(() => {
      setSuccessMessage('');
    }, 2500);
  };

  const handleDeleteClick = (carId, carName) => {
    const shouldDelete = window.confirm(`¿Seguro que quieres eliminar "${carName}"?`);
    if (shouldDelete) {
      onDeleteCar(carId);

      if (editingCarId === carId) {
        setCarForm(initialFormState);
        setSelectedFiles([]);
        setEditingCarId(null);
        setEditingImages([]);
      }
    }
  };

  const handleEditClick = (car) => {
    setCarForm({
      name: car.name || '',
      price: car.price || '',
      year: car.year || '',
      km: car.km || '',
      fuel: car.fuel || 'Gasolina',
      transmission: car.transmission || 'Manual',
      color: car.color || '',
      description: car.description || ''
    });
    setSelectedFiles([]);
    setEditingCarId(car.id);
    setEditingImages(Array.isArray(car.images) ? car.images : []);
    setSuccessMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setCarForm(initialFormState);
    setSelectedFiles([]);
    setEditingCarId(null);
    setEditingImages([]);
    setSuccessMessage('');
  };

  const handleRemoveEditingImage = (imageIndex) => {
    setEditingImages((prev) => prev.filter((_, idx) => idx !== imageIndex));
  };

  return (
    <section id="admin" className="admin-section">
      <div className="admin-card">
        <div className="admin-header">
          <h2>Panel de Administración</h2>
          <button type="button" className="admin-btn logout" onClick={onClose}>
            Volver al catálogo
          </button>
        </div>
        {!isLoggedIn ? (
          <>
            <p>Inicia sesión para gestionar coches.</p>
            <form className="admin-form" onSubmit={handleLoginSubmit}>
              <div className="form-row">
                <label htmlFor="user">Usuario</label>
                <input
                  id="user"
                  type="text"
                  name="user"
                  value={credentials.user}
                  onChange={handleLoginChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>

              {loginError && <p className="form-message error">{loginError}</p>}

              <button className="admin-btn" type="submit">Entrar</button>

              <p className="form-help">Demo: usuario admin / contraseña 1234</p>
            </form>
          </>
        ) : (
          <>
            <p className="form-message success">
              {editingCarId !== null ? 'Editando coche seleccionado.' : 'Sesión iniciada. Añade coches al catálogo.'}
            </p>

            <form className="admin-form" onSubmit={handleCarSubmit}>
              <div className="form-grid">
                <div className="form-row">
                  <label htmlFor="name">Nombre</label>
                  <input id="name" name="name" value={carForm.name} onChange={handleCarChange} required />
                </div>

                <div className="form-row">
                  <label htmlFor="price">Precio</label>
                  <input id="price" name="price" type="number" min="1" value={carForm.price} onChange={handleCarChange} required />
                </div>

                <div className="form-row">
                  <label htmlFor="year">Año</label>
                  <input id="year" name="year" type="number" min="1950" max="2100" value={carForm.year} onChange={handleCarChange} required />
                </div>

                <div className="form-row">
                  <label htmlFor="km">Kilómetros</label>
                  <input id="km" name="km" type="number" min="0" value={carForm.km} onChange={handleCarChange} required />
                </div>

                <div className="form-row">
                  <label htmlFor="fuel">Combustible</label>
                  <select id="fuel" name="fuel" value={carForm.fuel} onChange={handleCarChange}>
                    <option value="Gasolina">Gasolina</option>
                    <option value="Diésel">Diésel</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="Eléctrico">Eléctrico</option>
                  </select>
                </div>

                <div className="form-row">
                  <label htmlFor="transmission">Transmisión</label>
                  <select id="transmission" name="transmission" value={carForm.transmission} onChange={handleCarChange}>
                    <option value="Manual">Manual</option>
                    <option value="Automática">Automática</option>
                  </select>
                </div>

                <div className="form-row">
                  <label htmlFor="color">Color</label>
                  <input id="color" name="color" value={carForm.color} onChange={handleCarChange} required />
                </div>

                <div className="form-row">
                  <label htmlFor="images">Imágenes (puedes seleccionar varias)</label>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                  />
                  <small className="form-help">
                    {editingCarId !== null
                      ? `Actuales: ${editingImages.length} | Nuevas: ${selectedFiles.length}`
                      : `Seleccionadas: ${selectedFiles.length}`}
                  </small>
                </div>
              </div>

              {editingCarId !== null && (
                <div className="form-row">
                  <label>Imágenes actuales (puedes quitarlas)</label>
                  {editingImages.length === 0 ? (
                    <p className="form-help">Este coche se quedará sin imágenes si no subes nuevas.</p>
                  ) : (
                    <div className="admin-edit-images-list">
                      {editingImages.map((image, index) => (
                        <div className="admin-edit-image-item" key={`${editingCarId}-img-${index}`}>
                          <img src={image} alt={`Imagen ${index + 1}`} className="admin-edit-image-preview" />
                          <button
                            type="button"
                            className="admin-btn delete"
                            onClick={() => handleRemoveEditingImage(index)}
                          >
                            Quitar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="form-row">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={carForm.description}
                  onChange={handleCarChange}
                  required
                />
              </div>

              {successMessage && <p className="form-message success">{successMessage}</p>}

              <div className="admin-form-actions">
                <button className="admin-btn" type="submit">
                  {editingCarId !== null ? 'Guardar cambios' : 'Guardar coche'}
                </button>
                {editingCarId !== null && (
                  <button type="button" className="admin-btn cancel" onClick={handleCancelEdit}>
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>

            <div className="admin-cars-manager">
              <h3>Coches publicados</h3>
              {cars.length === 0 ? (
                <p className="form-help">No hay coches disponibles.</p>
              ) : (
                <div className="admin-cars-list">
                  {cars.map((car) => (
                    <div className="admin-car-item" key={car.id}>
                      <div className="admin-car-meta">
                        <strong>{car.name}</strong>
                        <span>{car.year} | {car.fuel} | {Number(car.price).toLocaleString('es-ES')} €</span>
                      </div>
                      <div className="admin-car-actions">
                        <button
                          type="button"
                          className="admin-btn edit"
                          onClick={() => handleEditClick(car)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="admin-btn delete"
                          onClick={() => handleDeleteClick(car.id, car.name)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
