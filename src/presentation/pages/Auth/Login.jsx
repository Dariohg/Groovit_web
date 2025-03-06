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
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from '@chakra-ui/icons';
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
            position="relative"
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

            <Container
                maxW="md"
                py={{ base: 6, md: 10 }}
                px={{ base: 4, sm: 8 }}
            >
                <Stack spacing={8}>
                    <Stack spacing={6} textAlign="center">
                        <Link as={RouterLink} to="/" alignSelf="center">
                            <Text
                                fontSize="3xl"
                                fontWeight="extrabold"
                                className="gradient-text"
                                letterSpacing="tight"
                                mb={2}
                            >
                                Groovit
                            </Text>
                        </Link>
                        <Heading fontSize="2xl" fontWeight="bold">
                            Inicia sesión en tu cuenta
                        </Heading>
                        <Text fontSize="md" color="gray.500">
                            Accede a todos los eventos musicales ✌️
                        </Text>
                    </Stack>

                    {apiError && (
                        <Alert status="error" borderRadius="md" bg="red.900" color="white">
                            <AlertIcon color="red.300" />
                            <AlertDescription>{apiError}</AlertDescription>
                        </Alert>
                    )}

                    <Box
                        py={8}
                        px={6}
                        bg="groovit.surface"
                        boxShadow="xl"
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor="whiteAlpha.200"
                    >
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={5}>
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
                                    />
                                    <FormErrorMessage>{errors.username}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.password} isRequired>
                                    <FormLabel htmlFor="password">Contraseña</FormLabel>
                                    <InputGroup>
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
                                    colorScheme="purple"
                                    bg="groovit.purple"
                                    _hover={{ bg: 'groovit.purpleLight' }}
                                    size="lg"
                                    fontSize="md"
                                    isLoading={isLoading}
                                    loadingText="Iniciando sesión..."
                                    w="full"
                                    mt={4}
                                >
                                    Iniciar sesión
                                </Button>
                            </Stack>
                        </form>
                    </Box>

                    <Flex justifyContent="center" fontSize="sm">
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
                </Stack>
            </Container>
        </Box>
    );
};

export default Login;