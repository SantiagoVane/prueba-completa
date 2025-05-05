import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AdminDashboard = () => {
    const { logout, token } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleCreateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ title, description })
            });

            const data = await response.json();

            if (!response.ok) {
                return setMessage(data.message || 'Error al crear el producto');
            }

            setMessage('✅ Producto creado exitosamente');
            setTitle('');
            setDescription('');
        } catch (err) {
            setMessage('❌ Error en la solicitud');
        }
    };

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>

            <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                    <label className="block font-medium">Título</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium">Descripción</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Crear Producto
                </button>
            </form>

            {message && <p className="mt-4 text-center text-sm">{message}</p>}

            <hr className="my-6" />

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Cerrar sesión
            </button>
        </div>
    );
};

export default AdminDashboard;
