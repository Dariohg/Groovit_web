import { useState, useEffect } from 'react'
import {
    Box,
    Flex,
    HStack,
    IconButton,
    Button,
    useDisclosure,
    Stack,
    Text,
    Container,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    MenuDivider,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Enlaces de navegación
const Links = [
    { name: 'Inicio', path: '/' },
    { name: 'Eventos', path: '/events' },
    { name: 'Artistas', path: '/artists' },
    { name: 'Nosotros', path: '/about' },
]

// Componente para cada enlace de navegación
const NavLink = ({ children, to }) => {
    const location = useLocation()
    const isActive = location.pathname === to

    return (
        <Link
            as={RouterLink}
            to={to}
            px={3}
            py={2}
            position="relative"
            fontWeight={isActive ? 'bold' : 'medium'}
            color={isActive ? 'groovit.purpleLight' : 'groovit.text'}
            _hover={{
                textDecoration: 'none',
                color: 'groovit.purpleLight',
                _after: {
                    width: '60%',
                },
            }}
            _after={{
                content: '""',
                position: 'absolute',
                width: isActive ? '60%' : '0%',
                height: '2px',
                bottom: '0',
                left: '20%',
                bg: 'groovit.purple',
                transition: 'all 0.3s ease',
            }}
        >
            {children}
        </Link>
    )
}

/**
 * Componente de barra de navegación
 */
const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrolled, setScrolled] = useState(false)
    const { isAuthenticated, user, logout } = useAuth()
    const navigate = useNavigate()

    // Manejo de logout con navegación
    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    // Detectar scroll para cambiar estilo del navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 60) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <Box
            as="nav"
            position="fixed"
            w="full"
            zIndex={999}
            bg={scrolled ? 'rgba(18, 18, 18, 0.9)' : 'transparent'}
            backdropFilter={scrolled ? 'blur(10px)' : 'none'}
            transition="all 0.3s ease"
            boxShadow={scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'}
        >
            <Container maxW="container.xl">
                <Flex h={20} alignItems="center" justifyContent="space-between">
                    {/* Botón de menú móvil */}
                    <IconButton
                        size="lg"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label="Open Menu"
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                        variant="ghost"
                        color="groovit.text"
                        _hover={{ bg: 'rgba(123, 44, 191, 0.1)' }}
                    />

                    {/* Logo y navegación */}
                    <HStack spacing={8} alignItems="center">
                        <Link as={RouterLink} to="/">
                            <Text
                                fontSize="2xl"
                                fontWeight="extrabold"
                                className="gradient-text"
                                letterSpacing="tight"
                            >
                                Groovit
                            </Text>
                        </Link>
                        <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link.path} to={link.path}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>

                    {/* Botones de acción o menú de usuario */}
                    {isAuthenticated() ? (
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}
                            >
                                <HStack>
                                    <Avatar
                                        size={'sm'}
                                        bg="groovit.purple"
                                        color="white"
                                        name={user.username}
                                    />
                                    <Text display={{ base: 'none', md: 'block' }}>
                                        {user.username}
                                    </Text>
                                    <ChevronDownIcon />
                                </HStack>
                            </MenuButton>
                            <MenuList bg="groovit.surface" borderColor="whiteAlpha.300">
                                <MenuItem
                                    as={RouterLink}
                                    to="/profile"
                                    _hover={{ bg: 'whiteAlpha.200' }}
                                >
                                    Perfil
                                </MenuItem>
                                <MenuItem
                                    as={RouterLink}
                                    to="/tickets"
                                    _hover={{ bg: 'whiteAlpha.200' }}
                                >
                                    Mis Boletos
                                </MenuItem>
                                <MenuDivider borderColor="whiteAlpha.300" />
                                <MenuItem
                                    onClick={handleLogout}
                                    _hover={{ bg: 'whiteAlpha.200', color: 'red.300' }}
                                >
                                    Cerrar Sesión
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <HStack spacing={3} display={{ base: 'none', md: 'flex' }}>
                            <Button
                                as={RouterLink}
                                to="/login"
                                variant="ghost"
                                size="sm"
                            >
                                Iniciar Sesión
                            </Button>
                            <Button
                                as={RouterLink}
                                to="/register"
                                variant="primary"
                                size="sm"
                            >
                                Registrarse
                            </Button>
                        </HStack>
                    )}
                </Flex>

                {/* Menú móvil */}
                {isOpen && (
                    <Box
                        pb={4}
                        display={{ md: 'none' }}
                        bg="groovit.background"
                        shadow="md"
                        rounded="md"
                        mt={2}
                        p={4}
                    >
                        <Stack as="nav" spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.path} to={link.path}>
                                    {link.name}
                                </NavLink>
                            ))}

                            {!isAuthenticated() ? (
                                <Stack direction="row" spacing={4} mt={4}>
                                    <Button
                                        as={RouterLink}
                                        to="/login"
                                        variant="ghost"
                                        w="full"
                                    >
                                        Iniciar Sesión
                                    </Button>
                                    <Button
                                        as={RouterLink}
                                        to="/register"
                                        variant="primary"
                                        w="full"
                                    >
                                        Registrarse
                                    </Button>
                                </Stack>
                            ) : (
                                <Stack mt={4} spacing={2}>
                                    <Flex align="center" p={2} borderRadius="md">
                                        <Avatar
                                            size={'sm'}
                                            bg="groovit.purple"
                                            color="white"
                                            name={user.username}
                                            mr={2}
                                        />
                                        <Text fontWeight="medium">{user.username}</Text>
                                    </Flex>
                                    <Button
                                        as={RouterLink}
                                        to="/profile"
                                        variant="ghost"
                                        justifyContent="flex-start"
                                        w="full"
                                    >
                                        Perfil
                                    </Button>
                                    <Button
                                        as={RouterLink}
                                        to="/tickets"
                                        variant="ghost"
                                        justifyContent="flex-start"
                                        w="full"
                                    >
                                        Mis Boletos
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        justifyContent="flex-start"
                                        w="full"
                                        onClick={handleLogout}
                                        color="red.300"
                                        _hover={{ bg: 'whiteAlpha.200' }}
                                    >
                                        Cerrar Sesión
                                    </Button>
                                </Stack>
                            )}
                        </Stack>
                    </Box>
                )}
            </Container>
        </Box>
    )
}

export default Navbar