import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type { Team, Player, Match, GalleryItem, Announcement, HistoryEntry, SequenceMatchStats, GroupStanding, TournamentUpdate } from '../types';
import {
  ALL_TEAMS, PLAYERS, MATCHES, GALLERY, ANNOUNCEMENTS,
  CARROM_TEAMS, SEQUENCE_TEAMS, HISTORY, TOURNAMENT, GROUPS,
} from '../data/mockData';

interface ScoreHistory { scoreA: number; scoreB: number; }
export interface BreakScore { scoreA: number; scoreB: number; }

interface TournamentState {
  teams: Team[];
  players: Player[];
  matches: Match[];
  gallery: GalleryItem[];
  announcements: Announcement[];
  history: HistoryEntry[];
  scoreHistory: Record<string, ScoreHistory[]>;
  breakScores: Record<string, BreakScore[]>;
  sequenceStats: Record<string, SequenceMatchStats>;
  isAdmin: boolean;
  adminPin: string;

  login: (pin: string, role: 'admin' | 'umpire') => boolean;
  logout: () => void;
  userRole: 'admin' | 'umpire' | null;

  addTeam: (team: Omit<Team, 'id'>) => void;
  updateTeam: (id: string, updates: Partial<Team>) => void;
  deleteTeam: (id: string) => void;

  addPlayer: (player: Omit<Player, 'id'>) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  deletePlayer: (id: string) => void;

  addMatch: (match: Omit<Match, 'id'>) => void;
  updateMatch: (id: string, updates: Partial<Match>) => void;
  deleteMatch: (id: string) => void;
  startMatch: (id: string) => void;
  updateScore: (id: string, teamA: number, teamB: number) => void;
  undoScore: (id: string) => void;
  finishMatch: (id: string, winner: string) => void;

  updateBreakScore: (matchId: string, breakIdx: number, scoreA: number, scoreB: number) => void;
  updateSequenceStats: (matchId: string, stats: SequenceMatchStats) => void;

  addPhoto: (item: Omit<GalleryItem, 'id'>) => void;
  deletePhoto: (id: string) => void;

  addAnnouncement: (a: Omit<Announcement, 'id'>) => void;

  addHistoryEntry: (entry: HistoryEntry) => void;
  deleteHistoryEntry: (year: number) => void;

  updates: TournamentUpdate[];
  addUpdate: (update: Omit<TournamentUpdate, 'id'>) => void;
  deleteUpdate: (id: string) => void;

  changePin: (newPin: string) => void;
  deleteCompletedMatches: () => void;

  reset: () => void;
}

const uid = () => Math.random().toString(36).slice(2, 10);

export const useTournamentStore = create<TournamentState>()(
  persist(
    (set, get) => ({
      teams: ALL_TEAMS,
      players: PLAYERS,
      matches: MATCHES,
      gallery: GALLERY,
      announcements: ANNOUNCEMENTS,
      history: HISTORY,
      scoreHistory: {},
      breakScores: {},
      sequenceStats: {},
      updates: [],
      isAdmin: false,
      adminPin: '123456',
      userRole: null,

      login: (pin, role) => {
        if (pin === get().adminPin) {
          set({ isAdmin: true, userRole: role });
          return true;
        }
        return false;
      },
      logout: () => set({ isAdmin: false, userRole: null }),

      addTeam: (team) =>
        set((s) => ({ teams: [...s.teams, { ...team, id: 't_' + uid() }] })),
      updateTeam: (id, updates) =>
        set((s) => ({ teams: s.teams.map((t) => (t.id === id ? { ...t, ...updates } : t)) })),
      deleteTeam: (id) =>
        set((s) => ({
          teams: s.teams.filter((t) => t.id !== id),
          players: s.players.filter((p) => p.teamId !== id),
          matches: s.matches.filter((m) => m.teamAId !== id && m.teamBId !== id),
        })),

      addPlayer: (player) =>
        set((s) => {
          const newId = 'p_' + uid();
          return {
            players: [...s.players, { ...player, id: newId }],
            teams: s.teams.map((t) =>
              t.id === player.teamId ? { ...t, playerIds: [...t.playerIds, newId] } : t
            ),
          };
        }),
      updatePlayer: (id, updates) =>
        set((s) => ({ players: s.players.map((p) => (p.id === id ? { ...p, ...updates } : p)) })),
      deletePlayer: (id) =>
        set((s) => ({
          players: s.players.filter((p) => p.id !== id),
          teams: s.teams.map((t) => ({ ...t, playerIds: t.playerIds.filter((pid) => pid !== id) })),
        })),

      addMatch: (match) =>
        set((s) => ({ matches: [...s.matches, { ...match, id: 'm_' + uid() }] })),
      updateMatch: (id, updates) =>
        set((s) => ({ matches: s.matches.map((m) => (m.id === id ? { ...m, ...updates } : m)) })),
      deleteMatch: (id) =>
        set((s) => ({ matches: s.matches.filter((m) => m.id !== id) })),

      startMatch: (id) =>
        set((s) => ({
          matches: s.matches.map((m) => (m.id === id ? { ...m, status: 'live' } : m)),
        })),

      updateScore: (id, teamA, teamB) =>
        set((s) => {
          const match = s.matches.find((m) => m.id === id);
          if (!match) return {};
          const prev = s.scoreHistory[id] ?? [];
          return {
            matches: s.matches.map((m) =>
              m.id === id ? { ...m, scoreA: teamA, scoreB: teamB } : m
            ),
            scoreHistory: { ...s.scoreHistory, [id]: [...prev, { scoreA: match.scoreA, scoreB: match.scoreB }] },
          };
        }),

      undoScore: (id) =>
        set((s) => {
          const hist = s.scoreHistory[id] ?? [];
          if (!hist.length) return {};
          const last = hist[hist.length - 1];
          return {
            matches: s.matches.map((m) =>
              m.id === id ? { ...m, scoreA: last.scoreA, scoreB: last.scoreB } : m
            ),
            scoreHistory: { ...s.scoreHistory, [id]: hist.slice(0, -1) },
          };
        }),

      finishMatch: (id, winner) =>
        set((s) => ({
          matches: s.matches.map((m) =>
            m.id === id ? { ...m, status: 'completed', winner } : m
          ),
        })),

      updateBreakScore: (matchId, breakIdx, scoreA, scoreB) =>
        set((s) => {
          const breaks = [...(s.breakScores[matchId] ?? [])];
          while (breaks.length <= breakIdx) breaks.push({ scoreA: 0, scoreB: 0 });
          breaks[breakIdx] = { scoreA, scoreB };
          const totalA = breaks.reduce((sum, b) => sum + b.scoreA, 0);
          const totalB = breaks.reduce((sum, b) => sum + b.scoreB, 0);
          return {
            breakScores: { ...s.breakScores, [matchId]: breaks },
            matches: s.matches.map((m) =>
              m.id === matchId ? { ...m, scoreA: totalA, scoreB: totalB } : m
            ),
          };
        }),

      updateSequenceStats: (matchId, stats) =>
        set((s) => ({
          sequenceStats: { ...s.sequenceStats, [matchId]: stats },
        })),

      addPhoto: (item) =>
        set((s) => ({ gallery: [{ ...item, id: 'gal_' + uid() }, ...s.gallery] })),
      deletePhoto: (id) =>
        set((s) => ({ gallery: s.gallery.filter((g) => g.id !== id) })),

      addAnnouncement: (a) =>
        set((s) => ({ announcements: [{ ...a, id: 'ann_' + uid() }, ...s.announcements] })),

      addHistoryEntry: (entry) =>
        set((s) => ({ history: [entry, ...s.history] })),
      deleteHistoryEntry: (year) =>
        set((s) => ({ history: s.history.filter((h) => h.year !== year) })),

      addUpdate: (update) =>
        set((s) => ({ updates: [{ ...update, id: 'upd_' + uid() }, ...s.updates] })),
      deleteUpdate: (id) =>
        set((s) => ({ updates: s.updates.filter((u) => u.id !== id) })),

      changePin: (newPin) => set({ adminPin: newPin }),
      deleteCompletedMatches: () =>
        set((s) => ({ matches: s.matches.filter((m) => m.status !== 'completed') })),

      reset: () =>
        set({
          teams: ALL_TEAMS,
          players: PLAYERS,
          matches: MATCHES,
          gallery: GALLERY,
          announcements: ANNOUNCEMENTS,
          history: HISTORY,
          scoreHistory: {},
          breakScores: {},
          sequenceStats: {},
        }),
    }),
    {
      name: 'josh-tournament-store',
      version: 9,
      migrate: (persistedState: any, version: number) => {
        if (version < 9) {
          persistedState.teams = ALL_TEAMS;
          persistedState.players = PLAYERS;
          persistedState.matches = MATCHES;
          persistedState.announcements = ANNOUNCEMENTS;
          persistedState.adminPin = '123456';
          persistedState.history = HISTORY;
          persistedState.sequenceStats = {};
          persistedState.breakScores = {};
        }
        return persistedState as TournamentState;
      },
    }
  )
);

// ─── Computed group standings from match results ─────────────────────────────
export function computeGroupStandings(
  groupTeamIds: string[],
  matches: Match[],
  sequenceStats: Record<string, SequenceMatchStats>,
): GroupStanding[] {
  const groupMatches = matches.filter(
    (m) => m.game === 'sequence' && m.status === 'completed'
      && groupTeamIds.includes(m.teamAId) && groupTeamIds.includes(m.teamBId)
  );

  const map = new Map<string, GroupStanding>();
  for (const tid of groupTeamIds) {
    map.set(tid, { teamId: tid, played: 0, won: 0, lost: 0, drawn: 0, sequences: 0, chipsUsed: 0, points: 0, qualified: false });
  }

  for (const m of groupMatches) {
    const a = map.get(m.teamAId)!;
    const b = map.get(m.teamBId)!;
    const stats = sequenceStats[m.id];
    const seqA = stats?.sequencesA ?? 0;
    const seqB = stats?.sequencesB ?? 0;
    const chipsA = stats?.chipsUsedA ?? 0;
    const chipsB = stats?.chipsUsedB ?? 0;

    a.played++;
    b.played++;
    a.sequences += seqA;
    b.sequences += seqB;

    if (m.winner === 'draw') {
      a.drawn++;
      b.drawn++;
      a.points += 1 + seqA;
      b.points += 1 + seqB;
    } else if (m.winner === m.teamAId) {
      a.won++;
      b.lost++;
      a.points += 2 + seqA;
      b.points += 0 + seqB;
      a.chipsUsed += chipsA;
    } else if (m.winner === m.teamBId) {
      b.won++;
      a.lost++;
      b.points += 2 + seqB;
      a.points += 0 + seqA;
      b.chipsUsed += chipsB;
    }
  }

  const standings = Array.from(map.values());

  // Sort: max points → max wins → head-to-head → min chips used in wins
  standings.sort((x, y) => {
    if (y.points !== x.points) return y.points - x.points;
    if (y.won !== x.won) return y.won - x.won;
    // Head-to-head
    const h2h = groupMatches.find(
      (m) => m.status === 'completed' &&
        ((m.teamAId === x.teamId && m.teamBId === y.teamId) ||
         (m.teamAId === y.teamId && m.teamBId === x.teamId))
    );
    if (h2h && h2h.winner && h2h.winner !== 'draw') {
      return h2h.winner === x.teamId ? -1 : 1;
    }
    // Min chips used in matches won
    if (x.chipsUsed !== y.chipsUsed) return x.chipsUsed - y.chipsUsed;
    return 0;
  });

  standings.forEach((s, i) => { s.qualified = i < 2; });
  return standings;
}

// Selectors
export const useCarromTeams = () => useTournamentStore(useShallow((s) => s.teams.filter((t) => t.game === 'carrom')));
export const useSequenceTeams = () => useTournamentStore(useShallow((s) => s.teams.filter((t) => t.game === 'sequence')));
export const useLiveMatches = () => useTournamentStore(useShallow((s) => s.matches.filter((m) => m.status === 'live')));
export const useUpcomingMatches = () => useTournamentStore(useShallow((s) => s.matches.filter((m) => m.status === 'upcoming')));
export const useCompletedMatches = () => useTournamentStore(useShallow((s) => s.matches.filter((m) => m.status === 'completed')));
