import { useWinAmount } from '@/entities/game';
import { StrokeText } from '@/shared/ui/stroke-text';
import { OutcomePopup } from './OutcomePopup';
import rectangleImg from '@/shared/assets/win-over-lay/rectangle-1.svg';
import faceImg from '@/shared/assets/win-over-lay/face.svg';
import { OUTCOME_LABELS } from '../model/constants';

export const WinPopup = () => {
  const winAmount = useWinAmount();

  return (
    <OutcomePopup
      kind="win"
      amount={winAmount}
      rectangleSrc={rectangleImg}
      faceSrc={faceImg}
      title={
        <StrokeText className="font-poetsen text-[40px] text-win-title">
          {OUTCOME_LABELS.WIN_TITLE}
        </StrokeText>
      }
    />
  );
};
