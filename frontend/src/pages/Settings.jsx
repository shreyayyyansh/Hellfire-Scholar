import { useState } from 'react';
import { GraduationCap, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import { UserButton, useUser } from '@clerk/react';
import { useAcademic } from '../contexts/AcademicContext.jsx';
import Modal from '../components/Modal.jsx';
import './Settings.css';

const BRANCHES = [
    'Computer Science & Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Electronics and Communication Engineering',
    'Chemical Engineering',
];

function Settings() {
    const { user } = useUser();
    const { branch, semester, setBranch, setSemester } = useAcademic();
    const [branchModalOpen, setBranchModalOpen] = useState(false);
    const [semesterModalOpen, setSemesterModalOpen] = useState(false);

    function handleBranchSelect(val) {
        setBranch(val);
        setBranchModalOpen(false);
    }

    function handleSemesterSelect(val) {
        setSemester(val);
        setSemesterModalOpen(false);
    }

    return (
        <div className="settings">
            <h2 className="page-title">Settings</h2>

            {/* Academic Profile */}
            <div className="settings-section">
                <div className="settings-section-title">
                    <GraduationCap size={20} />
                    Academic Profile
                </div>
                <div className="settings-card">
                    <div className="settings-row" onClick={() => setBranchModalOpen(true)}>
                        <div className="settings-row-left">
                            <BookOpen size={18} />
                            <span>Branch</span>
                        </div>
                        <div className="settings-row-right">
                            <span>{branch || 'Not set'}</span>
                            <ChevronRight size={18} />
                        </div>
                    </div>
                    <div className="settings-row" onClick={() => setSemesterModalOpen(true)}>
                        <div className="settings-row-left">
                            <Calendar size={18} />
                            <span>Semester</span>
                        </div>
                        <div className="settings-row-right">
                            <span>{semester ? `Semester ${semester}` : 'Not set'}</span>
                            <ChevronRight size={18} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Account */}
            <div className="settings-section">
                <div className="settings-section-title">
                    Account
                </div>
                <div className="settings-card">
                    <div className="settings-row-account">
                        <UserButton afterSignOutUrl="/" />
                        <div className="settings-account-info">
                            <span className="settings-account-name">
                                {user?.fullName || user?.firstName || 'User'}
                            </span>
                            <span className="settings-account-email">
                                {user?.primaryEmailAddress?.emailAddress || ''}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Branch Modal */}
            <Modal
                isOpen={branchModalOpen}
                onClose={() => setBranchModalOpen(false)}
                title="Select Branch"
            >
                <div className="settings-modal-options">
                    {BRANCHES.map((b) => (
                        <button
                            key={b}
                            className={`settings-modal-option ${branch === b ? 'selected' : ''}`}
                            onClick={() => handleBranchSelect(b)}
                        >
                            {b}
                        </button>
                    ))}
                </div>
            </Modal>

            {/* Semester Modal */}
            <Modal
                isOpen={semesterModalOpen}
                onClose={() => setSemesterModalOpen(false)}
                title="Select Semester"
            >
                <div className="settings-semester-grid">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <button
                            key={sem}
                            className={`settings-semester-option ${semester === sem ? 'selected' : ''}`}
                            onClick={() => handleSemesterSelect(sem)}
                        >
                            Sem {sem}
                        </button>
                    ))}
                </div>
            </Modal>
        </div>
    );
}

export default Settings;
