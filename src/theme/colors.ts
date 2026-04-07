export const colors = {
  // Backgrounds - deeper, richer darks
  background: '#0a0e1a',
  backgroundAlt: '#0d1120',
  backgroundGradient: 'linear-gradient(180deg, #0a0e1a 0%, #0d1120 50%, #050810 100%)',

  // Surfaces with glassmorphism support
  surface: 'rgba(15, 23, 42, 0.7)',
  surfaceAlt: 'rgba(2, 6, 23, 0.8)',
  surfaceGlass: 'rgba(15, 23, 42, 0.5)',

  // Primary - vibrant gold with variants
  primary: '#fbbf24',
  primaryHover: '#f59e0b',
  primarySoft: 'rgba(251, 191, 36, 0.15)',
  primaryGlow: 'rgba(251, 191, 36, 0.4)',

  // Text - cleaner hierarchy
  text: '#f8fafc',
  textMuted: '#94a3b8',
  textSubtle: '#64748b',

  // Borders - subtle and layered
  borderSubtle: 'rgba(51, 65, 85, 0.5)',
  borderStrong: 'rgba(71, 85, 105, 0.8)',
  borderAccent: 'rgba(251, 191, 36, 0.3)',

  // Accents - more vibrant
  accentRed: '#f87171',
  accentBlue: '#38bdf8',
  accentPurple: '#a78bfa',
  accentGreen: '#4ade80',
  accentOrange: '#fb923c',

  // Gradients
  gradientPrimary: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fb923c 100%)',
  gradientHero: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #f59e0b 100%)',
  gradientCard: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)',
  gradientGlow: 'conic-gradient(from 180deg, #6366f1, #a855f7, #f59e0b, #fb923c)',
} as const

export type AppColors = typeof colors

