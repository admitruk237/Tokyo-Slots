import { type ReactNode, useEffect } from 'react';
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

const SIGN: Record<Kind, string> = { win: '+', lose: '-' };
const SOUND: Record<Kind, SoundKey> = { win: SOUNDS.WIN, lose: SOUNDS.LOSE };
const ROTATION: Record<Kind, number> = { win: -10, lose: 10 };
const AMOUNT_CLASS: Record<Kind, string> = {
  win: 'font-poetsen text-black text-[24px] tracking-wide text-stroke-muted',
  lose: 'font-poetsen font-bold text-lose-title text-2xl tracking-[0.15em] text-stroke-muted',
};
const DECIMAL_CLASS: Record<Kind, string> = {
  win: 'opacity-50',
  lose: 'text-white opacity-50 text-2xl pl-1',
};
const TITLE_OFFSET: Record<Kind, string> = {
  win: 'left-4 bottom-22 rotate-[-10deg]',
  lose: 'left-6 bottom-26 rotate-[10deg]',
};
const ICON_OFFSET: Record<Kind, string> = {
  win: 'bottom-0.5 mr-3',
  lose: 'bottom-0 mr-4',
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

  useEffect(() => {
    playSound(SOUND[kind]);
  }, [kind, playSound]);

  const [, decimal] = amount.toFixed(2).split('.');

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, rotate: ROTATION[kind] }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="relative flex flex-col items-center select-none z-50 pointer-events-auto cursor-pointer"
    >
      <div className={`absolute z-20 whitespace-nowrap flex gap-3 ${TITLE_OFFSET[kind]}`}>
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
              className={`absolute flex items-center justify-center px-4 ${
                kind === 'win' ? 'bottom-0.5' : 'bottom-0'
              }`}
            >
              <TokenIcon
                size="sm"
                className={`${ICON_OFFSET[kind]} border-[2px] border-balance-bg/50 shadow-win-icon`}
              />
              <span className={AMOUNT_CLASS[kind]}>
                {SIGN[kind]}
                <CountUp start={0} end={amount} duration={1.5} decimals={0} useGrouping={false} />
                <span className={DECIMAL_CLASS[kind]}>.{decimal}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
