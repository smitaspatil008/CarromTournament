import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Trophy, CircleDot } from 'lucide-react';
import type { Match, Team, Player } from '../../types';
import LiveBadge from '../ui/LiveBadge';
import AnimatedScore from '../ui/AnimatedScore';

interface Props {
  match: Match;
  teamA: Team;
  teamB: Team;
  playerA?: Player;
  playerB?: Player;
  compact?: boolean;
}

function Avatar({ src, name, color }: { src?: string; name: string; color: string }) {
  return (
    <div className="w-10 h-10 rounded-full border-2 overflow-hidden flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{ borderColor: color, background: color }}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : name[0]}
    </div>
  );
}

function TeamLogoCircle({ team }: { team: Team }) {
  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-lg" style={{ background: team.color }}>
      {team.logo}
    </div>
  );
}

export default function MatchCard({ match, teamA, teamB, playerA, playerB, compact }: Props) {
  const isLive = match.status === 'live';
  const isDone = match.status === 'completed';
  const time = new Date(match.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = new Date(match.scheduledAt).toLocaleDateString([], { month: 'short', day: 'numeric' });

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 16px 40px rgba(37,99,235,0.15)' }}
      className={`surface rounded-2xl overflow-hidden ${isLive ? 'ring-2 ring-red-500/50' : ''}`}
    >
      {/* Top bar */}
      <div className="px-4 py-2 flex items-center justify-between" style={{ background: isLive ? 'rgba(239,68,68,0.08)' : 'var(--color-surface-2)' }}>
        <div className="flex items-center gap-2">
          {isLive && <LiveBadge size="sm" />}
          {!isLive && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isDone ? 'bg-green-500/15 text-green-500' : 'bg-blue-500/15 text-blue-500'}`}>
              {isDone ? 'Completed' : 'Upcoming'}
            </span>
          )}
          <span className="text-xs text-muted capitalize">{match.game} · {match.round}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted">
          <MapPin className="w-3 h-3" />
          {match.court}
        </div>
      </div>

      <Link to={`/match/${match.id}`} className="block p-4 hover:bg-brand-blue/5 transition-colors">
        <div className="flex items-center gap-3">
          {/* Team A */}
          <div className="flex-1 flex items-center gap-3">
            <TeamLogoCircle team={teamA} />
            <div className="min-w-0">
              <div className="font-semibold text-sm truncate" style={{ color: match.winner === teamA.id ? teamA.color : 'var(--color-text)' }}>
                {teamA.name}
              </div>
              {playerA && <div className="text-xs text-muted truncate">{playerA.name}</div>}
              {match.winner === teamA.id && <div className="text-[10px] font-bold text-yellow-500">WINNER 🏆</div>}
            </div>
          </div>

          {/* Scores */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <AnimatedScore score={match.scoreA} color={match.winner === teamA.id ? teamA.color : 'var(--color-text)'} size="md" />
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xs text-muted font-medium">VS</span>
              {isLive && (
                <motion.span
                  animate={{ opacity: [1,0,1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[10px] text-red-500 font-bold"
                >●</motion.span>
              )}
            </div>
            <AnimatedScore score={match.scoreB} color={match.winner === teamB.id ? teamB.color : 'var(--color-text)'} size="md" />
          </div>

          {/* Team B */}
          <div className="flex-1 flex items-center justify-end gap-3">
            <div className="min-w-0 text-right">
              <div className="font-semibold text-sm truncate" style={{ color: match.winner === teamB.id ? teamB.color : 'var(--color-text)' }}>
                {teamB.name}
              </div>
              {playerB && <div className="text-xs text-muted truncate">{playerB.name}</div>}
              {match.winner === teamB.id && <div className="text-[10px] font-bold text-yellow-500">WINNER 🏆</div>}
            </div>
            <TeamLogoCircle team={teamB} />
          </div>
        </div>

        {!compact && (
          <div className="flex items-center gap-3 mt-3 pt-3 border-t text-xs text-muted" style={{ borderColor: 'var(--color-border)' }}>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{date} {time}</span>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
