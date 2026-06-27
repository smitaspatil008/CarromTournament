import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Zap, Calendar, Users, TrendingUp, Bell, ArrowRight, Play } from 'lucide-react';
import Layout from '../components/layout/Layout';
import LiveBadge from '../components/ui/LiveBadge';
import CountdownTimer from '../components/ui/CountdownTimer';
import MatchCard from '../components/tournament/MatchCard';
import TrophySection from '../components/tournament/TrophySection';
import { useTournamentStore, useLiveMatches, useUpcomingMatches } from '../store/tournamentStore';
import { ANNOUNCEMENTS, TOURNAMENT } from '../data/mockData';

const ANNOUNCEMENT_ICONS: Record<string, string> = {
  match: '⚡', winner: '🏆', champion: '🎉', info: '📢',
};

export default function Landing() {
  const { teams, players, matches, announcements } = useTournamentStore();
  const liveMatches = useLiveMatches();
  const upcoming = useUpcomingMatches();

  const getTeam = (id: string) => teams.find((t) => t.id === id);
  const getPlayer = (id: string) => players.find((p) => p.id === id);

  const nextMatch = upcoming[0];
  const featuredLive = liveMatches[0];

  return (
    <Layout noPadding>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-4 py-16"
        style={{ background: 'linear-gradient(135deg,#020617 0%,#0d1b4b 40%,#1e0a3c 70%,#1a0d00 100%)' }}>

        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-20 particle"
            style={{
              width: `${4 + (i % 3) * 4}px`,
              height: `${4 + (i % 3) * 4}px`,
              background: i % 3 === 0 ? '#2563EB' : i % 3 === 1 ? '#7C3AED' : '#F97316',
              left: `${(i * 5.1) % 100}%`,
              top: `${(i * 7.3) % 100}%`,
              '--dur': `${4 + (i % 4)}s`,
              '--delay': `${i * 0.2}s`,
            } as React.CSSProperties}
          />
        ))}

        {/* Glow blobs */}
        <div className="absolute top-20 left-1/4 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#2563EB,transparent)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#7C3AED,transparent)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle,#F97316,transparent)', filter: 'blur(80px)' }} />

        {/* Live status pill */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 mb-6 glass">
          <LiveBadge size="sm" />
          <span className="text-white/80 text-sm">JOSH Tournament 2026 is LIVE</span>
        </motion.div>

        {/* Main title */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
            </motion.div>
          </div>
          <h1 className="font-display font-black text-5xl sm:text-7xl text-white leading-none mb-2">
            JOSH<br />
            <span style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED,#F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Tournament Arena
            </span>
          </h1>
          <p className="text-white/50 text-lg sm:text-xl tracking-widest uppercase">Play · Compete · Celebrate</p>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex items-center gap-6 sm:gap-10 my-8 text-center">
          {[
            { value: teams.length, label: 'Teams', icon: '🏅' },
            { value: players.length, label: 'Players', icon: '👥' },
            { value: liveMatches.length, label: 'Live Now', icon: '🔴' },
            { value: matches.filter(m=>m.status==='completed').length, label: 'Completed', icon: '✅' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-white text-2xl sm:text-3xl font-display font-bold">{s.icon} {s.value}</div>
              <div className="text-white/40 text-xs sm:text-sm mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link to="/live">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg text-white"
              style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)', boxShadow: '0 8px 32px rgba(37,99,235,0.4)' }}>
              <Play className="w-5 h-5" /> View Live Tournament
            </motion.button>
          </Link>
          <Link to="/leaderboard">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg border border-white/20 text-white glass">
              <TrendingUp className="w-5 h-5" /> Leaderboard
            </motion.button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-white/30 text-sm">
          ↓ scroll to explore
        </motion.div>
      </section>

      {/* ─── CONTENT ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <LiveBadge />
                <h2 className="font-display font-bold text-2xl" style={{ color: 'var(--color-text)' }}>Live Matches</h2>
              </div>
              <Link to="/live" className="text-sm text-brand-blue hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {liveMatches.map((m) => (
                <MatchCard key={m.id} match={m}
                  teamA={getTeam(m.teamAId)!} teamB={getTeam(m.teamBId)!}
                  playerA={getPlayer(teams.find(t=>t.id===m.teamAId)?.playerIds[0]??'')}
                  playerB={getPlayer(teams.find(t=>t.id===m.teamBId)?.playerIds[0]??'')}
                />
              ))}
            </div>
          </section>
        )}

        {/* Countdown + Upcoming */}
        {nextMatch && (
          <section className="grid md:grid-cols-2 gap-8 items-start">
            <div className="surface rounded-3xl p-8 text-center">
              <h2 className="font-display font-bold text-xl mb-2" style={{ color: 'var(--color-text)' }}>Next Match In</h2>
              <p className="text-muted text-sm mb-6">
                {teams.find(t=>t.id===nextMatch.teamAId)?.name} vs {teams.find(t=>t.id===nextMatch.teamBId)?.name}
              </p>
              <CountdownTimer targetDate={nextMatch.scheduledAt} />
              <div className="mt-4 text-xs text-muted flex items-center justify-center gap-2">
                <Calendar className="w-3 h-3" />
                {new Date(nextMatch.scheduledAt).toLocaleDateString([], { weekday:'long', month:'long', day:'numeric' })}
                {' · '}{nextMatch.court}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-xl" style={{ color: 'var(--color-text)' }}>Upcoming Matches</h2>
                <Link to="/schedule" className="text-sm text-brand-blue hover:underline flex items-center gap-1">
                  Schedule <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-3">
                {upcoming.slice(0, 4).map((m) => (
                  <MatchCard key={m.id} match={m}
                    teamA={getTeam(m.teamAId)!} teamB={getTeam(m.teamBId)!}
                    compact
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trophy */}
        <section>
          <TrophySection year={2026} />
        </section>

        {/* Announcements */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg,#F97316,#fb923c)' }}>
              <Bell className="w-5 h-5" />
            </div>
            <h2 className="font-display font-bold text-2xl" style={{ color: 'var(--color-text)' }}>Announcements</h2>
          </div>
          <div className="space-y-3">
            {announcements.slice(0, 5).map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="surface rounded-xl px-5 py-4 flex items-start gap-4"
              >
                <span className="text-2xl flex-shrink-0">{ANNOUNCEMENT_ICONS[a.type]}</span>
                <div className="min-w-0">
                  <h4 className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{a.title}</h4>
                  <p className="text-sm text-muted mt-0.5">{a.body}</p>
                  <p className="text-xs text-muted mt-1">{new Date(a.createdAt).toLocaleDateString([], { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                  a.type === 'champion' ? 'bg-yellow-500/15 text-yellow-500' :
                  a.type === 'winner'   ? 'bg-green-500/15 text-green-500' :
                  a.type === 'match'    ? 'bg-red-500/15 text-red-500' :
                  'bg-blue-500/15 text-blue-500'
                }`}>{a.type}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick nav */}
        <section>
          <h2 className="font-display font-bold text-2xl mb-6" style={{ color: 'var(--color-text)' }}>Explore Arena</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Carrom', path: '/carrom', icon: '🎯', color: '#2563EB' },
              { label: 'Sequence', path: '/sequence', icon: '🃏', color: '#7C3AED' },
              { label: 'Teams', path: '/teams', icon: '🏅', color: '#059669' },
              { label: 'Players', path: '/players', icon: '👥', color: '#F97316' },
              { label: 'Gallery', path: '/gallery', icon: '📸', color: '#DB2777' },
              { label: 'History', path: '/history', icon: '🏆', color: '#D97706' },
            ].map((n) => (
              <Link key={n.path} to={n.path}>
                <motion.div whileHover={{ y: -4, scale: 1.03 }}
                  className="surface rounded-2xl p-5 text-center cursor-pointer transition-shadow hover:shadow-lg">
                  <div className="text-3xl mb-2">{n.icon}</div>
                  <div className="font-semibold text-sm" style={{ color: n.color }}>{n.label}</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
