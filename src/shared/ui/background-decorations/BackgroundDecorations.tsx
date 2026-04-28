import { motion } from 'framer-motion';
import { DECORATIONS } from '@/shared/config/decorations';

/**
 * Renders decorative elements in the background with floating animations.
 */
export const BackgroundDecorations = () => {
  return (
    <div className="absolute inset-x-0 top-0 pointer-events-none overflow-hidden z-0 h-full">
      {DECORATIONS.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: `${item.x}vw`,
            y: `${item.y}vh`,
            rotate: item.rotation,
          }}
          transition={{ duration: 0.8, delay: item.delay }}
          className="absolute"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay,
            }}
            className={item.sizeClass}
          >
            <img
              src={item.src}
              alt=""
              className="w-full h-full object-contain filter drop-shadow-2xl opacity-90"
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
