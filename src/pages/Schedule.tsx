import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Plus, Edit3, Trash2, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import LiveBadge from '../components/ui/LiveBadge';
import { useTournamentStore } from '../store/tournamentStore';
import type { GameType } from '../types';
import toast from 'react-hot-toast';

type ModalType = 'addMatch' | 'editMatch' | null;

export default function Schedule() {
  const { matches, teams, isAdmin, addMatch, updateMatch, deleteMatch } = useTournamentStore();
  const [filter, setFilter] = useState<'all' | 'carrom' | 'sequence'>('all');
  const [modal, setModal] = useState<ModalType>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  const filtered = filter === 'all' ? matches : matches.filter((m) => m.game === filter);
  const sorted = [...filtered].sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

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

  const inputStyle = {
    background: 'var(--color-surface-2)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text)',
  };

  const closeModal = () => { setModal(null); setForm({}); };

  const openEdit = (matchId: string) => {
    const m = matches.find((x) => x.id === matchId);
    if (!m) return;
    setForm({
      matchId,
      round: m.round,
      court: m.court,
      scheduledAt: m.scheduledAt.slice(0, 16),
    });
    setModal('editMatch');
  };

  const handleSubmit = () => {
    if (modal === 'addMatch') {
      if (!form.teamAId || !form.teamBId || !form.game) { toast.error('Fill required fields'); return; }
      addMatch({
        teamAId: form.teamAId,
        teamBId: form.teamBId,
        scoreA: 0, scoreB: 0,
        status: 'upcoming',
        game: form.game as GameType,
        round: form.round || 'Group Stage',
        court: form.court || 'Court 1',
        scheduledAt: form.scheduledAt || new Date().toISOString(),
      });
      toast.success('Match scheduled!');
    } else if (modal === 'editMatch') {
      if (!form.matchId) { toast.error('Select a match'); return; }
      const updates: Record<string, string> = {};
      if (form.court) updates.court = form.court;
      if (form.round) updates.round = form.round;
      if (form.scheduledAt) updates.scheduledAt = new Date(form.scheduledAt).toISOString();
      updateMatch(form.matchId, updates);
      toast.success('Match updated!');
    }
    closeModal();
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-7 h-7 text-brand-blue" />
            <h1 className="font-display font-bold text-3xl gradient-text">Schedule</h1>
          </div>
          <p className="text-muted text-sm">Full match schedule for Josh Tournament 2026</p>
        </div>
        {isAdmin && (
          <button onClick={() => { setForm({}); setModal('addMatch'); }}
            className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Add Match
          </button>
        )}
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

              <div className="space-y-2">
                {dayMatches.map((m, i) => {
                  const tA = getTeam(m.teamAId);
                  const tB = getTeam(m.teamBId);
                  const time = new Date(m.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  return (
                    <motion.div key={m.id}
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: di * 0.05 + i * 0.04 }}
                      className="surface rounded-xl px-3 sm:px-4 py-3"
                      style={{ borderLeft: `3px solid ${STATUS_COLOR[m.status]}` }}>
                      <div className="flex items-center gap-2 sm:gap-4">
                        {/* Time */}
                        <div className="flex-shrink-0 text-center w-12 sm:w-14">
                          <div className="text-xs font-semibold" style={{ color: STATUS_COLOR[m.status] }}>{time}</div>
                          <div className="text-[10px] text-muted capitalize">{m.game}</div>
                        </div>

                        {/* Teams */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded flex-shrink-0 flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold" style={{ background: tA?.color ?? '#64748b' }}>{tA?.logo}</div>
                            <span className="text-xs sm:text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>{tA?.name}</span>
                            <span className="text-[10px] sm:text-xs text-muted">vs</span>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded flex-shrink-0 flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold" style={{ background: tB?.color ?? '#64748b' }}>{tB?.logo}</div>
                            <span className="text-xs sm:text-sm font-medium truncate" style={{ color: 'var(--color-text)' }}>{tB?.name}</span>
                          </div>
                        </div>

                        {/* Score (if played) */}
                        {(m.status === 'live' || m.status === 'completed') && (
                          <div className="font-bold text-xs sm:text-sm flex-shrink-0" style={{ color: 'var(--color-text)' }}>
                            {m.scoreA}–{m.scoreB}
                          </div>
                        )}

                        {/* Status + Admin edit */}
                        <div className="flex-shrink-0 flex items-center gap-1 sm:gap-2">
                          <div className="hidden sm:flex items-center gap-1 text-xs text-muted">
                            <MapPin className="w-3 h-3" />{m.court}
                          </div>
                          {m.status === 'live' ? <LiveBadge size="sm" /> :
                            <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium capitalize"
                              style={{ background: `${STATUS_COLOR[m.status]}18`, color: STATUS_COLOR[m.status] }}>
                              {m.status}
                            </span>}
                          {isAdmin && m.status !== 'completed' && (
                            <button onClick={() => openEdit(m.id)}
                              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-brand-blue/10 transition-colors"
                              title="Edit schedule">
                              <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                            </button>
                          )}
                          {isAdmin && m.status === 'completed' && (
                            <button onClick={() => { deleteMatch(m.id); toast.success('Match deleted'); }}
                              className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors"
                              title="Delete match">
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {sorted.length === 0 && (
        <div className="surface rounded-2xl p-12 text-center text-muted">No matches scheduled</div>
      )}

      {/* Add / Edit Match Modal */}
      {modal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={closeModal}>
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="surface rounded-3xl p-6 w-full max-w-sm max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>
                {modal === 'addMatch' ? 'Add Match' : 'Edit Match'}
              </h3>
              <button onClick={closeModal} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/10">
                <X className="w-4 h-4 text-muted" />
              </button>
            </div>

            <div className="space-y-3">
              {modal === 'addMatch' && <>
                <select value={form.game ?? ''} onChange={e => setForm({ ...form, game: e.target.value, teamAId: '', teamBId: '' })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle}>
                  <option value="">Select Game *</option>
                  <option value="carrom">Carrom</option>
                  <option value="sequence">Sequence</option>
                </select>
                {form.game && <>
                  <select value={form.teamAId ?? ''} onChange={e => setForm({ ...form, teamAId: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle}>
                    <option value="">Team A *</option>
                    {teams.filter(t => t.game === form.game && t.id !== form.teamBId).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                  <select value={form.teamBId ?? ''} onChange={e => setForm({ ...form, teamBId: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle}>
                    <option value="">Team B *</option>
                    {teams.filter(t => t.game === form.game && t.id !== form.teamAId).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </>}
              </>}

              {modal === 'editMatch' && form.matchId && (() => {
                const m = matches.find(x => x.id === form.matchId);
                const tA = getTeam(m?.teamAId ?? '');
                const tB = getTeam(m?.teamBId ?? '');
                return (
                  <div className="px-4 py-3 rounded-xl text-sm font-medium" style={{ background: 'var(--color-surface-2)', color: 'var(--color-text)' }}>
                    {tA?.name} vs {tB?.name}
                    <span className="text-xs text-muted ml-2 capitalize">({m?.game})</span>
                  </div>
                );
              })()}

              <div>
                <label className="text-xs text-muted mb-1 block">Round</label>
                <input placeholder="e.g. Group Stage, Quarter Final" value={form.round ?? ''} onChange={e => setForm({ ...form, round: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
              </div>
              <div>
                <label className="text-xs text-muted mb-1 block">Court / Venue</label>
                <input placeholder="e.g. Court 1, Main Hall" value={form.court ?? ''} onChange={e => setForm({ ...form, court: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
              </div>
              <div>
                <label className="text-xs text-muted mb-1 block">Date & Time</label>
                <input type="datetime-local" value={form.scheduledAt ?? ''} onChange={e => setForm({ ...form, scheduledAt: e.target.value })} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={closeModal} className="flex-1 py-3 rounded-xl border text-sm font-medium" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>Cancel</button>
              <button onClick={handleSubmit} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)' }}>
                {modal === 'addMatch' ? 'Schedule Match' : 'Update Schedule'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
}
