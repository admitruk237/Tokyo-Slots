import {
  useBetStatus,
  useCanSpin,
  useGameActions,
  useGameAudio,
  useIsSpinning,
} from '@/entities/game';
import { SOUNDS } from '@/shared/lib/audio';
import { GameButton } from '@/shared/ui/game-button';

export const SpinButton = () => {
  const { startSpin } = useGameActions();

  const isSpinning = useIsSpinning();
  const { isAffordable, hasValidBet } = useBetStatus();
  const canAttemptSpin = useCanSpin();

  const { playSound } = useGameAudio();

  const isDisabled = !isAffordable || !hasValidBet;
  const isActuallyDisabled = !canAttemptSpin || isDisabled;

  const handleSpinClick = () => {
    playSound(SOUNDS.CLICK);
    if (!isActuallyDisabled) {
      startSpin();
    }
  };

  return (
    <GameButton
      onClick={handleSpinClick}
      disabled={isActuallyDisabled}
      isPressed={isSpinning}
      className="w-[175px] h-[105px] sm:w-[250px] sm:h-[151px]"
      buttonClassName="scale-[0.8] sm:scale-100"
    >
      {isSpinning ? '...' : 'SPIN'}
    </GameButton>
  );
};
