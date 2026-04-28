export interface GameSymbol<T extends string = string> {
  id: T;
  label: string;
  weight: number;
  multiplier: number;
}

export const GAME_STATUS = {
  IDLE: 'idle',
  SPINNING: 'spinning',
  WIN: 'win',
  LOSE: 'lose',
} as const;

export type GameStatus = (typeof GAME_STATUS)[keyof typeof GAME_STATUS];
