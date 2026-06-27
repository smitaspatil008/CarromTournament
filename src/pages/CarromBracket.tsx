import { motion } from 'framer-motion';
import { Target, Info } from 'lucide-react';
import Layout from '../components/layout/Layout';
import KnockoutBracket from '../components/tournament/KnockoutBracket';
import { useTournamentStore } from '../store/tournamentStore';

export default function CarromBracket() {
  const { matches, teams } = useTournamentStore();
  const carromMatches = matches.filter((m) => m.game === 'carrom');
  const carromTeams = teams.filter((t) => t.game === 'carrom');

  const completed = carromMatches.filter((m) => m.status === 'completed').length;
  const live = carromMatches.filter((m) => m.status === 'live').length;
  const total = 15;

  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl"
            style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)' }}>🎯</div>
          <h1 className="font-display font-bold text-3xl gradient-text">Carrom Bracket</h1>
        </div>
        <p className="text-muted text-sm">Knockout tournament · Round of 16 to Champion</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
        {[
          { label: 'Round of 16', total: 8,  done: carromMatches.filter(m=>m.round==='Round of 16'&&m.status==='completed').length },
          { label: 'Quarter Finals', total: 4, done: carromMatches.filter(m=>m.round==='Quarter Finals'&&m.status==='completed').length },
          { label: 'Semi Finals', total: 2,  done: carromMatches.filter(m=>m.round==='Semi Finals'&&m.status==='completed').length },
          { label: 'Final', total: 1,        done: carromMatches.filter(m=>m.round==='Final'&&m.status==='completed').length },
        ].map((r) => (
          <div key={r.label} className="surface rounded-xl p-3 text-center col-span-1 sm:col-span-1">
            <div className="font-bold text-xl" style={{ color: 'var(--color-text)' }}>{r.done}/{r.total}</div>
            <div className="text-[10px] text-muted mt-0.5">{r.label}</div>
            <div className="mt-1.5 h-1 rounded-full" style={{ background: 'var(--color-surface-2)' }}>
              <div className="h-full rounded-full" style={{ width: `${(r.done/r.total)*100}%`, background: 'linear-gradient(90deg,#2563EB,#7C3AED)' }} />
            </div>
          </div>
        ))}
        <div className="surface rounded-xl p-3 text-center col-span-1">
          <div className="font-bold text-xl text-red-500">{live}</div>
          <div className="text-[10px] text-muted mt-0.5">Live</div>
        </div>
        <div className="surface rounded-xl p-3 text-center col-span-1">
          <div className="font-bold text-xl text-green-500">{completed}</div>
          <div className="text-[10px] text-muted mt-0.5">Done</div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-muted">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500 inline-block" /> Live match</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-blue-500/40 border border-blue-500 inline-block" /> Completed</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-yellow-500/40 border border-yellow-500 inline-block champion-glow" /> Champion</span>
        <span className="flex items-center gap-1.5"><Info className="w-3 h-3" /> Click any match to view details</span>
      </div>

      {/* Bracket */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="surface rounded-2xl p-6">
        <KnockoutBracket matches={carromMatches} teams={carromTeams} />
      </motion.div>

      {/* Teams grid */}
      <div className="mt-10">
        <h2 className="font-semibold text-lg mb-4" style={{ color: 'var(--color-text)' }}>All Teams</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {carromTeams.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
              className={`surface rounded-xl p-2 text-center ${t.status === 'eliminated' ? 'opacity-40' : ''}`}>
              <div className="w-10 h-10 rounded-lg mx-auto flex items-center justify-center text-white text-sm font-bold mb-1"
                style={{ background: t.color }}>{t.logo}</div>
              <div className="text-[10px] font-medium leading-tight" style={{ color: 'var(--color-text)' }}>{t.name}</div>
              <div className={`text-[9px] mt-0.5 ${t.status==='eliminated'?'text-red-400':'text-green-500'}`}>
                {t.status === 'eliminated' ? 'Out' : 'Active'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
