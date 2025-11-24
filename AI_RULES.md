# AI Rules for Steam Key Generator

## Tech Stack Overview

- **Framework**: React 18 with TypeScript for type-safe component development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom dark theme (neon green accent color #CCFF00)
- **Animations**: Framer Motion for smooth transitions and gacha-style reveal animations
- **Icons**: Lucide React for consistent, lightweight icon components
- **Notifications**: React Hot Toast for user feedback and success/error messages
- **State Management**: React useState hooks (no external state management library)
- **Utilities**: Custom utility functions in `src/lib/utils.ts` for common operations
- **File Operations**: JSZip and FileSaver for exporting project source code

## Component Architecture Rules

### Component Organization
- Place all reusable UI components in `src/components/ui/`
- Place feature-specific components in `src/components/`
- Keep components small and focused (under 200 lines when possible)
- Use TypeScript interfaces for all component props

### Styling Guidelines
- **ALWAYS** use Tailwind CSS classes for styling
- Use the custom color palette: `neon`, `dark-bg`, `dark-card`, `dark-border`
- Apply hover effects and transitions for interactive elements
- Use `cn()` utility from `src/lib/utils.ts` for conditional class merging
- Maintain dark theme consistency across all components

### Animation Standards
- Use Framer Motion for complex animations (reveals, transitions, layout changes)
- Apply `motion.div` with `layout` prop for smooth list reordering
- Use `animate-in`, `fade-in`, `slide-in` Tailwind utilities for simple animations
- Implement gacha-style animations for key reveals (rapid random key generation)

## Library Usage Rules

### When to Use Each Library

**Framer Motion** - Use for:
- Component enter/exit animations
- Layout animations when items reorder
- Complex gesture-based interactions
- Staggered list animations

**React Hot Toast** - Use for:
- Success/error notifications
- User action feedback
- Temporary status messages
- Custom styled toasts with dark theme

**Lucide React** - Use for:
- All icon needs throughout the app
- Consistent icon sizing (w-4 h-4, w-5 h-5, etc.)
- Icons in buttons, headers, and UI elements

**JSZip + FileSaver** - Use for:
- Exporting project source code
- Creating downloadable backup files
- Any file download functionality

### What NOT to Use

- ❌ Do NOT add additional state management libraries (Redux, Zustand, etc.)
- ❌ Do NOT use CSS-in-JS libraries (styled-components, emotion)
- ❌ Do NOT add UI component libraries (Material-UI, Ant Design)
- ❌ Do NOT use alternative icon libraries
- ❌ Do NOT add form libraries (React Hook Form, Formik) - use native forms

## Code Style Rules

### TypeScript
- Always define interfaces for component props
- Use type inference where possible
- Export types/interfaces that are used across multiple files
- Use `React.FC` sparingly; prefer explicit prop typing

### React Patterns
- Use functional components exclusively
- Prefer `useState` and `useEffect` hooks
- Use `useMemo` for expensive computations or filtered lists
- Keep event handlers inline or define them within the component

### File Naming
- Components: PascalCase (e.g., `GameRow.tsx`, `AddGameModal.tsx`)
- Utilities: camelCase (e.g., `utils.ts`, `downloader.ts`)
- UI components: PascalCase in `ui/` folder (e.g., `Button.tsx`, `Input.tsx`)

## Feature Implementation Guidelines

### Adding New Features
1. Create new components in appropriate directories
2. Use existing UI components from `src/components/ui/`
3. Maintain the dark theme with neon accents
4. Add toast notifications for user actions
5. Implement responsive design (mobile-first approach)
6. Use Framer Motion for any animations

### Data Management
- Store app state in component-level `useState`
- Use `useMemo` for derived/filtered data
- Keep mock data in the main App component
- Export data as JSON for backups

### User Feedback
- Show toast on successful actions (green/success theme)
- Show toast on errors (red/error theme)
- Use loading states for async operations
- Provide visual feedback on hover/click

## Design System

### Colors
- Primary accent: `neon` (#CCFF00)
- Background: `dark-bg` (#0f1014)
- Cards: `dark-card` (#1a1c23)
- Borders: `dark-border` (#2a2d3a)
- Text: `slate-200` (primary), `slate-500` (secondary)

### Spacing
- Use Tailwind spacing scale (p-4, gap-3, mb-8, etc.)
- Maintain consistent padding in cards (p-4 to p-6)
- Use gap utilities for flex/grid layouts

### Typography
- Headers: `font-bold` or `font-black`
- Body: default weight
- Monospace: `font-mono` for keys and IDs
- Use `text-glow` utility for neon text effects

## Performance Considerations

- Use `useMemo` for filtering large lists
- Implement `React.memo` only when necessary
- Lazy load images with proper loading states
- Keep bundle size minimal (avoid unnecessary dependencies)

## Accessibility

- Ensure all interactive elements are keyboard accessible
- Use semantic HTML elements
- Provide proper ARIA labels where needed
- Maintain sufficient color contrast

## Testing & Debugging

- Test all features in both light and dark environments
- Verify responsive behavior on mobile/tablet/desktop
- Check toast notifications appear correctly
- Ensure animations don't cause performance issues

---

**Remember**: This is a dark-themed, gaming-inspired UI with neon accents. Keep the aesthetic consistent, use smooth animations, and provide clear user feedback for all actions.