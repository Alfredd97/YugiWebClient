import type { WhatsAppMessage } from '../../domain/entities/WhatsAppMessage'

export class WhatsAppService {
  private phoneNumber: string

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber
  }

  /**
   * Opens WhatsApp with a pre-filled message to the specified contact
   * @param message - The message object containing contact and message text
   */
  sendMessage(message: WhatsAppMessage): void {
    const encodedMessage = encodeURIComponent(message.message)
    const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  /**
   * Creates a WhatsApp click-to-chat link
   * @param message - The message object containing contact and message text
   * @returns The WhatsApp URL
   */
  createLink(message: WhatsAppMessage): string {
    const encodedMessage = encodeURIComponent(message.message)
    return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`
  }
}
