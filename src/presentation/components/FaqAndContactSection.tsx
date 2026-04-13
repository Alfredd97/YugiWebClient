import { FaqItem } from '../../domain/entities/FaqItem'
import { ContactChannel } from '../../domain/entities/ContactChannel'
import { useTheme } from '../../theme/ThemeProvider'

interface FaqAndContactSectionProps {
  faqs?: FaqItem[]
  contactChannels: ContactChannel[]
}

export const FaqAndContactSection = ({
  contactChannels,
}: FaqAndContactSectionProps) => {
  const { spacing, colors, radii, shadows } = useTheme()

  return (
    <section
      style={{
        marginBottom: spacing.sectionPaddingY,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: spacing.md,
        }}
      >
        {contactChannels.map((channel, index) => {
          const isDonation = channel.type === 'donation'
          const gradient = isDonation
            ? 'linear-gradient(135deg, #fb923c 0%, #fbbf24 50%, #f97316 100%)'
            : 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)'
          const glow = isDonation
            ? '0 0 30px rgba(251, 191, 36, 0.5)'
            : '0 0 30px rgba(74, 222, 128, 0.5)'

          return (
            <article
              key={channel.id}
              style={{
                borderRadius: radii.xl,
                border: `1px solid ${colors.borderStrong}`,
                background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                padding: spacing.lg,
                boxShadow: shadows.medium,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: spacing.lg,
                transition: 'all var(--transition-base)',
                animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = isDonation ? colors.accentOrange : colors.accentGreen
                e.currentTarget.style.transform = 'translateX(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.borderStrong
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    marginBottom: spacing.xs,
                    fontSize: 15,
                    fontWeight: 600,
                    color: colors.text,
                  }}
                >
                  {channel.label}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: colors.textMuted,
                    lineHeight: 1.5,
                  }}
                >
                  {channel.description}
                </p>
              </div>
              <button
                type="button"
                style={{
                  borderRadius: radii.pill,
                  border: 'none',
                  padding: '12px 22px',
                  background: gradient,
                  color: '#0a0e1a',
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  boxShadow: glow,
                  transition: 'all var(--transition-base)',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = glow.replace('0.5', '0.8')
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = glow
                }}
              >
                {channel.ctaLabel}
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}

