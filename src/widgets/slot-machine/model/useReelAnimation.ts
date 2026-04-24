import { useEffect, useRef, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { GAME_CONFIG, type SymbolId } from '@/shared/config/gameConfig';
import type { GameSymbol } from '@/shared/types/game';

interface Props {
  targetSymbolId?: SymbolId;
  isSpinning: boolean;
  delay: number;
  onStop?: () => void;
}

export const useReelAnimation = ({ targetSymbolId, isSpinning, delay, onStop }: Props) => {
  const controls = useAnimation();
  const [currentSymbol, setCurrentSymbol] = useState<GameSymbol>(GAME_CONFIG.SYMBOLS[0]);

  const wasSpinningRef = useRef(false);

  useEffect(() => {
    if (isSpinning && targetSymbolId) {
      wasSpinningRef.current = true;

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
    } else if (!isSpinning && targetSymbolId && wasSpinningRef.current) {
      wasSpinningRef.current = false;

      const stopAnimation = async () => {
        await new Promise((resolve) => setTimeout(resolve, delay));

        const target =
          GAME_CONFIG.SYMBOLS.find((s) => s.id === targetSymbolId) || GAME_CONFIG.SYMBOLS[0];

        await controls.start({
          y: 0,
          transition: {
            duration: 0.35,
            ease: 'easeOut',
          },
        });

        setCurrentSymbol(target);
        if (onStop) onStop();
      };
      stopAnimation();
    }
  }, [isSpinning, targetSymbolId, delay, controls, onStop]);

  return {
    controls,
    currentSymbol,
  };
};
