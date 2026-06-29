import { motion, AnimatePresence } from 'framer-motion';

interface Props { score: number; color?: string; size?: 'sm' | 'md' | 'lg' | 'xl'; }

const sizeMap = { sm: 'text-xl', md: 'text-2xl sm:text-3xl', lg: 'text-5xl', xl: 'text-5xl sm:text-7xl' };

export default function AnimatedScore({ score, color = '#f8fafc', size = 'lg' }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={score}
        initial={{ rotateX: -90, opacity: 0, scale: 0.8 }}
        animate={{ rotateX: 0, opacity: 1, scale: 1 }}
        exit={{ rotateX: 90, opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`font-display font-bold tabular-nums ${sizeMap[size]}`}
        style={{ color, display: 'inline-block', perspective: '400px' }}
      >
        {score}
      </motion.span>
    </AnimatePresence>
  );
}
