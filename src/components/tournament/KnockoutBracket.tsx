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
    <Link to={`/match/${match.id}`} className="block w-[150px] sm:w-[180px]">
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

function BracketPair({ top, bottom, next }: { top: React.ReactNode; bottom: React.ReactNode; next: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 sm:gap-5">
      <div className="flex flex-col gap-2">
        {top}
        {bottom}
      </div>
      <div className="flex items-center">
        {next}
      </div>
    </div>
  );
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

  const r16Card = (id: string) => {
    const m = getMatch(id);
    if (!m) return null;
    return <MatchCard match={m} round="r16" teamA={getTeam(m.teamAId)} teamB={getTeam(m.teamBId)} />;
  };

  const qfCard = (id: string) => {
    const m = getMatch(id);
    if (!m) return null;
    return <MatchCard match={m} round="qf" teamA={getTeamForMatch(m, 'A')} teamB={getTeamForMatch(m, 'B')} />;
  };

  const sfCard = (id: string) => {
    const m = getMatch(id);
    if (!m) return null;
    return <MatchCard match={m} round="sf" teamA={getTeamForMatch(m, 'A')} teamB={getTeamForMatch(m, 'B')} />;
  };

  const finalCard = fin ? (
    <MatchCard match={fin} round="final"
      teamA={getTeamForMatch(fin, 'A')} teamB={getTeamForMatch(fin, 'B')}
      isChampion={fin.status === 'completed'} />
  ) : null;

  return (
    <div className="overflow-x-auto pb-4 -mx-3 sm:-mx-6 px-3 sm:px-6">
      <div className="inline-block">
        {/* Round headers */}
        <div className="flex items-center mb-3 gap-3 sm:gap-5">
          <div className="w-[150px] sm:w-[180px] flex justify-center">
            <span className={`text-[9px] sm:text-[10px] font-bold px-3 py-1 rounded-full text-white ${ROUND_COLORS.r16.bg}`}>Round of 16</span>
          </div>
          <div className="w-[150px] sm:w-[180px] flex justify-center">
            <span className={`text-[9px] sm:text-[10px] font-bold px-3 py-1 rounded-full text-white ${ROUND_COLORS.qf.bg}`}>Quarter Finals</span>
          </div>
          <div className="w-[150px] sm:w-[180px] flex justify-center">
            <span className={`text-[9px] sm:text-[10px] font-bold px-3 py-1 rounded-full text-white ${ROUND_COLORS.sf.bg}`}>Semi Finals</span>
          </div>
          <div className="w-[150px] sm:w-[180px] flex justify-center">
            <span className={`text-[9px] sm:text-[10px] font-bold px-3 py-1 rounded-full text-white ${ROUND_COLORS.final.bg}`}>Final</span>
          </div>
          {champion && (
            <div className="w-[120px] sm:w-[140px] flex justify-center">
              <span className="text-[9px] sm:text-[10px] font-bold px-3 py-1 rounded-full text-white bg-yellow-500">Champion</span>
            </div>
          )}
        </div>

        {/* Nested bracket: R16 → QF → SF → Final */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Top half: SF1 ← QF1,QF2 ← M1-M4 */}
          <div className="flex flex-col gap-6">
            <BracketPair
              top={
                <BracketPair
                  top={r16Card('m1')}
                  bottom={r16Card('m2')}
                  next={qfCard('m9')}
                />
              }
              bottom={
                <BracketPair
                  top={r16Card('m3')}
                  bottom={r16Card('m4')}
                  next={qfCard('m10')}
                />
              }
              next={sfCard('m13')}
            />

            {/* Bottom half: SF2 ← QF3,QF4 ← M5-M8 */}
            <BracketPair
              top={
                <BracketPair
                  top={r16Card('m5')}
                  bottom={r16Card('m6')}
                  next={qfCard('m11')}
                />
              }
              bottom={
                <BracketPair
                  top={r16Card('m7')}
                  bottom={r16Card('m8')}
                  next={qfCard('m12')}
                />
              }
              next={sfCard('m14')}
            />
          </div>

          {/* Final */}
          <div className="flex items-center">
            {finalCard}
          </div>

          {/* Champion */}
          {champion && (
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="w-[120px] sm:w-[140px] rounded-2xl p-3 text-center bg-gradient-to-b from-yellow-50 to-amber-50 border-2 border-yellow-300 shadow-lg shadow-yellow-100"
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
    </div>
  );
}
