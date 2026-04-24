import { useEffect, useRef } from 'react';
import { type CountUpProps, useCountUp } from 'react-countup';

export const CountUp = (props: CountUpProps) => {
  const countUpRef = useRef<HTMLElement>(null);

  const { update } = useCountUp({
    // Cast to any due to RefObject<T | null> mismatch in react-countup types with React 19.
    // Tried multiple options (like unknown casting), but only 'any' prevents build failure here.
    ref: countUpRef as any,
    start: props.start,
    end: props.end,
    duration: props.duration,
    decimals: props.decimals,
    separator: props.separator ?? '',
    useGrouping: false,
    decimal: props.decimal,
    prefix: props.prefix,
    suffix: props.suffix,
    onEnd: props.onEnd,
    onStart: props.onStart,
  });

  useEffect(() => {
    update(props.end ?? 0);
  }, [props.end, update]);

  return <span ref={countUpRef} className={props.className} style={props.style} />;
};

export type { CountUpProps };
