import { AnimatePresence, motion } from 'framer-motion';
import { GAME_STATUS, useGameActions, useGameStatus } from '@/entities/game';
import { useAutoDismiss } from '../model/useAutoDismiss';
import { WinPopup } from './WinPopup';

export const WinOverlay = () => {
  const status = useGameStatus();
  const { resetStatus } = useGameActions();
  const isWin = status === GAME_STATUS.WIN;

  useAutoDismiss(GAME_STATUS.WIN);

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
              className="w-[300vmax] h-[300vmax] bg-win-sunburst flex-shrink-0"
            />
          </motion.div>
          <WinPopup />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
