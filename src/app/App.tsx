import { GameBackground } from '@/shared/ui/game-background';
import { GameForeground } from '@/shared/ui/game-foreground';
import { Header } from '@/shared/ui/header';

import { BetControl } from '@/features/bet-control';
import { SpinButton } from '@/features/spin';
import { BalanceDisplay } from '@/entities/game';

import { BackgroundDecorations } from '@/shared/ui/background-decorations';

import { LoseOverlay, WinOverlay } from '@/features/outcome-popups';
import { Logo } from '@/shared/ui/logo';
import { SlotMachine } from '@/widgets/slot-machine/ui/slot-machine';

const App = () => {
  return (
    <div className="relative min-h-screen bg-linear-to-b from-bg-idle-from to-bg-idle-to flex flex-col items-center">
      <WinOverlay />
      <LoseOverlay />
      <BackgroundDecorations />
      <Header />
      <Logo />

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
