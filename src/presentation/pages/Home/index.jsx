import { Box } from '@chakra-ui/react'
import Hero from './Hero'
import FeaturedEvents from './FeaturedEvents'
import MusicCategories from './MusicCategories'
import CallToAction from './CallToAction'

/**
 * Página de inicio de la aplicación
 */
const HomePage = () => {
    return (
        <Box>
            <Hero />
            <FeaturedEvents />
            <MusicCategories />
            <CallToAction />
        </Box>
    )
}

export default HomePage