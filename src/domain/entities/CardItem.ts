import { StoreItem, type StoreGameFormat } from './StoreItem'

export interface CardItemParams {
  id: string
  name: string
  quantity: number
  gameFormat: StoreGameFormat
  condition: string
  expansionCode: string
  rarity: string
  priceUsd: number
  priceCup: number
  imageUrl?: string | null
}

export class CardItem extends StoreItem {
  constructor(params: CardItemParams) {
    super({
      ...params,
      category: 'cards',
    })
  }
}
