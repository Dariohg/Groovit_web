import {
    Box,
    Container,
    SimpleGrid,
    Stack,
    Text,
    Flex,
    Link,
    IconButton,
    Divider,
    Heading,
} from '@chakra-ui/react'
import { FaTwitter, FaInstagram, FaFacebook, FaSpotify } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'

// Enlaces de las secciones del footer
const SECTIONS = [
    {
        title: 'Compañía',
        links: [
            { label: 'Sobre Nosotros', href: '/about' },
            { label: 'Contacto', href: '/contact' },
            { label: 'Prensa', href: '/press' },
            { label: 'Trabaja con Nosotros', href: '/careers' },
        ],
    },
    {
        title: 'Soporte',
        links: [
            { label: 'Centro de Ayuda', href: '/help' },
            { label: 'FAQs', href: '/faqs' },
            { label: 'Políticas de Privacidad', href: '/privacy' },
            { label: 'Términos de Servicio', href: '/terms' },
        ],
    },
    {
        title: 'Descubre',
        links: [
            { label: 'Eventos Destacados', href: '/featured' },
            { label: 'Artistas', href: '/artists' },
            { label: 'Calendario', href: '/calendar' },
            { label: 'Blog', href: '/blog' },
        ],
    },
]

// Redes sociales
const SOCIAL_LINKS = [
    { label: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
    { label: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
    { label: 'Facebook', icon: FaFacebook, href: 'https://facebook.com' },
    { label: 'Spotify', icon: FaSpotify, href: 'https://spotify.com' },
]

/**
 * Componente Footer
 */
const Footer = () => {
    return (
        <Box
            as="footer"
            bg="groovit.surface"
            color="groovit.text"
            borderTop="1px solid"
            borderColor="whiteAlpha.100"
            mt={10}
        >
            <Container maxW="container.xl" py={10}>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} mb={8}>
                    {/* Logo y descripción */}
                    <Stack spacing={6}>
                        <Box>
                            <Text fontSize="2xl" fontWeight="bold" className="gradient-text">
                                Groovit
                            </Text>
                        </Box>
                        <Text color="gray.400" fontSize="sm">
                            La plataforma definitiva para descubrir, crear y compartir eventos musicales. Conectamos artistas y fans a través de experiencias únicas.
                        </Text>
                        <Stack direction="row" spacing={3}>
                            {SOCIAL_LINKS.map((link) => (
                                <IconButton
                                    key={link.label}
                                    as="a"
                                    href={link.href}
                                    aria-label={link.label}
                                    icon={<link.icon />}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    size="md"
                                    colorScheme="whiteAlpha"
                                    bg="whiteAlpha.200"
                                    _hover={{
                                        bg: 'groovit.purple',
                                        transform: 'translateY(-2px)',
                                    }}
                                    transition="all 0.3s ease"
                                />
                            ))}
                        </Stack>
                    </Stack>

                    {/* Enlaces de navegación */}
                    {SECTIONS.map((section) => (
                        <Stack key={section.title} align="flex-start">
                            <Heading
                                as="h4"
                                size="sm"
                                color="gray.300"
                                fontWeight="semibold"
                                mb={3}
                            >
                                {section.title}
                            </Heading>
                            {section.links.map((link) => (
                                <Link
                                    key={link.label}
                                    as={RouterLink}
                                    to={link.href}
                                    color="gray.400"
                                    fontSize="sm"
                                    _hover={{
                                        color: 'groovit.purpleLight',
                                        textDecoration: 'none',
                                    }}
                                    py={1}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Stack>
                    ))}
                </SimpleGrid>

                <Divider borderColor="whiteAlpha.200" my={6} />

                {/* Copyright */}
                <Flex
                    direction={{ base: 'column', md: 'row' }}
                    justify="space-between"
                    align="center"
                >
                    <Text fontSize="sm" color="gray.500">
                        © {new Date().getFullYear()} Groovit. Todos los derechos reservados.
                    </Text>
                    <Stack direction="row" spacing={6} mt={{ base: 4, md: 0 }}>
                        <Link fontSize="sm" color="gray.500" href="/privacy">
                            Privacidad
                        </Link>
                        <Link fontSize="sm" color="gray.500" href="/terms">
                            Términos
                        </Link>
                        <Link fontSize="sm" color="gray.500" href="/cookies">
                            Cookies
                        </Link>
                    </Stack>
                </Flex>
            </Container>
        </Box>
    )
}

export default Footer