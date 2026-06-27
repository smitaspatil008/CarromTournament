import { motion } from 'framer-motion';

interface Props { className?: string; size?: 'sm' | 'md'; }

export default function LiveBadge({ className = '', size = 'md' }: Props) {
  return (
    <span className={`live-badge ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : ''} ${className}`}>
      <motion.span
        className="w-1.5 h-1.5 bg-white rounded-full"
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      LIVE
    </span>
  );
}
