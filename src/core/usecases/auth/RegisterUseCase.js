/**
 * Caso de uso para registrar un nuevo administrador
 */
export class RegisterUseCase {
    /**
     * @param {import('../../../interfaces/repositories/IAuthRepository').default} authRepository Repositorio de autenticación
     */
    constructor(authRepository) {
        this.authRepository = authRepository;
    }

    /**
     * Ejecuta el caso de uso
     * @param {Object} userData - Datos del usuario a registrar
     * @returns {Promise<Object>} - Resultado de la operación
     */
    async execute(userData) {
        try {
            // Validar datos
            this.validateUserData(userData);

            // Llamar al repositorio para realizar el registro
            const result = await this.authRepository.registerAdmin(userData);

            return {
                success: true,
                user: result.user || userData
            };
        } catch (error) {
            console.error('Error en RegisterUseCase:', error);
            return {
                success: false,
                error: error.message || 'Error al registrar el usuario'
            };
        }
    }

    /**
     * Valida los datos del usuario
     * @param {Object} userData - Datos del usuario a validar
     */
    validateUserData(userData) {
        const { nombre, apellido, username, contraseña, email } = userData;

        if (!nombre || !apellido || !username || !contraseña || !email) {
            throw new Error('Todos los campos son requeridos');
        }

        // Validación básica de email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            throw new Error('El correo electrónico no es válido');
        }

        // Validación de contraseña
        if (contraseña.length < 3) {
            throw new Error('La contraseña debe tener al menos 3 caracteres');
        }
    }
}