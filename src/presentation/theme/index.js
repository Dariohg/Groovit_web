import { extendTheme } from '@chakra-ui/react';

// Colores del tema
const colors = {
    groovit: {
        purple: '#9D4EDD',
        purpleLight: '#C77DFF',
        purpleDark: '#7B2CBF',
        background: '#121212',
        surface: '#1E1E1E',
        text: '#F5F5F5'
    }
};

// Estilos globales y configuración del tema
const theme = extendTheme({
    colors,
    fonts: {
        heading: "'Inter', sans-serif",
        body: "'Inter', sans-serif",
    },
    styles: {
        global: {
            body: {
                bg: 'groovit.background',
                color: 'groovit.text',
                minHeight: '100vh',
            },
        },
    },
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'bold',
                borderRadius: 'md',
            },
            variants: {
                primary: {
                    bg: 'groovit.purple',
                    color: 'white',
                    _hover: {
                        bg: 'groovit.purpleLight',
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                    },
                    _active: {
                        bg: 'groovit.purpleDark',
                    },
                },
                secondary: {
                    bg: 'transparent',
                    color: 'groovit.purpleLight',
                    border: '1px solid',
                    borderColor: 'groovit.purple',
                    _hover: {
                        bg: 'rgba(157, 78, 221, 0.1)',
                        transform: 'translateY(-2px)',
                    },
                },
                ghost: {
                    color: 'groovit.text',
                    _hover: {
                        bg: 'rgba(255, 255, 255, 0.1)',
                    },
                },
            },
            defaultProps: {
                variant: 'primary',
            },
        },
        Link: {
            baseStyle: {
                color: 'groovit.purpleLight',
                _hover: {
                    textDecoration: 'none',
                    color: 'groovit.purple',
                },
            },
        },
        Heading: {
            baseStyle: {
                color: 'groovit.text',
                fontWeight: 'bold',
            },
        },
        Card: {
            baseStyle: {
                container: {
                    bg: 'groovit.surface',
                    borderRadius: 'xl',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    _hover: {
                        transform: 'translateY(-5px)',
                        boxShadow: 'xl',
                    },
                },
            },
        },
    },
});

export default theme;