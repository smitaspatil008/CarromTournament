import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTournamentStore, initFirebaseSync } from './store/tournamentStore';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import LiveMatches from './pages/LiveMatches';
import CarromBracket from './pages/CarromBracket';
import SequenceGroups from './pages/SequenceGroups';
import Teams from './pages/Teams';
import Players from './pages/Players';
import Schedule from './pages/Schedule';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import MatchDetails from './pages/MatchDetails';
import AdminPortal from './pages/AdminPortal';
import UmpireScreen from './pages/UmpireScreen';
import Leaderboard from './pages/Leaderboard';
import { SharedPost, SharedAnnouncement } from './pages/SharedContent';

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
      <Route path="/schedule"    element={<Schedule />} />
      <Route path="/gallery"     element={<Gallery />} />
      <Route path="/login"       element={<Login />} />
      <Route path="/match/:id"   element={<MatchDetails />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/admin"       element={<AdminPortal />} />
      <Route path="/umpire/:id"  element={<UmpireScreen />} />
      <Route path="/post/:id"   element={<SharedPost />} />
      <Route path="/announcement/:id" element={<SharedAnnouncement />} />
    </Routes>
  );
}

export default function App() {
  const hydrated = useTournamentStore((s) => s._hydrated);

  useEffect(() => {
    initFirebaseSync();
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading tournament data...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            color: '#111827',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
          success: { iconTheme: { primary: '#2563EB', secondary: '#ffffff' } },
        }}
      />
    </BrowserRouter>
  );
}
