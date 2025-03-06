import {
    Box,
    Heading,
    Text,
    Flex,
    Icon,
    Divider,
    Button,
    Badge,
    Image,
    LinkBox,
    LinkOverlay,
} from '@chakra-ui/react';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

// Datos de ejemplo para eventos próximos
const upcomingEvents = [
    {
        id: '1',
        title: 'Festival Electrónico Neon Nights',
        date: '15 de Junio, 2023',
        time: '22:00',
        location: 'Club Vertigo',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        genre: 'Electrónica',
    },
    {
        id: '2',
        title: 'Concierto de Rock Alternativo',
        date: '23 de Junio, 2023',
        time: '20:30',
        location: 'Teatro Metropolitan',
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        genre: 'Rock',
    },
    {
        id: '3',
        title: 'Jazz Nights - Edición Especial',
        date: '30 de Junio, 2023',
        time: '21:00',
        location: 'Jazz Club Blue Note',
        image: 'https://images.unsplash.com/photo-1504650759599-740af766c28d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        genre: 'Jazz',
    }
];

const EventItem = ({ event }) => {
    return (
        <LinkBox
            as="article"
            borderRadius="md"
            overflow="hidden"
            bg="whiteAlpha.50"
            transition="all 0.3s ease"
            _hover={{ bg: 'whiteAlpha.100', transform: 'translateY(-2px)' }}
            mb={4}
        >
            <Flex direction={{ base: 'column', sm: 'row' }}>
                <Box
                    w={{ base: '100%', sm: '120px' }}
                    h={{ base: '120px', sm: '100%' }}
                    position="relative"
                >
                    <Image
                        src={event.image}
                        alt={event.title}
                        objectFit="cover"
                        h="100%"
                        w="100%"
                    />
                    <Badge
                        position="absolute"
                        top={2}
                        left={2}
                        colorScheme="purple"
                        bg="groovit.purple"
                        color="white"
                        borderRadius="full"
                        px={2}
                        py={0.5}
                        fontSize="xs"
                    >
                        {event.genre}
                    </Badge>
                </Box>

                <Box p={4} flex="1">
                    <LinkOverlay as={RouterLink} to={`/events/${event.id}`}>
                        <Heading size="sm" mb={2} noOfLines={1}>
                            {event.title}
                        </Heading>
                    </LinkOverlay>

                    <Flex
                        align="center"
                        color="gray.400"
                        fontSize="sm"
                        mb={1.5}
                    >
                        <Icon as={FaCalendarAlt} mr={1.5} color="groovit.purpleLight" />
                        <Text>{event.date}</Text>
                    </Flex>

                    <Flex
                        align="center"
                        color="gray.400"
                        fontSize="sm"
                        mb={1.5}
                    >
                        <Icon as={FaClock} mr={1.5} color="groovit.purpleLight" />
                        <Text>{event.time}</Text>
                    </Flex>

                    <Flex
                        align="center"
                        color="gray.400"
                        fontSize="sm"
                    >
                        <Icon as={FaMapMarkerAlt} mr={1.5} color="groovit.purpleLight" />
                        <Text noOfLines={1}>{event.location}</Text>
                    </Flex>
                </Box>
            </Flex>
        </LinkBox>
    );
};

const UpcomingEventsCard = () => {
    return (
        <Box
            borderRadius="xl"
            bg="groovit.surface"
            p={6}
            h="100%"
            boxShadow="md"
            borderWidth="1px"
            borderColor="whiteAlpha.100"
        >
            <Flex justify="space-between" align="center" mb={6}>
                <Heading size="md">Próximos Eventos</Heading>
                <Button
                    as={RouterLink}
                    to="/events"
                    variant="ghost"
                    size="sm"
                    color="groovit.purpleLight"
                    rightIcon={<FaArrowRight />}
                    _hover={{ bg: 'whiteAlpha.100' }}
                >
                    Ver todos
                </Button>
            </Flex>

            <Divider borderColor="whiteAlpha.200" mb={5} />

            {upcomingEvents.map((event) => (
                <EventItem key={event.id} event={event} />
            ))}
        </Box>
    );
};

export default UpcomingEventsCard;