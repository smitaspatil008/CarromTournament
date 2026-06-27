import { motion } from 'framer-motion';
import { TrendingUp, Medal } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useTournamentStore } from '../store/tournamentStore';

const MEDAL_COLORS = ['#fbbf24', '#94a3b8', '#b45309'];
const MEDAL_ICONS = ['🥇', '🥈', '🥉'];

export default function Leaderboard() {
  const { teams, players } = useTournamentStore();

  const teamLeader = [...teams]
    .sort((a, b) => b.points - a.points || b.wins - a.wins)
    .map((t, i) => ({ ...t, rank: i + 1 }));

  const playerLeader = [...players]
    .sort((a, b) => b.wins - a.wins || (b.wins/(b.gamesPlayed||1)) - (a.wins/(a.gamesPlayed||1)))
    .map((p, i) => ({ ...p, rank: i + 1, winPct: p.gamesPlayed > 0 ? Math.round((p.wins/p.gamesPlayed)*100) : 0 }));

  const getTeam = (teamId: string) => teams.find((t) => t.id === teamId);

  return (
    <Layout>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-7 h-7 text-brand-orange" />
          <h1 className="font-display font-bold text-3xl gradient-text">Leaderboard</h1>
        </div>
        <p className="text-muted text-sm">Rankings across all JOSH 2026 games</p>
      </div>

      {/* Top 3 Podium */}
      <div className="mb-10">
        <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Team Podium</h2>
        <div className="flex items-end justify-center gap-4 h-48">
          {[1, 0, 2].map((idx) => {
            const t = teamLeader[idx];
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
                <div className={`mt-2 rounded-t-xl flex items-end justify-center font-bold text-white text-sm`}
                  style={{ width: 80, height: heights[idx] * 3, background: idx===0?'linear-gradient(180deg,#fbbf24,#d97706)':idx===1?'linear-gradient(180deg,#2563EB,#1d4ed8)':'linear-gradient(180deg,#7C3AED,#5b21b6)' }}>
                  #{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Team leaderboard */}
        <div>
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
            <Medal className="w-5 h-5 text-yellow-500" /> Team Rankings
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
                </tr>
              </thead>
              <tbody>
                {teamLeader.map((t, i) => (
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
                        <div>
                          <div className="font-medium text-xs" style={{ color: 'var(--color-text)' }}>{t.name}</div>
                          <div className="text-[10px] text-muted capitalize">{t.game}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center px-2 py-3 font-semibold text-green-500">{t.wins}</td>
                    <td className="text-center px-2 py-3 font-semibold text-red-400">{t.losses}</td>
                    <td className="text-center px-2 py-3">
                      <span className="font-bold text-brand-blue">{t.points}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Player leaderboard */}
        <div>
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
            👥 Player Rankings
          </h2>
          <div className="surface rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead style={{ background: 'var(--color-surface-2)' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted">#</th>
                  <th className="text-left px-2 py-3 text-xs font-semibold text-muted">Player</th>
                  <th className="text-center px-2 py-3 text-xs font-semibold text-muted">W</th>
                  <th className="text-center px-2 py-3 text-xs font-semibold text-muted">Win%</th>
                </tr>
              </thead>
              <tbody>
                {playerLeader.slice(0, 20).map((p, i) => {
                  const team = getTeam(p.teamId);
                  return (
                    <motion.tr key={p.id}
                      initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-t hover:bg-brand-blue/5 transition-colors"
                      style={{ borderColor: 'var(--color-border)' }}>
                      <td className="px-4 py-3">
                        {i < 3 ? <span className="text-lg">{MEDAL_ICONS[i]}</span> :
                          <span className="text-muted text-sm">{p.rank}</span>}
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          <img src={p.photo} alt={p.name} className="w-7 h-7 rounded-full object-cover" />
                          <div>
                            <div className="font-medium text-xs" style={{ color: 'var(--color-text)' }}>{p.name}</div>
                            <div className="text-[10px] text-muted">{p.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center px-2 py-3 font-semibold text-green-500">{p.wins}</td>
                      <td className="text-center px-2 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <div className="w-12 h-1.5 rounded-full" style={{ background: 'var(--color-surface-2)' }}>
                            <div className="h-full rounded-full" style={{ width: `${p.winPct}%`, background: team?.color ?? '#2563EB' }} />
                          </div>
                          <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>{p.winPct}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
