# Joshua Dinh - Portfolio

A personal portfolio built with Next.js 16, React 19, and TypeScript. Designed to showcase full-stack product engineering work through interactive case studies and thoughtful micro-interactions.

![Portfolio Preview](portfolio-image.png)

## Tech Stack

- **Framework** - Next.js 16 / React 19 / TypeScript
- **Styling** - SCSS Modules
- **Animation** - Framer Motion, custom RAF-based animations
- **Data Viz** - D3.js with TopoJSON for an interactive globe

## Features

- **Custom Cursor** - A smooth, easing cursor that expands on project hover with a "View" label. The dot animates from the "shipped." heading to the cursor position on scroll.
- **Interactive Globe** - A rotating D3-powered globe with city markers, draggable with inertia.
- **Scroll Reveals** - Staggered fade-in animations triggered by scroll position.
- **Magnetic Buttons** - Buttons that subtly pull toward the cursor within proximity.
- **Animated Number Tickers** - Counters that animate to their target values on reveal.

## Case Studies

- **YieldStream** - AI-powered underwriting platform for MCA brokers (Next.js, Supabase, Gemini AI, FastAPI)
- **GiveWP** - WordPress donation plugin with 100k+ active installs (React, PHP, Gutenberg)
- **Ledger** - Document intelligence microservice for financial data extraction (Python, FastAPI)
- **BubbleChat** - Multi-tenant embeddable AI chat widget (FastAPI, React, Web Components)

## Getting Started

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

## Project Structure

```
src/
  app/              # Next.js app router pages
  components/       # Shared components (CustomCursor, Reveal, MagneticButton, etc.)
  features/         # Feature modules organized by page
    home/           # Home page sections (Hero, SelectedWork, Timezone, About, Contact)
  shared/           # Shared utilities and types
```
