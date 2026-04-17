-- Migration 003: Add multiple image URLs support for decks

ALTER TABLE decks
ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';
