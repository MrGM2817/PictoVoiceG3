function ConfirmationModal({ onConfirm, onCancel, advertenciaIcon }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-xs w-full shadow-lg text-center">
                <h2 className="font-montserrat font-semibold text-xl mb-4 text-indigo-900 flex items-center justify-center gap-2">
                    Omitir Juego
                    <img src={advertenciaIcon} alt="Advertencia" className="w-6 h-6" />
                </h2>

                <p className="font-montserrat font-medium mb-6 text-red-400">
                    ¿Estás seguro de que deseas omitir el juego?
                </p>
                <div className="flex justify-around">
                    <button
                        className="font-montserrat font-medium bg-neutral-200 text-gray-800 px-6 py-2 min-w-[80px] rounded-md shadow hover:bg-gray-400 transition"
                        onClick={onConfirm}
                    >
                        Sí
                    </button>
                    <button
                        className="font-montserrat font-medium bg-red-400 text-white px-6 py-2 min-w-[80px] rounded-md shadow hover:bg-red-600 transition"
                        onClick={onCancel}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;