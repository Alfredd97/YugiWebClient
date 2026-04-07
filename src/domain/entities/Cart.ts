import type { CartItem } from './CartItem'

export interface Cart {
  items: CartItem[]
  createdAt: number
  updatedAt: number
  expiresAt?: number
}

export interface CartSummary {
  totalItems: number
  totalUSD: number
  totalCUP: number
}
