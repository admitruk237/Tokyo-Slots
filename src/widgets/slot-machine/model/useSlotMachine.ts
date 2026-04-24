import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { useGameActions, useGameStatus } from '@/entities/game/model/selectors';
import { GAME_CONFIG } from '@/shared/config/gameConfig';
import { SOUNDS } from '@/shared/lib/audio';
import { useGameAudio } from '@/entities/game/lib/useGameAudio';
import { GAME_STATUS } from '@/shared/types/game';

export const useSlotMachine = () => {
  const status = useGameStatus();
  const { completeSpin } = useGameActions();

  const { playSound, stopSound } = useGameAudio();
  const leverControls = useAnimation();
  const ballControls = useAnimation();
  const [reelsSpinning, setReelsSpinning] = useState(false);
  const stoppedCount = useRef(0);
  const sessionStartedRef = useRef(false);

  const triggerLeverAnimation = useCallback(async () => {
    playSound(SOUNDS.LEVER);

    await Promise.all([
      leverControls.start({
        rotateX: 60,
        transition: { duration: 0.25, ease: 'easeIn' },
      }),
      ballControls.start({
        rotateX: -60,
        transition: { duration: 0.25, ease: 'easeIn' },
      }),
    ]);

    await Promise.all([
      leverControls.start({
        rotateX: 110,
        transition: { duration: 0.25, ease: 'easeOut' },
      }),
      ballControls.start({
        rotateX: -110,
        transition: { duration: 0.25, ease: 'easeOut' },
      }),
    ]);

    await Promise.all([
      leverControls.start({
        rotateX: 0,
        transition: { type: 'spring', stiffness: 120, damping: 20, mass: 1 },
      }),
      ballControls.start({
        rotateX: 0,
        transition: { type: 'spring', stiffness: 120, damping: 20, mass: 1 },
      }),
    ]);
  }, [playSound, leverControls, ballControls]);

  useEffect(() => {
    if (status !== GAME_STATUS.SPINNING) {
      sessionStartedRef.current = false;
      return;
    }

    if (sessionStartedRef.current) return;
    sessionStartedRef.current = true;

    let isMounted = true;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const handleSpinProcess = async () => {
      await triggerLeverAnimation();

      if (!isMounted) return;

      playSound(SOUNDS.SPIN, 0.2);
      setReelsSpinning(true);
      stoppedCount.current = 0;

      timerId = setTimeout(() => {
        if (isMounted) {
          setReelsSpinning(false);
        }
      }, GAME_CONFIG.ANIMATION.SPIN_DURATION);
    };

    handleSpinProcess();

    return () => {
      isMounted = false;
      if (timerId) clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, triggerLeverAnimation, playSound]);

  const handleReelStop = useCallback(() => {
    playSound(SOUNDS.REEL_STOP, 0.4);
    stoppedCount.current += 1;
    if (stoppedCount.current === GAME_CONFIG.REELS_COUNT) {
      stopSound(SOUNDS.SPIN);
      completeSpin();
    }
  }, [playSound, stopSound, completeSpin]);

  return {
    leverControls,
    ballControls,
    reelsSpinning,
    handleReelStop,
  };
};
