import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Text,
    Stack,
    Input,
    InputGroup,
    InputRightElement,
    useBreakpointValue,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

/**
 * Componente Hero para la página de inicio
 */
const Hero = () => {
    const headingSize = useBreakpointValue({ base: '3xl', md: '4xl', lg: '5xl' })

    return (
        <Box
            position="relative"
            h={{ base: '90vh', md: '100vh' }}
            maxH="900px"
            overflow="hidden"
            // Fondo con un gradiente oscuro para mejorar legibilidad
            bg="linear-gradient(180deg, rgba(18, 18, 18, 0.8) 0%, rgba(18, 18, 18, 0.9) 100%)"
        >
            {/* Imagen de fondo con efecto parallax */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={-1}
                bgImage="url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
                bgPosition="center"
                bgSize="cover"
                bgRepeat="no-repeat"
                opacity={0.5}
                filter="blur(2px)"
            />

            {/* Malla decorativa - SVG corregido */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                zIndex={-1}
                bgImage={`url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%239D4EDD' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`}
                opacity={0.3}
            />

            {/* Contenido del héroe */}
            <Container maxW="container.xl" h="full">
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    h="full"
                    textAlign="center"
                    pt={{ base: 20, md: 0 }}
                >
                    <Stack spacing={6} maxW="900px" className="slide-up">
                        <Heading
                            as="h1"
                            size={headingSize}
                            fontWeight="extrabold"
                            lineHeight="shorter"
                        >
                            <Text
                                as="span"
                                position="relative"
                                className="gradient-text"
                            >
                                Descubre
                            </Text>{' '}
                            y vive experiencias musicales únicas
                        </Heading>

                        <Text
                            fontSize={{ base: 'lg', md: 'xl' }}
                            color="whiteAlpha.900"
                            maxW="800px"
                            mx="auto"
                        >
                            Encuentra los mejores eventos musicales, conecta con artistas y comparte
                            momentos inolvidables con la comunidad más vibrante de amantes de la música.
                        </Text>

                        {/* Barra de búsqueda */}
                        <Box w="full" maxW="600px" mx="auto" mt={8}>
                            <InputGroup size="lg">
                                <Input
                                    bg="rgba(30, 30, 30, 0.8)"
                                    border="1px solid"
                                    borderColor="whiteAlpha.300"
                                    placeholder="Busca eventos, artistas o lugares..."
                                    _placeholder={{ color: 'whiteAlpha.600' }}
                                    _hover={{ borderColor: 'groovit.purple' }}
                                    _focus={{ borderColor: 'groovit.purpleLight', boxShadow: '0 0 0 1px #C77DFF' }}
                                    fontSize="md"
                                    h="60px"
                                    borderRadius="full"
                                />
                                <InputRightElement h="full" pr={2}>
                                    <Button
                                        colorScheme="purple"
                                        borderRadius="full"
                                        size="sm"
                                        w="40px"
                                        h="40px"
                                        bg="groovit.purple"
                                        _hover={{ bg: 'groovit.purpleLight' }}
                                        mr={1}
                                    >
                                        <SearchIcon />
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Box>

                        {/* Botones de acción */}
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            spacing={4}
                            justify="center"
                            mt={6}
                        >
                            <Button
                                size="lg"
                                height="60px"
                                px={8}
                                fontSize="md"
                                fontWeight="bold"
                                variant="primary"
                                borderRadius="full"
                                _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                }}
                            >
                                Explorar Eventos
                            </Button>
                            <Button
                                size="lg"
                                height="60px"
                                px={8}
                                fontSize="md"
                                fontWeight="bold"
                                variant="secondary"
                                borderRadius="full"
                                _hover={{
                                    transform: 'translateY(-2px)',
                                }}
                            >
                                Crear Evento
                            </Button>
                        </Stack>

                        {/* Estadísticas */}
                        <Flex
                            justify="center"
                            wrap="wrap"
                            mt={10}
                            bg="rgba(30, 30, 30, 0.6)"
                            backdropFilter="blur(10px)"
                            p={6}
                            borderRadius="xl"
                            boxShadow="xl"
                            border="1px solid"
                            borderColor="whiteAlpha.200"
                        >
                            {[
                                { label: 'Eventos Activos', value: '2,500+' },
                                { label: 'Artistas', value: '1,200+' },
                                { label: 'Ciudades', value: '150+' },
                                { label: 'Usuarios', value: '50K+' },
                            ].map((stat, index) => (
                                <Box
                                    key={index}
                                    px={8}
                                    py={3}
                                    textAlign="center"
                                    borderRight={
                                        index < 3 ? '1px solid' : 'none'
                                    }
                                    borderColor="whiteAlpha.300"
                                    borderRightWidth={{ base: index % 2 === 0 ? '1px' : '0', md: index < 3 ? '1px' : '0' }}
                                    borderBottom={{
                                        base: index < 2 ? '1px solid' : 'none',
                                        md: 'none',
                                    }}
                                    borderBottomColor="whiteAlpha.300"
                                    flexBasis={{ base: '50%', md: 'auto' }}
                                >
                                    <Text fontWeight="bold" fontSize="2xl" className="gradient-text">
                                        {stat.value}
                                    </Text>
                                    <Text color="whiteAlpha.700" fontSize="sm">
                                        {stat.label}
                                    </Text>
                                </Box>
                            ))}
                        </Flex>
                    </Stack>
                </Flex>
            </Container>
        </Box>
    )
}

export default Hero