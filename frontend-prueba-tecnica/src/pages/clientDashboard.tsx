import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

interface Product {
    _id: string;
    name: string;
    description: string;
    createdBy: string;
}

interface Order {
    _id: string;
    products: Product[];
    createdAt: string;
}

const ClientDashboard = () => {
    const { token, user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchProducts = async () => {
        const res = await fetch('http://localhost:3000/products');
        const data = await res.json();
        setProducts(data);
    };

    const fetchOrders = async () => {
        const res = await fetch('http://localhost:3000/orders', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.ok) {
            const data = await res.json();
            setOrders(data);
        } else {
            alert('Error al cargar órdenes');
        }
    };

    const handleOrder = async () => {
        const res = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                productId: selectedProductId,
                userId: user?.id
            })
        });

        if (res.ok) {
            alert('Orden creada con éxito');
            fetchOrders();
        } else {
            const error = await res.json();
            alert('Error al crear la orden: ' + (error.message || ''));
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Dashboard Cliente</h1>

            <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full border p-2 rounded mb-4"
            >
                <option value="">Seleccione un producto</option>
                {products.map((product) => (
                    <option key={product._id} value={product._id}>
                        {product.name}
                    </option>
                ))}
            </select>

            <button
                onClick={handleOrder}
                className="bg-green-600 text-white px-4 py-2 rounded"
                disabled={!selectedProductId}
            >
                Hacer Orden
            </button>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Mis Órdenes</h2>
                {orders.length === 0 ? (
                    <p className="text-gray-600">No hay órdenes registradas.</p>
                ) : (
                    <ul className="space-y-4">
                        {orders.map((order) => (
                            <li key={order._id} className="border p-4 rounded shadow">
                                <p className="font-semibold mb-2">Orden ID: {order._id}</p>
                                <ul className="list-disc list-inside">
                                    {order.products.map((product) => (
                                        <li key={product._id}>{product.name}</li>
                                    ))}
                                </ul>
                                <p className="text-sm text-gray-500 mt-2">Fecha: {new Date(order.createdAt).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ClientDashboard;


