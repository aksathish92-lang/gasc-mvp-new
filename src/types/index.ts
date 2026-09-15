export type ImageCategory = 'hero' | 'gallery' | 'campus' | 'about' | 'event';

export interface SiteImage {
  id: string;
  category: ImageCategory;
  image_url: string;
  storage_path: string | null;
  title: string | null;
  caption: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SiteContent {
  id: string;
  section: string;
  content: string;
  updated_at: string;
}

export interface Course {
  id: string;
  name: string;
  degreeType: string;
  description: string;
  iconName: string;
}
