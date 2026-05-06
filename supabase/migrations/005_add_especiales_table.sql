-- Especiales table (same attributes as cards)
CREATE TABLE IF NOT EXISTS especiales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  game_format TEXT NOT NULL CHECK (game_format IN ('TCG', 'OCG')),
  condition TEXT NOT NULL,
  expansion_code TEXT NOT NULL,
  rarity TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  price_usd DECIMAL(10, 2) NOT NULL,
  price_cup DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  tipo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_especiales_game_format ON especiales(game_format);
CREATE INDEX IF NOT EXISTS idx_especiales_created_at ON especiales(created_at);
CREATE INDEX IF NOT EXISTS idx_especiales_tipo ON especiales(tipo);

-- updated_at trigger
CREATE TRIGGER update_especiales_updated_at BEFORE UPDATE ON especiales
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
