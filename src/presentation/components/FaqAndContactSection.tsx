import { FaqItem } from '../../domain/entities/FaqItem'
import { ContactChannel } from '../../domain/entities/ContactChannel'
import { useTheme } from '../../theme/ThemeProvider'

interface FaqAndContactSectionProps {
  faqs: FaqItem[]
  contactChannels: ContactChannel[]
}

export const FaqAndContactSection = ({
  faqs,
  contactChannels,
}: FaqAndContactSectionProps) => {
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
          Contactar
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
          Siempre estamos a disposición de la comunidad. Puede contactarnos para presentar quejas,
          sugerencias o agradecer nuestro trabajo.
        </p>

        <div
          style={{
            borderRadius: radii.xl,
            border: `1px solid ${colors.borderStrong}`,
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)',
            backdropFilter: 'blur(20px)',
            padding: spacing.lg,
            boxShadow: shadows.medium,
            maxHeight: 400,
            overflow: 'auto',
          }}
        >
          {faqs.map((faq) => (
            <details
              key={faq.id}
              style={{
                borderBottom: `1px solid ${colors.borderSubtle}`,
                padding: `${spacing.md}px 0`,
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: spacing.md,
                  fontWeight: 600,
                  fontSize: 14,
                  color: colors.text,
                  transition: 'color var(--transition-fast)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.text)}
              >
                <span style={{ flex: 1 }}>{faq.question}</span>
                <span
                  aria-hidden
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: `1px solid ${colors.borderStrong}`,
                    background: 'rgba(15, 23, 42, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    color: colors.primary,
                    flexShrink: 0,
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  ?
                </span>
              </summary>
              <p
                style={{
                  marginTop: spacing.sm,
                  marginBottom: 0,
                  fontSize: 14,
                  color: colors.textMuted,
                  lineHeight: 1.6,
                }}
              >
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
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

