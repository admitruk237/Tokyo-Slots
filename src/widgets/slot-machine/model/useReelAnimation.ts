import { useEffect, useRef, useState } from 'react';
import { useAnimation } from 'framer-motion';
import { GAME_CONFIG, type GameSymbol, type SymbolId } from '@/entities/game';

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
    let cancelled = false;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timerId = setTimeout(resolve, ms);
      });

    if (isSpinning && targetSymbolId) {
      wasSpinningRef.current = true;

      const startAnimation = async () => {
        await wait(delay);
        if (cancelled) return;

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
        await wait(delay);
        if (cancelled) return;

        const target =
          GAME_CONFIG.SYMBOLS.find((s) => s.id === targetSymbolId) || GAME_CONFIG.SYMBOLS[0];

        await controls.start({
          y: 0,
          transition: {
            duration: 0.35,
            ease: 'easeOut',
          },
        });
        if (cancelled) return;

        setCurrentSymbol(target);
        onStop?.();
      };
      stopAnimation();
    }

    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [isSpinning, targetSymbolId, delay, controls, onStop]);

  return {
    controls,
    currentSymbol,
  };
};
