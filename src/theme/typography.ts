export const typography = {
  fontFamily: `'system-ui', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  heroTitle: {
    size: 40,
    weight: 800,
    lineHeight: 1.1,
  },
  sectionTitle: {
    size: 28,
    weight: 700,
    lineHeight: 1.2,
  },
  body: {
    size: 16,
    weight: 400,
    lineHeight: 1.6,
  },
  small: {
    size: 14,
    weight: 400,
    lineHeight: 1.5,
  },
} as const

export type TypographyScale = typeof typography

