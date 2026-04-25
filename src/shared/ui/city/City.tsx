import citySvg from '@/shared/assets/bg/tokiocity.svg';

interface Props {
  className?: string;
}

export const City = ({ className }: Props) => (
  <img
    src={citySvg}
    alt=""
    className={className ?? 'absolute bottom-[125px] left-0 w-full z-0 pointer-events-none'}
  />
);
