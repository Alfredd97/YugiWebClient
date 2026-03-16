export type ContactChannelType = 'email' | 'whatsapp' | 'donation'

export class ContactChannel {
  readonly id: string
  readonly type: ContactChannelType
  readonly label: string
  readonly description: string
  readonly ctaLabel: string

  constructor(params: {
    id: string
    type: ContactChannelType
    label: string
    description: string
    ctaLabel: string
  }) {
    this.id = params.id
    this.type = params.type
    this.label = params.label
    this.description = params.description
    this.ctaLabel = params.ctaLabel
  }
}

