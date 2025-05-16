import { useState } from 'react';
import { Link } from 'react-router-dom';

import tristeFoto from '../assets/triste.svg';
import felizFoto from '../assets/feliz.svg';
import molestoFoto from '../assets/molesto.svg';
import volverAtras from '../assets/retroceder.svg';

import incorrecto from '../assets/incorrecto.svg';
import correcto from '../assets/correcto.svg';

import advertencia from '../assets/advertencia.svg';

function AssociateGame2() {
    const [pairs] = useState([
        { word: 'Feliz', image: felizFoto, color: '#D1C7A8' },
        { word: 'Molesto', image: molestoFoto, color: '#A7C6ED' },
        { word: 'Triste', image: tristeFoto, color: '#F1B6B6' },
    ]);

    const [selectedWord, setSelectedWord] = useState(null);
    const [imageSelections, setImageSelections] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [showSkipModal, setShowSkipModal] = useState(false);

    const handleWordClick = (word) => {
        if (!showResults) setSelectedWord(word);
    };

    const handleImageClick = (imageWord) => {
        if (selectedWord && !showResults) {
            setImageSelections((prev) => {
                const updated = { ...prev };
                for (const key in updated) {
                    if (updated[key] === selectedWord) {
                        delete updated[key];
                    }
                }
                updated[imageWord] = selectedWord;
                return updated;
            });
        }
    };

    const getColorByWord = (word) => {
        return pairs.find((p) => p.word === word)?.color || 'white';
    };

    const usedWords = new Set(Object.values(imageSelections));
    const allMatched = Object.keys(imageSelections).length === pairs.length;

    const correctAssociations = {
        'Feliz': 'Feliz',
        'Molesto': 'Molesto',
        'Triste': 'Triste',
    };

    const isCorrect = (imageWord) => {
        return imageSelections[imageWord] === correctAssociations[imageWord];
    };

    // Función para confirmar skip
    const confirmSkip = () => {
        setImageSelections(correctAssociations);
        setShowSkipModal(false);
        setShowResults(true);
    };

    return (
        <div className="min-h-screen bg-primary p-4 flex flex-col relative">
            {/* Contenedor botones superiores */}
            <div className="flex justify-between items-center mb-2">
                {/* Botón de volver */}
                <Link to="/games" className="flex items-center gap-2 text-lg text-gray-800 hover:underline">
                    <img src={volverAtras} alt="Volver" className="w-5 h-5" />
                    Volver a Juegos
                </Link>

                {/* Botón SKIP con cuadro blanco y borde redondeado */}
                <button
                    className="bg-white text-indigo-900 font-semibold px-3 py-1 rounded-md shadow hover:bg-gray-100 transition"
                    onClick={() => setShowSkipModal(true)}
                >
                    Skip
                </button>
            </div>

            {/* Título */}
            <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2 text-center max-w-xl w-full self-center">
                Asocia las palabras con las imágenes
            </h1>

            {/* Instrucciones */}
            <p className="text-gray-700 mb-4 max-w-xl w-full text-center self-center">
                Toca una palabra y luego la imagen que crees que corresponde. Se pintarán del mismo color.
            </p>

            {/* Botón de verificar */}
            {allMatched && !showResults && (
                <div className="self-center mb-6">
                    <button
                        className="bg-teal-400 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-500 transition"
                        onClick={() => setShowResults(true)}
                    >
                        Verificar respuestas
                    </button>
                </div>
            )}

            {/* Botón Continuar aparece al mostrar resultados */}
            {showResults && (
                <div className="self-center mt-4">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
                        onClick={() => {
                            // Aquí acción futura para continuar
                        }}
                    >
                        Continuar
                    </button>
                </div>
            )}

            {/* Tarjetas */}
            <div className="flex flex-grow justify-center items-center">
                <div className="grid grid-cols-2 gap-6 max-w-xl w-full">
                    {/* Palabras */}
                    <div className="flex flex-col space-y-4 items-center">
                        {pairs.map((pair) => {
                            const isUsed = usedWords.has(pair.word);
                            const isSelected = selectedWord === pair.word;

                            let backgroundColor = 'white';
                            if (showResults) {
                                if (isUsed) {
                                    const matchedImage = Object.entries(imageSelections).find(
                                        ([, w]) => w === pair.word
                                    )?.[0];
                                    const correct = correctAssociations[matchedImage] === pair.word;
                                    backgroundColor = correct ? '#F2FFEC' : '#FFF2F2';
                                }
                            } else {
                                backgroundColor = (isUsed || isSelected) ? pair.color : 'white';
                            }

                            return (
                                <div
                                    key={`${pair.word}-word`}
                                    onClick={() => handleWordClick(pair.word)}
                                    style={{ backgroundColor }}
                                    className="shadow-md rounded-lg text-center cursor-pointer w-32 h-32 flex items-center justify-center font-semibold transition-all duration-200"
                                >
                                    {pair.word}
                                </div>
                            );
                        })}
                    </div>

                    {/* Imágenes */}
                    <div className="flex flex-col space-y-4 items-center">
                        {pairs.map((pair) => {
                            const assignedWord = imageSelections[pair.word];
                            const overlayColor = assignedWord ? getColorByWord(assignedWord) : null;
                            const isMatchCorrect = isCorrect(pair.word);
                            const bgResultColor = showResults
                                ? (isMatchCorrect ? '#F2FFEC' : '#FFF2F2')
                                : 'white';

                            return (
                                <div
                                    key={`${pair.word}-image`}
                                    onClick={() => handleImageClick(pair.word)}
                                    className="relative shadow-md rounded-lg flex items-center justify-center w-32 h-32 cursor-pointer transition-all duration-200 overflow-hidden"
                                    style={{
                                        backgroundColor: bgResultColor,
                                    }}
                                >
                                    <img
                                        src={pair.image}
                                        alt={`Cara ${pair.word}`}
                                        className="w-full h-full object-contain"
                                    />
                                    {overlayColor && (
                                        <div
                                            className="absolute inset-0 rounded-lg"
                                            style={{
                                                backgroundColor: overlayColor,
                                                opacity: 0.4,
                                            }}
                                        />
                                    )}
                                    {showResults && (
                                        <img
                                            src={isMatchCorrect ? correcto : incorrecto}
                                            alt={isMatchCorrect ? 'Correcto' : 'Incorrecto'}
                                            className="absolute top-2 right-2 w-6 h-6"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modal Skip */}
            {showSkipModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-xs w-full shadow-lg text-center">
                        <h2 className="font-montserrat font-semibold text-xl mb-4 text-indigo-900 flex items-center justify-center gap-2">
                            Omitir Juego
                            <img src={advertencia} alt="Advertencia" className="w-6 h-6" />
                        </h2>

                        <p className="font-montserrat font-medium mb-6 text-red-400">
                            ¿Estás seguro de que deseas omitir el juego?
                        </p>
                        <div className="flex justify-around">
                            {/* Botón Sí */}
                            <button
                                className="font-montserrat font-medium bg-neutral-200 text-gray-800 px-6 py-2 min-w-[80px] rounded-md shadow hover:bg-gray-400 transition"
                                onClick={confirmSkip}
                            >
                                Sí
                            </button>

                            {/* Botón No */}
                            <button
                                className="font-montserrat font-medium bg-red-400 text-white px-6 py-2 min-w-[80px] rounded-md shadow hover:bg-red-600 transition"
                                onClick={() => setShowSkipModal(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AssociateGame2;
