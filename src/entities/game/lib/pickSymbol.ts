import type { GameSymbol } from '../model/types';

export const pickSymbol = <T extends string>(
  symbols: readonly GameSymbol<T>[],
  totalWeight: number,
  randomValue = Math.random()
): T => {
  let random = randomValue * totalWeight;

  for (const symbol of symbols) {
    if (random < symbol.weight) {
      return symbol.id;
    }
    random -= symbol.weight;
  }

  return symbols[0].id;
};
