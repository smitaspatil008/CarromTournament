import type { Match } from '../types';

export function getMatchLabel(match: Pick<Match, 'id' | 'game' | 'round'>): string {
  if (match.game === 'carrom') {
    if (match.round === 'Round of 16') {
      const num = parseInt(match.id.replace('m', ''));
      return `Carrom_R16_M${num}`;
    }
    if (match.round === 'Quarter Finals') {
      const qfMap: Record<string, number> = { m9: 1, m10: 2, m11: 3, m12: 4 };
      return `Carrom_Quarter_Final_${qfMap[match.id] ?? '?'}`;
    }
    if (match.round === 'Semi Finals') {
      const sfMap: Record<string, number> = { m13: 1, m14: 2 };
      return `Carrom_Semi_Final_${sfMap[match.id] ?? '?'}`;
    }
    if (match.round === 'Final') {
      return 'Carrom_Final';
    }
    return `Carrom_${match.round}`;
  }

  if (match.game === 'sequence') {
    if (match.round.includes('Semifinals')) {
      const sfMap: Record<string, number> = { sq_sf1: 1, sq_sf2: 2 };
      return `Sequence_Semi_Final_${sfMap[match.id] ?? '?'}`;
    }
    if (match.round === 'Day 5 - Final') {
      return 'Sequence_Final';
    }
    const dayMatch = match.round.match(/Day (\d+)/);
    if (dayMatch) {
      const num = parseInt(match.id.replace('sm', ''));
      return `Sequence_Day${dayMatch[1]}_M${num}`;
    }
    return `Sequence_${match.round}`;
  }

  return `${match.game}_${match.round}`;
}
