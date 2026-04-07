import type { AppColors } from './colors'
import { colors } from './colors'
import type { SpacingScale } from './spacing'
import { spacing } from './spacing'
import type { TypographyScale } from './typography'
import { typography } from './typography'

export interface AppTheme {
  colors: AppColors
  spacing: SpacingScale
  typography: TypographyScale
  radii: {
    sm: number
    md: number
    lg: number
    xl: number
    pill: number
  }
  shadows: {
    soft: string
    medium: string
    strong: string
    glow: string
    glowStrong: string
  }
}

export const theme: AppTheme = {
  colors,
  spacing,
  typography,
  radii: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 24,
    pill: 999,
  },
  shadows: {
    soft: '0 4px 24px rgba(0, 0, 0, 0.3)',
    medium: '0 8px 40px rgba(0, 0, 0, 0.4)',
    strong: '0 20px 60px rgba(0, 0, 0, 0.5)',
    glow: '0 0 40px rgba(251, 191, 36, 0.3)',
    glowStrong: '0 0 60px rgba(251, 191, 36, 0.5)',
  },
}

