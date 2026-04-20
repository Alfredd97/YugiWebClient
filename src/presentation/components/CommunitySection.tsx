import { DeveloperProfile } from '../../domain/entities/DeveloperProfile'
import { Donor } from '../../domain/entities/Donor'
import { useTheme } from '../../theme/ThemeProvider'

interface CommunitySectionProps {
  developers: DeveloperProfile[]
  donors: Donor[]
}

export const CommunitySection = ({ developers, donors }: CommunitySectionProps) => {
  const { spacing, colors, radii, shadows } = useTheme()

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
          Desarrolladores
        </h2>
        <p
          style={{
            fontSize: 16,
            color: colors.textMuted,
            maxWidth: 480,
            marginBottom: spacing.lg,
            lineHeight: 1.6,
          }}
        >
          Personal que ha desarrollado o contribuido al proyecto Yu-Gi-Oh-CMG. Les agradecemos por
          todo su esfuerzo.
        </p>

        <div
          style={{
            display: 'grid',
            gap: spacing.md,
          }}
        >
          {developers
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((dev, index) => (
              <article
                key={dev.id}
                style={{
                  borderRadius: radii.xl,
                  border: `1px solid ${colors.borderStrong}`,
                  background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  padding: spacing.lg,
                  boxShadow: shadows.medium,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                  transition: 'all var(--transition-base)',
                  animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.primary
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.borderStrong
                  e.currentTarget.style.transform = 'translateX(0)'
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    border: `2px solid ${colors.primary}`,
                    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #f59e0b 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 22,
                    color: '#0a0e1a',
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                    flexShrink: 0,
                  }}
                >
                  {dev.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                      marginBottom: 4,
                      color: colors.text,
                    }}
                  >
                    {dev.name}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: colors.textMuted,
                      fontWeight: 500,
                    }}
                  >
                    {dev.role}
                  </p>
                </div>
              </article>
            ))}
        </div>
      </div>

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
          Donaciones
        </h2>
        <p
          style={{
            fontSize: 16,
            color: colors.textMuted,
            maxWidth: 420,
            marginBottom: spacing.lg,
            lineHeight: 1.6,
          }}
        >
          Usuarios que han donado voluntariamente al proyecto Yu-Gi-Oh-CMG. Gracias por su apoyo y
          por ayudarnos a seguir creciendo.
        </p>

        <div
          style={{
            borderRadius: radii.xl,
            border: `1px solid ${colors.borderStrong}`,
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)',
            backdropFilter: 'blur(20px)',
            padding: spacing.lg,
            boxShadow: shadows.medium,
            display: 'flex',
            flexWrap: 'wrap',
            gap: spacing.sm,
          }}
        >
          {donors.map((donor, index) => (
            <div
              key={donor.id}
              style={{
                borderRadius: radii.pill,
                border: `1px solid ${colors.borderSubtle}`,
                padding: '8px 14px',
                fontSize: 13,
                fontWeight: 500,
                background: 'rgba(2, 6, 23, 0.5)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: spacing.xs,
                transition: 'all var(--transition-fast)',
                animation: `scaleIn 0.3s ease-out ${index * 0.05}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.primary
                e.currentTarget.style.background = 'rgba(15, 23, 42, 0.7)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.borderSubtle
                e.currentTarget.style.background = 'rgba(2, 6, 23, 0.5)'
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #fb923c, #fbbf24, #4ade80, #38bdf8)',
                  boxShadow: '0 0 12px rgba(251, 191, 36, 0.8)',
                  flexShrink: 0,
                }}
              />
              {donor.displayName}
            </div>
          ))}

          <button
            type="button"
            style={{
              marginTop: spacing.md,
              borderRadius: radii.pill,
              border: 'none',
              padding: '12px 26px',
              background: 'linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #f97316 100%)',
              color: '#0a0e1a',
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 20px rgba(251, 191, 36, 0.5)',
              transition: 'all var(--transition-base)',
              width: '100%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(251, 191, 36, 0.7)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(251, 191, 36, 0.5)'
            }}
          >
            Donar
          </button>
        </div>
      </div>
    </section>
  )
}

