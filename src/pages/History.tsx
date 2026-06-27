import { motion } from 'framer-motion';
import { Trophy, Users, BarChart3 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { HISTORY } from '../data/mockData';

export default function History() {
  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-7 h-7 text-yellow-500" />
          <h1 className="font-display font-bold text-3xl gradient-text">Tournament History</h1>
        </div>
        <p className="text-muted text-sm">{HISTORY.length} years of JOSH Tournament legacy</p>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {HISTORY.map((h, i) => (
          <motion.div key={h.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="surface rounded-3xl overflow-hidden"
          >
            <div className="grid md:grid-cols-3 gap-0">
              {/* Photo */}
              <div className="relative overflow-hidden">
                <img src={h.photoUrl} alt={h.tournamentName} className="w-full h-48 md:h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center justify-center md:block">
                  <div className="p-4 flex flex-col justify-end h-full">
                    <div className="font-display font-black text-5xl text-white/20">{h.year}</div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="md:col-span-2 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs text-brand-blue font-semibold uppercase tracking-wide mb-1">{h.year}</div>
                    <h2 className="font-display font-bold text-xl" style={{ color: 'var(--color-text)' }}>{h.tournamentName}</h2>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(234,179,8,0.15)' }}>🏆</div>
                </div>

                {/* Champion + Runner-up */}
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

                {/* MVP */}
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <span className="text-muted">🌟 MVP:</span>
                  <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{h.mvp}</span>
                </div>

                {/* Stats */}
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
            { label: 'Tournaments', value: HISTORY.length, icon: '🏆' },
            { label: 'Total Teams', value: HISTORY.reduce((a,h)=>a+h.totalTeams,0), icon: '🏅' },
            { label: 'Total Matches', value: HISTORY.reduce((a,h)=>a+h.totalMatches,0), icon: '🎯' },
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
    </Layout>
  );
}
