import { cn } from '@/shared/lib/utils';

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-10 h-10 text-xl',
  lg: 'w-12 h-12 text-2xl',
};

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TokenIcon = ({ className, size = 'md' }: Props) => {
  return (
    <div
      className={cn(
        'rounded-full bg-balance-circle flex items-center justify-center border-3 border-balance-bg shadow-[0_5px_0_var(--color-border-dark-shadow)] select-none shrink-0',
        sizeClasses[size],
        className
      )}
    >
      <span className="text-balance-circle-text font-extrabold leading-none">T</span>
    </div>
  );
};
