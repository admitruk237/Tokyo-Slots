import { useGameStore } from '@/entities/game/model/store';
import { SquareButton } from '@/shared/ui/SquareButton/SquareButton';
import { StrokeText } from '@/shared/ui/StrokeText/StrokeText';
import { BetDisplay } from './BetDisplay';

export const BetControl = () => {
  const { incrementBet, decrementBet, status } = useGameStore();
  const isSpinning = status === 'spinning';

  return (
    <div className="flex flex-col items-center">
      <StrokeText className="font-poetsen text-2xl lg:text-3xl text-[#54C3EE]">
        Place a bid
      </StrokeText>

      <div className="mt-[20px] flex items-center">
        <SquareButton onClick={decrementBet} disabled={isSpinning}>
          <span className="text-black font-poetsen text-5xl leading-none -mt-1 select-none">-</span>
        </SquareButton>

        <BetDisplay />

        <SquareButton onClick={incrementBet} disabled={isSpinning}>
          <span className="text-black font-poetsen text-4xl leading-none select-none">+</span>
        </SquareButton>
      </div>
    </div>
  );
};
