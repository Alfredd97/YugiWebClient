import { HeroContent } from '../../domain/entities/HeroContent'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../theme/ThemeProvider'

interface HeroSectionProps {
  hero: HeroContent
}

export const HeroSection = ({ hero }: HeroSectionProps) => {
  const { spacing, colors, radii, shadows } = useTheme()
  const navigate = useNavigate()

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
        gap: spacing.xxl,
        alignItems: 'center',
        marginBottom: spacing.sectionPaddingY,
        position: 'relative',
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      <div>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: colors.primary,
            marginBottom: spacing.md,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: colors.primary,
              boxShadow: `0 0 12px ${colors.primaryGlow}`,
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          Comunidad Yu-Gi-Oh
        </p>

        <h1
          style={{
            fontSize: 52,
            lineHeight: 1.05,
            fontWeight: 800,
            margin: 0,
            marginBottom: spacing.md,
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {hero.title}
        </h1>

        <p
          style={{
            fontSize: 18,
            color: colors.textMuted,
            maxWidth: 520,
            marginBottom: spacing.xl,
            lineHeight: 1.6,
          }}
        >
          {hero.subtitle}
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: spacing.md,
          }}
        >
          <button
            type="button"
            onClick={() => navigate('/store/cards')}
            style={{
              borderRadius: radii.pill,
              border: 'none',
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fb923c 100%)',
              color: '#0a0e1a',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 24px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251, 191, 36, 0.2)',
              transition: 'all var(--transition-base)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(251, 191, 36, 0.5), 0 0 60px rgba(251, 191, 36, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251, 191, 36, 0.2)'
            }}
          >
            {hero.primaryCtaLabel}
          </button>

          <button
            type="button"
            onClick={() => navigate('/store/cards')}
            style={{
              borderRadius: radii.pill,
              border: `1px solid ${colors.borderStrong}`,
              padding: '14px 32px',
              background: 'rgba(15, 23, 42, 0.5)',
              backdropFilter: 'blur(8px)',
              color: colors.text,
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              transition: 'all var(--transition-base)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(30, 41, 59, 0.6)'
              e.currentTarget.style.borderColor = colors.primary
              e.currentTarget.style.color = colors.primary
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)'
              e.currentTarget.style.borderColor = colors.borderStrong
              e.currentTarget.style.color = colors.text
            }}
          >
            {hero.secondaryCtaLabel}
          </button>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          height: '100%',
          minHeight: 280,
        }}
      >
        {/* Glow effect behind card */}
        <div
          style={{
            position: 'absolute',
            inset: '-10%',
            borderRadius: 28,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.15), rgba(251, 191, 36, 0.2))',
            filter: 'blur(40px)',
            opacity: 0.6,
            animation: 'glow 3s ease-in-out infinite',
          }}
        />

        <div
          style={{
            position: 'relative',
            borderRadius: radii.xl,
            border: `1px solid ${colors.borderStrong}`,
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
            backdropFilter: 'blur(20px)',
            padding: spacing.xl,
            boxShadow: `${shadows.strong}, inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
            overflow: 'hidden',
            animation: 'float 6s ease-in-out infinite',
          }}
        >
          {/* Inner shimmer */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.03) 50%, transparent 60%)',
              backgroundSize: '200% 200%',
              animation: 'shimmer 3s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: spacing.lg,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: spacing.md,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: colors.textMuted,
                    marginBottom: 4,
                  }}
                >
                  Los dioses egipcios
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Slifer · Obelisk · Ra
                </div>
              </div>

              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '6px 12px',
                  borderRadius: radii.pill,
                  border: `1px solid ${colors.borderSubtle}`,
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(8px)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fb923c, #fbbf24, #a855f7, #38bdf8)',
                    boxShadow: '0 0 12px rgba(251, 191, 36, 0.8)',
                  }}
                />
                Activo
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: spacing.md,
              }}
            >
              {['Slifer', 'Obelisk', 'Ra'].map((name, index) => {
                const gradients = [
                  'linear-gradient(145deg, #dc2626, #f97316)',
                  'linear-gradient(145deg, #4f46e5, #06b6d4)',
                  'linear-gradient(145deg, #fbbf24, #f59e0b)',
                ]
                const glows = [
                  '0 0 25px rgba(220, 38, 38, 0.5)',
                  '0 0 35px rgba(79, 70, 229, 0.5)',
                  '0 0 25px rgba(251, 191, 36, 0.5)',
                ]

                return (
                  <div
                    key={name}
                    style={{
                      position: 'relative',
                      borderRadius: radii.lg,
                      border: `1px solid ${colors.borderStrong}`,
                      background: 'rgba(15, 23, 42, 0.8)',
                      padding: spacing.md,
                      boxShadow: `${glows[index]}, inset 0 1px 0 rgba(255, 255, 255, 0.05)`,
                      transition: 'transform var(--transition-base), box-shadow var(--transition-base)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = glows[index].replace('0.5', '0.8')
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = glows[index]
                    }}
                  >
                    <div
                      style={{
                        height: 70,
                        borderRadius: radii.md,
                        background: gradients[index],
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#f8fafc',
                        fontWeight: 800,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        fontSize: 14,
                        boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        fontSize: 10,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: colors.textSubtle,
                        textAlign: 'center',
                      }}
                    >
                      Dios egipcio
                    </div>
                  </div>
                )
              })}
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: colors.textMuted,
                lineHeight: 1.5,
              }}
            >
              Únase al duelo de monstruos, comercie cartas, decks y accesorios junto a toda la
              comunidad de <span style={{ color: colors.primary, fontWeight: 600 }}>YuGi Faction</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

