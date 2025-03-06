/**
 * Interfaz del repositorio de eventos
 * Define los métodos que debe implementar cualquier repositorio de eventos
 */
export default class IEventRepository {

    // eslint-disable-next-line no-unused-vars
    async createEvent(eventData) {
        throw new Error('Method not implemented');
    }

    /**
     * Obtiene todos los eventos
     * @returns {Promise<Array>} - Lista de eventos
     */
    async getEvents() {
        throw new Error('Method not implemented');
    }

    /**
     * Obtiene un evento por su ID
     * @param {string} eventId - ID del evento
     * @returns {Promise<Object>} - Datos del evento
     */
    // eslint-disable-next-line no-unused-vars
    async getEventById(eventId) {
        throw new Error('Method not implemented');
    }

    /**
     * Actualiza un evento existente
     * @param {string} eventId - ID del evento a actualizar
     * @param {Object} eventData - Nuevos datos del evento
     * @returns {Promise<Object>} - Datos actualizados del evento
     */
    // eslint-disable-next-line no-unused-vars
    async updateEvent(eventId, eventData) {
        throw new Error('Method not implemented');
    }

    /**
     * Elimina un evento
     * @param {string} eventId - ID del evento a eliminar
     * @returns {Promise<boolean>} - True si se eliminó correctamente
     */
    // eslint-disable-next-line no-unused-vars
    async deleteEvent(eventId) {
        throw new Error('Method not implemented');
    }
}