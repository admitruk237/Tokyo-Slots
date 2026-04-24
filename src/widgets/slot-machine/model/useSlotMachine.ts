import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { useGameActions, useGameStatus, useNextReels } from '@/entities/game/model/selectors';
import { GAME_CONFIG, type SymbolId } from '@/shared/config/gameConfig';
import { SOUNDS } from '@/shared/lib/audio';
import { useGameAudio } from '@/entities/game/lib/useGameAudio';
import { GAME_STATUS } from '@/shared/types/game';

export const useSlotMachine = () => {
  const status = useGameStatus();
  const nextReels = useNextReels();
  const { finishSpin } = useGameActions();

  const { playSound, stopSound } = useGameAudio();
  const leverControls = useAnimation();
  const ballControls = useAnimation();
  const [reelsSpinning, setReelsSpinning] = useState(false);
  const stoppedCount = useRef(0);

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
    let isMounted = true;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    if (status === GAME_STATUS.SPINNING && !reelsSpinning) {
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
    }

    return () => {
      isMounted = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [status, triggerLeverAnimation, playSound]);

  const handleReelStop = useCallback(
    (_symbolId: SymbolId) => {
      playSound(SOUNDS.REEL_STOP, 0.4);
      stoppedCount.current += 1;
      if (stoppedCount.current === GAME_CONFIG.REELS_COUNT) {
        stopSound(SOUNDS.SPIN);
        if (nextReels) {
          finishSpin(nextReels);
        }
      }
    },
    [playSound, stopSound, nextReels, finishSpin]
  );

  return {
    leverControls,
    ballControls,
    reelsSpinning,
    handleReelStop,
  };
};
