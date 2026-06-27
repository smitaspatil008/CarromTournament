import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Undo, Save, Trophy, CheckCircle, Minus, Plus, Shield } from 'lucide-react';
import { useTournamentStore } from '../store/tournamentStore';
import { useAutoSave } from '../hooks/useAutoSave';
import toast from 'react-hot-toast';

export default function UmpireScreen() {
  const { id } = useParams<{ id: string }>();
  const { matches, teams, players, isAdmin, updateScore, undoScore, finishMatch } = useTournamentStore();

  const match = matches.find((m) => m.id === id);
  const teamA = match ? teams.find((t) => t.id === match.teamAId) : null;
  const teamB = match ? teams.find((t) => t.id === match.teamBId) : null;

  const [scoreA, setScoreA] = useState(match?.scoreA ?? 0);
  const [scoreB, setScoreB] = useState(match?.scoreB ?? 0);
  const [saved, setSaved] = useState(true);
  const [showFinish, setShowFinish] = useState(false);

  useEffect(() => {
    if (match) { setScoreA(match.scoreA); setScoreB(match.scoreB); }
  }, []);

  const doSave = () => {
    if (!match) return;
    updateScore(match.id, scoreA, scoreB);
    setSaved(true);
    toast.success('💾 Score saved!', { duration: 1200 });
  };

  useAutoSave([scoreA, scoreB], doSave, 800);

  useEffect(() => { setSaved(false); }, [scoreA, scoreB]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center p-8">
          <Shield className="w-12 h-12 mx-auto mb-4 text-muted opacity-40" />
          <p className="text-muted">Umpire access required.</p>
          <Link to="/login" className="text-brand-blue hover:underline text-sm mt-2 block">Login →</Link>
        </div>
      </div>
    );
  }

  if (!match || !teamA || !teamB) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center p-8">
          <p className="text-muted">Match not found.</p>
          <Link to="/admin" className="text-brand-blue hover:underline text-sm mt-2 block">← Admin</Link>
        </div>
      </div>
    );
  }

  const handleFinish = (winner: string) => {
    doSave();
    finishMatch(match.id, winner);
    toast.success('🏆 Match completed!');
    setShowFinish(false);
  };

  const btnStyle = (color: string) => ({
    background: color,
    borderRadius: '20px',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 8px 24px ${color}60`,
    transition: 'all 0.15s',
  });

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg,#020617,#0d1b4b,#1e0a3c)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <Link to="/admin" className="flex items-center gap-2 text-white/60 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="text-center">
          <div className="text-white/50 text-xs capitalize">{match.game} · {match.round}</div>
          <div className="text-white text-sm font-semibold">{match.court}</div>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-xs text-red-400 font-bold">LIVE</span>
        </div>
      </div>

      {/* Teams */}
      <div className="flex-1 flex flex-col px-4 py-6 gap-6 max-w-sm mx-auto w-full">
        {/* Team A */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl" style={{ background: teamA.color }}>{teamA.logo}</div>
            <div className="text-left">
              <div className="text-white font-semibold">{teamA.name}</div>
              <div className="text-white/40 text-xs">{teamA.department}</div>
            </div>
          </div>
          <motion.div key={scoreA} initial={{ scale: 1.3 }} animate={{ scale: 1 }}
            className="text-8xl font-display font-black mb-4" style={{ color: teamA.color }}>
            {scoreA}
          </motion.div>
          <div className="flex gap-4 justify-center">
            <motion.button whileTap={{ scale: 0.9 }}
              onClick={() => setScoreA(Math.max(0, scoreA - 1))}
              style={{ ...btnStyle('#374151'), width: 80, height: 80, fontSize: 32 }}>
              <Minus className="w-8 h-8" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }}
              onClick={() => setScoreA(scoreA + 1)}
              style={{ ...btnStyle(teamA.color), width: 80, height: 80, fontSize: 32 }}>
              <Plus className="w-8 h-8" />
            </motion.button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-2">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-sm font-bold">VS</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Team B */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl" style={{ background: teamB.color }}>{teamB.logo}</div>
            <div className="text-left">
              <div className="text-white font-semibold">{teamB.name}</div>
              <div className="text-white/40 text-xs">{teamB.department}</div>
            </div>
          </div>
          <motion.div key={scoreB} initial={{ scale: 1.3 }} animate={{ scale: 1 }}
            className="text-8xl font-display font-black mb-4" style={{ color: teamB.color }}>
            {scoreB}
          </motion.div>
          <div className="flex gap-4 justify-center">
            <motion.button whileTap={{ scale: 0.9 }}
              onClick={() => setScoreB(Math.max(0, scoreB - 1))}
              style={{ ...btnStyle('#374151'), width: 80, height: 80, fontSize: 32 }}>
              <Minus className="w-8 h-8" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }}
              onClick={() => setScoreB(scoreB + 1)}
              style={{ ...btnStyle(teamB.color), width: 80, height: 80, fontSize: 32 }}>
              <Plus className="w-8 h-8" />
            </motion.button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 space-y-3">
          <div className="flex gap-3">
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={() => { undoScore(match.id); toast('↩ Undone', { icon: '↩' }); }}
              className="flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold text-white/60 border border-white/10"
              style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Undo className="w-5 h-5" /> Undo
            </motion.button>
            <motion.button whileTap={{ scale: 0.97 }}
              onClick={doSave}
              className="flex-1 py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold"
              style={{ background: saved ? 'rgba(5,150,105,0.2)' : 'linear-gradient(135deg,#2563EB,#7C3AED)', color: saved ? '#10b981' : 'white' }}>
              {saved ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
              {saved ? 'Saved' : 'Save'}
            </motion.button>
          </div>

          <motion.button whileTap={{ scale: 0.97 }}
            onClick={() => setShowFinish(true)}
            className="w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg"
            style={{ background: 'linear-gradient(135deg,#d97706,#b45309)', color: 'white', boxShadow: '0 8px 24px rgba(217,119,6,0.4)' }}>
            <Trophy className="w-6 h-6" /> Finish Match & Declare Winner
          </motion.button>
        </div>

        {/* Auto-save indicator */}
        <div className="text-center">
          <span className="text-xs text-white/20">Auto-saves every change • Umpire Mode</span>
        </div>
      </div>

      {/* Finish Match Modal */}
      {showFinish && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-end justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)' }}>
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }}
            className="w-full max-w-sm rounded-3xl p-6"
            style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h3 className="font-bold text-white text-xl text-center mb-2">Declare Winner</h3>
            <p className="text-white/40 text-sm text-center mb-6">Final Score: {scoreA} – {scoreB}</p>
            <div className="flex gap-4">
              <motion.button whileTap={{ scale: 0.95 }}
                onClick={() => handleFinish(teamA.id)}
                className="flex-1 py-5 rounded-2xl flex flex-col items-center gap-2 font-bold text-white"
                style={{ background: teamA.color, boxShadow: `0 4px 20px ${teamA.color}50` }}>
                <span className="text-2xl">{teamA.logo}</span>
                <span className="text-sm">{teamA.name}</span>
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }}
                onClick={() => handleFinish(teamB.id)}
                className="flex-1 py-5 rounded-2xl flex flex-col items-center gap-2 font-bold text-white"
                style={{ background: teamB.color, boxShadow: `0 4px 20px ${teamB.color}50` }}>
                <span className="text-2xl">{teamB.logo}</span>
                <span className="text-sm">{teamB.name}</span>
              </motion.button>
            </div>
            <button onClick={() => setShowFinish(false)}
              className="w-full mt-4 py-3 text-white/40 text-sm hover:text-white/60 transition-colors">
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
