import { useCallback, useEffect, useRef, useState } from 'react';
import {
  GAME_CONFIG,
  GAME_STATUS,
  useGameActions,
  useGameAudio,
  useGameStatus,
} from '@/entities/game';
import { SOUNDS } from '@/shared/lib/audio';
import { useLeverAnimation } from './useLeverAnimation';

export const useSlotMachine = () => {
  const status = useGameStatus();
  const { completeSpin } = useGameActions();
  const { playSound, stopSound } = useGameAudio();

  const { leverAnimate, ballAnimate, onLeverAnimationComplete, triggerLever } = useLeverAnimation();
  const [reelsSpinning, setReelsSpinning] = useState(false);
  const [stoppedCount, setStoppedCount] = useState(0);
  const sessionStartedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (status !== GAME_STATUS.SPINNING) {
      sessionStartedRef.current = false;
      return;
    }

    if (sessionStartedRef.current) return;
    sessionStartedRef.current = true;

    playSound(SOUNDS.LEVER);
    triggerLever(() => {
      playSound(SOUNDS.SPIN, 0.2);
      setReelsSpinning(true);
      setStoppedCount(0);
      timerRef.current = setTimeout(() => {
        setReelsSpinning(false);
      }, GAME_CONFIG.ANIMATION.SPIN_DURATION);
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [status, triggerLever, playSound]);

  useEffect(() => {
    if (stoppedCount === GAME_CONFIG.REELS_COUNT) {
      stopSound(SOUNDS.SPIN);
      completeSpin();
    }
  }, [stoppedCount, stopSound, completeSpin]);

  const handleReelStop = useCallback(() => {
    playSound(SOUNDS.REEL_STOP, 0.4);
    setStoppedCount((prev) => prev + 1);
  }, [playSound]);

  return {
    leverAnimate,
    ballAnimate,
    onLeverAnimationComplete,
    reelsSpinning,
    handleReelStop,
  };
};
