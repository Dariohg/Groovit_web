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
    Alert,
    AlertIcon,
    AlertDescription,
    VStack,
    HStack,
    Image,
    ScaleFade,
    useBreakpointValue,
    Divider,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { FaMusic, FaRegCheckCircle } from 'react-icons/fa';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const { login } = useAuth();

    const boxSize = useBreakpointValue({ base: '100%', md: '90%', lg: '1000px' });
    const isDesktop = useBreakpointValue({ base: false, lg: true });

    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'El nombre de usuario es requerido';
        if (!password) newErrors.password = 'La contraseña es requerida';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setApiError('');

        try {
            // Llamar a la función login del contexto de autenticación
            const result = await login(username, password);

            if (result.success) {
                toast({
                    title: '¡Bienvenido!',
                    description: 'Has iniciado sesión correctamente.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });

                // Redirigir al usuario al dashboard
                navigate('/dashboard');
            } else {
                setApiError(result.error || 'Credenciales inválidas');
            }
        } catch (error) {
            setApiError(error.message || 'Ocurrió un error durante el inicio de sesión');
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
                                        Accede a tu cuenta para gestionar eventos musicales
                                    </Text>
                                    <Box>
                                        <VStack spacing={4} align="start">
                                            {[
                                                'Crea eventos musicales',
                                                'Administra tus ventas',
                                                'Analiza estadísticas',
                                                'Conecta con tu audiencia'
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
                                    <Heading size="lg">Iniciar Sesión</Heading>
                                    <Text color="gray.400" mt={2}>
                                        Accede a tu cuenta para comenzar a gestionar eventos
                                    </Text>
                                </Box>

                                {apiError && (
                                    <Alert status="error" borderRadius="md" bg="red.900" color="white" w="full">
                                        <AlertIcon color="red.300" />
                                        <AlertDescription>{apiError}</AlertDescription>
                                    </Alert>
                                )}

                                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                    <VStack spacing={5} w="full">
                                        <FormControl isInvalid={!!errors.username} isRequired>
                                            <FormLabel htmlFor="username">Nombre de usuario</FormLabel>
                                            <Input
                                                id="username"
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                placeholder="Tu nombre de usuario"
                                                bg="whiteAlpha.50"
                                                borderColor="whiteAlpha.200"
                                                _hover={{ borderColor: 'groovit.purple' }}
                                                _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                                size="lg"
                                            />
                                            <FormErrorMessage>{errors.username}</FormErrorMessage>
                                        </FormControl>

                                        <FormControl isInvalid={!!errors.password} isRequired>
                                            <FormLabel htmlFor="password">Contraseña</FormLabel>
                                            <InputGroup size="lg">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Tu contraseña"
                                                    bg="whiteAlpha.50"
                                                    borderColor="whiteAlpha.200"
                                                    _hover={{ borderColor: 'groovit.purple' }}
                                                    _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                                />
                                                <InputRightElement h="full" pr={2}>
                                                    <IconButton
                                                        size="sm"
                                                        variant="ghost"
                                                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    />
                                                </InputRightElement>
                                            </InputGroup>
                                            <FormErrorMessage>{errors.password}</FormErrorMessage>
                                        </FormControl>

                                        <Link
                                            alignSelf="flex-end"
                                            fontSize="sm"
                                            color="groovit.purpleLight"
                                            _hover={{ color: 'groovit.purple' }}
                                            as={RouterLink}
                                            to="/forgot-password"
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </Link>

                                        <Button
                                            type="submit"
                                            bg="groovit.purple"
                                            color="white"
                                            _hover={{ bg: 'groovit.purpleLight', transform: 'translateY(-2px)' }}
                                            _active={{ bg: 'groovit.purpleDark' }}
                                            size="lg"
                                            fontSize="md"
                                            isLoading={isLoading}
                                            loadingText="Iniciando sesión..."
                                            w="full"
                                            mt={6}
                                            height="56px"
                                        >
                                            Iniciar Sesión
                                        </Button>
                                    </VStack>
                                </form>

                                <Divider borderColor="whiteAlpha.200" my={6} />

                                <Flex justifyContent="center" fontSize="sm" w="full">
                                    <Text color="gray.500">¿No tienes una cuenta?</Text>
                                    <Link
                                        as={RouterLink}
                                        to="/register"
                                        color="groovit.purpleLight"
                                        _hover={{ color: 'groovit.purple' }}
                                        fontWeight="semibold"
                                        ml={1}
                                    >
                                        Regístrate
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

export default Login;