import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Upload, Image, Trash2, Share2, Loader2 } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ShareButton from '../components/ui/ShareButton';
import { useTournamentStore } from '../store/tournamentStore';
import { uploadImage } from '../utils/firebaseStorage';
import toast from 'react-hot-toast';

const CATEGORIES = ['all', 'match', 'celebration', 'team', 'player'] as const;

export default function Gallery() {
  const { gallery, addPhoto, deletePhoto, isAdmin } = useTournamentStore();
  const [cat, setCat] = useState<typeof CATEGORIES[number]>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const photoId = searchParams.get('photo');
    if (photoId && gallery.some((g) => g.id === photoId)) {
      setSelected(photoId);
      searchParams.delete('photo');
      setSearchParams(searchParams, { replace: true });
    }
  }, [gallery]);

  const filtered = cat === 'all' ? gallery : gallery.filter((g) => g.category === cat);
  const selectedItem = gallery.find((g) => g.id === selected);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadCaption, setUploadCaption] = useState('');
  const [uploadCategory, setUploadCategory] = useState<'match' | 'celebration' | 'team' | 'player'>('match');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file'); return; }
    setUploadFile(file);
    setUploadPreview(URL.createObjectURL(file));
    setUploadModal(true);
  };

  const handleUpload = async () => {
    if (!uploadFile) return;
    setUploading(true);
    try {
      const url = await uploadImage(uploadFile, 'photos');
      addPhoto({
        photo: url,
        caption: uploadCaption || 'Tournament moment',
        category: uploadCategory,
        uploadedAt: new Date().toISOString(),
      });
      toast.success('Photo uploaded to Firebase!');
      setUploadModal(false);
      setUploadFile(null);
      setUploadPreview(null);
      setUploadCaption('');
    } catch (err: any) {
      toast.error(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Camera className="w-7 h-7 text-blue-600" />
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-blue-600 font-extrabold">Gallery</h1>
          </div>
          <p className="text-gray-500 text-sm">{gallery.length} photos from Josh Tournament 2026</p>
        </div>
        {isAdmin && (
          <>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
            <button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-semibold">
              <Upload className="w-4 h-4" /> Upload Photo
            </button>
          </>
        )}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              cat === c
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}>
            {c === 'all' ? `All (${gallery.length})` : c}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
        {filtered.map((item, i) => (
          <motion.div key={item.id}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(item.id)}
            className="break-inside-avoid cursor-pointer group relative rounded-xl overflow-hidden"
          >
            <img src={item.photo} alt={item.caption} loading="lazy" className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
              <div className="p-3 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-xs font-medium">{item.caption}</p>
                <p className="text-white/60 text-[10px] mt-0.5 capitalize">{item.category}</p>
              </div>
            </div>
            {isAdmin && (
              <button onClick={(e) => { e.stopPropagation(); deletePhoto(item.id); toast.success('Photo deleted'); }}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <Image className="w-12 h-12 mx-auto mb-3 text-gray-500 opacity-40" />
          <p className="text-gray-500">No photos in this category</p>
        </div>
      )}

      {/* Upload Modal */}
      <AnimatePresence>
        {uploadModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { if (!uploading) { setUploadModal(false); setUploadFile(null); setUploadPreview(null); } }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.7)' }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
              <h3 className="font-bold text-lg mb-4">Upload Photo</h3>
              {uploadPreview && (
                <img src={uploadPreview} alt="Preview" className="w-full max-h-48 object-cover rounded-xl mb-4" />
              )}
              <input type="text" placeholder="Caption (optional)" value={uploadCaption}
                onChange={(e) => setUploadCaption(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 text-sm" />
              <select value={uploadCategory} onChange={(e) => setUploadCategory(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 text-sm">
                <option value="match">Match</option>
                <option value="celebration">Celebration</option>
                <option value="team">Team</option>
                <option value="player">Player</option>
              </select>
              <div className="flex gap-3">
                <button onClick={() => { setUploadModal(false); setUploadFile(null); setUploadPreview(null); }}
                  disabled={uploading}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 disabled:opacity-50">
                  Cancel
                </button>
                <button onClick={handleUpload} disabled={uploading}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : 'Upload'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.9)' }}
          >
            <motion.div
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full rounded-2xl overflow-hidden"
            >
              <img src={selectedItem.photo} alt={selectedItem.caption} loading="lazy" className="w-full" />
              <div className="absolute bottom-0 inset-x-0 p-4" style={{ background: 'linear-gradient(transparent,rgba(0,0,0,0.8))' }}>
                <p className="text-white font-medium">{selectedItem.caption}</p>
                <p className="text-white/60 text-sm capitalize mt-0.5">
                  {selectedItem.category} · {new Date(selectedItem.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <ShareButton
                  title={selectedItem.caption}
                  text={`${selectedItem.caption} — Josh Tournament 2026`}
                  url={`${window.location.origin}/gallery?photo=${selectedItem.id}`}
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/40"
                />
                <button onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
