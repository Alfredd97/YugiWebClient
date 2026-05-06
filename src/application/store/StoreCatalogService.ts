import type { StoreItem } from '../../domain/entities/StoreItem'
import type { StoreItemCategory } from '../../domain/entities/StoreItem'
import { CardItemRepository } from '../../infrastructure/repositories/CardItemRepository'
import { DeckItemRepository } from '../../infrastructure/repositories/DeckItemRepository'
import { AccessoryItemRepository } from '../../infrastructure/repositories/AccessoryItemRepository'
import { EspecialItemRepository } from '../../infrastructure/repositories/EspecialItemRepository'

export class StoreCatalogService {
  private cardRepository = new CardItemRepository()
  private deckRepository = new DeckItemRepository()
  private accessoryRepository = new AccessoryItemRepository()
  private especialRepository = new EspecialItemRepository()

  async getItemsByCategory(category: StoreItemCategory): Promise<StoreItem[]> {
    switch (category) {
      case 'cards':
        return this.cardRepository.findAll()
      case 'decks':
        return this.deckRepository.findAll()
      case 'accessories':
        return this.accessoryRepository.findAll()
      case 'especiales':
        return this.especialRepository.findAll()
      default:
        return []
    }
  }

  async getAllItems(): Promise<StoreItem[]> {
    const [cards, decks, accessories, especiales] = await Promise.all([
      this.cardRepository.findAll(),
      this.deckRepository.findAll(),
      this.accessoryRepository.findAll(),
      this.especialRepository.findAll(),
    ])
    return [...cards, ...decks, ...accessories, ...especiales]
  }

  async getCounts(): Promise<{ cards: number; decks: number; accessories: number; especiales: number }> {
    const [cards, decks, accessories, especiales] = await Promise.all([
      this.cardRepository.countAll(),
      this.deckRepository.countAll(),
      this.accessoryRepository.countAll(),
      this.especialRepository.countAll(),
    ])
    return { cards, decks, accessories, especiales }
  }

  async getItemById(category: StoreItemCategory, id: string): Promise<StoreItem | null> {
    switch (category) {
      case 'cards':
        return this.cardRepository.findById(id)
      case 'decks':
        return this.deckRepository.findById(id)
      case 'accessories':
        return this.accessoryRepository.findById(id)
      case 'especiales':
        return this.especialRepository.findById(id)
      default:
        return null
    }
  }
}

