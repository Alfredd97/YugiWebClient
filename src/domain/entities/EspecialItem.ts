import { StoreItem, type StoreGameFormat } from './StoreItem'
import { type CardType } from './CardItem'

export interface EspecialItemParams {
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
  cardType?: CardType | null
}

export class EspecialItem extends StoreItem {
  readonly cardType: CardType | null

  constructor(params: EspecialItemParams) {
    super({
      ...params,
      category: 'especiales',
    })
    this.cardType = params.cardType ?? null
  }
}
