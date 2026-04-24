import CountUpLib, { type CountUpProps } from 'react-countup';

const CountUpComponent =
  (CountUpLib as unknown as { default: typeof CountUpLib }).default || CountUpLib;

export const CountUp = (props: CountUpProps) => {
  return <CountUpComponent {...props} />;
};
