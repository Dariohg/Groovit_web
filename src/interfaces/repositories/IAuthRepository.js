/**
 * Interfaz del repositorio de autenticación
 * Define los métodos que debe implementar cualquier repositorio de autenticación
 */
export default class IAuthRepository {
    /**
     * Inicia sesión como administrador
     * @param {string} username - Nombre de usuario
     * @param {string} contraseña - Contraseña del usuario
     * @returns {Promise<Object>} - Datos del usuario autenticado y token
     */
    // eslint-disable-next-line no-unused-vars
    async loginAdmin(username, contraseña) {
        throw new Error('Method not implemented');
    }

    /**
     * Registra un nuevo administrador
     * @param {Object} userData - Datos del usuario a registrar
     * @returns {Promise<Object>} - Datos del usuario registrado
     */
    // eslint-disable-next-line no-unused-vars
    async registerAdmin(userData) {
        throw new Error('Method not implemented');
    }
}