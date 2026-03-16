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
    pill: number
  }
  shadows: {
    soft: string
    strong: string
  }
}

export const theme: AppTheme = {
  colors,
  spacing,
  typography,
  radii: {
    sm: 4,
    md: 8,
    lg: 16,
    pill: 999,
  },
  shadows: {
    soft: '0 18px 45px rgba(15,23,42,0.75)',
    strong: '0 25px 60px rgba(0,0,0,0.9)',
  },
}

