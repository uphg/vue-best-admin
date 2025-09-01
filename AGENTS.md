# Vue-Best-Admin Development Guide

## Basic Information

- **Framework**: Vue 3 + TSX + Composition API
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Environment**: Node.js v20+, Ubuntu
- **Git Commit**: Conventional Commits

## Development Commands

```bash
pnpm install    # Install dependencies
pnpm dev        # Start dev server
pnpm build      # Production build
pnpm test:unit  # Unit tests
pnpm type-check # Type checking
pnpm lint       # Code linting
```

## Code Standards

- **File Naming**: kebab-case (`user-profile.tsx`)
- **Components**: `.tsx` extension
- **Utilities**: `.ts` extension
- **Code Style**: Single quotes, no semicolons

## Project Structure

```
src/
├── api/         # API services
├── components/  # Components
├── hooks/       # Composables
├── pages/       # Page components
├── router/      # Routing
├── stores/      # State management
├── types/       # Type definitions
└── utils/       # Utility functions
```

## Core Dependencies

- **Vue 3** - Core framework
- **TypeScript** - Type safety
- **Pinia** - State management
- **Naive UI** - UI components
- **UnoCSS** - Styling engine
