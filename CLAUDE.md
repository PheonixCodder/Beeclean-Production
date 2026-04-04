# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4, shadcn/ui
- **Animations:** Framer Motion (v12), GSAP
- **Data Fetching:** TanStack Query (v5)
- **Authentication:** Better-Auth
- **Database:** Prisma + Neon (PostgreSQL)
- **Content:** MDX via Fumadocs
- **Icons:** Lucide React
- **Language:** TypeScript (strict mode)

---

## Common Development Commands

### Setup
```bash
# Install dependencies
bun install
# or
npm install
```

### Development
```bash
# Start development server ( supports hot reload)
npm run dev
# or
bun dev
# or
yarn dev

# Dev server runs on http://localhost:3000 by default
```

### Production Build & Start
```bash
# Build the application
npm run build
# or
bun run build

# Start production server
npm start
# or
bun start
```

### Code Quality
```bash
# Run ESLint
npm run lint
# or
bun run lint

# Fix lint issues (if configured)
npm run lint -- --fix
```

### Database
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Create a migration
npx prisma migrate dev --name migration_name

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Cleanup
```bash
# Delete .next build cache
rm -rf .next

# Reset build info
rm tsconfig.tsbuildinfo
```

---

## High-Level Architecture

### Project Structure

```
beeclean-framer/
├── app/                    # Next.js App Router (pages + layouts)
│   ├── (auth)/            # Authentication routes (grouped)
│   ├── api/               # API routes
│   ├── blogs/             # Blog section
│   │   ├── layout.tsx     # Blog-specific layout (BlogNavbar + BlogFooter)
│   │   ├── page.tsx       # Blog listing page
│   │   ├── [slug]/        # Dynamic blog post pages
│   │   │   ├── page.tsx
│   │   │   └── not-found.tsx
│   ├── career/            # Career/jobs section
│   ├── download/          # Download page
│   ├── layout.tsx         # Root layout (global fonts, theme)
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── blog/              # Blog-specific components
│   │   ├── author-card.tsx
│   │   ├── blog-card.tsx
│   │   ├── mobile-toc.tsx
│   │   ├── promo-content.tsx
│   │   ├── read-more-section.tsx
│   │   ├── table-of-contents.tsx
│   │   └── tag-filter.tsx
│   ├── home/              # Homepage section components
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── pricing.tsx
│   │   ├── faq.tsx
│   │   ├── how-it-works.tsx
│   │   ├── bee-screen.tsx
│   │   ├── phone-decode.tsx
│   │   ├── cta.tsx
│   │   └── ...
│   ├── layout/            # Layout components
│   │   ├── navbar.tsx     # Main site navbar
│   │   ├── blog-navbar.tsx # Blog-specific navbar with search
│   │   ├── footer.tsx     # Main site footer
│   │   └── blog-footer.tsx # Blog-specific footer
│   ├── ui/                # shadcn/ui components (Button, Card, etc.)
│   └── ...                # Other feature components
├── hooks/                 # Custom React hooks
│   ├── use-auth.ts        # Authentication hook
│   ├── use-blogs.ts       # Blogs listing hook (TanStack Query)
│   └── use-blog-post.ts   # Single blog post hook
├── lib/                   # Utilities and configurations
│   ├── auth-client.ts     # Better-Auth client
│   ├── react-query.tsx    # TanStack Query provider
│   ├── utils.ts           # cn (tailwind-merge) utility
│   ├── convert-to-markdown.tsx
│   └── ...
├── public/                # Static assets
│   ├── images/
│   ├── fonts/
│   └── ...
├── prisma/                # Database schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── data/                  # Static data files (if any)
├── scripts/               # Build/utility scripts
├── styles/                # Global styles (if any)
├── types/                 # TypeScript type definitions (if any)
├── globals.css            # Global CSS + Tailwind imports + custom vars
├── tailwind.config.ts     # Tailwind CSS configuration
├── next.config.ts         # Next.js configuration
├── tsconfig.json          # TypeScript configuration
└── package.json
```

---

## Key Patterns & Conventions

### 1. App Router Structure
- **Server Components by Default:** Pages are server components unless `"use client"` is added
- **Client Components:** Only use `"use client"` when you need React hooks (useState, useEffect, etc.)
- **Layouts:** Shared UI across routes; defined in `layout.tsx`
- **Page Components:** Must export default function; located in `page.tsx`
- **Route Groups:** `(group)` syntax for organization without affecting URL

### 2. Design System

#### Typography
- **Headings:** `font-satoshi`, `font-black` (900), `tracking-tight`
- **Body:** `font-inter`
- **Sizes:**
  - Page titles: `text-5xl md:text-6xl lg:text-7xl`
  - Section titles: `text-4xl md:text-5xl`
  - Card titles: `text-xl font-bold`
  - Body: `text-base` or `text-sm`

#### Colors
- **Primary text:** `text-gray-900` (for headings)
- **Secondary text:** `text-muted-foreground`
- **Backgrounds:** `bg-white`, `bg-gray-50` (alternating sections)
- **Borders:** `border-gray-100`, `border-gray-200`
- **Interactive:** `hover:text-gray-900`, `hover:bg-gray-50`

#### Shadows (Apple-Style)
- **Standard:** `shadow-apple` (custom CSS variable in globals.css)
- **Hover:** `shadow-apple-hover`
- **Applied to:** Cards, buttons, images

#### Radius
- **Cards:** `rounded-3xl` (24px)
- **Buttons:** `rounded-xl` (16px)
- **Inputs/Tags:** `rounded-lg` (12px)

#### Spacing
- **Container:** `max-w-7xl mx-auto px-6 lg:px-0`
- **Section padding:** `py-20`, `pt-30 pb-20`
- **Content padding:** `p-6`, `p-8`, `p-10`
- **Gaps:** `gap-4`, `gap-6`, `gap-8`

### 3. Motion & Animations

#### Page-Level Animation
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }}
>
```

#### Child Item Animation
```tsx
<motion.div
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }}
/>
```

#### Interactive Hover
```tsx
<motion.div
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
>
```

### 4. Component Patterns

#### Card Components
Use shadcn/ui Card with premium styling:
```tsx
<Card className="rounded-3xl border-none shadow-apple overflow-hidden bg-white hover:shadow-apple-hover transition-all duration-300 hover:-translate-y-1">
  <CardContent className="p-6">
    {/* Content */}
  </CardContent>
</Card>
```

#### Button Components
- **Primary:** `bg-[#1a1a1a] text-white shadow-apple hover:shadow-apple-hover`
- **Secondary:** `bg-white text-gray-900 border border-gray-200 shadow-apple`
- **Sizes:** Use shadcn/ui `size` prop (sm, default, lg)

#### Grid Layouts
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

### 5. Data Fetching (TanStack Query)

#### Custom Hooks Pattern
```tsx
// hooks/use-something.ts
'use client';

import { useQuery } from '@tanstack/react-query';

export function useSomething(params: Params) {
  const query = useQuery({
    queryKey: ['something', params],
    queryFn: () => fetchSomething(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,  // 10 minutes
  });

  return query;
}
```

#### Usage in Components
```tsx
const { data, isLoading, error } = useSomething(params);
```

#### Stale Time Conventions
- **Static content** (blogs, pages): 5-10 minutes
- **Dynamic content** (user data): 1-2 minutes
- **Never expire:** `staleTime: Infinity`

### 6. Path Aliases
- `@/*` → root directory
- Use for imports: `import { cn } from '@/lib/utils'`

### 7. Image Handling
- Use `next/image` optimized image component
- Always provide `alt` text
- Use `fill` prop for responsive containers with `relative` parent
- Add `priority` for above-the-fold images

```tsx
<div className="relative h-48 w-full">
  <Image src={imageUrl} alt={alt} fill className="object-cover" />
</div>
```

### 8. Responsive Design
- **Mobile-first** approach with Tailwind responsive prefixes
- **Breakpoints:**
  - `md:` (768px) - tablets
  - `lg:` (1024px) - desktops
  - `xl:` (1280px) - large screens
- Hide/show based on viewport:
  - `hidden md:flex` (hidden on mobile, flex on tablet+)
  - `md:hidden` (only visible on mobile)

### 9. Blog Section Architecture

#### Layout Structure
- `app/blogs/layout.tsx` wraps all blog routes with `BlogNavbar` + `BlogFooter`
- Blog listing and individual posts are separate pages
- Posts use dynamic routing: `/blogs/[slug]`

#### Blog Post Components
- **BlogNavbar:** Sticky search-enabled navbar (desktop + mobile search)
- **BlogFooter:** Blog-specific footer with quick links
- **TableOfContents:** Desktop sidebar sticky TOC
- **MobileTableOfContents:** Floating button + drawer on mobile
- **AuthorCard, PromoContent, ReadMoreSection** - all use premium card styling

---

## Important Files to Understand

### Design System
- `app/globals.css` - CSS variables, custom shadows, theme colors
- `components/ui/` - shadcn/ui component library
- `tailwind.config.ts` (if exists) or Tailwind v4 default config

### Data Layer
- `lib/react-query.tsx` - TanStack Query provider setup
- `hooks/` - Custom data fetching hooks
- `lib/auth-client.ts` - Authentication client

### API Routes
- `app/api/blogs/route.ts` - GET all blogs
- `app/api/blogs/[slug]/route.ts` - GET single blog

### Blog System
- `app/blogs/page.tsx` - Blog listing
- `app/blogs/[slug]/page.tsx` - Individual blog post
- `hooks/use-blogs.ts` - Blogs query hook
- `hooks/use-blog-post.ts` - Single post query hook

---

## Best Practices

### 1. Component Design
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over prop drilling
- Prefer server components; use client components only when necessary

### 2. Performance
- Use `useMemo` for expensive computations
- Use `useCallback` for event handlers passed as props
- Optimize images with proper `sizes` attribute
- Leverage Next.js automatic code splitting
- Use TanStack Query caching to avoid redundant fetches

### 3. Animations
- Use Framer Motion for entrance animations (scroll-triggered)
- Prefer `whileInView` over `initial/ animate` for below-the-fold content
- Add `viewport={{ once: true }}` to avoid re-animation on scroll
- Keep animations smooth (60fps) - avoid layout thrashing

### 4. TypeScript
- Enable `strict: true` in tsconfig
- Define interfaces for all props and data structures
- Use type inference when obvious, explicit types for public APIs
- Avoid `any` - use `unknown` or proper types instead

### 5. Styling
- Use Tailwind utility classes only (no CSS files for components)
- Extract common patterns to component variants or `cn()` utilities
- Follow design system: Satoshi for headings, Inter for body
- Use custom CSS variables for repeated complex values

### 6. Next.js App Router
- Use `useSearchParams`, `useRouter`, `usePathname` for navigation state
- For dynamic routes, access params via `use(params)` in client components
- Use `metadata` export in server components for SEO
- Prefer server-side rendering; use client-side rendering only when needed

---

## Notes Specific to This Codebase

### Premium Apple-Style Design
The design language is inspired by Apple's aesthetic:
- Clean white/light backgrounds
- Subtle, multi-layered shadows (`shadow-apple`)
- Large, bold typography with tight tracking
- Smooth, slow animations (easeOut)
- Generous negative space (padding/margins)
- 24px border radius for cards (rounded-3xl)
   
### Blog System
- Blogs use a custom API at `/api/blogs` and `/api/blogs/[slug]`
- Blog data includes: title, description, slug, tags, thumbnail, publishedAt, author, content
- Content is HTML (rendered via `dangerouslySetInnerHTML` with `prose` styling)
- MDX support available via `ConvertToMarkdown` utility
- Table of Contents auto-generated from h1/h2/h3

### TanStack Query Integration
- Already configured in `lib/react-query.tsx`
- Provider wraps app in `app/layout.tsx`
- Use custom hooks from `hooks/` folder
- Default staleTime: 5 min, gcTime: 10 min

### shadcn/ui Components
Already installed and configured. Available components include:
- Button, Card, Drawer, Badge, Skeleton, Spinner, Avatar, etc.
- Import from `@/components/ui/`

### Framer Motion
- Used for all animations
- Import from `framer-motion`
- Common patterns: `initial`, `animate`, `variants`, `whileInView`, `whileHover`, `whileTap`

---

## Environment Variables

Create a `.env.local` file with:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=your-neon-database-url
AUTH_SECRET=generate-with-openssl-or-similar
# ... other env vars
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9
# Windows
netstat -ano | findstr :3000
# then kill the PID
```

### Module Resolution Issues
- Ensure `tsconfig.json` has `"@/*": ["./*"]` path mapping
- Restart TypeScript server in your editor

### Prisma Errors
```bash
npx prisma generate
npx prisma db push
```

### Build Errors
```bash
rm -rf .next
npm run build
```

---

## Testing (If Added in Future)

If Jest/Vitest is added later:
```
npm run test          # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage  # With coverage
```

---

## Deployment

Built for Vercel deployment:
- Ensure `NEXT_PUBLIC_APP_URL` is set to production URL
- Configure environment variables in Vercel dashboard
- Database migrations should run on deploy (via Prisma)

---

## Getting Help

- Check `README.md` for basic getting started info
- Review component examples in `components/` for patterns
- Use `@tanstack/react-query` docs for caching questions
- Use Framer Motion docs for animation patterns
- Use Next.js docs (16.x) for router/features

---

## Important Notes from AGENTS.md

This is **NOT** the standard Next.js you may be familiar with:
- Next.js 16 has breaking changes from earlier versions
- APIs, conventions, and file structure may differ from training data
- **Always read** the relevant guide in `node_modules/next/dist/docs/` before writing code
- **Heed deprecation notices** - they are critical

---

**Last Updated:** April 2025
**Maintained by:** Beeclean Team
