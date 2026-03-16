export class HeroContent {
  readonly title: string
  readonly subtitle: string
  readonly primaryCtaLabel: string
  readonly secondaryCtaLabel: string

  constructor(params: {
    title: string
    subtitle: string
    primaryCtaLabel: string
    secondaryCtaLabel: string
  }) {
    this.title = params.title
    this.subtitle = params.subtitle
    this.primaryCtaLabel = params.primaryCtaLabel
    this.secondaryCtaLabel = params.secondaryCtaLabel
  }
}

