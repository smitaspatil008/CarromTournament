import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import TeamCard from '../components/tournament/TeamCard';
import { useTournamentStore } from '../store/tournamentStore';

export default function Teams() {
  const { teams, players } = useTournamentStore();
  const [search, setSearch] = useState('');
  const [game, setGame] = useState<'all' | 'carrom' | 'sequence'>('all');

  const filtered = teams.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase());
    const matchesGame = game === 'all' || t.game === game;
    return matchesSearch && matchesGame;
  });

  const getTeamPlayers = (teamId: string) => players.filter((p) => p.teamId === teamId);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl gradient-text mb-1">Teams</h1>
        <p className="text-muted text-sm">{teams.length} teams across 2 games</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teams or departments…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'carrom', 'sequence'] as const).map((g) => (
            <button key={g} onClick={() => setGame(g)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-colors"
              style={{
                background: game === g ? 'linear-gradient(135deg,#2563EB,#7C3AED)' : 'var(--color-surface)',
                color: game === g ? 'white' : 'var(--color-text-muted)',
                border: game === g ? 'none' : '1px solid var(--color-border)',
              }}>
              {g === 'all' ? 'All Games' : g}
            </button>
          ))}
        </div>
      </div>

      {/* Games section */}
      {game === 'all' ? (
        <>
          <div className="mb-8">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              🎯 Carrom Teams <span className="text-sm text-muted font-normal">({teams.filter(t=>t.game==='carrom').length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.filter(t=>t.game==='carrom').map((t, i) => (
                <TeamCard key={t.id} team={t} players={getTeamPlayers(t.id)} delay={i * 0.04} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
              🃏 Sequence Teams <span className="text-sm text-muted font-normal">({teams.filter(t=>t.game==='sequence').length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.filter(t=>t.game==='sequence').map((t, i) => (
                <TeamCard key={t.id} team={t} players={getTeamPlayers(t.id)} delay={i * 0.04} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((t, i) => (
            <TeamCard key={t.id} team={t} players={getTeamPlayers(t.id)} delay={i * 0.04} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-4 surface rounded-2xl p-12 text-center text-muted">No teams found</div>
          )}
        </div>
      )}
    </Layout>
  );
}
