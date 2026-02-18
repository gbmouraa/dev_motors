# AGENTS.md - Development Guidelines for dev-carros

## Project Overview

This is a Next.js 15 application with React 19, TypeScript, and Tailwind CSS. It uses Firebase for backend services (Firestore, Auth, Storage) and follows shadcn/ui component patterns.

## Build, Lint, and Test Commands

### Development
```bash
npm run dev     # Start development server on http://localhost:3000
```

### Build
```bash
npm run build   # Create production build
npm run start   # Start production server
```

### Linting
```bash
npm run lint    # Run ESLint
```

### Running a Single Test
**Note:** This project currently has no test framework installed. To run tests, first install a testing framework:

```bash
# Install Jest with React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom @types/jest ts-jest

# Run all tests
npm test

# Run a single test file
npm test -- CarItem.test.tsx

# Run tests in watch mode
npm test -- --watch

# Run tests matching a pattern
npm test -- --testNamePattern="CarItem"
```

## Code Style Guidelines

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── (admin)/           # Route group for admin pages
│   ├── (auth)/            # Route group for auth pages
│   ├── _components/      # Page-specific components
│   └── page.tsx           # Home page
├── components/            # Shared components
│   ├── car-item/
│   │   ├── index.tsx      # Main component (barrel export)
│   │   └── _components/  # Private sub-components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utilities and configs
│   ├── firebase/         # Firebase configuration and helpers
│   └── utils.ts          # cn() utility (clsx + twMerge)
├── types/                 # TypeScript type definitions (.d.ts files)
└── utils/                 # Helper functions
```

### TypeScript Conventions
- Use `.d.ts` files for global type definitions in `src/types/`
- Use TypeScript interfaces for object shapes
- Avoid `any`; use `unknown` if type is truly unknown
- Enable strict mode in tsconfig.json

### Component Patterns
- Use named exports for components: `export function ComponentName()`
- Create barrel exports in `index.tsx` files
- Sub-components in `_components/` folder are private (denoted by underscore)
- Use `page.tsx` for route pages, `layout.tsx` for layouts
- Use route groups `(groupName)/` for organizing routes

### Import Conventions
```typescript
// Group imports in this order:
// 1. React/Next built-ins
// 2. External libraries
// 3. Path aliases (@/...)
// 4. Relative imports

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/format-currency";
import { MapPin, Pencil, Trash } from "lucide-react";
import { CarItemProps, DeleteCarParams } from "@/types/car";
import { AlertDialogDeleteCar } from "./_components/alert-dialog-delete-car";
```

### Path Aliases
The project uses these path aliases:
- `@/*` maps to `./src/*`
- Use `@/components`, `@/lib`, `@/utils`, `@/types`, `@/hooks`

### Naming Conventions
- **Files**: kebab-case for utilities, PascalCase for components
- **Components**: PascalCase (e.g., `CarItem`, `AlertDialogDeleteCar`)
- **Functions**: camelCase (e.g., `formatCurrency`, `cn`)
- **Interfaces/Types**: PascalCase with `Props` suffix for component props
- **Booleans**: Use `is`, `has`, `should` prefixes (e.g., `isOnDashboard`)

### Tailwind CSS
- Uses Tailwind CSS v4 with `@tailwindcss/postcss`
- Uses shadcn/ui style (new-york) with CSS variables
- Use `cn()` utility for conditional class merging
- Prefix custom classes when needed (see components.json)

### Error Handling
- Use try/catch for async operations
- Handle Firebase errors appropriately
- Use TypeScript error boundaries for React errors

### Firebase Integration
- Store Firebase config in environment variables (NEXT_PUBLIC_*)
- Export initialized services from `src/lib/firebase/`
- Use server-side rendering where appropriate (Firebase client SDK)

### Form Handling
- Uses react-hook-form with zod for validation
- Uses @hookform/resolvers for Zod integration
- Define schemas in `src/utils/` or near component

### ESLint Configuration
- Extends `next/core-web-vitals` and `next/typescript`
- Allows `any` type (configured in eslint.config.mjs)
- Run lint before committing

### Best Practices
- Always run `npm run lint` before committing
- Use TypeScript strict mode
- Keep components focused and small
- Extract reusable logic into hooks or utilities
- Use proper TypeScript types instead of relying on inference
- Follow Next.js App Router conventions
