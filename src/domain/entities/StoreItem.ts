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
  }
}

export interface CardItemParams {
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

export class CardItem extends StoreItem {
  constructor(params: CardItemParams) {
    super({
      ...params,
      category: 'cards',
    })
  }
}

export interface DeckItemParams {
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

export class DeckItem extends StoreItem {
  constructor(params: DeckItemParams) {
    super({
      ...params,
      category: 'decks',
    })
  }
}

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


