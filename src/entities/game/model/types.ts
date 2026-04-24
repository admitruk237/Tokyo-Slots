import type { SymbolId } from '@/shared/config/gameConfig';
import type { GameStatus } from '@/shared/types/game';

export interface GameState {
  balance: number;
  bet: number;
  reels: SymbolId[];
  nextReels?: SymbolId[];
  status: GameStatus;
  winAmount: number;
  isMuted: boolean;
}

export interface GameActions {
  setBet: (amount: number) => void;
  incrementBet: () => void;
  decrementBet: () => void;
  startSpin: () => void;
  finishSpin: (results: SymbolId[]) => void;
  toggleMute: () => void;
  resetStatus: () => void;
}

export interface GameStore extends GameState, GameActions {}
