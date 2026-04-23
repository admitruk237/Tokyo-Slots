import cloudSvg from '@shared/assets/bg/cloud.svg';
import cloudMobileSvg from '@shared/assets/bg/cloud-mobile.svg';

export const GameForeground = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none overflow-hidden h-[250px]">
      <picture>
        <source media="(max-width: 450px)" srcSet={cloudMobileSvg} />
        <img
          src={cloudSvg}
          alt=""
          className="absolute bottom-0 left-1/2 -translate-x-1/2 min-w-full h-full object-cover object-top opacity-100"
        />
      </picture>
    </div>
  );
};
