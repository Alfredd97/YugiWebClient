import { StoreItem, type StoreGameFormat } from './StoreItem'

export type CardType =
  | 'Normal Spell'
  | 'Equip Spell'
  | 'Continuous Spell'
  | 'Field Spell'
  | 'Quick-Play Spell'
  | 'Ritual Spell'
  | 'Counter Trap'
  | 'Normal Trap'
  | 'Continuous Trap'
  | 'Effect Monster'
  | 'Ritual'
  | 'Pendulum'
  | 'Normal Monster'
  | 'Fusion'
  | 'Link'
  | 'Synchro'
  | 'Xyz'
  | 'Token'

export const CARD_TYPE_GROUPS: { label: string; types: CardType[] }[] = [
  {
    label: 'Hechizos',
    types: ['Normal Spell', 'Equip Spell', 'Continuous Spell', 'Field Spell', 'Quick-Play Spell', 'Ritual Spell'],
  },
  {
    label: 'Trampas',
    types: ['Counter Trap', 'Normal Trap', 'Continuous Trap'],
  },
  {
    label: 'Monstruos',
    types: ['Effect Monster', 'Ritual', 'Pendulum', 'Normal Monster'],
  },
  {
    label: 'Extra Deck',
    types: ['Fusion', 'Link', 'Synchro', 'Xyz'],
  },
  {
    label: 'Otros',
    types: ['Token'],
  },
]

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
  cardType?: CardType | null
}

export class CardItem extends StoreItem {
  readonly cardType: CardType | null

  constructor(params: CardItemParams) {
    super({
      ...params,
      category: 'cards',
    })
    this.cardType = params.cardType ?? null
  }
}
