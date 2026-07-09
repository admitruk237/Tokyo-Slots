import { useCanSpin, useGameActions, useGameAudio, useIsSpinning } from '@/entities/game';
import { SOUNDS } from '@/shared/lib/audio';
import { GameButton } from '@/shared/ui/game-button';
import { SPIN_BUTTON_LABELS } from '../model/constants';

export const SpinButton = () => {
  const { startSpin } = useGameActions();
  const canSpin = useCanSpin();
  const isSpinning = useIsSpinning();
  const { playSound } = useGameAudio();

  const handleSpinClick = () => {
    playSound(SOUNDS.CLICK);
    startSpin();
  };

  return (
    <GameButton
      onClick={handleSpinClick}
      disabled={!canSpin}
      isPressed={isSpinning}
      className="w-[175px] h-[105px] sm:w-[250px] sm:h-[151px]"
      buttonClassName="scale-[0.8] sm:scale-100"
    >
      {isSpinning ? SPIN_BUTTON_LABELS.SPINNING : SPIN_BUTTON_LABELS.IDLE}
    </GameButton>
  );
};
