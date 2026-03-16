export class Donor {
  readonly id: string
  readonly displayName: string

  constructor(params: { id: string; displayName: string }) {
    this.id = params.id
    this.displayName = params.displayName
  }
}

