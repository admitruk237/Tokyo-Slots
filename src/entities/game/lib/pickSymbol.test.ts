import { describe, expect, it } from 'vitest';
import { pickSymbol } from './pickSymbol';
import type { GameSymbol } from '@/shared/types/game';

describe('pickSymbol', () => {
  const mockSymbols: GameSymbol[] = [
    { id: 'low', weight: 1, multiplier: 1, label: 'L' },
    { id: 'mid', weight: 3, multiplier: 2, label: 'M' },
    { id: 'high', weight: 6, multiplier: 3, label: 'H' },
  ];
  const totalWeight = 10;

  it('should pick the first symbol when random is 0', () => {
    expect(pickSymbol(mockSymbols, totalWeight, 0)).toBe('low');
    expect(pickSymbol(mockSymbols, totalWeight, 0.09)).toBe('low');
  });

  it('should pick the middle symbol in its range', () => {
    expect(pickSymbol(mockSymbols, totalWeight, 0.15)).toBe('mid');
    expect(pickSymbol(mockSymbols, totalWeight, 0.35)).toBe('mid');
  });

  it('should pick the last symbol when random is high', () => {
    expect(pickSymbol(mockSymbols, totalWeight, 0.45)).toBe('high');
    expect(pickSymbol(mockSymbols, totalWeight, 0.999)).toBe('high');
  });

  it('should fallback to the first symbol if random is 1.0 (out of [0, 1) range)', () => {
    expect(pickSymbol(mockSymbols, totalWeight, 1)).toBe('low');
  });
});
