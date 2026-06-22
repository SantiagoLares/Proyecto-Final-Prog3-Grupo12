import { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('/api/auth/perfil', {
            headers: {
                Authorization: `Bearer ${token}`
            }
            });

            setUser(response.data.user);
        } catch (error) {
            console.log('Error al obtener perfil:', error);
        }
        };

        fetchUser();
    }, []);

    if (!user) return <p>Cargando perfil...</p>;

    return (
        <div>
        <h1>Perfil</h1>
        <p>Email: {user.email}</p>
        <p>ID: {user.id}</p>
        </div>
    );
    }

export default Profile;