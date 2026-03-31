import { supabase } from '../supabase/SupabaseClient'
import { DeckItem } from '../../domain/entities/DeckItem'
import { type StoreGameFormat } from '../../domain/entities/StoreItem'

interface DeckItemRecord {
  id: string
  name: string
  seller_name: string
  game_format: StoreGameFormat
  condition: string
  expansion_code: string
  rarity: string
  quantity: number
  price_usd: number
  price_cup: number
}

export class DeckItemRepository {
  async findAll(): Promise<DeckItem[]> {
    const { data, error } = await supabase
      .from('decks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) {
      console.error('Error fetching decks:', error)
      return []
    }

    return data.map((record) => this.mapToEntity(record))
  }

  async findById(id: string): Promise<DeckItem | null> {
    const { data, error } = await supabase
      .from('decks')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return null
    }

    return this.mapToEntity(data)
  }

  private mapToEntity(record: DeckItemRecord): DeckItem {
    return new DeckItem({
      id: record.id,
      name: record.name,
      quantity: record.quantity,
      sellerName: record.seller_name,
      gameFormat: record.game_format,
      condition: record.condition,
      expansionCode: record.expansion_code,
      rarity: record.rarity,
      priceUsd: record.price_usd,
      priceCup: record.price_cup,
    })
  }
}
