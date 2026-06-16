import { useAuth } from '@clerk/react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import './ProtectedLayout.css';

function ProtectedLayout() {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    return (
        <div className="app-shell">
            <Sidebar />
            <div className="app-main">
                <Header />
                <main className="app-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default ProtectedLayout;
