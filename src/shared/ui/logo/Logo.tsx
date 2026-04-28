import logoPlate from '@/shared/assets/items/Label.svg';

export const Logo = () => {
  return (
    <div className="relative z-10 mt-[-30px]">
      <img src={logoPlate} className="w-[341px] h-[65px]" alt="label" />
      <h1 className="text-title-outline tracking-[5px] absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 font-poetsen font-bold text-2xl text-win-overlay-bg whitespace-nowrap italic">
        Tokyo Slots
      </h1>
    </div>
  );
};
