import { Box } from '@chakra-ui/react'
import NavbarComponent from './Navbar'
import { useLocation } from 'react-router-dom'

const MainLayout = ({ children }) => {
    const location = useLocation();

    // Verifica si estamos en la ruta del dashboard o en alguna subruta
    const isDashboardRoute = location.pathname.startsWith('/dashboard');

    return (
        <Box minH="100vh" bg="groovit.background">
            {/* Mostrar NavBar solo si no estamos en dashboard */}
            {!isDashboardRoute && <NavbarComponent />}

            <Box as="main" pt={!isDashboardRoute ? 16 : 0}>
                {children}
            </Box>
        </Box>
    )
}

export default MainLayout