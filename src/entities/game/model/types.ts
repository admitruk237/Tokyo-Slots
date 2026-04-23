export type GameStatus = 'idle' | 'spinning' | 'win' | 'lose';

export const GAME_STATUS = {
  IDLE: 'idle',
  SPINNING: 'spinning',
  WIN: 'win',
  LOSE: 'lose',
} as const;

export type GameSymbol = {
  id: string;
  label: string;
  weight: number;
  multiplier: number;
};

export type GameState = {
  balance: number;
  bet: number;
  reels: string[];
  nextReels?: string[];
  status: GameStatus;
  winAmount: number;
  isMuted: boolean;
};

export type GameActions = {
  setBet: (amount: number) => void;
  incrementBet: () => void;
  decrementBet: () => void;
  startSpin: () => void;
  finishSpin: (results: string[]) => void;
  toggleMute: () => void;
  resetStatus: () => void;
};

export type GameStore = GameState & GameActions;
