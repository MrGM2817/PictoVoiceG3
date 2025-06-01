import React from 'react';
import logroIcon from '../assets/logro.svg'; // Usa un ícono que represente un logro

function AchievementUnlockedModal({ onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center animate-bounce-in">
                <h2 className="font-montserrat font-semibold text-2xl mb-4 text-green-600 flex items-center justify-center gap-2">
                    ¡Logro desbloqueado!
                    <img src={logroIcon} alt="Logro" className="w-7 h-7" />
                </h2>

                <p className="font-montserrat text-gray-700 mb-6">
                    Completaste los 3 primeros juegos. ¡Sigue así!
                </p>

                <button
                    onClick={onClose}
                    className="font-montserrat font-medium bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-700 transition"
                >
                    Entendido
                </button>
            </div>
        </div>
    );
}

export default AchievementUnlockedModal;
