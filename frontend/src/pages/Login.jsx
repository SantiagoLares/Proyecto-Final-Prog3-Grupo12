import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      localStorage.setItem('token', data.token);

      alert('Login exitoso');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Iniciar sesión
          </button>
        </form>

        <p>
          Usuario demo: <strong>admin@inventario.com</strong>
        </p>

        <p>
          ¿No tenés cuenta? <Link to="/register">Registrarse</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;