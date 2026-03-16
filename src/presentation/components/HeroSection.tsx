import { HeroContent } from '../../domain/entities/HeroContent'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../theme/ThemeProvider'

interface HeroSectionProps {
  hero: HeroContent
}

export const HeroSection = ({ hero }: HeroSectionProps) => {
  const { typography, spacing } = useTheme()
  const navigate = useNavigate()

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
        gap: spacing.xxl,
        alignItems: 'center',
        marginBottom: spacing.sectionPaddingY,
      }}
    >
      <div>
        <p
          style={{
            fontSize: 13,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: 'var(--color-primary-soft)',
            marginBottom: spacing.sm,
          }}
        >
          Comunidad Yu-Gi-Oh
        </p>
        <h1
          style={{
            fontSize: typography.heroTitle.size,
            lineHeight: typography.heroTitle.lineHeight,
            fontWeight: typography.heroTitle.weight,
            margin: 0,
            marginBottom: spacing.md,
          }}
        >
          {hero.title}
        </h1>
        <p
          style={{
            fontSize: typography.body.size,
            color: 'var(--color-text-muted)',
            maxWidth: 520,
            marginBottom: spacing.xl,
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
              borderRadius: 999,
              border: 'none',
              padding: '12px 26px',
              background:
                'linear-gradient(135deg, #facc15, #eab308, #f97316)',
              color: '#0f172a',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 0.08,
              textTransform: 'uppercase',
              boxShadow: '0 18px 40px rgba(251, 191, 36, 0.55)',
            }}
          >
            {hero.primaryCtaLabel}
          </button>
          <button
            type="button"
            onClick={() => navigate('/store/cards')}
            style={{
              borderRadius: 999,
              border: '1px solid rgba(148,163,184,0.6)',
              padding: '12px 26px',
              background:
                'radial-gradient(circle at top left, rgba(148,163,184,0.2), rgba(15,23,42,0.95))',
              color: '#e5e7eb',
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: 0.08,
              textTransform: 'uppercase',
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
          minHeight: 220,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 24,
            background:
              'conic-gradient(from 220deg, rgba(250,204,21,0.35), rgba(56,189,248,0.2), rgba(129,140,248,0.35), rgba(248,113,113,0.25))',
            opacity: 0.9,
            filter: 'blur(18px)',
          }}
        />
        <div
          style={{
            position: 'relative',
            borderRadius: 24,
            border: '1px solid rgba(55,65,81,0.9)',
            background:
              'radial-gradient(circle at top, #111827 0, #020617 65%, #000 100%)',
            padding: spacing.xl,
            boxShadow: '0 30px 80px rgba(15,23,42,0.95)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '-40%',
              opacity: 0.3,
              backgroundImage:
                'radial-gradient(circle at 10% 20%, rgba(248,250,252,0.12) 0, transparent 45%), radial-gradient(circle at 80% 10%, rgba(248,250,252,0.18) 0, transparent 40%), radial-gradient(circle at 50% 80%, rgba(250,204,21,0.18) 0, transparent 45%)',
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
                    fontSize: 13,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    color: 'rgba(156,163,175,0.9)',
                  }}
                >
                  Los dioses egipcios
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  Slifer · Obelisk · Ra
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: 999,
                  border: '1px solid rgba(55,65,81,0.9)',
                  backgroundColor: 'rgba(15,23,42,0.85)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background:
                      'conic-gradient(from 180deg, #f97316, #facc15, #a855f7, #38bdf8)',
                    boxShadow: '0 0 10px rgba(250,204,21,0.7)',
                  }}
                />
                Activo para la comunidad
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: spacing.md,
              }}
            >
              {['Slifer', 'Obelisk', 'Ra'].map((name, index) => (
                <div
                  key={name}
                  style={{
                    position: 'relative',
                    borderRadius: 18,
                    border: '1px solid rgba(55,65,81,0.9)',
                    background:
                      'radial-gradient(circle at top, rgba(15,23,42,0.9), rgba(15,23,42,1))',
                    padding: spacing.sm,
                    boxShadow:
                      index === 1
                        ? '0 0 35px rgba(248,250,252,0.25)'
                        : '0 0 20px rgba(15,23,42,0.9)',
                  }}
                >
                  <div
                    style={{
                      height: 80,
                      borderRadius: 14,
                      background:
                        index === 0
                          ? 'linear-gradient(145deg, #b91c1c, #f97316)'
                          : index === 1
                            ? 'linear-gradient(145deg, #4f46e5, #38bdf8)'
                            : 'linear-gradient(145deg, #facc15, #f97316)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#f9fafb',
                      fontWeight: 800,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      fontSize: 18,
                    }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: 1.5,
                      color: 'rgba(156,163,175,0.9)',
                    }}
                  >
                    Dios egipcio
                  </div>
                </div>
              ))}
            </div>

            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: 'rgba(156,163,175,0.9)',
              }}
            >
              Únase al duelo de monstruos, comercie cartas, decks y accesorios junto a toda la
              comunidad de YuGi Faction.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

