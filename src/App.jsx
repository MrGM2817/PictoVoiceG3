import { Routes, Route } from 'react-router-dom'
import InicioPage from './pages/InicioPage'
import HomePage from './pages/HomePage'
import GamesPage from './pages/GamesPage'
import AssociateGame2 from './pages/AssociateGame2.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/asociar-imagenes-g2" element={<AssociateGame2 />} />
        </Routes>
    )
}

export default App
