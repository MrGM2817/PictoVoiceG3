import {useEffect, useState} from 'react';

import SidebarSettings from '../components/SidebarSettings';
import BottomNav from '../components/BottomNav';
import UnavailableToast from '../components/UnavailableToast';


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
import defaultBg from '../assets/desconocido.jpg'; // Pon aquí la imagen para juegos 4,5,6

export default function HomePage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    // Array con las imágenes para los primeros 3 juegos y default para los demás
    const gameBackgrounds = [frases, asociar, escuchar, defaultBg, defaultBg, defaultBg];

    // Ocultar mensaje automáticamente después de 3 segundos
    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => setShowMessage(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showMessage]);
    // Función para mostrar mensaje "No disponible"
    const handleUnavailableClick = () => {
        setShowMessage(true);
    };

    return (
        <div className="min-h-screen bg-primary p-4 pb-24">
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-12 mt-4">
                <h1 className="text-4xl font-bold text-gray-800">Inicio</h1>
                <button onClick={() => setShowSidebar(true)}>
                    <img src={settingsIcon} alt="Configurar" className="w-9 h-9" />
                </button>
            </div>

            {/* Sidebar configuración */}
            {showSidebar && <SidebarSettings onClose={() => setShowSidebar(false)} />}


            {/* Estadísticas */}
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
                    {Array.from({ length: 6 }).map((_, i) => (
                        <GameCard key={i} number={i + 1} bg={gameBackgrounds[i]} />
                    ))}
                </div>
            </div>

            {/* Menú inferior */}
            <BottomNav
                current="home"
                onUnavailableClick={handleUnavailableClick}
                icons={{ home: homeIcon, games: gamesIcon }}
            />


            {/* Mensaje tipo toast */}
            {showMessage && <UnavailableToast />}

        </div>
    );
}

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

function GameCard({ number, bg }) {
    return (
        <div
            className="relative rounded-lg overflow-hidden shadow-md h-24 flex items-center justify-center font-semibold text-black text-center"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Capa oscura para mejor visibilidad */}
            {/* Capa blanca translúcida para mejor visibilidad */}
            <div className="absolute inset-0 bg-white bg-opacity-80" />
            {/* Texto sobre la capa */}
            <div className="relative z-10">
                Juego {number}
            </div>
        </div>
    )
}


