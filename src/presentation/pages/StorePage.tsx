import { useEffect, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import type { StoreItemCategory } from '../../domain/entities/StoreItem'
import type { StoreItem } from '../../domain/entities/StoreItem'
import { StoreCatalogService } from '../../application/store/StoreCatalogService'
import { Layout } from '../components/Layout'
import { StoreCategoryTabs } from '../components/store/StoreCategoryTabs'
import { StoreItemCard } from '../components/store/StoreItemCard'
import { useTheme } from '../../theme/ThemeProvider'

const catalog = new StoreCatalogService()

const isValidCategory = (value: string | undefined): value is StoreItemCategory => {
  return value === 'cards' || value === 'decks' || value === 'accessories'
}

type SortOrder = 'none' | 'recent' | 'price-asc' | 'price-desc' | 'name'

export const StorePage = () => {
  const params = useParams()
  const rawCategory = params.category
  const { spacing, colors, radii, shadows } = useTheme()

  const [items, setItems] = useState<StoreItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')        // ← ADDED
  const [sortOrder, setSortOrder] = useState<SortOrder>('none') 

  const activeCategory: StoreItemCategory = isValidCategory(rawCategory) ? rawCategory : 'cards'

  useEffect(() => {
    setLoading(true)
    setSearchQuery('')     // ← ADDED: reset filters on category change
    setSortOrder('none')   // ← ADDED
    catalog.getItemsByCategory(activeCategory).then(setItems).finally(() => setLoading(false))
  }, [activeCategory])

  const displayedItems = useMemo(() => {
    let result = [...items]

    // Filter by search query (matches name or any string field)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter((item) =>
        item.name.toLowerCase().includes(q)
      )
    }

    // Sort
    switch (sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price.usd - b.price.usd)
        break
      case 'price-desc':
        result.sort((a, b) => b.price.usd - a.price.usd)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'recent':
        result.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      default:
        break
    }

    return result
  }, [items, searchQuery, sortOrder])

  if (!isValidCategory(rawCategory)) {
    return <Navigate to="/store/cards" replace />
  }

  const titleByCategory: Record<StoreItemCategory, string> = {
    cards: 'Todas las cartas',
    decks: 'Todos los decks',
    accessories: 'Todos los accesorios',
  }

  const subtitleByCategory: Record<StoreItemCategory, string> = {
    cards:
      'Explora las cartas disponibles en la comunidad YuGi Faction. Basado en la tienda de referencia.',
    decks:
      'Decks listos para jugar o mejorar tu estrategia. Listado de ejemplo inspirado en la tienda.',
    accessories:
      'Accesorios para tus duelos: playmats, fundas y más. Catálogo demostrativo.',
  }

  return (
    <Layout>
      <section
        style={{
          marginBottom: spacing.sectionPaddingY,
          position: 'relative',
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '30%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: spacing.xl,
            marginBottom: spacing.xl,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: colors.primary,
                marginBottom: spacing.md,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: colors.primary,
                  boxShadow: `0 0 16px ${colors.primaryGlow}`,
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
              Tienda YuGi Faction
            </p>

            <h1
              style={{
                fontSize: 48,
                lineHeight: 1.1,
                fontWeight: 900,
                margin: 0,
                marginBottom: spacing.md,
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 40px rgba(251, 191, 36, 0.3)',
              }}
            >
              {titleByCategory[activeCategory]}
            </h1>

            <p
              style={{
                fontSize: 15,
                color: colors.textMuted,
                maxWidth: 600,
                marginBottom: spacing.lg,
                lineHeight: 1.7,
              }}
            >
              {subtitleByCategory[activeCategory]}
            </p>

            <StoreCategoryTabs activeCategory={activeCategory} />
          </div>
        </div>

        {/* Filters Panel */}
        <div
          className="filters-panel"
          style={{
            borderRadius: radii.xl,
            border: `1px solid ${colors.borderStrong}`,
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            padding: spacing.lg,
            boxShadow: shadows.medium,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: spacing.lg,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: spacing.lg,
              flex: 1,
              minWidth: 0,
              width: '100%',
            }}
          >
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                color: colors.textMuted,
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                flex: 1,
                minWidth: 200,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                Buscar
              </span>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                style={{
                  borderRadius: radii.md,
                  border: `1px solid ${colors.borderSubtle}`,
                  backgroundColor: 'rgba(2, 6, 23, 0.6)',
                  padding: '12px 16px',
                  color: colors.text,
                  fontSize: 14,
                  fontWeight: 500,
                  outline: 'none',
                  transition: 'all var(--transition-fast)',
                }}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.8)'
                  e.currentTarget.style.boxShadow = `0 0 0 3px rgba(251, 191, 36, 0.2)`
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = colors.borderSubtle
                  e.currentTarget.style.backgroundColor = 'rgba(2, 6, 23, 0.6)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              />
            </label>

            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                color: colors.textMuted,
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                minWidth: 180,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 6h18M6 12h12M9 18h9" />
                </svg>
                Ordenar
              </span>
              <select
                style={{
                  borderRadius: radii.md,
                  border: `1px solid ${colors.borderSubtle}`,
                  backgroundColor: 'rgba(2, 6, 23, 0.6)',
                  padding: '12px 16px',
                  color: colors.text,
                  fontSize: 14,
                  fontWeight: 500,
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(colors.textMuted)}' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  paddingRight: 40,
                }}
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                defaultValue="none"
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = colors.primary
                  e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.8)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = colors.borderSubtle
                  e.currentTarget.style.backgroundColor = 'rgba(2, 6, 23, 0.6)'
                }}
              >
                <option value="none">Sin orden</option>
                <option value="recent">Más reciente</option>
                <option value="price-asc">Precio (menor a mayor)</option>
                <option value="price-desc">Precio (mayor a menor)</option>
                <option value="name">Nombre (A-Z)</option>
              </select>
            </label>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.sm,
              paddingBottom: '2px',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: colors.accentGreen,
                boxShadow: `0 0 8px ${colors.accentGreen}`,
              }}
            />
            <span style={{ fontSize: 12, color: colors.textMuted, fontWeight: 500 }}>
              {loading ? 'Cargando...' : `${displayedItems.length} productos`}
            </span>
          </div>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: spacing.md,
        }}
        className="store-grid"
      >
        {loading ? (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: radii.xl,
                  border: `1px solid ${colors.borderStrong}`,
                  background: 'rgba(15, 23, 42, 0.5)',
                  padding: spacing.lg,
                  display: 'grid',
                  gridTemplateColumns: '100px 1fr auto',
                  gap: spacing.lg,
                  alignItems: 'stretch',
                }}
              >
                <div style={{ borderRadius: radii.lg, background: 'rgba(30, 41, 59, 0.5)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
                  <div style={{ height: 20, borderRadius: radii.sm, background: 'rgba(30, 41, 59, 0.5)' }} />
                  <div style={{ height: 14, borderRadius: radii.sm, background: 'rgba(30, 41, 59, 0.5)', width: '70%' }} />
                  <div style={{ height: 14, borderRadius: radii.sm, background: 'rgba(30, 41, 59, 0.5)', width: '50%' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm, alignItems: 'flex-end' }}>
                  <div style={{ height: 28, width: 80, borderRadius: radii.sm, background: 'rgba(30, 41, 59, 0.5)' }} />
                  <div style={{ height: 32, width: 100, borderRadius: radii.pill, background: 'rgba(30, 41, 59, 0.5)' }} />
                </div>
              </div>
            ))}
          </>
        ) : displayedItems.length === 0 ? (
          <div
            style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: spacing.xxl,
              borderRadius: radii.xl,
              border: `1px dashed ${colors.borderStrong}`,
              background: 'rgba(15, 23, 42, 0.3)',
            }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.textSubtle}
              strokeWidth="1.5"
              style={{ opacity: 0.5, marginBottom: spacing.md }}
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p style={{ color: colors.text, fontSize: 16, fontWeight: 600, margin: 0 }}>
              No hay productos en esta categoría
            </p>
            <p style={{ color: colors.textMuted, fontSize: 13, marginTop: 8 }}>
              Explora otras categorías o vuelve más tarde
            </p>
          </div>
        ) : (
          displayedItems.map((item) => <StoreItemCard key={item.id} item={item} />)
        )}
      </section>
    </Layout>
  )
}

