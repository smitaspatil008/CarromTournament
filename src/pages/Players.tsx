import { useState } from 'react';
import { Search } from 'lucide-react';
import Layout from '../components/layout/Layout';
import PlayerCard from '../components/tournament/PlayerCard';
import { useTournamentStore } from '../store/tournamentStore';

export default function Players() {
  const { players, teams } = useTournamentStore();
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');

  const depts = ['All', ...Array.from(new Set(players.map((p) => p.department))).sort()];

  const filtered = players.filter((p) => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase()) || p.department.toLowerCase().includes(search.toLowerCase());
    return ms && (dept === 'All' || p.department === dept);
  });

  const getTeam = (teamId: string) => teams.find((t) => t.id === teamId);

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl gradient-text mb-1">Players</h1>
        <p className="text-muted text-sm">{players.length} athletes competing in JOSH 2026</p>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search players…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-brand-blue/30"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          />
        </div>
      </div>

      {/* Department filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {depts.slice(0, 12).map((d) => (
          <button key={d} onClick={() => setDept(d)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            style={{
              background: dept === d ? 'linear-gradient(135deg,#2563EB,#7C3AED)' : 'var(--color-surface-2)',
              color: dept === d ? 'white' : 'var(--color-text-muted)',
              border: dept === d ? 'none' : '1px solid var(--color-border)',
            }}>
            {d}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted mb-4">{filtered.length} players</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filtered.map((p, i) => (
          <PlayerCard key={p.id} player={p} team={getTeam(p.teamId)} delay={Math.min(i * 0.03, 0.5)} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-6 surface rounded-2xl p-12 text-center text-muted">No players found</div>
        )}
      </div>
    </Layout>
  );
}
