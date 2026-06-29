import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Calendar, Users, TrendingUp, Bell, ArrowRight, Play, Target, Brain, Award, Gamepad2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import LiveBadge from '../components/ui/LiveBadge';
import CountdownTimer from '../components/ui/CountdownTimer';
import MatchCard from '../components/tournament/MatchCard';
import TrophySection from '../components/tournament/TrophySection';
import { useTournamentStore, useLiveMatches, useUpcomingMatches } from '../store/tournamentStore';

const ANNOUNCEMENT_ICONS: Record<string, string> = {
  match: '⚡', winner: '🏆', champion: '🎉', info: '📢',
};

function CarromBoard() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-[120px] sm:text-[160px] leading-none select-none">🎯</div>
      <span className="text-orange-400/60 text-sm sm:text-base font-semibold uppercase tracking-[0.3em]">Carrom</span>
    </div>
  );
}

function PlayingCards() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-[120px] sm:text-[160px] leading-none select-none">🃏</div>
      <span className="text-purple-400/60 text-sm sm:text-base font-semibold uppercase tracking-[0.3em]">Sequence</span>
    </div>
  );
}

function FireParticles() {
  return (
    <>
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${2 + (i % 4) * 2}px`,
            height: `${2 + (i % 4) * 2}px`,
            background: i % 3 === 0 ? '#ff6b00' : i % 3 === 1 ? '#ff9500' : '#ffcc00',
            left: `${(i * 3.3) % 100}%`,
            bottom: `${(i * 2.7) % 40}%`,
            opacity: 0,
          }}
          animate={{
            y: [0, -80 - (i % 5) * 30, -160],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.2],
          }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
}

export default function Landing() {
  const { teams, players, matches, announcements } = useTournamentStore();
  const liveMatches = useLiveMatches();
  const upcoming = useUpcomingMatches();

  const getTeam = (id: string) => teams.find((t) => t.id === id);
  const getPlayer = (id: string) => players.find((p) => p.id === id);

  const nextMatch = upcoming[0];

  return (
    <Layout noPadding fullWidth>
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#050505 0%,#0a0a1a 30%,#150820 60%,#1a0800 100%)' }}>

        <FireParticles />

        {/* Ambient glow */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-15" style={{ background: 'radial-gradient(circle,#ff6b00,transparent)', filter: 'blur(80px)' }} />
          <div className="absolute top-1/3 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle,#7C3AED,transparent)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full opacity-8" style={{ background: 'radial-gradient(circle,#ea580c,transparent)', filter: 'blur(100px)' }} />
        </div>

        {/* Game imagery - Left: Carrom, Right: Cards */}
        <div className="absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 hidden lg:block">
          <CarromBoard />
        </div>

        <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:block">
          <PlayingCards />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          {/* Live pill */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-8"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
            <LiveBadge size="sm" />
            <span className="text-white/70 text-xs sm:text-sm">Josh Carrom & Sequence Tournament 2026 is LIVE!</span>
          </motion.div>

          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="font-display leading-none mb-3">
              <span className="block text-3xl sm:text-4xl text-white/90 italic font-light tracking-wide" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Josh</span>
              <span className="block text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight"
                style={{ background: 'linear-gradient(180deg, #ff8c00 0%, #ea580c 50%, #c2410c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 8px rgba(234,88,12,0.5))' }}>
                Carrom
              </span>
              <span className="block text-3xl sm:text-4xl text-white/80 font-light my-1">&</span>
              <span className="block text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight"
                style={{ background: 'linear-gradient(180deg, #a855f7 0%, #7c3aed 50%, #6d28d9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 8px rgba(124,58,237,0.5))' }}>
                Sequence
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] mt-2"
                style={{ background: 'linear-gradient(90deg, #a855f7, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Tournament 2026
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="text-white/40 text-xs sm:text-sm tracking-[0.25em] uppercase mt-4 mb-8">
            Play Together &bull; Compete Together &bull; Celebrate Together
          </motion.p>

          {/* Mobile game images */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="flex lg:hidden justify-center gap-8 mb-6">
            <div className="text-7xl select-none">🎯</div>
            <div className="text-7xl select-none">🃏</div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="inline-flex flex-wrap justify-center items-center gap-0 rounded-2xl overflow-hidden mb-8"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
            {[
              { value: teams.length, label: 'Teams', icon: <Users className="w-4 h-4 text-orange-400" /> },
              { value: players.length, label: 'Players', icon: <Users className="w-4 h-4 text-blue-400" /> },
              { value: liveMatches.length, label: 'Live Now', icon: <span className="w-4 h-4 flex items-center justify-center text-red-500 text-xs">●</span> },
              { value: matches.filter(m => m.status === 'completed').length, label: 'Completed', icon: <span className="text-green-400 text-sm">✓</span> },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-col items-center px-3 sm:px-6 py-2 sm:py-4"
                style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <div className="mb-0.5 sm:mb-1">{s.icon}</div>
                <div className="text-white font-display font-bold text-base sm:text-2xl">{s.value}</div>
                <div className="text-white/30 text-[8px] sm:text-[10px] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10">
            <Link to="/live">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white text-sm sm:text-base"
                style={{ background: 'linear-gradient(135deg,#ea580c,#dc2626)', boxShadow: '0 4px 20px rgba(234,88,12,0.4)' }}>
                <Play className="w-4 h-4" /> View Live Tournament
              </motion.button>
            </Link>
            <Link to="/leaderboard">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white text-sm sm:text-base"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <Trophy className="w-4 h-4 text-purple-400" /> Leaderboard
              </motion.button>
            </Link>
          </motion.div>

          {/* Feature strip */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {[
              { icon: <Target className="w-5 h-5 text-orange-400" />, title: 'Teamwork', sub: 'Together We Win' },
              { icon: <Brain className="w-5 h-5 text-green-400" />, title: 'Strategy', sub: 'Plan. Think. Win.' },
              { icon: <Award className="w-5 h-5 text-yellow-400" />, title: 'Glory', sub: 'Compete. Conquer.' },
              { icon: <Gamepad2 className="w-5 h-5 text-purple-400" />, title: 'Fun Unlimited', sub: 'Games. Friends.' },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-2 px-3 py-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {f.icon}
                <div className="text-left">
                  <div className="text-white/90 text-xs font-semibold uppercase">{f.title}</div>
                  <div className="text-white/30 text-[10px]">{f.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
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
                  playerA={getPlayer(teams.find(t => t.id === m.teamAId)?.playerIds[0] ?? '')}
                  playerB={getPlayer(teams.find(t => t.id === m.teamBId)?.playerIds[0] ?? '')}
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
                {teams.find(t => t.id === nextMatch.teamAId)?.name} vs {teams.find(t => t.id === nextMatch.teamBId)?.name}
              </p>
              <CountdownTimer targetDate={nextMatch.scheduledAt} />
              <div className="mt-4 text-xs text-muted flex items-center justify-center gap-2">
                <Calendar className="w-3 h-3" />
                {new Date(nextMatch.scheduledAt).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
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
                  <p className="text-xs text-muted mt-1">{new Date(a.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${a.type === 'champion' ? 'bg-yellow-500/15 text-yellow-500' :
                  a.type === 'winner' ? 'bg-green-500/15 text-green-500' :
                    a.type === 'match' ? 'bg-red-500/15 text-red-500' :
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
              { label: 'Carrom', path: '/carrom', icon: '🎯', color: '#ea580c' },
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
