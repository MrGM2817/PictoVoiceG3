import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import volverAtras from '../assets/retroceder.svg';
import ConfirmationModal from '../components/ConfirmationModal';
import advertencia from '../assets/advertencia.svg';
import audioIcon from '../assets/audio.svg';
import correcto from '../assets/correcto.svg';
import incorrecto from '../assets/incorrecto.svg';
import GameCompletedScreen from '../components/GameCompletedScreen';

import audioAlegria from '../assets/alegriaAudio.mp3';
import audioTristeza from '../assets/tristezaAudio.mp3';
import audioEnojo from '../assets/enojoAudio.mp3';
import audioMiedo from '../assets/miedoAudio.mp3';
import audioSorpresa from '../assets/sorpresaAudio.mp3';
import audioCalma from '../assets/calmaAudio.mp3';
import bannerJuegoCompletado3 from "../assets/bannerJuegoCompletado3.svg";

const audioRounds = [
    { audio: audioAlegria, correctEmotion: 'Alegría' },
    { audio: audioTristeza, correctEmotion: 'Tristeza' },
    { audio: audioEnojo, correctEmotion: 'Enojo' },
    { audio: audioMiedo, correctEmotion: 'Miedo' },
    { audio: audioSorpresa, correctEmotion: 'Sorpresa' },
    { audio: audioCalma, correctEmotion: 'Calma' },
];

// Función para barajar array (Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function ListenConnectGame3() {
    const [currentRound, setCurrentRound] = useState(0);
    const [shuffledRounds, setShuffledRounds] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [showSkipModal, setShowSkipModal] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

    const audioRef = useRef(null);

    const emotionOptions = [
        'Alegría',
        'Tristeza',
        'Enojo',
        'Miedo',
        'Sorpresa',
        'Calma',
        'Vergüenza',
        'Desprecio',
        'Confusión',
    ];

    // Barajar los audios al montar el componente
    useEffect(() => {
        setShuffledRounds(shuffleArray(audioRounds));
    }, []);

    useEffect(() => {
        if (shuffledRounds.length > 0 && currentRound >= shuffledRounds.length) {
            setGameCompleted(true);
        }
    }, [currentRound, shuffledRounds]);

    const handlePlayAudio = () => {
        if (isPlaying || !audioRef.current) return;
        setIsPlaying(true);
        audioRef.current.play();
        audioRef.current.onended = () => setIsPlaying(false);
    };

    const handleVerify = () => setShowResults(true);

    const handleContinue = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);

        const nextRound = currentRound + 1;
        if (nextRound >= shuffledRounds.length) {
            setGameCompleted(true);
        } else {
            setCurrentRound(nextRound);
            setSelectedEmotion(null);
            setShowResults(false);
        }
    };

    const handleSkipConfirm = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);

        setSelectedEmotion(shuffledRounds[currentRound].correctEmotion);
        setShowResults(true);
        setShowSkipModal(false);
    };

    if (gameCompleted) return <GameCompletedScreen bannerImage={bannerJuegoCompletado3} />;

    if (shuffledRounds.length === 0) return <div>Cargando...</div>; // espera hasta que se barajen

    const currentAudio = shuffledRounds[currentRound];

    return (
        <div className="min-h-screen bg-primary p-4 flex flex-col relative">
            <div className="flex justify-between items-center mb-2">
                <Link to="/games" className="flex items-center gap-2 text-lg text-gray-800 hover:underline">
                    <img src={volverAtras} alt="Volver" className="w-5 h-5" />
                    Volver a Juegos
                </Link>

                <button
                    className="bg-white text-indigo-900 font-semibold px-3 py-1 rounded-md shadow hover:bg-gray-100 transition"
                    onClick={() => setShowSkipModal(true)}
                >
                    Skip
                </button>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2 text-center max-w-xl w-full self-center">
                Escucha la voz y asocia el tono con la emoción que expresa
            </h1>
            <p className="text-gray-700 mb-6 max-w-xl w-full text-center self-center">
                Selecciona la tarjeta con la emoción expresada en el audio
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-3xl w-full mx-auto">
                <div></div>
                <div className="bg-white flex items-center justify-center py-6 rounded-xl shadow-md">
                    <img
                        src={audioIcon}
                        alt="Reproducir audio"
                        className={`w-8 h-8 cursor-pointer ${isPlaying ? 'opacity-50' : 'hover:scale-105 transition'}`}
                        onClick={handlePlayAudio}
                    />
                    <audio ref={audioRef} src={currentAudio.audio} />
                </div>
                <div></div>

                {emotionOptions.map((emotion) => {
                    const isCorrect = showResults && emotion === currentAudio.correctEmotion;
                    const isIncorrect = showResults && emotion === selectedEmotion && emotion !== currentAudio.correctEmotion;

                    return (
                        <div
                            key={emotion}
                            className={`bg-white text-center text-gray-800 font-semibold py-6 rounded-xl shadow-md cursor-pointer relative ${
                                selectedEmotion === emotion ? 'ring-2 ring-blue-400' : ''
                            } hover:bg-gray-100 transition`}
                            onClick={() => !showResults && setSelectedEmotion(emotion)}
                        >
                            {emotion}
                            {isCorrect && (
                                <img src={correcto} alt="Correcto" className="absolute top-2 right-2 w-6 h-6" />
                            )}
                            {isIncorrect && (
                                <img src={incorrecto} alt="Incorrecto" className="absolute top-2 right-2 w-6 h-6" />
                            )}
                        </div>
                    );
                })}
            </div>

            {!showResults && selectedEmotion && (
                <div className="self-center mt-6">
                    <button
                        className="bg-teal-500 text-white px-4 py-2 rounded-md shadow hover:bg-teal-600 transition"
                        onClick={handleVerify}
                    >
                        Verificar respuesta
                    </button>
                </div>
            )}

            {showResults && (
                <div className="self-center mt-6">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
                        onClick={handleContinue}
                    >
                        Continuar
                    </button>
                </div>
            )}

            {showSkipModal && (
                <ConfirmationModal
                    onConfirm={handleSkipConfirm}
                    onCancel={() => setShowSkipModal(false)}
                    advertenciaIcon={advertencia}
                />
            )}
        </div>
    );
}

export default ListenConnectGame3;
