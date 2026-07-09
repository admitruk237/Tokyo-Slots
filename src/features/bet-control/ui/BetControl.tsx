import { useGameActions, useGameAudio, useIsSpinning } from '@/entities/game';
import { SquareButton } from '@/shared/ui/square-button';
import { StrokeText } from '@/shared/ui/stroke-text';
import { SOUNDS } from '@/shared/lib/audio';
import { BetDisplay } from './BetDisplay';
import { BET_LABELS } from '../model/constants';

export const BetControl = () => {
  const { incrementBet, decrementBet } = useGameActions();
  const isSpinning = useIsSpinning();
  const { playSound } = useGameAudio();

  const handleIncrement = () => {
    playSound(SOUNDS.CLICK);
    incrementBet();
  };

  const handleDecrement = () => {
    playSound(SOUNDS.CLICK);
    decrementBet();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-center">
      <StrokeText className="font-poetsen text-sm text-win-title">
        {BET_LABELS.PLACE_A_BID}
      </StrokeText>

      <div className="mt-[20px] flex items-center">
        <SquareButton onClick={handleDecrement} disabled={isSpinning}>
          <span className="text-black font-poetsen text-5xl leading-none -mt-1 select-none">-</span>
        </SquareButton>

        <BetDisplay />

        <SquareButton onClick={handleIncrement} disabled={isSpinning}>
          <span className="text-black font-poetsen text-4xl leading-none select-none">+</span>
        </SquareButton>
      </div>
    </form>
  );
};
