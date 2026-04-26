import { useCallback, useEffect, useRef, useState } from 'react';
import type { TargetAndTransition } from 'framer-motion';

type LeverPhase = 'idle' | 'phase1' | 'phase2' | 'reset';

interface UseLeverAnimationReturn {
  leverAnimate: TargetAndTransition;
  ballAnimate: TargetAndTransition;
  onLeverAnimationComplete: () => void;
  triggerLever: (onComplete: () => void) => void;
}

const LEVER_VARIANTS: Record<LeverPhase, TargetAndTransition> = {
  idle: { rotateX: 0 },
  phase1: { rotateX: 60, transition: { duration: 0.25, ease: 'easeIn' } },
  phase2: { rotateX: 110, transition: { duration: 0.25, ease: 'easeOut' } },
  reset: { rotateX: 0, transition: { type: 'spring', stiffness: 120, damping: 20, mass: 1 } },
};

const BALL_VARIANTS: Record<LeverPhase, TargetAndTransition> = {
  idle: { rotateX: 0 },
  phase1: { rotateX: -60, transition: { duration: 0.25, ease: 'easeIn' } },
  phase2: { rotateX: -110, transition: { duration: 0.25, ease: 'easeOut' } },
  reset: { rotateX: 0, transition: { type: 'spring', stiffness: 120, damping: 20, mass: 1 } },
};

export const useLeverAnimation = (): UseLeverAnimationReturn => {
  const [phase, setPhase] = useState<LeverPhase>('idle');
  const onCompleteRef = useRef<(() => void) | null>(null);

  const triggerLever = useCallback((onComplete: () => void) => {
    onCompleteRef.current = onComplete;
    setPhase('phase1');
  }, []);

  const onLeverAnimationComplete = useCallback(() => {
    setPhase((prev) => {
      if (prev === 'phase1') return 'phase2';
      if (prev === 'phase2') return 'reset';
      if (prev === 'reset') return 'idle';
      return prev;
    });
  }, []);

  useEffect(() => {
    if (phase === 'idle' && onCompleteRef.current) {
      const cb = onCompleteRef.current;
      onCompleteRef.current = null;
      cb();
    }
  }, [phase]);

  return {
    leverAnimate: LEVER_VARIANTS[phase],
    ballAnimate: BALL_VARIANTS[phase],
    onLeverAnimationComplete,
    triggerLever,
  };
};
