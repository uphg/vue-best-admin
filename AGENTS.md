# AGENTS.md - Vue-Best-Admin Development Guide

## Project Overview

Vue-Best-Admin is a modern Vue 3 admin dashboard template built with TypeScript, Vite, and cutting-edge technologies. This guide provides essential information for AI agents and developers working on this project.

## Development Environment Setup

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (package manager)
- VS Code with recommended extensions

### Quick Start Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test:unit

# Type checking
pnpm type-check

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## Development Guidelines

### File Naming Convention

- Use kebab-case for all files: `home-page.tsx`, `use-data-table.tsx`, `user-service.ts`
- Components use `.tsx` extension (TSX/JSX syntax)
- Utilities and services use `.ts` extension

### Code Style

- **Framework**: Vue 3 with Composition API
- **Syntax**: TSX components (not Single File Components)
- **Linting**: ESLint with @antfu/eslint-config (single quotes, no semicolons)
- **Styling**: UnoCSS for atomic CSS utilities
- **State Management**: Pinia stores
- **UI Library**: Naive UI components

### Project Structure

```
src/
├── api/                    # API service layer
├── components/             # Reusable components
│   ├── features/          # Feature-specific components
│   ├── layout/            # Layout components
│   └── ui/                # Generic UI components
├── hooks/                 # Custom composition hooks
├── pages/                 # Route page components
├── router/                # Vue Router configuration
├── stores/                # Pinia state stores
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## Testing Instructions

### Running Tests

```bash
# Run all unit tests
pnpm test:unit

# Run tests in watch mode
pnpm vitest

# Run specific test file
pnpm vitest run src/components/ui/button.test.ts

# Run tests with coverage
pnpm vitest --coverage
```

### Test Guidelines

- Write tests for all new components and utilities
- Use Vue Testing Library for component tests
- Place test files alongside the code they test
- Follow the naming pattern: `*.test.ts` or `*.spec.ts`

### Pre-commit Checks

The project uses git hooks to ensure code quality:

- ESLint runs automatically on staged files
- Fix any linting errors before committing
- Run `pnpm type-check` to ensure TypeScript compliance

## Key Technologies & Tools

### Core Stack

- **Vue 3** (3.5.17) - Reactive framework with Composition API
- **TypeScript** (5.8.0) - Type safety and developer experience
- **Vite** (7.0.0) - Fast build tool and dev server
- **Pinia** - Type-safe state management
- **Vue Router 4** - Client-side routing

### UI & Styling

- **Naive UI** - Vue 3 component library
- **UnoCSS** - Atomic CSS engine
- **Lucide Icons** - Icon system via unplugin-icons

### Development Tools

- **Vitest** - Unit testing framework
- **ESLint** - Code linting with @antfu/eslint-config
- **MSW** - Mock Service Worker for API mocking
- **VitePress** - Documentation generator

## Common Development Tasks

### Adding New Components

1. Create component in appropriate directory (`src/components/`)
2. Use TSX syntax with TypeScript
3. Export component as default
4. Add corresponding test file
5. Update exports in index files if needed

### Creating New Pages

1. Add page component in `src/pages/`
2. Register route in `src/router/router.ts`
3. Add route guards if authentication is required
4. Update navigation if needed

### Adding API Services

1. Create service file in `src/api/`
2. Use the centralized HTTP utility
3. Define TypeScript interfaces for request/response
4. Add MSW mock handlers for development

### State Management

1. Create Pinia store in `src/stores/`
2. Use Composition API syntax
3. Define typed state, getters, and actions
4. Import and use in components with `useStore()`

## Mock API Development

The project uses MSW (Mock Service Worker) for API mocking:

- Mock handlers are in `src/mocks/`
- MSW worker files are in `public/`
- Mocks are enabled in development mode
- Disable mocks for production builds

## Documentation

### VitePress Documentation

```bash
# Start documentation dev server
pnpm docs:dev

# Build documentation
pnpm docs:build

# Preview built documentation
pnpm docs:preview
```

Documentation source files are in the `docs/` directory.

## Troubleshooting

### Common Issues

1. **Import errors**: Check auto-imports in `auto-imports.d.ts`
2. **Type errors**: Run `pnpm type-check` for detailed TypeScript errors
3. **Linting issues**: Run `pnpm lint:fix` to auto-fix common problems
4. **Build failures**: Check for TypeScript errors and missing dependencies

### Performance Tips

- Use dynamic imports for route components
- Leverage Vue 3's tree-shaking capabilities
- Optimize UnoCSS by purging unused styles
- Use Vite's built-in optimizations

## Commit Guidelines

### Basic Rules

- Follow Conventional Commits
- Use English in your submission descriptions
- Do not include emoticons in your submissions

### Conventional Commits

Follow the Conventional Commits specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Example Commit Messages

```
feat: add user profile management page
fix: resolve navigation menu collapse issue
docs: update API documentation for user service
refactor: extract common form validation logic
test: add unit tests for data table component
```

## Security Considerations

- **Authentication**: Token-based auth with router guards
- **Route Protection**: Dynamic routes based on user permissions
- **Input Validation**: Sanitize all user inputs
- **XSS Prevention**: Use Vue's built-in template escaping
- **API Security**: Validate all API responses

## Performance Best Practices

- **Code Splitting**: Use dynamic imports for routes
- **Bundle Optimization**: Leverage Vite's tree-shaking
- **Component Optimization**: Use `defineAsyncComponent` for heavy components
- **State Management**: Keep stores focused and minimal
- **Asset Optimization**: Optimize images and icons

---

**Note**: This project uses TSX syntax instead of Single File Components (SFCs). All Vue components should be written using JSX/TSX with the Composition API.

For more detailed information, refer to the project's README.md and documentation in the `docs/` directory.
