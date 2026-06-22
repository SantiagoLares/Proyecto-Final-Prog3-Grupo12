import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Sistema de Inventario</h1>
          <p>Panel principal para gestionar productos, categorías y movimientos de stock.</p>
        </div>

        <button className="secondary-btn" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      <div className="dashboard-grid">
        <Link className="dashboard-card" to="/productos">
          <h3>Productos</h3>
          <p>Alta, baja, edición, búsqueda y control de stock.</p>
        </Link>

        <Link className="dashboard-card" to="/categorias">
          <h3>Categorías</h3>
          <p>Organización de productos por rubro o tipo.</p>
        </Link>

        <Link className="dashboard-card" to="/movimientos">
          <h3>Movimientos</h3>
          <p>Registro de entradas y salidas de inventario.</p>
        </Link>

        <Link className="dashboard-card" to="/profile">
          <h3>Perfil</h3>
          <p>Datos del usuario autenticado.</p>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;