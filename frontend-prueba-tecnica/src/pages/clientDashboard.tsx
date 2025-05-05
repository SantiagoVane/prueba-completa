import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Panel de Cliente</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Cerrar sesión
            </button>
        </div>
    );
};

export default ClientDashboard;

