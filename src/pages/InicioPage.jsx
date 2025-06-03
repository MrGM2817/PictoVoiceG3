import { useNavigate } from 'react-router-dom'
import pictoVoice from '../assets/PictoVoice.svg';

export default function InicioPage() {
    const navigate = useNavigate()

    /*Cookies Saludo*/
    const handleStart = () => {
        const yaVino = localStorage.getItem('yaVino');

        if (!yaVino) {
            localStorage.setItem('mensajeBienvenida', '¡Bienvenido, nuevo usuario!');
            localStorage.setItem('yaVino', 'true');
        } else {
            localStorage.setItem('mensajeBienvenida', '¡Hola de nuevo!');
        }

        navigate('/home');
    };
    return (
        <div className="flex items-center justify-center h-screen bg-primary">
            <div className="text-center">
                <img src={pictoVoice} alt="PictoVoice" className="mx-auto mb-44" />
                <button
                    onClick={handleStart}
                    className="bg-white text-indigo-900 px-20 py-3 rounded-md font-semibold shadow-md
                                hover:bg-indigo-900 hover:text-white active:bg-indigo-800 active:text-white
                                    transition-colors duration-500 ease-out "
                >
                    EMPEZAR
                </button>

            </div>
        </div>
    );
}
