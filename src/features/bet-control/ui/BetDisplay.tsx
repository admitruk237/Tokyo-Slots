import { AnimatePresence, motion } from 'framer-motion';
import { TokenIcon } from '@/shared/ui/token-icon';
import { cn } from '@/shared/lib/utils';
import { useBetInput } from '../model/useBetInput';

export const BetDisplay = () => {
  const { inputValue, error, handleInputChange, handleBlur, isSpinning } = useBetInput();

  return (
    <div className="relative mx-[8px]">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -75, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-[60]"
          >
            <div className="relative">
              <div className="bg-white px-6 py-2 rounded-full shadow-lg border-2 border-border-dark relative z-10 whitespace-nowrap">
                <span className="text-accent-red font-poetsen text-sm font-bold">{error}</span>
              </div>
              <div className="absolute -top-3 left-2 w-8 h-8 bg-white border-t-2 border-l-2 border-border-dark rounded-full z-0" />
              <div className="absolute -top-5 left-8 w-11 h-11 bg-white border-t-2 border-border-dark rounded-full z-0" />
              <div className="absolute -top-3 right-4 w-9 h-9 bg-white border-t-2 border-r-2 border-border-dark rounded-full z-0" />
              <div className="absolute bottom-0 -left-1 w-6 h-6 bg-white border-b-2 border-l-2 border-border-dark rounded-full z-0" />
              <div className="absolute bottom-0 -right-1 w-7 h-7 bg-white border-b-2 border-r-2 border-border-dark rounded-full z-0" />

              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-border-dark rotate-45 z-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(
          'flex items-center justify-center bg-bet-input-bg w-[200px] h-[55px] rounded-[16px] px-[17px] border-[2px] border-border-dark',
          'shadow-[0_-4px_0px_var(--color-border-dark)] transition-all',
          isSpinning && 'opacity-80 pointer-events-none'
        )}
      >
        <TokenIcon
          size="sm"
          className="mr-4 shadow-[0_2px_0_var(--color-border-dark-shadow)] border-[2px]"
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          disabled={isSpinning}
          className="bg-transparent font-poetsen text-white text-[20px] w-full focus:outline-none placeholder:text-white/50"
          placeholder="0.00"
        />
      </div>
    </div>
  );
};
