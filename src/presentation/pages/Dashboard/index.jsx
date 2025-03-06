import { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    Text,
    Flex,
    IconButton,
    useBreakpointValue,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Button,
    Avatar,
    HStack,
    SimpleGrid,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FaTicketAlt, FaCalendarAlt, FaMusic, FaHeart, FaChartBar } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import WelcomeCard from './components/WelcomeCard';
import StatsCard from './components/StatsCard';
import UpcomingEventsCard from './components/UpcomingEventsCard';
import RecommendationsCard from './components/RecommendationsCard';
import RecentActivityCard from './components/RecentActivityCard';
import SidebarContent from './components/SidebarContent';

const Dashboard = () => {
    const { user } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isDesktop = useBreakpointValue({ base: false, lg: true });
    const [timeOfDay, setTimeOfDay] = useState('');

    useEffect(() => {
        const hours = new Date().getHours();

        if (hours < 12) {
            setTimeOfDay('mañana');
        } else if (hours < 18) {
            setTimeOfDay('tarde');
        } else {
            setTimeOfDay('noche');
        }
    }, []);

    return (
        <Box minH="100vh" bg="groovit.background">
            <Flex>
                {/* Sidebar para escritorio */}
                {isDesktop && (
                    <Box
                        as="nav"
                        w="250px"
                        bg="groovit.surface"
                        borderRight="1px solid"
                        borderColor="whiteAlpha.100"
                        pos="fixed"
                        h="100vh"
                        zIndex={5}
                    >
                        <SidebarContent />
                    </Box>
                )}

                {/* Drawer para móvil */}
                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    isFullHeight
                >
                    <DrawerOverlay />
                    <DrawerContent bg="groovit.surface">
                        <DrawerHeader borderBottomWidth="1px" borderColor="whiteAlpha.100">
                            <Flex justify="space-between" align="center">
                                <Text
                                    fontSize="xl"
                                    fontWeight="bold"
                                    className="gradient-text"
                                >
                                    Mi Groovit
                                </Text>
                                <Avatar
                                    size="sm"
                                    name={user?.username || 'Usuario'}
                                    bg="groovit.purple"
                                />
                            </Flex>
                        </DrawerHeader>
                        <DrawerBody p={0}>
                            <SidebarContent onClose={onClose} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                {/* Contenido principal */}
                <Box
                    ml={{ base: 0, lg: '250px' }}
                    w={{ base: 'full', lg: 'calc(100% - 250px)' }}
                    pt={4}
                    pb="40px"
                    px={{ base: 4, md: 8 }}
                    minH="100vh"
                >
                    {/* Botón de menú para móvil */}
                    {!isDesktop && (
                        <IconButton
                            aria-label="Menu"
                            icon={<HamburgerIcon />}
                            variant="ghost"
                            color="groovit.text"
                            position="fixed"
                            left={4}
                            top={4}
                            zIndex={5}
                            onClick={onOpen}
                            _hover={{ bg: 'whiteAlpha.200' }}
                        />
                    )}

                    <Container maxW="container.xl" px={{ base: 2, md: 4 }}>
                        {/* Sección de bienvenida */}
                        <WelcomeCard
                            userName={user?.username || 'Melómano'}
                            timeOfDay={timeOfDay}
                        />

                        {/* Tarjetas de estadísticas */}
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5} mt={8}>
                            <StatsCard
                                title="Boletos"
                                value="3"
                                icon={FaTicketAlt}
                                color="teal.400"
                            />
                            <StatsCard
                                title="Eventos Asistidos"
                                value="7"
                                icon={FaCalendarAlt}
                                color="blue.400"
                            />
                            <StatsCard
                                title="Artistas Favoritos"
                                value="12"
                                icon={FaHeart}
                                color="red.400"
                            />
                            <StatsCard
                                title="Géneros Preferidos"
                                value="5"
                                icon={FaMusic}
                                color="purple.400"
                            />
                        </SimpleGrid>

                        {/* Eventos próximos y recomendaciones */}
                        <Grid
                            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                            gap={6}
                            mt={8}
                        >
                            <GridItem>
                                <UpcomingEventsCard />
                            </GridItem>
                            <GridItem>
                                <RecommendationsCard />
                            </GridItem>
                        </Grid>

                        {/* Actividad reciente */}
                        <Box mt={8}>
                            <RecentActivityCard />
                        </Box>
                    </Container>
                </Box>
            </Flex>
        </Box>
    );
};

export default Dashboard;