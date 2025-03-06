import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Text,
    Stack,
    Icon,
    useBreakpointValue,
} from '@chakra-ui/react'
import { FaArrowRight, FaTicketAlt } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'

/**
 * Componente de llamada a la acción para la página de inicio
 */
const CallToAction = () => {
    const headingSize = useBreakpointValue({ base: 'xl', md: '2xl' })

    return (
        <Box
            position="relative"
            py={20}
            bg="linear-gradient(45deg, rgba(123, 44, 191, 0.9) 0%, rgba(157, 78, 221, 0.8) 100%)"
            overflow="hidden"
        >
            {/* Patrón decorativo de fondo - SVG corregido */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                opacity={0.1}
                bgImage={`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}
            />

            <Container maxW="container.xl">
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    align="center"
                    justify="space-between"
                >
                    <Box mb={{ base: 10, md: 0 }} maxW={{ base: '100%', md: '60%' }}>
                        <Heading
                            as="h2"
                            size={headingSize}
                            mb={4}
                            color="white"
                        >
                            ¿Listo para vivir la experiencia musical?
                        </Heading>
                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            color="whiteAlpha.900"
                            mb={6}
                        >
                            Descubre una selección exclusiva de los mejores conciertos y festivales.
                            En Groovit traemos a tus artistas favoritos y organizamos eventos musicales
                            inolvidables. ¡No te pierdas la oportunidad de ser parte de esta experiencia!
                        </Text>

                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            spacing={4}
                        >
                            <Button
                                as={RouterLink}
                                to="/events"
                                bg="white"
                                color="groovit.purpleDark"
                                leftIcon={<FaTicketAlt />}
                                _hover={{
                                    bg: 'whiteAlpha.900',
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                }}
                                size="lg"
                                fontWeight="bold"
                                px={8}
                                borderRadius="full"
                            >
                                Comprar Boletos
                            </Button>
                            <Button
                                as={RouterLink}
                                to="/about"
                                variant="outline"
                                color="white"
                                borderColor="white"
                                _hover={{
                                    bg: 'whiteAlpha.200',
                                    transform: 'translateY(-2px)',
                                }}
                                size="lg"
                                fontWeight="bold"
                                px={8}
                                borderRadius="full"
                                rightIcon={<FaArrowRight />}
                            >
                                Conocer más
                            </Button>
                        </Stack>
                    </Box>

                    {/* Stats/Beneficios */}
                    <Stack
                        spacing={4}
                        bg="whiteAlpha.200"
                        backdropFilter="blur(8px)"
                        borderRadius="xl"
                        p={6}
                        borderWidth="1px"
                        borderColor="whiteAlpha.300"
                        maxW={{ base: '100%', md: '350px' }}
                        boxShadow="lg"
                    >
                        {[
                            { number: '30+', label: 'Eventos este mes' },
                            { number: '100%', label: 'Garantía de satisfacción' },
                            { number: '15%', label: 'Descuento para estudiantes' },
                            { number: '24/7', label: 'Atención al cliente' }
                        ].map((stat, index) => (
                            <Flex
                                key={index}
                                align="center"
                                p={3}
                                borderBottomWidth={index < 3 ? '1px' : '0'}
                                borderColor="whiteAlpha.300"
                            >
                                <Box
                                    bg="whiteAlpha.300"
                                    borderRadius="lg"
                                    p={3}
                                    mr={4}
                                    minW="60px"
                                    textAlign="center"
                                >
                                    <Text fontWeight="bold" fontSize="lg" color="white">
                                        {stat.number}
                                    </Text>
                                </Box>
                                <Text color="white" fontWeight="medium" fontSize="md">
                                    {stat.label}
                                </Text>
                            </Flex>
                        ))}
                    </Stack>
                </Flex>
            </Container>
        </Box>
    )
}

export default CallToAction