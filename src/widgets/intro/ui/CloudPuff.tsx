import { motion } from 'framer-motion';
import cloudSvg from '@/shared/assets/bg/cloud.svg';
import cloudMobileSvg from '@/shared/assets/bg/cloud-mobile.svg';

export const CloudPuff = () => {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 z-20 pointer-events-none overflow-hidden h-[250px]"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <picture>
        <source media="(max-width: 450px)" srcSet={cloudMobileSvg} />
        <img
          src={cloudSvg}
          alt=""
          className="absolute bottom-0 left-1/2 -translate-x-1/2 min-w-full h-full object-cover object-top"
        />
      </picture>
    </motion.div>
  );
};
