import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Flex,
    Icon,
    useBreakpointValue,
} from '@chakra-ui/react'
import {
    FaGuitar,
    FaCompactDisc,
    FaMicrophone,
    FaDrum,
    FaHeadphones,
    FaMusic,
    FaRecordVinyl
} from 'react-icons/fa'
import { GiSaxophone } from 'react-icons/gi'
import { Link as RouterLink } from 'react-router-dom'

const musicCategories = [
    {
        id: 'rock',
        name: 'Rock',
        icon: FaGuitar,
        color: '#C77DFF', // Púrpura claro
        description: 'Desde el clásico hasta el alternativo y el indie rock.',
    },
    {
        id: 'electronic',
        name: 'Electrónica',
        icon: FaHeadphones,
        color: '#9D4EDD', // Púrpura medio
        description: 'EDM, techno, house, trance y más ritmos electrónicos.',
    },
    {
        id: 'pop',
        name: 'Pop',
        icon: FaMicrophone,
        color: '#7B2CBF', // Púrpura oscuro
        description: 'Lo mejor del pop nacional e internacional.',
    },
    {
        id: 'hiphop',
        name: 'Hip-Hop',
        icon: FaCompactDisc,
        color: '#C77DFF', // Púrpura claro
        description: 'Rap, trap, urban y toda la cultura hip-hop.',
    },
    {
        id: 'jazz',
        name: 'Jazz & Blues',
        icon: GiSaxophone,
        color: '#9D4EDD',
        description: 'Sonidos clásicos e innovadores del jazz y blues.',
    },
    {
        id: 'latin',
        name: 'Latino',
        icon: FaMusic,
        color: '#7B2CBF', // Púrpura oscuro
        description: 'Salsa, reggaeton, cumbia, bachata y más ritmos latinos.',
    },
    {
        id: 'folk',
        name: 'Folk & Acústico',
        icon: FaRecordVinyl,
        color: '#C77DFF', // Púrpura claro
        description: 'Trova, folk, country y música acústica.',
    },
    {
        id: 'metal',
        name: 'Metal & Punk',
        icon: FaDrum,
        color: '#9D4EDD', // Púrpura medio
        description: 'Heavy metal, punk, hardcore y sus variantes.',
    },
];

/**
 * Componente de categoría musical
 */
const CategoryCard = ({ category }) => {
    return (
        <Flex
            as={RouterLink}
            to={`/events?category=${category.id}`}
            direction="column"
            align="center"
            textAlign="center"
            p={6}
            borderRadius="xl"
            bg="groovit.surface"
            borderWidth="1px"
            borderColor="whiteAlpha.100"
            transition="all 0.3s ease"
            role="group"
            _hover={{
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                borderColor: 'groovit.purpleLight',
                textDecoration: 'none',
            }}
        >
            <Flex
                bg={`${category.color}20`}
                borderRadius="full"
                w="70px"
                h="70px"
                align="center"
                justify="center"
                mb={4}
                transition="all 0.3s ease"
                _groupHover={{
                    bg: `${category.color}40`,
                    transform: 'scale(1.1)',
                }}
            >
                <Icon as={category.icon} w={8} h={8} color={category.color} />
            </Flex>
            <Heading
                as="h3"
                size="md"
                mb={2}
                transition="all 0.2s ease"
                _groupHover={{ color: 'groovit.purpleLight' }}
            >
                {category.name}
            </Heading>
            <Text
                fontSize="sm"
                color="gray.400"
                noOfLines={2}
            >
                {category.description}
            </Text>
        </Flex>
    );
};

/**
 * Componente de categorías musicales para la página de inicio
 */
const MusicCategories = () => {
    const columns = useBreakpointValue({ base: 2, md: 3, lg: 4 });

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
                        Explora por Géneros
                    </Heading>
                    <Text
                        fontSize="lg"
                        color="gray.400"
                        textAlign="center"
                        maxW="800px"
                    >
                        Encuentra eventos según tus géneros musicales favoritos y descubre
                        nuevos artistas que te encantarán.
                    </Text>
                </Flex>

                <SimpleGrid columns={columns} spacing={5}>
                    {musicCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default MusicCategories;