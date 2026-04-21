import { GameBackground } from '@/widgets/game-background/GameBackground';
import { GameForeground } from '@/widgets/game-foreground/GameForeground';
import { GameLogo } from '@/widgets/game-logo/GameLogo';
import { HeaderBlock } from '@/widgets/header-block/HeaderBlock';
import { BalanceDisplay } from '@/widgets/balance-display/BalanceDispaly';
import { SpinButton } from '@/widgets/spin-button/SpinButton';

const App = () => {
  return (
    <div className="relative min-h-screen bg-linear-to-b from-bg-idle-from to-bg-idle-to overflow-hidden flex flex-col items-center">
      <GameBackground />
      <HeaderBlock />
      <GameLogo />
      <div className="flex-1" />
      <div className="relative z-10  mb-16">
        <SpinButton />
      </div>
      <GameForeground />
      <div className="relative z-30 w-full flex flex-col items-center">
        <BalanceDisplay />
      </div>
    </div>
  );
};

export default App;
