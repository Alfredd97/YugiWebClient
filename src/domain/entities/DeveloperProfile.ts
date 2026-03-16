export class DeveloperProfile {
  readonly id: string
  readonly name: string
  readonly role: string
  readonly order: number

  constructor(params: { id: string; name: string; role: string; order: number }) {
    this.id = params.id
    this.name = params.name
    this.role = params.role
    this.order = params.order
  }
}

