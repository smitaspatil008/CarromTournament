import { Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  title: string;
  text?: string;
  url?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export default function ShareButton({ title, text, url, className = '', size = 'md' }: Props) {
  const shareUrl = url ?? window.location.href;

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({ title, text: text ?? title, url: shareUrl });
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      } catch {
        toast.error('Could not copy link');
      }
    }
  };

  const sizeClasses = size === 'sm'
    ? 'w-8 h-8 text-xs'
    : 'px-3 py-2 text-sm gap-1.5';

  return (
    <button
      onClick={handleShare}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-colors
        bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 ${sizeClasses} ${className}`}
    >
      <Share2 className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      {size !== 'sm' && <span>Share</span>}
    </button>
  );
}
