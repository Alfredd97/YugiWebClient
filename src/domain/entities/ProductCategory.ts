export type ProductType = 'cards' | 'decks' | 'accessories'

export class ProductCategory {
  readonly id: string
  readonly type: ProductType
  readonly title: string
  readonly description: string
  readonly totalAvailable: number

  constructor(params: {
    id: string
    type: ProductType
    title: string
    description: string
    totalAvailable: number
  }) {
    this.id = params.id
    this.type = params.type
    this.title = params.title
    this.description = params.description
    this.totalAvailable = params.totalAvailable
  }
}

