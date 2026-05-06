import { supabase } from '../supabase/SupabaseClient'
import { EspecialItem } from '../../domain/entities/EspecialItem'
import { type CardType } from '../../domain/entities/CardItem'
import { type StoreGameFormat } from '../../domain/entities/StoreItem'

interface EspecialItemRecord {
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
  tipo?: CardType | null
}

export class EspecialItemRepository {
  async findAll(): Promise<EspecialItem[]> {
    const pageSize = 1000
    let from = 0
    const allRecords: EspecialItemRecord[] = []

    while (true) {
      const { data, error } = await supabase
        .from('especiales')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, from + pageSize - 1)

      if (error || !data || data.length === 0) break
      allRecords.push(...data)
      if (data.length < pageSize) break
      from += pageSize
    }

    return allRecords.map((record) => this.mapToEntity(record))
  }

  async findById(id: string): Promise<EspecialItem | null> {
    const { data, error } = await supabase
      .from('especiales')
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
      .from('especiales')
      .select('*', { count: 'exact', head: true })
    if (error || count === null) return 0
    return count
  }

  private mapToEntity(record: EspecialItemRecord): EspecialItem {
    return new EspecialItem({
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
      cardType: record.tipo,
    })
  }
}
