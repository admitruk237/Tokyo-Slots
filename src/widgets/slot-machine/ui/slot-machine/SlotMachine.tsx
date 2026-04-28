import { motion } from 'framer-motion';
import { useNextReels } from '@/entities/game';
import { GAME_CONFIG } from '@/shared/config/gameConfig';
import ballIcon from '@/shared/assets/slot-machine/ball.svg';
import machineSvg from '@/shared/assets/slot-machine/slot-machine.svg';
import { useSlotMachine } from '../../model/useSlotMachine';
import { SlotReel } from './SlotReel';

const REEL_CLASSES = [
  'left-[53px] top-[107px]',
  'left-[150px] top-[107px]',
  'left-[246px] top-[107px]',
  'left-[345px] top-[107px]',
];

export const SlotMachine = () => {
  const nextReels = useNextReels();
  const { leverAnimate, ballAnimate, onLeverAnimationComplete, reelsSpinning, handleReelStop } =
    useSlotMachine();

  return (
    <div className="relative flex items-center justify-center w-[337px] h-[200px] sm:w-[483px] sm:h-[297px]">
      <div className="absolute origin-center scale-[0.69] sm:scale-100 flex items-center justify-center w-[483px] h-[297px]">
        <img
          src={machineSvg}
          alt="Slot Machine Body"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
        />

        <div className="absolute inset-0 z-10 pointer-events-none">
          {Array(GAME_CONFIG.REELS_COUNT)
            .fill(null)
            .map((_, i) => (
              <SlotReel
                key={i}
                className={REEL_CLASSES[i]}
                isSpinning={reelsSpinning}
                targetSymbolId={nextReels?.[i]}
                delay={i * GAME_CONFIG.ANIMATION.REEL_DELAY}
                onStop={handleReelStop}
              />
            ))}
        </div>

        <div className="absolute left-[450px] top-[147px] -translate-y-1/2 flex items-center z-20 select-none [perspective:1400px] [perspective-origin:center]">
          <div className="w-[26px] h-[118px] bg-machine-accent border-[3px] border-border-dark rounded-r-[10px]" />

          <div className="w-[27px] h-[55px] bg-machine-accent border-[3px] border-border-dark rounded-r-[10px] ml-[-3px] relative overflow-visible">
            <motion.div
              animate={leverAnimate}
              initial={{ rotateX: 0 }}
              onAnimationComplete={onLeverAnimationComplete}
              className="absolute bottom-[20px] left-[9px] w-[9px] h-[69px] z-10 overflow-visible origin-bottom [transform-style:preserve-3d] [backface-visibility:hidden]"
            >
              <div className="absolute inset-0 bg-lever-shaft border-[3px] border-border-dark rounded-b-full shadow-inner [transform:translateZ(1px)]" />

              <motion.div
                animate={ballAnimate}
                initial={{ rotateX: 0 }}
                className="absolute -top-[26px] left-1/2 -translate-x-1/2 w-[33px] h-[33px]"
              >
                <img
                  src={ballIcon}
                  alt="Lever ball"
                  className="w-full h-full object-contain drop-shadow-xl z-20 [transform:translateZ(2px)]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
