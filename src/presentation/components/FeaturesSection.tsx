import { Feature } from '../../domain/entities/Feature'
import { Statistic } from '../../domain/entities/Statistic'
import { useTheme } from '../../theme/ThemeProvider'

interface FeaturesSectionProps {
  features: Feature[]
  statistics: Statistic[]
}

export const FeaturesSection = ({ features, statistics }: FeaturesSectionProps) => {
  const { spacing, typography } = useTheme()

  return (
    <section
      style={{
        marginBottom: spacing.sectionPaddingY,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
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
          Características
        </h2>
        <p
          style={{
            fontSize: typography.body.size,
            color: 'var(--color-text-muted)',
            maxWidth: 520,
            marginBottom: spacing.lg,
          }}
        >
          Tenemos el objetivo de agrupar a toda la comunidad de YU-GI-OH y hacer de esta una gran
          nación.
        </p>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: spacing.sm,
          }}
        >
          {features.map((feature) => (
            <li
              key={feature.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: spacing.sm,
                fontSize: typography.body.size,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 30% 0, #facc15, #a855f7 55%, #0ea5e9 100%)',
                  marginTop: 4,
                  flexShrink: 0,
                  boxShadow: '0 0 18px rgba(250,204,21,0.7)',
                }}
              />
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  {feature.title}
                </div>
                <p
                  style={{
                    margin: 0,
                    color: 'var(--color-text-muted)',
                    fontSize: 14,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          borderRadius: 24,
          border: '1px solid rgba(55,65,81,0.9)',
          background:
            'radial-gradient(circle at top, #020617 0, #020617 55%, #000 100%)',
          padding: spacing.xl,
          boxShadow: '0 26px 60px rgba(15,23,42,0.95)',
          display: 'grid',
          gap: spacing.md,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 1.4,
            textTransform: 'uppercase',
            color: 'rgba(156,163,175,0.9)',
          }}
        >
          Números de la comunidad
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: spacing.md,
          }}
        >
          {statistics.map((stat) => (
            <div
              key={stat.id}
              style={{
                borderRadius: 18,
                border: '1px solid rgba(31,41,55,0.95)',
                background:
                  'radial-gradient(circle at top left, rgba(15,23,42,0.9), rgba(15,23,42,1))',
                padding: spacing.md,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.xs,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: 1,
                  color: '#facc15',
                }}
              >
                {stat.value.toLocaleString('es-ES')}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: 'rgba(148,163,184,0.95)',
                }}
              >
                {stat.suffix}
              </div>
              <div
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: 1.2,
                  color: 'rgba(107,114,128,0.95)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

