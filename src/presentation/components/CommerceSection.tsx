import { ProductCategory } from '../../domain/entities/ProductCategory'
import { CommerceBenefit } from '../../domain/entities/CommerceBenefit'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../theme/ThemeProvider'

interface CommerceSectionProps {
  categories: ProductCategory[]
  benefits: CommerceBenefit[]
}

export const CommerceSection = ({ categories, benefits }: CommerceSectionProps) => {
  const { spacing, typography } = useTheme()
  const navigate = useNavigate()

  return (
    <section
      style={{
        marginBottom: spacing.sectionPaddingY,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2.5fr) minmax(0, 3fr)',
        gap: spacing.xxl,
        alignItems: 'flex-start',
      }}
    >
      <div>
        <h2
          style={{
            fontSize: typography.sectionTitle.size,
            lineHeight: typography.sectionTitle.lineHeight,
            fontWeight: typography.sectionTitle.weight,
            margin: 0,
            marginBottom: spacing.sm,
          }}
        >
          Comerciar
        </h2>
        <p
          style={{
            fontSize: typography.body.size,
            color: 'var(--color-text-muted)',
            maxWidth: 520,
            marginBottom: spacing.lg,
          }}
        >
          Comercio de cartas, decks o accesorios de YU-GI-OH. Acceso a contactar con vendedores
          potenciales. Únase al duelo de monstruos.
        </p>
        <div
          style={{
            display: 'grid',
            gap: spacing.sm,
            fontSize: 14,
            color: 'var(--color-text-muted)',
          }}
        >
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: spacing.sm,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  marginTop: 7,
                  backgroundColor: '#22c55e',
                  boxShadow: '0 0 10px rgba(34,197,94,0.9)',
                  flexShrink: 0,
                }}
              />
              <p style={{ margin: 0 }}>
                <span
                  style={{
                    fontWeight: 600,
                    color: '#e5e7eb',
                  }}
                >
                  {benefit.title}
                </span>{' '}
                – {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gap: spacing.md,
        }}
      >
        {categories.map((category) => (
          <article
            key={category.id}
            style={{
              borderRadius: 22,
              border: '1px solid rgba(31,41,55,0.95)',
              background:
                'radial-gradient(circle at top, rgba(15,23,42,1), rgba(15,23,42,0.95))',
              padding: spacing.lg,
              boxShadow: '0 18px 50px rgba(15,23,42,0.95)',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 2.2fr) minmax(0, 1.8fr)',
              gap: spacing.lg,
              alignItems: 'center',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  color: 'rgba(148,163,184,0.9)',
                  marginBottom: 4,
                }}
              >
                {category.type === 'cards'
                  ? 'Cartas'
                  : category.type === 'decks'
                    ? 'Decks'
                    : 'Accesorios'}
              </p>
              <h3
                style={{
                  margin: 0,
                  marginBottom: spacing.sm,
                  fontSize: 18,
                }}
              >
                {category.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  marginBottom: spacing.sm,
                  fontSize: 14,
                  color: 'var(--color-text-muted)',
                }}
              >
                {category.description}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: 'rgba(148,163,184,0.95)',
                }}
              >
                Más de{' '}
                <span
                  style={{
                    color: '#facc15',
                    fontWeight: 700,
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
                  marginTop: spacing.sm,
                  borderRadius: 999,
                  border: '1px solid rgba(148,163,184,0.8)',
                  padding: '8px 18px',
                  background:
                    'radial-gradient(circle at top left, rgba(148,163,184,0.18), rgba(15,23,42,1))',
                  color: '#e5e7eb',
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 0.08,
                }}
              >
                Ir a {category.type === 'cards' ? 'cartas' : category.type === 'decks' ? 'decks' : 'accesorios'}
              </button>
            </div>
            <div
              style={{
                height: 130,
                borderRadius: 18,
                background:
                  category.type === 'cards'
                    ? 'radial-gradient(circle at 20% 0, #f97316, #b91c1c 55%, #020617 100%)'
                    : category.type === 'decks'
                      ? 'radial-gradient(circle at 20% 0, #38bdf8, #0f172a 55%, #020617 100%)'
                      : 'radial-gradient(circle at 20% 0, #facc15, #f97316 55%, #020617 100%)',
                border: '1px solid rgba(15,23,42,0.9)',
                boxShadow:
                  category.type === 'cards'
                    ? '0 0 45px rgba(248,113,113,0.7)'
                    : category.type === 'decks'
                      ? '0 0 45px rgba(56,189,248,0.7)'
                      : '0 0 45px rgba(250,204,21,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: 'uppercase',
                color: '#f9fafb',
              }}
            >
              {category.type === 'cards'
                ? 'Cartas'
                : category.type === 'decks'
                  ? 'Decks'
                  : 'Accesorios'}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

