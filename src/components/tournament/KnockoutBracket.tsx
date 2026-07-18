import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import type { Match, Team } from '../../types';
import LiveBadge from '../ui/LiveBadge';
import { getMatchLabel } from '../../utils/matchLabels';

interface Props {
  matches: Match[];
  teams: Team[];
}

const ROUND_COLORS: Record<string, { bg: string; label: string }> = {
  r16:   { bg: 'bg-blue-600',   label: 'Round of 16' },
  qf:    { bg: 'bg-purple-600', label: 'Quarter Finals' },
  sf:    { bg: 'bg-orange-500', label: 'Semi Finals' },
  final: { bg: 'bg-yellow-500', label: 'Final' },
};

const CARD_H = 56;
const GAP = 8;

function MatchCard({ match, teamA, teamB, round, isChampion }: {
  match: Match; teamA?: Team; teamB?: Team; round: string; isChampion?: boolean;
}) {
  const isLive = match.status === 'live';
  const isDone = match.status === 'completed';
  const rc = ROUND_COLORS[round] ?? ROUND_COLORS.r16;

  const renderTeam = (team: Team | undefined, score: number, isWinner: boolean, pos: 'top' | 'bottom') => (
    <div className={`flex items-center justify-between px-2 py-1 ${pos === 'top' ? 'border-b border-gray-100' : ''} ${isWinner && isDone ? 'bg-green-50' : ''}`}>
      <div className="flex items-center gap-1.5 min-w-0">
        {team ? (
          <>
            <span className="w-5 h-5 rounded text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0 shadow-sm"
              style={{ background: isWinner && isDone ? '#059669' : team.color }}>
              {team.logo}
            </span>
            <span className={`truncate text-[10px] sm:text-[11px] ${isWinner && isDone ? 'font-bold text-green-700' : 'font-medium text-gray-800'}`}>
              {team.name}
            </span>
          </>
        ) : (
          <>
            <span className="w-5 h-5 rounded bg-gray-100 text-gray-400 text-[9px] font-bold flex items-center justify-center flex-shrink-0">?</span>
            <span className="text-gray-400 italic text-[10px] sm:text-[11px]">TBD</span>
          </>
        )}
      </div>
      <span className={`font-bold tabular-nums text-[10px] sm:text-xs ml-1 ${isWinner && isDone ? 'text-green-700' : 'text-gray-700'}`}>
        {isDone || isLive ? score : '-'}
      </span>
    </div>
  );

  return (
    <Link to={`/match/${match.id}`} className="block">
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className={`rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
          isDone ? 'ring-1 ring-green-300' :
          isLive ? 'ring-2 ring-red-500 shadow-red-100' :
          'ring-1 ring-gray-200'
        } ${isChampion ? 'ring-2 ring-yellow-400 shadow-yellow-100' : ''}`}
      >
        <div className={`px-2 py-0.5 text-[8px] sm:text-[9px] font-bold text-white flex items-center justify-between ${rc.bg}`}>
          <span>{getMatchLabel(match)}</span>
          {isLive && <LiveBadge size="sm" />}
          {isDone && !isChampion && <span className="text-green-200">✓</span>}
          {isChampion && <span>🏆</span>}
        </div>
        <div className="bg-white">
          {renderTeam(teamA, match.scoreA, match.winner === teamA?.id, 'top')}
          {renderTeam(teamB, match.scoreB, match.winner === teamB?.id, 'bottom')}
        </div>
      </motion.div>
    </Link>
  );
}

function getCardTop(roundIndex: number, posInRound: number): number {
  if (roundIndex === 0) {
    return posInRound * (CARD_H + GAP);
  }
  const prevTop1 = getCardTop(roundIndex - 1, posInRound * 2);
  const prevTop2 = getCardTop(roundIndex - 1, posInRound * 2 + 1);
  return (prevTop1 + prevTop2) / 2;
}

export default function KnockoutBracket({ matches, teams }: Props) {
  const getTeam = (id: string) => teams.find((t) => t.id === id);
  const getMatch = (id: string) => matches.find((m) => m.id === id);

  const r16 = ['m1','m2','m3','m4','m5','m6','m7','m8'].map(getMatch).filter(Boolean) as Match[];
  const qf  = ['m9','m10','m11','m12'].map(getMatch).filter(Boolean) as Match[];
  const sf  = ['m13','m14'].map(getMatch).filter(Boolean) as Match[];
  const fin = getMatch('m15');
  const champion = fin?.winner ? getTeam(fin.winner) : null;

  const getTeamForMatch = (match: Match, side: 'A' | 'B') => {
    const teamId = side === 'A' ? match.teamAId : match.teamBId;
    const team = getTeam(teamId);
    const roundOrder = ['Round of 16', 'Quarter Finals', 'Semi Finals', 'Final'];
    const roundIdx = roundOrder.indexOf(match.round);
    if (roundIdx <= 0) return team;
    const prevMatches = matches.filter(m => m.round === roundOrder[roundIdx - 1]);
    if (prevMatches.some(m => m.winner === teamId)) return team;
    return undefined;
  };

  const totalH = 8 * CARD_H + 7 * GAP;
  const colW = 160;
  const colGap = 16;
  const headerH = 28;

  const rounds: { key: string; round: string; matches: Match[]; roundIdx: number }[] = [
    { key: 'r16', round: 'r16', matches: r16, roundIdx: 0 },
    { key: 'qf', round: 'qf', matches: qf, roundIdx: 1 },
    { key: 'sf', round: 'sf', matches: sf, roundIdx: 2 },
  ];
  if (fin) rounds.push({ key: 'final', round: 'final', matches: [fin], roundIdx: 3 });

  const totalCols = rounds.length + (champion ? 1 : 0);
  const totalW = totalCols * colW + (totalCols - 1) * colGap;

  return (
    <div className="overflow-x-auto pb-4 -mx-3 sm:-mx-6 px-3 sm:px-6">
      <div className="relative" style={{ width: totalW, height: totalH + headerH }}>
        {rounds.map((r, ci) => {
          const rc = ROUND_COLORS[r.round];
          const x = ci * (colW + colGap);
          return (
            <div key={r.key}>
              {/* Round header */}
              <div className="absolute" style={{ left: x, top: 0, width: colW }}>
                <div className="flex justify-center">
                  <span className={`text-[9px] sm:text-[10px] font-bold px-3 py-1 rounded-full text-white ${rc.bg}`}>
                    {rc.label}
                  </span>
                </div>
              </div>
              {/* Cards */}
              {r.matches.map((m, i) => {
                const top = getCardTop(r.roundIdx, i) + headerH;
                return (
                  <div key={m.id} className="absolute" style={{ left: x, top, width: colW }}>
                    <MatchCard match={m} round={r.round}
                      teamA={r.roundIdx === 0 ? getTeam(m.teamAId) : getTeamForMatch(m, 'A')}
                      teamB={r.roundIdx === 0 ? getTeam(m.teamBId) : getTeamForMatch(m, 'B')}
                      isChampion={r.round === 'final' && m.status === 'completed'}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Champion */}
        {champion && (
          <div className="absolute" style={{ left: rounds.length * (colW + colGap), top: headerH + getCardTop(3, 0) - 20, width: colW }}>
            <div className="flex justify-center mb-2">
              <span className="text-[9px] sm:text-[10px] font-bold px-3 py-1 rounded-full text-white bg-yellow-500">Champion</span>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="rounded-2xl p-3 text-center bg-gradient-to-b from-yellow-50 to-amber-50 border-2 border-yellow-300 shadow-lg shadow-yellow-100"
            >
              <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm mx-auto mb-1 shadow-md" style={{ background: champion.color }}>
                {champion.logo}
              </div>
              <div className="font-bold text-[10px] text-yellow-700">{champion.name}</div>
              <div className="text-[9px] text-yellow-600 font-semibold mt-0.5">CHAMPION</div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
