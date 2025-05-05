import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Error al iniciar sesión');
                return;
            }

            // decodificar el token para extraer el rol
            const [, payload] = data.token.split('.');
            const decoded = JSON.parse(atob(payload));
            const user = {
                id: decoded.id,
                role: decoded.role || 'client'
            };

            login(data.token, user);
            navigate(user.role === 'admin' ? '/admin' : '/client');

            login(data.token, user);
        } catch (err) {
            setError('Error en la conexión con el servidor');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-80 space-y-4">
                <h2 className="text-2xl font-bold text-center">Iniciar Sesión</h2>

                {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    className="w-full p-2 border rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default Login;
