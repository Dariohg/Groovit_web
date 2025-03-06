// src/presentation/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
// ELIMINAR esta importación que causa el problema
// import { useNavigate } from 'react-router-dom';
import { LoginUseCase } from '../../core/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../core/usecases/auth/RegisterUseCase';
import authRepository from '../../infrastructure/repositories/AuthRepository';

// Instanciar casos de uso
const loginUseCase = new LoginUseCase(authRepository);
const registerUseCase = new RegisterUseCase(authRepository);

// Crear el contexto
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // ELIMINAR esta línea que causa el error
    // const navigate = useNavigate();

    // Función para verificar si un token JWT ha expirado
    const isTokenExpired = useCallback(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) return true;

        try {
            // Decodificar el token (JWT)
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3) return true;

            const payload = JSON.parse(atob(tokenParts[1]));

            // Verificar si ha expirado
            return payload.exp * 1000 < Date.now();
        } catch (error) {
            console.error('Error verificando expiración del token:', error);
            return true;
        }
    }, []);

    // Verificar si el usuario ya está autenticado al cargar la página
    useEffect(() => {
        const checkAuth = () => {
            // Verificar si hay un token en localStorage
            const token = localStorage.getItem('auth_token');
            const savedUser = localStorage.getItem('user');

            if (token && savedUser) {
                try {
                    // Verificar si el token ha expirado
                    if (isTokenExpired()) {
                        localStorage.removeItem('auth_token');
                        localStorage.removeItem('user');
                    } else {
                        setUser(JSON.parse(savedUser));
                    }
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('user');
                }
            }

            setLoading(false);
        };

        checkAuth();
    }, [isTokenExpired]);

    // Función para iniciar sesión
    const login = useCallback(async (username, password) => {
        try {
            // Usar el caso de uso de login
            const result = await loginUseCase.execute(username, password);

            if (result.success) {
                setUser(result.user);

                // Verificar si hay un evento pendiente guardado
                const pendingEvent = sessionStorage.getItem('pendingEvent');
                if (pendingEvent) {
                    // Limpiar el evento pendiente
                    sessionStorage.removeItem('pendingEvent');
                    // NO hacer la redirección aquí, devolver una bandera para que
                    // el componente Login la maneje
                    return {
                        ...result,
                        pendingEvent: true
                    };
                }
            }

            return result;
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error.message || 'Error al iniciar sesión'
            };
        }
    }, []);

    // Función para registrar un nuevo usuario
    const register = useCallback(async (userData) => {
        try {
            // Usar el caso de uso de registro
            return await registerUseCase.execute(userData);
        } catch (error) {
            console.error('Register error:', error);
            return {
                success: false,
                error: error.message || 'Error al registrar'
            };
        }
    }, []);

    // Función para cerrar sesión
    const logout = useCallback(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        setUser(null);
        // NO navegar aquí, solo devolver true
        return true;
    }, []);

    // Verificar si el usuario está autenticado
    const isAuthenticated = useCallback(() => {
        if (isTokenExpired()) {
            // Limpiar datos si el token ha expirado
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            setUser(null);
            return false;
        }
        return !!user;
    }, [user, isTokenExpired]);

    // Memoizar el valor del contexto para evitar renderizados innecesarios
    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};