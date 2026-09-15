import { supabase, STORAGE_BUCKET } from '@/lib/supabase';
import type { SiteImage, Announcement, ImageCategory } from '@/types';

export async function fetchImages(category: ImageCategory): Promise<SiteImage[]> {
  const { data, error } = await supabase
    .from('site_images')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) throw error;
  return (data ?? []) as SiteImage[];
}

export async function fetchAllImages(category?: ImageCategory): Promise<SiteImage[]> {
  let query = supabase.from('site_images').select('*').order('display_order', { ascending: true });
  if (category) query = query.eq('category', category);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as SiteImage[];
}

export async function fetchAnnouncements(limit?: number): Promise<Announcement[]> {
  let query = supabase
    .from('announcements')
    .select('*')
    .eq('is_active', true)
    .order('date', { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Announcement[];
}

export async function fetchAllAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Announcement[];
}

export async function uploadImage(
  file: File,
  category: ImageCategory,
  pathPrefix: string,
  metadata?: { title?: string; caption?: string; display_order?: number; is_active?: boolean }
): Promise<SiteImage> {
  const ext = file.name.split('.').pop() || 'jpg';
  const fileName = `${pathPrefix}/${category}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(fileName);

  const { data, error: insertError } = await supabase
    .from('site_images')
    .insert({
      category,
      image_url: urlData.publicUrl,
      storage_path: fileName,
      title: metadata?.title ?? null,
      caption: metadata?.caption ?? null,
      display_order: metadata?.display_order ?? 0,
      is_active: metadata?.is_active ?? true,
    })
    .select()
    .single();

  if (insertError) throw insertError;
  return data as SiteImage;
}

export async function updateImage(id: string, updates: Partial<SiteImage>): Promise<SiteImage> {
  const { data, error } = await supabase
    .from('site_images')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as SiteImage;
}

export async function deleteImage(image: SiteImage): Promise<void> {
  if (image.storage_path) {
    const { error: storageError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([image.storage_path]);
    if (storageError) {
      // Continue to delete the DB record even if storage deletion fails
      // eslint-disable-next-line no-console
      console.warn('Failed to delete storage object:', storageError.message);
    }
  }
  const { error } = await supabase.from('site_images').delete().eq('id', image.id);
  if (error) throw error;
}

export async function createAnnouncement(
  announcement: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>
): Promise<Announcement> {
  const { data, error } = await supabase
    .from('announcements')
    .insert(announcement)
    .select()
    .single();
  if (error) throw error;
  return data as Announcement;
}

export async function updateAnnouncement(id: string, updates: Partial<Announcement>): Promise<Announcement> {
  const { data, error } = await supabase
    .from('announcements')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Announcement;
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const { error } = await supabase.from('announcements').delete().eq('id', id);
  if (error) throw error;
}
