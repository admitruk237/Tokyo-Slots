import type { SymbolId } from '../model/gameConfig';
import type { GameSymbol } from '../model/types';
import { roundMoney } from '@/shared/lib/roundMoney';

const MATCH_FACTOR: Record<number, number> = { 4: 1, 3: 0.5 };

export const calculateWin = (
  reels: readonly SymbolId[],
  bet: number,
  symbols: readonly GameSymbol[]
) => {
  const counts: Record<string, number> = {};
  for (const id of reels) counts[id] = (counts[id] || 0) + 1;

  const entries = Object.entries(counts);

  const match = entries.find(([, count]) => MATCH_FACTOR[count] !== undefined);
  if (!match) return { winAmount: 0, multiplier: 0 };

  const [matchId, matchCount] = match;
  const symbol = symbols.find((s) => s.id === matchId);
  const multiplier = (symbol?.multiplier ?? 0) * MATCH_FACTOR[matchCount];

  return { winAmount: roundMoney(bet * multiplier), multiplier };
};
