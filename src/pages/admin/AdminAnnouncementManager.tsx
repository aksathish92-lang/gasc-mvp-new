import { useState, useCallback, useEffect, type FormEvent } from 'react';
import { Plus, Pencil, Trash2, Loader2, Megaphone } from 'lucide-react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Modal } from '@/components/Modal';
import { ToastContainer, useToast } from '@/components/Toast';
import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { Field, inputClass } from '@/components/form/Field';
import { fetchAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '@/lib/api';
import type { Announcement } from '@/types';

export function AdminAnnouncementManager() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Announcement | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    is_active: true,
  });
  const { toasts, show, dismiss } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await fetchAllAnnouncements();
      setAnnouncements(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => {
    setEditTarget(null);
    setForm({ title: '', content: '', date: new Date().toISOString().split('T')[0], category: '', is_active: true });
    setModalOpen(true);
  };

  const openEdit = (ann: Announcement) => {
    setEditTarget(ann);
    setForm({
      title: ann.title,
      content: ann.content,
      date: ann.date,
      category: ann.category ?? '',
      is_active: ann.is_active,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        content: form.content,
        date: form.date,
        category: form.category || null,
        is_active: form.is_active,
      };
      if (editTarget) {
        const updated = await updateAnnouncement(editTarget.id, payload);
        setAnnouncements((prev) => prev.map((a) => (a.id === editTarget.id ? updated : a)));
        show('success', 'Announcement updated successfully.');
      } else {
        const created = await createAnnouncement(payload);
        setAnnouncements((prev) => [created, ...prev]);
        show('success', 'Announcement created successfully.');
      }
      setModalOpen(false);
    } catch (err) {
      show('error', `Save failed: ${(err as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAnnouncement(deleteTarget.id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      show('success', 'Announcement deleted successfully.');
      setDeleteTarget(null);
    } catch (err) {
      show('error', `Delete failed: ${(err as Error).message}`);
    }
  };

  const toggleActive = async (ann: Announcement) => {
    try {
      const updated = await updateAnnouncement(ann.id, { is_active: !ann.is_active });
      setAnnouncements((prev) => prev.map((a) => (a.id === ann.id ? updated : a)));
      show('success', `Announcement ${!ann.is_active ? 'activated' : 'deactivated'}.`);
    } catch (err) {
      show('error', `Update failed: ${(err as Error).message}`);
    }
  };

  return (
    <AdminLayout title="Announcements">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p className="text-navy-600 text-sm">Create and manage college announcements and notices.</p>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-800 hover:bg-navy-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          Add Announcement
        </button>
      </div>

      {loading ? (
        <LoadingState message="Loading announcements..." />
      ) : error ? (
        <ErrorState message="Failed to load announcements." onRetry={load} />
      ) : announcements.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-cream-200 text-center">
          <Megaphone className="w-12 h-12 text-navy-300 mx-auto mb-3" />
          <p className="text-navy-500 font-medium">No announcements yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-cream-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-50 border-b border-cream-200">
                  <th className="text-left px-4 py-3 font-semibold text-navy-700">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-navy-700 hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-navy-700 hidden sm:table-cell">Date</th>
                  <th className="text-center px-4 py-3 font-semibold text-navy-700">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-navy-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {announcements.map((ann) => (
                  <tr key={ann.id} className="hover:bg-cream-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-navy-900 line-clamp-1">{ann.title}</p>
                      <p className="text-xs text-navy-500 line-clamp-1 mt-0.5">{ann.content}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {ann.category ? (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gold-100 text-gold-700">{ann.category}</span>
                      ) : (
                        <span className="text-navy-400 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-navy-600">
                      {new Date(ann.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggleActive(ann)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-colors ${
                          ann.is_active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-cream-200 text-navy-500 hover:bg-cream-300'
                        }`}
                      >
                        {ann.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => openEdit(ann)} className="p-1.5 rounded-lg bg-navy-50 hover:bg-navy-100 text-navy-600 transition-colors" aria-label="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(ann)} className="p-1.5 rounded-lg bg-maroon-50 hover:bg-maroon-100 text-maroon-600 transition-colors" aria-label="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editTarget ? 'Edit Announcement' : 'Add Announcement'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title">
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="Announcement title" />
          </Field>
          <Field label="Content">
            <textarea required rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={inputClass} placeholder="Announcement details..." />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
            </Field>
            <Field label="Category" hint="e.g. Admission, Exam, General">
              <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputClass} placeholder="Optional" />
            </Field>
          </div>
          <Field label="Active">
            <label className="flex items-center gap-2 py-2">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-5 h-5 rounded text-navy-800 focus:ring-gold-400" />
              <span className="text-sm text-navy-700">Show this announcement on the website</span>
            </label>
          </Field>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModalOpen(false)} className="flex-1 py-2.5 text-sm font-semibold text-navy-600 bg-cream-100 hover:bg-cream-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="flex-1 py-2.5 text-sm font-semibold text-white bg-navy-800 hover:bg-navy-700 disabled:opacity-60 rounded-lg transition-colors flex items-center justify-center gap-2">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : editTarget ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirm Deletion" size="sm">
        <p className="text-sm text-navy-700 mb-4">Are you sure you want to delete this announcement? This action cannot be undone.</p>
        {deleteTarget && (
          <div className="bg-cream-50 rounded-lg p-3 mb-4">
            <p className="font-semibold text-navy-900 text-sm">{deleteTarget.title}</p>
            <p className="text-xs text-navy-500 mt-1 line-clamp-2">{deleteTarget.content}</p>
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
