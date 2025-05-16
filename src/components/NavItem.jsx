import { Link } from 'react-router-dom';

export default function NavItem({ icon, label, to = "#", active }) {
    return (
        <Link to={to} className={`flex flex-col items-center text-sm ${active ? 'text-indigo-900 font-bold' : 'text-gray-800'}`}>
            <img src={icon} alt={label} className="w-6 h-6 mb-1" />
            {label}
        </Link>
    );
}
