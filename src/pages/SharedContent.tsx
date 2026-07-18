import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Newspaper } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ShareButton from '../components/ui/ShareButton';
import { useTournamentStore } from '../store/tournamentStore';

const ANNOUNCEMENT_ICONS: Record<string, string> = {
  match: '⚡', winner: '🏆', champion: '🎉', info: '📢',
};

export function SharedPost() {
  const { id } = useParams<{ id: string }>();
  const { updates, players, teams } = useTournamentStore();
  const post = updates.find((u) => u.id === id);

  if (!post) return (
    <Layout>
      <div className="text-center py-20">
        <Newspaper className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="text-gray-500 font-medium">Post not found</p>
        <Link to="/" className="text-blue-600 hover:underline text-sm mt-3 block">← Back to Home</Link>
      </div>
    </Layout>
  );

  const player = players.find((p) => p.id === post.playerId);
  const team = teams.find((t) => t.id === post.teamId);

  return (
    <Layout>
      <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto"
      >
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          {post.image && (
            <div className="aspect-video bg-gray-100 overflow-hidden">
              <img src={post.image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="p-5 sm:p-6">
            <p className="text-base text-gray-800 leading-relaxed whitespace-pre-line">{post.text}</p>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                {player && (
                  <div className="flex items-center gap-2">
                    <img src={player.photo} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-sm text-gray-700 font-medium">{player.name}</span>
                  </div>
                )}
                {team && (
                  <span className="text-xs px-2 py-1 rounded-full font-semibold text-white" style={{ background: team.color }}>
                    {team.logo} {team.name}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <div className="mt-4 flex justify-end">
              <ShareButton
                title="Josh Tournament Update"
                text={post.text}
                url={`${window.location.origin}/post/${post.id}`}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

export function SharedAnnouncement() {
  const { id } = useParams<{ id: string }>();
  const { announcements } = useTournamentStore();
  const announcement = announcements.find((a) => a.id === id);

  if (!announcement) return (
    <Layout>
      <div className="text-center py-20">
        <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="text-gray-500 font-medium">Announcement not found</p>
        <Link to="/" className="text-blue-600 hover:underline text-sm mt-3 block">← Back to Home</Link>
      </div>
    </Layout>
  );

  const typeColors: Record<string, string> = {
    champion: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    winner: 'bg-green-50 border-green-200 text-green-700',
    match: 'bg-blue-50 border-blue-200 text-blue-700',
    info: 'bg-gray-50 border-gray-200 text-gray-700',
  };

  return (
    <Layout>
      <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto"
      >
        <div className={`rounded-2xl border p-6 sm:p-8 ${typeColors[announcement.type] ?? typeColors.info}`}>
          <div className="flex items-start gap-4">
            <span className="text-3xl flex-shrink-0">{ANNOUNCEMENT_ICONS[announcement.type]}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full border capitalize bg-white/60">
                  {announcement.type}
                </span>
              </div>
              <h1 className="text-xl font-bold mb-3">{announcement.title}</h1>
              <p className="text-base leading-relaxed opacity-80">{announcement.body}</p>
              <p className="text-xs opacity-50 mt-4">
                {new Date(announcement.createdAt).toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <ShareButton
              title={announcement.title}
              text={`${announcement.title} — ${announcement.body}`}
              url={`${window.location.origin}/announcement/${announcement.id}`}
            />
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
