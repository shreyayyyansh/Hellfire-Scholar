import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi.js';
import { CheckCircle, Check, X, AlertTriangle } from 'lucide-react';
import ProgressBar from '../components/ProgressBar.jsx';

function Attendance() {
    const { apiFetch } = useApi();
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAttendance();
    }, []);

    async function fetchAttendance() {
        try {
            const data = await apiFetch('/api/attendance');
            setAttendance(data.attendance || []);
        } catch (err) {
            console.error('Failed to load attendance:', err);
        } finally {
            setLoading(false);
        }
    }

    async function markAttendance(subject, status) {
        try {
            await apiFetch('/api/attendance/mark', {
                method: 'POST',
                body: JSON.stringify({ subject, status }),
            });
            fetchAttendance();
        } catch (err) {
            alert('Failed to mark attendance: ' + err.message);
        }
    }

    function calculateNeeded(attended, total, required) {
        const current = (attended / total) * 100;
        if (current >= required) return 0;
        return Math.ceil((required * total - 100 * attended) / (100 - required));
    }

    if (loading) return <div className="page-loading">Loading attendance...</div>;

    return (
        <div>
            <h2 className="page-title">Attendance Tracker</h2>

            {attendance.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-icon"><CheckCircle size={48} /></p>
                    <p>No subjects configured</p>
                    <p className="empty-sub">Set up your subjects in your profile first</p>
                </div>
            ) : (
                <div className="card-list">
                    {attendance.map((att) => {
                        const pct = att.total > 0 ? ((att.attended / att.total) * 100).toFixed(1) : '--';
                        const isShort = att.total > 0 && parseFloat(pct) < att.required;
                        const needed = att.total > 0 ? calculateNeeded(att.attended, att.total, att.required) : 0;

                        return (
                            <div key={att.subject} className="card attendance-card">
                                <div className="card-top">
                                    <h3 className="card-title">{att.subject}</h3>
                                    <div className="attendance-btns">
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => markAttendance(att.subject, 'present')}
                                        >
                                            <Check size={14} /> Present
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => markAttendance(att.subject, 'absent')}
                                        >
                                            <X size={14} /> Absent
                                        </button>
                                    </div>
                                </div>

                                <div className="attendance-stats">
                                    <div>
                                        <span className="card-sub">{att.attended} / {att.total} classes attended</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div
                                            className="attendance-pct"
                                            style={{ color: isShort ? 'var(--color-destructive)' : att.total > 0 ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
                                        >
                                            {pct}{att.total > 0 ? '%' : ''}
                                        </div>
                                        <span className="card-sub">Required: {att.required}%</span>
                                    </div>
                                </div>

                                {att.total > 0 && (
                                    <ProgressBar
                                        value={parseFloat(pct)}
                                        color={isShort ? 'var(--color-destructive)' : 'var(--color-accent)'}
                                    />
                                )}

                                {isShort && (
                                    <div className="attendance-alert">
                                        <AlertTriangle size={14} /> Attend {needed} more class{needed === 1 ? '' : 'es'} to meet minimum requirement
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Attendance;
