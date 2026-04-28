import { AnimatePresence, motion } from 'framer-motion';
import { useGameActions, useGameStatus } from '@/entities/game';
import { GAME_STATUS } from '@/shared/types/game';
import { useAutoDismiss } from '../model/useAutoDismiss';
import { LosePopup } from './LosePopup';

export const LoseOverlay = () => {
  const status = useGameStatus();
  const { resetStatus } = useGameActions();
  const isLose = status === GAME_STATUS.LOSE;

  useAutoDismiss(GAME_STATUS.LOSE);

  return (
    <AnimatePresence>
      {isLose && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetStatus}
          className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden cursor-pointer pointer-events-auto"
        >
          <div className="absolute inset-0 backdrop-blur-[4px] bg-lose-overlay-bg/80" />

          <LosePopup />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
