import Chatbot from './components/Chatbot';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ProtectedLayout from './components/ProtectedLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Notes from './pages/Notes.jsx';
import Syllabus from './pages/Syllabus.jsx';
import Assignments from './pages/Assignments.jsx';
import Attendance from './pages/Attendance.jsx';
import Settings from './pages/Settings.jsx';
import Subjects from './pages/Subjects.jsx';

function App() {
  return (
    <>
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route path="/sign-up/*" element={<SignUpPage />} />

      {/* Protected routes — requires sign-in */}
      <Route element={<ProtectedLayout />}>
        <Route path="/app" element={<Dashboard />} />
        <Route path="/app/notes" element={<Notes />} />
        <Route path="/app/syllabus" element={<Syllabus />} />
        <Route path="/app/assignments" element={<Assignments />} />
        <Route path="/app/attendance" element={<Attendance />} />
        <Route path="/app/settings" element={<Settings />} />
        <Route path="/app/subjects" element={<Subjects />} />
      </Route>
    </Routes>
    <Chatbot />
    </>
  );
}

export default App;
