export interface GameSymbol<T extends string = string> {
  id: T;
  label: string;
  weight: number;
  multiplier: number;
}

export type GameStatus = 'idle' | 'spinning' | 'win' | 'lose';

export const GAME_STATUS = {
  IDLE: 'idle',
  SPINNING: 'spinning',
  WIN: 'win',
  LOSE: 'lose',
} as const;
