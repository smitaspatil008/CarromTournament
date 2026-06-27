import { motion } from 'framer-motion';
import { Trophy, Star, Crown } from 'lucide-react';
import type { Team } from '../../types';

interface Props {
  champion?: Team;
  runnerUp?: Team;
  year?: number;
  showConfetti?: boolean;
}

export default function TrophySection({ champion, runnerUp, year = 2026, showConfetti }: Props) {
  return (
    <div className="relative text-center py-12 overflow-hidden rounded-3xl"
      style={{ background: 'linear-gradient(135deg,rgba(37,99,235,0.08),rgba(124,58,237,0.12),rgba(249,115,22,0.08))' }}>
      {/* Background particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full opacity-30 particle"
          style={{
            background: i % 3 === 0 ? '#2563EB' : i % 3 === 1 ? '#7C3AED' : '#F97316',
            left: `${(i * 8.5) % 100}%`,
            top: `${(i * 13) % 80 + 10}%`,
            '--dur': `${3 + (i % 3)}s`,
            '--delay': `${i * 0.3}s`,
          } as React.CSSProperties}
        />
      ))}

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative inline-block mb-4"
      >
        <div className="relative">
          <Trophy className="w-24 h-24 mx-auto text-yellow-500" strokeWidth={1.5} />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle,rgba(234,179,8,0.3),transparent)', filter: 'blur(8px)' }}
          />
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
              className="absolute"
              style={{
                top: `${50 + 45 * Math.sin((i / 6) * Math.PI * 2)}%`,
                left: `${50 + 45 * Math.cos((i / 6) * Math.PI * 2)}%`,
              }}
            >
              <Star className="w-3 h-3 text-yellow-400" fill="#fbbf24" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display font-bold text-3xl gradient-text mb-1"
      >
        JOSH Tournament {year}
      </motion.h2>
      <p className="text-muted text-sm mb-6">Play. Compete. Celebrate.</p>

      {champion ? (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Champion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <Crown className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-display font-bold text-2xl champion-glow"
                style={{ background: champion.color }}>
                {champion.logo}
              </div>
            </div>
            <div className="mt-2 font-bold" style={{ color: 'var(--color-text)' }}>{champion.name}</div>
            <div className="text-xs text-yellow-500 font-semibold">🏆 Champion</div>
          </motion.div>

          {runnerUp && (
            <>
              <div className="text-muted text-sm hidden sm:block">vs</div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-display font-bold text-xl opacity-80"
                  style={{ background: runnerUp.color }}>
                  {runnerUp.logo}
                </div>
                <div className="mt-2 font-semibold text-sm" style={{ color: 'var(--color-text)' }}>{runnerUp.name}</div>
                <div className="text-xs text-muted">🥈 Runner-up</div>
              </motion.div>
            </>
          )}
        </div>
      ) : (
        <div className="text-muted text-sm">Tournament in progress — champion to be crowned soon!</div>
      )}
    </div>
  );
}
