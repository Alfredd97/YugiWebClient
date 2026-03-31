-- Initial schema for YuGiWeb store
-- Creates tables: cards, decks, accessories, currency_settings

-- Cards table
CREATE TABLE IF NOT EXISTS cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  seller_name TEXT NOT NULL,
  game_format TEXT NOT NULL CHECK (game_format IN ('TCG', 'OCG')),
  condition TEXT NOT NULL,
  expansion_code TEXT NOT NULL,
  rarity TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  price_usd DECIMAL(10, 2) NOT NULL,
  price_cup DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Decks table
CREATE TABLE IF NOT EXISTS decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  seller_name TEXT NOT NULL,
  game_format TEXT NOT NULL CHECK (game_format IN ('TCG', 'OCG')),
  condition TEXT NOT NULL,
  expansion_code TEXT NOT NULL,
  rarity TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  price_usd DECIMAL(10, 2) NOT NULL,
  price_cup DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Accessories table
CREATE TABLE IF NOT EXISTS accessories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  seller_name TEXT NOT NULL,
  game_format TEXT NOT NULL CHECK (game_format IN ('TCG', 'OCG')),
  condition TEXT NOT NULL,
  expansion_code TEXT NOT NULL,
  rarity TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  price_usd DECIMAL(10, 2) NOT NULL,
  price_cup DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Currency settings table
CREATE TABLE IF NOT EXISTS currency_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_price_usd DECIMAL(10, 2) NOT NULL,
  cup_per_usd DECIMAL(10, 4) NOT NULL,
  auto_price_enabled BOOLEAN NOT NULL DEFAULT false,
  multipliers JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_cards_game_format ON cards(game_format);
CREATE INDEX IF NOT EXISTS idx_cards_expansion ON cards(expansion_code);
CREATE INDEX IF NOT EXISTS idx_cards_rarity ON cards(rarity);
CREATE INDEX IF NOT EXISTS idx_cards_created_at ON cards(created_at);

CREATE INDEX IF NOT EXISTS idx_decks_game_format ON decks(game_format);
CREATE INDEX IF NOT EXISTS idx_decks_expansion ON decks(expansion_code);
CREATE INDEX IF NOT EXISTS idx_decks_created_at ON decks(created_at);

CREATE INDEX IF NOT EXISTS idx_accessories_game_format ON accessories(game_format);
CREATE INDEX IF NOT EXISTS idx_accessories_created_at ON accessories(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_cards_updated_at BEFORE UPDATE ON cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_decks_updated_at BEFORE UPDATE ON decks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accessories_updated_at BEFORE UPDATE ON accessories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_currency_settings_updated_at BEFORE UPDATE ON currency_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default currency settings
INSERT INTO currency_settings (base_price_usd, cup_per_usd, auto_price_enabled, multipliers)
VALUES (1.00, 58.50, false, '{}')
ON CONFLICT DO NOTHING;
