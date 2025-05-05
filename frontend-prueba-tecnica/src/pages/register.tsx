import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'client' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                alert('Registro exitoso');
                navigate('/login');
            } else {
                const error = await res.json();
                alert('Error: ' + (error.message || 'No se pudo registrar'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema al registrar');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-center">Registro de Usuario</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    className="w-full border p-2 rounded"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
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
                <select
                    name="role"
                    className="w-full border p-2 rounded"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="client">Cliente</option>
                    <option value="admin">Administrador</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Register;


