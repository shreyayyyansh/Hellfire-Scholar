import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/react';
import './Landing.css';

function Landing() {
    const { isSignedIn } = useAuth();

    return (
        <div className="landing">
            <div className="landing-glow landing-glow-1"></div>
            <div className="landing-glow landing-glow-2"></div>

            <nav className="landing-nav">
                <div className="landing-logo">
                    <span className="logo-icon">🔥</span>
                    <span>Hellfire Scholar</span>
                </div>
                <div className="landing-nav-links">
                    {isSignedIn ? (
                        <Link to="/app" className="btn btn-primary">Go to Dashboard</Link>
                    ) : (
                        <>
                            <Link to="/sign-in" className="btn btn-ghost">Sign In</Link>
                            <Link to="/sign-up" className="btn btn-primary">Get Started</Link>
                        </>
                    )}
                </div>
            </nav>

            <main className="landing-hero">
                <div className="hero-badge">🎓 Academic Management Reimagined</div>
                <h1 className="hero-title">
                    Your <span className="gradient-text">Sickest</span> Academic Aid
                </h1>
                <p className="hero-subtitle">
                    Track attendance, manage assignments, monitor syllabus progress, and organize
                    notes — all in one dark-themed, beautifully crafted dashboard.
                </p>
                <div className="hero-actions">
                    <Link to={isSignedIn ? "/app" : "/sign-up"} className="btn btn-primary btn-lg">
                        {isSignedIn ? 'Open Dashboard' : 'Start for Free'}
                    </Link>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📊</div>
                        <h3>Smart Dashboard</h3>
                        <p>Get alerts on low attendance, upcoming deadlines, and today's priorities at a glance.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>Notes & Resources</h3>
                        <p>Upload, organize, and access your study materials filtered by subject and category.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📅</div>
                        <h3>Assignment Tracker</h3>
                        <p>Never miss a deadline. Track submissions, marks, and filter by status.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">✅</div>
                        <h3>Attendance Monitor</h3>
                        <p>Mark present or absent per subject and see exactly how many classes you need.</p>
                    </div>
                </div>
            </main>

            <footer className="landing-footer">
                <p>Built with 🔥 by Hellfire Scholar</p>
            </footer>
        </div>
    );
}

export default Landing;
