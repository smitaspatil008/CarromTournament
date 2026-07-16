import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Target, Flame, Calendar, Medal, TrendingUp, BarChart3, Newspaper, Plus, X, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';
import LiveBadge from '../components/ui/LiveBadge';
import MatchCard from '../components/tournament/MatchCard';
import { useTournamentStore, useLiveMatches, useUpcomingMatches } from '../store/tournamentStore';
import { TOURNAMENT } from '../data/mockData';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { teams, players, matches, announcements, updates, isAdmin, addUpdate, deleteUpdate } = useTournamentStore();
  const liveMatches = useLiveMatches();
  const upcomingMatches = useUpcomingMatches();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({ image: '', text: '', playerId: '', teamId: '' });
  const scrollRef = useRef<HTMLDivElement>(null);
  const completedMatches = matches.filter((m) => m.status === 'completed');
  const getTeam = (id: string) => teams.find((t) => t.id === id);

  const totalMatchesExpected = 30;
  const progress = Math.round((completedMatches.length / totalMatchesExpected) * 100);

  const stats = [
    { icon: <Trophy className="w-5 h-5" />, label: 'Total Teams',      value: teams.length,             gradient: '#2563EB', delay: 0,    sub: 'Active' },
    { icon: <Users className="w-5 h-5" />,  label: 'Players',          value: players.length,           gradient: '#2563EB', delay: 0.05 },
    { icon: <Target className="w-5 h-5" />, label: 'Matches Played',   value: completedMatches.length,  gradient: '#059669', delay: 0.1  },
    { icon: <Flame className="w-5 h-5" />,  label: 'Live Now',         value: liveMatches.length,       gradient: '#ef4444', delay: 0.15, sub: liveMatches.length>0?'🔴':'—' },
    { icon: <Calendar className="w-5 h-5" />,label: 'Upcoming',        value: upcomingMatches.length,   gradient: '#2563EB', delay: 0.2  },
    { icon: <Medal className="w-5 h-5" />,  label: 'Champions',        value: teams.filter(t=>t.status==='champion').length, gradient: '#d97706', delay: 0.25 },
  ];

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-3xl sm:text-4xl text-blue-600 font-extrabold mb-1">Dashboard</motion.h1>
        <p className="text-gray-500 text-sm">{TOURNAMENT.name} · {TOURNAMENT.status === 'live' ? 'Live Now' : TOURNAMENT.status}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Tournament progress */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">Tournament Progress</h2>
        </div>
        <div className="space-y-4">
          <ProgressBar value={progress} label="Overall Completion" />
          <ProgressBar
            value={Math.round((matches.filter(m=>m.game==='carrom'&&m.status==='completed').length / 15) * 100)}
            label="Carrom Bracket"
            color="#2563EB"
          />
          <ProgressBar
            value={Math.round((matches.filter(m=>m.game==='sequence'&&m.status==='completed').length / 15) * 100)}
            label="Sequence Groups"
            color="#2563EB"
          />
        </div>
      </motion.div>

      {/* Live + Upcoming */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Live */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <LiveBadge />
            <h2 className="font-semibold text-gray-900">Live Matches</h2>
          </div>
          {liveMatches.length > 0 ? (
            <div className="space-y-3">
              {liveMatches.map((m) => (
                <MatchCard key={m.id} match={m} teamA={getTeam(m.teamAId)!} teamB={getTeam(m.teamBId)!} compact />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">No live matches right now</div>
          )}
        </div>

        {/* Upcoming */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-gray-900">Upcoming Matches</h2>
          </div>
          {upcomingMatches.length > 0 ? (
            <div className="space-y-3">
              {upcomingMatches.slice(0, 4).map((m) => (
                <MatchCard key={m.id} match={m} teamA={getTeam(m.teamAId)!} teamB={getTeam(m.teamBId)!} compact />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">No upcoming matches</div>
          )}
        </div>
      </div>

      {/* Updates — Sliding Carousel */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Newspaper className="w-5 h-5 text-blue-600" />
            <h2 className="font-semibold text-gray-900">Updates</h2>
          </div>
          <div className="flex items-center gap-2">
            {updates.length > 1 && (
              <>
                <button onClick={() => { const el = scrollRef.current; if (el) el.scrollBy({ left: -320, behavior: 'smooth' }); }}
                  className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <button onClick={() => { const el = scrollRef.current; if (el) el.scrollBy({ left: 320, behavior: 'smooth' }); }}
                  className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </>
            )}
            {isAdmin && (
              <button onClick={() => { setUpdateForm({ image: '', text: '', playerId: '', teamId: '' }); setShowUpdateModal(true); }}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 flex items-center gap-1.5 text-xs font-semibold">
                <Plus className="w-3.5 h-3.5" /> Post Update
              </button>
            )}
          </div>
        </div>
        {updates.length > 0 ? (
          <div ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-1 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {updates.map((u, i) => {
              const player = players.find((p) => p.id === u.playerId);
              const team = teams.find((t) => t.id === u.teamId);
              return (
                <motion.div key={u.id}
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {u.image && (
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img src={u.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-sm text-gray-800 leading-relaxed line-clamp-3">{u.text}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 min-w-0">
                        {player && (
                          <div className="flex items-center gap-1.5 min-w-0">
                            <img src={player.photo} alt="" loading="lazy" className="w-5 h-5 rounded-full object-cover flex-shrink-0" />
                            <span className="text-xs text-gray-600 font-medium truncate">{player.name}</span>
                          </div>
                        )}
                        {team && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold text-white flex-shrink-0" style={{ background: team.color }}>
                            {team.logo}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className="text-[10px] text-gray-400">{new Date(u.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                        {isAdmin && (
                          <button onClick={() => { deleteUpdate(u.id); toast.success('Update deleted'); }}
                            className="w-6 h-6 rounded flex items-center justify-center hover:bg-red-50">
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">No updates yet</div>
        )}
      </div>

      {/* Recent announcements */}
      <div className="mt-8">
        <h2 className="font-semibold mb-4 text-gray-900">Recent Announcements</h2>
        <div className="space-y-2">
          {announcements.slice(0, 3).map((a) => (
            <motion.div key={a.id} whileHover={{ x: 4 }}
              className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3 hover:shadow-sm transition-shadow">
              <span className="text-xl">{a.type==='champion'?'🎉':a.type==='winner'?'🏆':a.type==='match'?'⚡':'📢'}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate text-gray-900">{a.title}</div>
                <div className="text-xs text-gray-500 truncate">{a.body}</div>
              </div>
              <div className="text-xs text-gray-500 flex-shrink-0">{new Date(a.createdAt).toLocaleDateString([],{month:'short',day:'numeric'})}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Post Update Modal */}
      {showUpdateModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowUpdateModal(false)}>
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-900">Post Update</h3>
              <button onClick={() => setShowUpdateModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Image URL *</label>
                <input placeholder="https://... or /images/photo.jpg" value={updateForm.image}
                  onChange={(e) => setUpdateForm({ ...updateForm, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm outline-none bg-white text-gray-900" />
              </div>
              {updateForm.image && (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img src={updateForm.image} alt="Preview" className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Description *</label>
                <textarea placeholder="Player experience, achievements, details..." value={updateForm.text}
                  onChange={(e) => setUpdateForm({ ...updateForm, text: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm outline-none bg-white text-gray-900 resize-none" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Player (optional)</label>
                <select value={updateForm.playerId} onChange={(e) => setUpdateForm({ ...updateForm, playerId: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm outline-none bg-white text-gray-900">
                  <option value="">— Select player —</option>
                  {players.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Team (optional)</label>
                <select value={updateForm.teamId} onChange={(e) => setUpdateForm({ ...updateForm, teamId: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-sm outline-none bg-white text-gray-900">
                  <option value="">— Select team —</option>
                  {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setShowUpdateModal(false)} className="flex-1 py-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50">Cancel</button>
              <button onClick={() => {
                if (!updateForm.image || !updateForm.text) { toast.error('Image and description are required'); return; }
                addUpdate({
                  image: updateForm.image,
                  text: updateForm.text,
                  playerId: updateForm.playerId || undefined,
                  teamId: updateForm.teamId || undefined,
                  createdAt: new Date().toISOString(),
                });
                toast.success('Update posted!');
                setShowUpdateModal(false);
              }} className="flex-1 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700">
                Post Update
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
}
