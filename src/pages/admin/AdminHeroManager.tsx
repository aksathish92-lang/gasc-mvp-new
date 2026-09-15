import { useState, useCallback, useEffect, type FormEvent } from 'react';
import { Upload, Trash2, Eye, EyeOff, Loader2, Image as ImageIcon } from 'lucide-react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Modal } from '@/components/Modal';
import { ToastContainer, useToast } from '@/components/Toast';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { Field, inputClass } from '@/components/form/Field';
import { fetchAllImages, uploadImage, updateImage, deleteImage } from '@/lib/api';
import type { SiteImage } from '@/types';

export function AdminHeroManager() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editTarget, setEditTarget] = useState<SiteImage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SiteImage | null>(null);
  const [form, setForm] = useState({ title: '', caption: '', display_order: 0, is_active: true });
  const { toasts, show, dismiss } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchAllImages('hero');
      setImages(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditTarget(null);
    setSelectedFile(null);
    setPreviewUrl(null);
    setForm({ title: '', caption: '', display_order: images.length, is_active: true });
    setModalOpen(true);
  };

  const openEdit = (img: SiteImage) => {
    setEditTarget(img);
    setSelectedFile(null);
    setPreviewUrl(img.image_url);
    setForm({
      title: img.title ?? '',
      caption: img.caption ?? '',
      display_order: img.display_order,
      is_active: img.is_active,
    });
    setModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editTarget && !selectedFile) {
      show('error', 'Please select an image to upload.');
      return;
    }
    setUploading(true);
    try {
      if (editTarget) {
        if (selectedFile) {
          await deleteImage(editTarget);
          const newImg = await uploadImage(selectedFile, 'hero', 'hero', form);
          setImages((prev) => prev.map((i) => (i.id === editTarget.id ? newImg : i)));
        } else {
          const updated = await updateImage(editTarget.id, form);
          setImages((prev) => prev.map((i) => (i.id === editTarget.id ? updated : i)));
        }
        show('success', 'Hero image updated successfully.');
      } else {
        const newImg = await uploadImage(selectedFile!, 'hero', 'hero', form);
        setImages((prev) => [...prev, newImg]);
        show('success', 'Hero image uploaded successfully.');
      }
      setModalOpen(false);
    } catch (err) {
      show('error', `Upload failed: ${(err as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteImage(deleteTarget);
      setImages((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      show('success', 'Hero image deleted successfully.');
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
    <AdminLayout title="Hero Images">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p className="text-navy-600 text-sm">Manage hero banner images displayed on the homepage slider.</p>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-800 hover:bg-navy-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-md"
        >
          <Upload className="w-4 h-4" />
          Add Hero Image
        </button>
      </div>

      {loading ? (
        <LoadingState message="Loading hero images..." />
      ) : error ? (
        <ErrorState message="Failed to load hero images." onRetry={load} />
      ) : images.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-cream-200 text-center">
          <ImageIcon className="w-12 h-12 text-navy-300 mx-auto mb-3" />
          <p className="text-navy-500 font-medium">No hero images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((img) => (
            <div key={img.id} className="bg-white rounded-xl border border-cream-200 overflow-hidden shadow-sm">
              <div className="aspect-video bg-cream-100 relative group">
                <img src={img.image_url} alt={img.title || 'Hero'} className="w-full h-full object-cover" />
                {!img.is_active && (
                  <div className="absolute inset-0 bg-navy-950/60 flex items-center justify-center">
                    <span className="text-white text-xs font-semibold bg-maroon-600 px-3 py-1 rounded-full">Disabled</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-navy-900 text-sm truncate">{img.title || 'Untitled'}</p>
                  <span className="text-xs text-navy-400 flex-shrink-0">Order: {img.display_order}</span>
                </div>
                {img.caption && <p className="text-xs text-navy-500 line-clamp-2 mb-3">{img.caption}</p>}
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(img)} className="flex-1 text-xs font-semibold py-2 px-3 bg-navy-50 text-navy-700 rounded-lg hover:bg-navy-100 transition-colors">
                    Edit
                  </button>
                  <button onClick={() => toggleActive(img)} className="p-2 rounded-lg bg-cream-100 hover:bg-cream-200 text-navy-600 transition-colors" aria-label={img.is_active ? 'Disable' : 'Enable'}>
                    {img.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setDeleteTarget(img)} className="p-2 rounded-lg bg-maroon-50 hover:bg-maroon-100 text-maroon-600 transition-colors" aria-label="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Hero Image' : 'Add Hero Image'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!editTarget && (
            <Field label="Image File" hint="JPG, PNG, or WebP. Recommended size: 1920x1080 or larger.">
              <input type="file" accept="image/*" onChange={handleFileChange} className={inputClass} required={!editTarget} />
            </Field>
          )}
          {editTarget && (
            <Field label="Replace Image (optional)" hint="Select a new file to replace the current image.">
              <input type="file" accept="image/*" onChange={handleFileChange} className={inputClass} />
            </Field>
          )}
          {previewUrl && (
            <div className="aspect-video rounded-lg overflow-hidden bg-cream-100 border border-cream-200">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <Field label="Title">
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="Optional image title" />
          </Field>
          <Field label="Caption">
            <input type="text" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className={inputClass} placeholder="Optional caption" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Display Order">
              <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className={inputClass} min={0} />
            </Field>
            <Field label="Active">
              <label className="flex items-center gap-2 py-2.5">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-5 h-5 rounded text-navy-800 focus:ring-gold-400" />
                <span className="text-sm text-navy-700">Show on homepage</span>
              </label>
            </Field>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2.5 text-sm font-semibold text-navy-600 bg-cream-100 hover:bg-cream-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={uploading} className="flex-1 py-2.5 text-sm font-semibold text-white bg-navy-800 hover:bg-navy-700 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2">
              {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : editTarget ? 'Save Changes' : 'Upload'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirm Deletion" size="sm">
        <div>
          <p className="text-sm text-navy-700 mb-4">
            Are you sure you want to delete this hero image? This action cannot be undone.
          </p>
          {deleteTarget && (
            <div className="aspect-video rounded-lg overflow-hidden mb-4 border border-cream-200">
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
        </div>
      </Modal>

      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </AdminLayout>
  );
}
