import { useEffect, useRef, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { useGameStore } from '@/entities/game/model/store';
import { GAME_CONFIG } from '@/shared/config/gameConfig';

export const useSlotMachine = () => {
  const { status, nextReels, finishSpin } = useGameStore();
  const leverControls = useAnimation();
  const [reelsSpinning, setReelsSpinning] = useState(false);
  const stoppedCount = useRef(0);

  const triggerLeverAnimation = async () => {
    await leverControls.start({
      rotateX: 90,
      transition: { duration: 0.3, ease: 'easeIn' },
    });
    await leverControls.start({
      rotateX: 160,
      transition: { duration: 0.3, ease: 'easeOut' },
    });
    await leverControls.start({
      rotateX: 0,
      transition: { type: 'spring', stiffness: 120, damping: 20, mass: 1 },
    });
  };

  useEffect(() => {
    if (status === 'spinning' && !reelsSpinning) {
      const handleSpinProcess = async () => {
        await triggerLeverAnimation();
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
    stoppedCount.current += 1;
    if (stoppedCount.current === GAME_CONFIG.REELS_COUNT && nextReels) {
      finishSpin(nextReels);
    }
  };

  return {
    leverControls,
    reelsSpinning,
    handleReelStop,
  };
};
