import { motion } from 'framer-motion';
import { Users, Trophy, TrendingUp } from 'lucide-react';
import type { Team, Player } from '../../types';

interface Props { team: Team; players?: Player[]; delay?: number; }

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-green-500/15 text-green-500',
  eliminated: 'bg-red-500/15 text-red-400',
  champion: 'bg-yellow-500/15 text-yellow-500',
  'runner-up': 'bg-blue-500/15 text-blue-400',
};

export default function TeamCard({ team, players = [], delay = 0 }: Props) {
  const winRate = team.wins + team.losses > 0
    ? Math.round((team.wins / (team.wins + team.losses)) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -5, boxShadow: `0 20px 40px ${team.color}30` }}
      className="surface rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="h-2" style={{ background: `linear-gradient(90deg, ${team.color}, #7C3AED)` }} />
      <div className="p-5">
        {/* Logo + name */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-display font-bold text-xl shadow-lg"
              style={{ background: team.color, boxShadow: `0 4px 16px ${team.color}60` }}
            >
              {team.logo}
            </div>
            <div>
              <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>{team.name}</h3>
              <p className="text-xs text-muted">{team.department}</p>
              <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 capitalize ${STATUS_STYLES[team.status]}`}>
                {team.status}
              </span>
            </div>
          </div>
          {team.status === 'champion' && <Trophy className="w-6 h-6 text-yellow-500" />}
        </div>

        {/* Players */}
        {players.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4">
            {players.slice(0, 4).map((p, i) => (
              <div key={p.id} className="w-8 h-8 rounded-full overflow-hidden border-2" style={{ borderColor: team.color, marginLeft: i > 0 ? '-8px' : '0' }}>
                <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
              </div>
            ))}
            <span className="text-xs text-muted ml-1">{players.length} players</span>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="surface-2 rounded-xl p-3 text-center">
            <div className="font-bold text-xl text-green-500">{team.wins}</div>
            <div className="text-[10px] text-muted">Wins</div>
          </div>
          <div className="surface-2 rounded-xl p-3 text-center">
            <div className="font-bold text-xl text-red-500">{team.losses}</div>
            <div className="text-[10px] text-muted">Losses</div>
          </div>
          <div className="surface-2 rounded-xl p-3 text-center">
            <div className="font-bold text-xl" style={{ color: team.color }}>{team.points}</div>
            <div className="text-[10px] text-muted">Points</div>
          </div>
        </div>

        {/* Win rate */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted flex items-center gap-1"><TrendingUp className="w-3 h-3" />Win rate</span>
            <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{winRate}%</span>
          </div>
          <div className="h-1.5 rounded-full" style={{ background: 'var(--color-surface-2)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${winRate}%` }}
              transition={{ duration: 0.8, delay: delay + 0.3 }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${team.color}, #7C3AED)` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
