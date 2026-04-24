import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CountUp } from '@/shared/ui/count-up';
import { useWinAmount } from '@/entities/game/model/selectors';
import { useGameAudio } from '@/entities/game/lib/useGameAudio';
import { StrokeText } from '@/shared/ui/stroke-text';
import { TokenIcon } from '@/shared/ui/token-icon';
import { SOUNDS } from '@/shared/lib/audio';
import rectangleImg from '@/shared/assets/win-over-lay/rectangle-1.svg';
import faceImg from '@/shared/assets/win-over-lay/face.svg';

export const WinPopup = () => {
  const winAmount = useWinAmount();
  const { playSound } = useGameAudio();

  useEffect(() => {
    playSound(SOUNDS.WIN);
  }, [playSound]);

  const [, decimal] = winAmount.toFixed(2).split('.');

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="relative flex flex-col items-center select-none z-50 pointer-events-auto cursor-pointer"
    >
      <div className="absolute bottom-22 left-4 z-20 rotate-[-10deg] whitespace-nowrap">
        <StrokeText className="font-poetsen text-[40px] text-win-title">You win!!!</StrokeText>
      </div>

      <div className="relative drop-shadow-2xl">
        <img src={rectangleImg} alt="" className="object-contain" />
        <img
          src={faceImg}
          alt=""
          className="absolute top-[18px] right-[25px] w-[60px] h-[45px] object-contain"
        />

        <div className="absolute inset-0 flex items-center justify-center pt-[55px]">
          <div className="relative flex items-center justify-center">
            <div className="absolute bottom-0.5 flex items-center justify-center px-4">
              <TokenIcon
                size="sm"
                className="mr-3 border-[2px] border-balance-bg/50 shadow-win-icon"
              />
              <span className="font-poetsen text-black text-[24px] tracking-wide text-stroke-muted">
                +
                <CountUp
                  start={0}
                  end={winAmount}
                  duration={1.5}
                  decimals={0}
                  useGrouping={false}
                />
                <span className="opacity-50">.{decimal}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
