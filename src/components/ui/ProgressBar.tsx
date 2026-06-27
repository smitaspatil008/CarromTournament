import { motion } from 'framer-motion';

interface Props { value: number; label?: string; color?: string; }

export default function ProgressBar({ value, label, color = 'linear-gradient(90deg,#2563EB,#7C3AED)' }: Props) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-muted">{label}</span>
          <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{value}%</span>
        </div>
      )}
      <div className="h-2 rounded-full" style={{ background: 'var(--color-surface-2)' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
