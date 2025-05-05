import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import AdminDashboard from '../pages/adminDashboard';
import ClientDashboard from '../pages/clientDashboard';
import { useAuth } from '../context/AuthContext';
import { ReactNode } from 'react';
import Register from '../pages/register';


const PrivateRoute = ({ children, role }: { children: ReactNode; role: 'admin' | 'client' }) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;
    if (user.role !== role) return <Navigate to="/" />;

    return children;
};

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route
                    path="/admin"
                    element={
                        <PrivateRoute role="admin">
                            <AdminDashboard />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/client"
                    element={
                        <PrivateRoute role="client">
                            <ClientDashboard />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
