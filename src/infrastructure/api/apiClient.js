// src/infrastructure/api/apiClient.js
import axios from 'axios';

// Configuración base del cliente axios
const apiClient = axios.create({
    baseURL: 'http://3.224.14.28:3000',  // URL base de la API
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos
});

// Interceptor para manejar errores
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Capturar errores específicos
        const errorResponse = {
            status: error.response?.status || 500,
            message: error.response?.data?.message || 'Error en la comunicación con el servidor',
            data: error.response?.data || null,
        };

        console.error('API Error:', errorResponse);

        // Reenviar el error para manejarlo en la capa superior
        return Promise.reject(errorResponse);
    }
);

// Interceptor para agregar token de autenticación si existe
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            // Enviar el token sin el prefijo Bearer
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;