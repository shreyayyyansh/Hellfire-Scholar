import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/react';

const AcademicContext = createContext(null);

export function AcademicProvider({ children }) {
    const { user } = useUser();
    const [branch, setBranchState] = useState('');
    const [semester, setSemesterState] = useState(0);
    const [onboardingComplete, setOnboardingCompleteState] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const userId = user?.id;

    useEffect(() => {
        if (!userId) return;
        const stored = JSON.parse(localStorage.getItem(`academic_${userId}`) || '{}');
        setBranchState(stored.branch || '');
        setSemesterState(stored.semester || 0);
        setOnboardingCompleteState(stored.onboardingComplete || false);
        setLoaded(true);
    }, [userId]);

    function persist(updates) {
        if (!userId) return;
        const current = JSON.parse(localStorage.getItem(`academic_${userId}`) || '{}');
        const next = { ...current, ...updates };
        localStorage.setItem(`academic_${userId}`, JSON.stringify(next));
    }

    function setBranch(val) {
        setBranchState(val);
        persist({ branch: val });
    }

    function setSemester(val) {
        setSemesterState(val);
        persist({ semester: val });
    }

    function completeOnboarding(branchVal, semesterVal) {
        setBranchState(branchVal);
        setSemesterState(semesterVal);
        setOnboardingCompleteState(true);
        persist({ branch: branchVal, semester: semesterVal, onboardingComplete: true });
    }

    return (
        <AcademicContext.Provider value={{ branch, semester, onboardingComplete, loaded, setBranch, setSemester, completeOnboarding }}>
            {children}
        </AcademicContext.Provider>
    );
}

export function useAcademic() {
    const ctx = useContext(AcademicContext);
    if (!ctx) throw new Error('useAcademic must be inside AcademicProvider');
    return ctx;
}
