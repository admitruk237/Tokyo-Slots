import type { SymbolId } from '@/shared/config/gameConfig';
import type { GameSymbol } from '@/shared/types/game';

export const calculateWin = (
  reels: readonly SymbolId[],
  bet: number,
  symbols: readonly GameSymbol[]
) => {
  const counts = reels.reduce<Record<string, number>>(
    (acc, id) => ({
      ...acc,
      [id]: (acc[id] || 0) + 1,
    }),
    {}
  );

  const entries = Object.entries(counts);

  const fourOfAKind = entries.find(([_, count]) => count === 4);
  if (fourOfAKind) {
    const symbol = symbols.find((s) => s.id === fourOfAKind[0]);
    const multiplier = symbol?.multiplier ?? 0;
    return { winAmount: Number((bet * multiplier).toFixed(2)), multiplier };
  }

  const threeOfAKind = entries.find(([_, count]) => count === 3);
  if (threeOfAKind) {
    const symbol = symbols.find((s) => s.id === threeOfAKind[0]);
    const multiplier = (symbol?.multiplier ?? 0) * 0.5;
    return { winAmount: Number((bet * multiplier).toFixed(2)), multiplier };
  }

  return { winAmount: 0, multiplier: 0 };
};
