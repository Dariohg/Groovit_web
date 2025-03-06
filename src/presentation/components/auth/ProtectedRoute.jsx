// src/presentation/components/auth/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Center, Spinner } from '@chakra-ui/react';

/**
 * Componente que protege rutas, redirigiendo al login
 * si el usuario no está autenticado
 */
const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    // Si está cargando, muestra un spinner
    if (loading) {
        return (
            <Center h="100vh">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="groovit.purple"
                    size="xl"
                />
            </Center>
        );
    }

    // Si no está autenticado, redirige al login
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    // Si está autenticado, renderiza las rutas hijas
    return <Outlet />;
};

export default ProtectedRoute;