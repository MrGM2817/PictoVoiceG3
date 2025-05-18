import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Componentes reutilizables
import SidebarSettings from '../components/SidebarSettings';
import BottomNav from '../components/BottomNav';
import UnavailableToast from '../components/UnavailableToast';

// Íconos y imágenes
import homeIcon from '../assets/home.svg';
import gamesIcon from '../assets/game.svg';
import settingsIcon from '../assets/config.svg';

import coheteIcon from '../assets/cohete.svg';
import categoriasIcon from '../assets/categorias.svg';
import completadosIcon from '../assets/juegoscompletados.svg';
import logrosIcon from '../assets/logros.svg';

import frases from '../assets/formar_frases.JPG';
import asociar from '../assets/asociar_imagenes.jpg';
import escuchar from '../assets/escuchar.jpg';
import defaultBg from '../assets/desconocido.jpg'; // Fondo para juegos 4,5,6

export default function HomePage() {
    // Estado para mostrar/ocultar la sidebar de configuración
    const [showSidebar, setShowSidebar] = useState(false);

    // Estado para mostrar/ocultar mensaje tipo toast "No disponible"
    const [showMessage, setShowMessage] = useState(false);

    // Estado para el mensaje de bienvenida almacenado en localStorage
    const [mensajeBienvenida, setMensajeBienvenida] = useState('');

    // Array con imágenes de fondo para los primeros 3 juegos y fondo por defecto para el resto
    const gameBackgrounds = [frases, asociar, escuchar, defaultBg, defaultBg, defaultBg];

    // Al cargar el componente, buscamos mensaje de bienvenida en localStorage (si existe)
    useEffect(() => {
        const mensaje = localStorage.getItem('mensajeBienvenida');
        if (mensaje) {
            setMensajeBienvenida(mensaje);
            localStorage.removeItem('mensajeBienvenida'); // Limpiamos para que no aparezca siempre
        }
    }, []);

    // Cuando se muestra el mensaje tipo toast, lo ocultamos automáticamente después de 3 segundos
    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => setShowMessage(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showMessage]);

    // Función para activar el mensaje "No disponible"
    const handleUnavailableClick = () => {
        setShowMessage(true);
    };

    return (
        <div className="min-h-screen bg-primary p-4 pb-24">
            {/* Encabezado con título y botón para abrir sidebar de configuración */}
            <div className="flex justify-between items-center mb-12 mt-4">
                <h1 className="text-4xl font-bold text-gray-800">Inicio</h1>
                <button onClick={() => setShowSidebar(true)}>
                    <img src={settingsIcon} alt="Configurar" className="w-9 h-9" />
                </button>
            </div>

            {/* Mostrar sidebar solo si showSidebar es true */}
            {showSidebar && <SidebarSettings onClose={() => setShowSidebar(false)} />}

            {/* Mostrar mensaje de bienvenida si existe */}
            {mensajeBienvenida && (
                <div className="bg-white text-indigo-900 p-4 rounded-lg shadow text-center mb-6 font-semibold">
                    {mensajeBienvenida}
                </div>
            )}

            {/* Estadísticas mostradas en tarjetas */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <StatCard icon={coheteIcon} label="Juegos Disponibles" count={3} />
                <StatCard icon={completadosIcon} label="Juegos Completados" count={2} />
                <StatCard icon={categoriasIcon} label="Categorías Disponibles" count={0} />
                <StatCard icon={logrosIcon} label="Logros" count={2} />
            </div>

            {/* Sección de juegos */}
            <div>
                <h2 className="text-2xl font-semibold mb-2">Juegos</h2>
                <p className="mb-4 text-sm text-gray-800">Elije un juego para comenzar.</p>
                <div className="grid grid-cols-2 gap-4">
                    {/* Generamos 6 tarjetas de juego, las 3 primeras con enlace a sus rutas */}
                    {Array.from({ length: 6 }).map((_, i) => {
                        const gameNumber = i + 1;
                        // Definimos rutas solo para los juegos 1, 2 y 3
                        const routes = {
                            1: '/arrastrar-formar-g1',
                            2: '/asociar-imagenes-g2',
                            3: '/escuchar-conectar-g3',
                        };
                        return (
                            <GameCard
                                key={i}
                                number={gameNumber}
                                bg={gameBackgrounds[i]}
                                to={routes[gameNumber]} // Pasa la ruta solo si existe
                            />
                        );
                    })}
                </div>
            </div>

            {/* Menú inferior de navegación */}
            <BottomNav
                current="home"
                onUnavailableClick={handleUnavailableClick}
                icons={{ home: homeIcon, games: gamesIcon }}
            />

            {/* Mensaje tipo toast "No disponible" */}
            {showMessage && <UnavailableToast />}
        </div>
    );
}

// Componente para las tarjetas de estadísticas
function StatCard({ icon, label, count }) {
    return (
        <div className="bg-white p-5 rounded-lg shadow flex items-start justify-between">
            <div>
                <div className="text-3xl font-bold text-gray-800 leading-none mb-2">{count}</div>
                <div className="text-base text-gray-600">{label}</div>
            </div>
            <img src={icon} alt={label} className="w-10 h-10 mt-1" />
        </div>
    );
}

// Componente para cada tarjeta de juego
function GameCard({ number, bg, to }) {
    // Contenido visible dentro de la tarjeta (texto y capa blanca translúcida)
    const content = (
        <>
            {/* Capa blanca translúcida para mejorar visibilidad del texto */}
            <div className="absolute inset-0 bg-white bg-opacity-80" />
            <div className="relative z-10 font-semibold text-black text-center">
                Juego {number}
            </div>
        </>
    );

    // Si hay ruta (to), envolvemos la tarjeta en un Link para hacerla clickeable
    return to ? (
        <Link
            to={to}
            className="relative rounded-lg overflow-hidden shadow-md h-24 flex items-center justify-center"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {content}
        </Link>
    ) : (
        // Si no hay ruta, mostramos la tarjeta como div normal (no clickeable)
        <div
            className="relative rounded-lg overflow-hidden shadow-md h-24 flex items-center justify-center"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {content}
        </div>
    );
}
