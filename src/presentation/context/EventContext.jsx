// src/presentation/context/EventContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import { CreateEventUseCase } from '../../core/usecases/events/CreateEventUseCase';
import eventRepository from '../../infrastructure/repositories/EventRepository';

// Instanciar casos de uso
const createEventUseCase = new CreateEventUseCase(eventRepository);

// Crear el contexto
const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función para crear un evento
    const createEvent = useCallback(async (eventData) => {
        setLoading(true);
        setError(null);

        try {
            // Usar el caso de uso para crear el evento
            const result = await createEventUseCase.execute(eventData);

            if (result.success) {
                // Actualizar la lista de eventos si fue exitoso
                setEvents(prev => [...prev, result.event]);
            } else {
                setError(result.error);
            }

            return result;
        } catch (error) {
            console.error('Error creating event:', error);
            const errorMessage = error.message || 'Error al crear el evento';
            setError(errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        } finally {
            setLoading(false);
        }
    }, []);

    // Función para obtener todos los eventos
    const getEvents = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const result = await eventRepository.getEvents();
            setEvents(result);
            return {
                success: true,
                events: result
            };
        } catch (error) {
            console.error('Error fetching events:', error);
            const errorMessage = error.message || 'Error al obtener los eventos';
            setError(errorMessage);
            return {
                success: false,
                error: errorMessage
            };
        } finally {
            setLoading(false);
        }
    }, []);

    // Memoizar el valor del contexto para evitar renderizados innecesarios
    const value = {
        events,
        loading,
        error,
        createEvent,
        getEvents
    };

    return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};

// Hook personalizado para usar el contexto de eventos
export const useEvents = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEvents debe ser usado dentro de un EventProvider');
    }
    return context;
};