import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi.js';
import { BookOpen } from 'lucide-react';
import { useSubjects } from '../contexts/AcademicContext.jsx';
import syllabusData from '../data/syllabusData.js';
import ProgressBar from '../components/ProgressBar.jsx';

function Syllabus() {
    const { apiFetch } = useApi();
    const subjects = useSubjects();
    const [selectedSubject, setSelectedSubject] = useState('');
    const [completedTopics, setCompletedTopics] = useState([]);
    const [loading, setLoading] = useState(false);

    // Auto-select first subject when subject list loads or changes
    useEffect(() => {
        if (subjects.length > 0 && !subjects.includes(selectedSubject)) {
            setSelectedSubject(subjects[0]);
        }
    }, [subjects]);

    useEffect(() => {
        if (selectedSubject) loadProgress();
    }, [selectedSubject]);

    async function loadProgress() {
        try {
            const data = await apiFetch(`/api/syllabus/${encodeURIComponent(selectedSubject)}`);
            setCompletedTopics(data.completedTopics || []);
        } catch {
            setCompletedTopics([]);
        }
    }

    async function toggleTopic(topic) {
        try {
            const data = await apiFetch(`/api/syllabus/${encodeURIComponent(selectedSubject)}/toggle`, {
                method: 'PATCH',
                body: JSON.stringify({ topic }),
            });
            setCompletedTopics(data.completedTopics || []);
        } catch (err) {
            console.error('Toggle failed:', err);
        }
    }

    const topics = syllabusData[selectedSubject] || [];
    const completedCount = completedTopics.length;
    const totalCount = topics.length;
    const percent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    if (loading) return <div className="page-loading">Loading syllabus...</div>;

    return (
        <div>
            <div className="page-header">
                <h2 className="page-title">Syllabus Progress</h2>
            </div>

            <div className="filter-bar">
                <label className="filter-label">Select Subject:</label>
                <select
                    className="filter-select"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                >
                    {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {topics.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-icon"><BookOpen size={48} /></p>
                    <p>No syllabus data for this subject</p>
                </div>
            ) : (
                <div className="card" style={{ marginTop: 16 }}>
                    <h3 className="card-title" style={{ marginBottom: 16 }}>{selectedSubject} — Units</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {topics.map((topic, i) => {
                            const done = completedTopics.includes(topic);
                            return (
                                <label
                                    key={i}
                                    className={`topic-row ${done ? 'topic-done' : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={done}
                                        onChange={() => toggleTopic(topic)}
                                    />
                                    <span>{topic}</span>
                                </label>
                            );
                        })}
                    </div>

                    <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--color-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>Progress:</span>
                            <span style={{ color: 'var(--color-accent)', fontWeight: 700, fontSize: 18 }}>
                                {completedCount}/{totalCount} Units
                            </span>
                        </div>
                        <ProgressBar value={percent} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Syllabus;
