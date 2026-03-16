import { NavLink } from 'react-router-dom'
import type { StoreItemCategory } from '../../../domain/entities/StoreItem'
import { useTheme } from '../../../theme/ThemeProvider'

interface StoreCategoryTabsProps {
  activeCategory: StoreItemCategory
}

export const StoreCategoryTabs = ({ activeCategory }: StoreCategoryTabsProps) => {
  const { spacing } = useTheme()

  const categories: { id: StoreItemCategory; label: string }[] = [
    { id: 'cards', label: 'Cartas' },
    { id: 'decks', label: 'Decks' },
    { id: 'accessories', label: 'Accesorios' },
  ]

  return (
    <div
      style={{
        display: 'inline-flex',
        padding: 4,
        borderRadius: 999,
        border: '1px solid rgba(31,41,55,0.95)',
        background:
          'radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,0.96))',
        boxShadow: '0 16px 40px rgba(15,23,42,0.9)',
        gap: 2,
      }}
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id
        return (
          <NavLink
            key={cat.id}
            to={`/store/${cat.id}`}
            style={{
              borderRadius: 999,
              padding: `${spacing.xs}px ${spacing.lg}px`,
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.08,
              color: isActive ? '#020617' : '#e5e7eb',
              background: isActive
                ? 'linear-gradient(135deg, #facc15, #eab308, #f97316)'
                : 'transparent',
              border: isActive ? '1px solid rgba(250,204,21,0.9)' : '1px solid transparent',
              textDecoration: 'none',
            }}
          >
            {cat.label}
          </NavLink>
        )
      })}
    </div>
  )
}

