import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { TokenIcon } from '@/shared/ui/token-icon';

interface Coin {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotate: number;
  size: 'sm' | 'md' | 'lg';
}

const COIN_COUNT = 18;

const generateCoins = (): Coin[] =>
  Array.from({ length: COIN_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2.5 + Math.random() * 2.5,
    rotate: Math.random() * 720 - 360,
    size: (['sm', 'md', 'lg'] as const)[Math.floor(Math.random() * 3)],
  }));

export const CoinsRain = () => {
  const coins = useMemo<Coin[]>(generateCoins, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {coins.map((coin) => (
        <motion.div
          key={coin.id}
          className="absolute -top-20"
          style={{ left: `${coin.left}%` }}
          initial={{ y: -100, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 1, 1, 0.8],
            rotate: coin.rotate,
          }}
          transition={{
            duration: coin.duration,
            delay: coin.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.1, 0.9, 1],
          }}
        >
          <TokenIcon size={coin.size} />
        </motion.div>
      ))}
    </div>
  );
};
