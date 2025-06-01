import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SidebarSettings from '../components/SidebarSettings';
import BottomNav from '../components/BottomNav';
import UnavailableToast from '../components/UnavailableToast';
import AchievementUnlockedModal from '../components/AchievementUnlockedModal';


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
import defaultBg from '../assets/desconocido.jpg';

export default function HomePage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [mensajeBienvenida, setMensajeBienvenida] = useState('');

    const [completedCount, setCompletedCount] = useState(0);
    const [completedAchievements, setCompletedAchievements] = useState(0);
    const [showAchievementModal, setShowAchievementModal] = useState(false);

    const gameBackgrounds = [frases, asociar, escuchar, defaultBg, defaultBg, defaultBg];

    // Lógica para verificar si se debe desbloquear el logro 1
    useEffect(() => {
        const juego1 = localStorage.getItem('juego1Completado')?.trim() === 'true';
        const juego2 = localStorage.getItem('juego2Completado')?.trim() === 'true';
        const juego3 = localStorage.getItem('juego3Completado')?.trim() === 'true';

        const logro1YaDado = localStorage.getItem('logro1Completado')?.trim() === 'true';


        if (juego1 && juego2 && juego3 && !logro1YaDado) {
            console.log('¡Mostrando modal de logro!');
            const currentAchievements = Number(localStorage.getItem('completedAchievements')) || 0;
            localStorage.setItem('completedAchievements', (currentAchievements + 1).toString());
            localStorage.setItem('logro1Completado', 'true');
            setShowAchievementModal(true);
        }
    }, []);

    useEffect(() => {
        const mensaje = localStorage.getItem('mensajeBienvenida');
        if (mensaje) {
            setMensajeBienvenida(mensaje);
            localStorage.removeItem('mensajeBienvenida');
        }

        const storedCompleted = localStorage.getItem('completedGames');
        setCompletedCount(storedCompleted ? Number(storedCompleted) : 0);

        const storedAchievements = localStorage.getItem('completedAchievements');
        setCompletedAchievements(storedAchievements ? Number(storedAchievements) : 0);
    }, []);

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => setShowMessage(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showMessage]);

    const handleUnavailableClick = () => {
        setShowMessage(true);
    };

    return (
        <div className="flex flex-col min-h-screen bg-primary">
            <main className="flex-1 overflow-y-auto p-4 pb-28">
                <div className="flex justify-between items-center mb-12 mt-4">
                    <h1 className="text-4xl font-bold text-gray-800">Inicio</h1>
                    <button onClick={() => setShowSidebar(true)}>
                        <img src={settingsIcon} alt="Configurar" className="w-9 h-9" />
                    </button>
                </div>

                {showSidebar && <SidebarSettings onClose={() => setShowSidebar(false)} />}

                {mensajeBienvenida && (
                    <div className="bg-white text-indigo-900 p-4 rounded-lg shadow text-center mb-6 font-semibold">
                        {mensajeBienvenida}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <StatCard icon={coheteIcon} label="Juegos Disponibles" count={3} />
                    <StatCard icon={completadosIcon} label="Juegos Completados" count={completedCount} />
                    <StatCard icon={categoriasIcon} label="Categorías Disponibles" count={0} />
                    <StatCard icon={logrosIcon} label="Logros" count={completedAchievements} />
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-2">Juegos</h2>
                    <p className="mb-4 text-sm text-gray-800">Elije un juego para comenzar.</p>
                    <div className="grid grid-cols-2 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => {
                            const gameNumber = i + 1;
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
                                    to={routes[gameNumber]}
                                />
                            );
                        })}
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 w-full z-50">
                <BottomNav
                    current="home"
                    onUnavailableClick={handleUnavailableClick}
                    icons={{ home: homeIcon, games: gamesIcon }}
                />
            </div>

            {showMessage && <UnavailableToast />}
            {showAchievementModal && (
                <AchievementUnlockedModal onClose={() => setShowAchievementModal(false)} />
            )}

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

function GameCard({ number, bg, to }) {
    const content = (
        <>
            <div className="absolute inset-0 bg-white bg-opacity-80" />
            <div className="relative z-10 font-semibold text-black text-center">
                Juego {number}
            </div>
        </>
    );

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
