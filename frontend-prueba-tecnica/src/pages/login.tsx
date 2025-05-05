import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const err = await res.json();
                alert(err.message || 'Error al iniciar sesión');
                return;
            }

            const data = await res.json();

            const payload = JSON.parse(atob(data.token.split('.')[1]));
            login(data.token, {
                id: payload.id,
                email: form.email, // o payload.email si lo incluiste
                role: payload.role,
            });

            navigate(payload.role === 'admin' ? '/admin' : '/client');
        } catch (error) {
            console.error('Login error:', error);
            alert('Error en la conexión con el servidor');
        }
    };


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-center">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    className="w-full border p-2 rounded"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="w-full border p-2 rounded"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default Login;


