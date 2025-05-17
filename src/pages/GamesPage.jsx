import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'; // Importa Link

import SidebarSettings from '../components/SidebarSettings';
import BottomNav from '../components/BottomNav';
import UnavailableToast from '../components/UnavailableToast';

import homeIcon from '../assets/home.svg';
import gamesIcon from '../assets/game.svg';
import settingsIcon from '../assets/config.svg';

import playIcon from '../assets/play.svg';

import frases from '../assets/formar_frases.JPG';
import asociar from '../assets/asociar_imagenes.jpg';
import escuchar from '../assets/escuchar.jpg';


export default function GamesPage() {

    const [showSidebar, setShowSidebar] = useState(false);
    const [showMessage, setShowMessage] = useState(false);


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

    const games = [
        {
            id: 1,
            title: "Arrastra y forma frases",
            date: "18/11/24",
            duration: "3 minutes",
            category: "None",
            bg: frases
        },
        {
            id: 2,
            title: "Asocia las imágenes y palabras",
            date: "15/11/24",
            duration: "5 minutes",
            category: "None",
            bg: asociar,
            path: "/asociar-imagenes-g2" // Ruta a la page AssociateGame2
        },
        {
            id: 3,
            title: "Escucha y conecta",
            date: "13/11/24",
            duration: "10 minutes",
            category: "None",
            bg: escuchar,
            path: "/escuchar-conectar-g3"
        },
    ]

    return (

        <div className="min-h-screen bg-primary p-4 pb-20">
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-12 mt-4">
                <h1 className="text-4xl font-bold text-gray-800">Juegos</h1>
                <button onClick={() => setShowSidebar(true)}>
                    <img src={settingsIcon} alt="Configurar" className="w-9 h-9" />
                </button>

            </div>

            {/* Lista de juegos */}
            <div className="mt-6 space-y-4">
                {games.map((game) => (
                    <div
                        key={game.id}
                        // className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
                        className="relative rounded-lg overflow-hidden shadow-md"
                        style={{
                            backgroundImage: `url(${game.bg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {/* Capa oscura encima del fondo */}
                        <div className="absolute inset-0 bg-white bg-opacity-80" />

                        {/* Contenido */}
                        <div className="relative z-10 p-4 flex justify-between items-center text-black">
                            <div className="flex-1 pr-4">
                                <h2 className="text-lg font-bold">{game.title}</h2>
                                <p className="text-sm mt-1">Juego {game.id}</p>
                                <p className="text-sm">{game.date} • {game.duration} • Categoría: {game.category}</p>
                            </div>

                            {game.path && (
                                <Link
                                    to={game.path}
                                    className="flex-shrink-0 hover:scale-110 transition-transform"
                                    style={{ minWidth: '40px', minHeight: '40px' }}
                                >
                                    <img src={playIcon} alt="Jugar" className="w-10 h-10" />
                                </Link>
                            )}
                            {!game.path && (
                                <button
                                    onClick={handleUnavailableClick}
                                    className="flex-shrink-0 hover:scale-110 transition-transform"
                                    style={{ minWidth: '40px', minHeight: '40px' }}
                                >
                                    <img src={playIcon} alt="Jugar" className="w-10 h-10 opacity-50 cursor-not-allowed" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>


            {/* Fondo oscuro + Sidebar lateral de configuración */}
            {showSidebar && <SidebarSettings onClose={() => setShowSidebar(false)} />}


            {/* Menú inferior */}
            <BottomNav
                current="games"
                onUnavailableClick={handleUnavailableClick}
                icons={{ home: homeIcon, games: gamesIcon }}
            />


            {/* Mensaje tipo toast */}
            {showMessage && <UnavailableToast />}

        </div>
    );
}



