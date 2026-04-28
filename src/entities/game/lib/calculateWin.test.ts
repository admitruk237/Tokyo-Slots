import { describe, expect, it } from 'vitest';
import { calculateWin } from './calculateWin';
import { GAME_CONFIG } from '@/shared/config/gameConfig';

describe('calculateWin', () => {
  const symbols = GAME_CONFIG.SYMBOLS;

  it('should return 0 win if no matching symbols (3 or 4)', () => {
    const reels = ['seven', 'torii', 'maneki', 'bell'] as const;
    const result = calculateWin(reels, 100, symbols);
    expect(result.winAmount).toBe(0);
    expect(result.multiplier).toBe(0);
  });

  it('should calculate 3-of-a-kind correctly', () => {
    const reels = ['seven', 'seven', 'seven', 'cherry'] as const;
    const bet = 100;
    const result = calculateWin(reels, bet, symbols);

    const expectedMultiplier = 500 * 0.5;
    expect(result.multiplier).toBe(expectedMultiplier);
    expect(result.winAmount).toBe(bet * expectedMultiplier);
  });

  it('should calculate 4-of-a-kind correctly', () => {
    const reels = ['seven', 'seven', 'seven', 'seven'] as const;
    const bet = 100;
    const result = calculateWin(reels, bet, symbols);

    expect(result.multiplier).toBe(500);
    expect(result.winAmount).toBe(bet * 500);
  });

  it('should prioritize 4-of-a-kind over 3-of-a-kind (though 4-of-a-kind implies 3-of-a-kind)', () => {
    const reels = ['cherry', 'cherry', 'cherry', 'cherry'] as const;
    const bet = 100;
    const result = calculateWin(reels, bet, symbols);

    expect(result.multiplier).toBe(10);
    expect(result.winAmount).toBe(bet * 10);
  });

  it('should work with different symbols (e.g., Maneki)', () => {
    const reels = ['maneki', 'maneki', 'maneki', 'torii'] as const;
    const bet = 200;
    const result = calculateWin(reels, bet, symbols);

    const expectedMultiplier = 50 * 0.5;
    expect(result.multiplier).toBe(expectedMultiplier);
    expect(result.winAmount).toBe(bet * expectedMultiplier);
  });

  it('should return 0 if bet is 0', () => {
    const reels = ['seven', 'seven', 'seven', 'seven'] as const;
    const result = calculateWin(reels, 0, symbols);
    expect(result.winAmount).toBe(0);
  });

  it('should handle decimal precision correctly', () => {
    const reels = ['bell', 'bell', 'bell', 'cherry'] as const;
    const bet = 123.45;
    const result = calculateWin(reels, bet, symbols);

    expect(result.winAmount).toBe(1234.5);
  });

  it('should return 0 win for two pairs (2+2)', () => {
    const reels = ['seven', 'seven', 'cherry', 'cherry'] as const;
    const result = calculateWin(reels, 100, symbols);
    expect(result.winAmount).toBe(0);
    expect(result.multiplier).toBe(0);
  });

  it('should not treat 4-of-a-kind as 3-of-a-kind', () => {
    const reels = ['seven', 'seven', 'seven', 'seven'] as const;
    const result = calculateWin(reels, 100, symbols);
    expect(result.multiplier).toBe(500);
  });
});
