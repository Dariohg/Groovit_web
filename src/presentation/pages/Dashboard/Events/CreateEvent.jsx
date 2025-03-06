import { useState, useRef, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
    SimpleGrid,
    Flex,
    Icon,
    Badge,
    useToast,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    HStack,
    useSteps,
    Stepper,
    Step,
    StepIndicator,
    StepStatus,
    StepIcon,
    StepNumber,
    StepTitle,
    StepDescription,
    StepSeparator,
    Image,
    FormErrorMessage,
    Select,
    Progress,
} from '@chakra-ui/react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaImage, FaMusic, FaMoneyBillWave, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../../infrastructure/api/apiClient';
import { useAuth } from '../../../context/AuthContext';

// Pasos del formulario
const steps = [
    { title: 'Información básica', description: 'Título y descripción' },
    { title: 'Detalles', description: 'Fecha, capacidad y precio' },
    { title: 'Ubicación', description: 'Lugar del evento' },
    { title: 'Complementos', description: 'Imagen y género' },
    { title: 'Revisión', description: 'Verificar información' }
];

const CreateEvent = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const fileInputRef = useRef();
    const { user, isAuthenticated } = useAuth();

    /*// Verificar autenticación al cargar
    useEffect(() => {
        if (!isAuthenticated()) {
            toast({
                title: 'Acceso denegado',
                description: 'Debes iniciar sesión para crear eventos',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            navigate('/login');
        }
    }, [isAuthenticated, navigate, toast]);
*/
    // Estado para manejar los pasos
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    // Estado para controlar el envío del formulario
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Estado para el formulario
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        fecha: '',
        capacidad: 200,
        lugares_disponibles: 200,
        precio: 500,
        imagen: null,
        imagenPreview: null,
        ubicacion: '',
        genero: '',
    });

    // Estado para los errores
    const [errors, setErrors] = useState({});

    // Efecto para cargar datos de un evento pendiente si existe
    useEffect(() => {
        const pendingEvent = sessionStorage.getItem('pendingEvent');
        if (pendingEvent) {
            try {
                const savedData = JSON.parse(pendingEvent);
                // Actualizar el formulario con los datos guardados, excepto la imagen
                setFormData(prev => ({
                    ...prev,
                    ...savedData,
                    imagen: prev.imagen,
                    imagenPreview: prev.imagenPreview
                }));

                toast({
                    title: 'Datos recuperados',
                    description: 'Se han recuperado los datos del evento que estabas creando',
                    status: 'info',
                    duration: 3000,
                    isClosable: true,
                });

                // Limpiar el storage
                sessionStorage.removeItem('pendingEvent');
            } catch (error) {
                console.error('Error loading pending event data:', error);
            }
        }
    }, [toast]);

    // Efecto para actualizar lugares_disponibles cuando cambia capacidad
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            lugares_disponibles: prev.capacidad
        }));
    }, [formData.capacidad]);

    // Manejador de cambios para los campos
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Manejador para los campos numéricos
    const handleNumberChange = (id, value) => {
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Manejador para la imagen
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Validar que sea una imagen
            if (!file.type.startsWith('image/')) {
                setErrors({
                    ...errors,
                    imagen: 'El archivo debe ser una imagen'
                });
                return;
            }

            // Limpiar error si existía
            const newErrors = {...errors};
            delete newErrors.imagen;
            setErrors(newErrors);

            // Crear URL para preview
            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData(prev => ({
                    ...prev,
                    imagen: file,
                    imagenPreview: event.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Validar el paso actual
    const validateStep = () => {
        const newErrors = {};

        switch (activeStep) {
            case 0: // Información básica
                if (!formData.titulo.trim()) newErrors.titulo = 'El título es requerido';
                if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';
                break;
            case 1: // Detalles
                if (!formData.fecha) newErrors.fecha = 'La fecha es requerida';
                if (formData.capacidad <= 0) newErrors.capacidad = 'La capacidad debe ser mayor a 0';
                if (formData.precio < 0) newErrors.precio = 'El precio debe ser mayor o igual a 0';
                break;
            case 2: // Ubicación
                if (!formData.ubicacion.trim()) newErrors.ubicacion = 'La ubicación es requerida';
                break;
            case 3: // Complementos
                if (!formData.genero.trim()) newErrors.genero = 'El género musical es requerido';
                break;
            default:
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Validar todo el formulario
    const validateForm = () => {
        const newErrors = {};

        if (!formData.titulo.trim()) newErrors.titulo = 'El título es requerido';
        if (!formData.descripcion.trim()) newErrors.descripcion = 'La descripción es requerida';
        if (!formData.fecha) newErrors.fecha = 'La fecha es requerida';
        if (formData.capacidad <= 0) newErrors.capacidad = 'La capacidad debe ser mayor a 0';
        if (formData.precio < 0) newErrors.precio = 'El precio debe ser mayor o igual a 0';
        if (!formData.ubicacion.trim()) newErrors.ubicacion = 'La ubicación es requerida';
        if (!formData.genero.trim()) newErrors.genero = 'El género musical es requerido';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Avanzar al siguiente paso
    const handleNext = () => {
        if (validateStep()) {
            setActiveStep(activeStep + 1);
        }
    };

    // Regresar al paso anterior
    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    // Verificar el token antes de enviar
    const verifyToken = () => {
        const token = localStorage.getItem('auth_token');
        console.log('Token de autenticación:', token);

        if (!token) {
            toast({
                title: 'Error de autenticación',
                description: 'No hay token de autenticación. Por favor, inicia sesión nuevamente.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return false;
        }

        // Verificar si el token está activo
        if (!isAuthenticated()) {
            toast({
                title: 'Sesión expirada',
                description: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            return false;
        }

        return true;
    };

    // Enviar el formulario
    const handleSubmit = async () => {
        if (!validateForm()) {
            toast({
                title: 'Error en el formulario',
                description: 'Por favor corrige los errores antes de continuar',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Verificar token antes de enviar
        if (!verifyToken()) {
            // Guardar datos en sessionStorage antes de redirigir
            sessionStorage.setItem('pendingEvent', JSON.stringify({
                ...formData,
                imagenPreview: null // No guardar la vista previa, sólo los datos
            }));
            navigate('/login');
            return;
        }

        setIsSubmitting(true);
        setUploadProgress(0);

        try {
            // Crear FormData para enviar datos y archivo
            const formDataToSend = new FormData();

            // Agregar datos del evento
            formDataToSend.append('titulo', formData.titulo);
            formDataToSend.append('descripcion', formData.descripcion);
            formDataToSend.append('fecha', formData.fecha);
            formDataToSend.append('capacidad', formData.capacidad);
            formDataToSend.append('lugares_disponibles', formData.lugares_disponibles);
            formDataToSend.append('precio', formData.precio);
            formDataToSend.append('ubicacion', formData.ubicacion);
            formDataToSend.append('genero', formData.genero);

            // Agregar imagen si existe
            if (formData.imagen) {
                formDataToSend.append('imagen', formData.imagen);
            }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem('auth_token')
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            };

            // Imprimir datos que se van a enviar para debug
            console.log('Enviando datos:', {
                titulo: formData.titulo,
                descripcion: formData.descripcion,
                fecha: formData.fecha,
                capacidad: formData.capacidad,
                lugares_disponibles: formData.lugares_disponibles,
                precio: formData.precio,
                ubicacion: formData.ubicacion,
                genero: formData.genero,
                imagen: formData.imagen ? formData.imagen.name : 'Sin imagen'
            });
            console.log('Config:', config);

            // Enviar datos al servidor
            const response = await apiClient.post('/eventos', formDataToSend, config);

            console.log('Respuesta del servidor:', response.data);

            // Mostrar mensaje de éxito
            toast({
                title: 'Evento creado',
                description: 'El evento se ha creado exitosamente',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            // Redirigir al dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Error al crear evento:', error);

            // Preparar mensaje de error
            let errorMessage = 'Ha ocurrido un error al crear el evento';

            if (error.message) {
                errorMessage = error.message;
            } else if (error.data && error.data.message) {
                errorMessage = error.data.message;
            }

            // Verificar si es un error de autenticación
            if (error.status === 401) {
                errorMessage = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';

                // Guardar datos en sessionStorage antes de redirigir
                sessionStorage.setItem('pendingEvent', JSON.stringify({
                    ...formData,
                    imagenPreview: null // No guardar la vista previa, sólo los datos
                }));

                // Informar al usuario antes de redirigir
                toast({
                    title: 'Sesión expirada',
                    description: errorMessage,
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                });

                // Limpiar token y redirigir a login
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
                setTimeout(() => navigate('/login'), 1500);
                return; // Salir para no mostrar otro toast
            }

            toast({
                title: 'Error',
                description: errorMessage,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Renderizar el paso actual
    const renderStep = () => {
        switch (activeStep) {
            case 0:
                return (
                    <Box>
                        <Stack spacing={6}>
                            <FormControl isInvalid={!!errors.titulo} isRequired>
                                <FormLabel htmlFor="titulo">Título del evento</FormLabel>
                                <Input
                                    id="titulo"
                                    placeholder="Ej. Festival de Música Electrónica 2023"
                                    value={formData.titulo}
                                    onChange={handleChange}
                                    bg="whiteAlpha.50"
                                    borderColor="whiteAlpha.300"
                                    _hover={{ borderColor: 'groovit.purple' }}
                                    _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                />
                                <FormErrorMessage>{errors.titulo}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.descripcion} isRequired>
                                <FormLabel htmlFor="descripcion">Descripción</FormLabel>
                                <Textarea
                                    id="descripcion"
                                    placeholder="Describe el evento, artistas, detalles importantes, etc."
                                    value={formData.descripcion}
                                    onChange={handleChange}
                                    minH="150px"
                                    bg="whiteAlpha.50"
                                    borderColor="whiteAlpha.300"
                                    _hover={{ borderColor: 'groovit.purple' }}
                                    _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                />
                                <FormErrorMessage>{errors.descripcion}</FormErrorMessage>
                            </FormControl>
                        </Stack>
                    </Box>
                );

            case 1:
                return (
                    <Box>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                            <FormControl isInvalid={!!errors.fecha} isRequired>
                                <FormLabel htmlFor="fecha">Fecha del evento</FormLabel>
                                <Flex align="center">
                                    <Icon as={FaCalendarAlt} mr={2} color="groovit.purpleLight" />
                                    <Input
                                        id="fecha"
                                        type="date"
                                        value={formData.fecha}
                                        onChange={handleChange}
                                        bg="whiteAlpha.50"
                                        borderColor="whiteAlpha.300"
                                        _hover={{ borderColor: 'groovit.purple' }}
                                        _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                    />
                                </Flex>
                                <FormErrorMessage>{errors.fecha}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.capacidad} isRequired>
                                <FormLabel htmlFor="capacidad">Capacidad</FormLabel>
                                <Flex align="center">
                                    <Icon as={FaUsers} mr={2} color="groovit.purpleLight" />
                                    <NumberInput
                                        id="capacidad"
                                        min={1}
                                        value={formData.capacidad}
                                        onChange={(value) => handleNumberChange('capacidad', value)}
                                        bg="whiteAlpha.50"
                                        borderColor="whiteAlpha.300"
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Flex>
                                <FormErrorMessage>{errors.capacidad}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.precio} isRequired>
                                <FormLabel htmlFor="precio">Precio (MXN)</FormLabel>
                                <Flex align="center">
                                    <Icon as={FaMoneyBillWave} mr={2} color="groovit.purpleLight" />
                                    <NumberInput
                                        id="precio"
                                        min={0}
                                        value={formData.precio}
                                        onChange={(value) => handleNumberChange('precio', value)}
                                        bg="whiteAlpha.50"
                                        borderColor="whiteAlpha.300"
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Flex>
                                <FormErrorMessage>{errors.precio}</FormErrorMessage>
                            </FormControl>
                        </SimpleGrid>
                    </Box>
                );

            case 2:
                return (
                    <Box>
                        <FormControl isInvalid={!!errors.ubicacion} isRequired>
                            <FormLabel htmlFor="ubicacion">Ubicación</FormLabel>
                            <Flex align="center">
                                <Icon as={FaMapMarkerAlt} mr={2} color="groovit.purpleLight" />
                                <Input
                                    id="ubicacion"
                                    placeholder="Ej. Arena Ciudad de México"
                                    value={formData.ubicacion}
                                    onChange={handleChange}
                                    bg="whiteAlpha.50"
                                    borderColor="whiteAlpha.300"
                                    _hover={{ borderColor: 'groovit.purple' }}
                                    _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                />
                            </Flex>
                            <FormErrorMessage>{errors.ubicacion}</FormErrorMessage>
                            <Text mt={2} fontSize="sm" color="gray.500">
                                Introduce la dirección o nombre del lugar donde se realizará el evento
                            </Text>
                        </FormControl>

                        <Box mt={6}>
                            <Text fontWeight="medium" mb={3} color="gray.400">Ubicaciones populares:</Text>
                            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={3}>
                                {['Arena Ciudad de México', 'Foro Sol', 'Auditorio Nacional', 'Palacio de los Deportes', 'Teatro Metropolitan', 'El Plaza Condesa'].map((lugar) => (
                                    <Button
                                        key={lugar}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleChange({ target: { id: 'ubicacion', value: lugar } })}
                                        _hover={{ bg: 'whiteAlpha.200', borderColor: 'groovit.purple' }}
                                    >
                                        {lugar}
                                    </Button>
                                ))}
                            </SimpleGrid>
                        </Box>
                    </Box>
                );

            case 3:
                return (
                    <Box>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            <FormControl isInvalid={!!errors.imagen}>
                                <FormLabel htmlFor="imagen">Imagen del evento</FormLabel>
                                <Box
                                    borderWidth="2px"
                                    borderRadius="md"
                                    borderColor="whiteAlpha.300"
                                    borderStyle="dashed"
                                    bg="whiteAlpha.50"
                                    p={4}
                                    textAlign="center"
                                    cursor="pointer"
                                    transition="all 0.3s"
                                    _hover={{ borderColor: 'groovit.purple' }}
                                    onClick={() => fileInputRef.current.click()}
                                    height="200px"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    position="relative"
                                    overflow="hidden"
                                >
                                    <Input
                                        id="imagen"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        ref={fileInputRef}
                                        display="none"
                                    />

                                    {formData.imagenPreview ? (
                                        <>
                                            <Image
                                                src={formData.imagenPreview}
                                                alt="Preview"
                                                objectFit="cover"
                                                position="absolute"
                                                top={0}
                                                left={0}
                                                w="100%"
                                                h="100%"
                                            />
                                            <Box
                                                position="absolute"
                                                top={0}
                                                left={0}
                                                right={0}
                                                bottom={0}
                                                bg="rgba(0,0,0,0.5)"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                opacity={0}
                                                transition="opacity 0.2s"
                                                _hover={{ opacity: 1 }}
                                            >
                                                <Text color="white" fontWeight="bold">
                                                    Cambiar imagen
                                                </Text>
                                            </Box>
                                        </>
                                    ) : (
                                        <>
                                            <Icon as={FaImage} boxSize={10} color="gray.500" mb={3} />
                                            <Text color="gray.500" fontWeight="medium">
                                                Haz clic para subir una imagen
                                            </Text>
                                            <Text color="gray.500" fontSize="sm">
                                                o arrastra y suelta aquí
                                            </Text>
                                        </>
                                    )}
                                </Box>
                                <FormErrorMessage>{errors.imagen}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={!!errors.genero} isRequired>
                                <FormLabel htmlFor="genero">Género musical</FormLabel>
                                <Flex align="center">
                                    <Icon as={FaMusic} mr={2} color="groovit.purpleLight" />
                                    <Select
                                        id="genero"
                                        placeholder="Selecciona un género musical"
                                        value={formData.genero}
                                        onChange={handleChange}
                                        bg="whiteAlpha.50"
                                        borderColor="whiteAlpha.300"
                                        _hover={{ borderColor: 'groovit.purple' }}
                                        _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                    >
                                        <option value="Rock">Rock</option>
                                        <option value="Pop">Pop</option>
                                        <option value="Electrónica">Electrónica</option>
                                        <option value="Jazz">Jazz</option>
                                        <option value="Blues">Blues</option>
                                        <option value="Hip-Hop">Hip-Hop</option>
                                        <option value="Reggaeton">Reggaeton</option>
                                        <option value="Salsa">Salsa</option>
                                        <option value="Metal">Metal</option>
                                        <option value="Indie">Indie</option>
                                        <option value="Clásica">Clásica</option>
                                        <option value="Folk">Folk</option>
                                        <option value="R&B">R&B</option>
                                        <option value="Country">Country</option>
                                        <option value="Otro">Otro</option>
                                    </Select>
                                </Flex>
                                <FormErrorMessage>{errors.genero}</FormErrorMessage>
                            </FormControl>
                        </SimpleGrid>
                    </Box>
                );

            case 4:
                return (
                    <Box>
                        <Heading size="md" mb={6}>Revisa la información del evento</Heading>

                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                            <Box>
                                <Flex mb={3}>
                                    <Text fontWeight="bold" width="120px">Título:</Text>
                                    <Text flex="1">{formData.titulo}</Text>
                                </Flex>
                                <Flex mb={3}>
                                    <Text fontWeight="bold" width="120px">Fecha:</Text>
                                    <Text flex="1">{formData.fecha}</Text>
                                </Flex>
                                <Flex mb={3}>
                                    <Text fontWeight="bold" width="120px">Ubicación:</Text>
                                    <Text flex="1">{formData.ubicacion}</Text>
                                </Flex>
                                <Flex mb={3}>
                                    <Text fontWeight="bold" width="120px">Género:</Text>
                                    <Text flex="1">{formData.genero}</Text>
                                </Flex>
                                <Flex mb={3}>
                                    <Text fontWeight="bold" width="120px">Capacidad:</Text>
                                    <Text flex="1">{formData.capacidad} personas</Text>
                                </Flex>
                                <Flex mb={3}>
                                    <Text fontWeight="bold" width="120px">Precio:</Text>
                                    <Text flex="1">${formData.precio} MXN</Text>
                                </Flex>
                            </Box>

                            <Box>
                                <Text fontWeight="bold" mb={2}>Descripción:</Text>
                                <Text
                                    p={3}
                                    bg="whiteAlpha.50"
                                    borderRadius="md"
                                    border="1px solid"
                                    borderColor="whiteAlpha.200"
                                    fontSize="sm"
                                    minH="100px"
                                >
                                    {formData.descripcion}
                                </Text>

                                {formData.imagenPreview && (
                                    <Box mt={4}>
                                        <Text fontWeight="bold" mb={2}>Imagen:</Text>
                                        <Image
                                            src={formData.imagenPreview}
                                            alt="Vista previa"
                                            maxH="150px"
                                            borderRadius="md"
                                            objectFit="cover"
                                        />
                                    </Box>
                                )}
                            </Box>
                        </SimpleGrid>

                        <Flex
                            mt={8}
                            p={4}
                            bg="rgba(0, 128, 0, 0.1)"
                            color="green.300"
                            borderRadius="md"
                            align="center"
                        >
                            <Icon as={FaCheck} mr={3} />
                            <Text>
                                Todo listo para crear tu evento. Revisa que toda la información sea correcta antes de continuar.
                            </Text>
                        </Flex>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Box py={8} position="relative">
            {/* Botón de regreso al dashboard */}
            <Button
                position="absolute"
                top={2}
                left={4}
                size="md"
                variant="ghost"
                leftIcon={<Icon as={FaArrowLeft} />}
                onClick={() => navigate('/dashboard')}
                _hover={{ bg: 'whiteAlpha.200', color: 'groovit.purpleLight' }}
                isDisabled={isSubmitting}
            >
                Volver al Dashboard
            </Button>

            <Container maxW="container.lg" pt={12}>
                <Heading mb={2} size="lg">Crear Nuevo Evento</Heading>
                <Text color="gray.400" mb={8}>
                    Completa los siguientes pasos para crear un nuevo evento musical
                </Text>

                {/* Stepper */}
                <Stepper
                    index={activeStep}
                    mb={10}
                    size="sm"
                    colorScheme="purple"
                    gap={0}
                >
                    {steps.map((step, index) => (
                        <Step key={index}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon />}
                                    incomplete={<StepNumber />}
                                    active={<StepNumber />}
                                />
                            </StepIndicator>

                            <Box flexShrink="0">
                                <StepTitle>{step.title}</StepTitle>
                                <StepDescription>{step.description}</StepDescription>
                            </Box>

                            <StepSeparator />
                        </Step>
                    ))}
                </Stepper>

                {/* Contenido del paso actual */}
                <Box
                    bg="groovit.surface"
                    p={{ base: 4, md: 8 }}
                    borderRadius="xl"
                    boxShadow="lg"
                    borderWidth="1px"
                    borderColor="whiteAlpha.100"
                    minH="400px"
                >
                    {isSubmitting ? (
                        <Flex
                            direction="column"
                            align="center"
                            justify="center"
                            h="400px"
                            textAlign="center"
                        >
                            <Heading size="md" mb={6}>Creando evento...</Heading>
                            <Box w="80%" maxW="400px" mb={4}>
                                <Progress
                                    value={uploadProgress}
                                    colorScheme="purple"
                                    size="lg"
                                    borderRadius="md"
                                    hasStripe
                                    isAnimated
                                />
                            </Box>
                            <Text color="gray.400">
                                {uploadProgress < 100
                                    ? `Subiendo archivos (${uploadProgress}%)`
                                    : 'Procesando información...'}
                            </Text>
                        </Flex>
                    ) : (
                        renderStep()
                    )}
                </Box>

                {/* Botones de navegación */}
                <Flex justify="space-between" mt={8}>
                    <Button
                        variant="outline"
                        colorScheme="purple"
                        isDisabled={activeStep === 0 || isSubmitting}
                        onClick={handleBack}
                        size="lg"
                    >
                        Anterior
                    </Button>

                    {activeStep !== steps.length - 1 ? (
                        <Button
                            variant="primary"
                            onClick={handleNext}
                            size="lg"
                            bg="groovit.purple"
                            _hover={{ bg: 'groovit.purpleLight' }}
                            isDisabled={isSubmitting}
                        >
                            Siguiente
                        </Button>
                    ) : (
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            size="lg"
                            bg="groovit.purple"
                            _hover={{ bg: 'groovit.purpleLight' }}
                            leftIcon={<FaCheck />}
                            isLoading={isSubmitting}
                            loadingText="Creando evento..."
                        >
                            Crear Evento
                        </Button>
                    )}
                </Flex>
            </Container>
        </Box>
    );
};

export default CreateEvent;