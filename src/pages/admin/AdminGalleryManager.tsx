import { useState, useCallback, useEffect, type FormEvent } from 'react';
import { Upload, Trash2, Eye, EyeOff, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Modal } from '@/components/Modal';
import { ToastContainer, useToast } from '@/components/Toast';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { Field, inputClass } from '@/components/form/Field';
import { fetchAllImages, uploadImage, updateImage, deleteImage } from '@/lib/api';
import type { SiteImage, ImageCategory } from '@/types';

const GALLERY_CATEGORIES: { label: string; value: ImageCategory }[] = [
  { label: 'Gallery', value: 'gallery' },
  { label: 'Campus', value: 'campus' },
  { label: 'Events', value: 'event' },
  { label: 'About', value: 'about' },
];

export function AdminGalleryManager() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<SiteImage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SiteImage | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [form, setForm] = useState({ title: '', display_order: 0, is_active: true, category: 'gallery' as ImageCategory });
  const { toasts, show, dismiss } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchAllImages();
      const galleryImages = data.filter((i) => i.category !== 'hero');
      setImages(galleryImages);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openUpload = () => {
    setSelectedFiles([]);
    setPreviews([]);
    setForm({ title: '', display_order: images.length, is_active: true, category: 'gallery' });
    setUploadModalOpen(true);
  };

  const openEdit = (img: SiteImage) => {
    setEditTarget(img);
    setForm({
      title: img.title ?? '',
      display_order: img.display_order,
      is_active: img.is_active,
      category: img.category,
    });
    setUploadModalOpen(false);
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setSelectedFiles(files);
    setPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      show('error', 'Please select at least one image.');
      return;
    }
    setUploading(true);
    let successCount = 0;
    let failCount = 0;
    for (let i = 0; i < selectedFiles.length; i++) {
      try {
        const newImg = await uploadImage(selectedFiles[i], form.category, 'gallery', {
          title: form.title || undefined,
          display_order: form.display_order + i,
          is_active: form.is_active,
        });
        setImages((prev) => [...prev, newImg]);
        successCount++;
      } catch {
        failCount++;
      }
    }
    setUploading(false);
    setUploadModalOpen(false);
    setSelectedFiles([]);
    setPreviews([]);
    if (successCount > 0) show('success', `${successCount} image(s) uploaded successfully.`);
    if (failCount > 0) show('error', `${failCount} image(s) failed to upload.`);
  };

  const handleEditSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!editTarget) return;
    try {
      const updated = await updateImage(editTarget.id, {
        title: form.title || null,
        display_order: form.display_order,
        is_active: form.is_active,
        category: form.category,
      });
      setImages((prev) => prev.map((i) => (i.id === editTarget.id ? updated : i)));
      show('success', 'Image updated successfully.');
      setEditTarget(null);
    } catch (err) {
      show('error', `Update failed: ${(err as Error).message}`);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteImage(deleteTarget);
      setImages((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      show('success', 'Image deleted successfully.');
      setDeleteTarget(null);
    } catch (err) {
      show('error', `Delete failed: ${(err as Error).message}`);
    }
  };

  const toggleActive = async (img: SiteImage) => {
    try {
      const updated = await updateImage(img.id, { is_active: !img.is_active });
      setImages((prev) => prev.map((i) => (i.id === img.id ? updated : i)));
      show('success', `Image ${!img.is_active ? 'enabled' : 'disabled'}.`);
    } catch (err) {
      show('error', `Update failed: ${(err as Error).message}`);
    }
  };

  return (
    <AdminLayout title="Gallery Management">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p className="text-navy-600 text-sm">Upload and manage gallery images.</p>
        <button
          onClick={openUpload}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-800 hover:bg-navy-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-md"
        >
          <Upload className="w-4 h-4" />
          Upload Images
        </button>
      </div>

      {loading ? (
        <LoadingState message="Loading gallery images..." />
      ) : error ? (
        <ErrorState message="Failed to load gallery images." onRetry={load} />
      ) : images.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-cream-200 text-center">
          <ImageIcon className="w-12 h-12 text-navy-300 mx-auto mb-3" />
          <p className="text-navy-500 font-medium">No gallery images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="bg-white rounded-xl border border-cream-200 overflow-hidden shadow-sm">
              <div className="aspect-square bg-cream-100 relative">
                <img src={img.image_url} alt={img.title || 'Gallery'} className="w-full h-full object-cover" />
                {!img.is_active && (
                  <div className="absolute inset-0 bg-navy-950/60 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold bg-maroon-600 px-2 py-1 rounded-full">Disabled</span>
                  </div>
                )}
                <span className="absolute top-2 left-2 text-xs font-semibold text-white bg-navy-800/80 px-2 py-0.5 rounded-full capitalize">
                  {img.category}
                </span>
              </div>
              <div className="p-3">
                <p className="font-semibold text-navy-900 text-sm truncate mb-2">{img.title || 'Untitled'}</p>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => openEdit(img)} className="flex-1 text-xs font-semibold py-1.5 px-2 bg-navy-50 text-navy-700 rounded-lg hover:bg-navy-100 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => toggleActive(img)} className="p-1.5 rounded-lg bg-cream-100 hover:bg-cream-200 text-navy-600 transition-colors" aria-label={img.is_active ? 'Disable' : 'Enable'}>
                    {img.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => setDeleteTarget(img)} className="p-1.5 rounded-lg bg-maroon-50 hover:bg-maroon-100 text-maroon-600 transition-colors" aria-label="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} title="Upload Gallery Images">
        <form onSubmit={handleUpload} className="space-y-4">
          <Field label="Select Images" hint="You can select multiple images at once.">
            <input type="file" accept="image/*" multiple onChange={handleFilesChange} className={inputClass} required />
          </Field>
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {previews.map((url, i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-cream-100 relative">
                  <img src={url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFiles((prev) => prev.filter((_, idx) => idx !== i));
                      setPreviews((prev) => prev.filter((_, idx) => idx !== i));
                    }}
                    className="absolute top-1 right-1 w-6 h-6 rounded-full bg-maroon-600 text-white flex items-center justify-center hover:bg-maroon-700"
                    aria-label="Remove"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ImageCategory })} className={inputClass}>
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Title (applied to all)">
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="Optional title" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Display Order (start)">
              <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className={inputClass} min={0} />
            </Field>
            <Field label="Active">
              <label className="flex items-center gap-2 py-2.5">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-5 h-5 rounded text-navy-800 focus:ring-gold-400" />
                <span className="text-sm text-navy-700">Show in gallery</span>
              </label>
            </Field>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setUploadModalOpen(false)} className="flex-1 py-2.5 text-sm font-semibold text-navy-600 bg-cream-100 hover:bg-cream-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={uploading} className="flex-1 py-2.5 text-sm font-semibold text-white bg-navy-800 hover:bg-navy-700 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2">
              {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : `Upload ${selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}`}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editTarget} onClose={() => setEditTarget(null)} title="Edit Gallery Image">
        <form onSubmit={handleEditSave} className="space-y-4">
          {editTarget && (
            <div className="aspect-video rounded-lg overflow-hidden bg-cream-100 border border-cream-200">
              <img src={editTarget.image_url} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <Field label="Title">
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ImageCategory })} className={inputClass}>
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Display Order">
              <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className={inputClass} min={0} />
            </Field>
            <Field label="Active">
              <label className="flex items-center gap-2 py-2.5">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-5 h-5 rounded text-navy-800 focus:ring-gold-400" />
                <span className="text-sm text-navy-700">Show in gallery</span>
              </label>
            </Field>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setEditTarget(null)} className="flex-1 py-2.5 text-sm font-semibold text-navy-600 bg-cream-100 hover:bg-cream-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 py-2.5 text-sm font-semibold text-white bg-navy-800 hover:bg-navy-700 rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirm Deletion" size="sm">
        <p className="text-sm text-navy-700 mb-4">Are you sure you want to delete this image? This action cannot be undone.</p>
        {deleteTarget && (
          <div className="aspect-square rounded-lg overflow-hidden mb-4 border border-cream-200 max-w-[200px] mx-auto">
            <img src={deleteTarget.image_url} alt="To delete" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex gap-3">
          <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 text-sm font-semibold text-navy-600 bg-cream-100 hover:bg-cream-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleDelete} className="flex-1 py-2.5 text-sm font-semibold text-white bg-maroon-600 hover:bg-maroon-700 rounded-lg transition-colors">
            Delete
          </button>
        </div>
      </Modal>

      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </AdminLayout>
  );
}
