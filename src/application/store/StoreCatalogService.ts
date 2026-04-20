import type { StoreItem } from '../../domain/entities/StoreItem'
import type { StoreItemCategory } from '../../domain/entities/StoreItem'
import { CardItemRepository } from '../../infrastructure/repositories/CardItemRepository'
import { DeckItemRepository } from '../../infrastructure/repositories/DeckItemRepository'
import { AccessoryItemRepository } from '../../infrastructure/repositories/AccessoryItemRepository'

export class StoreCatalogService {
  private cardRepository = new CardItemRepository()
  private deckRepository = new DeckItemRepository()
  private accessoryRepository = new AccessoryItemRepository()

  async getItemsByCategory(category: StoreItemCategory): Promise<StoreItem[]> {
    switch (category) {
      case 'cards':
        return this.cardRepository.findAll()
      case 'decks':
        return this.deckRepository.findAll()
      case 'accessories':
        return this.accessoryRepository.findAll()
      default:
        return []
    }
  }

  async getAllItems(): Promise<StoreItem[]> {
    const [cards, decks, accessories] = await Promise.all([
      this.cardRepository.findAll(),
      this.deckRepository.findAll(),
      this.accessoryRepository.findAll(),
    ])
    return [...cards, ...decks, ...accessories]
  }

  async getCounts(): Promise<{ cards: number; decks: number; accessories: number }> {
    const [cards, decks, accessories] = await Promise.all([
      this.cardRepository.countAll(),
      this.deckRepository.countAll(),
      this.accessoryRepository.countAll(),
    ])
    return { cards, decks, accessories }
  }

  async getItemById(category: StoreItemCategory, id: string): Promise<StoreItem | null> {
    switch (category) {
      case 'cards':
        return this.cardRepository.findById(id)
      case 'decks':
        return this.deckRepository.findById(id)
      case 'accessories':
        return this.accessoryRepository.findById(id)
      default:
        return null
    }
  }
}

