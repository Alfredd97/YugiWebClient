import type { CartItem } from '../../domain/entities/CartItem'

export interface CheckoutConfig {
  phoneNumber: string
  businessName: string
}

export class CheckoutService {
  private config: CheckoutConfig

  constructor(config: CheckoutConfig) {
    this.config = config
  }

  /**
   * Format cart items into a WhatsApp message
   */
  private formatCartMessage(items: CartItem[], totalUSD: number, totalCUP: number, shippingCUP: number): string {
    const header = `🛒 *Pedido - ${this.config.businessName}*\n\n`

    const itemsList = items
      .map((item, index) => {
        return `${index + 1}. *${item.name}* (${item.category})\n` +
          `   Cantidad: ${item.quantity}x\n` +
          `   Precio: $${item.price.usd.toFixed(2)} USD\n` +
          `   Subtotal: $${(item.price.usd * item.quantity).toFixed(2)} USD`
      })
      .join('\n\n')

    const hasDeck = items.some((i) => i.category === 'decks')
    const shippingLines = hasDeck
      ? `\n   🎴 Envío con deck: 300 CUP`
      : `\n   📦 Envío estándar: 100 CUP`

    const totals = `\n\n───────────────────\n` +
      `*TOTAL: $${totalUSD.toFixed(2)} USD*\n` +
      `(≈${totalCUP.toFixed(0)} CUP)\n` +
      `\n🚚 *Envío: ${shippingCUP} CUP*${shippingLines}\n` +
      `\n💰 *TOTAL CON ENVÍO: ${(totalCUP + shippingCUP).toFixed(0)} CUP*\n` +
      `───────────────────`

    const footer = `\n\nHola, quiero completar la compra de estos productos. ` +
      `¿Me pueden ayudar con el pago y envío?`

    return header + itemsList + totals + footer
  }

  /**
   * Open WhatsApp with the checkout message
   */
  checkoutViaWhatsApp(items: CartItem[], totalUSD: number, totalCUP: number, shippingCUP: number): void {
    const message = this.formatCartMessage(items, totalUSD, totalCUP, shippingCUP)
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${this.config.phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  /**
   * Create a WhatsApp checkout link (without opening)
   */
  createCheckoutLink(items: CartItem[], totalUSD: number, totalCUP: number, shippingCUP: number): string {
    const message = this.formatCartMessage(items, totalUSD, totalCUP, shippingCUP)
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${this.config.phoneNumber}?text=${encodedMessage}`
  }
}
