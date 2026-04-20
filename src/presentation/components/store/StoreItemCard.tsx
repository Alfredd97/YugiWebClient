import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { StoreItem } from '../../../domain/entities/StoreItem'
import type { DeckItem } from '../../../domain/entities/DeckItem'
import { useTheme } from '../../../theme/ThemeProvider'
import { useCurrency } from '../../../application/currency/CurrencyContext'
import { AddToCartButton } from '../cart/AddToCartButton'

interface StoreItemCardProps {
  item: StoreItem
}

export const StoreItemCard = ({ item }: StoreItemCardProps) => {
  const { spacing, colors, radii, shadows } = useTheme()
  const { cupPerUsd } = useCurrency()
  const navigate = useNavigate()
  const [carouselIndex, setCarouselIndex] = useState(0)

  const deckImages = item.category === 'decks' ? (item as DeckItem).imageUrls : []
  const hasCarousel = deckImages.length > 1
  const activeImage = hasCarousel ? deckImages[carouselIndex] : item.imageUrl

  const categoryStyles = {
    cards: {
      gradient: 'linear-gradient(145deg, #38bdf8, #0ea5e9)',
      glow: 'rgba(56, 189, 248, 0.15)',
      border: 'rgba(56, 189, 248, 0.3)',
      icon: '⚔️',
    },
    decks: {
      gradient: 'linear-gradient(145deg, #f97316, #ea580c)',
      glow: 'rgba(249, 115, 22, 0.15)',
      border: 'rgba(249, 115, 22, 0.3)',
      icon: '🎴',
    },
    accessories: {
      gradient: 'linear-gradient(145deg, #fbbf24, #f59e0b)',
      glow: 'rgba(251, 191, 36, 0.15)',
      border: 'rgba(251, 191, 36, 0.3)',
      icon: '🏆',
    },
  }

  const style = categoryStyles[item.category]

  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        borderRadius: radii.lg,
        border: `1px solid ${colors.borderStrong}`,
        background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.7) 100%)',
        backdropFilter: 'blur(20px)',
        padding: spacing.md,
        gap: spacing.md,
        boxShadow: shadows.medium,
        transition: 'all var(--transition-base)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 120,
      }}
      className="store-item-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = style.border
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = `0 12px 40px ${style.glow}, ${shadows.medium}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.borderStrong
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = shadows.medium
      }}
      onClick={() => {
          navigate(`/store/${item.category}/${item.id}`)
      }}

    >
      {/* Category accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: style.gradient,
        }}
      />

      {/* Product Image / Carousel */}
      <div
        style={{
          width: 90,
          height: 90,
          borderRadius: radii.md,
          border: `1px solid ${colors.borderSubtle}`,
          background: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          flexShrink: 0,
          alignSelf: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {activeImage ? (
          <img
            src={activeImage}
            alt={`${item.name} ${hasCarousel ? carouselIndex + 1 : ''}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          style.icon
        )}
        {hasCarousel && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setCarouselIndex((i) => (i - 1 + deckImages.length) % deckImages.length)
              }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 16,
                width: 28,
                background: 'rgba(0,0,0,0.4)',
                border: 'none',
                color: '#fff',
                fontSize: 10,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.15s',
              }}
              className="carousel-btn"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setCarouselIndex((i) => (i + 1) % deckImages.length)
              }}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 16,
                width: 28,
                background: 'rgba(0,0,0,0.4)',
                border: 'none',
                color: '#fff',
                fontSize: 10,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.15s',
              }}
              className="carousel-btn"
            >
              ›
            </button>
            <div
              style={{
                position: 'absolute',
                bottom: 2,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                gap: 3,
              }}
            >
              {deckImages.map((_, i) => (
                <span
                  key={i}
                  style={{
                    width: i === carouselIndex ? 10 : 4,
                    height: 4,
                    borderRadius: 2,
                    background: i === carouselIndex ? '#fbbf24' : 'rgba(255,255,255,0.4)',
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Info - Center */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
          minWidth: 0,
          gap: 4,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            flexWrap: 'wrap',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 700,
              color: colors.text,
              lineHeight: 1.3,
            }}
          >
            {item.name}
          </h3>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: radii.pill,
              border: `1px solid ${colors.borderSubtle}`,
              background: 'rgba(15, 23, 42, 0.6)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: colors.textMuted,
              flexShrink: 0,
            }}
          >
            {item.gameFormat}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.sm,
            fontSize: 11,
            color: colors.textMuted,
            flexWrap: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <span style={{ whiteSpace: 'nowrap' }}>
            <span style={{ color: colors.text, fontWeight: 500 }}>{item.condition}</span>
          </span>
          <span style={{ color: colors.borderSubtle, flexShrink: 0 }}>·</span>
          <span style={{ whiteSpace: 'nowrap' }}>
            <span style={{ color: colors.text, fontWeight: 500 }}>{item.rarity}</span>
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: spacing.sm,
            fontSize: 10,
            color: colors.textSubtle,
            flexWrap: 'nowrap',
          }}
        >
          <span
            style={{
              padding: '2px 6px',
              borderRadius: radii.sm,
              background: 'rgba(30, 41, 59, 0.5)',
              border: `1px solid ${colors.borderSubtle}`,
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.05em',
              flexShrink: 0,
            }}
          >
            {item.expansionCode}
          </span>
          <span style={{ color: colors.borderSubtle, flexShrink: 0 }}>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: item.quantity > 0 ? colors.accentGreen : colors.accentRed,
                boxShadow: `0 0 4px ${item.quantity > 0 ? colors.accentGreen : colors.accentRed}`,
              }}
            />
            <span style={{ color: item.quantity > 0 ? colors.accentGreen : colors.accentRed, fontWeight: 600 }}>
              {item.quantity > 0 ? `${item.quantity} disp.` : 'Agotado'}
            </span>
          </span>
        </div>
      </div>

      {/* Price and Add to Cart - Right */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: 6,
          paddingLeft: spacing.md,
          borderLeft: `1px solid ${colors.borderSubtle}`,
          flexShrink: 0,
        }}
      >
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
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
              fontSize: 9,
              color: colors.textMuted,
              marginTop: 2,
              fontWeight: 500,
            }}
          >
            ≈{(item.price.usd * cupPerUsd).toFixed(1)} CUP
          </div>
        </div>

        <AddToCartButton
          itemId={item.id}
          name={item.name}
          category={item.category}
          price={item.price}
          availableStock={item.quantity}
          size="sm"
        />
      </div>
    </article>
  )
}
