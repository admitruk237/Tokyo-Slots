import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const SquareButton = ({ children, onClick, disabled = false, className = '' }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative w-[63px] h-[59px] rounded-[16px] border-[2px] border-border-dark',
        'bg-white shadow-[0_4px_0_rgba(81,88,149,1)]',
        'flex items-center justify-center cursor-pointer z-5',
        'transition-all duration-[120ms] ease-in-out',
        '[backface-visibility:hidden] [-webkit-tap-highlight-color:transparent]',
        'max-sm:w-[48px] max-sm:h-[48px]',
        'active:translate-y-[4px]',
        'active:shadow-none',
        'disabled:bg-btn-disabled disabled:pointer-events-none',
        className
      )}
    >
      <div className="font-poetsen text-[25px] font-normal text-border-dark">{children}</div>
    </button>
  );
};
