import { useEffect, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { GAME_CONFIG } from '@/shared/config/gameConfig';
import type { GameSymbol } from '@/entities/game/model/types';

type Props = {
  targetSymbolId?: string;
  isSpinning: boolean;
  delay: number;
  onStop?: (symbolId: string) => void;
};

export const useReelAnimation = ({ targetSymbolId, isSpinning, delay, onStop }: Props) => {
  const controls = useAnimation();
  const [currentSymbol, setCurrentSymbol] = useState<GameSymbol>(GAME_CONFIG.SYMBOLS[0]);

  useEffect(() => {
    if (isSpinning && targetSymbolId) {
      const startAnimation = async () => {
        await new Promise((resolve) => setTimeout(resolve, delay));

        await controls.start({
          y: [0, -500],
          transition: {
            duration: 0.5,
            repeat: Infinity,
            ease: 'linear',
          },
        });
      };
      startAnimation();
    } else if (!isSpinning && targetSymbolId) {
      const stopAnimation = async () => {
        const target =
          GAME_CONFIG.SYMBOLS.find((s) => s.id === targetSymbolId) || GAME_CONFIG.SYMBOLS[0];
        await controls.start({
          y: [null, -100, 0],
          transition: {
            duration: 0.5,
            ease: 'easeOut',
            type: 'spring',
            stiffness: 100,
            damping: 10,
          },
        });

        setCurrentSymbol(target);
        if (onStop) onStop(targetSymbolId);
      };
      stopAnimation();
    }
  }, [isSpinning, targetSymbolId, delay, controls, onStop]);

  return {
    controls,
    currentSymbol,
  };
};
