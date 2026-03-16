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
          Contactar
        </h2>
        <p
          style={{
            fontSize: typography.body.size,
            color: 'var(--color-text-muted)',
            maxWidth: 520,
            marginBottom: spacing.lg,
          }}
        >
          Siempre estamos a disposición de la comunidad. Puede contactarnos para presentar quejas,
          sugerencias o agradecer nuestro trabajo.
        </p>

        <div
          style={{
            borderRadius: 22,
            border: '1px solid rgba(31,41,55,0.95)',
            background:
              'radial-gradient(circle at top, rgba(15,23,42,0.95), rgba(15,23,42,1))',
            padding: spacing.lg,
            boxShadow: '0 24px 60px rgba(15,23,42,0.95)',
            maxHeight: 360,
            overflow: 'auto',
          }}
        >
          {faqs.map((faq) => (
            <details
              key={faq.id}
              style={{
                borderBottom: '1px solid rgba(31,41,55,0.75)',
                padding: `${spacing.sm}px 0`,
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: spacing.sm,
                  fontWeight: 500,
                  fontSize: 14,
                }}
              >
                <span>{faq.question}</span>
                <span
                  aria-hidden
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    border: '1px solid rgba(75,85,99,0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    color: 'rgba(148,163,184,0.9)',
                  }}
                >
                  ?
                </span>
              </summary>
              <p
                style={{
                  marginTop: spacing.xs,
                  marginBottom: 0,
                  fontSize: 14,
                  color: 'var(--color-text-muted)',
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
        {contactChannels.map((channel) => (
          <article
            key={channel.id}
            style={{
              borderRadius: 20,
              border: '1px solid rgba(31,41,55,0.95)',
              background:
                'radial-gradient(circle at top left, rgba(15,23,42,0.95), rgba(15,23,42,1))',
              padding: spacing.lg,
              boxShadow: '0 18px 45px rgba(15,23,42,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: spacing.lg,
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  marginBottom: spacing.xs,
                  fontSize: 16,
                }}
              >
                {channel.label}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  color: 'var(--color-text-muted)',
                  maxWidth: 260,
                }}
              >
                {channel.description}
              </p>
            </div>
            <button
              type="button"
              style={{
                borderRadius: 999,
                border: 'none',
                padding: '10px 20px',
                background:
                  channel.type === 'donation'
                    ? 'linear-gradient(135deg, #f97316, #facc15, #f97316)'
                    : 'linear-gradient(135deg, #22c55e, #4ade80, #22c55e)',
                color: '#020617',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: 0.08,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                boxShadow:
                  channel.type === 'donation'
                    ? '0 16px 40px rgba(251,191,36,0.7)'
                    : '0 16px 40px rgba(74,222,128,0.7)',
              }}
            >
              {channel.ctaLabel}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

