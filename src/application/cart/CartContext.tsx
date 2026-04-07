import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { CartService } from '../../application/cart/CartService'
import type { CartItem } from '../../domain/entities/CartItem'

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalUSD: number
  totalCUP: number
  isOpen: boolean
  isCartExpired: boolean
  toast: { message: string; type: 'success' | 'error' } | null
  addItem: (itemId: string, name: string, category: CartItem['category'], price: { usd: number; cup: number }, quantity: number, maxAvailable: number) => { success: boolean; message: string }
  updateQuantity: (itemId: string, quantity: number, currentStock: number) => { success: boolean; message: string }
  removeItem: (itemId: string) => { success: boolean; message: string }
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  validateCart: (currentItems: any[]) => { valid: boolean; warnings: string[]; invalidItems: string[] }
  checkout: () => void
  dismissToast: () => void
}

const CartContext = createContext<CartContextType | null>(null)

const cartService = new CartService()

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isCartExpired, setIsCartExpired] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const dismissToast = () => setToast(null)

  // Load cart on mount
  useEffect(() => {
    const loadCart = () => {
      const cartItems = cartService.getItems()
      setItems(cartItems)

      const expiresAt = cartService.getExpirationTime()
      if (expiresAt && Date.now() > expiresAt) {
        setIsCartExpired(true)
        setItems([])
        cartService.clearCart()
      }
    }

    loadCart()

    // Check expiration every minute
    const interval = setInterval(() => {
      const expiresAt = cartService.getExpirationTime()
      if (expiresAt && Date.now() > expiresAt) {
        setIsCartExpired(true)
        setItems([])
        cartService.clearCart()
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const addItem = (
    itemId: string,
    name: string,
    category: CartItem['category'],
    price: { usd: number; cup: number },
    quantity: number,
    maxAvailable: number
  ): { success: boolean; message: string } => {
    // Create a pseudo StoreItem for the service
    const pseudoItem = {
      id: itemId,
      name,
      category,
      price,
      quantity: maxAvailable,
      sellerName: '',
      gameFormat: 'TCG' as const,
      condition: '',
      expansionCode: '',
      rarity: '',
    }

    const result = cartService.addItem(pseudoItem, quantity)

    if (result.success) {
      setItems(cartService.getItems())
      setIsCartExpired(false)
      setToast({ message: result.message, type: 'success' })
      setTimeout(() => setToast(null), 2000)
    } else {
      setToast({ message: result.message, type: 'error' })
      setTimeout(() => setToast(null), 3000)
    }

    return result
  }

  const updateQuantity = (
    itemId: string,
    quantity: number,
    currentStock: number
  ): { success: boolean; message: string } => {
    const result = cartService.updateQuantity(itemId, quantity, currentStock)

    if (result.success) {
      setItems(cartService.getItems())
    }

    return result
  }

  const removeItem = (itemId: string): { success: boolean; message: string } => {
    const result = cartService.removeItem(itemId)

    if (result.success) {
      setItems(cartService.getItems())
    }

    return result
  }

  const clearCart = () => {
    cartService.clearCart()
    setItems([])
  }

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const validateCart = (currentItems: any[]) => {
    const result = cartService.validateCart(currentItems)
    if (result.updatedCart) {
      setItems(result.updatedCart)
    }
    return {
      valid: result.valid,
      warnings: result.warnings,
      invalidItems: result.invalidItems,
    }
  }

  const checkout = () => {
    cartService.checkout()
    setItems([])
    setIsOpen(false)
  }

  const summary = cartService.getSummary()

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems: summary.totalItems,
        totalUSD: summary.totalUSD,
        totalCUP: summary.totalCUP,
        isOpen,
        isCartExpired,
        toast,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        openCart,
        closeCart,
        validateCart,
        checkout,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
