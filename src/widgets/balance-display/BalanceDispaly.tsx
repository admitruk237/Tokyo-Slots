import balanceIcon from '@/shared/assets/items/Balance.svg';

export const BalanceDisplay = () => {
  return (
    <div className="relative z-10 mt-auto flex justify-center">
      <div
        className="relative w-[410px] h-[100px] flex items-center justify-center 
                   before:absolute before:inset-0 before:bg-balance-bg before:clip-balance"
      >
        <img
          src={balanceIcon}
          alt="Balance"
          className="absolute left-1/2 top-3 -translate-x-1/2 -translate-y-1/2 w-[220px] h-auto z-20"
        />

        <div className="relative z-10 flex items-center gap-4 mt-10">
          <div className="w-10 h-10 rounded-full bg-balance-circle flex items-center justify-center border-3 border-balance-bg shadow-[0_5px_0_#271613]">
            <span className="text-balance-circle-text font-extrabold text-xl leading-none">T</span>
          </div>

          <span className="text-3xl text-white font-poetsen text-title-outline leading-none mt-1">
            999 999<span className="opacity-50">.99</span>
          </span>
        </div>
      </div>
    </div>
  );
};
