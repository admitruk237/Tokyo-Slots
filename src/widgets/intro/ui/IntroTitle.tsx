import { motion } from 'framer-motion';

export const IntroTitle = () => {
  return (
    <motion.div
      className="absolute top-[12%] left-1/2 -translate-x-1/2 z-30"
      initial={{ scale: 0, opacity: 0, y: -40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, type: 'spring', bounce: 0.5 }}
    >
      <h1 className="text-title-outline tracking-[5px] font-poetsen font-bold text-5xl sm:text-7xl text-win-overlay-bg whitespace-nowrap italic">
        Tokyo Slots
      </h1>
    </motion.div>
  );
};
