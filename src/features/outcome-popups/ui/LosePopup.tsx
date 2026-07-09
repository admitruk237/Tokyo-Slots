import { useBet } from '@/entities/game';
import { StrokeText } from '@/shared/ui/stroke-text';
import { OutcomePopup } from './OutcomePopup';
import rectangleImg from '@/shared/assets/lose-over-lay/rectangle-2.svg';
import { OUTCOME_LABELS } from '../model/constants';

export const LosePopup = () => {
  const bet = useBet();

  return (
    <OutcomePopup
      kind="lose"
      amount={bet}
      rectangleSrc={rectangleImg}
      rectangleClassName="w-[317px] h-[157px] object-contain"
      title={
        <>
          <StrokeText className="font-poetsen text-[40px] text-white">
            {OUTCOME_LABELS.LOSE_TITLE_LINE_1}
          </StrokeText>
          <StrokeText className="font-poetsen text-[40px] text-lose-title">
            {OUTCOME_LABELS.LOSE_TITLE_LINE_2}
          </StrokeText>
        </>
      }
    />
  );
};
