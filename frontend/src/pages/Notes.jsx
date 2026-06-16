import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi.js';
import Modal from '../components/Modal.jsx';

function Notes() {
    const { apiFetch, API_URL } = useApi();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [filter, setFilter] = useState('all');
    const [subjects, setSubjects] = useState([]);

    // Upload form state
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [category, setCategory] = useState('notes');
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchNotes();
        fetchSubjects();
    }, []);

    useEffect(() => {
        fetchNotes();
    }, [filter]);

    async function fetchSubjects() {
        try {
            const data = await apiFetch('/api/user/profile');
            setSubjects(data.user?.selectedSubjects || []);
        } catch (err) {
            console.error('Failed to load subjects:', err);
        }
    }

    async function fetchNotes() {
        try {
            const params = filter !== 'all' ? `?subject=${encodeURIComponent(filter)}` : '';
            const data = await apiFetch(`/api/notes${params}`);
            setNotes(data.notes || []);
        } catch (err) {
            console.error('Failed to fetch notes:', err);
        } finally {
            setLoading(false);
        }
    }

    async function handleUpload(e) {
        e.preventDefault();
        if (!title || !subject || !file) {
            alert('Please fill in all fields');
            return;
        }
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('subject', subject);
            formData.append('category', category);
            formData.append('file', file);

            const token = (await window.Clerk?.session?.getToken()) || '';
            const res = await fetch(`${API_URL}/api/notes/upload`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            if (!res.ok) throw new Error('Upload failed');

            setTitle('');
            setSubject('');
            setCategory('notes');
            setFile(null);
            setModalOpen(false);
            fetchNotes();
        } catch (err) {
            alert('Upload failed: ' + err.message);
        } finally {
            setUploading(false);
        }
    }

    async function handleDelete(noteId) {
        if (!confirm('Delete this note?')) return;
        try {
            await apiFetch(`/api/notes/${noteId}`, { method: 'DELETE' });
            setNotes((prev) => prev.filter((n) => n._id !== noteId));
        } catch (err) {
            alert('Delete failed: ' + err.message);
        }
    }

    if (loading) return <div className="page-loading">Loading notes...</div>;

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">Notes & Resources</h2>
                <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                    ➕ Upload
                </button>
            </div>

            <div className="filter-bar">
                <label className="filter-label">Filter by Subject:</label>
                <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Subjects</option>
                    {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {notes.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-icon">📄</p>
                    <p>No notes found</p>
                    <p className="empty-sub">Upload notes to get started</p>
                </div>
            ) : (
                <div className="cards-grid">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="card card-clickable"
                            onClick={() => {
                                const url = note.url?.startsWith('/') ? `${API_URL}${note.url}` : note.url;
                                if (url) window.open(url, '_blank');
                            }}
                        >
                            <div className="card-top">
                                <div>
                                    <div className="card-title">{note.title || note.originalName}</div>
                                    <div className="card-sub">{note.subject}</div>
                                </div>
                                <span className="badge badge-orange">{note.category}</span>
                            </div>
                            <div className="card-bottom">
                                <span className="card-date">
                                    {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ''}
                                </span>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(note._id);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Upload Resource">
                <form onSubmit={handleUpload}>
                    <input
                        className="input"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <select className="input" value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="">Select Subject</option>
                        {subjects.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                    <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="notes">Notes</option>
                        <option value="pyq">Previous Year Questions</option>
                        <option value="resource">Study Material</option>
                    </select>
                    <input
                        className="input"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <button className="btn btn-primary" type="submit" disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default Notes;
