import { motion } from 'framer-motion';
import housingRim from '@/shared/assets/game-button/Subtract.svg';
import housingBase from '@/shared/assets/game-button/Subtract-2.svg';
import redCap from '@/shared/assets/game-button/Union.svg';
import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isPressed?: boolean;
  pulse?: boolean;
  className?: string;
  buttonClassName?: string;
  textClassName?: string;
}

export const GameButton = ({
  children,
  onClick,
  disabled = false,
  isPressed = false,
  pulse = false,
  className,
  buttonClassName,
  textClassName,
}: Props) => {
  return (
    <motion.div
      className={cn('relative flex items-center justify-center', className)}
      animate={pulse ? { scale: [1, 1.05, 1] } : {}}
      transition={pulse ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' } : {}}
    >
      <motion.button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'absolute origin-center select-none outline-none bg-transparent border-none p-0 flex items-center justify-center w-[250px] h-[151px] transition-opacity',
          disabled ? 'cursor-not-allowed opacity-70 grayscale-[0.3]' : 'cursor-pointer',
          buttonClassName
        )}
      >
        <img
          src={housingBase}
          alt=""
          className="absolute bottom-0 w-[250px] h-[77px] pointer-events-none z-[1]"
        />

        <div className="absolute inset-0 flex justify-center items-center top-[-20px] z-[5]">
          <div className="relative flex items-center justify-center w-[240px] h-[114px]">
            <div className="absolute inset-[15px] rounded-[35px] bg-spin-border-bg z-[2]" />

            <motion.div
              className="absolute flex items-center justify-center w-[196px] h-[83px] top-[10px] z-[20]"
              whileTap={!disabled ? { y: 15 } : {}}
              animate={isPressed ? { y: 17, scale: 1.05 } : { y: 0, scale: 1 }}
              transition={{
                duration: 0.1,
                ease: 'easeOut',
              }}
            >
              <img
                src={redCap}
                alt=""
                className="absolute w-full h-full pointer-events-none bottom-[25px] right-[1px]"
              />

              <span
                className={cn(
                  'relative text-white font-poetsen italic select-none z-10 text-[48px] font-black tracking-[2px] [-webkit-text-stroke:4px_var(--color-spin-text-stroke)] [paint-order:stroke_fill] -skew-x-[6deg] block top-[-38px]',
                  textClassName
                )}
              >
                {children}
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
    </motion.div>
  );
};
