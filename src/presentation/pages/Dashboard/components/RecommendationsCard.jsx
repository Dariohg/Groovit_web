import {
    Box,
    Heading,
    Text,
    Flex,
    Avatar,
    Icon,
    Badge,
    Divider,
    Button,
    Image,
    LinkBox,
    LinkOverlay,
} from '@chakra-ui/react';
import { FaArrowRight, FaExclamationTriangle, FaCalendarAlt, FaTag } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

// Datos de ejemplo para eventos que requieren atención
const pendingEvents = [
    {
        id: '1',
        title: 'Festival de Rock Underground',
        image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        status: 'Pendiente de aprobación',
        deadline: '5 días',
        priority: 'Alta',
    },
    {
        id: '2',
        title: 'Noche de Hip-Hop y R&B',
        image: 'https://images.unsplash.com/photo-1571751239008-8c809145c19c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        status: 'Requiere presupuesto',
        deadline: '3 días',
        priority: 'Media',
    },
    {
        id: '3',
        title: 'Festival Indie Summer Vibes',
        image: 'https://images.unsplash.com/photo-1532452119098-a3650b3c46d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        status: 'Esperando confirmación',
        deadline: '7 días',
        priority: 'Baja',
    }
];

const priorityColors = {
    'Alta': 'red.500',
    'Media': 'orange.500',
    'Baja': 'green.500'
};

const PendingEventItem = ({ event }) => {
    return (
        <LinkBox
            as="article"
            mb={4}
            bg="whiteAlpha.50"
            borderRadius="md"
            overflow="hidden"
            transition="all 0.3s ease"
            _hover={{ transform: 'translateY(-2px)', bg: 'whiteAlpha.100' }}
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
                        colorScheme={event.priority === 'Alta' ? 'red' : event.priority === 'Media' ? 'orange' : 'green'}
                        bg={priorityColors[event.priority]}
                        color="white"
                        fontWeight="bold"
                        borderRadius="full"
                        px={2}
                        py={0.5}
                        fontSize="xs"
                    >
                        {event.priority}
                    </Badge>
                </Box>

                <Box p={4} flex="1">
                    <LinkOverlay as={RouterLink} to={`/dashboard/events/${event.id}`}>
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
                        <Icon as={FaExclamationTriangle} mr={1.5} color="groovit.purpleLight" />
                        <Text>{event.status}</Text>
                    </Flex>

                    <Flex
                        align="center"
                        color="gray.400"
                        fontSize="sm"
                        mb={1.5}
                    >
                        <Icon as={FaCalendarAlt} mr={1.5} color="groovit.purpleLight" />
                        <Text>Plazo: {event.deadline}</Text>
                    </Flex>

                    <Flex justify="flex-end" mt={2}>
                        <Button
                            size="xs"
                            variant="ghost"
                            colorScheme="purple"
                            _hover={{ bg: 'whiteAlpha.200' }}
                        >
                            Revisar
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </LinkBox>
    );
};

const RecommendationsCard = () => {
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
                <Heading size="md">Eventos por Atender</Heading>
                <Button
                    as={RouterLink}
                    to="/dashboard/pending"
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

            {pendingEvents.map((event) => (
                <PendingEventItem key={event.id} event={event} />
            ))}
        </Box>
    );
};

export default RecommendationsCard;