import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/react';

const AcademicContext = createContext(null);

function getSubjectsKey(branch, semester) {
    return `subjects_${branch}_${semester}`;
}

export function AcademicProvider({ children }) {
    const { user } = useUser();
    const [branch, setBranchState] = useState('');
    const [semester, setSemesterState] = useState(0);
    const [onboardingComplete, setOnboardingCompleteState] = useState(false);
    const [loaded, setLoaded] = useState(false);
    // Incremented whenever subjects change, so consumers re-read from localStorage
    const [subjectsVersion, setSubjectsVersion] = useState(0);

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

    // Call this whenever subjects are added or removed to notify consumers
    const notifySubjectsChanged = useCallback(() => {
        setSubjectsVersion((v) => v + 1);
    }, []);

    return (
        <AcademicContext.Provider value={{
            branch, semester, onboardingComplete, loaded,
            setBranch, setSemester, completeOnboarding,
            subjectsVersion, notifySubjectsChanged,
        }}>
            {children}
        </AcademicContext.Provider>
    );
}

export function useAcademic() {
    const ctx = useContext(AcademicContext);
    if (!ctx) throw new Error('useAcademic must be inside AcademicProvider');
    return ctx;
}

/**
 * Hook that returns the current subject name list from localStorage.
 * Re-reads whenever branch, semester, or subjectsVersion changes.
 */
export function useSubjects() {
    const { branch, semester, subjectsVersion } = useAcademic();
    const [subjectNames, setSubjectNames] = useState([]);

    useEffect(() => {
        if (!branch || !semester) {
            setSubjectNames([]);
            return;
        }
        try {
            const stored = JSON.parse(localStorage.getItem(getSubjectsKey(branch, semester)) || '[]');
            setSubjectNames(stored.map((s) => s.name));
        } catch {
            setSubjectNames([]);
        }
    }, [branch, semester, subjectsVersion]);

    return subjectNames;
}
