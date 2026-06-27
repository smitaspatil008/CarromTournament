import { Link } from 'react-router-dom';
import { Trophy, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t mt-auto" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)' }}>
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-base gradient-text">Josh — Carrom & Sequence</div>
                <div className="text-xs text-muted">Play. Compete. Celebrate.</div>
              </div>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-sm">
              The official tournament management platform for JOSH organization. Track live scores, brackets, and leaderboards in real time.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text)' }}>Quick Links</h4>
            <ul className="space-y-2">
              {[['Home','/'],[' Live Matches','/live'],['Carrom','/carrom'],['Sequence','/sequence'],['Leaderboard','/leaderboard']].map(([l,p]) => (
                <li key={p}><Link to={p} className="text-sm text-muted hover:text-brand-blue transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3" style={{ color: 'var(--color-text)' }}>Tournament</h4>
            <ul className="space-y-2">
              {[['Schedule','/schedule'],['Gallery','/gallery'],['History','/history'],['Teams','/teams'],['Players','/players']].map(([l,p]) => (
                <li key={p}><Link to={p} className="text-sm text-muted hover:text-brand-blue transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-sm text-muted">© {new Date().getFullYear()} JOSH Organizing Committee. All rights reserved.</p>
          <div className="flex items-center gap-1 text-sm text-muted">
            <Zap className="w-3 h-3 text-brand-orange" />
            <span>Powered by JOSH Arena</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
