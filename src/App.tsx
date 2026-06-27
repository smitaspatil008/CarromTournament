import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useUIStore } from './store/uiStore';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import LiveMatches from './pages/LiveMatches';
import CarromBracket from './pages/CarromBracket';
import SequenceGroups from './pages/SequenceGroups';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Leaderboard from './pages/Leaderboard';
import Schedule from './pages/Schedule';
import Gallery from './pages/Gallery';
import History from './pages/History';
import Login from './pages/Login';
import MatchDetails from './pages/MatchDetails';
import AdminPortal from './pages/AdminPortal';
import UmpireScreen from './pages/UmpireScreen';

function ThemeInit() {
  const { isDark } = useUIStore();
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);
  return null;
}

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/"            element={<Landing />} />
      <Route path="/dashboard"   element={<Dashboard />} />
      <Route path="/live"        element={<LiveMatches />} />
      <Route path="/carrom"      element={<CarromBracket />} />
      <Route path="/sequence"    element={<SequenceGroups />} />
      <Route path="/teams"       element={<Teams />} />
      <Route path="/players"     element={<Players />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/schedule"    element={<Schedule />} />
      <Route path="/gallery"     element={<Gallery />} />
      <Route path="/history"     element={<History />} />
      <Route path="/login"       element={<Login />} />
      <Route path="/match/:id"   element={<MatchDetails />} />
      <Route path="/admin"       element={<AdminPortal />} />
      <Route path="/umpire/:id"  element={<UmpireScreen />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeInit />
      <AnimatedRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0f172a',
            color: '#f8fafc',
            border: '1px solid rgba(37,99,235,0.3)',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#2563EB', secondary: '#f8fafc' } },
        }}
      />
    </BrowserRouter>
  );
}
