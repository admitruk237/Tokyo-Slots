import type { GameSymbol } from '@/shared/types/game';

export const GAME_CONFIG = {
  INITIAL_BALANCE: 999999.99,
  INITIAL_JACKPOT: 10000.0,

  BET: {
    MIN: 100,
    MAX: 10000,
    STEP: 100,
    DEFAULT: 1000,
  },

  REELS_COUNT: 4,
  DEFAULT_REEL_SYMBOL: 'seven',

  SYMBOLS: [
    { id: 'seven', label: '7️⃣', weight: 1, multiplier: 500 },
    { id: 'torii', label: '⛩️', weight: 2, multiplier: 100 },
    { id: 'maneki', label: '🐱', weight: 3, multiplier: 50 },
    { id: 'bell', label: '🔔', weight: 4, multiplier: 20 },
    { id: 'cherry', label: '🍒', weight: 5, multiplier: 10 },
  ] as const satisfies readonly GameSymbol<string>[],

  ANIMATION: {
    SPIN_DURATION: 2000,
    REEL_DELAY: 300,
    OVERLAY_DURATION: 2000,
  },
  STORAGE_KEY: 'tokyo-slots-storage',
} as const;

export type SymbolId = (typeof GAME_CONFIG.SYMBOLS)[number]['id'];
