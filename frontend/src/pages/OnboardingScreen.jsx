import { useState } from 'react';
import { Flame } from 'lucide-react';
import { useAcademic } from '../contexts/AcademicContext.jsx';
import './OnboardingScreen.css';

const BRANCHES = [
    'Computer Science & Engineering',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Electronics and Communication Engineering',
    'Chemical Engineering',
];

function OnboardingScreen() {
    const { completeOnboarding } = useAcademic();
    const [step, setStep] = useState(1);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedSemester, setSelectedSemester] = useState(0);

    function handleNext() {
        if (step === 1 && selectedBranch) {
            setStep(2);
        }
    }

    function handleGetStarted() {
        if (selectedSemester > 0) {
            completeOnboarding(selectedBranch, selectedSemester);
        }
    }

    return (
        <div className="onboarding">
            <div className="onboarding-container">
                <div className="onboarding-logo">
                    <Flame size={32} className="onboarding-logo-icon" />
                    <span className="onboarding-logo-text">Hellfire Scholar</span>
                </div>

                {step === 1 && (
                    <>
                        <h1 className="onboarding-title">What's your branch?</h1>
                        <p className="onboarding-subtitle">We'll show you the right content for your degree.</p>
                        <div className="onboarding-options">
                            {BRANCHES.map((branch) => (
                                <button
                                    key={branch}
                                    className={`onboarding-option ${selectedBranch === branch ? 'selected' : ''}`}
                                    onClick={() => setSelectedBranch(branch)}
                                >
                                    {branch}
                                </button>
                            ))}
                        </div>
                        <div className="onboarding-action">
                            <button
                                className="btn btn-primary btn-lg"
                                disabled={!selectedBranch}
                                onClick={handleNext}
                            >
                                Next →
                            </button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h1 className="onboarding-title">Which semester are you in?</h1>
                        <p className="onboarding-subtitle">You can change this anytime from Settings.</p>
                        <div className="semester-grid">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                <button
                                    key={sem}
                                    className={`semester-option ${selectedSemester === sem ? 'selected' : ''}`}
                                    onClick={() => setSelectedSemester(sem)}
                                >
                                    Sem {sem}
                                </button>
                            ))}
                        </div>
                        <div className="onboarding-action">
                            <button
                                className="btn btn-primary btn-lg"
                                disabled={selectedSemester === 0}
                                onClick={handleGetStarted}
                            >
                                Get Started →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default OnboardingScreen;
