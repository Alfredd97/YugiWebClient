# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Vite)
npm run build    # Build for production (TypeScript + Vite)
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

## Architecture

**Clean Architecture** with three layers:

- `domain/entities/` - Enterprise business objects (Feature, StoreItem, etc.)
- `application/` - Business logic and services (HomePageContentService, StoreCatalogService)
- `presentation/` - UI layer with `pages/` (route components) and `components/` (reusable UI)

**Routing**: React Router DOM with routes defined in `App.tsx`:
- `/` - HomePage
- `/store/:category` - StorePage (cards, decks, accessories)
- `/store/:category/:id` - StoreItemDetailsPage

**Styling**: Custom theme system via `ThemeProvider` context with design tokens in `theme/` (colors, spacing, typography).

**Store Catalog**: `StoreCatalogService` fetches data from PocketBase via repositories (`StoreItemRepository`, `CurrencySettingsRepository`). Entity classes (`CardItem`, `DeckItem`, `AccessoryItem`) extend `StoreItem` base class.

**PocketBase Integration**:
- Collections: `cards`, `decks`, `accessories`, `currency_settings`
- Client: `src/infrastructure/pocketbase/PocketBaseClient.ts`
- Repositories: `src/infrastructure/repositories/`
- Environment: Set `VITE_PB_URL` for PocketBase server URL
