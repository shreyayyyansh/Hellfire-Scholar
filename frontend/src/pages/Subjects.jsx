import { useState, useEffect } from 'react';
import { Plus, Trash2, BookOpen, BookMarked } from 'lucide-react';
import { useAcademic } from '../contexts/AcademicContext.jsx';
import Modal from '../components/Modal.jsx';
import './Subjects.css';

function getStorageKey(branch, semester) {
    return `subjects_${branch}_${semester}`;
}

function loadSubjects(branch, semester) {
    if (!branch || !semester) return [];
    try {
        return JSON.parse(localStorage.getItem(getStorageKey(branch, semester)) || '[]');
    } catch {
        return [];
    }
}

function saveSubjects(branch, semester, subjects) {
    if (!branch || !semester) return;
    localStorage.setItem(getStorageKey(branch, semester), JSON.stringify(subjects));
}

function Subjects() {
    const { branch, semester } = useAcademic();
    const [subjects, setSubjects] = useState([]);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [newName, setNewName] = useState('');
    const [newCode, setNewCode] = useState('');

    useEffect(() => {
        setSubjects(loadSubjects(branch, semester));
    }, [branch, semester]);

    function handleAdd() {
        if (!newName.trim()) return;
        const subject = {
            id: Date.now().toString() + Math.random().toString(36).slice(2, 8),
            name: newName.trim(),
            code: newCode.trim(),
            branch,
            semester,
            createdAt: Date.now(),
        };
        const updated = [...subjects, subject];
        setSubjects(updated);
        saveSubjects(branch, semester, updated);
        setNewName('');
        setNewCode('');
        setAddModalOpen(false);
    }

    function handleDelete() {
        if (!deleteTarget) return;
        const updated = subjects.filter((s) => s.id !== deleteTarget.id);
        setSubjects(updated);
        saveSubjects(branch, semester, updated);
        setDeleteTarget(null);
    }

    function openAddModal() {
        setNewName('');
        setNewCode('');
        setAddModalOpen(true);
    }

    return (
        <div className="subjects">
            <div className="page-header">
                <h2 className="page-title" style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <BookMarked size={24} />
                    Subjects
                </h2>
                <button className="btn btn-primary" onClick={openAddModal}>
                    <Plus size={18} />
                    Add Subject
                </button>
            </div>

            {subjects.length === 0 ? (
                <div className="subjects-empty">
                    <BookOpen size={48} className="subjects-empty-icon" />
                    <p className="subjects-empty-title">No subjects added yet.</p>
                    <p className="subjects-empty-sub">Tap '+ Add Subject' to get started.</p>
                </div>
            ) : (
                <div className="subjects-list">
                    {subjects.map((subject) => (
                        <div key={subject.id} className="subject-item">
                            <div className="subject-info">
                                <span className="subject-name">{subject.name}</span>
                                {subject.code && (
                                    <span className="subject-code">{subject.code}</span>
                                )}
                            </div>
                            <button
                                className="subject-delete-btn"
                                onClick={() => setDeleteTarget(subject)}
                                title="Delete subject"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Subject Modal */}
            <Modal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                title="Add Subject"
            >
                <div className="subject-form">
                    <div className="subject-form-group">
                        <label className="subject-form-label">Subject Name</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="e.g. Digital Communications"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="subject-form-group">
                        <label className="subject-form-label">Subject Code</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="e.g. ECN-401"
                            value={newCode}
                            onChange={(e) => setNewCode(e.target.value)}
                        />
                    </div>
                    <div className="subject-form-actions">
                        <button className="btn btn-ghost" onClick={() => setAddModalOpen(false)}>
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            disabled={!newName.trim()}
                            onClick={handleAdd}
                        >
                            Add Subject
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Delete Confirm Modal */}
            <Modal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                title="Delete Subject"
            >
                <p className="delete-confirm-text">
                    Delete <strong>{deleteTarget?.name}</strong>? This cannot be undone.
                </p>
                <div className="delete-confirm-actions">
                    <button className="btn btn-ghost" onClick={() => setDeleteTarget(null)}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Subjects;
