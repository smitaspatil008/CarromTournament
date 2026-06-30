import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Calendar } from 'lucide-react';
import Layout from '../components/layout/Layout';
import GroupTable from '../components/tournament/GroupTable';
import LiveBadge from '../components/ui/LiveBadge';
import { useTournamentStore } from '../store/tournamentStore';
import { GROUPS, GROUP_STANDINGS, SEQUENCE_DAYS } from '../data/mockData';

function MatchRow({ match, teams }: { match: any; teams: any[] }) {
  const getTeam = (id: string) => teams.find((t: any) => t.id === id);
  const tA = getTeam(match.teamAId);
  const tB = getTeam(match.teamBId);
  const isLive = match.status === 'live';
  const isDone = match.status === 'completed';
  const winnerA = match.winner === tA?.id;
  const winnerB = match.winner === tB?.id;

  return (
    <Link to={`/match/${match.id}`}>
      <motion.div whileHover={{ scale: 1.01 }}
        className={`rounded-xl overflow-hidden cursor-pointer transition-all bg-white border ${
          isDone ? 'border-green-300' : isLive ? 'border-red-300 ring-2 ring-red-500' : 'border-gray-200'
        }`}>
        {isLive && (
          <div className="px-2 py-1 flex justify-center bg-red-50">
            <LiveBadge size="sm" />
          </div>
        )}
        {isDone && (
          <div className="px-2 py-0.5 text-center text-[10px] font-bold text-green-600 bg-green-50">
            ✓ Completed
          </div>
        )}
        <div className="flex items-center">
          {/* Team A */}
          <div className={`flex-1 flex items-center gap-2 px-3 py-3 ${winnerA ? 'bg-green-50' : ''}`}>
            <span className="w-6 h-6 rounded text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
              style={{ background: winnerA ? '#059669' : (tA?.color ?? '#64748b') }}>
              {tA?.logo ?? '?'}
            </span>
            <span className={`text-sm truncate ${winnerA ? 'font-bold text-green-700' : 'text-gray-900'}`}>
              {tA?.name ?? 'TBD'}
            </span>
          </div>
          {/* Score */}
          <div className="flex items-center gap-2 px-3">
            <span className={`text-lg font-bold tabular-nums ${winnerA ? 'text-green-600' : 'text-gray-900'}`}>
              {isDone || isLive ? match.scoreA : '-'}
            </span>
            <span className="text-gray-300 text-sm">vs</span>
            <span className={`text-lg font-bold tabular-nums ${winnerB ? 'text-green-600' : 'text-gray-900'}`}>
              {isDone || isLive ? match.scoreB : '-'}
            </span>
          </div>
          {/* Team B */}
          <div className={`flex-1 flex items-center gap-2 px-3 py-3 justify-end ${winnerB ? 'bg-green-50' : ''}`}>
            <span className={`text-sm truncate text-right ${winnerB ? 'font-bold text-green-700' : 'text-gray-900'}`}>
              {tB?.name ?? 'TBD'}
            </span>
            <span className="w-6 h-6 rounded text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0"
              style={{ background: winnerB ? '#059669' : (tB?.color ?? '#64748b') }}>
              {tB?.logo ?? '?'}
            </span>
          </div>
        </div>
        {/* Time/court */}
        <div className="px-3 py-1.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
          <span>{new Date(match.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <span>{match.court}</span>
        </div>
      </motion.div>
    </Link>
  );
}

export default function SequenceGroups() {
  const { teams, matches } = useTournamentStore();
  const seqTeams = teams.filter((t) => t.game === 'sequence');
  const seqMatches = matches.filter((m) => m.game === 'sequence');
  const liveSeq = seqMatches.filter((m) => m.status === 'live');

  const getMatch = (id: string) => seqMatches.find((m) => m.id === id);

  const completed = seqMatches.filter(m => m.status === 'completed').length;
  const total = seqMatches.length;

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl bg-blue-600 text-white">🃏</div>
          <h1 className="font-display font-bold text-3xl text-blue-600 font-extrabold">Sequence Tournament</h1>
        </div>
        <p className="text-gray-500 text-sm">2 groups × 4 teams · Round-robin → Semifinals → Final</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { value: seqTeams.length, label: 'Teams', color: '#2563EB' },
          { value: liveSeq.length, label: 'Live', color: '#ef4444' },
          { value: completed, label: 'Completed', color: '#059669' },
          { value: total - completed - liveSeq.length, label: 'Upcoming', color: '#2563EB' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="font-bold text-2xl font-display" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Group tables */}
      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        {GROUPS.map((group, i) => (
          <motion.div key={group.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <GroupTable group={group} standings={GROUP_STANDINGS[group.id]} teams={seqTeams} />
          </motion.div>
        ))}
      </div>

      {/* Day-by-Day Schedule */}
      <div className="space-y-8">
        {SEQUENCE_DAYS.map((day, dayIdx) => {
          const dayMatches = day.matchIds.map(getMatch).filter(Boolean) as any[];
          const allDone = dayMatches.every(m => m.status === 'completed');
          const hasLive = dayMatches.some(m => m.status === 'live');
          const isSemifinal = day.day === 4;
          const isFinal = day.day === 5;

          return (
            <motion.div key={day.day}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dayIdx * 0.08 }}>
              {/* Day header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                  isFinal ? 'bg-yellow-500' : isSemifinal ? 'bg-indigo-600' : 'bg-blue-600'
                }`}>
                  {isFinal ? '🏆' : isSemifinal ? '⚡' : <Calendar className="w-5 h-5" />}
                </div>
                <div>
                  <h2 className={`font-bold text-lg ${
                    isFinal ? 'text-yellow-600' : isSemifinal ? 'text-indigo-600' : 'text-gray-900'
                  }`}>{day.label}</h2>
                  <p className="text-xs text-gray-400">
                    {day.day <= 3 ? 'Group Stage' : day.day === 4 ? 'Knockout Stage' : 'Championship Match'}
                    {' · '}{dayMatches.length} match{dayMatches.length !== 1 ? 'es' : ''}
                    {allDone && ' · ✓ All completed'}
                    {hasLive && ' · 🔴 Live'}
                  </p>
                </div>
              </div>

              {/* Matches */}
              <div className={`grid gap-3 ${isFinal ? 'max-w-lg mx-auto' : 'sm:grid-cols-2'}`}>
                {dayMatches.map((m) => (
                  <MatchRow key={m.id} match={m} teams={seqTeams} />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-10 flex flex-wrap items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-green-100 border border-green-500 inline-block" /> Won / Completed</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500 inline-block" /> Live</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-100 border border-gray-300 inline-block" /> Upcoming</span>
        <span className="text-gray-400">Click any match to view details</span>
      </div>
    </Layout>
  );
}
