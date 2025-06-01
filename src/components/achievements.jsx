export function verificarLogros() {
    const juego1 = localStorage.getItem('juego1Completado') === 'true';
    const juego2 = localStorage.getItem('juego2Completado') === 'true';
    const juego3 = localStorage.getItem('juego3Completado') === 'true';

    const logro1YaDado = localStorage.getItem('logro1Completado') === 'true';

    if (juego1 && juego2 && juego3 && !logro1YaDado) {
        // Dar logro 1 por completar los 3 juegos
        const currentAchievements = Number(localStorage.getItem('completedAchievements')) || 0;
        localStorage.setItem('completedAchievements', (currentAchievements + 1).toString());
        localStorage.setItem('logro1Completado', 'true');
    }
}
