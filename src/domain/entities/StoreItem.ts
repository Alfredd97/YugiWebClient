export type StoreItemCategory = 'cards' | 'decks' | 'accessories'

export type StoreGameFormat = 'TCG' | 'OCG'

export interface StorePrice {
  readonly usd: number
  readonly cup: number
}

export class StoreItem {
  readonly id: string
  readonly name: string
  readonly category: StoreItemCategory
  readonly quantity: number
  readonly sellerName: string
  readonly gameFormat: StoreGameFormat
  readonly condition: string
  readonly expansionCode: string
  readonly rarity: string
  readonly price: StorePrice
  readonly imageUrl?: string | null
  readonly createdAt: Date = new Date()

  constructor(params: {
    id: string
    name: string
    category: StoreItemCategory
    quantity: number
    sellerName: string
    gameFormat: StoreGameFormat
    condition: string
    expansionCode: string
    rarity: string
    priceUsd: number
    priceCup: number
    imageUrl?: string | null
  }) {
    this.id = params.id
    this.name = params.name
    this.category = params.category
    this.quantity = params.quantity
    this.sellerName = params.sellerName
    this.gameFormat = params.gameFormat
    this.condition = params.condition
    this.expansionCode = params.expansionCode
    this.rarity = params.rarity
    this.price = {
      usd: params.priceUsd,
      cup: params.priceCup,
    }
    this.imageUrl = params.imageUrl ?? null
  }
}