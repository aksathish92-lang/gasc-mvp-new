/*
# Create core tables for GASCMVP college website

1. New Tables
- `site_images` — stores metadata for hero/gallery/campus/about/event images. The actual binary lives in the `site-images` Supabase Storage bucket; this table holds the public URL + metadata.
  - id (uuid PK)
  - category (text: hero | gallery | campus | about | event)
  - image_url (text, not null) — public/storage URL
  - storage_path (text, nullable) — path inside the site-images bucket, used for deletion
  - title (text, nullable)
  - caption (text, nullable)
  - display_order (int, default 0)
  - is_active (bool, default true)
  - created_at (timestamptz default now())
- `announcements` — notice board entries shown on Home / Admission / Student Corner.
  - id (uuid PK)
  - title (text, not null)
  - content (text, not null)
  - date (date, not null, default today)
  - category (text, nullable — e.g. admission, exam, general)
  - is_active (bool, default true)
  - created_at (timestamptz default now())
  - updated_at (timestamptz default now())
- `site_content` — key/value style editable content sections (e.g. admission_eligibility, about_vision).
  - id (uuid PK)
  - section (text, unique, not null)
  - content (text, not null)
  - updated_at (timestamptz default now())

2. Security
- Enable RLS on all three tables.
- Public (anon + authenticated) can READ active rows only (is_active = true) for site_images and announcements; site_content is publicly readable.
- Authenticated admin users can perform full CRUD on all tables (they are the content managers).
- 4 separate policies per table (SELECT / INSERT / UPDATE / DELETE), never FOR ALL.

3. Storage
- Create `site-images` bucket (public) for hero/gallery/campus/about/event images.
- Storage policies: public read; authenticated users can create/update/delete objects.
*/

-- ===== site_images =====
CREATE TABLE IF NOT EXISTS site_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL DEFAULT 'gallery',
  image_url text NOT NULL,
  storage_path text,
  title text,
  caption text,
  display_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_active_site_images" ON site_images;
CREATE POLICY "public_read_active_site_images"
  ON site_images FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "admin_insert_site_images" ON site_images;
CREATE POLICY "admin_insert_site_images"
  ON site_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_site_images" ON site_images;
CREATE POLICY "admin_update_site_images"
  ON site_images FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_site_images" ON site_images;
CREATE POLICY "admin_delete_site_images"
  ON site_images FOR DELETE
  TO authenticated
  USING (true);

-- ===== announcements =====
CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  category text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_active_announcements" ON announcements;
CREATE POLICY "public_read_active_announcements"
  ON announcements FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

DROP POLICY IF EXISTS "admin_insert_announcements" ON announcements;
CREATE POLICY "admin_insert_announcements"
  ON announcements FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_announcements" ON announcements;
CREATE POLICY "admin_update_announcements"
  ON announcements FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_announcements" ON announcements;
CREATE POLICY "admin_delete_announcements"
  ON announcements FOR DELETE
  TO authenticated
  USING (true);

-- ===== site_content =====
CREATE TABLE IF NOT EXISTS site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text UNIQUE NOT NULL,
  content text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_site_content" ON site_content;
CREATE POLICY "public_read_site_content"
  ON site_content FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_insert_site_content" ON site_content;
CREATE POLICY "admin_insert_site_content"
  ON site_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_site_content" ON site_content;
CREATE POLICY "admin_update_site_content"
  ON site_content FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_site_content" ON site_content;
CREATE POLICY "admin_delete_site_content"
  ON site_content FOR DELETE
  TO authenticated
  USING (true);

-- ===== indexes =====
CREATE INDEX IF NOT EXISTS idx_site_images_category_active_order
  ON site_images (category, is_active, display_order);

CREATE INDEX IF NOT EXISTS idx_announcements_active_date
  ON announcements (is_active, date DESC);

-- ===== updated_at trigger for announcements & site_content =====
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS announcements_set_updated_at ON announcements;
CREATE TRIGGER announcements_set_updated_at
  BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS site_content_set_updated_at ON site_content;
CREATE TRIGGER site_content_set_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ===== Storage bucket =====
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: public read, authenticated write/delete
DROP POLICY IF EXISTS "public_read_site_images_bucket" ON storage.objects;
CREATE POLICY "public_read_site_images_bucket"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'site-images');

DROP POLICY IF EXISTS "admin_insert_site_images_bucket" ON storage.objects;
CREATE POLICY "admin_insert_site_images_bucket"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'site-images');

DROP POLICY IF EXISTS "admin_update_site_images_bucket" ON storage.objects;
CREATE POLICY "admin_update_site_images_bucket"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'site-images') WITH CHECK (bucket_id = 'site-images');

DROP POLICY IF EXISTS "admin_delete_site_images_bucket" ON storage.objects;
CREATE POLICY "admin_delete_site_images_bucket"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'site-images');
