import type { Cart } from '../../domain/entities/Cart'
import type { CartItem } from '../../domain/entities/CartItem'
import type { StoreItem } from '../../domain/entities/StoreItem'

const CART_STORAGE_KEY = 'yugi-cart'
const CART_EXPIRATION_MS = 15 * 60 * 1000 // 15 minutes

export class CartService {
  private getCart(): Cart | null {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (!stored) return null

      const cart: Cart = JSON.parse(stored)

      // Check if cart is expired
      if (cart.expiresAt && Date.now() > cart.expiresAt) {
        this.clearCart()
        return null
      }

      return cart
    } catch {
      return null
    }
  }

  private saveCart(cart: Cart): void {
    cart.updatedAt = Date.now()
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }

  /**
   * Get current cart items
   */
  getItems(): CartItem[] {
    const cart = this.getCart()
    return cart?.items ?? []
  }

  /**
   * Get cart summary
   */
  getSummary(): { totalItems: number; totalUSD: number; totalCUP: number } {
    const items = this.getItems()
    return {
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalUSD: items.reduce((sum, item) => sum + item.price.usd * item.quantity, 0),
      totalCUP: items.reduce((sum, item) => sum + item.price.cup * item.quantity, 0),
    }
  }

  /**
   * Add item to cart with stock validation
   * Returns success status and message
   */
  addItem(item: StoreItem, quantity: number = 1): {
    success: boolean
    message: string
    cartItem?: CartItem
  } {
    const cart = this.getCart() ?? this.createEmptyCart()

    // Validate quantity against available stock
    if (quantity > item.quantity) {
      return {
        success: false,
        message: `Solo hay ${item.quantity} unidades disponibles`,
      }
    }

    const existingItemIndex = cart.items.findIndex((i) => i.itemId === item.id)

    if (existingItemIndex >= 0) {
      const existingItem = cart.items[existingItemIndex]
      const newQuantity = existingItem.quantity + quantity

      // Check if combined quantity exceeds stock
      if (newQuantity > item.quantity) {
        const maxAllowed = item.quantity - existingItem.quantity
        return {
          success: false,
          message: maxAllowed > 0
            ? `Solo puedes agregar ${maxAllowed} unidad(es) más (stock: ${item.quantity})`
            : 'Producto agotado',
        }
      }

      cart.items[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
      }
    } else {
      const cartItem: CartItem = {
        itemId: item.id,
        name: item.name,
        category: item.category,
        price: { ...item.price },
        quantity,
        maxAvailable: item.quantity,
        addedAt: Date.now(),
      }
      cart.items.push(cartItem)
    }

    this.saveCart(cart)

    return {
      success: true,
      message: 'Producto agregado al carrito',
      cartItem: cart.items.find((i) => i.itemId === item.id),
    }
  }

  /**
   * Update item quantity in cart
   */
  updateQuantity(itemId: string, quantity: number, currentStock: number): {
    success: boolean
    message: string
  } {
    const cart = this.getCart()
    if (!cart) {
      return { success: false, message: 'Carrito no encontrado' }
    }

    const itemIndex = cart.items.findIndex((i) => i.itemId === itemId)
    if (itemIndex < 0) {
      return { success: false, message: 'Producto no encontrado en el carrito' }
    }

    if (quantity <= 0) {
      return this.removeItem(itemId)
    }

    if (quantity > currentStock) {
      return {
        success: false,
        message: `Solo hay ${currentStock} unidades disponibles`,
      }
    }

    cart.items[itemIndex] = {
      ...cart.items[itemIndex],
      quantity,
    }

    this.saveCart(cart)
    return { success: true, message: 'Cantidad actualizada' }
  }

  /**
   * Remove item from cart
   */
  removeItem(itemId: string): { success: boolean; message: string } {
    const cart = this.getCart()
    if (!cart) {
      return { success: false, message: 'Carrito no encontrado' }
    }

    cart.items = cart.items.filter((i) => i.itemId !== itemId)
    this.saveCart(cart)
    return { success: true, message: 'Producto eliminado' }
  }

  /**
   * Clear entire cart
   */
  clearCart(): void {
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  /**
   * Validate all cart items against current stock
   * Call this before checkout
   * Returns items that are still valid and any warnings
   */
  validateCart(currentItems: StoreItem[]): {
    valid: boolean
    warnings: string[]
    invalidItems: string[]
    updatedCart: CartItem[]
  } {
    const cart = this.getCart()
    if (!cart || cart.items.length === 0) {
      return {
        valid: true,
        warnings: [],
        invalidItems: [],
        updatedCart: [],
      }
    }

    const warnings: string[] = []
    const invalidItems: string[] = []
    const updatedCart: CartItem[] = []

    for (const cartItem of cart.items) {
      const stockItem = currentItems.find((i) => i.id === cartItem.itemId)

      if (!stockItem) {
        warnings.push(`${cartItem.name} ya no está disponible`)
        invalidItems.push(cartItem.itemId)
        continue
      }

      if (cartItem.quantity > stockItem.quantity) {
        warnings.push(
          `${cartItem.name}: solo hay ${stockItem.quantity} unidades (tenías ${cartItem.quantity})`
        )
        // Adjust quantity to available stock
        updatedCart.push({
          ...cartItem,
          quantity: stockItem.quantity,
          maxAvailable: stockItem.quantity,
        })
      } else {
        updatedCart.push({
          ...cartItem,
          maxAvailable: stockItem.quantity,
        })
      }
    }

    // Save updated cart if there were changes
    if (invalidItems.length > 0 || warnings.length > 0) {
      cart.items = updatedCart
      this.saveCart(cart)
    }

    return {
      valid: invalidItems.length === 0 && warnings.length === 0,
      warnings,
      invalidItems,
      updatedCart,
    }
  }

  /**
   * Complete purchase and clear cart
   */
  checkout(): void {
    this.clearCart()
  }

  private createEmptyCart(): Cart {
    return {
      items: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      expiresAt: Date.now() + CART_EXPIRATION_MS,
    }
  }

  /**
   * Get cart expiration time
   */
  getExpirationTime(): number | null {
    const cart = this.getCart()
    return cart?.expiresAt ?? null
  }

  /**
   * Extend cart expiration by another 15 minutes
   */
  extendExpiration(): void {
    const cart = this.getCart()
    if (cart) {
      cart.expiresAt = Date.now() + CART_EXPIRATION_MS
      this.saveCart(cart)
    }
  }
}
