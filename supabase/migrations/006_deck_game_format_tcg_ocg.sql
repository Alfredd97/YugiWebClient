-- Allow 'TCG-OCG' as a valid game_format value in the decks table
ALTER TABLE decks
  DROP CONSTRAINT IF EXISTS decks_game_format_check;

ALTER TABLE decks
  ADD CONSTRAINT decks_game_format_check
  CHECK (game_format IN ('TCG', 'OCG', 'TCG-OCG'));
