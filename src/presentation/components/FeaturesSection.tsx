import { Feature } from '../../domain/entities/Feature'
import { useTheme } from '../../theme/ThemeProvider'

interface FeaturesSectionProps {
  features: Feature[]
}

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  const { spacing, colors, radii } = useTheme()

  return (
    <section
      className="features-section"
      style={{
        marginBottom: spacing.sectionPaddingY,
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
          Características:
        </h2>
        {/* <p
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
        </p> */}

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

    </section>
  )
}

