import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi.js';
import ProgressBar from '../components/ProgressBar.jsx';
import './Dashboard.css';

function Dashboard() {
    const { apiFetch } = useApi();
    const [stats, setStats] = useState({
        totalNotes: 0,
        pendingTasks: 0,
        avgAttendance: '--',
        subjectCount: 0,
    });
    const [attendanceAlerts, setAttendanceAlerts] = useState([]);
    const [taskAlerts, setTaskAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            const [notesData, assignData, attData] = await Promise.all([
                apiFetch('/api/notes?limit=1000').catch(() => ({ notes: [] })),
                apiFetch('/api/assignments').catch(() => ({ assignments: [] })),
                apiFetch('/api/attendance').catch(() => ({ attendance: [] })),
            ]);

            const notes = notesData.notes || [];
            const assignments = assignData.assignments || [];
            const attendance = attData.attendance || [];

            const pending = assignments.filter((a) => a.status === 'pending');
            const subjects = new Set(attendance.map((a) => a.subject));

            // Calculate average attendance
            let avg = '--';
            if (attendance.length > 0) {
                const withData = attendance.filter((a) => a.total > 0);
                if (withData.length > 0) {
                    const sum = withData.reduce((s, a) => s + (a.attended / a.total) * 100, 0);
                    avg = (sum / withData.length).toFixed(1) + '%';
                }
            }

            setStats({
                totalNotes: notes.length,
                pendingTasks: pending.length,
                avgAttendance: avg,
                subjectCount: subjects.size,
            });

            // Attendance alerts
            const attAlerts = attendance
                .filter((a) => a.total > 0 && (a.attended / a.total) * 100 < a.required)
                .map((a) => {
                    const pct = ((a.attended / a.total) * 100).toFixed(1);
                    const needed = Math.ceil(
                        (a.required * a.total - 100 * a.attended) / (100 - a.required)
                    );
                    return {
                        subject: a.subject,
                        message: `${pct}% — Need ${needed} more class${needed === 1 ? '' : 'es'} to reach ${a.required}%`,
                        type: 'danger',
                    };
                });
            setAttendanceAlerts(attAlerts);

            // Task alerts
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const tAlerts = pending
                .map((a) => {
                    const d = new Date(a.deadline);
                    d.setHours(0, 0, 0, 0);
                    const days = Math.round((d - now) / (1000 * 60 * 60 * 24));
                    let when = '';
                    if (days < 0) when = `Overdue by ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'}`;
                    else if (days === 0) when = 'Due today';
                    else if (days === 1) when = 'Due tomorrow';
                    else when = `Due in ${days} days`;
                    return {
                        title: a.title,
                        subject: a.subject || 'General',
                        when,
                        type: days < 0 ? 'danger' : days <= 3 ? 'warning' : 'info',
                    };
                })
                .sort((a, b) => {
                    const order = { danger: 0, warning: 1, info: 2 };
                    return (order[a.type] ?? 3) - (order[b.type] ?? 3);
                });
            setTaskAlerts(tAlerts);
        } catch (err) {
            console.error('Dashboard load error:', err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="page-loading">Loading dashboard...</div>;
    }

    return (
        <div className="dashboard">
            <h2 className="page-title">Dashboard</h2>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-label">Total Notes</div>
                    <div className="stat-value" style={{ color: '#f97316' }}>{stats.totalNotes}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Pending Tasks</div>
                    <div className="stat-value" style={{ color: '#dc2626' }}>{stats.pendingTasks}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Avg Attendance</div>
                    <div className="stat-value" style={{ color: '#10b981' }}>{stats.avgAttendance}</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Subjects</div>
                    <div className="stat-value" style={{ color: '#3b82f6' }}>{stats.subjectCount}</div>
                </div>
            </div>

            <div className="alerts-section">
                <h3 className="section-subtitle">Alerts & Focus</h3>

                <div className="alerts-grid">
                    <div className="alert-group">
                        <h4 className="alert-group-title">📉 Attendance Alerts</h4>
                        {attendanceAlerts.length === 0 ? (
                            <div className="alert-chip ok">All subjects on track ✓</div>
                        ) : (
                            attendanceAlerts.map((a, i) => (
                                <div key={i} className="alert-chip danger">
                                    <strong>{a.subject}</strong>
                                    <span>{a.message}</span>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="alert-group">
                        <h4 className="alert-group-title">📋 Task Alerts</h4>
                        {taskAlerts.length === 0 ? (
                            <div className="alert-chip ok">No pending tasks ✓</div>
                        ) : (
                            taskAlerts.map((a, i) => (
                                <div key={i} className={`alert-chip ${a.type}`}>
                                    <strong>{a.title}</strong>
                                    <span>({a.subject}) • {a.when}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
