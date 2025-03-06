// src/infrastructure/repositories/EventRepository.js
import apiClient from '../api/apiClient';
import IEventRepository from '../../interfaces/repositories/IEventRepository';

/**
 * Implementación del repositorio de eventos
 * Se encarga de las operaciones CRUD sobre eventos
 */
class EventRepository extends IEventRepository {
    /**
     * Crea un nuevo evento
     * @param {Object} eventData - Datos del evento a crear
     * @returns {Promise<Object>} - Datos del evento creado
     */
    async createEvent(eventData) {
        try {
            // Para enviar archivos (imágenes), usamos FormData
            const formData = new FormData();

            // Agregar todos los campos de texto
            Object.keys(eventData).forEach(key => {
                if (key !== 'imagen') {
                    formData.append(key, eventData[key]);
                }
            });

            // Agregar la imagen si existe
            if (eventData.imagen && eventData.imagen instanceof File) {
                formData.append('imagen', eventData.imagen);
            }

            // Configurar opciones para enviar FormData
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response = await apiClient.post('/eventos', formData, config);
            console.log('Evento creado exitosamente:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error al crear evento:', error);
            throw error;
        }
    }

    /**
     * Obtiene todos los eventos
     * @returns {Promise<Array>} - Lista de eventos
     */
    async getEvents() {
        try {
            const response = await apiClient.get('/eventos');
            return response.data;
        } catch (error) {
            console.error('Error al obtener eventos:', error);
            throw error;
        }
    }

    /**
     * Obtiene un evento por su ID
     * @param {string} eventId - ID del evento
     * @returns {Promise<Object>} - Datos del evento
     */
    async getEventById(eventId) {
        try {
            const response = await apiClient.get(`/eventos/${eventId}`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener evento con ID ${eventId}:`, error);
            throw error;
        }
    }

    /**
     * Actualiza un evento existente
     * @param {string} eventId - ID del evento a actualizar
     * @param {Object} eventData - Nuevos datos del evento
     * @returns {Promise<Object>} - Datos actualizados del evento
     */
    async updateEvent(eventId, eventData) {
        try {
            // Usar FormData para actualizar, similar a createEvent
            const formData = new FormData();

            Object.keys(eventData).forEach(key => {
                if (key !== 'imagen') {
                    formData.append(key, eventData[key]);
                }
            });

            if (eventData.imagen && eventData.imagen instanceof File) {
                formData.append('imagen', eventData.imagen);
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response = await apiClient.put(`/eventos/${eventId}`, formData, config);
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar evento con ID ${eventId}:`, error);
            throw error;
        }
    }

    /**
     * Elimina un evento
     * @param {string} eventId - ID del evento a eliminar
     * @returns {Promise<boolean>} - True si se eliminó correctamente
     */
    async deleteEvent(eventId) {
        try {
            await apiClient.delete(`/eventos/${eventId}`);
            return true;
        } catch (error) {
            console.error(`Error al eliminar evento con ID ${eventId}:`, error);
            throw error;
        }
    }
}

export default new EventRepository();