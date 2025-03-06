/**
 * Caso de uso para iniciar sesión de administrador
 */
export class LoginUseCase {
    /**
     * @param {import('../../../interfaces/repositories/IAuthRepository').default} authRepository Repositorio de autenticación
     */
    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    /**
     * Ejecuta el caso de uso
     * @param {string} username - Nombre de usuario
     * @param {string} password - Contraseña del usuario
     * @returns {Promise<Object>} - Resultado de la operación
     */
    async execute(username, password) {
        try {
            // Llamar al repositorio para realizar el login
            const result = await this.authRepository.loginAdmin(username, password);

            // Guardar datos de autenticación en localStorage
            if (result && result.token) {
                localStorage.setItem('auth_token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user || { username }));
            }

            return {
                success: true,
                user: result.user || { username },
                token: result.token
            };
        } catch (error) {
            console.error('Error en LoginUseCase:', error);
            return {
                success: false,
                error: error.message || 'Credenciales inválidas'
            };
        }
    }
}