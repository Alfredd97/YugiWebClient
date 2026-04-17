import { StoreItem, type StoreGameFormat } from './StoreItem'

export interface DeckItemParams {
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
  imageUrls?: string[] | null
}

export class DeckItem extends StoreItem {
  readonly imageUrls: string[]

  constructor(params: DeckItemParams) {
    super({
      ...params,
      category: 'decks',
    })
    this.imageUrls = params.imageUrls ?? []
  }
}
