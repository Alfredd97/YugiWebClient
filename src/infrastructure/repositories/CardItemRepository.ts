import { supabase } from '../supabase/SupabaseClient'
import { CardItem } from '../../domain/entities/CardItem'
import { type StoreGameFormat } from '../../domain/entities/StoreItem'

interface CardItemRecord {
  id: string
  name: string
  game_format: StoreGameFormat
  condition: string
  expansion_code: string
  rarity: string
  quantity: number
  price_usd: number
  price_cup: number
  image_url?: string | null
}

export class CardItemRepository {
  async findAll(): Promise<CardItem[]> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) {
      console.error('Error fetching cards:', error)
      return []
    }

    return data.map((record) => this.mapToEntity(record))
  }

  async findById(id: string): Promise<CardItem | null> {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return null
    }

    return this.mapToEntity(data)
  }

  async countAll(): Promise<number> {
    const { count, error } = await supabase
      .from('cards')
      .select('*', { count: 'exact', head: true })
    if (error || count === null) return 0
    return count
  }

  private mapToEntity(record: CardItemRecord): CardItem {
    return new CardItem({
      id: record.id,
      name: record.name,
      quantity: record.quantity,
      gameFormat: record.game_format,
      condition: record.condition,
      expansionCode: record.expansion_code,
      rarity: record.rarity,
      priceUsd: record.price_usd,
      priceCup: record.price_cup,
      imageUrl: record.image_url,
    })
  }
}
