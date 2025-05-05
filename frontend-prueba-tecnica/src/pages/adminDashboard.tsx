import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

interface Product {
    _id: string;
    name: string;
    description: string;
    createdBy: string;
}

const AdminDashboard = () => {
    const { token } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [form, setForm] = useState({ name: '', description: '' });


    const fetchProducts = async () => {
        const res = await fetch('http://localhost:3000/products');
        const data = await res.json();
        setProducts(data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(form)
        });
        if (res.ok) {
            setForm({ name: '', description: '' });
            fetchProducts(); // actualizar lista
        } else {
            alert('Error al crear producto');
        }
    };

    const handleDelete = async (id: string) => {
        const res = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.ok) {
            fetchProducts();
        } else {
            alert('Error al eliminar producto');
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Dashboard Administrador</h1>

            <form onSubmit={handleCreate} className="mb-6 space-y-2">
                <input
                    name="name"
                    placeholder="Nombre del producto"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    name="description"
                    placeholder="Descripción"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                    Crear Producto
                </button>
            </form>

            <ul className="space-y-4">
                {products.map((product) => (
                    <li key={product._id} className="border p-4 rounded shadow">
                        <h3 className="font-semibold">{product._id}</h3>
                        <p>{product.description}</p>
                        <button
                            onClick={() => handleDelete(product._id)}
                            className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;