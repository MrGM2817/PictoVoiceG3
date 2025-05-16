import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import tristeFoto from '../assets/triste.svg';
import felizFoto from '../assets/feliz.svg';
import molestoFoto from '../assets/molesto.svg';

function AssociateGame2() {
    const [pairs] = useState([
        { word: 'Feliz', image: felizFoto },
        { word: 'Molesto', image: molestoFoto },
        { word: 'Triste', image: tristeFoto },
    ]);
    const [, setCurrentPositions] = useState({});
    const [justifyCards, setJustifyCards] = useState('justify-start');

    useEffect(() => {
        const updateJustify = () => {
            if (window.innerHeight > 700) {
                setJustifyCards('justify-center');
            } else {
                setJustifyCards('justify-start');
            }
        };

        updateJustify();
        window.addEventListener('resize', updateJustify);
        return () => window.removeEventListener('resize', updateJustify);
    }, []);

    const handleDragStart = (event, word) => {
        event.dataTransfer.setData("text/plain", word);
        setCurrentPositions(prev => ({ ...prev, [word]: { startX: event.clientX, startY: event.clientY } }));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event, targetWord) => {
        const draggedWord = event.dataTransfer.getData("text/plain");
        alert(`Has intentado asociar "${draggedWord}" con "${targetWord}"`);
    };

    return (
        <div className="min-h-screen bg-primary p-4 flex flex-col">
            {/* Header fijo arriba */}
            <Link to="/games" className="self-start text-lg text-gray-800 hover:underline">
                ← Volver a Juegos
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2 text-center max-w-xl w-full">
                Asocia las palabras con las imágenes
            </h1>
            <p className="text-gray-700 mb-4 max-w-xl w-full text-center">
                Toca o arrastra cada palabra a la imagen que le corresponde.
            </p>

            {/* Área de tarjetas que ocupa el resto del espacio */}
            <div className={`flex flex-grow ${justifyCards} items-center`}>
                <div className="grid grid-cols-2 gap-6 max-w-xl w-full">
                    {/* Columna de Palabras */}
                    <div className="flex flex-col space-y-4 items-center">
                        {pairs.map((pair) => (
                            <div
                                key={`${pair.word}-word`}
                                draggable
                                onDragStart={(event) => handleDragStart(event, pair.word)}
                                className="bg-white shadow-md rounded-lg text-center cursor-grab w-32 h-32 flex items-center justify-center font-semibold"
                            >
                                {pair.word}
                            </div>
                        ))}
                    </div>

                    {/* Columna de Imágenes */}
                    <div className="flex flex-col space-y-4 items-center">
                        {pairs.map((pair) => (
                            <div
                                key={`${pair.word}-image`}
                                onDragOver={handleDragOver}
                                onDrop={(event) => handleDrop(event, pair.word)}
                                className="bg-white shadow-md rounded-lg flex items-center justify-center w-32 h-32"
                            >
                                <img src={pair.image} alt={`Cara ${pair.word}`} className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssociateGame2;
