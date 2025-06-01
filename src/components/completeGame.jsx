import { verificarLogros } from './achievements.jsx';

export function completarJuego(claveJuego, setGameCompleted) {
    const yaCompletado = localStorage.getItem(claveJuego) === 'true';
    if (!yaCompletado) {
        localStorage.setItem(claveJuego, 'true');
        const completedGamesStr = localStorage.getItem('completedGames');
        const completedGames = completedGamesStr ? Number(completedGamesStr) : 0;
        localStorage.setItem('completedGames', (completedGames + 1).toString());

        // Verificar logros cada vez que se completa un juego
        verificarLogros();
    }
    setGameCompleted(true);
}
