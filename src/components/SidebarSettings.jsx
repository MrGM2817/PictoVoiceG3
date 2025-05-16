import { useNavigate } from 'react-router-dom';

export default function SidebarSettings({ onClose }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="fixed inset-0 bg-black opacity-30 z-40" onClick={onClose} />
            <div className="fixed top-0 right-0 w-64 h-full bg-primary shadow-lg z-50 p-4 transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Configuración</h2>
                    <button onClick={onClose} className="text-gray-600 text-xl font-bold">✕</button>
                </div>
                <ul className="space-y-4">
                    <li className="text-gray-700">Cambiar idioma</li>
                    <li className="text-red-600 cursor-pointer" onClick={() => navigate('/')}>Salir</li>
                </ul>
            </div>
        </>
    );
}
