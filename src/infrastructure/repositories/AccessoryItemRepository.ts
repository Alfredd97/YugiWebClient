import { supabase } from '../supabase/SupabaseClient'
import { AccessoryItem } from '../../domain/entities/AccessoryItem'
import { type StoreGameFormat } from '../../domain/entities/StoreItem'

interface AccessoryItemRecord {
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
  image_url?: string | null
}

export class AccessoryItemRepository {
  async findAll(): Promise<AccessoryItem[]> {
    const { data, error } = await supabase
      .from('accessories')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) {
      console.error('Error fetching accessories:', error)
      return []
    }

    return data.map((record) => this.mapToEntity(record))
  }

  async findById(id: string): Promise<AccessoryItem | null> {
    const { data, error } = await supabase
      .from('accessories')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return null
    }

    return this.mapToEntity(data)
  }

  private mapToEntity(record: AccessoryItemRecord): AccessoryItem {
    return new AccessoryItem({
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
      imageUrl: record.image_url,
    })
  }
}
