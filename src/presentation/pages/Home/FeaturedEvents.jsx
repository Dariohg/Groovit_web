import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Flex,
    Image,
    Badge,
    Stack,
    Button,
    Icon,
    useBreakpointValue,
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { FaCalendarAlt, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'

// Datos de ejemplo para los eventos destacados
const featuredEvents = [
    {
        id: '1',
        title: 'Festival Soundwave',
        image: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        date: '15 de Julio, 2023',
        location: 'Arena Ciudad de México',
        genre: 'Electrónica',
        price: '$1,200',
    },
    {
        id: '2',
        title: 'Concierto de Rock Alternativo',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        date: '22 de Agosto, 2023',
        location: 'Auditorio Nacional',
        genre: 'Rock',
        price: '$800',
    },
    {
        id: '3',
        title: 'Noche de Jazz & Blues',
        image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        date: '5 de Septiembre, 2023',
        location: 'Foro Indie Rocks',
        genre: 'Jazz',
        price: '$650',
    },
    {
        id: '4',
        title: 'Festival Hip-Hop Urbano',
        image: 'https://images.unsplash.com/photo-1563841930606-67e2bce48b78?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
        date: '19 de Octubre, 2023',
        location: 'Parque Bicentenario',
        genre: 'Hip-Hop',
        price: '$900',
    },
];

/**
 * Componente de tarjeta de evento
 */
const EventCard = ({ event }) => {
    return (
        <Box
            borderRadius="xl"
            overflow="hidden"
            bg="groovit.surface"
            position="relative"
            transition="all 0.3s"
            _hover={{
                transform: 'translateY(-8px)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}
            height="100%"
            display="flex"
            flexDirection="column"
        >
            {/* Imagen del evento */}
            <Box position="relative" pb="60%">
                <Image
                    src={event.image}
                    alt={event.title}
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    transition="transform 0.3s ease"
                    _groupHover={{ transform: 'scale(1.05)' }}
                />
                <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    bg="linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)"
                    height="100px"
                />
                <Badge
                    position="absolute"
                    top={3}
                    right={3}
                    bg="groovit.purple"
                    color="white"
                    fontWeight="bold"
                    px={3}
                    py={1}
                    borderRadius="full"
                    textTransform="uppercase"
                    fontSize="xs"
                >
                    {event.genre}
                </Badge>
            </Box>

            {/* Contenido de la tarjeta */}
            <Flex
                direction="column"
                p={5}
                flex={1}
            >
                <Heading as="h3" size="md" mb={3} noOfLines={2}>
                    {event.title}
                </Heading>

                <Stack spacing={2} mb={4}>
                    <Flex align="center">
                        <Icon as={FaCalendarAlt} color="groovit.purpleLight" mr={2} />
                        <Text fontSize="sm" color="gray.400">{event.date}</Text>
                    </Flex>
                    <Flex align="center">
                        <Icon as={FaMapMarkerAlt} color="groovit.purpleLight" mr={2} />
                        <Text fontSize="sm" color="gray.400" noOfLines={1}>{event.location}</Text>
                    </Flex>
                    <Flex align="center">
                        <Icon as={FaTicketAlt} color="groovit.purpleLight" mr={2} />
                        <Text fontSize="sm" color="gray.400">Desde {event.price}</Text>
                    </Flex>
                </Stack>

                <Button
                    as={RouterLink}
                    to={`/events/${event.id}`}
                    variant="ghost"
                    colorScheme="purple"
                    size="sm"
                    rightIcon={<ChevronRightIcon />}
                    mt="auto"
                    justifyContent="space-between"
                    borderTopWidth="1px"
                    borderTopColor="whiteAlpha.200"
                    borderRadius="none"
                    pt={3}
                    px={1}
                    _hover={{
                        bg: 'transparent',
                        color: 'groovit.purpleLight',
                    }}
                >
                    Ver detalles
                </Button>
            </Flex>
        </Box>
    );
};

/**
 * Componente de eventos destacados para la página de inicio
 */
const FeaturedEvents = () => {
    const columns = useBreakpointValue({ base: 1, sm: 2, lg: 4 });

    return (
        <Box py={16} bg="groovit.background">
            <Container maxW="container.xl">
                <Flex direction="column" align="center" mb={12}>
                    <Heading
                        as="h2"
                        size="xl"
                        mb={4}
                        textAlign="center"
                        position="relative"
                        _after={{
                            content: '""',
                            display: 'block',
                            width: '80px',
                            height: '4px',
                            bg: 'groovit.purple',
                            borderRadius: 'full',
                            mt: 3,
                            mx: 'auto',
                        }}
                    >
                        Eventos Destacados
                    </Heading>
                    <Text
                        fontSize="lg"
                        color="gray.400"
                        textAlign="center"
                        maxW="800px"
                    >
                        Descubre los eventos más esperados y vive experiencias musicales inolvidables
                        con artistas nacionales e internacionales.
                    </Text>
                </Flex>

                <SimpleGrid columns={columns} spacing={8}>
                    {featuredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </SimpleGrid>

                <Flex justify="center" mt={10}>
                    <Button
                        as={RouterLink}
                        to="/events"
                        variant="primary"
                        size="lg"
                        rightIcon={<ChevronRightIcon />}
                        borderRadius="full"
                        px={8}
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'xl',
                        }}
                    >
                        Ver todos los eventos
                    </Button>
                </Flex>
            </Container>
        </Box>
    );
};

export default FeaturedEvents;