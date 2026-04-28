import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export const StrokeText = ({ children, className }: Props) => {
  return (
    <span
      className={cn(
        'inline-block leading-none uppercase tracking-wider',
        '[-webkit-text-stroke:6px_var(--color-border-dark)] [paint-order:stroke_fill]',
        'text-stroke-shadow',
        className
      )}
    >
      {children}
    </span>
  );
};
