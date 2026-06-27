import { motion } from 'framer-motion';
import { useCountdown } from '../../hooks/useCountdown';

interface Props { targetDate: string; label?: string; }

function Block({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center font-display font-bold text-2xl sm:text-3xl text-white"
        style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)', boxShadow: '0 4px 20px rgba(37,99,235,0.4)' }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="text-xs text-muted mt-1">{label}</span>
    </div>
  );
}

export default function CountdownTimer({ targetDate, label }: Props) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  return (
    <div className="flex flex-col items-center gap-3">
      {label && <p className="text-sm font-medium text-muted">{label}</p>}
      <div className="flex items-end gap-3">
        <Block value={days} label="Days" />
        <span className="text-2xl font-bold text-brand-purple mb-3">:</span>
        <Block value={hours} label="Hrs" />
        <span className="text-2xl font-bold text-brand-purple mb-3">:</span>
        <Block value={minutes} label="Min" />
        <span className="text-2xl font-bold text-brand-purple mb-3">:</span>
        <Block value={seconds} label="Sec" />
      </div>
    </div>
  );
}
