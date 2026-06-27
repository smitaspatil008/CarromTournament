import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  label: string;
  value: string | number;
  gradient?: string;
  delay?: number;
  sub?: string;
}

export default function StatCard({ icon, label, value, gradient, delay = 0, sub }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(37,99,235,0.2)' }}
      className="surface rounded-2xl p-5 cursor-default"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white"
          style={{ background: gradient ?? 'linear-gradient(135deg,#2563EB,#7C3AED)' }}
        >
          {icon}
        </div>
        {sub && <span className="text-xs text-green-500 font-medium bg-green-500/10 px-2 py-0.5 rounded-full">{sub}</span>}
      </div>
      <div className="font-display font-bold text-3xl" style={{ color: 'var(--color-text)' }}>{value}</div>
      <div className="text-sm text-muted mt-0.5">{label}</div>
    </motion.div>
  );
}
