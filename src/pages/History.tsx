import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Plus, Trash2, X } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useTournamentStore } from '../store/tournamentStore';
import type { HistoryEntry } from '../types';
import toast from 'react-hot-toast';

export default function History() {
  const { history, isAdmin, addHistoryEntry, deleteHistoryEntry } = useTournamentStore();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<Partial<HistoryEntry>>({ year: new Date().getFullYear(), stats: {} });

  const inputStyle = {
    background: 'var(--color-surface-2)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text)',
  };

  const handleAdd = () => {
    if (!form.year || !form.tournamentName || !form.champion) {
      toast.error('Fill in required fields');
      return;
    }
    addHistoryEntry({
      year: form.year,
      tournamentName: form.tournamentName,
      champion: form.champion ?? '',
      runnerUp: form.runnerUp ?? '',
      mvp: form.mvp ?? '',
      totalTeams: form.totalTeams ?? 0,
      totalMatches: form.totalMatches ?? 0,
      photoUrl: form.photoUrl ?? 'https://picsum.photos/seed/hist/600/400',
      stats: form.stats ?? {},
    });
    setShowAdd(false);
    setForm({ year: new Date().getFullYear(), stats: {} });
    toast.success('Added tournament history');
  };

  return (
    <Layout>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-7 h-7 text-yellow-500" />
            <h1 className="font-display font-bold text-3xl gradient-text">Tournament History</h1>
          </div>
          <p className="text-muted text-sm">{history.length} years of Josh Tournament legacy</p>
        </div>
        {isAdmin && (
          <button onClick={() => setShowAdd(true)}
            className="btn-primary flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> Add Year
          </button>
        )}
      </div>

      <div className="space-y-8">
        {history.map((h, i) => (
          <motion.div key={h.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(i * 0.1, 0.5) }}
            className="surface rounded-3xl overflow-hidden relative"
          >
            {isAdmin && (
              <button onClick={() => { deleteHistoryEntry(h.year); toast.success('Deleted'); }}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <div className="grid md:grid-cols-3 gap-0">
              <div className="relative overflow-hidden">
                <img src={h.photoUrl} alt={h.tournamentName} className="w-full h-48 md:h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center justify-center md:block">
                  <div className="p-4 flex flex-col justify-end h-full">
                    <div className="font-display font-black text-5xl text-white/20">{h.year}</div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs text-brand-blue font-semibold uppercase tracking-wide mb-1">{h.year}</div>
                    <h2 className="font-display font-bold text-xl" style={{ color: 'var(--color-text)' }}>{h.tournamentName}</h2>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(234,179,8,0.15)' }}>🏆</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="rounded-xl p-4" style={{ background: 'linear-gradient(135deg,rgba(234,179,8,0.12),rgba(249,115,22,0.08))' }}>
                    <div className="text-xs text-yellow-500 font-semibold mb-1">🥇 Champion</div>
                    <div className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{h.champion}</div>
                  </div>
                  <div className="rounded-xl p-4" style={{ background: 'rgba(148,163,184,0.08)' }}>
                    <div className="text-xs text-muted font-semibold mb-1">🥈 Runner-up</div>
                    <div className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{h.runnerUp}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <span className="text-muted">🌟 MVP:</span>
                  <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{h.mvp}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="surface-2 rounded-xl p-3 text-center">
                    <div className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>{h.totalTeams}</div>
                    <div className="text-[10px] text-muted">Teams</div>
                  </div>
                  <div className="surface-2 rounded-xl p-3 text-center">
                    <div className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>{h.totalMatches}</div>
                    <div className="text-[10px] text-muted">Matches</div>
                  </div>
                  {Object.entries(h.stats).slice(0, 1).map(([k, v]) => (
                    <div key={k} className="surface-2 rounded-xl p-3 text-center">
                      <div className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>{v}</div>
                      <div className="text-[10px] text-muted truncate">{k}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* All-time stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="mt-10 rounded-3xl p-8 text-center"
        style={{ background: 'linear-gradient(135deg,rgba(37,99,235,0.08),rgba(124,58,237,0.12),rgba(249,115,22,0.08))' }}>
        <h2 className="font-display font-bold text-2xl gradient-text mb-6">All-Time Records</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: 'Tournaments', value: history.length, icon: '🏆' },
            { label: 'Total Teams', value: history.reduce((a,h)=>a+h.totalTeams,0), icon: '🏅' },
            { label: 'Total Matches', value: history.reduce((a,h)=>a+h.totalMatches,0), icon: '🎯' },
            { label: 'Most Titles', value: 'Thunder Strikers', icon: '👑' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="font-display font-bold text-2xl" style={{ color: 'var(--color-text)' }}>{s.value}</div>
              <div className="text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Add Tournament Modal */}
      {showAdd && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setShowAdd(false)}>
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="surface rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>Add Tournament Year</h3>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/10">
                <X className="w-4 h-4 text-muted" />
              </button>
            </div>
            <div className="space-y-3">
              <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: +e.target.value })} placeholder="Year"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
              <input value={form.tournamentName ?? ''} onChange={(e) => setForm({ ...form, tournamentName: e.target.value })} placeholder="Tournament Name *"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
              <input value={form.champion ?? ''} onChange={(e) => setForm({ ...form, champion: e.target.value })} placeholder="Champion *"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
              <input value={form.runnerUp ?? ''} onChange={(e) => setForm({ ...form, runnerUp: e.target.value })} placeholder="Runner-up"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
              <input value={form.mvp ?? ''} onChange={(e) => setForm({ ...form, mvp: e.target.value })} placeholder="MVP"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" value={form.totalTeams ?? ''} onChange={(e) => setForm({ ...form, totalTeams: +e.target.value })} placeholder="Total Teams"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
                <input type="number" value={form.totalMatches ?? ''} onChange={(e) => setForm({ ...form, totalMatches: +e.target.value })} placeholder="Total Matches"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
              </div>
              <input value={form.photoUrl ?? ''} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} placeholder="Photo URL"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
              <div className="flex gap-3 mt-4">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-3 rounded-xl border text-sm font-medium" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>Cancel</button>
                <button onClick={handleAdd} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)' }}>Add</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
}
