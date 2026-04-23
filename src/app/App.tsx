import { GameBackground } from '@/widgets/game-background/GameBackground';
import { GameForeground } from '@/widgets/game-foreground/GameForeground';
import { GameLogo } from '@/widgets/game-logo/GameLogo';
import { HeaderBlock } from '@/widgets/header-block/HeaderBlock';
import { BalanceDisplay } from '@/widgets/balance-display/BalanceDisplay';
import { SpinButton } from '@/widgets/spin-button/SpinButton';

import { SlotMachine } from '@/widgets/slot-machine/SlotMachine';
import { BetControl } from '@/features/bet-control';

import { BackgroundDecorations } from '@/widgets/background-decorations/BackgroundDecorations';

import { WinOverlay } from '@/widgets/outcome-popups/ui/WinOverlay';
import { LoseOverlay } from '@/widgets/outcome-popups/ui/LoseOverlay';

const App = () => {
  return (
    <div className="relative min-h-screen bg-linear-to-b from-bg-idle-from to-bg-idle-to flex flex-col items-center">
      <WinOverlay />
      <LoseOverlay />
      <BackgroundDecorations />
      <HeaderBlock />
      <GameLogo />

      <div className="mt-12 md:mt-7 w-full flex justify-center px-4 relative z-10">
        <SlotMachine />
      </div>

      <div className="mt-8 md:mt-5 relative z-10 px-4 hidden sm:block">
        <BetControl />
      </div>
      <div className="relative w-full h-[400px] mt-auto flex flex-col items-center">
        <GameBackground />

        <div className="absolute bottom-[140px] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-[52px] sm:gap-0">
          <div className="sm:hidden">
            <BetControl />
          </div>
          <SpinButton />
        </div>

        <GameForeground />

        <div className="absolute bottom-0 inset-x-0 z-30 flex justify-center">
          <div className="w-full max-w-[427px]">
            <BalanceDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
