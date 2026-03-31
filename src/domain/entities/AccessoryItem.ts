import { StoreItem, type StoreGameFormat } from './StoreItem'

export interface AccessoryItemParams {
  id: string
  name: string
  quantity: number
  sellerName: string
  gameFormat: StoreGameFormat
  condition: string
  expansionCode: string
  rarity: string
  priceUsd: number
  priceCup: number
}

export class AccessoryItem extends StoreItem {
  constructor(params: AccessoryItemParams) {
    super({
      ...params,
      category: 'accessories',
    })
  }
}
