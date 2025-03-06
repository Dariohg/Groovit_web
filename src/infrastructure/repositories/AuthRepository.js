import apiClient from '../api/apiClient';
import IAuthRepository from '../../interfaces/repositories/IAuthRepository';

/**
 * Implementación del repositorio de autenticación
 * Se encarga de las operaciones de login y registro
 */
class AuthRepository extends IAuthRepository {
    /**
     * Inicia sesión como administrador
     * @param {string} username - Nombre de usuario
     * @param {string} contraseña - Contraseña del usuario
     * @returns {Promise<Object>} - Datos del usuario autenticado y token
     */
    async loginAdmin(username, contraseña) {
        try {
            const response = await apiClient.post('/auth/login-admin', {
                username,
                contraseña
            });
            return response.data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    }

    /**
     * Registra un nuevo administrador
     * @param {Object} userData - Datos del usuario a registrar
     * @returns {Promise<Object>} - Datos del usuario registrado
     */
    async registerAdmin(userData) {
        try {
            const response = await apiClient.post('/admin', userData);
            return response.data;
        } catch (error) {
            console.error('Error en registro:', error);
            throw error;
        }
    }
}

export default new AuthRepository();