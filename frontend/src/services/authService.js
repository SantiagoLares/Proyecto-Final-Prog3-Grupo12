import axios from 'axios'; //importa axios, sirve para hacer peticiones http a la API del backend

const API_URL = '/api/auth'; // Define URL base para las solicitudes de autenticación

export const login = async (email, password) => { // funct inicio sesion
    const response = await axios.post(`${API_URL}/login`, { // solicitud post a backend
        email,
        password
    });

    return response.data;
};

export const register = async (nombre, email, password) => { // funct registro usuario
    const response = await axios.post(`${API_URL}/register`, { 
        nombre,
        email, 
        password 
    });

    return response.data; 
};

export const obtenerPerfil = async (token) => { // funct obtener perfil
    const response = await axios.get(`${API_URL}/perfil`, {
        headers: {
        Authorization: `Bearer ${token}`
    }
    });

    return response.data;
};