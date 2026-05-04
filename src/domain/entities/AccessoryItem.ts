import { StoreItem } from './StoreItem'

export interface AccessoryItemParams {
  id: string
  name: string
  quantity: number
  condition: string
  priceUsd: number
  priceCup: number
  imageUrl?: string | null
}

export class AccessoryItem extends StoreItem {
  constructor(params: AccessoryItemParams) {
    super({
      ...params,
      category: 'accessories',
    })
  }
}
