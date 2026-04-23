import { motion } from 'framer-motion';
import { useGameStore } from '@/entities/game/model/store';
import { StrokeText } from '@/shared/ui/StrokeText/StrokeText';
import { TokenIcon } from '@/shared/ui/TokenIcon/TokenIcon';
import rectangleImg from '@/shared/assets/lose-over-lay/rectangle-2.svg';

export const LosePopup = () => {
  const { bet } = useGameStore();

  const [whole, decimal] = bet.toFixed(2).split('.');

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, rotate: 10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="relative flex flex-col items-center select-none z-50 pointer-events-auto cursor-pointer"
    >
      <div className="absolute left-6 bottom-45 z-20 rotate-[10deg] whitespace-nowrap flex gap-3">
        <StrokeText className="font-poetsen text-[40px] text-text-white">You</StrokeText>
        <StrokeText className="font-poetsen text-[40px] text-lose-title">lose</StrokeText>
      </div>

      <div className="relative drop-shadow-2xl">
        <img src={rectangleImg} alt="" className="w-[317px] h-[157px] object-contain" />

        <div className="absolute inset-0 flex items-center justify-center pt-[55px]">
          <div className="relative flex items-center justify-center">
            <div className="absolute bottom-0 flex items-center justify-center px-4">
              <TokenIcon
                size="sm"
                className="mr-4 border-[2px] border-balance-bg/50 shadow-win-icon"
              />
              <span className="font-poetsen font-bold text-lose-title text-2xl tracking-[0.15em] text-stroke-muted">
                -{whole}
                <span className="text-white opacity-50 text-2xl pl-1">.{decimal}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
