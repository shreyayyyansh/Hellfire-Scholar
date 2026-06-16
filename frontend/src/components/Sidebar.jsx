import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
    { path: '/app', label: 'Dashboard', icon: '📊', end: true },
    { path: '/app/notes', label: 'Notes & Resources', icon: '📝' },
    { path: '/app/syllabus', label: 'Syllabus', icon: '📚' },
    { path: '/app/assignments', label: 'Assignments', icon: '📅' },
    { path: '/app/attendance', label: 'Attendance', icon: '✅' },
];

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <span className="sidebar-logo-icon">🔥</span>
                <span className="sidebar-logo-text">Hellfire Scholar</span>
            </div>
            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                        }
                    >
                        <span className="sidebar-link-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
