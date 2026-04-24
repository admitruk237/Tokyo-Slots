import { useEffect } from 'react';
import { useGameStore } from '@/entities/game/model/store';
import type { GameStatus } from '@/shared/types/game';

export const useAutoDismiss = (targetStatus: GameStatus, delayMs: number = 2000) => {
  const { status, resetStatus } = useGameStore();

  useEffect(() => {
    if (status !== targetStatus) return;

    const timer = setTimeout(() => {
      resetStatus();
    }, delayMs);

    return () => clearTimeout(timer);
  }, [status, targetStatus, delayMs, resetStatus]);
};
