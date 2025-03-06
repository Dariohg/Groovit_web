import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    Icon,
    useBreakpointValue,
    HStack,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Badge,
} from '@chakra-ui/react';
import { FaPlus, FaChartLine } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import React from "react";

const WelcomeCard = ({ userName, timeOfDay }) => {
    const headingSize = useBreakpointValue({ base: 'xl', md: '2xl' });

    return (
        <Box
            borderRadius="xl"
            overflow="hidden"
            position="relative"
            bg="groovit.surface"
            boxShadow="lg"
            borderWidth="1px"
            borderColor="whiteAlpha.100"
        >
            {/* Patrón decorativo */}
            <Box
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                width={{ base: '150px', md: '300px' }}
                bg="linear-gradient(135deg, rgba(157, 78, 221, 0.2) 0%, rgba(157, 78, 221, 0) 80%)"
                zIndex={0}
                borderTopRightRadius="xl"
                borderBottomRightRadius="xl"
            />

            <Flex
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                align="center"
                p={{ base: 6, md: 8 }}
                position="relative"
                zIndex={1}
            >
                <Box maxW={{ base: "100%", md: "60%" }}>
                    <Heading
                        as="h1"
                        size={headingSize}
                        mb={3}
                        className="gradient-text"
                    >
                        ¡Buenas {timeOfDay}, {userName}!
                    </Heading>

                    <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.400" mb={5}>
                        Bienvenido al panel de administración. Gestiona tus eventos musicales, monitorea las ventas y mantén todo bajo control.
                    </Text>

                    <HStack spacing={4}>
                        <Button
                            as={RouterLink}
                            to="/dashboard/events/create"
                            leftIcon={<Icon as={FaPlus} />}
                            colorScheme="purple"
                            bg="groovit.purple"
                            _hover={{ bg: 'groovit.purpleLight', transform: 'translateY(-2px)' }}
                            size={{ base: 'md', md: 'lg' }}
                            fontSize="md"
                            transition="all 0.3s ease"
                        >
                            Crear Evento
                        </Button>

                        <Button
                            as={RouterLink}
                            to="/dashboard/reports"
                            leftIcon={<Icon as={FaChartLine} />}
                            variant="outline"
                            colorScheme="purple"
                            borderColor="groovit.purple"
                            _hover={{ bg: 'rgba(157, 78, 221, 0.1)', transform: 'translateY(-2px)' }}
                            size={{ base: 'md', md: 'lg' }}
                            fontSize="md"
                            transition="all 0.3s ease"
                        >
                            Ver Reportes
                        </Button>
                    </HStack>
                </Box>

                <Flex
                    direction="column"
                    bg="rgba(30, 30, 30, 0.5)"
                    backdropFilter="blur(8px)"
                    p={4}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="whiteAlpha.200"
                    mt={{ base: 6, md: 0 }}
                    w={{ base: "100%", md: "auto" }}
                    minW={{ md: "250px" }}
                >
                    <Text fontWeight="medium" mb={3}>Estado del Sistema</Text>

                    <Flex justify="space-between" align="center" mb={3}>
                        <Text fontSize="sm" color="gray.400">Ventas del día</Text>
                        <Badge colorScheme="green" px={2} py={0.5}>+12.5%</Badge>
                    </Flex>

                    <Flex justify="space-between" align="center" mb={3}>
                        <Text fontSize="sm" color="gray.400">Eventos próximos</Text>
                        <Text fontWeight="bold">8</Text>
                    </Flex>

                    <Flex justify="space-between" align="center">
                        <Text fontSize="sm" color="gray.400">Tareas pendientes</Text>
                        <Text fontWeight="bold">5</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default WelcomeCard;