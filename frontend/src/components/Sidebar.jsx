import { NavLink } from 'react-router-dom';
import { Flame, BarChart2, FileText, BookOpen, Calendar, CheckCircle, BookMarked, Settings } from 'lucide-react';
import './Sidebar.css';

const navItems = [
    { path: '/app', label: 'Dashboard', icon: BarChart2, end: true },
    { path: '/app/notes', label: 'Notes & Resources', icon: FileText },
    { path: '/app/syllabus', label: 'Syllabus', icon: BookOpen },
    { path: '/app/assignments', label: 'Assignments', icon: Calendar },
    { path: '/app/attendance', label: 'Attendance', icon: CheckCircle },
    { path: '/app/subjects', label: 'Subjects', icon: BookMarked },
    { path: '/app/settings', label: 'Settings', icon: Settings },
];

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <span className="sidebar-logo-icon"><Flame size={24} /></span>
                <span className="sidebar-logo-text">Hellfire Scholar</span>
            </div>
            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                            }
                        >
                            <span className="sidebar-link-icon"><IconComponent size={20} /></span>
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;
