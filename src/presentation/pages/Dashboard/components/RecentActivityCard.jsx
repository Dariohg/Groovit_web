import {
    Box,
    Heading,
    Text,
    Flex,
    Divider,
    Icon,
    Badge,
    Button,
    Circle,
} from '@chakra-ui/react';
import {
    FaCalendarPlus,
    FaEdit,
    FaUsersCog,
    FaMoneyCheckAlt,
    FaClipboardCheck,
    FaArrowRight
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

// Datos de ejemplo para actividad reciente del manager
const activities = [
    {
        id: '1',
        type: 'create',
        title: 'Evento creado',
        description: 'Has creado el evento "Festival Electrónico Neon Nights"',
        date: 'Hace 2 días',
        icon: FaCalendarPlus,
        color: 'green.400',
    },
    {
        id: '2',
        type: 'edit',
        title: 'Evento actualizado',
        description: 'Has modificado los detalles de "Concierto de Rock Alternativo"',
        date: 'Hace 3 días',
        icon: FaEdit,
        color: 'blue.400',
    },
    {
        id: '3',
        type: 'staff',
        title: 'Personal asignado',
        description: 'Has asignado personal para el evento "Jazz Nights"',
        date: 'Hace 1 semana',
        icon: FaUsersCog,
        color: 'purple.400',
    },
    {
        id: '4',
        type: 'finance',
        title: 'Presupuesto actualizado',
        description: 'Has actualizado el presupuesto para "Rock Festival 2023"',
        date: 'Hace 1 semana',
        icon: FaMoneyCheckAlt,
        color: 'yellow.400',
    },
    {
        id: '5',
        type: 'approve',
        title: 'Evento publicado',
        description: 'Has publicado el evento "Festival Hip-Hop Urbano"',
        date: 'Hace 2 semanas',
        icon: FaClipboardCheck,
        color: 'teal.400',
    },
];

const ActivityItem = ({ activity }) => {
    return (
        <Flex
            align="center"
            py={3}
            px={2}
            borderRadius="md"
            transition="all 0.2s"
            _hover={{ bg: 'whiteAlpha.100' }}
        >
            <Circle size="40px" bg={`${activity.color}20`} mr={4}>
                <Icon as={activity.icon} color={activity.color} />
            </Circle>

            <Box flex="1">
                <Flex align="center" justify="space-between" mb={1}>
                    <Heading as="h4" size="xs">
                        {activity.title}
                    </Heading>
                    <Text color="gray.500" fontSize="xs">
                        {activity.date}
                    </Text>
                </Flex>
                <Text color="gray.400" fontSize="sm" noOfLines={2}>
                    {activity.description}
                </Text>
            </Box>
        </Flex>
    );
};

const RecentActivityCard = () => {
    return (
        <Box
            borderRadius="xl"
            bg="groovit.surface"
            p={6}
            boxShadow="md"
            borderWidth="1px"
            borderColor="whiteAlpha.100"
        >
            <Flex justify="space-between" align="center" mb={6}>
                <Heading size="md">Actividad Reciente</Heading>
                <Button
                    as={RouterLink}
                    to="/dashboard/activity"
                    variant="ghost"
                    size="sm"
                    color="groovit.purpleLight"
                    rightIcon={<FaArrowRight />}
                    _hover={{ bg: 'whiteAlpha.100' }}
                >
                    Ver todo
                </Button>
            </Flex>

            <Divider borderColor="whiteAlpha.200" mb={5} />

            <Box>
                {activities.map((activity, index) => (
                    <Box key={activity.id}>
                        <ActivityItem activity={activity} />
                        {index < activities.length - 1 && (
                            <Divider borderColor="whiteAlpha.100" my={2} />
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default RecentActivityCard;