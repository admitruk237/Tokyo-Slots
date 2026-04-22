import { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ballIcon from '@/shared/assets/slot-machine/ball.svg';
import machineSvg from '@/shared/assets/slot-machine/slot-mashine.svg';

export const SlotMachine = () => {
  const [isPulled, setIsPulled] = useState(false);
  const leverControls = useAnimation();

  const handleLeverClick = async () => {
    if (isPulled) return;
    setIsPulled(true);

    await leverControls.start({
      rotateX: 90,
      transition: { duration: 0.3, ease: 'easeIn' },
    });

    await leverControls.start({
      rotateX: 160,
      transition: { duration: 0.3, ease: 'easeOut' },
    });

    await leverControls.start({
      rotateX: 0,
      transition: { type: 'spring', stiffness: 120, damping: 20, mass: 1 },
    });

    setIsPulled(false);
  };

  return (
    <div className="relative flex items-center justify-center w-[483px] h-[297px]">
      <img
        src={machineSvg}
        alt="Slot Machine Body"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
      />

      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute left-[51.7px] top-[78.9px] w-[80px] h-[142px] bg-white border-[3px] border-[#341D1A] rounded-[11px]" />
        <div className="absolute left-[149.3px] top-[78.9px] w-[78.5px] h-[142px] bg-white border-[3px] border-[#341D1A] rounded-[11px]" />
        <div className="absolute left-[245.5px] top-[78.9px] w-[80px] h-[142px] bg-white border-[3px] border-[#341D1A] rounded-[11px]" />
        <div className="absolute left-[343.2px] top-[78.9px] w-[80px] h-[142px] bg-white border-[3px] border-[#341D1A] rounded-[11px]" />
      </div>

      <div className="absolute left-[450px] top-[147px] -translate-y-1/2 flex items-center z-20 select-none [perspective:1400px] [perspective-origin:center]">
        <div className="w-[26px] h-[118px] bg-[#0076CC] border-[3px] border-[#341D1A] rounded-r-[10px]" />

        <div className="w-[27px] h-[55px] bg-[#0076CC] border-[3px] border-[#341D1A] rounded-r-[10px] ml-[-3px] relative overflow-visible">
          <motion.div
            animate={leverControls}
            initial={{ rotateX: 0 }}
            className="absolute bottom-[20px] left-[9px] w-[9px] h-[69px] z-10 overflow-visible origin-bottom [transform-style:preserve-3d] [backface-visibility:hidden]"
          >
            <div className="absolute inset-0 bg-[#9CDEFA] border-[3px] border-[#341D1A] rounded-b-full shadow-inner [transform:translateZ(1px)]" />

            <img
              src={ballIcon}
              alt="Lever ball"
              className="absolute -top-[26px] left-1/2 -translate-x-1/2 w-[33px] min-w-[33px] h-[33px] min-h-[33px] max-w-none drop-shadow-xl z-100 [transform:translateZ(2px)]"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
