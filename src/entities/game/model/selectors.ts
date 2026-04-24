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

export const useBetStatus = () =>
  useGameStore(
    useShallow((s) => ({
      isAffordable: s.balance >= s.bet,
      hasValidBet: s.bet > 0,
    }))
  );

export const useGameActions = () => {
  const setBet = useGameStore((s) => s.setBet);
  const incrementBet = useGameStore((s) => s.incrementBet);
  const decrementBet = useGameStore((s) => s.decrementBet);
  const startSpin = useGameStore((s) => s.startSpin);
  const finishSpin = useGameStore((s) => s.finishSpin);
  const toggleMute = useGameStore((s) => s.toggleMute);
  const resetStatus = useGameStore((s) => s.resetStatus);

  return {
    setBet,
    incrementBet,
    decrementBet,
    startSpin,
    finishSpin,
    toggleMute,
    resetStatus,
  };
};
