import { DeveloperProfile } from '../../domain/entities/DeveloperProfile'
import { Donor } from '../../domain/entities/Donor'
import { useTheme } from '../../theme/ThemeProvider'

interface CommunitySectionProps {
  developers: DeveloperProfile[]
  donors: Donor[]
}

export const CommunitySection = ({ developers, donors }: CommunitySectionProps) => {
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
          Desarrolladores
        </h2>
        <p
          style={{
            fontSize: typography.body.size,
            color: 'var(--color-text-muted)',
            maxWidth: 480,
            marginBottom: spacing.lg,
          }}
        >
          Personal que ha desarrollado o contribuido al proyecto YuGi Faction. Les agradecemos por
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
            .map((dev) => (
              <article
                key={dev.id}
                style={{
                  borderRadius: 20,
                  border: '1px solid rgba(31,41,55,0.95)',
                  background:
                    'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,1))',
                  padding: spacing.lg,
                  boxShadow: '0 18px 40px rgba(15,23,42,0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.md,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    border: '2px solid rgba(250,204,21,0.9)',
                    background:
                      'radial-gradient(circle at 25% 0, #4f46e5, #a855f7 45%, #f97316 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: 20,
                    color: '#f9fafb',
                    boxShadow: '0 0 26px rgba(129,140,248,0.7)',
                    flexShrink: 0,
                  }}
                >
                  {dev.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    {dev.name}
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: 'var(--color-text-muted)',
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
            fontSize: typography.sectionTitle.size,
            lineHeight: typography.sectionTitle.lineHeight,
            fontWeight: typography.sectionTitle.weight,
            margin: 0,
            marginBottom: spacing.sm,
          }}
        >
          Donaciones
        </h2>
        <p
          style={{
            fontSize: typography.body.size,
            color: 'var(--color-text-muted)',
            maxWidth: 420,
            marginBottom: spacing.lg,
          }}
        >
          Usuarios que han donado voluntariamente al proyecto YuGi Faction. Gracias por su apoyo y
          por ayudarnos a seguir creciendo.
        </p>

        <div
          style={{
            borderRadius: 22,
            border: '1px solid rgba(31,41,55,0.95)',
            background:
              'radial-gradient(circle at top, rgba(15,23,42,0.95), rgba(15,23,42,1))',
            padding: spacing.lg,
            boxShadow: '0 24px 60px rgba(15,23,42,0.95)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: spacing.md,
          }}
        >
          {donors.map((donor) => (
            <div
              key={donor.id}
              style={{
                borderRadius: 999,
                border: '1px solid rgba(55,65,81,0.9)',
                padding: '8px 16px',
                fontSize: 13,
                background:
                  'radial-gradient(circle at top, rgba(15,23,42,0.95), rgba(15,23,42,1))',
                display: 'inline-flex',
                alignItems: 'center',
                gap: spacing.xs,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background:
                    'conic-gradient(from 180deg, #f97316, #facc15, #22c55e, #38bdf8)',
                  boxShadow: '0 0 10px rgba(250,204,21,0.9)',
                }}
              />
              {donor.displayName}
            </div>
          ))}
          <button
            type="button"
            style={{
              marginTop: spacing.sm,
              borderRadius: 999,
              border: 'none',
              padding: '10px 22px',
              background:
                'linear-gradient(135deg, #f97316, #facc15, #f97316)',
              color: '#020617',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 0.08,
              textTransform: 'uppercase',
              boxShadow: '0 18px 40px rgba(251,191,36,0.7)',
            }}
          >
            Donar
          </button>
        </div>
      </div>
    </section>
  )
}

