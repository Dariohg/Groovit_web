import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import theme from './presentation/theme'
import { AuthProvider } from './presentation/context/AuthContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </ChakraProvider>
    </React.StrictMode>,
)