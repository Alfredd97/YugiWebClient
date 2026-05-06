import { ProductCategory } from '../../domain/entities/ProductCategory'
import { CommerceBenefit } from '../../domain/entities/CommerceBenefit'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../theme/ThemeProvider'

interface CommerceSectionProps {
  categories: ProductCategory[]
  benefits?: CommerceBenefit[]
}

export const CommerceSection = ({ categories }: CommerceSectionProps) => {
  const { spacing, colors, radii, shadows } = useTheme()
  const navigate = useNavigate()

  return (
    <section
      className="commerce-section"
      style={{
        marginBottom: spacing.sectionPaddingY,
      }}
    >
      <div
        className="commerce-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: spacing.md,
        }}
      >
        {categories.map((category, index) => {
          const categoryStyles = {
            cards: {
              gradient: 'linear-gradient(145deg, #dc2626, #f97316)',
              glow: '0 0 40px rgba(220, 38, 38, 0.4)',
              border: 'rgba(220, 38, 38, 0.3)',
            },
            decks: {
              gradient: 'linear-gradient(145deg, #4f46e5, #06b6d4)',
              glow: '0 0 40px rgba(79, 70, 229, 0.4)',
              border: 'rgba(79, 70, 229, 0.3)',
            },
            accessories: {
              gradient: 'linear-gradient(145deg, #fbbf24, #f59e0b)',
              glow: '0 0 40px rgba(251, 191, 36, 0.4)',
              border: 'rgba(251, 191, 36, 0.3)',
            },
            especiales: {
              gradient: 'linear-gradient(145deg, #7c3aed, #ec4899)',
              glow: '0 0 40px rgba(124, 58, 237, 0.4)',
              border: 'rgba(124, 58, 237, 0.3)',
            },
          }

          const style = categoryStyles[category.type]

          return (
            <article
              key={category.id}
              className="commerce-article"
              style={{
                borderRadius: radii.xl,
                border: `1px solid ${colors.borderStrong}`,
                background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                padding: spacing.lg,
                boxShadow: shadows.medium,
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)',
                gap: spacing.lg,
                alignItems: 'stretch',
                transition: 'all var(--transition-base)',
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.primary
                e.currentTarget.style.transform = 'translateX(-4px)'
                e.currentTarget.style.boxShadow = `${shadows.medium}, ${style.glow}`
              }}
              onClick={() => navigate(`/store/${category.type}`)}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.borderStrong
                e.currentTarget.style.transform = 'translateX(0)'
                e.currentTarget.style.boxShadow = shadows.medium
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: colors.textMuted,
                    marginBottom: 8,
                  }}
                >
                  {category.type === 'cards' ? 'Cartas' : category.type === 'decks' ? 'Decks' : category.type === 'accessories' ? 'Accesorios' : 'Especiales'}
                </p>
                <h3
                  style={{
                    margin: 0,
                    marginBottom: spacing.sm,
                    fontSize: 18,
                    fontWeight: 600,
                    color: colors.text,
                  }}
                >
                  {category.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    marginBottom: spacing.sm,
                    fontSize: 14,
                    color: colors.textMuted,
                    lineHeight: 1.5,
                  }}
                >
                  {category.description}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: colors.textSubtle,
                  }}
                >
                  Más de{' '}
                  <span
                    style={{
                      color: colors.primary,
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    {category.totalAvailable.toLocaleString('es-ES')}
                  </span>{' '}
                  {category.type}
                </p>
                <button
                  type="button"
                  onClick={() => navigate(`/store/${category.type}`)}
                  style={{
                    marginTop: 'auto',
                    alignSelf: 'flex-start',
                    borderRadius: radii.pill,
                    border: `1px solid ${colors.borderStrong}`,
                    padding: '10px 20px',
                    background: 'rgba(15, 23, 42, 0.5)',
                    backdropFilter: 'blur(8px)',
                    color: colors.text,
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    transition: 'all var(--transition-base)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.primary
                    e.currentTarget.style.color = colors.primary
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.borderStrong
                    e.currentTarget.style.color = colors.text
                  }}
                >
                  Ir a {category.type === 'cards' ? 'cartas' : category.type === 'decks' ? 'decks' : category.type === 'accessories' ? 'accesorios' : 'especiales'}
                </button>
              </div>

              <div
                style={{
                  height: 100,
                  borderRadius: radii.lg,
                  background: style.gradient,
                  border: `1px solid ${style.border}`,
                  boxShadow: style.glow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#f8fafc',
                }}
              >
                {category.type === 'cards' ? 'Cartas' : category.type === 'decks' ? 'Decks' : category.type === 'accessories' ? 'Accesorios' : 'Especiales'}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

