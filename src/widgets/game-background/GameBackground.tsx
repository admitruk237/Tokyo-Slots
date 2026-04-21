import citySvg from '@/shared/assets/bg/tokiocity.svg';
import { BackgroundDecorations } from '../background-decorations/BackgroundDecorations';

export const GameBackground = () => {
  return (
    <>
      <BackgroundDecorations />

      <img src={citySvg} alt="" className="absolute left-0 w-full" style={{ bottom: '125.34px' }} />
    </>
  );
};
