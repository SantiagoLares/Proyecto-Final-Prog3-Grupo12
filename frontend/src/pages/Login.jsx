import { useState } from 'react';
import { login } from '../services/authService';

function Login() { 
    const [email, setEmail] = useState(''); // email y password son los campos del formulario de login
    const [password, setPassword] = useState(''); 

    const handleSubmit = async (e) => { // se ejecuta cuando se envía el formulario de login
        e.preventDefault();

        try {
            const data = await login(email, password);

            localStorage.setItem('token', data.token);

            console.log(data);

            alert('Login exitoso');
            window.location.href = '/profile';
        } catch (error) {
        console.error(error);

        alert('Error al iniciar sesión');
        }
    };

    return (
        <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <br />

            <button type="submit">
            Iniciar sesión
            </button>
        </form>
        </div>
    );
}

export default Login;