import citySvg from '@/shared/assets/bg/tokiocity.svg';

export const GameBackground = () => {
  return (
    <>
      <img
        src={citySvg}
        alt=""
        className="absolute bottom-[125px] left-0 w-full z-0 pointer-events-none"
      />
    </>
  );
};
