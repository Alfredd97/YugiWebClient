import type { StoreItem } from './StoreItem'

export interface CartItem {
  itemId: string
  name: string
  category: StoreItem['category']
  price: {
    usd: number
    cup: number
  }
  quantity: number
  maxAvailable: number
  addedAt: number
}
