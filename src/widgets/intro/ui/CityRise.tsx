import { motion } from 'framer-motion';
import citySvg from '@/shared/assets/bg/tokiocity.svg';

export const CityRise = () => {
  return (
    <motion.img
      src={citySvg}
      alt=""
      className="absolute bottom-[80px] left-0 w-full pointer-events-none z-10"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    />
  );
};
