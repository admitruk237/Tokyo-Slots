import { AnimatePresence, motion } from 'framer-motion';
import { useIntroStore } from '../model/introStore';
import { CoinsRain } from './CoinsRain';
import { CityRise } from './CityRise';
import { CloudPuff } from './CloudPuff';
import { IntroTitle } from './IntroTitle';
import { GameButton } from '@/shared/ui/game-button';
import { INTRO_LABELS } from '../model/constants';

export const Intro = () => {
  const isIntroVisible = useIntroStore((state) => state.isIntroVisible);
  const hideIntro = useIntroStore((state) => state.hideIntro);

  return (
    <AnimatePresence>
      {isIntroVisible && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden bg-linear-to-b from-bg-idle-from to-bg-idle-to"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <CoinsRain />
          <IntroTitle />
          <CityRise />
          <CloudPuff />

          <motion.div
            className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-40"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 2.2, type: 'spring', bounce: 0.4 }}
          >
            <GameButton
              onClick={hideIntro}
              pulse
              className="w-[250px] h-[151px] sm:w-[320px] sm:h-[193px]"
              buttonClassName="scale-100 sm:scale-[1.28]"
              textClassName="text-[40px]"
            >
              {INTRO_LABELS.PLAY}
            </GameButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
