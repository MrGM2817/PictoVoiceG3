import { useState } from 'react';
import { Link } from 'react-router-dom';
import { completarJuego } from '../components/completeGame.jsx';

import volverAtras from '../assets/retroceder.svg';
import correrSVG from '../assets/correr.svg';
import caminarSVG from '../assets/caminar.svg';
import volarSVG from '../assets/volar.svg';
import nadarSVG from '../assets/nadar.svg';

import letraC from '../assets/letraC.svg';
import letraR from '../assets/letraR.svg';
import letraE from '../assets/letraE.svg';
import letraO from '../assets/letraO.svg';

import correcto from '../assets/correcto.svg';
import incorrecto from '../assets/incorrecto.svg';

import ConfirmationModal from '../components/ConfirmationModal';
import advertencia from '../assets/advertencia.svg';

import GameCompletedScreen from '../components/GameCompletedScreen';
import bannerJuegoCompletado3 from "../assets/bannerJuegoCompletado3.svg";

function DragFormGame1() {
    const [round, setRound] = useState(1);
    const [gameCompleted, setGameCompleted] = useState(false);


    // ---------- RONDA 1 ----------
    const [showSkipModal, setShowSkipModal] = useState(false);
    const [slots, setSlots] = useState([null, null, null, null, null, null]);
    const [letraSeleccionada, setLetraSeleccionada] = useState(null);
    const [letrasDisponibles, setLetrasDisponibles] = useState([
        { id: 'C1', letra: 'C', src: letraC },
        { id: 'R1', letra: 'R', src: letraR },
        { id: 'E1', letra: 'E', src: letraE },
        { id: 'R2', letra: 'R', src: letraR },
        { id: 'R3', letra: 'R', src: letraR },
        { id: 'O1', letra: 'O', src: letraO },
    ]);
    const [showResults, setShowResults] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const palabraCorrecta = ['C', 'O', 'R', 'R', 'E', 'R'];

    const palabraCorrectaSVG = [
        { id: 'C', src: letraC, alt: 'C' },
        { id: 'O', src: letraO, alt: 'O' },
        { id: 'R1', src: letraR, alt: 'R' },
        { id: 'R2', src: letraR, alt: 'R' },
        { id: 'E', src: letraE, alt: 'E' },
        { id: 'R3', src: letraR, alt: 'R' },
    ];

    const handleSkipConfirm = () => {
        setShowSkipModal(false);

        if (round === 1) {
            // Poner la palabra correcta en los slots
            const respuestaCorrectaSlots = palabraCorrectaSVG.map(({ id, src, alt }) => ({
                id,
                letra: alt,
                src,
            }));
            setSlots(respuestaCorrectaSlots);
            setLetrasDisponibles([]); // Ya no quedan letras disponibles
            setIsCorrect(true);
            setShowResults(true);
        } else if (round === 2) {
            // En la ronda 2, marcar la respuesta como correcta automáticamente
            setSelectedImage('correr'); // La respuesta correcta
            setIsCorrect2(true);
            setShowResults2(true);
        }
    };


    const onDragStart = (event, id) => {
        event.dataTransfer.setData('text/plain', id);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDragOver = (event) => event.preventDefault();

    const onDrop = (event, index) => {
        event.preventDefault();
        const letraId = event.dataTransfer.getData('text/plain');
        if (!letraId) return;

        const letraObj = letrasDisponibles.find((l) => l.id === letraId);
        if (!letraObj) return;

        setSlots((prevSlots) => {
            const letraAnteriorId = prevSlots[index]?.id;
            const newSlots = [...prevSlots];
            newSlots[index] = letraObj;

            setLetrasDisponibles((prevLetras) => {
                let nuevasLetras = prevLetras.filter((l) => l.id !== letraId);
                if (letraAnteriorId) {
                    const letraPrevObj =
                        prevSlots.find((s) => s?.id === letraAnteriorId) ||
                        letrasDisponibles.find((l) => l.id === letraAnteriorId);
                    if (letraPrevObj) nuevasLetras.push(letraPrevObj);
                }
                return nuevasLetras;
            });

            return newSlots;
        });
    };

    const removeFromSlot = (index) => {
        setSlots((prevSlots) => {
            const letraObj = prevSlots[index];
            if (!letraObj) return prevSlots;

            setLetrasDisponibles((prev) => {
                if (!prev.some((l) => l.id === letraObj.id)) {
                    return [...prev, letraObj];
                }
                return prev;
            });

            const newSlots = [...prevSlots];
            newSlots[index] = null;
            return newSlots;
        });
    };

    const handleVerify = () => {
        const respuesta = slots.map((s) => (s ? s.letra : ''));
        const correcta = respuesta.join('') === palabraCorrecta.join('');
        setIsCorrect(correcta);
        setShowResults(true);
    };

    const handleContinue = () => {
        setShowResults(false);
        setIsCorrect(null);
        setSlots([null, null, null, null, null, null]);
        setLetrasDisponibles([
            { id: 'C1', letra: 'C', src: letraC },
            { id: 'R1', letra: 'R', src: letraR },
            { id: 'E1', letra: 'E', src: letraE },
            { id: 'R2', letra: 'R', src: letraR },
            { id: 'R3', letra: 'R', src: letraR },
            { id: 'O1', letra: 'O', src: letraO },
        ]);
        setRound(2);
    };

    // ---------- RONDA 2 ----------
    const [selectedImage, setSelectedImage] = useState(null);
    const [showResults2, setShowResults2] = useState(false);
    const [isCorrect2, setIsCorrect2] = useState(null);

    const opciones = [
        { id: 'correr', src: correrSVG, alt: 'Correr' },
        { id: 'caminar', src: caminarSVG, alt: 'Caminar' },
        { id: 'volar', src: volarSVG, alt: 'Volar' },
        { id: 'nadar', src: nadarSVG, alt: 'Nadar' },
    ];

    const handleVerify2 = () => {
        if (!selectedImage) return;
        const correcta = selectedImage === 'correr';
        setIsCorrect2(correcta);
        setShowResults2(true);
    };

    const handleRetry2 = () => {
        setSelectedImage(null);
        setShowResults2(false);
        setIsCorrect2(null);
    };



    if (gameCompleted) return <GameCompletedScreen bannerImage={bannerJuegoCompletado3} />;

    return (
        <div className="min-h-screen bg-primary p-4 flex flex-col relative">
            {/* Botón Skip siempre visible */}
            <button
                className="absolute top-4 right-4 bg-white text-indigo-900 font-semibold px-3 py-1 rounded-md shadow hover:bg-gray-100 transition z-50"
                onClick={() => setShowSkipModal(true)}
            >
                Skip
            </button>

            {/* Link Volver a Juegos y mensaje de ronda, extraído para no repetir */}
            <div className="flex justify-between items-center mb-2">
                <Link
                    to="/games"
                    className="flex items-center gap-2 text-lg text-gray-800 hover:underline"
                >
                    <img src={volverAtras} alt="Volver" className="w-5 h-5" />
                    Volver a Juegos
                </Link>
            </div>

            <p className="text-gray-600 text-center mb-4">
                Ronda {round} de 2
            </p>

            {round === 1 && (
                <>
                    <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2 text-center max-w-xl w-full self-center">
                        Averiguar la imagen
                    </h1>

                    <p className="text-gray-700 mb-6 max-w-xl w-full text-center self-center">
                        Arrastra las letras en el orden correcto para formar la palabra
                    </p>

                    <div className="flex justify-center mb-8">
                        <img
                            src={correrSVG}
                            alt="Imagen para el juego"
                            className="w-40 h-40"
                        />
                    </div>

                    <div className="flex justify-center gap-4 mb-8">
                        {slots.map((letraObj, index) => (
                            <div
                                key={index}
                                onDrop={(event) => onDrop(event, index)}
                                onDragOver={onDragOver}
                                className="w-16 h-20 rounded-md flex items-center justify-center cursor-pointer focus:outline-none"
                                style={{ backgroundColor: '#6c8c62' }}
                                onClick={() => {
                                    if (letraSeleccionada && !slots[index]) {
                                        setSlots((prev) => {
                                            const newSlots = [...prev];
                                            newSlots[index] = letraSeleccionada;
                                            return newSlots;
                                        });
                                        setLetrasDisponibles((prev) =>
                                            prev.filter((l) => l.id !== letraSeleccionada.id)
                                        );
                                        setLetraSeleccionada(null);
                                    } else if (slots[index]) {
                                        removeFromSlot(index);
                                    }
                                }}
                                title={
                                    letraObj
                                        ? 'Haz click para quitar'
                                        : 'Toca o arrastra una letra aquí'
                                }
                            >
                                {letraObj ? (
                                    <img
                                        src={letraObj.src}
                                        alt={`Letra ${letraObj.letra}`}
                                        className="w-12 h-16"
                                        draggable={false}
                                    />
                                ) : (
                                    <span className="font-bold text-3xl text-white">_</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 justify-center max-w-xs mx-auto">
                        {letrasDisponibles.length === 0 && (
                            <div className="col-span-3 text-center text-gray-600 w-full">
                                No quedan letras disponibles
                            </div>
                        )}

                        {letrasDisponibles.map(({ id, letra, src }) => (
                            <img
                                key={id}
                                src={src}
                                alt={`Letra ${letra}`}
                                className={`w-12 h-16 mx-auto cursor-pointer rounded-md ${
                                    letraSeleccionada?.id === id ? 'ring-4 ring-yellow-400' : ''
                                }`}
                                draggable
                                onDragStart={(e) => onDragStart(e, id)}
                                onClick={() =>
                                    setLetraSeleccionada((prev) =>
                                        prev?.id === id ? null : { id, letra, src }
                                    )
                                }
                            />
                        ))}
                    </div>

                    {!showResults && slots.every((s) => s !== null) && (
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
                        <div className="self-center mt-6 flex flex-col items-center gap-2">
                            {isCorrect ? (
                                <>
                                    <img src={correcto} alt="Correcto" className="w-12 h-12" />
                                    <p className="text-green-600 font-bold">¡Respuesta correcta!</p>
                                    <button
                                        className="mt-2 px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
                                        onClick={handleContinue}
                                    >
                                        Continuar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <img src={incorrecto} alt="Incorrecto" className="w-12 h-12" />
                                    <p className="text-red-600 font-bold">
                                        Respuesta incorrecta, intenta de nuevo.
                                    </p>
                                    <button
                                        className="mt-2 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
                                        onClick={() => {
                                            setShowResults(false);
                                            setIsCorrect(null);
                                            setSlots([null, null, null, null, null, null]);
                                            setLetrasDisponibles([
                                                { id: 'C1', letra: 'C', src: letraC },
                                                { id: 'R1', letra: 'R', src: letraR },
                                                { id: 'E1', letra: 'E', src: letraE },
                                                { id: 'R2', letra: 'R', src: letraR },
                                                { id: 'R3', letra: 'R', src: letraR },
                                                { id: 'O1', letra: 'O', src: letraO },
                                            ]);
                                            setLetraSeleccionada(null);
                                        }}
                                    >
                                        Volver a intentar
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </>
            )}

            {round === 2 && (
                <>
                    <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2 text-center max-w-xl w-full self-center">
                        Averiguar la imagen
                    </h1>

                    <p className="text-gray-700 mb-6 max-w-xl w-full text-center self-center">
                        Selecciona la imagen que se corresponda con lo escrito
                    </p>

                    {/* Mostrar palabra formada con SVGs */}
                    <div className="flex justify-center mb-8 gap-2 select-none">
                        {palabraCorrectaSVG.map(({ id, src, alt }) => (
                            <img
                                key={id}
                                src={src}
                                alt={alt}
                                className="w-10 h-14"
                                draggable={false}
                            />
                        ))}
                    </div>

                    {/* Opciones de imágenes */}
                    <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                        {opciones.map(({ id, src, alt }) => (
                            <div
                                key={id}
                                className={`border-4 rounded-md cursor-pointer p-2 transition ${
                                    selectedImage === id
                                        ? 'border-green-600 shadow-lg'
                                        : 'border-transparent hover:border-gray-400'
                                }`}
                                onClick={() => setSelectedImage(id)}
                            >
                                <img src={src} alt={alt} className="w-full h-auto" />
                            </div>
                        ))}
                    </div>

                    {!showResults2 && selectedImage && (
                        <div className="self-center mt-6">
                            <button
                                className="bg-teal-500 text-white px-4 py-2 rounded-md shadow hover:bg-teal-600 transition"
                                onClick={handleVerify2}
                            >
                                Verificar respuesta
                            </button>
                        </div>
                    )}


                    {showResults2 && (
                        <div className="self-center mt-6 flex flex-col items-center gap-2">
                            {isCorrect2 ? (
                                <>
                                    <img src={correcto} alt="Correcto" className="w-12 h-12" />
                                    <p className="text-green-600 font-bold">¡Respuesta correcta!</p>
                                    <button
                                        className="mt-2 px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
                                        onClick={() => completarJuego('juego1Completado', setGameCompleted)}
                                    >
                                        Continuar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <img src={incorrecto} alt="Incorrecto" className="w-12 h-12" />
                                    <p className="text-red-600 font-bold">
                                        Respuesta incorrecta, intenta de nuevo.
                                    </p>
                                    <button
                                        className="mt-2 px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition"
                                        onClick={handleRetry2}
                                    >
                                        Volver a intentar
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </>
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

export default DragFormGame1;