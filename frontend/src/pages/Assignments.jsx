import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi.js';
import { Plus, Calendar, Trash2 } from 'lucide-react';
import { useSubjects } from '../contexts/AcademicContext.jsx';
import Modal from '../components/Modal.jsx';

function Assignments() {
    const { apiFetch } = useApi();
    const subjects = useSubjects();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState('all');

    // Form state
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState('pending');
    const [marks, setMarks] = useState('');

    useEffect(() => {
        fetchAssignments();
    }, []);

    async function fetchAssignments() {
        try {
            const data = await apiFetch('/api/assignments');
            setAssignments(data.assignments || []);
        } catch (err) {
            console.error('Failed to load assignments:', err);
        } finally {
            setLoading(false);
        }
    }

    async function handleAdd(e) {
        e.preventDefault();
        if (!title || !deadline) {
            alert('Please fill in title and deadline');
            return;
        }
        try {
            await apiFetch('/api/assignments', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    subject,
                    deadline,
                    status,
                    marks: status === 'graded' && marks ? parseInt(marks) : null,
                }),
            });
            setTitle('');
            setSubject('');
            setDeadline('');
            setStatus('pending');
            setMarks('');
            setModalOpen(false);
            fetchAssignments();
        } catch (err) {
            alert('Failed to add: ' + err.message);
        }
    }

    async function handleDelete(id) {
        if (!confirm('Delete this assignment?')) return;
        try {
            await apiFetch(`/api/assignments/${id}`, { method: 'DELETE' });
            setAssignments((prev) => prev.filter((a) => a._id !== id));
        } catch (err) {
            alert('Delete failed: ' + err.message);
        }
    }

    const filtered = assignments.filter((a) => {
        if (filter === 'all') return true;
        if (filter === 'pending') return a.status === 'pending';
        if (filter === 'overdue') {
            const d = new Date(a.deadline);
            d.setHours(0, 0, 0, 0);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            return d < now && a.status === 'pending';
        }
        if (filter === 'due-today') {
            const d = new Date(a.deadline).toDateString();
            return d === new Date().toDateString() && a.status !== 'graded';
        }
        return true;
    });

    const statusClass = (s) =>
        s === 'pending' ? 'badge-yellow' : s === 'submitted' ? 'badge-blue' : 'badge-green';

    if (loading) return <div className="page-loading">Loading assignments...</div>;

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">Assignments & Quizzes</h2>
                <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                    <Plus size={18} /> Add Assignment
                </button>
            </div>

            <div className="filter-bar">
                <label className="filter-label">Filter:</label>
                <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="due-today">Due Today</option>
                    <option value="overdue">Overdue</option>
                </select>
            </div>

            {filtered.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-icon"><Calendar size={48} /></p>
                    <p>No assignments yet</p>
                    <p className="empty-sub">Click "Add Assignment" to track your coursework</p>
                </div>
            ) : (
                <div className="card-list">
                    {filtered.map((a) => (
                        <div key={a._id} className="card">
                            <div className="card-top">
                                <div>
                                    <div className="card-title">{a.title}</div>
                                    <div className="card-sub">{a.subject || 'General'}</div>
                                    <div className="card-date">
                                        Deadline: {new Date(a.deadline).toLocaleDateString()}
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                                    <span className={`badge ${statusClass(a.status)}`}>
                                        {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                                    </span>
                                    {a.marks !== null && a.marks !== undefined && (
                                        <div style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{a.marks}/100</div>
                                    )}
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(a._id)}>
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Assignment">
                <form onSubmit={handleAdd}>
                    <input className="input" placeholder="Assignment Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="">Select Subject</option>
                        {subjects.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <input className="input" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                    <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="pending">Pending</option>
                        <option value="submitted">Submitted</option>
                        <option value="graded">Graded</option>
                    </select>
                    {status === 'graded' && (
                        <input className="input" type="number" placeholder="Marks" value={marks} onChange={(e) => setMarks(e.target.value)} min="0" max="100" />
                    )}
                    <button className="btn btn-primary" type="submit">Add Assignment</button>
                </form>
            </Modal>
        </div>
    );
}

export default Assignments;
