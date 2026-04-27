import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import type { StoreItemCategory } from '../../domain/entities/StoreItem'
import type { StoreItem } from '../../domain/entities/StoreItem'
import type { DeckItem } from '../../domain/entities/DeckItem'
import { StoreCatalogService } from '../../application/store/StoreCatalogService'
import { Layout } from '../components/Layout'
import { useTheme } from '../../theme/ThemeProvider'
import { AddToCartButton } from '../components/cart/AddToCartButton'
import { CheckoutService } from '../../application/messaging/CheckoutService'
import type { CartItem } from '../../domain/entities/CartItem'
import { useCurrency } from '../../application/currency/CurrencyContext'

const catalog = new StoreCatalogService()
const DEFAULT_PHONE_NUMBER = import.meta.env.VITE_WHATSAPP_PHONE as string

const isValidCategory = (value: string | undefined): value is StoreItemCategory => {
  return value === 'cards' || value === 'decks' || value === 'accessories'
}

export const StoreItemDetailsPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { spacing, colors, radii } = useTheme()
  const { cupPerUsd } = useCurrency()

  const [item, setItem] = useState<StoreItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [carouselIndex, setCarouselIndex] = useState(0)

  const rawCategory = params.category
  const id = params.id

  useEffect(() => {
    if (!isValidCategory(rawCategory) || !id) return
    setLoading(true)
    catalog.getItemById(rawCategory, id).then(setItem).finally(() => setLoading(false))
  }, [rawCategory, id])

  if (!isValidCategory(rawCategory) || !id) {
    return <Navigate to="/store/cards" replace />
  }

  if (loading) {
    return (
      <Layout>
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center' }}>Cargando...</p>
      </Layout>
    )
  }

  if (!item) {
    return <Navigate to={`/store/${rawCategory}`} replace />
  }

  if (!item) {
    return <Navigate to={`/store/${rawCategory}`} replace />
  }

  const categoryStyles = {
    cards: {
      gradient: 'linear-gradient(145deg, #38bdf8, #0ea5e9)',
      glow: 'rgba(56, 189, 248, 0.2)',
      border: 'rgba(56, 189, 248, 0.4)',
      icon: '⚔️',
    },
    decks: {
      gradient: 'linear-gradient(145deg, #f97316, #ea580c)',
      glow: 'rgba(249, 115, 22, 0.2)',
      border: 'rgba(249, 115, 22, 0.4)',
      icon: '🎴',
    },
    accessories: {
      gradient: 'linear-gradient(145deg, #fbbf24, #f59e0b)',
      glow: 'rgba(251, 191, 36, 0.2)',
      border: 'rgba(251, 191, 36, 0.4)',
      icon: '🏆',
    },
  }

  const style = categoryStyles[item.category]

  const checkoutService = new CheckoutService({
    phoneNumber: DEFAULT_PHONE_NUMBER,
    businessName: 'Yu-Gi-Oh-CMG',
  })

  const handleDirectCheckout = () => {
    const cartItem: CartItem = {
      itemId: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      quantity: 1,
      maxAvailable: item.quantity,
      addedAt: Date.now(),
    }
    checkoutService.checkoutViaWhatsApp([cartItem], item.price.usd, item.price.usd * cupPerUsd)
  }

  return (
    <Layout>
      <section
        className="product-details-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          gap: spacing.xl,
          marginBottom: spacing.sectionPaddingY,
          alignItems: 'start',
        }}
      >
        {/* Left Column - Product Info */}
        <div>
          {/* Breadcrumb */}
          <button
            type="button"
            onClick={() => navigate(`/store/${rawCategory}`)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              borderRadius: radii.pill,
              border: `1px solid ${colors.borderSubtle}`,
              padding: '8px 16px',
              background: 'rgba(15, 23, 42, 0.5)',
              backdropFilter: 'blur(8px)',
              color: colors.textMuted,
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              transition: 'all var(--transition-fast)',
              cursor: 'pointer',
              marginBottom: spacing.lg,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = colors.primary
              e.currentTarget.style.color = colors.text
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = colors.borderSubtle
              e.currentTarget.style.color = colors.textMuted
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Volver a {rawCategory === 'cards' ? 'cartas' : rawCategory === 'decks' ? 'decks' : 'accesorios'}
          </button>

          {/* Title */}
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: colors.primary,
              margin: 0,
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
              }}
            />
            Detalle de producto
          </p>

          <h1
            style={{
              fontSize: 42,
              lineHeight: 1.15,
              fontWeight: 900,
              margin: 0,
              marginBottom: spacing.md,
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {item.name}
          </h1>

          <p
            style={{
              fontSize: 15,
              color: colors.textMuted,
              maxWidth: 560,
              lineHeight: 1.7,
            }}
          >
            Explora los detalles de este producto disponible en la comunidad Yu-Gi-Oh-CMG.
          </p>

          {/* Info Grid */}
          <div
            style={{
              marginTop: spacing.xl,
              display: 'grid',
              gap: spacing.md,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: spacing.md,
              }}
            >
              {/* Left column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                <InfoRow
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  }
                  label="Formato"
                  value={item.gameFormat}
                  colors={colors}
                  radii={radii}
                />
                <InfoRow
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  }
                  label="Estado"
                  value={item.condition}
                  colors={colors}
                  radii={radii}
                />
              </div>

              {/* Right column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
                <InfoRow
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                    </svg>
                  }
                  label="Expansión"
                  value={item.expansionCode}
                  colors={colors}
                  radii={radii}
                />
                <InfoRow
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  }
                  label="Rareza"
                  value={item.rarity}
                  colors={colors}
                  radii={radii}
                />
                <InfoRow
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                  }
                  label="Disponibilidad"
                  value={`${item.quantity} unidades`}
                  valueColor={item.quantity > 0 ? colors.accentGreen : colors.accentRed}
                  colors={colors}
                  radii={radii}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Purchase Card */}
        <div
          style={{
            borderRadius: radii.xl,
            border: `1px solid ${style.border}`,
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            padding: spacing.xl,
            boxShadow: `0 24px 60px ${style.glow}`,
            position: 'sticky',
            top: 100,
          }}
        >
          {/* Product Visual */}
          {(() => {
            const deckImages = item.category === 'decks' ? (item as DeckItem).imageUrls : []
            const hasCarousel = deckImages.length > 1
            const activeImage = hasCarousel ? deckImages[carouselIndex] : item.imageUrl
            return (
              <div style={{ marginBottom: spacing.xl }}>
                <div
                  style={{
                    borderRadius: radii.lg,
                    border: `1px solid ${style.border}`,
                    background: style.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f9fafb',
                    fontSize: 64,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    boxShadow: 'inset 0 2px 20px rgba(0, 0, 0, 0.2), 0 8px 40px rgba(0, 0, 0, 0.4)',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {activeImage ? (
                    <img
                      src={activeImage}
                      alt={`${item.name} ${hasCarousel ? carouselIndex + 1 : ''}`}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  ) : (
                    style.icon
                  )}
                  {hasCarousel && (
                    <>
                      <button
                        type="button"
                        onClick={() => setCarouselIndex((i) => (i - 1 + deckImages.length) % deckImages.length)}
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 48,
                          background: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)',
                          border: 'none',
                          color: '#fff',
                          fontSize: 28,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() => setCarouselIndex((i) => (i + 1) % deckImages.length)}
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          bottom: 0,
                          width: 48,
                          background: 'linear-gradient(to left, rgba(0,0,0,0.5), transparent)',
                          border: 'none',
                          color: '#fff',
                          fontSize: 28,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
                {hasCarousel && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: spacing.sm }}>
                    {deckImages.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCarouselIndex(i)}
                        style={{
                          width: i === carouselIndex ? 20 : 8,
                          height: 8,
                          borderRadius: 4,
                          background: i === carouselIndex ? '#fbbf24' : 'rgba(255,255,255,0.25)',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          transition: 'all 0.2s',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })()}

          {/* Price Display */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: spacing.xl,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: colors.textSubtle,
                marginBottom: 8,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                fontWeight: 600,
              }}
            >
              Precio unitario
            </div>
            <div
              style={{
                fontSize: 42,
                fontWeight: 900,
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
              }}
            >
              ${item.price.usd.toFixed(2)}
            </div>
            <div
              style={{
                fontSize: 13,
                color: colors.textMuted,
                marginTop: 6,
                fontWeight: 500,
              }}
            >
              ≈{(item.price.usd * cupPerUsd).toFixed(1)} CUP
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
            <AddToCartButton
              itemId={item.id}
              name={item.name}
              category={item.category}
              price={item.price}
              availableStock={item.quantity}
              size="md"
              showText={true}
            />

            <button
              type="button"
              onClick={handleDirectCheckout}
              style={{
                borderRadius: radii.pill,
                border: 'none',
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
                transition: 'all var(--transition-base)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.4)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Comprar ahora
            </button>
          </div>

          <p
            style={{
              margin: 0,
              marginTop: spacing.md,
              fontSize: 11,
              color: colors.textSubtle,
              textAlign: 'center',
              lineHeight: 1.6,
            }}
          >
            Al hacer clic en "Comprar ahora", se abrirá WhatsApp para coordinar
            directamente con el vendedor.
          </p>
        </div>
      </section>
    </Layout>
  )
}

// Helper component for info rows
interface InfoRowProps {
  icon: React.ReactNode
  label: string
  value: string | number
  valueColor?: string
  colors: any
  radii: any
}

const InfoRow = ({ icon, label, value, valueColor, colors, radii }: InfoRowProps) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 16px',
      borderRadius: radii.md,
      background: 'rgba(15, 23, 42, 0.5)',
      border: `1px solid ${colors.borderSubtle}`,
    }}
  >
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: radii.sm,
        background: 'rgba(30, 41, 59, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.primary,
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 10, color: colors.textSubtle, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: valueColor ?? colors.text, fontWeight: 600 }}>
        {value}
      </div>
    </div>
  </div>
)

