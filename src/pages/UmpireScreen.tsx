import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Undo, Trophy, Shield, Minus, Plus, RotateCcw, ChevronRight } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import type { BreakScore } from '../store/tournamentStore';
import toast from 'react-hot-toast';

const CARROM_BREAKS = 4;

function CarromBreaksView({ matchId, teamA, teamB, isLive }: {
  matchId: string;
  teamA: { id: string; name: string; logo: string; color: string };
  teamB: { id: string; name: string; logo: string; color: string };
  isLive: boolean;
}) {
  const { breakScores, updateBreakScore } = useTournamentStore();
  const breaks = breakScores[matchId] ?? [];
  const [currentBreak, setCurrentBreak] = useState(() => {
    const filled = breaks.length;
    return Math.min(filled, CARROM_BREAKS - 1);
  });

  const currentScores = breaks[currentBreak] ?? { scoreA: 0, scoreB: 0 };

  const totalA = breaks.reduce((sum, b) => sum + b.scoreA, 0);
  const totalB = breaks.reduce((sum, b) => sum + b.scoreB, 0);

  const addScore = useCallback((side: 'A' | 'B', delta: number) => {
    const cur = breaks[currentBreak] ?? { scoreA: 0, scoreB: 0 };
    const newA = side === 'A' ? Math.max(0, cur.scoreA + delta) : cur.scoreA;
    const newB = side === 'B' ? Math.max(0, cur.scoreB + delta) : cur.scoreB;
    updateBreakScore(matchId, currentBreak, newA, newB);
  }, [matchId, currentBreak, breaks, updateBreakScore]);

  const goToBreak = (idx: number) => {
    if (idx >= 0 && idx < CARROM_BREAKS) setCurrentBreak(idx);
  };

  return (
    <>
      {/* Break tabs */}
      <div className="flex gap-2 mb-4 justify-center">
        {Array.from({ length: CARROM_BREAKS }, (_, i) => {
          const b = breaks[i];
          const hasScore = b && (b.scoreA > 0 || b.scoreB > 0);
          const isCurrent = i === currentBreak;
          return (
            <button key={i} onClick={() => goToBreak(i)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isCurrent
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : hasScore
                    ? 'bg-gray-700 text-gray-200'
                    : 'bg-gray-800 text-gray-500'
              }`}>
              Break {i + 1}
              {hasScore && !isCurrent && (
                <span className="ml-1 text-[10px] opacity-70">({b.scoreA}-{b.scoreB})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Current break label */}
      <div className="text-center mb-3">
        <span className="text-xs text-gray-400 uppercase tracking-wider">
          Break {currentBreak + 1} of {CARROM_BREAKS}
        </span>
      </div>

      {/* Score cards for current break */}
      <div className="flex items-stretch gap-3 sm:gap-4 mb-4">
        {/* Team A */}
        <div className="flex-1 rounded-2xl p-3 sm:p-4 text-center" style={{ background: `${teamA.color}15`, border: `2px solid ${teamA.color}30` }}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg mx-auto mb-1.5" style={{ background: teamA.color }}>
            {teamA.logo}
          </div>
          <div className="text-white font-semibold text-xs sm:text-sm mb-2 truncate">{teamA.name}</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`a-${currentBreak}-${currentScores.scoreA}`}
              initial={{ scale: 1.3, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl sm:text-6xl font-black tabular-nums leading-none mb-3"
              style={{ color: teamA.color }}
            >
              {currentScores.scoreA}
            </motion.div>
          </AnimatePresence>
          {isLive && (
            <div className="flex gap-2 justify-center">
              <motion.button whileTap={{ scale: 0.85 }}
                onClick={() => addScore('A', -1)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white">
                <Minus className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
              <motion.button whileTap={{ scale: 0.85 }}
                onClick={() => addScore('A', 1)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ background: teamA.color }}>
                <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>
          )}
        </div>

        {/* VS */}
        <div className="flex flex-col items-center justify-center">
          <span className="text-gray-500 text-xs font-bold">VS</span>
        </div>

        {/* Team B */}
        <div className="flex-1 rounded-2xl p-3 sm:p-4 text-center" style={{ background: `${teamB.color}15`, border: `2px solid ${teamB.color}30` }}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-lg mx-auto mb-1.5" style={{ background: teamB.color }}>
            {teamB.logo}
          </div>
          <div className="text-white font-semibold text-xs sm:text-sm mb-2 truncate">{teamB.name}</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`b-${currentBreak}-${currentScores.scoreB}`}
              initial={{ scale: 1.3, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl sm:text-6xl font-black tabular-nums leading-none mb-3"
              style={{ color: teamB.color }}
            >
              {currentScores.scoreB}
            </motion.div>
          </AnimatePresence>
          {isLive && (
            <div className="flex gap-2 justify-center">
              <motion.button whileTap={{ scale: 0.85 }}
                onClick={() => addScore('B', -1)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white">
                <Minus className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
              <motion.button whileTap={{ scale: 0.85 }}
                onClick={() => addScore('B', 1)}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ background: teamB.color }}>
                <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Break summary table */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400">
              <th className="text-left px-3 py-2 text-xs font-medium">Break</th>
              <th className="text-center px-3 py-2 text-xs font-medium" style={{ color: teamA.color }}>{teamA.logo}</th>
              <th className="text-center px-3 py-2 text-xs font-medium" style={{ color: teamB.color }}>{teamB.logo}</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: CARROM_BREAKS }, (_, i) => {
              const b = breaks[i];
              const isCurrent = i === currentBreak;
              return (
                <tr key={i}
                  onClick={() => isLive && goToBreak(i)}
                  className={`border-b border-gray-700/50 transition-colors ${
                    isCurrent ? 'bg-blue-600/20' : isLive ? 'cursor-pointer hover:bg-gray-700/30' : ''
                  }`}>
                  <td className="px-3 py-2 text-xs">
                    <span className={isCurrent ? 'text-blue-400 font-bold' : 'text-gray-400'}>
                      Break {i + 1} {isCurrent && '◄'}
                    </span>
                  </td>
                  <td className="text-center px-3 py-2 font-bold tabular-nums" style={{ color: b?.scoreA ? teamA.color : '#6b7280' }}>
                    {b?.scoreA ?? 0}
                  </td>
                  <td className="text-center px-3 py-2 font-bold tabular-nums" style={{ color: b?.scoreB ? teamB.color : '#6b7280' }}>
                    {b?.scoreB ?? 0}
                  </td>
                </tr>
              );
            })}
            <tr className="bg-gray-700/40">
              <td className="px-3 py-2 text-xs font-bold text-white">TOTAL</td>
              <td className="text-center px-3 py-2 font-black text-lg" style={{ color: teamA.color }}>{totalA}</td>
              <td className="text-center px-3 py-2 font-black text-lg" style={{ color: teamB.color }}>{totalB}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Next break button */}
      {isLive && currentBreak < CARROM_BREAKS - 1 && (
        <motion.button whileTap={{ scale: 0.97 }}
          onClick={() => goToBreak(currentBreak + 1)}
          className="w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm text-blue-400 bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 mb-3">
          Next Break <ChevronRight className="w-4 h-4" />
        </motion.button>
      )}
    </>
  );
}

export default function UmpireScreen() {
  const { id } = useParams<{ id: string }>();
  const { matches, teams, isAdmin, updateScore, undoScore, finishMatch, startMatch, breakScores, updateBreakScore } = useTournamentStore();

  const match = matches.find((m) => m.id === id);
  const teamA = match ? teams.find((t) => t.id === match.teamAId) : null;
  const teamB = match ? teams.find((t) => t.id === match.teamBId) : null;

  const [showFinish, setShowFinish] = useState(false);

  const addScore = useCallback((side: 'A' | 'B', delta: number) => {
    if (!match) return;
    const newA = side === 'A' ? Math.max(0, match.scoreA + delta) : match.scoreA;
    const newB = side === 'B' ? Math.max(0, match.scoreB + delta) : match.scoreB;
    updateScore(match.id, newA, newB);
  }, [match, updateScore]);

  const handleUndo = useCallback(() => {
    if (!match) return;
    undoScore(match.id);
    toast('Score undone', { icon: '↩', duration: 1000 });
  }, [match, undoScore]);

  const handleStart = useCallback(() => {
    if (!match) return;
    startMatch(match.id);
    toast.success('Match started!');
  }, [match, startMatch]);

  const handleFinish = (winner: string) => {
    if (!match) return;
    finishMatch(match.id, winner);
    toast.success('Match completed!');
    setShowFinish(false);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <Shield className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Umpire access required.</p>
          <Link to="/login" className="text-blue-600 hover:underline text-sm mt-2 block">Login →</Link>
        </div>
      </div>
    );
  }

  if (!match || !teamA || !teamB) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <p className="text-gray-500">Match not found.</p>
          <Link to="/admin" className="text-blue-600 hover:underline text-sm mt-2 block">← Admin</Link>
        </div>
      </div>
    );
  }

  const isLive = match.status === 'live';
  const isDone = match.status === 'completed';
  const isUpcoming = match.status === 'upcoming';
  const isCarrom = match.game === 'carrom';

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
        <Link to="/admin" className="flex items-center gap-2 text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm hidden sm:inline">Back</span>
        </Link>
        <div className="text-center">
          <div className="text-gray-400 text-[11px] uppercase tracking-wider">{match.game} · {match.round}</div>
          <div className="text-white text-sm font-semibold">{match.court}</div>
        </div>
        <div className="flex items-center gap-1.5">
          {isLive && (
            <>
              <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-xs text-red-400 font-bold">LIVE</span>
            </>
          )}
          {isDone && <span className="text-xs text-green-400 font-bold">COMPLETED</span>}
          {isUpcoming && <span className="text-xs text-yellow-400 font-bold">UPCOMING</span>}
        </div>
      </div>

      {/* Scoreboard */}
      <div className="flex-1 flex flex-col justify-center px-4 py-4 max-w-lg mx-auto w-full overflow-y-auto">

        {isCarrom ? (
          /* ── Carrom: 4-break scoring ── */
          <CarromBreaksView matchId={match.id} teamA={teamA} teamB={teamB} isLive={isLive} />
        ) : (
          /* ── Sequence: simple scoring ── */
          <div className="flex items-stretch gap-3 sm:gap-4 mb-6">
            {/* Team A */}
            <div className="flex-1 rounded-2xl p-4 sm:p-5 text-center" style={{ background: `${teamA.color}15`, border: `2px solid ${teamA.color}30` }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl mx-auto mb-2" style={{ background: teamA.color }}>
                {teamA.logo}
              </div>
              <div className="text-white font-semibold text-sm sm:text-base mb-3 truncate">{teamA.name}</div>
              <motion.div
                key={`a-${match.scoreA}`}
                initial={{ scale: 1.2, color: '#fbbf24' }}
                animate={{ scale: 1, color: teamA.color }}
                transition={{ duration: 0.3 }}
                className="text-6xl sm:text-7xl font-black tabular-nums leading-none mb-4"
              >
                {match.scoreA}
              </motion.div>
              {isLive && (
                <div className="flex gap-3 justify-center">
                  <motion.button whileTap={{ scale: 0.85 }}
                    onClick={() => addScore('A', -1)}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white">
                    <Minus className="w-6 h-6 sm:w-7 sm:h-7" />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.85 }}
                    onClick={() => addScore('A', 1)}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ background: teamA.color }}>
                    <Plus className="w-6 h-6 sm:w-7 sm:h-7" />
                  </motion.button>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center"><span className="text-gray-500 text-xs font-bold">VS</span></div>
            {/* Team B */}
            <div className="flex-1 rounded-2xl p-4 sm:p-5 text-center" style={{ background: `${teamB.color}15`, border: `2px solid ${teamB.color}30` }}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl mx-auto mb-2" style={{ background: teamB.color }}>
                {teamB.logo}
              </div>
              <div className="text-white font-semibold text-sm sm:text-base mb-3 truncate">{teamB.name}</div>
              <motion.div
                key={`b-${match.scoreB}`}
                initial={{ scale: 1.2, color: '#fbbf24' }}
                animate={{ scale: 1, color: teamB.color }}
                transition={{ duration: 0.3 }}
                className="text-6xl sm:text-7xl font-black tabular-nums leading-none mb-4"
              >
                {match.scoreB}
              </motion.div>
              {isLive && (
                <div className="flex gap-3 justify-center">
                  <motion.button whileTap={{ scale: 0.85 }}
                    onClick={() => addScore('B', -1)}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white">
                    <Minus className="w-6 h-6 sm:w-7 sm:h-7" />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.85 }}
                    onClick={() => addScore('B', 1)}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-white shadow-lg"
                    style={{ background: teamB.color }}>
                    <Plus className="w-6 h-6 sm:w-7 sm:h-7" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="space-y-3">
          {isUpcoming && (
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={handleStart}
              className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg bg-green-600 text-white hover:bg-green-700 shadow-lg">
              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>▶</motion.div>
              Start Match
            </motion.button>
          )}

          {isLive && (
            <>
              {!isCarrom && (
                <div className="flex gap-3">
                  <motion.button whileTap={{ scale: 0.97 }}
                    onClick={handleUndo}
                    className="flex-1 py-3.5 rounded-xl flex items-center justify-center gap-2 font-semibold text-gray-300 bg-gray-800 border border-gray-700 hover:bg-gray-700">
                    <Undo className="w-5 h-5" /> Undo
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.97 }}
                    onClick={() => { updateScore(match.id, 0, 0); toast('Scores reset', { icon: '🔄', duration: 1000 }); }}
                    className="py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 font-semibold text-gray-300 bg-gray-800 border border-gray-700 hover:bg-gray-700">
                    <RotateCcw className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              <motion.button whileTap={{ scale: 0.97 }}
                onClick={() => setShowFinish(true)}
                className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-lg">
                <Trophy className="w-6 h-6" /> End Match & Declare Winner
              </motion.button>
            </>
          )}

          {isDone && (
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/20 text-green-400 font-semibold text-sm">
                <Trophy className="w-5 h-5" />
                Winner: {match.winner === teamA.id ? teamA.name : teamB.name}
              </div>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="text-center mt-4">
          <span className="text-xs text-gray-600">
            {isLive
              ? isCarrom ? 'Score each break · Totals update automatically' : 'Scores update instantly · Tap + or − to update'
              : isUpcoming ? 'Tap Start Match to begin scoring' : 'Match completed'}
          </span>
        </div>
      </div>

      {/* Finish Match Modal */}
      {showFinish && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          onClick={() => setShowFinish(false)}>
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl p-6 bg-gray-900 border border-gray-700 shadow-2xl">
            <h3 className="font-bold text-white text-xl text-center mb-2">🏆 Declare Winner</h3>
            <p className="text-gray-400 text-sm text-center mb-6">
              Final Score: <span className="font-bold text-white">{match.scoreA}</span> – <span className="font-bold text-white">{match.scoreB}</span>
            </p>
            <div className="flex gap-4">
              <motion.button whileTap={{ scale: 0.95 }}
                onClick={() => handleFinish(teamA.id)}
                className="flex-1 py-5 rounded-2xl flex flex-col items-center gap-2 font-bold text-white hover:brightness-110 transition-all"
                style={{ background: teamA.color }}>
                <span className="text-2xl">{teamA.logo}</span>
                <span className="text-sm truncate max-w-full px-2">{teamA.name}</span>
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }}
                onClick={() => handleFinish(teamB.id)}
                className="flex-1 py-5 rounded-2xl flex flex-col items-center gap-2 font-bold text-white hover:brightness-110 transition-all"
                style={{ background: teamB.color }}>
                <span className="text-2xl">{teamB.logo}</span>
                <span className="text-sm truncate max-w-full px-2">{teamB.name}</span>
              </motion.button>
            </div>
            <button onClick={() => setShowFinish(false)}
              className="w-full mt-4 py-3 text-gray-500 text-sm hover:text-gray-300 transition-colors">
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
