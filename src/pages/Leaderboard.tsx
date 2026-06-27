import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Medal } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useTournamentStore } from '../store/tournamentStore';
import type { GameType } from '../types';

const MEDAL_ICONS = ['🥇', '🥈', '🥉'];

export default function Leaderboard() {
  const { teams } = useTournamentStore();
  const [game, setGame] = useState<GameType>('carrom');

  const gameTeams = [...teams]
    .filter((t) => t.game === game)
    .sort((a, b) => b.points - a.points || b.wins - a.wins)
    .map((t, i) => ({ ...t, rank: i + 1 }));

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-7 h-7 text-brand-orange" />
          <h1 className="font-display font-bold text-3xl gradient-text">Leaderboard</h1>
        </div>
        <p className="text-muted text-sm">Team rankings for Josh 2026</p>
      </div>

      {/* Game tabs */}
      <div className="flex gap-2 mb-8">
        {(['carrom', 'sequence'] as const).map((g) => (
          <button key={g} onClick={() => setGame(g)}
            className="px-6 py-3 rounded-xl text-sm font-semibold capitalize transition-colors"
            style={{
              background: game === g ? 'linear-gradient(135deg,#2563EB,#7C3AED)' : 'var(--color-surface)',
              color: game === g ? 'white' : 'var(--color-text-muted)',
              border: game === g ? 'none' : '1px solid var(--color-border)',
            }}>
            {g === 'carrom' ? '🎯 Carrom' : '🃏 Sequence'}
          </button>
        ))}
      </div>

      {/* Top 3 Podium */}
      <div className="mb-10">
        <h2 className="font-semibold mb-4 capitalize" style={{ color: 'var(--color-text)' }}>{game} Podium</h2>
        <div className="flex items-end justify-center gap-4 h-48">
          {[1, 0, 2].map((idx) => {
            const t = gameTeams[idx];
            if (!t) return null;
            const heights = [32, 40, 24];
            return (
              <motion.div key={t.id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, type: 'spring', stiffness: 200 }}
                className="flex flex-col items-center"
              >
                <div className="text-3xl mb-1">{MEDAL_ICONS[idx]}</div>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-2"
                  style={{ background: t.color, boxShadow: idx===0?`0 0 20px ${t.color}60`:'' }}>
                  {t.logo}
                </div>
                <div className="text-xs font-semibold text-center max-w-[80px] leading-tight" style={{ color: 'var(--color-text)' }}>{t.name}</div>
                <div className="text-[10px] text-muted">{t.points} pts</div>
                <div className="mt-2 rounded-t-xl flex items-end justify-center font-bold text-white text-sm"
                  style={{ width: 80, height: heights[idx] * 3, background: idx===0?'linear-gradient(180deg,#fbbf24,#d97706)':idx===1?'linear-gradient(180deg,#2563EB,#1d4ed8)':'linear-gradient(180deg,#7C3AED,#5b21b6)' }}>
                  #{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Rankings Table */}
      <div>
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
          <Medal className="w-5 h-5 text-yellow-500" /> <span className="capitalize">{game}</span> Team Rankings
        </h2>
        <div className="surface rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead style={{ background: 'var(--color-surface-2)' }}>
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">#</th>
                <th className="text-left px-2 py-3 text-xs font-semibold text-muted">Team</th>
                <th className="text-center px-2 py-3 text-xs font-semibold text-muted">W</th>
                <th className="text-center px-2 py-3 text-xs font-semibold text-muted">L</th>
                <th className="text-center px-2 py-3 text-xs font-semibold text-muted">Pts</th>
                <th className="text-center px-2 py-3 text-xs font-semibold text-muted">Status</th>
              </tr>
            </thead>
            <tbody>
              {gameTeams.map((t, i) => (
                <motion.tr key={t.id}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-t hover:bg-brand-blue/5 transition-colors"
                  style={{ borderColor: 'var(--color-border)' }}>
                  <td className="px-4 py-3">
                    {i < 3 ? <span className="text-lg">{MEDAL_ICONS[i]}</span> :
                      <span className="text-muted text-sm">{t.rank}</span>}
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: t.color }}>{t.logo}</div>
                      <div className="font-medium text-xs" style={{ color: 'var(--color-text)' }}>{t.name}</div>
                    </div>
                  </td>
                  <td className="text-center px-2 py-3 font-semibold text-green-500">{t.wins}</td>
                  <td className="text-center px-2 py-3 font-semibold text-red-400">{t.losses}</td>
                  <td className="text-center px-2 py-3">
                    <span className="font-bold text-brand-blue">{t.points}</span>
                  </td>
                  <td className="text-center px-2 py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      t.status === 'champion' ? 'bg-yellow-500/15 text-yellow-500' :
                      t.status === 'eliminated' ? 'bg-red-500/15 text-red-400' :
                      t.status === 'runner-up' ? 'bg-blue-500/15 text-blue-400' :
                      'bg-green-500/15 text-green-500'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
