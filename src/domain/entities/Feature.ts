export class Feature {
  readonly id: string
  readonly title: string
  readonly description: string

  constructor(params: { id: string; title: string; description: string }) {
    this.id = params.id
    this.title = params.title
    this.description = params.description
  }
}

