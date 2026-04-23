import { useGameStore } from '@/entities/game/model/store';
import { SquareButton } from '@/shared/ui/SquareButton/SquareButton';
import { StrokeText } from '@/shared/ui/StrokeText/StrokeText';
import { SOUNDS, useAudio } from '@/shared/lib/audio';
import { BetDisplay } from './BetDisplay';
import { GAME_STATUS } from '@/entities/game/model/types';

export const BetControl = () => {
  const { incrementBet, decrementBet, status, isMuted } = useGameStore();
  const { playSound } = useAudio();
  const isSpinning = status === GAME_STATUS.SPINNING;

  const handleIncrement = () => {
    if (!isMuted) playSound(SOUNDS.CLICK);
    incrementBet();
  };

  const handleDecrement = () => {
    if (!isMuted) playSound(SOUNDS.CLICK);
    decrementBet();
  };

  return (
    <div className="flex flex-col items-center">
      <StrokeText className="font-poetsen text-sm  text-[#54C3EE]">Place a bid</StrokeText>

      <div className="mt-[20px] flex items-center">
        <SquareButton onClick={handleDecrement} disabled={isSpinning}>
          <span className="text-black font-poetsen text-5xl leading-none -mt-1 select-none">-</span>
        </SquareButton>

        <BetDisplay />

        <SquareButton onClick={handleIncrement} disabled={isSpinning}>
          <span className="text-black font-poetsen text-4xl leading-none select-none">+</span>
        </SquareButton>
      </div>
    </div>
  );
};
