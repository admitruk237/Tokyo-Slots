import { type RefObject, useEffect, useRef } from 'react';
import { type CountUpProps, useCountUp } from 'react-countup';

export const CountUp = (props: CountUpProps) => {
  const countUpRef = useRef<HTMLElement>(null);

  const { update } = useCountUp({
    ref: countUpRef as unknown as RefObject<HTMLElement>,
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
