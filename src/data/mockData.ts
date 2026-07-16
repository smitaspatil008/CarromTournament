import type { Team, Player, Match, Group, GroupStanding, GalleryItem, Announcement, HistoryEntry, Tournament } from '../types';

export const TOURNAMENT: Tournament = {
  id: 't1',
  name: 'JOSH Tournament 2026',
  year: 2026,
  status: 'live',
  startDate: '2026-07-20',
  endDate: '2026-07-24',
};

// ─── Carrom Teams (16 teams, knockout) ────────────────────────────────────────
export const CARROM_TEAMS: Team[] = [
  { id: 'ct1',  name: 'Gopal K - Akshay N',     logo: 'GA', color: '#2563EB', playerIds: ['p1','p2'],   wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct2',  name: 'Amit C - Rupam P',        logo: 'AR', color: '#7C3AED', playerIds: ['p3','p4'],   wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct3',  name: 'Maaj P - Shubham S',      logo: 'MS', color: '#059669', playerIds: ['p5','p6'],   wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct4',  name: 'Umesh W - Pavan R',        logo: 'UP', color: '#DC2626', playerIds: ['p7','p8'],   wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct5',  name: 'Vikas S - Sikandar S',    logo: 'VS', color: '#D97706', playerIds: ['p9','p10'],  wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct6',  name: 'Krushna L - Akshay U',    logo: 'KL', color: '#0891B2', playerIds: ['p11','p12'], wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct7',  name: 'Hemant N - Vishal R',     logo: 'HV', color: '#DB2777', playerIds: ['p13','p14'], wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct8',  name: 'Sanjay S - Mayur D',      logo: 'SM', color: '#4F46E5', playerIds: ['p15','p16'], wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct9',  name: 'Taman - Hitesh',          logo: 'TH', color: '#EA580C', playerIds: ['p17','p18'], wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct10', name: 'Pushkaraj K - Akshay M',  logo: 'PA', color: '#16A34A', playerIds: ['p19','p20'], wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct11', name: 'Hariom - Tushar S',       logo: 'HT', color: '#9333EA', playerIds: ['p21','p22'], wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct12', name: 'Shivam G - Krushna B',    logo: 'SK', color: '#0369A1', playerIds: ['p23','p24'], wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct13', name: 'Sameer D - Nuran K',      logo: 'SN', color: '#B91C1C', playerIds: ['p25','p26'], wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct14', name: 'Sanjay - Ashish S',        logo: 'SA', color: '#1D4ED8', playerIds: ['p27','p28'], wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct15', name: 'Alim - Ganesh U',          logo: 'AG', color: '#B45309', playerIds: ['p29','p30'], wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
  { id: 'ct16', name: 'Rahul P - Rakesh N',      logo: 'RR', color: '#6D28D9', playerIds: ['p31','p32'], wins: 0, losses: 0, points: 0, status: 'active', game: 'carrom' },
];

// ─── Sequence Teams (8 teams, 2 groups of 4) ─────────────────────────────────
export const SEQUENCE_TEAMS: Team[] = [
  { id: 'st1', name: 'Astitwa R - Garima G - Tejaswini K',    logo: 'A',  color: '#2563EB', playerIds: ['sp1','sp2','sp3'],   wins: 0, losses: 0, points: 0, status: 'active', game: 'sequence' },
  { id: 'st2', name: 'Sofia H - Ayush K - Manik B',           logo: 'B',  color: '#7C3AED', playerIds: ['sp4','sp5','sp6'],   wins: 0, losses: 0, points: 0, status: 'active', game: 'sequence' },
  { id: 'st3', name: 'Shruti - Sanika - Anushree',            logo: 'C',  color: '#059669', playerIds: ['sp7','sp8','sp9'],   wins: 0, losses: 0, points: 0, status: 'active', game: 'sequence' },
  { id: 'st4', name: 'Gauri S - Aditya V - Pranav D',         logo: 'D',  color: '#DC2626', playerIds: ['sp10','sp11','sp12'], wins: 0, losses: 0, points: 0, status: 'active', game: 'sequence' },
  { id: 'st5', name: 'Vijay M - Rushikesh J - Vaishnavi M',   logo: 'E',  color: '#D97706', playerIds: ['sp13','sp14','sp15'], wins: 0, losses: 0, points: 0, status: 'active', game: 'sequence' },
  { id: 'st6', name: 'Gayatri K - Tejas J - Pandurang',       logo: 'F',  color: '#DB2777', playerIds: ['sp16','sp17','sp18'], wins: 0, losses: 0, points: 0, status: 'active', game: 'sequence' },
  { id: 'st7', name: 'Mayank B - Gauri D - Gaurav T',         logo: 'G',  color: '#0891B2', playerIds: ['sp19','sp20','sp21'], wins: 0, losses: 0, points: 0, status: 'active', game: 'sequence' },
  { id: 'st8', name: 'Madhura J - Harshita M - Aboli D',      logo: 'H',  color: '#4F46E5', playerIds: ['sp22','sp23','sp24'], wins: 0, losses: 0, points: 0, status: 'active', game: 'sequence' },
];

export const ALL_TEAMS = [...CARROM_TEAMS, ...SEQUENCE_TEAMS];

// ─── Players ──────────────────────────────────────────────────────────────────
const makePlayer = (id: string, name: string, teamId: string, img: number, w: number, l: number): Player => ({
  id, name, photo: `https://i.pravatar.cc/150?img=${img}`, teamId, gamesPlayed: w + l, wins: w, losses: l,
});

export const PLAYERS: Player[] = [
  // Carrom players (2 per team)
  makePlayer('p1',  'Gopal Kadam',           'ct1',   1, 0, 0),
  makePlayer('p2',  'Akshay Nimbolkar',      'ct1',   2, 0, 0),
  makePlayer('p3',  'Amit Chavan',           'ct2',   3, 0, 0),
  makePlayer('p4',  'Rupam Patil',           'ct2',   4, 0, 0),
  makePlayer('p5',  'Maaj Patel',            'ct3',   5, 0, 0),
  makePlayer('p6',  'Shubham Sadare',        'ct3',   6, 0, 0),
  makePlayer('p7',  'Umesh Warulkar',        'ct4',   7, 0, 0),
  makePlayer('p8',  'Pavan Rane',            'ct4',   8, 0, 0),
  makePlayer('p9',  'Vikas Sahu',            'ct5',   9, 0, 0),
  makePlayer('p10', 'Sikandar Shaikh',       'ct5',  10, 0, 0),
  makePlayer('p11', 'Krushna Lavhare',       'ct6',  11, 0, 0),
  makePlayer('p12', 'Akshay Uikey',          'ct6',  12, 0, 0),
  makePlayer('p13', 'Hemant Nemade',         'ct7',  13, 0, 0),
  makePlayer('p14', 'Vishal Rajbhar',        'ct7',  14, 0, 0),
  makePlayer('p15', 'Sanjay Saha',           'ct8',  15, 0, 0),
  makePlayer('p16', 'Mayur Dorlikar',        'ct8',  16, 0, 0),
  makePlayer('p17', 'Taman',                 'ct9',  17, 0, 0),
  makePlayer('p18', 'Hitesh',                'ct9',  18, 0, 0),
  makePlayer('p19', 'Pushkaraj Kolatkar',    'ct10', 19, 0, 0),
  makePlayer('p20', 'Akshay Kumar Maddi',    'ct10', 20, 0, 0),
  makePlayer('p21', 'Hariom',                'ct11', 21, 0, 0),
  makePlayer('p22', 'Tushar Shimpi',         'ct11', 22, 0, 0),
  makePlayer('p23', 'Shivam Gore',           'ct12', 23, 0, 0),
  makePlayer('p24', 'Krushna Bhosale',       'ct12', 24, 0, 0),
  makePlayer('p25', 'Sameer Dorlikar',       'ct13', 25, 0, 0),
  makePlayer('p26', 'Nuran Khan',            'ct13', 26, 0, 0),
  makePlayer('p27', 'Sanjay',                'ct14', 27, 0, 0),
  makePlayer('p28', 'Ashish Singh',          'ct14', 28, 0, 0),
  makePlayer('p29', 'Alim',                  'ct15', 29, 0, 0),
  makePlayer('p30', 'Ganesh U',              'ct15', 30, 0, 0),
  makePlayer('p31', 'Rahul Patil',           'ct16', 31, 0, 0),
  makePlayer('p32', 'Rakesh Nikalje',        'ct16', 32, 0, 0),
  // Sequence players (3 per team)
  makePlayer('sp1',  'Astitwa Roy',          'st1',  35, 0, 0),
  makePlayer('sp2',  'Garima Garg',          'st1',  36, 0, 0),
  makePlayer('sp3',  'Tejaswini Khade',      'st1',  37, 0, 0),
  makePlayer('sp4',  'Sofia Husain',         'st2',  38, 0, 0),
  makePlayer('sp5',  'Ayush Koparde',        'st2',  39, 0, 0),
  makePlayer('sp6',  'Manik Bagul',          'st2',  40, 0, 0),
  makePlayer('sp7',  'Shruti',               'st3',  41, 0, 0),
  makePlayer('sp8',  'Sanika',               'st3',  42, 0, 0),
  makePlayer('sp9',  'Anushree',             'st3',  43, 0, 0),
  makePlayer('sp10', 'Gauri Shirsath',       'st4',  44, 0, 0),
  makePlayer('sp11', 'Aditya Vats',          'st4',  45, 0, 0),
  makePlayer('sp12', 'Pranav Deshpande',     'st4',  46, 0, 0),
  makePlayer('sp13', 'Vijay Mahadik',        'st5',  47, 0, 0),
  makePlayer('sp14', 'Rushikesh Jadhav',     'st5',  48, 0, 0),
  makePlayer('sp15', 'Vaishnavi Mohalkar',   'st5',  49, 0, 0),
  makePlayer('sp16', 'Gayatri Kokate',       'st6',  50, 0, 0),
  makePlayer('sp17', 'Tejas Jadhav',         'st6',  51, 0, 0),
  makePlayer('sp18', 'Pandurang',            'st6',  52, 0, 0),
  makePlayer('sp19', 'Mayank Barve',         'st7',  53, 0, 0),
  makePlayer('sp20', 'Gauri Dighe',          'st7',  54, 0, 0),
  makePlayer('sp21', 'Gaurav Thawale',       'st7',  55, 0, 0),
  makePlayer('sp22', 'Madhura Jadhav',       'st8',  56, 0, 0),
  makePlayer('sp23', 'Harshita Mathur',      'st8',  57, 0, 0),
  makePlayer('sp24', 'Aboli Deshmukh',       'st8',  58, 0, 0),
];

// ─── Matches ──────────────────────────────────────────────────────────────────
export const MATCHES: Match[] = [
  // Carrom R16 — 20 & 21 July 2026
  { id: 'm1',  game: 'carrom', round: 'Round of 16', teamAId: 'ct15', teamBId: 'ct9',  scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-20T09:30' },
  { id: 'm2',  game: 'carrom', round: 'Round of 16', teamAId: 'ct1',  teamBId: 'ct3',  scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-20T09:30' },
  { id: 'm3',  game: 'carrom', round: 'Round of 16', teamAId: 'ct4',  teamBId: 'ct7',  scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-20T10:15' },
  { id: 'm4',  game: 'carrom', round: 'Round of 16', teamAId: 'ct12', teamBId: 'ct11', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-20T10:15' },
  { id: 'm5',  game: 'carrom', round: 'Round of 16', teamAId: 'ct16', teamBId: 'ct2',  scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-21T09:30' },
  { id: 'm6',  game: 'carrom', round: 'Round of 16', teamAId: 'ct5',  teamBId: 'ct14', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-21T09:30' },
  { id: 'm7',  game: 'carrom', round: 'Round of 16', teamAId: 'ct6',  teamBId: 'ct13', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 3', scheduledAt: '2026-07-21T10:15' },
  { id: 'm8',  game: 'carrom', round: 'Round of 16', teamAId: 'ct10', teamBId: 'ct8',  scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-21T10:15' },
  // Carrom QF — 22 July 2026
  { id: 'm9',  game: 'carrom', round: 'Quarter Finals', teamAId: 'ct15', teamBId: 'ct1',  scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-22T09:30' },
  { id: 'm10', game: 'carrom', round: 'Quarter Finals', teamAId: 'ct4',  teamBId: 'ct12', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-22T09:30' },
  { id: 'm11', game: 'carrom', round: 'Quarter Finals', teamAId: 'ct16', teamBId: 'ct5',  scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-22T10:15' },
  { id: 'm12', game: 'carrom', round: 'Quarter Finals', teamAId: 'ct6',  teamBId: 'ct10', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-22T10:15' },
  // Carrom SF — 23 July 2026
  { id: 'm13', game: 'carrom', round: 'Semi Finals', teamAId: 'ct15', teamBId: 'ct4',  scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-23T09:30' },
  { id: 'm14', game: 'carrom', round: 'Semi Finals', teamAId: 'ct16', teamBId: 'ct6',  scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-23T10:15' },
  // Carrom Final — 24 July 2026
  { id: 'm15', game: 'carrom', round: 'Final', teamAId: 'ct15', teamBId: 'ct16', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-24T09:30' },
  // Sequence Day 1 — 20 July 2026
  { id: 'sm1', game: 'sequence', round: 'Day 1', teamAId: 'st2', teamBId: 'st4', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-20T09:30' },
  { id: 'sm2', game: 'sequence', round: 'Day 1', teamAId: 'st7', teamBId: 'st1', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-20T09:30' },
  { id: 'sm3', game: 'sequence', round: 'Day 1', teamAId: 'st5', teamBId: 'st8', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-20T10:15' },
  { id: 'sm4', game: 'sequence', round: 'Day 1', teamAId: 'st3', teamBId: 'st6', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-20T10:15' },
  // Sequence Day 2 — 21 July 2026
  { id: 'sm5', game: 'sequence', round: 'Day 2', teamAId: 'st7', teamBId: 'st3', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-21T09:30' },
  { id: 'sm6', game: 'sequence', round: 'Day 2', teamAId: 'st2', teamBId: 'st5', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-21T09:30' },
  { id: 'sm7', game: 'sequence', round: 'Day 2', teamAId: 'st1', teamBId: 'st6', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-21T10:15' },
  { id: 'sm8', game: 'sequence', round: 'Day 2', teamAId: 'st4', teamBId: 'st8', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-21T10:15' },
  // Sequence Day 3 — 22 July 2026
  { id: 'sm9',  game: 'sequence', round: 'Day 3', teamAId: 'st2', teamBId: 'st8', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-22T09:30' },
  { id: 'sm10', game: 'sequence', round: 'Day 3', teamAId: 'st7', teamBId: 'st6', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-22T09:30' },
  { id: 'sm11', game: 'sequence', round: 'Day 3', teamAId: 'st4', teamBId: 'st5', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-22T10:15' },
  { id: 'sm12', game: 'sequence', round: 'Day 3', teamAId: 'st1', teamBId: 'st3', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-22T10:15' },
  // Sequence Day 4: Semifinals — 23 July 2026 (TBD until group stage completes)
  { id: 'sq_sf1', game: 'sequence', round: 'Day 4 - Semifinals', teamAId: '', teamBId: '', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-23T09:30' },
  { id: 'sq_sf2', game: 'sequence', round: 'Day 4 - Semifinals', teamAId: '', teamBId: '', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-07-23T10:15' },
  // Sequence Day 5: Final — 24 July 2026 (TBD until semifinals complete)
  { id: 'sq_fin', game: 'sequence', round: 'Day 5 - Final', teamAId: '', teamBId: '', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-24T10:00' },
];

// ─── Groups ───────────────────────────────────────────────────────────────────
export const GROUPS: Group[] = [
  { id: 'g1', name: 'Group A', game: 'sequence', teamIds: ['st1','st3','st6','st7'] },
  { id: 'g2', name: 'Group B', game: 'sequence', teamIds: ['st2','st4','st5','st8'] },
];

export const GROUP_STANDINGS: Record<string, GroupStanding[]> = {
  g1: [
    { teamId: 'st1', played: 0, won: 0, lost: 0, drawn: 0, sequences: 0, chipsUsed: 0, points: 0, qualified: false },
    { teamId: 'st3', played: 0, won: 0, lost: 0, drawn: 0, sequences: 0, chipsUsed: 0, points: 0, qualified: false },
    { teamId: 'st6', played: 0, won: 0, lost: 0, drawn: 0, sequences: 0, chipsUsed: 0, points: 0, qualified: false },
    { teamId: 'st7', played: 0, won: 0, lost: 0, drawn: 0, sequences: 0, chipsUsed: 0, points: 0, qualified: false },
  ],
  g2: [
    { teamId: 'st2', played: 0, won: 0, lost: 0, drawn: 0, sequences: 0, chipsUsed: 0, points: 0, qualified: false },
    { teamId: 'st4', played: 0, won: 0, lost: 0, drawn: 0, sequences: 0, chipsUsed: 0, points: 0, qualified: false },
    { teamId: 'st5', played: 0, won: 0, lost: 0, drawn: 0, sequences: 0, chipsUsed: 0, points: 0, qualified: false },
    { teamId: 'st8', played: 0, won: 0, lost: 0, drawn: 0, sequences: 0, chipsUsed: 0, points: 0, qualified: false },
  ],
};

// ─── Gallery ──────────────────────────────────────────────────────────────────
export const GALLERY: GalleryItem[] = [
  { id: 'g1',  photo: 'https://picsum.photos/seed/josh1/400/300',  caption: 'Tournament Opening Ceremony 2026',       category: 'match',       uploadedAt: '2026-06-20T09:00' },
  { id: 'g2',  photo: 'https://picsum.photos/seed/josh2/400/300',  caption: 'Gopal K - Akshay N in action',             category: 'match',       uploadedAt: '2026-06-20T11:00' },
  { id: 'g3',  photo: 'https://picsum.photos/seed/josh3/400/300',  caption: 'Vikas S - Sikandar S celebrate their win', category: 'celebration', uploadedAt: '2026-06-23T15:00' },
  { id: 'g4',  photo: 'https://picsum.photos/seed/josh4/400/300',  caption: 'Team photo — Hariom - Tushar S',          category: 'team',        uploadedAt: '2026-06-21T16:00' },
  { id: 'g5',  photo: 'https://picsum.photos/seed/josh5/400/300',  caption: 'Gopal Kadam perfects his strike',        category: 'player',      uploadedAt: '2026-06-20T12:00' },
  { id: 'g6',  photo: 'https://picsum.photos/seed/josh6/400/300',  caption: 'Semi-final intense moments',             category: 'match',       uploadedAt: '2026-06-26T14:00' },
  { id: 'g7',  photo: 'https://picsum.photos/seed/josh7/400/300',  caption: 'Vijay M - Rushikesh J - Vaishnavi M dominate Group B', category: 'match', uploadedAt: '2026-06-22T10:00' },
  { id: 'g8',  photo: 'https://picsum.photos/seed/josh8/400/300',  caption: 'Pushkaraj K - Akshay M team huddle',     category: 'team',        uploadedAt: '2026-06-21T12:00' },
  { id: 'g9',  photo: 'https://picsum.photos/seed/josh9/400/300',  caption: 'JOSH 2025 Champions celebration',        category: 'celebration', uploadedAt: '2025-07-01T17:00' },
  { id: 'g10', photo: 'https://picsum.photos/seed/josh10/400/300', caption: 'Crowd cheering at the main court',       category: 'match',       uploadedAt: '2026-06-23T13:00' },
  { id: 'g11', photo: 'https://picsum.photos/seed/josh11/400/300', caption: 'Award ceremony preparations',            category: 'celebration', uploadedAt: '2026-06-24T16:00' },
  { id: 'g12', photo: 'https://picsum.photos/seed/josh12/400/300', caption: 'Pushkaraj Kolatkar in action',           category: 'player',      uploadedAt: '2026-06-25T11:00' },
];

// ─── Announcements ────────────────────────────────────────────────────────────
export const ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: '📅 Match Schedule Released',      body: 'Carrom R16 starts July 20–21, QFs on 22nd, SFs on 23rd, Final on 24th. Sequence groups run alongside!', type: 'info',   createdAt: '2026-07-15T10:00' },
  { id: 'a2', title: '📢 Sequence Groups Announced',    body: 'Group A: Teams A, B, C, D. Group B: Teams E, F, G, H. Round-robin over 3 days, then semifinals and final!', type: 'info',  createdAt: '2026-07-12T09:00' },
  { id: 'a3', title: '🏆 16 Carrom Teams Registered!',  body: '16 teams with 32 players are ready to compete in the Carrom knockout bracket.',     type: 'info',   createdAt: '2026-07-10T09:00' },
  { id: 'a4', title: '🃏 8 Sequence Teams Confirmed',    body: '8 teams with 24 players confirmed for the Sequence group stage tournament.',        type: 'info',   createdAt: '2026-07-10T09:00' },
  { id: 'a5', title: '🎉 Welcome to JOSH 2026!',        body: 'The biggest JOSH Tournament yet begins! 24 teams, 2 games, 1 champion.',            type: 'info',   createdAt: '2026-07-01T08:00' },
];

// ─── History ──────────────────────────────────────────────────────────────────
export const HISTORY: HistoryEntry[] = [
  {
    year: 2025, tournamentName: 'JOSH Tournament 2025',
    champion: 'Gopal K - Akshay N', runnerUp: 'Astitwa R - Garima G - Tejaswini K', mvp: 'Gopal Kadam',
    totalTeams: 16, totalMatches: 45, photoUrl: 'https://picsum.photos/seed/hist2025/600/400',
    stats: { 'Highest Score': '29-4', 'Total Goals': 487, 'Matches Played': 45 },
  },
  {
    year: 2024, tournamentName: 'JOSH Tournament 2024',
    champion: 'Maaj P - Shubham S', runnerUp: 'Amit C - Rupam P', mvp: 'Maaj Patel',
    totalTeams: 12, totalMatches: 34, photoUrl: 'https://picsum.photos/seed/hist2024/600/400',
    stats: { 'Highest Score': '29-2', 'Total Goals': 389, 'Matches Played': 34 },
  },
  {
    year: 2023, tournamentName: 'JOSH Tournament 2023',
    champion: 'Krushna M - Ashwini P', runnerUp: 'Vijay M - Rushikesh J - Vaishnavi M', mvp: 'Krushna Muley',
    totalTeams: 8, totalMatches: 21, photoUrl: 'https://picsum.photos/seed/hist2023/600/400',
    stats: { 'Highest Score': '29-11', 'Total Goals': 310, 'Matches Played': 21 },
  },
  {
    year: 2022, tournamentName: 'JOSH Tournament 2022',
    champion: 'Gopal K - Akshay N', runnerUp: 'Vikas S - Sikandar S', mvp: 'Akshay Nimbolkar',
    totalTeams: 8, totalMatches: 18, photoUrl: 'https://picsum.photos/seed/hist2022/600/400',
    stats: { 'Highest Score': '29-7', 'Total Goals': 276, 'Matches Played': 18 },
  },
];

// ─── Bracket structure (Carrom knockout) ─────────────────────────────────────
export const CARROM_BRACKET = {
  r16: [
    { matchId: 'm1', slot: 0 },
    { matchId: 'm2', slot: 1 },
    { matchId: 'm3', slot: 2 },
    { matchId: 'm4', slot: 3 },
    { matchId: 'm5', slot: 4 },
    { matchId: 'm6', slot: 5 },
    { matchId: 'm7', slot: 6 },
    { matchId: 'm8', slot: 7 },
  ],
  qf: [
    { matchId: 'm9',  slot: 0 },
    { matchId: 'm10', slot: 1 },
    { matchId: 'm11', slot: 2 },
    { matchId: 'm12', slot: 3 },
  ],
  sf: [
    { matchId: 'm13', slot: 0 },
    { matchId: 'm14', slot: 1 },
  ],
  final: [
    { matchId: 'm15', slot: 0 },
  ],
};

// ─── Sequence playoff bracket ─────────────────────────────────────────────────
export const SEQUENCE_BRACKET = {
  sf: [
    { matchId: 'sq_sf1', slot: 0, label: 'Semifinal 1' },
    { matchId: 'sq_sf2', slot: 1, label: 'Semifinal 2' },
  ],
  final: [
    { matchId: 'sq_fin', slot: 0 },
  ],
};

// ─── Sequence Day Schedule ───────────────────────────────────────────────────
export const SEQUENCE_DAYS = [
  { day: 1, label: 'Day 1', round: 'Day 1', matchIds: ['sm1','sm2','sm3','sm4'] },
  { day: 2, label: 'Day 2', round: 'Day 2', matchIds: ['sm5','sm6','sm7','sm8'] },
  { day: 3, label: 'Day 3', round: 'Day 3', matchIds: ['sm9','sm10','sm11','sm12'] },
  { day: 4, label: 'Day 4 — Semifinals', round: 'Day 4 - Semifinals', matchIds: ['sq_sf1','sq_sf2'] },
  { day: 5, label: 'Day 5 — Final', round: 'Day 5 - Final', matchIds: ['sq_fin'] },
];
