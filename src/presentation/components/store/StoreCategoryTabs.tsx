import { NavLink } from 'react-router-dom'
import type { StoreItemCategory } from '../../../domain/entities/StoreItem'
import { useTheme } from '../../../theme/ThemeProvider'

interface StoreCategoryTabsProps {
  activeCategory: StoreItemCategory
}

export const StoreCategoryTabs = ({ activeCategory }: StoreCategoryTabsProps) => {
  const { spacing, colors, radii } = useTheme()

  const categories: { id: StoreItemCategory; label: string }[] = [
    { id: 'cards', label: 'Cartas' },
    { id: 'decks', label: 'Decks' },
    { id: 'accessories', label: 'Accesorios' },
  ]

  return (
    <div
      style={{
        display: 'inline-flex',
        padding: 5,
        borderRadius: radii.pill,
        border: `1px solid ${colors.borderStrong}`,
        background: 'rgba(2, 6, 23, 0.6)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        gap: 4,
      }}
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id
        return (
          <NavLink
            key={cat.id}
            to={`/store/${cat.id}`}
            style={{
              borderRadius: radii.pill,
              padding: `8px ${spacing.lg}px`,
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: isActive ? '#0a0e1a' : colors.textMuted,
              background: isActive
                ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fb923c 100%)'
                : 'transparent',
              border: isActive ? 'none' : `1px solid ${colors.borderSubtle}`,
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = colors.text
                e.currentTarget.style.borderColor = colors.borderStrong
                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = colors.textMuted
                e.currentTarget.style.borderColor = colors.borderSubtle
                e.currentTarget.style.background = 'transparent'
              }
            }}
          >
            {cat.label}
          </NavLink>
        )
      })}
    </div>
  )
}

