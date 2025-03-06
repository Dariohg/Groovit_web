import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    // Verificar si el usuario ya está autenticado al cargar la página
    useEffect(() => {
        const checkAuth = () => {
            // Verificar si hay un token en localStorage
            const token = localStorage.getItem('auth_token');
            const savedUser = localStorage.getItem('user');

            if (token && savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('user');
                }
            }

            setLoading(false);
        };

        checkAuth();
    }, []);

    // Función para iniciar sesión
    const login = useCallback(async (username, password) => {
        try {
            // Usar el caso de uso de login
            const result = await loginUseCase.execute(username, password);

            if (result.success) {
                setUser(result.user);
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
        navigate('/login');
    }, [navigate]);

    // Verificar si el usuario está autenticado
    const isAuthenticated = useCallback(() => {
        return !!user;
    }, [user]);

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