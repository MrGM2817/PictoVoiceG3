import { useNavigate } from 'react-router-dom'
import pictoVoice from '../assets/PictoVoice.svg';

export default function InicioPage() {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center h-screen bg-primary">
            <div className="text-center">
                {/* SVG en lugar del texto */}
                <img src={pictoVoice} alt="PictoVoice" className="mx-auto mb-44" />

                <button
                    onClick={() => navigate('/home')}
                    className="bg-white text-indigo-900 px-20 py-3 rounded-md font-semibold"
                >
                    EMPEZAR
                </button>
            </div>
        </div>
    )
}
