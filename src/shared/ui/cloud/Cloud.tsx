import cloudSvg from '@/shared/assets/bg/cloud.svg';
import cloudMobileSvg from '@/shared/assets/bg/cloud-mobile.svg';

export const Cloud = () => (
  <picture>
    <source media="(max-width: 450px)" srcSet={cloudMobileSvg} />
    <img
      src={cloudSvg}
      alt=""
      className="absolute bottom-0 left-1/2 -translate-x-1/2 min-w-full h-full object-cover object-top"
    />
  </picture>
);
