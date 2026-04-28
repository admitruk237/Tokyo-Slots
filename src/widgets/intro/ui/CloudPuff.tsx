import { motion } from 'framer-motion';
import { Cloud } from '@/shared/ui/cloud';

export const CloudPuff = () => {
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 z-20 pointer-events-none overflow-hidden h-[250px]"
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 2.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <Cloud />
    </motion.div>
  );
};
