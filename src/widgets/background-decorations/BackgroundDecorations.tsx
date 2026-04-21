import { motion } from 'framer-motion';

import leaf1 from '@/shared/assets/decor/dsa.svg';
import leaf2 from '@/shared/assets/decor/eew.svg';
import leaf3 from '@/shared/assets/decor/sdsssd.svg';
import leaf4 from '@/shared/assets/decor/seven.svg';
import symbol1 from '@/shared/assets/decor/cheryslot.svg';
import symbol2 from '@/shared/assets/decor/lemonslot.svg';
import symbol3 from '@/shared/assets/decor/Crownslot.svg';
import symbol4 from '@/shared/assets/decor/crystallslot.svg';

const DECORATIONS = [
  { id: 1, src: leaf1, x: 5, y: 30, size: 70, rotation: 15, delay: 0 },
  { id: 2, src: symbol1, x: 15, y: 45, size: 60, rotation: -10, delay: 0.5 },
  { id: 3, src: leaf2, x: 8, y: 65, size: 80, rotation: 20, delay: 1 },
  { id: 4, src: symbol2, x: 20, y: 80, size: 65, rotation: -15, delay: 1.5 },
  { id: 5, src: leaf3, x: 12, y: 20, size: 55, rotation: 5, delay: 2 },
  { id: 6, src: symbol3, x: 85, y: 35, size: 75, rotation: -20, delay: 0.2 },
  { id: 7, src: leaf4, x: 92, y: 50, size: 85, rotation: 10, delay: 0.7 },
  { id: 8, src: symbol4, x: 80, y: 70, size: 65, rotation: -5, delay: 1.2 },
  { id: 9, src: leaf1, x: 88, y: 85, size: 70, rotation: 25, delay: 1.7 },
  { id: 10, src: symbol1, x: 78, y: 25, size: 60, rotation: -12, delay: 2.2 },
];

export function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
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
            style={{ width: item.size, height: item.size }}
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
}
