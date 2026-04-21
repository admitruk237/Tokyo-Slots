import { motion } from 'framer-motion';
import housingRim from '@/shared/assets/items/Subtract.svg';
import housingBase from '@/shared/assets/items/Subtract-2.svg';
import redCap from '@/shared/assets/items/Union.svg';

type Props = {
  onClick?: () => void;
  disabled?: boolean;
};

export const SpinButton = ({ onClick, disabled = false }: Props) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="relative cursor-pointer select-none outline-none bg-transparent border-none p-0 flex items-center justify-center w-[250px] h-[151px]"
    >
      {/* 1. Underlying Blue Base (3D Side Walls) */}
      <img
        src={housingBase}
        alt=""
        className="absolute bottom-0 w-[250px] h-[77px] pointer-events-none z-[1]"
      />

      {/* 2. Red button internal structure using SVGs */}
      <div className="absolute inset-0 flex justify-center items-center top-[-20px] z-[5]">
        <div className="relative flex items-center justify-center w-[240px] h-[114px]">
          {/* Deep 3D Background (#AB1C34 layer) filling the rim's hole */}
          <div className="absolute inset-[15px] rounded-[35px] bg-[#ab1c34] z-[2]" />

          {/* Animating Red Cap (#F7405E layer) */}
          <motion.div
            className="absolute flex items-center justify-center w-[196px] h-[83px] top-[10px] z-[20]"
            whileTap={{ y: 15 }} // Pushes the top cap down into the base
            transition={{ duration: 0.1, ease: 'easeOut' }}
          >
            <img
              src={redCap}
              alt="Red Cap"
              className="absolute w-full h-full pointer-events-none bottom-[33px] right-[1px]"
            />

            {/* SPIN text placed over the SVG cap */}
            <span className="relative text-white font-poetsen italic select-none z-10 text-[48px] font-black tracking-[2px] [-webkit-text-stroke:4px_rgba(120,0,15,0.7)] [paint-order:stroke_fill] -skew-x-[6deg] block top-[-38px]">
              SPIN
            </span>
          </motion.div>

          {/* 3. Top Blue Rim Overlay */}
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
