export class FaqItem {
  readonly id: string
  readonly question: string
  readonly answer: string

  constructor(params: { id: string; question: string; answer: string }) {
    this.id = params.id
    this.question = params.question
    this.answer = params.answer
  }
}

