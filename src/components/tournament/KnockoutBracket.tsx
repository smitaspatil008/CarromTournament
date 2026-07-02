import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import type { Match, Team } from '../../types';
import LiveBadge from '../ui/LiveBadge';

interface Props {
  matches: Match[];
  teams: Team[];
}

interface BracketMatchProps {
  match: Match;
  teamA?: Team;
  teamB?: Team;
  isChampion?: boolean;
}

function BracketMatchCard({ match, teamA, teamB, isChampion }: BracketMatchProps) {
  const isLive = match.status === 'live';
  const isDone = match.status === 'completed';
  const isUpcoming = match.status === 'upcoming';

  const teamAIsReal = !!teamA;
  const teamBIsReal = !!teamB;

  const renderTeamRow = (team: Team | undefined, score: number, isWinner: boolean, isTop: boolean) => {
    const hasBorder = isTop ? 'border-b border-gray-200' : '';
    const winBg = isWinner && isDone ? 'bg-green-50' : 'transparent';

    return (
      <div className={`flex items-center justify-between px-3 py-2 ${hasBorder} ${isWinner && isDone ? 'font-bold' : ''}`}
        style={{ background: winBg }}>
        <div className="flex items-center gap-1.5">
          {team ? (
            <>
              <span className="w-5 h-5 rounded text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0"
                style={{ background: isWinner && isDone ? '#059669' : team.color }}>
                {team.logo}
              </span>
              <span className="truncate max-w-[110px] sm:max-w-[120px]"
                style={{ color: isWinner && isDone ? '#059669' : '#111827' }}>
                {team.name}
              </span>
            </>
          ) : (
            <>
              <span className="w-5 h-5 rounded bg-gray-200 text-gray-400 text-[9px] font-bold flex items-center justify-center flex-shrink-0">?</span>
              <span className="text-gray-400 italic">TBD</span>
            </>
          )}
        </div>
        <span className="font-bold tabular-nums ml-2" style={{ color: isWinner && isDone ? '#059669' : '#111827' }}>
          {isDone || isLive ? score : '-'}
        </span>
      </div>
    );
  };

  return (
    <Link to={`/match/${match.id}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className={`rounded-xl overflow-hidden text-xs min-w-[170px] cursor-pointer transition-all bg-white border ${
          isDone ? 'border-green-300 ring-1 ring-green-200' :
          isLive ? 'border-red-300 ring-2 ring-red-500' :
          'border-gray-200'
        } ${isChampion ? 'ring-2 ring-yellow-500 border-yellow-400' : ''}`}
      >
        {isLive && (
          <div className="px-2 py-1 flex justify-center bg-red-50">
            <LiveBadge size="sm" />
          </div>
        )}
        {isDone && !isChampion && (
          <div className="px-2 py-1 text-center text-[10px] font-bold text-green-600 bg-green-50">
            ✓ Completed
          </div>
        )}
        {isChampion && (
          <div className="px-2 py-1 text-center text-[10px] font-bold text-yellow-600 bg-yellow-50">
            🏆 CHAMPION
          </div>
        )}

        {renderTeamRow(teamA, match.scoreA, match.winner === teamA?.id, true)}
        {renderTeamRow(teamB, match.scoreB, match.winner === teamB?.id, false)}
      </motion.div>
    </Link>
  );
}

function RoundLabel({ label }: { label: string }) {
  return (
    <div className="text-center mb-4">
      <span className="text-xs font-bold px-3 py-1 rounded-full text-white bg-blue-600">
        {label}
      </span>
    </div>
  );
}

export default function KnockoutBracket({ matches, teams }: Props) {
  const getTeam = (id: string) => teams.find((t) => t.id === id);
  const getMatch = (id: string) => matches.find((m) => m.id === id);

  const r16Ids = ['m1','m2','m3','m4','m5','m6','m7','m8'];
  const qfIds = ['m9','m10','m11','m12'];
  const sfIds = ['m13','m14'];

  const r16 = r16Ids.map(getMatch).filter(Boolean) as Match[];
  const qf  = qfIds.map(getMatch).filter(Boolean) as Match[];
  const sf  = sfIds.map(getMatch).filter(Boolean) as Match[];
  const fin = getMatch('m15');

  const champion = fin?.winner ? getTeam(fin.winner) : null;

  const getTeamForMatch = (match: Match, side: 'A' | 'B') => {
    const teamId = side === 'A' ? match.teamAId : match.teamBId;
    const team = getTeam(teamId);
    const roundOrder = ['Round of 16', 'Quarter Finals', 'Semi Finals', 'Final'];
    const matchRound = match.round;
    const roundIdx = roundOrder.indexOf(matchRound);
    if (roundIdx <= 0) return team;
    const prevRound = roundOrder[roundIdx - 1];
    const prevMatches = matches.filter(m => m.round === prevRound);
    const feedsFromCompleted = prevMatches.some(m => m.winner === teamId);
    const isDirectSeed = roundIdx === 0;
    if (isDirectSeed || feedsFromCompleted) return team;
    return undefined;
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[900px]">
        <div className="flex items-start gap-6 justify-start">
          {/* R16 */}
          <div className="flex flex-col gap-2">
            <RoundLabel label="Round of 16" />
            <div className="flex flex-col gap-3">
              {r16.map((m) => (
                <BracketMatchCard key={m.id} match={m} teamA={getTeam(m.teamAId)} teamB={getTeam(m.teamBId)} />
              ))}
            </div>
          </div>

          <div className="flex items-center self-center mt-8">
            <div className="w-8 h-px bg-blue-400" />
            <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-blue-400" />
          </div>

          {/* QF */}
          <div className="flex flex-col gap-2">
            <RoundLabel label="Quarter Finals" />
            <div className="flex flex-col gap-16 mt-6">
              {qf.map((m) => (
                <BracketMatchCard key={m.id} match={m}
                  teamA={getTeamForMatch(m, 'A')}
                  teamB={getTeamForMatch(m, 'B')} />
              ))}
            </div>
          </div>

          <div className="flex items-center self-center mt-8">
            <div className="w-8 h-px bg-blue-400" />
            <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-blue-400" />
          </div>

          {/* SF */}
          <div className="flex flex-col gap-2">
            <RoundLabel label="Semi Finals" />
            <div className="flex flex-col gap-48 mt-20">
              {sf.map((m) => (
                <BracketMatchCard key={m.id} match={m}
                  teamA={getTeamForMatch(m, 'A')}
                  teamB={getTeamForMatch(m, 'B')} />
              ))}
            </div>
          </div>

          <div className="flex items-center self-center mt-8">
            <div className="w-8 h-px bg-blue-400" />
            <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-blue-400" />
          </div>

          {/* Final */}
          <div className="flex flex-col gap-2">
            <RoundLabel label="Final" />
            <div className="mt-52">
              {fin && (
                <BracketMatchCard
                  match={fin}
                  teamA={getTeamForMatch(fin, 'A')}
                  teamB={getTeamForMatch(fin, 'B')}
                  isChampion={fin.status === 'completed'}
                />
              )}
            </div>
          </div>

          {/* Champion */}
          {champion && (
            <>
              <div className="flex items-center self-center mt-8">
                <div className="w-8 h-px bg-yellow-400" />
                <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-yellow-400" />
              </div>
              <div className="flex flex-col gap-2">
                <RoundLabel label="Champion" />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  className="mt-52 rounded-2xl p-4 text-center bg-yellow-50 border-2 border-yellow-300"
                >
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg mx-auto mb-2" style={{ background: champion.color }}>
                    {champion.logo}
                  </div>
                  <div className="font-bold text-sm text-yellow-600">{champion.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{champion.game}</div>
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
