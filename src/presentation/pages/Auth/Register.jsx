import { useState } from 'react';
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useToast,
    FormErrorMessage,
    InputGroup,
    InputRightElement,
    IconButton,
    Flex,
    Link,
    HStack,
    Alert,
    AlertIcon,
    AlertDescription,
    VStack,
    useColorModeValue,
    Image,
    Divider,
    useBreakpointValue,
    ScaleFade,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, ArrowBackIcon, EmailIcon, LockIcon, InfoIcon } from '@chakra-ui/icons';
import { FaUser, FaUserTie, FaEnvelope, FaLock, FaMusic, FaRegCheckCircle } from 'react-icons/fa';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        username: '',
        contraseña: '',
        email: '',
        confirmPassword: '', // Campo adicional solo para validación en frontend
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const toast = useToast();
    const navigate = useNavigate();
    const { register } = useAuth();

    const boxSize = useBreakpointValue({ base: '100%', md: '90%', lg: '1000px' });
    const isDesktop = useBreakpointValue({ base: false, lg: true });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const validateStep = () => {
        const newErrors = {};

        if (currentStep === 1) {
            if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
            if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
            if (!formData.username.trim()) newErrors.username = 'El nombre de usuario es requerido';
        } else if (currentStep === 2) {
            if (!formData.email.trim()) newErrors.email = 'El correo electrónico es requerido';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido';

            if (!formData.contraseña) newErrors.contraseña = 'La contraseña es requerida';
            else if (formData.contraseña.length < 3) newErrors.contraseña = 'La contraseña debe tener al menos 3 caracteres';

            if (!formData.confirmPassword) newErrors.confirmPassword = 'Por favor, confirma la contraseña';
            else if (formData.contraseña !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep()) {
            setCurrentStep(2);
        }
    };

    const prevStep = () => {
        setCurrentStep(1);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
        if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
        if (!formData.username.trim()) newErrors.username = 'El nombre de usuario es requerido';
        if (!formData.email.trim()) newErrors.email = 'El correo electrónico es requerido';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido';

        if (!formData.contraseña) newErrors.contraseña = 'La contraseña es requerida';
        else if (formData.contraseña.length < 3) newErrors.contraseña = 'La contraseña debe tener al menos 3 caracteres';

        if (!formData.confirmPassword) newErrors.confirmPassword = 'Por favor, confirma la contraseña';
        else if (formData.contraseña !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setApiError('');

        try {
            // Preparar datos para enviar (sin confirmPassword que es solo para validación)
            const userData = {
                nombre: formData.nombre,
                apellido: formData.apellido,
                username: formData.username,
                contraseña: formData.contraseña,
                email: formData.email
            };

            // Llamar a la función register del contexto de autenticación
            const result = await register(userData);

            if (result.success) {
                toast({
                    title: '¡Registro exitoso!',
                    description: 'Tu cuenta ha sido creada correctamente.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });

                // Redirigir al usuario a la página de login
                navigate('/login');
            } else {
                setApiError(result.error || 'No se pudo completar el registro. Inténtalo de nuevo.');
            }
        } catch (error) {
            setApiError(error.message || 'Ocurrió un error durante el registro');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            minH="100vh"
            bg="groovit.background"
            py={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            bgGradient="linear(to-b, groovit.background, groovit.purpleDark)"
        >
            {/* Botón de regreso */}
            <IconButton
                icon={<ArrowBackIcon />}
                aria-label="Regresar a inicio"
                position="absolute"
                top={4}
                right={4}
                as={RouterLink}
                to="/"
                variant="ghost"
                size="lg"
                color="groovit.text"
                _hover={{ bg: 'whiteAlpha.200', color: 'groovit.purpleLight' }}
            />

            <ScaleFade initialScale={0.9} in={true}>
                <Box
                    w={boxSize}
                    bg="groovit.surface"
                    borderRadius="xl"
                    overflow="hidden"
                    boxShadow="0 10px 30px -10px rgba(0, 0, 0, 0.5)"
                    borderWidth="1px"
                    borderColor="whiteAlpha.200"
                >
                    <Flex direction={{ base: 'column', lg: 'row' }}>
                        {/* Lado izquierdo - Imagen decorativa para desktop */}
                        {isDesktop && (
                            <Box
                                w="40%"
                                bg="groovit.purpleDark"
                                position="relative"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                p={8}
                            >
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    right={0}
                                    bottom={0}
                                    bgGradient="linear(to-br, groovit.purpleDark, groovit.purple)"
                                    opacity={0.9}
                                    zIndex={0}
                                />
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    right={0}
                                    bottom={0}
                                    bgImage="url('https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
                                    bgSize="cover"
                                    bgPosition="center"
                                    opacity={0.15}
                                    zIndex={0}
                                />
                                <VStack spacing={8} zIndex={1} textAlign="center">
                                    <FaMusic size="80px" color="#fff" />
                                    <Heading color="white" size="xl">GROOVIT</Heading>
                                    <Text color="white" fontSize="lg" fontWeight="medium">
                                        Crea y gestiona los mejores eventos musicales con nosotros
                                    </Text>
                                    <Box>
                                        <VStack spacing={4} align="start">
                                            {[
                                                'Administración sencilla de eventos',
                                                'Gestión de ventas de boletos',
                                                'Reportes e insights detallados',
                                                'Potente herramienta para organizadores'
                                            ].map((feature, index) => (
                                                <HStack key={index}>
                                                    <FaRegCheckCircle color="#C77DFF" />
                                                    <Text color="white">{feature}</Text>
                                                </HStack>
                                            ))}
                                        </VStack>
                                    </Box>
                                </VStack>
                            </Box>
                        )}

                        {/* Lado derecho - Formulario */}
                        <Box w={{ base: '100%', lg: '60%' }} p={{ base: 6, md: 10 }}>
                            <VStack spacing={6} align="start" w="full">
                                <Box w="full" textAlign="center" mb={4}>
                                    {!isDesktop && (
                                        <Text
                                            fontSize="3xl"
                                            fontWeight="extrabold"
                                            className="gradient-text"
                                            letterSpacing="tight"
                                            mb={2}
                                        >
                                            Groovit
                                        </Text>
                                    )}
                                    <Heading size="lg">Crear una cuenta de administrador</Heading>
                                    <Text color="gray.400" mt={2}>
                                        Completa el formulario para empezar a usar la plataforma
                                    </Text>
                                </Box>

                                {/* Pasos */}
                                <HStack w="full" mb={4}>
                                    <Box
                                        flex={1}
                                        h="4px"
                                        bg={currentStep >= 1 ? 'groovit.purple' : 'gray.600'}
                                        borderRadius="full"
                                    />
                                    <Box
                                        flex={1}
                                        h="4px"
                                        bg={currentStep >= 2 ? 'groovit.purple' : 'gray.600'}
                                        borderRadius="full"
                                    />
                                </HStack>

                                {/* Título del paso actual */}
                                <Flex w="full" justify="space-between" align="center">
                                    <Heading size="md" color="gray.300">
                                        {currentStep === 1 ? 'Información personal' : 'Cuenta y seguridad'}
                                    </Heading>
                                    <Text color="gray.500">Paso {currentStep} de 2</Text>
                                </Flex>

                                {apiError && (
                                    <Alert status="error" borderRadius="md" bg="red.900" color="white" w="full">
                                        <AlertIcon color="red.300" />
                                        <AlertDescription>{apiError}</AlertDescription>
                                    </Alert>
                                )}

                                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                    {currentStep === 1 ? (
                                        <VStack spacing={5} w="full">
                                            <HStack spacing={4} w="full">
                                                <FormControl isInvalid={!!errors.nombre} isRequired>
                                                    <FormLabel htmlFor="nombre">Nombre</FormLabel>
                                                    <InputGroup>
                                                        <InputRightElement pointerEvents="none">
                                                            <FaUser color="#9D4EDD" />
                                                        </InputRightElement>
                                                        <Input
                                                            id="nombre"
                                                            type="text"
                                                            value={formData.nombre}
                                                            onChange={handleChange}
                                                            placeholder="Tu nombre"
                                                            bg="whiteAlpha.50"
                                                            borderColor="whiteAlpha.200"
                                                            _hover={{ borderColor: 'groovit.purple' }}
                                                            _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                                        />
                                                    </InputGroup>
                                                    <FormErrorMessage>{errors.nombre}</FormErrorMessage>
                                                </FormControl>

                                                <FormControl isInvalid={!!errors.apellido} isRequired>
                                                    <FormLabel htmlFor="apellido">Apellido</FormLabel>
                                                    <InputGroup>
                                                        <InputRightElement pointerEvents="none">
                                                            <FaUser color="#9D4EDD" />
                                                        </InputRightElement>
                                                        <Input
                                                            id="apellido"
                                                            type="text"
                                                            value={formData.apellido}
                                                            onChange={handleChange}
                                                            placeholder="Tu apellido"
                                                            bg="whiteAlpha.50"
                                                            borderColor="whiteAlpha.200"
                                                            _hover={{ borderColor: 'groovit.purple' }}
                                                            _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                                        />
                                                    </InputGroup>
                                                    <FormErrorMessage>{errors.apellido}</FormErrorMessage>
                                                </FormControl>
                                            </HStack>

                                            <FormControl isInvalid={!!errors.username} isRequired>
                                                <FormLabel htmlFor="username">Nombre de usuario</FormLabel>
                                                <InputGroup>
                                                    <InputRightElement pointerEvents="none">
                                                        <FaUserTie color="#9D4EDD" />
                                                    </InputRightElement>
                                                    <Input
                                                        id="username"
                                                        type="text"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                        placeholder="Tu nombre de usuario"
                                                        bg="whiteAlpha.50"
                                                        borderColor="whiteAlpha.200"
                                                        _hover={{ borderColor: 'groovit.purple' }}
                                                        _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                                    />
                                                </InputGroup>
                                                <FormErrorMessage>{errors.username}</FormErrorMessage>
                                            </FormControl>

                                            <Button
                                                mt={6}
                                                size="lg"
                                                bg="groovit.purple"
                                                color="white"
                                                _hover={{ bg: 'groovit.purpleLight', transform: 'translateY(-2px)' }}
                                                _active={{ bg: 'groovit.purpleDark' }}
                                                w="full"
                                                onClick={nextStep}
                                            >
                                                Continuar
                                            </Button>
                                        </VStack>
                                    ) : (
                                        <VStack spacing={5} w="full">
                                            <FormControl isInvalid={!!errors.email} isRequired>
                                                <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                                                <InputGroup>
                                                    <InputRightElement pointerEvents="none">
                                                        <FaEnvelope color="#9D4EDD" />
                                                    </InputRightElement>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="Tu correo electrónico"
                                                        bg="whiteAlpha.50"
                                                        borderColor="whiteAlpha.200"
                                                        _hover={{ borderColor: 'groovit.purple' }}
                                                        _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                                    />
                                                </InputGroup>
                                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                                            </FormControl>

                                            <FormControl isInvalid={!!errors.contraseña} isRequired>
                                                <FormLabel htmlFor="contraseña">Contraseña</FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        id="contraseña"
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={formData.contraseña}
                                                        onChange={handleChange}
                                                        placeholder="Crea una contraseña"
                                                        bg="whiteAlpha.50"
                                                        borderColor="whiteAlpha.200"
                                                        _hover={{ borderColor: 'groovit.purple' }}
                                                        _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                                    />
                                                    <InputRightElement>
                                                        <IconButton
                                                            size="sm"
                                                            variant="ghost"
                                                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage>{errors.contraseña}</FormErrorMessage>
                                            </FormControl>

                                            <FormControl isInvalid={!!errors.confirmPassword} isRequired>
                                                <FormLabel htmlFor="confirmPassword">Confirmar contraseña</FormLabel>
                                                <InputGroup>
                                                    <Input
                                                        id="confirmPassword"
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        placeholder="Confirma tu contraseña"
                                                        bg="whiteAlpha.50"
                                                        borderColor="whiteAlpha.200"
                                                        _hover={{ borderColor: 'groovit.purple' }}
                                                        _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                                    />
                                                    <InputRightElement>
                                                        <IconButton
                                                            size="sm"
                                                            variant="ghost"
                                                            aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                                            icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        />
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                                            </FormControl>

                                            <HStack spacing={4} w="full" mt={6}>
                                                <Button
                                                    size="lg"
                                                    variant="outline"
                                                    borderColor="groovit.purple"
                                                    color="groovit.purpleLight"
                                                    _hover={{ bg: 'whiteAlpha.100' }}
                                                    onClick={prevStep}
                                                    flex={1}
                                                >
                                                    Volver
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    size="lg"
                                                    bg="groovit.purple"
                                                    color="white"
                                                    _hover={{ bg: 'groovit.purpleLight', transform: 'translateY(-2px)' }}
                                                    _active={{ bg: 'groovit.purpleDark' }}
                                                    isLoading={isLoading}
                                                    loadingText="Registrando..."
                                                    flex={2}
                                                >
                                                    Crear cuenta
                                                </Button>
                                            </HStack>
                                        </VStack>
                                    )}
                                </form>

                                <Divider borderColor="whiteAlpha.200" my={4} />

                                <Flex justifyContent="center" fontSize="sm" w="full">
                                    <Text color="gray.500">¿Ya tienes una cuenta?</Text>
                                    <Link
                                        as={RouterLink}
                                        to="/login"
                                        color="groovit.purpleLight"
                                        _hover={{ color: 'groovit.purple' }}
                                        fontWeight="semibold"
                                        ml={1}
                                    >
                                        Inicia sesión
                                    </Link>
                                </Flex>
                            </VStack>
                        </Box>
                    </Flex>
                </Box>
            </ScaleFade>
        </Box>
    );
};

export default Register;