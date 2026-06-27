import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Layout from '../components/layout/Layout';
import LiveBadge from '../components/ui/LiveBadge';
import { useTournamentStore } from '../store/tournamentStore';

export default function Schedule() {
  const { matches, teams } = useTournamentStore();
  const [filter, setFilter] = useState<'all' | 'carrom' | 'sequence'>('all');

  const filtered = filter === 'all' ? matches : matches.filter((m) => m.game === filter);
  const sorted = [...filtered].sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  // Group by date
  const byDate = sorted.reduce<Record<string, typeof sorted>>((acc, m) => {
    const d = new Date(m.scheduledAt).toDateString();
    if (!acc[d]) acc[d] = [];
    acc[d].push(m);
    return acc;
  }, {});

  const getTeam = (id: string) => teams.find((t) => t.id === id);

  const STATUS_COLOR: Record<string, string> = {
    live: '#ef4444',
    completed: '#059669',
    upcoming: '#2563EB',
  };

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-7 h-7 text-brand-blue" />
          <h1 className="font-display font-bold text-3xl gradient-text">Schedule</h1>
        </div>
        <p className="text-muted text-sm">Full match schedule for JOSH Tournament 2026</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-8">
        {(['all', 'carrom', 'sequence'] as const).map((g) => (
          <button key={g} onClick={() => setFilter(g)}
            className="px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors"
            style={{
              background: filter === g ? 'linear-gradient(135deg,#2563EB,#7C3AED)' : 'var(--color-surface)',
              color: filter === g ? 'white' : 'var(--color-text-muted)',
              border: filter === g ? 'none' : '1px solid var(--color-border)',
            }}>
            {g === 'all' ? 'All Games' : g}
          </button>
        ))}
      </div>

      {/* Days */}
      <div className="space-y-8">
        {Object.entries(byDate).map(([dateStr, dayMatches], di) => {
          const d = new Date(dateStr);
          const isToday = new Date().toDateString() === dateStr;
          return (
            <div key={dateStr}>
              {/* Date header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`px-4 py-2 rounded-xl ${isToday ? 'text-white' : 'surface'}`}
                  style={{ background: isToday ? 'linear-gradient(135deg,#2563EB,#7C3AED)' : undefined }}>
                  <div className={`font-display font-bold text-sm ${isToday ? 'text-white' : ''}`}
                    style={!isToday ? { color: 'var(--color-text)' } : {}}>
                    {d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  {isToday && <div className="text-white/70 text-xs">Today</div>}
                </div>
                <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                <span className="text-xs text-muted">{dayMatches.length} matches</span>
              </div>

              {/* Match rows */}
              <div className="space-y-2">
                {dayMatches.map((m, i) => {
                  const tA = getTeam(m.teamAId);
                  const tB = getTeam(m.teamBId);
                  const time = new Date(m.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  return (
                    <motion.div key={m.id}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: di * 0.05 + i * 0.04 }}
                      className="surface rounded-xl px-4 py-3 flex items-center gap-4"
                      style={{ borderLeft: `3px solid ${STATUS_COLOR[m.status]}` }}>
                      {/* Time */}
                      <div className="flex-shrink-0 text-center w-14">
                        <div className="text-xs font-semibold" style={{ color: STATUS_COLOR[m.status] }}>{time}</div>
                        <div className="text-[10px] text-muted capitalize">{m.game}</div>
                      </div>

                      {/* Teams */}
                      <div className="flex-1 flex items-center gap-2 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold" style={{ background: tA?.color ?? '#64748b' }}>{tA?.logo}</div>
                          <span className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>{tA?.name}</span>
                        </div>
                        <span className="text-xs text-muted">vs</span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold" style={{ background: tB?.color ?? '#64748b' }}>{tB?.logo}</div>
                          <span className="text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>{tB?.name}</span>
                        </div>
                      </div>

                      {/* Score (if played) */}
                      {(m.status === 'live' || m.status === 'completed') && (
                        <div className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>
                          {m.scoreA} – {m.scoreB}
                        </div>
                      )}

                      {/* Status */}
                      <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs text-muted">
                          <MapPin className="w-3 h-3" />{m.court}
                        </div>
                        {m.status === 'live' ? <LiveBadge size="sm" /> :
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize`}
                            style={{ background: `${STATUS_COLOR[m.status]}18`, color: STATUS_COLOR[m.status] }}>
                            {m.status}
                          </span>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
