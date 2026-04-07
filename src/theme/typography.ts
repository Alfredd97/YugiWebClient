export const typography = {
  fontFamily: `'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,

  // Display / Hero
  display: {
    size: 56,
    weight: 800,
    lineHeight: 1.05,
    letterSpacing: '-0.02em',
  },
  heroTitle: {
    size: 48,
    weight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.015em',
  },

  // Section headers
  sectionTitle: {
    size: 32,
    weight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
  },
  sectionSubtitle: {
    size: 18,
    weight: 400,
    lineHeight: 1.5,
    color: 'var(--color-text-muted)',
  },

  // Body text
  body: {
    size: 16,
    weight: 400,
    lineHeight: 1.6,
  },
  bodySmall: {
    size: 14,
    weight: 400,
    lineHeight: 1.5,
  },

  // Labels and captions
  label: {
    size: 12,
    weight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
  },
  caption: {
    size: 13,
    weight: 400,
    lineHeight: 1.4,
    color: 'var(--color-text-subtle)',
  },

  // Numbers and stats
  statNumber: {
    size: 36,
    weight: 800,
    lineHeight: 1,
    letterSpacing: '-0.02em',
  },
} as const

export type TypographyScale = typeof typography

