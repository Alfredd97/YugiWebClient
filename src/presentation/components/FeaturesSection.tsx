import { Feature } from '../../domain/entities/Feature'
import { Statistic } from '../../domain/entities/Statistic'
import { useTheme } from '../../theme/ThemeProvider'

interface FeaturesSectionProps {
  features: Feature[]
  statistics: Statistic[]
}

export const FeaturesSection = ({ features, statistics }: FeaturesSectionProps) => {
  const { spacing, colors, radii, shadows } = useTheme()

  return (
    <section
      style={{
        marginBottom: spacing.sectionPaddingY,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
        gap: spacing.xxl,
        alignItems: 'flex-start',
        position: 'relative',
      }}
    >
      <div>
        <h2
          style={{
            fontSize: 32,
            lineHeight: 1.2,
            fontWeight: 700,
            margin: 0,
            marginBottom: spacing.sm,
            background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Características
        </h2>
        <p
          style={{
            fontSize: 16,
            color: colors.textMuted,
            maxWidth: 520,
            marginBottom: spacing.lg,
            lineHeight: 1.6,
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
            gap: spacing.md,
          }}
        >
          {features.map((feature, index) => (
            <li
              key={feature.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: spacing.md,
                padding: spacing.md,
                borderRadius: radii.lg,
                background: 'rgba(15, 23, 42, 0.3)',
                border: `1px solid ${colors.borderSubtle}`,
                transition: 'all var(--transition-base)',
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(30, 41, 59, 0.5)'
                e.currentTarget.style.borderColor = colors.borderAccent
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(15, 23, 42, 0.3)'
                e.currentTarget.style.borderColor = colors.borderSubtle
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1, #a855f7, #f59e0b)',
                  marginTop: 2,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
                  fontSize: 12,
                }}
              >
                ✓
              </span>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 15,
                    marginBottom: 4,
                    color: colors.text,
                  }}
                >
                  {feature.title}
                </div>
                <p
                  style={{
                    margin: 0,
                    color: colors.textMuted,
                    fontSize: 14,
                    lineHeight: 1.5,
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
          borderRadius: radii.xl,
          border: `1px solid ${colors.borderStrong}`,
          background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)',
          backdropFilter: 'blur(20px)',
          padding: spacing.xl,
          boxShadow: shadows.strong,
          display: 'grid',
          gap: spacing.lg,
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: colors.textMuted,
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
          {statistics.map((stat, index) => (
            <div
              key={stat.id}
              style={{
                borderRadius: radii.lg,
                border: `1px solid ${colors.borderSubtle}`,
                background: 'rgba(2, 6, 23, 0.5)',
                padding: spacing.lg,
                display: 'flex',
                flexDirection: 'column',
                gap: spacing.xs,
                transition: 'all var(--transition-base)',
                position: 'relative',
                overflow: 'hidden',
                animation: `scaleIn 0.4s ease-out ${index * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.borderAccent
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.borderSubtle
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                }}
              >
                {stat.value.toLocaleString('es-ES')}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: colors.primary,
                  fontWeight: 600,
                }}
              >
                {stat.suffix}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: colors.textSubtle,
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

