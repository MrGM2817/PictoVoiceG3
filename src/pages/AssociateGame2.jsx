import { useState } from 'react';
import { Link } from 'react-router-dom';

import WordCard from '../components/WordCard';
import ImageCard from '../components/ImageCard';
import ConfirmationModal from '../components/ConfirmationModal';
import GameCompletedScreen from '../components/GameCompletedScreen';

import tristeFoto from '../assets/triste.svg';
import felizFoto from '../assets/feliz.svg';
import molestoFoto from '../assets/molesto.svg';
import volverAtras from '../assets/retroceder.svg';
import incorrecto from '../assets/incorrecto.svg';
import correcto from '../assets/correcto.svg';
import advertencia from '../assets/advertencia.svg';
import bannerJuegoCompletado2 from '../assets/bannerJuegoCompletado2.svg';

function AssociateGame2() {
    const [pairs] = useState([
        { word: 'Feliz', image: felizFoto, color: '#D1C7A8' },
        { word: 'Molesto', image: molestoFoto, color: '#A7C6ED' },
        { word: 'Triste', image: tristeFoto, color: '#F1B6B6' },
    ]);

    const [selectedWord, setSelectedWord] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // estado para imagen seleccionada momentáneamente
    const [imageSelections, setImageSelections] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [showSkipModal, setShowSkipModal] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

    const correctAssociations = {
        'Feliz': 'Feliz',
        'Molesto': 'Molesto',
        'Triste': 'Triste',
    };

    const handleWordClick = (word) => {
        if (!showResults && !gameCompleted) setSelectedWord(word);
    };

    const handleImageClick = (imageWord) => {
        if (selectedWord && !showResults && !gameCompleted) {
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

            // Marca la imagen como seleccionada momentáneamente
            setSelectedImage(imageWord);

            // Limpia la selección después de 300ms para que el borde no quede fijo
            setTimeout(() => setSelectedImage(null), 300);
        }
    };

    const getColorByWord = (word) => pairs.find((p) => p.word === word)?.color || 'white';
    const usedWords = new Set(Object.values(imageSelections));
    const allMatched = Object.keys(imageSelections).length === pairs.length;

    const isCorrect = (imageWord) => imageSelections[imageWord] === correctAssociations[imageWord];

    const confirmSkip = () => {
        setImageSelections(correctAssociations);
        setShowSkipModal(false);
        setShowResults(true);
    };

    if (gameCompleted) return <GameCompletedScreen bannerImage={bannerJuegoCompletado2} />;

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
                Asocia las palabras con las imágenes
            </h1>
            <p className="text-gray-700 mb-4 max-w-xl w-full text-center self-center">
                Toca una palabra y luego la imagen que crees que corresponde. Se pintarán del mismo color.
            </p>

            <div className="flex flex-grow justify-center items-center">
                <div className="grid grid-cols-2 gap-6 max-w-xl w-full">
                    {/* Palabras */}
                    <div className="flex flex-col space-y-4 items-center">
                        {pairs.map((pair) => {
                            const matchedImage = Object.entries(imageSelections).find(([, w]) => w === pair.word)?.[0];
                            return (
                                <WordCard
                                    key={`${pair.word}-word`}
                                    word={pair.word}
                                    isUsed={usedWords.has(pair.word)}
                                    isSelected={selectedWord === pair.word}
                                    showResults={showResults}
                                    matchedImage={matchedImage}
                                    correctAssociations={correctAssociations}
                                    imageSelections={imageSelections}
                                    color={pair.color}
                                    onClick={handleWordClick}
                                />
                            );
                        })}
                    </div>

                    {/* Imágenes */}
                    <div className="flex flex-col space-y-4 items-center">
                        {pairs.map((pair) => (
                            <ImageCard
                                key={`${pair.word}-image`}
                                word={pair.word}
                                image={pair.image}
                                assignedWord={imageSelections[pair.word]}
                                overlayColor={getColorByWord(imageSelections[pair.word])}
                                showResults={showResults}
                                isCorrect={isCorrect(pair.word)}
                                onClick={handleImageClick}
                                correctoIcon={correcto}
                                incorrectoIcon={incorrecto}
                                isSelected={selectedImage === pair.word} // Aquí pasamos si la imagen está seleccionada
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Botones debajo de las tarjetas */}
            {allMatched && !showResults && (
                <div className="self-center my-6">
                    <button
                        className="bg-teal-400 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-500 transition"
                        onClick={() => setShowResults(true)}
                    >
                        Verificar respuestas
                    </button>
                </div>
            )}

            {showResults && (
                <div className="self-center my-6">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 transition"
                        onClick={() => setGameCompleted(true)}
                    >
                        Continuar
                    </button>
                </div>
            )}

            {showSkipModal && (
                <ConfirmationModal
                    onConfirm={confirmSkip}
                    onCancel={() => setShowSkipModal(false)}
                    advertenciaIcon={advertencia}
                />
            )}
        </div>
    );
}

export default AssociateGame2;
