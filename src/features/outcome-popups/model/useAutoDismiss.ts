import { useEffect } from 'react';
import { GAME_CONFIG } from '@/shared/config/gameConfig';
import type { GameStatus } from '@/shared/types/game';
import { useGameActions, useGameStatus } from '@/entities/game/model/selectors';

export const useAutoDismiss = (
  targetStatus: GameStatus,
  delayMs: number = GAME_CONFIG.ANIMATION.OVERLAY_DURATION
) => {
  const status = useGameStatus();
  const { resetStatus } = useGameActions();

  useEffect(() => {
    if (status !== targetStatus) return;

    const timer = setTimeout(() => {
      resetStatus();
    }, delayMs);

    return () => clearTimeout(timer);
  }, [status, targetStatus, delayMs, resetStatus]);
};
