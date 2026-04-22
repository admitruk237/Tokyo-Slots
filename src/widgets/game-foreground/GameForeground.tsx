import cloudSvg from '@/shared/assets/bg/cloud.svg';

export const GameForeground = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none overflow-hidden h-[250px]">
      <img
        src={cloudSvg}
        alt=""
        className="absolute bottom-0 left-0 w-full object-cover object-top opacity-100"
      />
    </div>
  );
};
