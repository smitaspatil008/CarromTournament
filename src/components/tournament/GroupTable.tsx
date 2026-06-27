import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import type { Group, GroupStanding, Team } from '../../types';

interface Props {
  group: Group;
  standings: GroupStanding[];
  teams: Team[];
}

export default function GroupTable({ group, standings, teams }: Props) {
  const getTeam = (id: string) => teams.find((t) => t.id === id);

  return (
    <div className="surface rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: 'var(--color-border)', background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.08))' }}>
        <h3 className="font-display font-bold text-lg gradient-text">{group.name}</h3>
        <span className="text-xs text-muted capitalize px-2 py-1 rounded-lg surface-2">{group.game}</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: 'var(--color-surface-2)' }}>
              <th className="text-left px-5 py-3 text-xs font-semibold text-muted">#</th>
              <th className="text-left px-2 py-3 text-xs font-semibold text-muted">Team</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted">P</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted">W</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted">L</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted">Pts</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s, idx) => {
              const team = getTeam(s.teamId);
              if (!team) return null;
              return (
                <motion.tr
                  key={s.teamId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="border-t transition-colors hover:bg-brand-blue/5"
                  style={{
                    borderColor: 'var(--color-border)',
                    background: s.qualified ? 'rgba(37,99,235,0.04)' : 'transparent',
                  }}
                >
                  <td className="px-5 py-3.5">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${idx < 2 ? 'text-white' : 'text-muted'}`}
                      style={{ background: idx < 2 ? 'linear-gradient(135deg,#2563EB,#7C3AED)' : 'transparent' }}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-2 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: team.color }}>
                        {team.logo}
                      </div>
                      <div>
                        <div className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{team.name}</div>
                        <div className="text-[10px] text-muted">{team.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center px-3 py-3.5 text-muted">{s.played}</td>
                  <td className="text-center px-3 py-3.5 font-semibold text-green-500">{s.won}</td>
                  <td className="text-center px-3 py-3.5 font-semibold text-red-400">{s.lost}</td>
                  <td className="text-center px-3 py-3.5">
                    <span className="font-bold text-brand-blue">{s.points}</span>
                  </td>
                  <td className="text-center px-3 py-3.5">
                    {s.qualified ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Qualified
                      </span>
                    ) : (
                      <span className="text-xs text-muted">—</span>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 border-t text-xs text-muted" style={{ borderColor: 'var(--color-border)' }}>
        <span className="inline-block w-3 h-3 rounded mr-1" style={{ background: 'rgba(37,99,235,0.2)', verticalAlign: 'middle' }} />
        Top 2 teams qualify for playoffs
      </div>
    </div>
  );
}
