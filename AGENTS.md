# Vue-Best-Admin Development Guide (Optimized)

## Overview

A modern admin dashboard built with Vue 3 + TypeScript + Composition API, utilizing contemporary frontend tooling (Vite/pnpm) with strict coding standards and architectural conventions.

## Tech Stack

- **Core Framework**: Vue 3 + Composition API
- **Language**: TypeScript (TSX Syntax)
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Environment**: Node.js ≥ v20 (Ubuntu recommended)
- **UI Library**: Naive UI
- **Styling**: UnoCSS
- **State Management**: Pinia
- **Coding Standards**: Conventional Commits + ESLint

## Development Commands

```bash
pnpm install      # Install dependencies
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm test:unit    # Run unit tests
pnpm type-check   # Execute type checking
pnpm lint         # Code linting
```

## Code Standards

### File Naming

- Components/Pages: kebab-case (e.g., `user-profile.tsx`)
- Utilities: kebab-case (e.g., `data-formatter.ts`)

### Extension Convention

- Vue Components: `.tsx`
- Utilities/Helpers: `.ts`

### Code Style

- Single quotes
- Semicolon-free
- Linux line endings (LF)
- Avoid unnecessary formatting (format only modified code)

### Code Organization Principles

- Avoid premature abstraction: Single-line code (≤100 chars) used ≤2 times should not be extracted
- Prefer Composition API for logic organization

## Project Structure

```
src/
├── api/           # API layer
├── components/    # Reusable components
├── hooks/         # Composables
├── pages/         # Page components
├── router/        # Routing configuration
├── stores/        # State management (Pinia)
├── types/         # TypeScript definitions
└── utils/         # Utility functions
```

## Core Dependencies

- vue (v3) - Core framework
- typescript - Type system
- pinia - State management
- naive-ui - UI component library
- unocss - Atomic CSS engine
- vite - Build tool
- vue-router - Routing
