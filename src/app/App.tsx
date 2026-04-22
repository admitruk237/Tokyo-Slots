import { GameBackground } from '@/widgets/game-background/GameBackground';
import { GameForeground } from '@/widgets/game-foreground/GameForeground';
import { GameLogo } from '@/widgets/game-logo/GameLogo';
import { HeaderBlock } from '@/widgets/header-block/HeaderBlock';
import { BalanceDisplay } from '@/widgets/balance-display/BalanceDispaly';
import { SpinButton } from '@/widgets/spin-button/SpinButton';

import { SlotMachine } from '@/widgets/slot-machine/SlotMachine';
import { BetControl } from '@/features/bet-control';

import { BackgroundDecorations } from '@/widgets/background-decorations/BackgroundDecorations';

const App = () => {
  return (
    <div className="relative min-h-screen bg-linear-to-b from-bg-idle-from to-bg-idle-to flex flex-col items-center">
      <BackgroundDecorations />
      <HeaderBlock />
      <GameLogo />

      <div className="mt-[69px] w-full flex justify-center px-4 relative z-10">
        <SlotMachine />
      </div>

      <div className="mt-12 relative z-10 px-4">
        <BetControl />
      </div>
      <div className="relative w-full mt-auto flex flex-col items-center pb-2 pt-20">
        <GameBackground />

        <div className="relative z-10 mb-14">
          <SpinButton />
        </div>

        <GameForeground />

        <div className="relative z-30 w-full max-w-[427px]">
          <BalanceDisplay />
        </div>
      </div>
    </div>
  );
};

export default App;
