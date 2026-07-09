import { type ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CountUp } from '@/shared/ui/count-up';
import { useGameAudio } from '@/entities/game';
import { TokenIcon } from '@/shared/ui/token-icon';
import { type SoundKey, SOUNDS } from '@/shared/lib/audio';

type Kind = 'win' | 'lose';

interface Props {
  kind: Kind;
  amount: number;
  rectangleSrc: string;
  faceSrc?: string;
  title: ReactNode;
  rectangleClassName?: string;
}

const AMOUNT_COUNT_DURATION = 1.5;

const VARIANTS: Record<
  Kind,
  {
    sign: string;
    sound: SoundKey;
    rotation: number;
    amountClass: string;
    decimalClass: string;
    titleOffset: string;
    iconOffset: string;
    amountBottom: string;
  }
> = {
  win: {
    sign: '+',
    sound: SOUNDS.WIN,
    rotation: -10,
    amountClass: 'font-poetsen text-black text-[24px] tracking-wide text-stroke-muted',
    decimalClass: 'opacity-50',
    titleOffset: 'left-4 bottom-22 rotate-[-10deg]',
    iconOffset: 'bottom-0.5 mr-3',
    amountBottom: 'bottom-0.5',
  },
  lose: {
    sign: '-',
    sound: SOUNDS.LOSE,
    rotation: 10,
    amountClass:
      'font-poetsen font-bold text-lose-title text-2xl tracking-[0.15em] text-stroke-muted',
    decimalClass: 'text-white opacity-50 text-2xl pl-1',
    titleOffset: 'left-6 bottom-26 rotate-[10deg]',
    iconOffset: 'bottom-0 mr-4',
    amountBottom: 'bottom-0',
  },
};

export const OutcomePopup = ({
  kind,
  amount,
  rectangleSrc,
  faceSrc,
  title,
  rectangleClassName,
}: Props) => {
  const { playSound } = useGameAudio();
  const variant = VARIANTS[kind];

  const playSoundRef = useRef(playSound);

  useEffect(() => {
    playSoundRef.current = playSound;
  });

  useEffect(() => {
    playSoundRef.current(variant.sound);
  }, [variant.sound]);

  const [, decimal] = amount.toFixed(2).split('.');

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, rotate: variant.rotation }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="relative flex flex-col items-center select-none z-50 pointer-events-auto cursor-pointer"
    >
      <div className={`absolute z-20 whitespace-nowrap flex gap-3 ${variant.titleOffset}`}>
        {title}
      </div>
      <div className="relative drop-shadow-2xl">
        <img src={rectangleSrc} alt="" className={rectangleClassName ?? 'object-contain'} />
        {faceSrc && (
          <img
            src={faceSrc}
            alt=""
            className="absolute top-[18px] right-[25px] w-[60px] h-[45px] object-contain"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center pt-[55px]">
          <div className="relative flex items-center justify-center">
            <div
              className={`absolute flex items-center justify-center px-4 ${variant.amountBottom}`}
            >
              <TokenIcon
                size="sm"
                className={`${variant.iconOffset} border-[2px] border-balance-bg/50 shadow-win-icon`}
              />
              <span className={variant.amountClass}>
                {variant.sign}
                <CountUp
                  start={0}
                  end={amount}
                  duration={AMOUNT_COUNT_DURATION}
                  decimals={0}
                  useGrouping={false}
                />
                <span className={variant.decimalClass}>.{decimal}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
