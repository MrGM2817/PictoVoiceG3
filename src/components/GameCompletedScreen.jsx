import { useNavigate } from 'react-router-dom';

function GameCompletedScreen({ bannerImage }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-primary flex flex-col items-center p-4">
            <header className="w-full max-w-xl text-center mt-6 mb-8">
                <h2 className="text-neutral-900 font-bold text-3xl mb-2">Juego Completado</h2>
                <p className="text-gray-700 text-lg">¡Bien hecho! Continua con el buen trabajo</p>
            </header>

            <div className="flex-grow flex items-center justify-center w-full max-w-md">
                <img
                    src={bannerImage}
                    alt="Juego completado"
                    className="w-full"
                />
            </div>

            <button
                className="mt-6 mb-8 px-16 bg-teal-400 text-white py-3 rounded-md shadow hover:bg-teal-600 transition"
                onClick={() => navigate('/games')}
            >
                Continuar
            </button>
        </div>
    );
}

export default GameCompletedScreen;