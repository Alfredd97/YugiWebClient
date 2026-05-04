import { supabase } from '../supabase/SupabaseClient'
import { AccessoryItem } from '../../domain/entities/AccessoryItem'

interface AccessoryItemRecord {
  id: string
  name: string
  condition: string
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

  async countAll(): Promise<number> {
    const { count, error } = await supabase
      .from('accessories')
      .select('*', { count: 'exact', head: true })
    if (error || count === null) return 0
    return count
  }

  private mapToEntity(record: AccessoryItemRecord): AccessoryItem {
    return new AccessoryItem({
      id: record.id,
      name: record.name,
      quantity: record.quantity,
      condition: record.condition,
      priceUsd: record.price_usd,
      priceCup: record.price_cup,
      imageUrl: record.image_url,
    })
  }
}
