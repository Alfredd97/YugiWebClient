-- Add image columns to store items
-- Migration 002: Add image support for cards, decks, and accessories

-- Add image_url column to cards table
ALTER TABLE cards
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add image_url column to decks table
ALTER TABLE decks
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add image_url column to accessories table
ALTER TABLE accessories
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Create storage bucket for item images (if not exists)
-- Note: This requires Supabase storage to be enabled
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('item-images', 'item-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public read access to item images
CREATE POLICY "Allow public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'item-images');

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'item-images');

-- Create policy to allow authenticated users to update images
CREATE POLICY "Allow authenticated users to update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'item-images');

-- Create policy to allow authenticated users to delete images
CREATE POLICY "Allow authenticated users to delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'item-images');
