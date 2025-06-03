
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { completarJuego } from '../components/completeGame.jsx';

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

import alegriaImg from '../assets/emocionado.png';
import tristeImg from '../assets/trizte.png';
import enojoImg from '../assets/enfadada.png'
import miedoImg from '../assets/miedo2.png';
import sorpresaImg from '../assets/sorpresa.png';
import calmaImg from '../assets/calma.png';
import confusoImg from '../assets/confusión.png';
import verguenzaImg from '../assets/vergüenza.png';
import desmotivadoImg from '../assets/desmotivada.png';

const audioRounds = [
    { audio: audioAlegria, correctEmotion: 'Alegría', image: alegriaImg },
    { audio: audioTristeza, correctEmotion: 'Tristeza', image: tristeImg },
    { audio: audioEnojo, correctEmotion: 'Enojo', image: enojoImg },
    { audio: audioMiedo, correctEmotion: 'Miedo', image: miedoImg },
    { audio: audioSorpresa, correctEmotion: 'Sorpresa', image: sorpresaImg },
    { audio: audioCalma, correctEmotion: 'Calma', image: calmaImg },
];


function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function ListenConnectGame3() {
    const [shuffledRounds, setShuffledRounds] = useState([]);
    const [currentRound, setCurrentRound] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [showSkipModal, setShowSkipModal] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

    const audioRef = useRef(null);

    const emotionOptions = [
        { label: 'Alegría', image: alegriaImg },
        { label: 'Tristeza', image: tristeImg },
        { label: 'Enojo', image: enojoImg },
        { label: 'Miedo', image: miedoImg },
        { label: 'Sorpresa', image: sorpresaImg },
        { label: 'Calma', image: calmaImg },
        { label: 'Vergüenza', image: verguenzaImg },
        { label: 'Desprecio', image: desmotivadoImg }, // si no tienes imagen de desprecio puedes usar esta temporalmente
        { label: 'Confusión', image: confusoImg },
    ];


    useEffect(() => {
        setShuffledRounds(shuffleArray(audioRounds));
    }, []);


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
            // Aquí marcamos completado SOLO después de que el usuario termine la última ronda
            completarJuego('juego3Completado', setGameCompleted);
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

    if (shuffledRounds.length === 0) return null; // Esperar a que se mezclen los audios

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

            <p className="text-gray-600 text-center mb-4">
                Ronda {currentRound + 1} de {shuffledRounds.length}
            </p>

            <p className="text-gray-700 mb-6 max-w-xl w-full text-center self-center">
                Selecciona la tarjeta con la emoción expresada en el audio
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-3xl w-full mx-auto">
                <div></div>
                <div
                    className="bg-white flex flex-col items-center justify-center py-6 px-4 rounded-xl shadow-md hover:shadow-lg transition relative animate-pulse"
                    onClick={handlePlayAudio}
                    style={{ cursor: isPlaying ? 'not-allowed' : 'pointer', opacity: isPlaying ? 0.5 : 1 }}
                >
                    <img
                        src={audioIcon}
                        alt="Reproducir audio"
                        className="w-16 h-16 mb-2 transition-transform duration-300 hover:scale-110"
                    />
                    <p className="text-indigo-800 font-semibold text-sm text-center">Presioname para escuchar</p>
                    <audio ref={audioRef} src={currentAudio.audio} />
                </div>

                <div></div>

                {emotionOptions.map(({ label, image }) => {
                    const isCorrect = showResults && label === currentAudio.correctEmotion;
                    const isIncorrect = showResults && label === selectedEmotion && label !== currentAudio.correctEmotion;

                    return (
                        <div
                            key={label}
                            className={`bg-white text-center py-4 rounded-xl shadow-md cursor-pointer relative ${
                                selectedEmotion === label ? 'ring-2 ring-blue-400' : ''
                            } hover:bg-gray-100 transition`}
                            onClick={() => !showResults && setSelectedEmotion(label)}
                        >
                            <img src={image} alt={label} className="w-20 h-20 mx-auto mb-2 object-contain" />
                            <span className="text-gray-800 font-semibold">{label}</span>
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
                        className="bg-white text-indigo-900 px-6 py-2 rounded-md font-semibold shadow-md hover:bg-indigo-900 hover:text-white active:bg-indigo-800 active:text-white transition-colors duration-500 ease-out"
                        onClick={handleVerify}
                    >
                        Verificar respuesta
                    </button>
                </div>
            )}

            {showResults && (
                <div className="self-center mt-6">
                    <button
                        className="bg-white text-indigo-900 px-6 py-2 rounded-md font-semibold shadow-md hover:bg-indigo-900 hover:text-white active:bg-indigo-800 active:text-white transition-colors duration-500 ease-out"
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
