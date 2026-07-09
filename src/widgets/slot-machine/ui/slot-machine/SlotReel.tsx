import { cn } from '@/shared/lib/utils';
import { motion } from 'framer-motion';
import { useReelAnimation } from '../../model/useReelAnimation';
import type { SymbolId } from '@/entities/game';

interface Props {
  targetSymbolId?: SymbolId;
  isSpinning: boolean;
  delay: number;
  onStop?: () => void;
  className?: string;
}

export const SlotReel = (props: Props) => {
  const { controls, currentSymbol } = useReelAnimation(props);

  return (
    <div
      className={cn(
        'w-[75px] h-[85px] bg-slot-machine-bg overflow-hidden flex items-center justify-center absolute',
        props.className
      )}
    >
      <motion.div animate={controls} className="flex flex-col items-center justify-center">
        <span className="text-5xl select-none">{currentSymbol.label}</span>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-white/20 to-transparent rounded-[8px]" />
    </div>
  );
};
