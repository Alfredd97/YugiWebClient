import {
  StoreItem,
  type StoreItemCategory,
  CardItem,
  DeckItem,
  AccessoryItem,
} from '../../domain/entities/StoreItem'

export class StoreCatalogService {
  getItemsByCategory(category: StoreItemCategory): StoreItem[] {
    const all = this.getAllItems()
    return all.filter((item) => item.category === category)
  }

  getAllItems(): StoreItem[] {
    // Sample catalog, inspired by https://yugifaction.com/shop/card/
    return [
      new CardItem({
        id: 'card-tenyi-spirit-nahata',
        name: 'Tenyi Spirit - Nahata',
        quantity: 1,
        sellerName: 'Moxx',
        gameFormat: 'TCG',
        condition: 'Nueva',
        expansionCode: 'CRBR',
        rarity: 'Común',
        priceUsd: 0.5,
        priceCup: 255.0,
      }),
      new CardItem({
        id: 'card-glow-up-bulb',
        name: 'Glow-Up Bulb',
        quantity: 2,
        sellerName: 'TCGStore',
        gameFormat: 'TCG',
        condition: 'Muy jugada',
        expansionCode: 'SDCL',
        rarity: 'Común',
        priceUsd: 1.0,
        priceCup: 510.0,
      }),
      new CardItem({
        id: 'card-danger-chupacabra',
        name: 'Danger! Chupacabra!',
        quantity: 3,
        sellerName: 'DJACU',
        gameFormat: 'TCG',
        condition: 'Nueva',
        expansionCode: 'CRBR',
        rarity: 'Común',
        priceUsd: 0.4,
        priceCup: 204.0,
      }),
      // Example deck listing
      new DeckItem({
        id: 'deck-dragon-maid',
        name: 'Deck Dragonmaid Competitivo',
        quantity: 1,
        sellerName: 'TCGStore',
        gameFormat: 'TCG',
        condition: 'Jugado',
        expansionCode: 'VARIOS',
        rarity: 'Mixto',
        priceUsd: 65.0,
        priceCup: 33150.0,
      }),
      // Example accessory listing
      new AccessoryItem({
        id: 'accessory-yugi-playmat',
        name: 'Playmat Yugi & Kaiba',
        quantity: 3,
        sellerName: 'BankaiProject',
        gameFormat: 'TCG',
        condition: 'Nuevo',
        expansionCode: 'ACCS',
        rarity: 'Edición especial',
        priceUsd: 25.0,
        priceCup: 12750.0,
      }),
    ]
  }
}

