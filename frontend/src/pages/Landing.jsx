import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/react';
import { Flame, GraduationCap, BarChart2, FileText, Calendar, CheckCircle } from 'lucide-react';
import './Landing.css';

function Landing() {
    const { isSignedIn } = useAuth();

    return (
        <div className="landing">
            <nav className="landing-nav">
                <div className="landing-logo">
                    <span className="logo-icon"><Flame size={28} /></span>
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
                <div className="hero-badge"><GraduationCap size={18} /> Academic Management Reimagined</div>
                <h1 className="hero-title">
                    Your <span className="accent-text">Sickest</span> Academic Aid
                </h1>
                <p className="hero-subtitle">
                    Track attendance, manage assignments, monitor syllabus progress, and organize
                    notes — all in one beautifully crafted dashboard.
                </p>
                <div className="hero-actions">
                    <Link to={isSignedIn ? "/app" : "/sign-up"} className="btn btn-primary btn-lg">
                        {isSignedIn ? 'Open Dashboard' : 'Start for Free'}
                    </Link>
                </div>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon"><BarChart2 size={32} /></div>
                        <h3>Smart Dashboard</h3>
                        <p>Get alerts on low attendance, upcoming deadlines, and today's priorities at a glance.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><FileText size={32} /></div>
                        <h3>Notes & Resources</h3>
                        <p>Upload, organize, and access your study materials filtered by subject and category.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><Calendar size={32} /></div>
                        <h3>Assignment Tracker</h3>
                        <p>Never miss a deadline. Track submissions, marks, and filter by status.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon"><CheckCircle size={32} /></div>
                        <h3>Attendance Monitor</h3>
                        <p>Mark present or absent per subject and see exactly how many classes you need.</p>
                    </div>
                </div>
            </main>

            <footer className="landing-footer">
                <p>Built with</p>
                <Flame size={16} />
                <p>by Hellfire Scholar</p>
            </footer>
        </div>
    );
}

export default Landing;
