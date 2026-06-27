import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, Trophy, Zap, CheckCircle, Play, RotateCcw, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useTournamentStore } from '../store/tournamentStore';
import toast from 'react-hot-toast';

type Modal = 'addTeam' | 'addPlayer' | 'startMatch' | 'updateScore' | 'finishMatch' | null;

export default function AdminPortal() {
  const { isAdmin, teams, matches, players, addTeam, addPlayer, startMatch, updateScore, finishMatch, logout } = useTournamentStore();
  const navigate = useNavigate();
  const [modal, setModal] = useState<Modal>(null);
  const [form, setForm] = useState<Record<string, string>>({});

  if (!isAdmin) {
    return (
      <Layout>
        <div className="text-center py-20">
          <Shield className="w-12 h-12 mx-auto mb-4 text-muted opacity-40" />
          <h2 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-text)' }}>Admin Access Required</h2>
          <Link to="/login" className="btn-primary inline-flex">Login as Admin</Link>
        </div>
      </Layout>
    );
  }

  const liveMatches = matches.filter((m) => m.status === 'live');
  const upcomingMatches = matches.filter((m) => m.status === 'upcoming');

  const actions = [
    { id: 'addTeam', icon: '🏅', label: 'Add Team', color: '#2563EB', desc: 'Register a new team' },
    { id: 'addPlayer', icon: '👤', label: 'Add Player', color: '#7C3AED', desc: 'Add player to roster' },
    { id: 'startMatch', icon: '▶️', label: 'Start Match', color: '#059669', desc: `${upcomingMatches.length} upcoming` },
    { id: 'updateScore', icon: '📊', label: 'Update Score', color: '#F97316', desc: `${liveMatches.length} live` },
    { id: 'finishMatch', icon: '✅', label: 'Finish Match', color: '#D97706', desc: 'End a live match' },
  ];

  const handleAction = (id: string) => {
    setForm({});
    setModal(id as Modal);
  };

  const closeModal = () => { setModal(null); setForm({}); };

  const handleSubmit = () => {
    if (modal === 'addTeam') {
      if (!form.name || !form.dept || !form.game) { toast.error('Fill all fields'); return; }
      addTeam({ name: form.name, logo: form.name.slice(0,2).toUpperCase(), color: '#2563EB', department: form.dept, playerIds: [], wins: 0, losses: 0, points: 0, status: 'active', game: form.game as 'carrom'|'sequence' });
      toast.success('✅ Team added!');
    } else if (modal === 'addPlayer') {
      if (!form.name || !form.dept || !form.teamId) { toast.error('Fill all fields'); return; }
      addPlayer({ name: form.name, photo: `https://i.pravatar.cc/150?img=${Math.floor(Math.random()*80)}`, department: form.dept, teamId: form.teamId, gamesPlayed: 0, wins: 0, losses: 0 });
      toast.success('✅ Player added!');
    } else if (modal === 'startMatch') {
      if (!form.matchId) { toast.error('Select a match'); return; }
      startMatch(form.matchId);
      toast.success('✅ Match started!');
    } else if (modal === 'updateScore') {
      if (!form.matchId) { toast.error('Select a match'); return; }
      updateScore(form.matchId, Number(form.scoreA ?? 0), Number(form.scoreB ?? 0));
      toast.success('✅ Score updated!');
    } else if (modal === 'finishMatch') {
      if (!form.matchId || !form.winner) { toast.error('Select match and winner'); return; }
      finishMatch(form.matchId, form.winner);
      toast.success('🏆 Match finished!');
    }
    closeModal();
  };

  const inputStyle = {
    background: 'var(--color-surface-2)',
    borderColor: 'var(--color-border)',
    color: 'var(--color-text)',
  };

  return (
    <Layout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-3xl gradient-text mb-1">Admin Portal</h1>
          <p className="text-muted text-sm">Tournament control center</p>
        </div>
        <button onClick={() => { logout(); navigate('/'); toast.success('Logged out'); }}
          className="text-sm text-red-500 hover:text-red-600 border border-red-500/30 px-3 py-1.5 rounded-lg transition-colors">
          Logout
        </button>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {[
          { value: teams.length, label: 'Teams', color: '#2563EB' },
          { value: players.length, label: 'Players', color: '#7C3AED' },
          { value: liveMatches.length, label: 'Live', color: '#ef4444' },
          { value: upcomingMatches.length, label: 'Upcoming', color: '#F97316' },
        ].map((s) => (
          <div key={s.label} className="surface rounded-xl p-4 text-center">
            <div className="font-bold text-2xl font-display" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Quick Actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {actions.map((a, i) => (
          <motion.button key={a.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            whileHover={{ y: -4, boxShadow: `0 16px 40px ${a.color}30` }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleAction(a.id)}
            className="surface rounded-2xl p-5 flex flex-col items-center gap-2 text-center cursor-pointer"
          >
            <div className="text-3xl">{a.icon}</div>
            <div className="font-semibold text-sm" style={{ color: a.color }}>{a.label}</div>
            <div className="text-xs text-muted">{a.desc}</div>
          </motion.button>
        ))}
      </div>

      {/* Umpire links */}
      <h2 className="font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Umpire Screens</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {liveMatches.map((m) => {
          const tA = teams.find(t=>t.id===m.teamAId);
          const tB = teams.find(t=>t.id===m.teamBId);
          return (
            <Link key={m.id} to={`/umpire/${m.id}`}>
              <motion.div whileHover={{ y: -2 }}
                className="surface rounded-xl px-4 py-3 flex items-center justify-between border-l-4 transition-shadow hover:shadow-lg"
                style={{ borderLeftColor: '#ef4444' }}>
                <div>
                  <div className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{tA?.name} vs {tB?.name}</div>
                  <div className="text-xs text-muted capitalize">{m.game} · {m.court}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold" style={{ color: 'var(--color-text)' }}>{m.scoreA}–{m.scoreB}</span>
                  <Zap className="w-4 h-4 text-brand-orange" />
                </div>
              </motion.div>
            </Link>
          );
        })}
        {liveMatches.length === 0 && (
          <div className="col-span-2 surface rounded-xl p-6 text-center text-muted text-sm">
            No live matches — start a match to open umpire screen
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={closeModal}>
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="surface rounded-3xl p-6 w-full max-w-sm">
            <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--color-text)' }}>
              {actions.find(a=>a.id===modal)?.label}
            </h3>
            <div className="space-y-3">
              {modal === 'addTeam' && <>
                <input placeholder="Team Name" value={form.name??''} onChange={e=>setForm({...form,name:e.target.value})} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
                <input placeholder="Department" value={form.dept??''} onChange={e=>setForm({...form,dept:e.target.value})} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
                <select value={form.game??''} onChange={e=>setForm({...form,game:e.target.value})} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle}>
                  <option value="">Select Game</option>
                  <option value="carrom">Carrom</option>
                  <option value="sequence">Sequence</option>
                </select>
              </>}
              {modal === 'addPlayer' && <>
                <input placeholder="Player Name" value={form.name??''} onChange={e=>setForm({...form,name:e.target.value})} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
                <input placeholder="Department" value={form.dept??''} onChange={e=>setForm({...form,dept:e.target.value})} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle} />
                <select value={form.teamId??''} onChange={e=>setForm({...form,teamId:e.target.value})} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle}>
                  <option value="">Select Team</option>
                  {teams.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </>}
              {modal === 'startMatch' && (
                <select value={form.matchId??''} onChange={e=>setForm({...form,matchId:e.target.value})} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle}>
                  <option value="">Select Match</option>
                  {upcomingMatches.map(m=>{
                    const tA=teams.find(t=>t.id===m.teamAId);
                    const tB=teams.find(t=>t.id===m.teamBId);
                    return <option key={m.id} value={m.id}>{tA?.name} vs {tB?.name}</option>;
                  })}
                </select>
              )}
              {modal === 'updateScore' && <>
                <select value={form.matchId??''} onChange={e=>setForm({...form,matchId:e.target.value})} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle}>
                  <option value="">Select Live Match</option>
                  {liveMatches.map(m=>{
                    const tA=teams.find(t=>t.id===m.teamAId);
                    const tB=teams.find(t=>t.id===m.teamBId);
                    return <option key={m.id} value={m.id}>{tA?.name} vs {tB?.name}</option>;
                  })}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input type="number" placeholder="Score A" value={form.scoreA??''} onChange={e=>setForm({...form,scoreA:e.target.value})} className="px-4 py-3 rounded-xl border text-sm outline-none text-center font-bold text-xl" style={inputStyle} />
                  <input type="number" placeholder="Score B" value={form.scoreB??''} onChange={e=>setForm({...form,scoreB:e.target.value})} className="px-4 py-3 rounded-xl border text-sm outline-none text-center font-bold text-xl" style={inputStyle} />
                </div>
              </>}
              {modal === 'finishMatch' && <>
                <select value={form.matchId??''} onChange={e=>setForm({...form,matchId:e.target.value})} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle}>
                  <option value="">Select Match</option>
                  {liveMatches.map(m=>{
                    const tA=teams.find(t=>t.id===m.teamAId);
                    const tB=teams.find(t=>t.id===m.teamBId);
                    return <option key={m.id} value={m.id}>{tA?.name} vs {tB?.name}</option>;
                  })}
                </select>
                {form.matchId && (
                  <select value={form.winner??''} onChange={e=>setForm({...form,winner:e.target.value})} className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={inputStyle}>
                    <option value="">Select Winner</option>
                    {[matches.find(m=>m.id===form.matchId)].filter(Boolean).flatMap(m=>[
                      <option key={m!.teamAId} value={m!.teamAId}>{teams.find(t=>t.id===m!.teamAId)?.name}</option>,
                      <option key={m!.teamBId} value={m!.teamBId}>{teams.find(t=>t.id===m!.teamBId)?.name}</option>,
                    ])}
                  </select>
                )}
              </>}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={closeModal} className="flex-1 py-3 rounded-xl border text-sm font-medium transition-colors hover:bg-red-500/10 hover:text-red-500" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>Cancel</button>
              <button onClick={handleSubmit} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)' }}>Confirm</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
}
