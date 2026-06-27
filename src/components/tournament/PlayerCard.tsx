import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Player, Team } from '../../types';

interface Props { player: Player; team?: Team; delay?: number; }

export default function PlayerCard({ player, team, delay = 0 }: Props) {
  const winPct = player.gamesPlayed > 0 ? Math.round((player.wins / player.gamesPlayed) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(37,99,235,0.2)' }}
      className="surface rounded-2xl p-5 flex flex-col items-center text-center cursor-pointer"
    >
      {/* Photo */}
      <div className="relative mb-3">
        <div className="w-20 h-20 rounded-full overflow-hidden border-[3px]" style={{ borderColor: team?.color ?? '#2563EB' }}>
          <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
        </div>
        {team && (
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold border-2" style={{ background: team.color, borderColor: 'var(--color-surface)' }}>
            {team.logo}
          </div>
        )}
      </div>

      <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{player.name}</h3>
      <p className="text-xs text-muted mt-0.5">{player.department}</p>
      {team && <p className="text-xs mt-0.5" style={{ color: team.color }}>{team.name}</p>}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <div className="font-bold text-lg" style={{ color: 'var(--color-text)' }}>{player.gamesPlayed}</div>
          <div className="text-[10px] text-muted">Played</div>
        </div>
        <div>
          <div className="font-bold text-lg text-green-500">{player.wins}</div>
          <div className="text-[10px] text-muted">Won</div>
        </div>
        <div>
          <div className="font-bold text-lg text-red-500">{player.losses}</div>
          <div className="text-[10px] text-muted">Lost</div>
        </div>
      </div>

      {/* Win % */}
      <div className="w-full mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted">Win Rate</span>
          <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{winPct}%</span>
        </div>
        <div className="h-1.5 rounded-full" style={{ background: 'var(--color-surface-2)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${winPct}%` }}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${team?.color ?? '#2563EB'}, #7C3AED)` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
