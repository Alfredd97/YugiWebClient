import { supabase } from '../supabase/SupabaseClient'

export interface CurrencySettings {
  basePriceUsd: number
  cupPerUsd: number
  autoPriceEnabled: boolean
  multipliers: Record<string, number>
}

export class CurrencySettingsRepository {
  async getSettings(): Promise<CurrencySettings | null> {
    try {
      const { data, error } = await supabase
        .from('currency_settings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error || !data || data.length === 0) {
        return null
      }

      const record = data[0]
      return {
        basePriceUsd: record.base_price_usd,
        cupPerUsd: record.cup_per_usd,
        autoPriceEnabled: record.auto_price_enabled,
        multipliers: record.multipliers,
      }
    } catch {
      return null
    }
  }
}
