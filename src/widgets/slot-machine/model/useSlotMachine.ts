import { useEffect, useRef, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { useGameStore } from '@/entities/game/model/store';
import { GAME_CONFIG } from '@/shared/config/gameConfig';
import { SOUNDS, useAudio } from '@/shared/lib/audio';
import { GAME_STATUS } from '@/entities/game/model/types';

export const useSlotMachine = () => {
  const { status, nextReels, finishSpin, isMuted } = useGameStore();
  const { playSound, stopSound } = useAudio();
  const leverControls = useAnimation();
  const ballControls = useAnimation();
  const [reelsSpinning, setReelsSpinning] = useState(false);
  const stoppedCount = useRef(0);

  const triggerLeverAnimation = async () => {
    if (!isMuted) playSound(SOUNDS.LEVER);

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
  };

  useEffect(() => {
    if (status === GAME_STATUS.SPINNING && !reelsSpinning) {
      const handleSpinProcess = async () => {
        await triggerLeverAnimation();

        if (!isMuted) playSound(SOUNDS.SPIN, 0.2);
        setReelsSpinning(true);
        stoppedCount.current = 0;

        setTimeout(() => {
          setReelsSpinning(false);
        }, GAME_CONFIG.ANIMATION.SPIN_DURATION);
      };

      handleSpinProcess();
    }
  }, [status]);

  const handleReelStop = (_symbolId: string) => {
    if (!isMuted) playSound(SOUNDS.REEL_STOP, 0.4);
    stoppedCount.current += 1;
    if (stoppedCount.current === GAME_CONFIG.REELS_COUNT) {
      if (!isMuted) stopSound(SOUNDS.SPIN);
      if (nextReels) {
        finishSpin(nextReels);
      }
    }
  };

  return {
    leverControls,
    ballControls,
    reelsSpinning,
    handleReelStop,
  };
};
