import { GameBackground } from '@/widgets/game-background/GameBackground';
import { GameForeground } from '@/widgets/game-foreground/GameForeground';
import { GameLogo } from '@/widgets/game-logo/GameLogo';
import { HeaderBlock } from '@/widgets/header-block/HeaderBlock';
import { BalanceDisplay } from '@/widgets/balance-display/BalanceDisplay';
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
      <div className="relative w-full h-[400px] mt-auto flex flex-col items-center">
        <GameBackground />

        <div className="relative z-10 mt-auto mb-[160px]">
          <SpinButton />
        </div>

        <GameForeground />

        <div className="absolute bottom-0 inset-x-0 z-30 flex justify-center pb-2">
          <div className="w-full max-w-[427px]">
            <BalanceDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
