import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { obtenerPerfil } from '../services/authService';

function Profile() {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const data = await obtenerPerfil(token);
        setUser(data.user);
      } catch (error) {
        console.error(error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setCargando(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (cargando) {
    return (
      <div className="page-container">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="page-container profile-page">
      <div className="page-header">
        <div>
          <h1>Perfil de usuario</h1>
          <p>Datos del usuario autenticado en el sistema.</p>
        </div>

        <div className="nav-actions">
          <Link to="/dashboard">Panel</Link>
          <Link to="/productos">Productos</Link>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
        </div>

        <div className="profile-info">
          <h2>{user?.nombre || 'Usuario'}</h2>

          <div className="profile-detail">
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>

          <div className="profile-detail">
            <span>ID de usuario</span>
            <strong>{user?.id}</strong>
          </div>

          <div className="profile-detail">
            <span>Estado</span>
            <strong className="status-ok">Sesión activa</strong>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <Link className="button-link" to="/dashboard">
          Volver al panel
        </Link>

        <button className="delete-btn" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Profile;