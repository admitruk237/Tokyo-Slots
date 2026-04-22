import { useGameStore } from '@/entities/game/model/store';
import { cn } from '@/shared/lib/utils';
import balanceIcon from '@/shared/assets/items/Balance.svg';
import { TokenIcon } from '@/shared/ui/TokenIcon/TokenIcon';

export const BalanceDisplay = () => {
  const { balance } = useGameStore();

  const [whole, decimal] = balance.toFixed(2).split('.');

  return (
    <div className="relative z-10 mt-auto flex justify-center">
      <div
        className={cn(
          'relative w-[410px] h-[100px] flex items-center justify-center',
          'before:absolute before:inset-0 before:bg-balance-bg before:clip-balance'
        )}
      >
        <img
          src={balanceIcon}
          alt="Balance"
          className="absolute left-1/2 top-3 -translate-x-1/2 -translate-y-1/2 w-[220px] h-auto z-20"
        />

        <div className="relative z-10 flex items-center gap-4 mt-10">
          <TokenIcon />

          <span className="text-3xl text-white font-poetsen text-title-outline leading-none mt-1">
            {whole}
            <span className="opacity-50">.{decimal}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
