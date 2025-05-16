import NavItem from './NavItem';
import customizeIcon from '../assets/customize.svg';
import moreIcon from '../assets/more.svg';

export default function BottomNav({ current, onUnavailableClick, icons }) {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-primary border-t border-gray-400 z-40">
            <div className="flex justify-around py-2">
                <NavItem icon={icons.home} label="Home" to="/home" active={current === 'home'} />
                <button onClick={onUnavailableClick} className="flex flex-col items-center text-gray-800 text-sm focus:outline-none">
                    <img src={customizeIcon} alt="Customize" className="w-6 h-6 mb-1" />
                    Customize
                </button>
                <NavItem icon={icons.games} label="Games" to="/games" active={current === 'games'} />
                <button onClick={onUnavailableClick} className="flex flex-col items-center text-gray-800 text-sm focus:outline-none">
                    <img src={moreIcon} alt="More" className="w-6 h-6 mb-1" />
                    More
                </button>
            </div>
        </nav>
    );
}
