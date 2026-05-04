-- Migration 004: Remove game_format, expansion_code, and rarity from accessories table

ALTER TABLE accessories
DROP COLUMN IF EXISTS game_format,
DROP COLUMN IF EXISTS expansion_code,
DROP COLUMN IF EXISTS rarity;
