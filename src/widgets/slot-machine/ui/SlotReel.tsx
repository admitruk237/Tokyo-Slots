import { cn } from '@/shared/lib/utils';
import { motion } from 'framer-motion';
import { useReelAnimation } from '../model/useReelAnimation';

type Props = {
  targetSymbolId?: string;
  isSpinning: boolean;
  delay: number;
  onStop?: (symbolId: string) => void;
  className?: string;
};

export const SlotReel = (props: Props) => {
  const { controls, currentSymbol } = useReelAnimation(props);

  return (
    <div
      className={cn(
        'w-[75px] h-[85px] bg-bg-slot-machine overflow-hidden flex items-center justify-center absolute',
        props.className
      )}
    >
      <motion.div animate={controls} className="flex flex-col items-center justify-center">
        <span className="text-5xl select-none">{currentSymbol.label}</span>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/20 to-transparent rounded-[8px]" />
    </div>
  );
};
