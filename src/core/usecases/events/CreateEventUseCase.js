// src/core/usecases/events/CreateEventUseCase.js
/**
 * Caso de uso para crear un nuevo evento
 */
export class CreateEventUseCase {
    /**
     * @param {import('../../../interfaces/repositories/IEventRepository').default} eventRepository Repositorio de eventos
     */
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }

    /**
     * Ejecuta el caso de uso
     * @param {Object} eventData - Datos del evento a crear
     * @returns {Promise<Object>} - Resultado de la operación
     */
    async execute(eventData) {
        try {
            // Validar datos
            this.validateEventData(eventData);

            // Llamar al repositorio para crear el evento
            const result = await this.eventRepository.createEvent(eventData);

            return {
                success: true,
                event: result
            };
        } catch (error) {
            console.error('Error en CreateEventUseCase:', error);
            return {
                success: false,
                error: error.message || 'Error al crear el evento'
            };
        }
    }

    /**
     * Valida los datos del evento
     * @param {Object} eventData - Datos del evento a validar
     */
    validateEventData(eventData) {
        const { titulo, descripcion, fecha, capacidad, lugares_disponibles, precio, ubicacion, genero } = eventData;

        if (!titulo || !descripcion || !fecha || !capacidad || !lugares_disponibles || !precio || !ubicacion || !genero) {
            throw new Error('Todos los campos son requeridos');
        }

        // Validación de capacidad y precio
        if (isNaN(Number(capacidad)) || Number(capacidad) <= 0) {
            throw new Error('La capacidad debe ser un número mayor a 0');
        }

        if (isNaN(Number(precio)) || Number(precio) < 0) {
            throw new Error('El precio debe ser un número no negativo');
        }

        if (isNaN(Number(lugares_disponibles)) || Number(lugares_disponibles) <= 0) {
            throw new Error('Los lugares disponibles deben ser un número mayor a 0');
        }

        if (Number(lugares_disponibles) > Number(capacidad)) {
            throw new Error('Los lugares disponibles no pueden exceder la capacidad');
        }

        // Validación de fecha
        const fechaEvento = new Date(fecha);
        if (isNaN(fechaEvento.getTime())) {
            throw new Error('La fecha no es válida');
        }

        // Opcional: validar que la fecha sea futura
        if (fechaEvento < new Date()) {
            throw new Error('La fecha del evento debe ser futura');
        }
    }
}