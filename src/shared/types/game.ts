export interface GameSymbol {
  id: string;
  label: string;
  weight: number;
  multiplier: number;
  src?: string;
}

export type GameStatus = 'idle' | 'spinning' | 'win' | 'lose';

export const GAME_STATUS = {
  IDLE: 'idle',
  SPINNING: 'spinning',
  WIN: 'win',
  LOSE: 'lose',
} as const;
