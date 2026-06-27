import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Menu, X, Sun, Moon, Shield, Zap } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useTournamentStore } from '../../store/tournamentStore';

const NAV_ITEMS = [
  { label: 'Home',        path: '/' },
  { label: 'Live',        path: '/live' },
  { label: 'Carrom',      path: '/carrom' },
  { label: 'Sequence',    path: '/sequence' },
  { label: 'Teams',       path: '/teams' },
  { label: 'Players',     path: '/players' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Schedule',    path: '/schedule' },
  { label: 'Gallery',     path: '/gallery' },
  { label: 'History',     path: '/history' },
];

export default function Navbar() {
  const { isDark, toggleTheme, sidebarOpen, setSidebarOpen } = useUIStore();
  const { isAdmin, userRole, logout } = useTournamentStore();
  const location = useLocation();
  const liveCount = useTournamentStore((s) => s.matches.filter((m) => m.status === 'live').length);

  return (
    <>
      <header className="sticky top-0 z-50" style={{ background: isDark ? 'rgba(2,6,23,0.9)' : 'rgba(248,250,252,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(37,99,235,0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)' }}>
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-bold text-base leading-none gradient-text">Josh</div>
                <div className="text-[10px] text-muted leading-none">Carrom & Sequence</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors"
                    style={{ color: active ? '#2563EB' : 'var(--color-text-muted)' }}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(37,99,235,0.12)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                    {item.path === '/live' && liveCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                        {liveCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-brand-blue/10">
                {isDark ? <Sun className="w-4 h-4" style={{ color: '#F97316' }} /> : <Moon className="w-4 h-4 text-brand-purple" />}
              </button>

              {isAdmin ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link to="/admin" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)', color: 'white' }}>
                    <Shield className="w-3 h-3" />
                    {userRole === 'admin' ? 'Admin' : 'Umpire'}
                  </Link>
                  <button onClick={logout} className="text-xs text-muted hover:text-red-500 transition-colors">Logout</button>
                </div>
              ) : (
                <Link to="/login" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-brand-blue/30 text-brand-blue hover:bg-brand-blue/10 transition-colors">
                  <Shield className="w-3 h-3" />
                  Login
                </Link>
              )}

              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center">
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden fixed top-16 inset-x-0 z-40 border-b"
            style={{ background: isDark ? '#0f172a' : '#ffffff', borderColor: 'var(--color-border)' }}
          >
            <div className="p-4 grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                  style={{
                    background: location.pathname === item.path ? 'rgba(37,99,235,0.12)' : 'transparent',
                    color: location.pathname === item.path ? '#2563EB' : 'var(--color-text)',
                  }}
                >
                  {item.label}
                  {item.path === '/live' && liveCount > 0 && (
                    <span className="w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {liveCount}
                    </span>
                  )}
                </Link>
              ))}
              <Link to="/login" onClick={() => setSidebarOpen(false)} className="col-span-2 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold" style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)', color: 'white' }}>
                <Zap className="w-4 h-4" />
                {isAdmin ? 'Go to Admin' : 'Admin Login'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
