import { db, ref, set as fbSet, get } from '../lib/firebase';

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1200;
const QUALITY = 0.7;

function resizeAndCompress(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', QUALITY);
      resolve(dataUrl);
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

export async function uploadImage(file: File, folder = 'photos'): Promise<string> {
  const dataUrl = await resizeAndCompress(file);
  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const imageRef = ref(db, `images/${folder}/${id}`);
  await fbSet(imageRef, {
    data: dataUrl,
    name: file.name,
    uploadedAt: new Date().toISOString(),
  });
  return dataUrl;
}

export async function listImages(folder = 'photos'): Promise<{ name: string; url: string; id: string }[]> {
  const snapshot = await get(ref(db, `images/${folder}`));
  if (!snapshot.exists()) return [];
  const data = snapshot.val() as Record<string, { data: string; name: string }>;
  return Object.entries(data).map(([id, item]) => ({
    id,
    name: item.name,
    url: item.data,
  }));
}

export async function deleteImage(folder: string, id: string): Promise<void> {
  await fbSet(ref(db, `images/${folder}/${id}`), null);
}
