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

  SYMBOLS: [
    { id: 'seven', label: '7️⃣', weight: 1, multiplier: 500 },
    { id: 'torii', label: '⛩️', weight: 3, multiplier: 50 },
    { id: 'maneki', label: '🐱', weight: 4, multiplier: 30 },
    { id: 'bell', label: '🔔', weight: 6, multiplier: 20 },
    { id: 'cherry', label: '🍒', weight: 12, multiplier: 10 },
    { id: 'sushi', label: '🍣', weight: 15, multiplier: 8 },
    { id: 'orange', label: '🍊', weight: 18, multiplier: 5 },
    { id: 'lemon', label: '🍋', weight: 18, multiplier: 5 },
    { id: 'sakura', label: '🌸', weight: 25, multiplier: 3 },
    { id: 'clover', label: '🍀', weight: 25, multiplier: 2 },
    { id: 'star', label: '⭐', weight: 30, multiplier: 1.5 },
  ],

  ANIMATION: {
    SPIN_DURATION: 2000,
    REEL_DELAY: 300,
  },
} as const;
