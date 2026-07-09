import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from './store';
import { GAME_STATUS } from './types';

export const useBalance = () => useGameStore((s) => s.balance);
export const useBet = () => useGameStore((s) => s.bet);
export const useGameStatus = () => useGameStore((s) => s.status);
export const useIsMuted = () => useGameStore((s) => s.isMuted);
export const useWinAmount = () => useGameStore((s) => s.winAmount);
export const useReels = () => useGameStore((s) => s.reels);
export const useNextReels = () => useGameStore((s) => s.nextReels);

export const useIsSpinning = () => useGameStore((s) => s.status === GAME_STATUS.SPINNING);

export const useCanSpin = () =>
  useGameStore((s) => s.balance >= s.bet && s.bet > 0 && s.status !== GAME_STATUS.SPINNING);

export const useGameActions = () =>
  useGameStore(
    useShallow((s) => ({
      setBet: s.setBet,
      incrementBet: s.incrementBet,
      decrementBet: s.decrementBet,
      startSpin: s.startSpin,
      completeSpin: s.completeSpin,
      toggleMute: s.toggleMute,
      resetStatus: s.resetStatus,
    }))
  );
