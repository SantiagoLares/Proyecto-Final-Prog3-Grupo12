import { useState } from 'react';
import { register } from '../services/authService';

function Register() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {
        await register(nombre, email, password);

        alert('Usuario registrado correctamente');

        window.location.href = '/login';
    } catch (error) {
        console.log(error);
        alert('Error al registrarse');
    }
};

return (
    <div>
        <h1>Registro</h1>

        <form onSubmit={handleSubmit}>
        <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
        />

        <br />

        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button type="submit">Registrarse</button>
        </form>
    </div>
);
}

export default Register;