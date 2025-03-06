import {
    Box,
    Flex,
    Text,
    Icon,
    VStack,
    HStack,
    Divider,
    Avatar
} from '@chakra-ui/react';
import {
    FaHome,
    FaTicketAlt,
    FaCalendarAlt,
    FaHeart,
    FaUserAlt,
    FaCog,
    FaQuestionCircle,
    FaSignOutAlt
} from 'react-icons/fa';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

// Enlaces de navegación del sidebar
const navItems = [
    { name: 'Dashboard', icon: FaHome, path: '/dashboard' },
    { name: 'Mis Boletos', icon: FaTicketAlt, path: '/tickets' },
    { name: 'Próximos Eventos', icon: FaCalendarAlt, path: '/events' },
    { name: 'Favoritos', icon: FaHeart, path: '/favorites' },
    { name: 'Mi Perfil', icon: FaUserAlt, path: '/profile' },
];

// Enlaces secundarios
const secondaryNavItems = [
    { name: 'Configuración', icon: FaCog, path: '/settings' },
    { name: 'Ayuda', icon: FaQuestionCircle, path: '/help' },
];

const NavItem = ({ item, onClose }) => {
    const location = useLocation();
    const isActive = location.pathname === item.path;

    const handleClick = () => {
        if (onClose) onClose();
    };

    return (
        <Flex
            as={RouterLink}
            to={item.path}
            align="center"
            p={3}
            mx={3}
            borderRadius="md"
            role="group"
            cursor="pointer"
            fontWeight={isActive ? 'semibold' : 'normal'}
            color={isActive ? 'groovit.purpleLight' : 'gray.400'}
            bg={isActive ? 'whiteAlpha.100' : 'transparent'}
            _hover={{
                bg: 'whiteAlpha.100',
                color: 'groovit.text'
            }}
            onClick={handleClick}
            transition="all 0.2s"
        >
            <Icon
                as={item.icon}
                mr={3}
                fontSize="16"
                color={isActive ? 'groovit.purpleLight' : 'gray.400'}
                _groupHover={{ color: 'groovit.purpleLight' }}
            />
            <Text fontSize="sm">{item.name}</Text>
        </Flex>
    );
};

const SidebarContent = ({ onClose }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        if (onClose) onClose();
    };

    return (
        <Box>
            {/* Perfil de usuario */}
            <Flex direction="column" align="center" my={6} px={6}>
                <Avatar
                    size="lg"
                    name={user?.username || 'Usuario'}
                    bg="groovit.purple"
                    mb={3}
                />
                <Text fontWeight="bold" fontSize="md">
                    {user?.username || 'Usuario'}
                </Text>
                <Text fontSize="sm" color="gray.500">
                    {user?.email || 'usuario@ejemplo.com'}
                </Text>
            </Flex>

            <Divider borderColor="whiteAlpha.100" my={4} />

            {/* Navegación principal */}
            <VStack spacing={1} align="stretch" mb={8}>
                {navItems.map((item) => (
                    <NavItem key={item.name} item={item} onClose={onClose} />
                ))}
            </VStack>

            <Divider borderColor="whiteAlpha.100" my={4} />

            {/* Navegación secundaria */}
            <VStack spacing={1} align="stretch">
                {secondaryNavItems.map((item) => (
                    <NavItem key={item.name} item={item} onClose={onClose} />
                ))}
            </VStack>

            {/* Botón de cerrar sesión */}
            <Flex
                align="center"
                p={3}
                mx={3}
                mt={8}
                borderRadius="md"
                cursor="pointer"
                color="red.400"
                _hover={{
                    bg: 'whiteAlpha.100',
                }}
                onClick={handleLogout}
                transition="all 0.2s"
            >
                <Icon as={FaSignOutAlt} mr={3} fontSize="16" />
                <Text fontSize="sm">Cerrar Sesión</Text>
            </Flex>
        </Box>
    );
};

export default SidebarContent;