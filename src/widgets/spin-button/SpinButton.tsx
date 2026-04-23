import { motion } from 'framer-motion';
import { useGameStore } from '@/entities/game/model/store';
import { GAME_STATUS } from '@/entities/game/model/types';
import housingRim from '@/shared/assets/items/Subtract.svg';
import housingBase from '@/shared/assets/items/Subtract-2.svg';
import redCap from '@/shared/assets/items/Union.svg';

export const SpinButton = () => {
  const { startSpin, status, balance, bet } = useGameStore();

  const isSpinning = status === GAME_STATUS.SPINNING;
  const isAffordable = balance >= bet;
  const hasValidBet = bet > 0;

  const canAttemptSpin = !isSpinning;
  const isDisabled = !isAffordable || !hasValidBet;

  return (
    <motion.button
      onClick={startSpin}
      disabled={!canAttemptSpin}
      className={`relative cursor-pointer select-none outline-none bg-transparent border-none p-0 flex items-center justify-center w-[250px] h-[151px] transition-opacity ${isDisabled && !isSpinning ? 'opacity-70 grayscale-[0.3]' : ''}`}
    >
      <img
        src={housingBase}
        alt=""
        className="absolute bottom-0 w-[250px] h-[77px] pointer-events-none z-[1]"
      />

      <div className="absolute inset-0 flex justify-center items-center top-[-20px] z-[5]">
        <div className="relative flex items-center justify-center w-[240px] h-[114px]">
          <div className="absolute inset-[15px] rounded-[35px] bg-[#ab1c34] z-[2]" />

          <motion.div
            className="absolute flex items-center justify-center w-[196px] h-[83px] top-[10px] z-[20]"
            whileTap={canAttemptSpin ? { y: 15 } : {}}
            animate={isSpinning ? { y: 17, scale: 1.05 } : { y: 0, scale: 1 }}
            transition={{
              duration: 0.1,
              ease: 'easeOut',
            }}
          >
            <img
              src={redCap}
              alt="Red Cap"
              className="absolute w-full h-full pointer-events-none bottom-[25px] right-[1px]"
            />

            <span className="relative text-white font-poetsen italic select-none z-10 text-[48px] font-black tracking-[2px] [-webkit-text-stroke:4px_rgba(120,0,15,0.7)] [paint-order:stroke_fill] -skew-x-[6deg] block top-[-38px]">
              {isSpinning ? '...' : 'SPIN'}
            </span>
          </motion.div>

          <img
            src={housingRim}
            alt=""
            className="absolute inset-0 w-full h-full pointer-events-none z-[10]"
          />
        </div>
      </div>
    </motion.button>
  );
};
