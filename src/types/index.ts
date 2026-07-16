export type GameType = 'carrom' | 'sequence';
export type MatchStatus = 'upcoming' | 'live' | 'completed';
export type TournamentStatus = 'upcoming' | 'live' | 'completed';
export type AnnouncementType = 'info' | 'match' | 'winner' | 'champion';

export interface Tournament {
  id: string;
  name: string;
  year: number;
  status: TournamentStatus;
  startDate: string;
  endDate: string;
}

export interface Player {
  id: string;
  name: string;
  photo: string;
  teamId: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  color: string;
  playerIds: string[];
  wins: number;
  losses: number;
  points: number;
  status: 'active' | 'eliminated' | 'champion' | 'runner-up';
  game: GameType;
}

export interface Match {
  id: string;
  game: GameType;
  round: string;
  teamAId: string;
  teamBId: string;
  scoreA: number;
  scoreB: number;
  status: MatchStatus;
  court: string;
  scheduledAt: string;
  winner?: string;
  history?: Array<{ scoreA: number; scoreB: number }>;
}

export interface Group {
  id: string;
  name: string;
  game: GameType;
  teamIds: string[];
}

export interface GroupStanding {
  teamId: string;
  played: number;
  won: number;
  lost: number;
  drawn: number;
  sequences: number;
  chipsUsed: number;
  points: number;
  qualified: boolean;
}

export interface SequenceMatchStats {
  sequencesA: number;
  sequencesB: number;
  chipsUsedA: number;
  chipsUsedB: number;
}

export interface GalleryItem {
  id: string;
  photo: string;
  caption: string;
  category: 'match' | 'celebration' | 'team' | 'player';
  uploadedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  type: AnnouncementType;
  createdAt: string;
}

export interface HistoryEntry {
  year: number;
  tournamentName: string;
  champion: string;
  runnerUp: string;
  mvp: string;
  totalTeams: number;
  totalMatches: number;
  photoUrl: string;
  stats: Record<string, string | number>;
}

export interface AuthState {
  isLoggedIn: boolean;
  role: 'admin' | 'umpire' | null;
}
