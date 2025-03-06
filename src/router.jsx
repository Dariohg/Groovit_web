import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import HomePage from './presentation/pages/Home'
import Login from './presentation/pages/Auth/Login'
import Register from './presentation/pages/Auth/Register'
import Dashboard from './presentation/pages/Dashboard'
import CreateEvent from './presentation/pages/Dashboard/Events/CreateEvent'
import ProtectedRoute from './presentation/components/auth/ProtectedRoute'

// Importar estas páginas cuando se creen
const EventsPage = () => <div>Página de Eventos (Por implementar)</div>
const ArtistsPage = () => <div>Página de Artistas (Por implementar)</div>
const AboutPage = () => <div>Página Acerca de Nosotros (Por implementar)</div>
const ProfilePage = () => <div>Página de Perfil (Por implementar)</div>
const TicketsPage = () => <div>Página de Mis Boletos (Por implementar)</div>
const ForgotPasswordPage = () => <div>Página de Recuperación de Contraseña (Por implementar)</div>
const FavoritesPage = () => <div>Página de Favoritos (Por implementar)</div>
const SettingsPage = () => <div>Página de Configuración (Por implementar)</div>
const HelpPage = () => <div>Página de Ayuda (Por implementar)</div>
const ActivityPage = () => <div>Página de Actividad (Por implementar)</div>
const RecommendationsPage = () => <div>Página de Recomendaciones (Por implementar)</div>

const router = createBrowserRouter([
    // Rutas de autenticación (sin layout)
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'register',
        element: <Register />
    },
    {
        path: 'forgot-password',
        element: <ForgotPasswordPage />
    },
    // Rutas principales (con layout)
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'events',
                element: <EventsPage />
            },
            {
                path: 'artists',
                element: <ArtistsPage />
            },
            {
                path: 'about',
                element: <AboutPage />
            },
            // Rutas protegidas
            {
                element: <ProtectedRoute />,
                children: [
                    // Dashboard y sus sub-rutas
                    {
                        path: 'dashboard',
                        element: <Dashboard />
                    },
                    {
                        path: 'dashboard/events/create',
                        element: <CreateEvent />
                    },
                    {
                        path: 'activity',
                        element: <ActivityPage />
                    },
                    {
                        path: 'recommendations',
                        element: <RecommendationsPage />
                    },
                    {
                        path: 'profile',
                        element: <ProfilePage />
                    },
                    {
                        path: 'tickets',
                        element: <TicketsPage />
                    },
                    {
                        path: 'favorites',
                        element: <FavoritesPage />
                    },
                    {
                        path: 'settings',
                        element: <SettingsPage />
                    },
                    {
                        path: 'help',
                        element: <HelpPage />
                    }
                ]
            }
        ]
    }
])

export default router