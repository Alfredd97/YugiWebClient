export class Statistic {
  readonly id: string
  readonly label: string
  readonly value: number
  readonly suffix: string

  constructor(params: { id: string; label: string; value: number; suffix: string }) {
    this.id = params.id
    this.label = params.label
    this.value = params.value
    this.suffix = params.suffix
  }
}

