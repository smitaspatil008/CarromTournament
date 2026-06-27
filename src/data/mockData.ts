import type { Team, Player, Match, Group, GroupStanding, GalleryItem, Announcement, HistoryEntry, Tournament } from '../types';

export const TOURNAMENT: Tournament = {
  id: 't1',
  name: 'JOSH Tournament 2026',
  year: 2026,
  status: 'live',
  startDate: '2026-06-20',
  endDate: '2026-07-05',
};

// ─── Carrom Teams (16 teams, knockout) ────────────────────────────────────────
export const CARROM_TEAMS: Team[] = [
  { id: 'ct1',  name: 'Thunder Strikers', logo: 'TS', color: '#2563EB',playerIds: ['p1','p2'],   wins: 3, losses: 0, points: 9,  status: 'active', game: 'carrom' },
  { id: 'ct2',  name: 'Royal Blazers',    logo: 'RB', color: '#7C3AED',playerIds: ['p3','p4'],   wins: 2, losses: 1, points: 6,  status: 'active', game: 'carrom' },
  { id: 'ct3',  name: 'Iron Wolves',      logo: 'IW', color: '#F97316',playerIds: ['p5','p6'],   wins: 2, losses: 1, points: 6,  status: 'active', game: 'carrom' },
  { id: 'ct4',  name: 'Storm Eagles',     logo: 'SE', color: '#059669',playerIds: ['p7','p8'],   wins: 1, losses: 2, points: 3,  status: 'active', game: 'carrom' },
  { id: 'ct5',  name: 'Neon Panthers',    logo: 'NP', color: '#DB2777',playerIds: ['p9','p10'],  wins: 3, losses: 0, points: 9,  status: 'active', game: 'carrom' },
  { id: 'ct6',  name: 'Titan Force',      logo: 'TF', color: '#D97706',playerIds: ['p11','p12'], wins: 2, losses: 1, points: 6,  status: 'active', game: 'carrom' },
  { id: 'ct7',  name: 'Shadow Falcons',   logo: 'SF', color: '#0891B2',playerIds: ['p13','p14'], wins: 1, losses: 2, points: 3,  status: 'active', game: 'carrom' },
  { id: 'ct8',  name: 'Crimson Kings',    logo: 'CK', color: '#DC2626',playerIds: ['p15','p16'], wins: 0, losses: 3, points: 0,  status: 'eliminated', game: 'carrom' },
  { id: 'ct9',  name: 'Sapphire Sharks',  logo: 'SS', color: '#1D4ED8',playerIds: ['p17','p18'], wins: 3, losses: 0, points: 9,  status: 'active', game: 'carrom' },
  { id: 'ct10', name: 'Golden Lions',     logo: 'GL', color: '#B45309',playerIds: ['p19','p20'], wins: 2, losses: 1, points: 6,  status: 'active', game: 'carrom' },
  { id: 'ct11', name: 'Phantom Aces',     logo: 'PA', color: '#6D28D9',playerIds: ['p21','p22'], wins: 2, losses: 1, points: 6,  status: 'active', game: 'carrom' },
  { id: 'ct12', name: 'Blaze Warriors',   logo: 'BW', color: '#EA580C',playerIds: ['p23','p24'], wins: 1, losses: 2, points: 3,  status: 'active', game: 'carrom' },
  { id: 'ct13', name: 'Arctic Storm',     logo: 'AS', color: '#0369A1',playerIds: ['p25','p26'], wins: 1, losses: 2, points: 3,  status: 'active', game: 'carrom' },
  { id: 'ct14', name: 'Venom Squad',      logo: 'VS', color: '#16A34A',playerIds: ['p27','p28'], wins: 0, losses: 3, points: 0,  status: 'eliminated', game: 'carrom' },
  { id: 'ct15', name: 'Delta Force',      logo: 'DF', color: '#7C3AED',playerIds: ['p29','p30'], wins: 1, losses: 2, points: 3,  status: 'active', game: 'carrom' },
  { id: 'ct16', name: 'Apex Predators',   logo: 'AP', color: '#B91C1C',playerIds: ['p31','p32'], wins: 0, losses: 3, points: 0,  status: 'eliminated', game: 'carrom' },
];

// ─── Sequence Teams (16 teams, 2 groups of 8) ─────────────────────────────────
export const SEQUENCE_TEAMS: Team[] = [
  { id: 'st1',  name: 'Phoenix Rising',   logo: 'PR', color: '#2563EB',playerIds: ['sp1','sp2'],   wins: 5, losses: 1, points: 15, status: 'active', game: 'sequence' },
  { id: 'st2',  name: 'Quantum Leap',     logo: 'QL', color: '#7C3AED',playerIds: ['sp3','sp4'],   wins: 4, losses: 2, points: 12, status: 'active', game: 'sequence' },
  { id: 'st3',  name: 'Steel Gladiators', logo: 'SG', color: '#F97316',playerIds: ['sp5','sp6'],   wins: 3, losses: 3, points: 9,  status: 'active', game: 'sequence' },
  { id: 'st4',  name: 'Cosmic Riders',    logo: 'CR', color: '#059669',playerIds: ['sp7','sp8'],   wins: 2, losses: 4, points: 6,  status: 'active', game: 'sequence' },
  { id: 'st5',  name: 'Dragon Flames',    logo: 'DF', color: '#DB2777',playerIds: ['sp9','sp10'],  wins: 6, losses: 0, points: 18, status: 'active', game: 'sequence' },
  { id: 'st6',  name: 'Electric Titans',  logo: 'ET', color: '#D97706',playerIds: ['sp11','sp12'], wins: 3, losses: 3, points: 9,  status: 'active', game: 'sequence' },
  { id: 'st7',  name: 'Shadow Warriors',  logo: 'SW', color: '#0891B2',playerIds: ['sp13','sp14'], wins: 1, losses: 5, points: 3,  status: 'active', game: 'sequence' },
  { id: 'st8',  name: 'Cyber Knights',    logo: 'CK', color: '#DC2626',playerIds: ['sp15','sp16'], wins: 0, losses: 6, points: 0,  status: 'eliminated', game: 'sequence' },
  { id: 'st9',  name: 'Frost Giants',     logo: 'FG', color: '#1D4ED8',playerIds: ['sp17','sp18'], wins: 5, losses: 1, points: 15, status: 'active', game: 'sequence' },
  { id: 'st10', name: 'Laser Sharks',     logo: 'LS', color: '#B45309',playerIds: ['sp19','sp20'], wins: 4, losses: 2, points: 12, status: 'active', game: 'sequence' },
  { id: 'st11', name: 'Nova Blazers',     logo: 'NB', color: '#6D28D9',playerIds: ['sp21','sp22'], wins: 3, losses: 3, points: 9,  status: 'active', game: 'sequence' },
  { id: 'st12', name: 'Turbo Rockets',    logo: 'TR', color: '#EA580C',playerIds: ['sp23','sp24'], wins: 2, losses: 4, points: 6,  status: 'active', game: 'sequence' },
  { id: 'st13', name: 'Solar Flares',     logo: 'SF', color: '#0369A1',playerIds: ['sp25','sp26'], wins: 4, losses: 2, points: 12, status: 'active', game: 'sequence' },
  { id: 'st14', name: 'Stone Crushers',   logo: 'SC', color: '#16A34A',playerIds: ['sp27','sp28'], wins: 2, losses: 4, points: 6,  status: 'active', game: 'sequence' },
  { id: 'st15', name: 'Wind Riders',      logo: 'WR', color: '#7C3AED',playerIds: ['sp29','sp30'], wins: 1, losses: 5, points: 3,  status: 'active', game: 'sequence' },
  { id: 'st16', name: 'Ocean Breakers',   logo: 'OB', color: '#B91C1C',playerIds: ['sp31','sp32'], wins: 0, losses: 6, points: 0,  status: 'eliminated', game: 'sequence' },
];

export const ALL_TEAMS = [...CARROM_TEAMS, ...SEQUENCE_TEAMS];

// ─── Players ──────────────────────────────────────────────────────────────────
const makePlayer = (id: string, name: string, teamId: string, img: number, w: number, l: number): Player => ({
  id, name, photo: `https://i.pravatar.cc/150?img=${img}`, teamId, gamesPlayed: w + l, wins: w, losses: l,
});

export const PLAYERS: Player[] = [
  makePlayer('p1', 'Arjun Sharma', 'ct1',  1, 6, 1),
  makePlayer('p2', 'Riya Desai', 'ct1',  5, 5, 2),
  makePlayer('p3', 'Vikram Rao', 'ct2', 10, 4, 2),
  makePlayer('p4', 'Priya Nair', 'ct2', 15, 4, 3),
  makePlayer('p5', 'Amit Kumar', 'ct3', 20, 5, 2),
  makePlayer('p6', 'Sneha Patil', 'ct3', 25, 4, 3),
  makePlayer('p7', 'Rajesh Mehta', 'ct4', 30, 3, 4),
  makePlayer('p8', 'Kavya Singh', 'ct4', 35, 3, 4),
  makePlayer('p9', 'Deepak Joshi', 'ct5', 40, 6, 1),
  makePlayer('p10', 'Ananya Gupta', 'ct5', 45, 6, 1),
  makePlayer('p11', 'Suresh Iyer', 'ct6', 50, 4, 3),
  makePlayer('p12', 'Meera Pillai', 'ct6', 55, 4, 3),
  makePlayer('p13', 'Karthik Reddy', 'ct7', 60, 3, 4),
  makePlayer('p14', 'Pooja Varma', 'ct7', 65, 3, 4),
  makePlayer('p15', 'Nikhil Bose', 'ct8', 70, 1, 6),
  makePlayer('p16', 'Aisha Khan', 'ct8', 75, 1, 6),
  makePlayer('p17', 'Rahul Chandra', 'ct9',  2, 6, 0),
  makePlayer('p18', 'Divya Menon', 'ct9',  6, 6, 1),
  makePlayer('p19', 'Sanjay Tiwari', 'ct10',11, 4, 3),
  makePlayer('p20', 'Lakshmi Das', 'ct10',16, 4, 3),
  makePlayer('p21', 'Manish Verma', 'ct11',21, 5, 2),
  makePlayer('p22', 'Sunita Ghosh', 'ct11',26, 4, 3),
  makePlayer('p23', 'Ravi Shastri', 'ct12',31, 3, 4),
  makePlayer('p24', 'Nisha Kapoor', 'ct12',36, 3, 4),
  makePlayer('p25', 'Anil Saxena', 'ct13',41, 3, 4),
  makePlayer('p26', 'Rekha Pandey', 'ct13',46, 3, 4),
  makePlayer('p27', 'Mohit Agarwal', 'ct14',51, 1, 6),
  makePlayer('p28', 'Shilpa Jain', 'ct14',56, 1, 6),
  makePlayer('p29', 'Tarun Bajaj', 'ct15',61, 3, 4),
  makePlayer('p30', 'Pallavi Sinha', 'ct15',66, 3, 4),
  makePlayer('p31', 'Vinay Mishra', 'ct16',71, 1, 6),
  makePlayer('p32', 'Geeta Rajan', 'ct16',76, 1, 6),
  // Sequence players
  makePlayer('sp1', 'Harish Kumar', 'st1',  3,  5, 1),
  makePlayer('sp2', 'Sanya Malik', 'st1',  7,  6, 0),
  makePlayer('sp3', 'Prem Anand', 'st2', 12,  4, 2),
  makePlayer('sp4', 'Trisha Roy', 'st2', 17,  5, 1),
  makePlayer('sp5', 'Gopal Nair', 'st3', 22,  3, 3),
  makePlayer('sp6', 'Mala Shetty', 'st3', 27,  4, 2),
  makePlayer('sp7', 'Pranav Joshi', 'st4', 32,  2, 4),
  makePlayer('sp8', 'Deepa Srinivas', 'st4', 37,  3, 3),
  makePlayer('sp9', 'Kiran Hegde', 'st5', 42,  6, 0),
  makePlayer('sp10', 'Ritu Sharma', 'st5', 47,  6, 0),
  makePlayer('sp11', 'Sunil Mistry', 'st6', 52,  3, 3),
  makePlayer('sp12', 'Geetha Rao', 'st6', 57,  3, 3),
  makePlayer('sp13', 'Ajay Pillai', 'st7', 62,  1, 5),
  makePlayer('sp14', 'Sindhu Nath', 'st7', 67,  2, 4),
  makePlayer('sp15', 'Balram Tewari', 'st8', 72,  0, 6),
  makePlayer('sp16', 'Radha Krishnan', 'st8', 77,  0, 6),
  makePlayer('sp17', 'Vijay Murthy', 'st9',  4,  5, 1),
  makePlayer('sp18', 'Preethi Suresh', 'st9',  8,  5, 1),
  makePlayer('sp19', 'Naveen Das', 'st10',13,  4, 2),
  makePlayer('sp20', 'Charu Mehta', 'st10',18,  4, 2),
  makePlayer('sp21', 'Salil Gupta', 'st11',23,  3, 3),
  makePlayer('sp22', 'Kamala Rajan', 'st11',28,  4, 2),
  makePlayer('sp23', 'Nitin Bhatt', 'st12',33,  2, 4),
  makePlayer('sp24', 'Leela Naik', 'st12',38,  2, 4),
  makePlayer('sp25', 'Dhanraj Patel', 'st13',43,  4, 2),
  makePlayer('sp26', 'Anita Singh', 'st13',48,  4, 2),
  makePlayer('sp27', 'Rakesh Thakur', 'st14',53,  2, 4),
  makePlayer('sp28', 'Usha Kulkarni', 'st14',58,  2, 4),
  makePlayer('sp29', 'Santosh Kumar', 'st15',63,  1, 5),
  makePlayer('sp30', 'Poornima Iyer', 'st15',68,  2, 4),
  makePlayer('sp31', 'Madhu Krishnap', 'st16',73,0, 6),
  makePlayer('sp32', 'Kavitha Rao', 'st16',78,0, 6),
];

// ─── Matches ──────────────────────────────────────────────────────────────────
export const MATCHES: Match[] = [
  // Carrom R16
  { id: 'm1',  game: 'carrom', round: 'Round of 16', teamAId: 'ct1',  teamBId: 'ct2',  scoreA: 29, scoreB: 18, status: 'completed', court: 'Court 1', scheduledAt: '2026-06-20T10:00', winner: 'ct1' },
  { id: 'm2',  game: 'carrom', round: 'Round of 16', teamAId: 'ct3',  teamBId: 'ct4',  scoreA: 25, scoreB: 22, status: 'completed', court: 'Court 2', scheduledAt: '2026-06-20T11:00', winner: 'ct3' },
  { id: 'm3',  game: 'carrom', round: 'Round of 16', teamAId: 'ct5',  teamBId: 'ct6',  scoreA: 29, scoreB: 14, status: 'completed', court: 'Court 3', scheduledAt: '2026-06-20T12:00', winner: 'ct5' },
  { id: 'm4',  game: 'carrom', round: 'Round of 16', teamAId: 'ct7',  teamBId: 'ct8',  scoreA: 29, scoreB: 10, status: 'completed', court: 'Court 4', scheduledAt: '2026-06-20T13:00', winner: 'ct7' },
  { id: 'm5',  game: 'carrom', round: 'Round of 16', teamAId: 'ct9',  teamBId: 'ct10', scoreA: 29, scoreB: 21, status: 'completed', court: 'Court 1', scheduledAt: '2026-06-21T10:00', winner: 'ct9' },
  { id: 'm6',  game: 'carrom', round: 'Round of 16', teamAId: 'ct11', teamBId: 'ct12', scoreA: 27, scoreB: 20, status: 'completed', court: 'Court 2', scheduledAt: '2026-06-21T11:00', winner: 'ct11' },
  { id: 'm7',  game: 'carrom', round: 'Round of 16', teamAId: 'ct13', teamBId: 'ct14', scoreA: 29, scoreB: 5,  status: 'completed', court: 'Court 3', scheduledAt: '2026-06-21T12:00', winner: 'ct13' },
  { id: 'm8',  game: 'carrom', round: 'Round of 16', teamAId: 'ct15', teamBId: 'ct16', scoreA: 29, scoreB: 8,  status: 'completed', court: 'Court 4', scheduledAt: '2026-06-21T13:00', winner: 'ct15' },
  // Carrom QF
  { id: 'm9',  game: 'carrom', round: 'Quarter Finals', teamAId: 'ct1',  teamBId: 'ct3',  scoreA: 22, scoreB: 29, status: 'completed', court: 'Court 1', scheduledAt: '2026-06-23T10:00', winner: 'ct3' },
  { id: 'm10', game: 'carrom', round: 'Quarter Finals', teamAId: 'ct5',  teamBId: 'ct7',  scoreA: 29, scoreB: 15, status: 'completed', court: 'Court 2', scheduledAt: '2026-06-23T11:00', winner: 'ct5' },
  { id: 'm11', game: 'carrom', round: 'Quarter Finals', teamAId: 'ct9',  teamBId: 'ct11', scoreA: 18, scoreB: 29, status: 'completed', court: 'Court 3', scheduledAt: '2026-06-23T12:00', winner: 'ct11' },
  { id: 'm12', game: 'carrom', round: 'Quarter Finals', teamAId: 'ct13', teamBId: 'ct15', scoreA: 29, scoreB: 24, status: 'completed', court: 'Court 4', scheduledAt: '2026-06-23T13:00', winner: 'ct13' },
  // Carrom SF
  { id: 'm13', game: 'carrom', round: 'Semi Finals', teamAId: 'ct3',  teamBId: 'ct5',  scoreA: 18, scoreB: 29, status: 'completed', court: 'Court 1', scheduledAt: '2026-06-26T10:00', winner: 'ct5' },
  { id: 'm14', game: 'carrom', round: 'Semi Finals', teamAId: 'ct11', teamBId: 'ct13', scoreA: 14, scoreB: 29, status: 'live',      court: 'Court 2', scheduledAt: '2026-06-27T14:00', winner: undefined, history: [{scoreA:0,scoreB:0},{scoreA:5,scoreB:3},{scoreA:10,scoreB:8},{scoreA:14,scoreB:12}] },
  // Carrom Final
  { id: 'm15', game: 'carrom', round: 'Final', teamAId: 'ct5', teamBId: 'ct13', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Main Court', scheduledAt: '2026-07-03T15:00' },
  // Sequence matches - Group A
  { id: 'sm1', game: 'sequence', round: 'Group A', teamAId: 'st1', teamBId: 'st2', scoreA: 3, scoreB: 1, status: 'completed', court: 'Table 1', scheduledAt: '2026-06-20T09:00', winner: 'st1' },
  { id: 'sm2', game: 'sequence', round: 'Group A', teamAId: 'st3', teamBId: 'st4', scoreA: 2, scoreB: 2, status: 'completed', court: 'Table 2', scheduledAt: '2026-06-20T10:00', winner: undefined },
  { id: 'sm3', game: 'sequence', round: 'Group A', teamAId: 'st5', teamBId: 'st6', scoreA: 3, scoreB: 0, status: 'completed', court: 'Table 3', scheduledAt: '2026-06-20T11:00', winner: 'st5' },
  { id: 'sm4', game: 'sequence', round: 'Group A', teamAId: 'st7', teamBId: 'st8', scoreA: 2, scoreB: 1, status: 'completed', court: 'Table 4', scheduledAt: '2026-06-20T12:00', winner: 'st7' },
  { id: 'sm5', game: 'sequence', round: 'Group A', teamAId: 'st1', teamBId: 'st5', scoreA: 1, scoreB: 2, status: 'live',      court: 'Table 1', scheduledAt: '2026-06-27T13:00' },
  // Sequence matches - Group B
  { id: 'sm6',  game: 'sequence', round: 'Group B', teamAId: 'st9',  teamBId: 'st10', scoreA: 3, scoreB: 2, status: 'completed', court: 'Table 5', scheduledAt: '2026-06-20T09:00', winner: 'st9' },
  { id: 'sm7',  game: 'sequence', round: 'Group B', teamAId: 'st11', teamBId: 'st12', scoreA: 2, scoreB: 1, status: 'completed', court: 'Table 6', scheduledAt: '2026-06-20T10:00', winner: 'st11' },
  { id: 'sm8',  game: 'sequence', round: 'Group B', teamAId: 'st13', teamBId: 'st14', scoreA: 2, scoreB: 2, status: 'completed', court: 'Table 7', scheduledAt: '2026-06-20T11:00', winner: undefined },
  { id: 'sm9',  game: 'sequence', round: 'Group B', teamAId: 'st15', teamBId: 'st16', scoreA: 1, scoreB: 0, status: 'completed', court: 'Table 8', scheduledAt: '2026-06-20T12:00', winner: 'st15' },
  { id: 'sm10', game: 'sequence', round: 'Group B', teamAId: 'st9',  teamBId: 'st13', scoreA: 2, scoreB: 1, status: 'completed', court: 'Table 5', scheduledAt: '2026-06-22T10:00', winner: 'st9' },
  // Sequence Playoffs (Semi Finals) — Group A Winner (st5) vs Group B Runner-up (st13), Group B Winner (st9) vs Group A Runner-up (st1)
  { id: 'sq_sf1', game: 'sequence', round: 'Semi Finals', teamAId: 'st5', teamBId: 'st13', scoreA: 3, scoreB: 2, status: 'completed', court: 'Table 1', scheduledAt: '2026-06-30T10:00', winner: 'st5' },
  { id: 'sq_sf2', game: 'sequence', round: 'Semi Finals', teamAId: 'st9', teamBId: 'st1',  scoreA: 2, scoreB: 1, status: 'live',      court: 'Table 2', scheduledAt: '2026-06-27T15:00', winner: undefined, history: [{scoreA:0,scoreB:0},{scoreA:1,scoreB:0},{scoreA:2,scoreB:1}] },
  // Sequence Final
  { id: 'sq_fin', game: 'sequence', round: 'Final', teamAId: 'st5', teamBId: 'st9', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 1', scheduledAt: '2026-07-04T14:00' },
  // Other upcoming
  { id: 'um1', game: 'carrom',   round: 'Quarter Finals', teamAId: 'ct2',  teamBId: 'ct4',  scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Court 1', scheduledAt: '2026-06-28T10:00' },
  { id: 'um2', game: 'sequence', round: 'Group A',        teamAId: 'st2',  teamBId: 'st6',  scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 2', scheduledAt: '2026-06-28T11:00' },
  { id: 'um3', game: 'carrom',   round: 'Semi Finals',    teamAId: 'ct6',  teamBId: 'ct8',  scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Court 2', scheduledAt: '2026-06-29T10:00' },
  { id: 'um4', game: 'sequence', round: 'Group B',        teamAId: 'st10', teamBId: 'st14', scoreA: 0, scoreB: 0, status: 'upcoming', court: 'Table 3', scheduledAt: '2026-06-29T14:00' },
];

// ─── Groups ───────────────────────────────────────────────────────────────────
export const GROUPS: Group[] = [
  { id: 'g1', name: 'Group A', game: 'sequence', teamIds: ['st1','st2','st3','st4','st5','st6','st7','st8'] },
  { id: 'g2', name: 'Group B', game: 'sequence', teamIds: ['st9','st10','st11','st12','st13','st14','st15','st16'] },
];

export const GROUP_STANDINGS: Record<string, GroupStanding[]> = {
  g1: [
    { teamId: 'st5', played: 6, won: 6, lost: 0, points: 18, qualified: true },
    { teamId: 'st1', played: 6, won: 5, lost: 1, points: 15, qualified: true },
    { teamId: 'st2', played: 6, won: 4, lost: 2, points: 12, qualified: false },
    { teamId: 'st3', played: 6, won: 3, lost: 3, points: 9,  qualified: false },
    { teamId: 'st6', played: 6, won: 3, lost: 3, points: 9,  qualified: false },
    { teamId: 'st4', played: 6, won: 2, lost: 4, points: 6,  qualified: false },
    { teamId: 'st7', played: 6, won: 1, lost: 5, points: 3,  qualified: false },
    { teamId: 'st8', played: 6, won: 0, lost: 6, points: 0,  qualified: false },
  ],
  g2: [
    { teamId: 'st9',  played: 6, won: 5, lost: 1, points: 15, qualified: true },
    { teamId: 'st13', played: 6, won: 4, lost: 2, points: 12, qualified: true },
    { teamId: 'st10', played: 6, won: 4, lost: 2, points: 12, qualified: false },
    { teamId: 'st11', played: 6, won: 3, lost: 3, points: 9,  qualified: false },
    { teamId: 'st12', played: 6, won: 2, lost: 4, points: 6,  qualified: false },
    { teamId: 'st14', played: 6, won: 2, lost: 4, points: 6,  qualified: false },
    { teamId: 'st15', played: 6, won: 1, lost: 5, points: 3,  qualified: false },
    { teamId: 'st16', played: 6, won: 0, lost: 6, points: 0,  qualified: false },
  ],
};

// ─── Gallery ──────────────────────────────────────────────────────────────────
export const GALLERY: GalleryItem[] = [
  { id: 'g1',  photo: 'https://picsum.photos/seed/josh1/400/300',  caption: 'Tournament Opening Ceremony 2026',       category: 'match',       uploadedAt: '2026-06-20T09:00' },
  { id: 'g2',  photo: 'https://picsum.photos/seed/josh2/400/300',  caption: 'Thunder Strikers in action',             category: 'match',       uploadedAt: '2026-06-20T11:00' },
  { id: 'g3',  photo: 'https://picsum.photos/seed/josh3/400/300',  caption: 'Neon Panthers celebrate quarter-final',  category: 'celebration', uploadedAt: '2026-06-23T15:00' },
  { id: 'g4',  photo: 'https://picsum.photos/seed/josh4/400/300',  caption: 'Team photo — Phantom Aces',              category: 'team',        uploadedAt: '2026-06-21T16:00' },
  { id: 'g5',  photo: 'https://picsum.photos/seed/josh5/400/300',  caption: 'Arjun Sharma perfects his strike',       category: 'player',      uploadedAt: '2026-06-20T12:00' },
  { id: 'g6',  photo: 'https://picsum.photos/seed/josh6/400/300',  caption: 'Semi-final intense moments',             category: 'match',       uploadedAt: '2026-06-26T14:00' },
  { id: 'g7',  photo: 'https://picsum.photos/seed/josh7/400/300',  caption: 'Dragon Flames dominate Group A',         category: 'match',       uploadedAt: '2026-06-22T10:00' },
  { id: 'g8',  photo: 'https://picsum.photos/seed/josh8/400/300',  caption: 'Golden Lions team huddle',               category: 'team',        uploadedAt: '2026-06-21T12:00' },
  { id: 'g9',  photo: 'https://picsum.photos/seed/josh9/400/300',  caption: 'JOSH 2025 Champions celebration',        category: 'celebration', uploadedAt: '2025-07-01T17:00' },
  { id: 'g10', photo: 'https://picsum.photos/seed/josh10/400/300', caption: 'Crowd cheering at the main court',       category: 'match',       uploadedAt: '2026-06-23T13:00' },
  { id: 'g11', photo: 'https://picsum.photos/seed/josh11/400/300', caption: 'Award ceremony preparations',            category: 'celebration', uploadedAt: '2026-06-24T16:00' },
  { id: 'g12', photo: 'https://picsum.photos/seed/josh12/400/300', caption: 'MVP Deepak Joshi in action',             category: 'player',      uploadedAt: '2026-06-25T11:00' },
];

// ─── Announcements ────────────────────────────────────────────────────────────
export const ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: '🏆 Semi-Final LIVE!',           body: 'Phantom Aces vs Arctic Storm is currently LIVE on Court 2. Come cheer!',   type: 'match',   createdAt: '2026-06-27T14:00' },
  { id: 'a2', title: '📅 Final Date Confirmed',        body: 'JOSH Tournament Final is scheduled for July 3rd, 3:00 PM at Main Court.',  type: 'info',    createdAt: '2026-06-26T10:00' },
  { id: 'a3', title: '🏅 Neon Panthers in the Final!', body: 'Neon Panthers defeated Iron Wolves 29-18 to advance to the Final.',       type: 'winner',  createdAt: '2026-06-26T12:00' },
  { id: 'a4', title: '📢 Sequence Playoffs Begin',     body: 'Top 2 teams from each group advance to Sequence playoffs this weekend.',   type: 'info',    createdAt: '2026-06-25T09:00' },
  { id: 'a5', title: '🎉 Welcome to JOSH 2026!',       body: 'The biggest JOSH Tournament yet begins! 32 teams, 2 games, 1 champion.',  type: 'info',    createdAt: '2026-06-20T08:00' },
];

// ─── History ──────────────────────────────────────────────────────────────────
export const HISTORY: HistoryEntry[] = [
  {
    year: 2025, tournamentName: 'JOSH Tournament 2025',
    champion: 'Sapphire Sharks', runnerUp: 'Phoenix Rising', mvp: 'Rahul Chandra',
    totalTeams: 16, totalMatches: 45, photoUrl: 'https://picsum.photos/seed/hist2025/600/400',
    stats: { 'Highest Score': '29-4', 'Total Goals': 487, 'Matches Played': 45 },
  },
  {
    year: 2024, tournamentName: 'JOSH Tournament 2024',
    champion: 'Iron Wolves', runnerUp: 'Thunder Strikers', mvp: 'Amit Kumar',
    totalTeams: 12, totalMatches: 34, photoUrl: 'https://picsum.photos/seed/hist2024/600/400',
    stats: { 'Highest Score': '29-2', 'Total Goals': 389, 'Matches Played': 34 },
  },
  {
    year: 2023, tournamentName: 'JOSH Tournament 2023',
    champion: 'Golden Lions', runnerUp: 'Dragon Flames', mvp: 'Sanjay Tiwari',
    totalTeams: 8, totalMatches: 21, photoUrl: 'https://picsum.photos/seed/hist2023/600/400',
    stats: { 'Highest Score': '29-11', 'Total Goals': 310, 'Matches Played': 21 },
  },
  {
    year: 2022, tournamentName: 'JOSH Tournament 2022',
    champion: 'Thunder Strikers', runnerUp: 'Neon Panthers', mvp: 'Arjun Sharma',
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
    { matchId: 'sq_sf1', slot: 0, label: 'Group A #1 vs Group B #2' },
    { matchId: 'sq_sf2', slot: 1, label: 'Group B #1 vs Group A #2' },
  ],
  final: [
    { matchId: 'sq_fin', slot: 0 },
  ],
};
