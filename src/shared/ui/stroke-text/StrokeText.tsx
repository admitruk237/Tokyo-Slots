import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const StrokeText = ({ children, className = '' }: Props) => {
  return (
    <span
      className={cn(
        'inline-block leading-none uppercase tracking-wider',
        '[-webkit-text-stroke:6px_var(--color-border-dark)] [paint-order:stroke_fill]',
        'drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]',
        className
      )}
    >
      {children}
    </span>
  );
};
