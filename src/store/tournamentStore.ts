import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import type { Team, Player, Match, GalleryItem, Announcement } from '../types';
import {
  ALL_TEAMS, PLAYERS, MATCHES, GALLERY, ANNOUNCEMENTS,
  CARROM_TEAMS, SEQUENCE_TEAMS,
} from '../data/mockData';

interface ScoreHistory { scoreA: number; scoreB: number; }

interface TournamentState {
  teams: Team[];
  players: Player[];
  matches: Match[];
  gallery: GalleryItem[];
  announcements: Announcement[];
  scoreHistory: Record<string, ScoreHistory[]>;
  isAdmin: boolean;
  adminPin: string;

  // Auth
  login: (pin: string, role: 'admin' | 'umpire') => boolean;
  logout: () => void;
  userRole: 'admin' | 'umpire' | null;

  // Teams
  addTeam: (team: Omit<Team, 'id'>) => void;
  updateTeam: (id: string, updates: Partial<Team>) => void;

  // Players
  addPlayer: (player: Omit<Player, 'id'>) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;

  // Matches
  addMatch: (match: Omit<Match, 'id'>) => void;
  startMatch: (id: string) => void;
  updateScore: (id: string, teamA: number, teamB: number) => void;
  undoScore: (id: string) => void;
  finishMatch: (id: string, winner: string) => void;

  // Gallery
  addPhoto: (item: Omit<GalleryItem, 'id'>) => void;

  // Announcements
  addAnnouncement: (a: Omit<Announcement, 'id'>) => void;

  // Reset
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
      scoreHistory: {},
      isAdmin: false,
      adminPin: '1234',
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

      addPlayer: (player) =>
        set((s) => ({ players: [...s.players, { ...player, id: 'p_' + uid() }] })),
      updatePlayer: (id, updates) =>
        set((s) => ({ players: s.players.map((p) => (p.id === id ? { ...p, ...updates } : p)) })),

      addMatch: (match) =>
        set((s) => ({ matches: [...s.matches, { ...match, id: 'm_' + uid() }] })),

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

      addPhoto: (item) =>
        set((s) => ({ gallery: [{ ...item, id: 'gal_' + uid() }, ...s.gallery] })),

      addAnnouncement: (a) =>
        set((s) => ({ announcements: [{ ...a, id: 'ann_' + uid() }, ...s.announcements] })),

      reset: () =>
        set({
          teams: ALL_TEAMS,
          players: PLAYERS,
          matches: MATCHES,
          gallery: GALLERY,
          announcements: ANNOUNCEMENTS,
          scoreHistory: {},
        }),
    }),
    { name: 'josh-tournament-store' }
  )
);

// Selectors
export const useCarromTeams = () => useTournamentStore(useShallow((s) => s.teams.filter((t) => t.game === 'carrom')));
export const useSequenceTeams = () => useTournamentStore(useShallow((s) => s.teams.filter((t) => t.game === 'sequence')));
export const useLiveMatches = () => useTournamentStore(useShallow((s) => s.matches.filter((m) => m.status === 'live')));
export const useUpcomingMatches = () => useTournamentStore(useShallow((s) => s.matches.filter((m) => m.status === 'upcoming')));
export const useCompletedMatches = () => useTournamentStore(useShallow((s) => s.matches.filter((m) => m.status === 'completed')));
