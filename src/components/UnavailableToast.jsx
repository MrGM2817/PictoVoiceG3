export default function UnavailableToast() {
    return (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2
                        bg-gradient-to-r from-indigo-200 to-purple-200
                        text-indigo-900 p-4 rounded-2xl shadow-md
                        text-center text-sm max-w-xs w-auto z-50 font-medium">
            Esta función no está disponible aún.
        </div>
    );
}
