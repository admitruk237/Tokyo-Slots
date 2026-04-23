import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/entities/game/model/store';
import { GAME_STATUS } from '@/entities/game/model/types';
import { useAutoDismiss } from '../model/useAutoDismiss';
import { WinPopup } from './WinPopup';

export const WinOverlay = () => {
  const { status, resetStatus } = useGameStore();
  const isWin = status === GAME_STATUS.WIN;

  useAutoDismiss(GAME_STATUS.WIN, 2000);

  return (
    <AnimatePresence>
      {isWin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetStatus}
          className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden cursor-pointer pointer-events-auto"
        >
          <div className="absolute inset-0 backdrop-blur-[4px] bg-win-overlay-bg/80" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-[200vmax] h-[200vmax] bg-win-sunburst"
            />
          </motion.div>

          <WinPopup />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
