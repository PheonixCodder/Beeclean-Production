# Beeclean - Complete Project Overview

**Last Updated:** April 18, 2026
**Framework:** Next.js 16.2.2 (App Router)
**Runtime:** Bun 1.3.9
**Status:** Production Ready (9.5/10)

---

## 📋 Table of Contents

1. [Executive Summary](#executive-summary)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Data Flow & Architecture](#data-flow--architecture)
5. [Core Components](#core-components)
6. [API Routes & Server Actions](#api-routes--server-actions)
7. [Database Schema](#database-schema)
8. [Authentication & Authorization](#authentication--authorization)
9. [Security Features](#security-features)
10. [Monitoring & Observability](#monitoring--observability)
11. [State Management](#state-management)
12. [File Uploads & Storage](#file-uploads--storage)
13. [SEO & Metadata](#seo--metadata)
14. [Testing & CI/CD](#testing--cicd)
15. [Environment Configuration](#environment-configuration)
16. [Deployment Checklist](#deployment-checklist)

---

## 1. Executive Summary

Beeclean is a professional iPhone cleaning & optimization web application built with modern Next.js 16. The app follows a **Feature-Sliced Design / Domain-Driven Architecture**, keeping domain-specific logic tightly grouped. It utilizes **Next.js Server Actions** for optimized database mutation entirely bypassing the REST overhead.

The app features:

- **Public Website:** Marketing pages, blog, career/job listings, dynamic newsletter subscription.
- **Admin Dashboard:** Blog management, application review, job posting, newsletter subscriber tracking.
- **Architecture:** Feature-Sliced Design (`features/` directory) with Next.js Server Actions.
- **Authentication:** Email/password via Better-Auth.
- **Content Management:** Blog system with tags, categories, rich content.
- **Job Applications:** Form with resume upload, admin review workflow.
- **Security:** Enterprise-grade (CSRF, XSS protection, admin authorization, rate limiting).
- **Monitoring:** Sentry error tracking, Web Vitals, health checks.

---

## 2. Tech Stack

### Frontend
- **Framework:** Next.js 16.2.2 (App Router, React 19)
- **Styling:** Tailwind CSS v4, shadcn/ui components
- **Animations:** Framer Motion v12
- **Icons:** Lucide React
- **State Management:** TanStack Query v5 (React Query)
- **URL State:** Nuqs (query string management)

### Backend
- **Runtime:** Node.js (with Bun package manager)
- **Architecture Flow:** Next.js Server Actions + direct database interfacing
- **ORM:** Prisma 7.6 (PostgreSQL)
- **Authentication:** Better-Auth 1.5
- **Validation:** Zod 4.3
- **Security:** DOMPurify (XSS prevention)
- **Rate Limiting:** Upstash Redis (sliding window)

### Infrastructure
- **Monitoring:** Sentry 10.47 (error tracking)
- **File Storage:** Local filesystem (public/uploads/)
- **Deployment:** Vercel-compatible (Node.js)
- **CI/CD:** GitHub Actions
- **Testing:** Vitest 4.1 + Testing Library

### Design System
- **Fonts:** Satoshi (headings), Inter (body)
- **Colors:** White/gray palette with Apple-style shadows / Black & White premium aesthetic.
- **Radius:** Cards: 24px (rounded-3xl), Buttons: 16px (rounded-xl)
- **Spacing:** Container max-w-7xl, section padding py-20/pt-30 pb-20

---

## 3. Project Structure

The project has been scaled into a **feature-sliced architecture**. The `app/` router strictly handles routing, while the UI, business logic, and custom hooks are isolated natively within `features/`.

```
beeclean-framer/
├── app/                          # Next.js App Router (Routing Engine)
│   ├── (auth)/                   # Authentication route group
│   ├── actions/                  # Next.js Server Actions for Mutations/Fetching
│   │   ├── applications.ts
│   │   ├── blogs.ts
│   │   ├── careers.ts
│   │   └── newsletter.ts
│   ├── api/                      # Reserved for external & structural APIs
│   │   ├── auth/                 # Better-auth endpoints
│   │   └── health/route.ts       # GET (health check)
│   ├── blogs/
│   │   ├── [slug]/page.tsx       # Dynamic blog post rendering
│   │   └── page.tsx              # Renders features/blogs/ui/pages/blogs.tsx
│   ├── career/
│   │   └── page.tsx              # Renders features/career/ui/pages/careers.tsx
│   ├── dashboard/                # Admin Panel pages
│   ├── download/
│   ├── privacy-policy/
│   ├── terms-conditions/
│   ├── layout.tsx                # Root layout (fonts, providers, error boundary)
│   ├── page.tsx                  # Renders features/home/ui/pages/home.tsx
│   ├── sitemap.ts                # Dynamic sitemap
│   └── robots.ts                 # Robots.txt configuration
│
├── features/                     # Feature-Sliced App Domains
│   ├── auth/                     # Authentication Logic & UI
│   ├── blogs/                    # Blog viewing and listing
│   │   ├── hooks/
│   │   └── ui/pages/
│   ├── career/                   # Jobs, application submittions
│   │   ├── hooks/
│   │   └── ui/pages/
│   ├── dashboard/                # Admin CMS and Analytics
│   │   ├── hooks/
│   │   │   ├── use-dashboard-applications.ts
│   │   │   ├── use-dashboard-blogs.ts
│   │   │   ├── use-dashboard-careers.ts
│   │   │   └── use-dashboard-newsletter.ts
│   │   └── ui/pages/
│   ├── home/                     # Landing Page components & layout
│   └── legal/                    # Privacy policy, T&C
│       └── ui/pages/
│
├── components/                   # Shared Presentational Elements
│   ├── layout/                   # Navbar, Footer
│   ├── ui/                       # shadcn/ui generic components (Button, Dialog...)
│   ├── canvas/                   # Shared generic canvas components
│   ├── error-boundary.tsx        # Global error catcher
│   └── web-vitals.tsx            # Analytics
│
├── hooks/                        # Generic/Utility hooks
│   └── use-mobile.ts             # Global responsive identifier
│
├── lib/
│   ├── auth.ts                      # Better-Auth configuration
│   ├── auth-client.ts               # Client-side auth client
│   ├── env-validator.ts             # Environment variable validation
│   ├── prisma.ts                    # Prisma singleton instance
│   ├── react-query.tsx              # TanStack Query provider
│   ├── ratelimit.ts                 # Rate limiting (Upstash Redis)
│   ├── validators.ts                # Zod schemas
│   └── ...
│
├── prisma/
│   ├── schema.prisma                # Database schema
│   ├── seed.ts                      # Database seeding
│   └── migrations/                  # Migration history
│
├── public/                          # Static assets
└── ... (Configuration files)
```

---

## 4. Data Flow & Architecture

### Request Lifecycle

```
User Request → Next.js 16 (App Router) → Client Hook (TanStack Query) → Next.js Server Action (`app/actions/*`) → Database (Prisma) → Response
```

### Key Architectural Patterns

1. **Feature-Sliced Architecture:** All pages under `app/` strictly import `<PageName />` components from `features/[domain]/ui/pages/`. This keeps `app/` clean.
2. **Server Actions vs API Routes:** Previously, Data was fetched via REST API routes (`app/api/*`). Now, all client data mutation and data fetching is resolved using strictly typed **Server Actions** in `app/actions/`, maximizing SSR capabilities and removing fetch overhead.
3. **Data Fetching:** TanStack Query handles caching data client-side, heavily utilizing Server Actions as query functions.
4. **Validation:** Zod schemas validate Server Action `FormData` and typical payloads immediately.
5. **Authorization:** Server Actions inherently check `await auth.api.getSession()` and the custom validation function `isAdmin()`.
6. **Error Handling:** Graceful nested `try/catch` with structured object outputs returned to the browser clients.
7. **Rate Limiting:** Upstash Redis sliding window limits requests to mutating Server Actions to mitigate bot/spam usage.

---

## 5. Core Components

### Root Layout (`app/layout.tsx`)

**Purpose:** Application-wide layout and provider setup

**Key Features:**
- Font configuration (Inter, Satoshi)
- NuqsAdapter (query string state management)
- ErrorBoundary (error catching)
- QueryProvider (TanStack Query)
- WebVitals tracking

### UI and Components

The `components/` directory is reserved strictly for primitive, structural UI components without domain knowledge:
- `components/ui/` -> generic shadcn elements (buttons, inputs, sonner).
- `components/layout/` -> Generic navbars, footers.

For any specific domain (e.g., Application forms, Blog Cards) — they live dynamically inside their respective `features/[domain]/ui/` directories.

---

## 6. API Routes & Server Actions

With the migration from `/api` REST endpoints, business endpoints are now executed safely within Next.js Server Actions. The only endpoints left under `/api` are specific external webhooks or architectural defaults (`/api/auth`, `/api/health`).

### Public Server Actions

#### `getBlogs(query)`
Fetches published blogs with optional tag filtering.

#### `getBlogPost(slug)`
Fetches single published blog by slug. Returns 404 behavior if not public.

#### `submitApplication(formData)`
Submits job application with resume upload.
**Validation:** Validates file size (10MB max), MIME type (PDF/DOC/DOCX via magic bytes) locally before uploading the document logic. Rate-limited by IP.

#### `getCareers()`
Fetches all published jobs.

#### `subscribeNewsletter(email)`
Validates an email using Zod, establishes checking for an existing record, limits requests using Upstash Ratelimiting, and stores it in the Postgres database.

### Admin Server Actions (Require Auth + Admin Role)

#### Application Actions (`app/actions/applications.ts`)
- `getApplications()`: Fetches job apps.
- `updateApplicationStatus(id, status)`: Transitions status (pending, accepted, etc).
- `deleteApplication(id)`: Removes application logic.

#### Blog Actions (`app/actions/blogs.ts`)
- `getAdminBlogs()`: Gets all blogs regardless of draft state.
- `createBlog(...)`, `updateBlog(...)`, `deleteBlog(...)`: Mutate blog payloads and scrub input fields through DOMPurify for strict XSS prevention before pushing to Postgres.

#### Career Actions (`app/actions/careers.ts`)
- Includes internal mutations for job listings.

#### Newsletter Actions (`app/actions/newsletter.ts`)
- `getNewsletters()`: Fetches the list of all successful subscribers (active state managed).

---

## 7. Database Schema

### Updated Models

#### User
```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  role          String    @default("user")  // "user" or "admin"
  blogs         Blog[]
  ...
}
```

#### Blog & Category
```prisma
model Blog {
  id          String    @id @default(cuid())
  title       String
  content     String
  slug        String    @unique
  status      BlogStatus @default(draft)
  authorId    String
  ...
}
```

#### Job & Application
```prisma
model Job {
  id               String    @id @default(cuid())
  status           JobStatus @default(draft)
  ...
}

model Application {
  id         String   @id @default(cuid())
  jobId      String
  status     ApplicationStatus @default(pending)
  resumeUrl  String?
  ...
}
```

#### Newsletter
```prisma
model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email])
  @@map("newsletter")
}
```

---

## 8. Authentication & Authorization

### Provider: Better-Auth

**Configuration:** `lib/auth.ts`

```ts
export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  plugins: [bearer()],
  cookie: {
    sessionToken: {
      crossSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', 
    },
  },
});
```

### Authorization Wrapper inside Server Actions
All admin functions check an `isAdmin(user)` function against the `session` token. Unauthorized calls inside `app/actions/` immediately throw runtime Next.js errors bounding to an unauthorized UI state.

---

## 9. Security Features

### 🔒 Implemented Protections

| Feature | Implementation | Location |
|---------|---------------|----------|
| **Server Actions** | Opaque mutation identifiers | Next.js Engine |
| **CSRF Protection** | SameSite=Lax cookies | `lib/auth.ts` |
| **XSS Prevention** | DOMPurify sanitization | Blog mutations |
| **Admin Authorization** | `isAdmin()` checks | All admin actions |
| **Rate Limiting** | Upstash Redis (sliding window) | `lib/ratelimit.ts` |
| **File Upload Validation** | Magic bytes + size + MIME | `app/actions/applications.ts` |
| **Security Headers** | CSP, HSTS, X-Frame-Options | `proxy.ts` |
| **Input Validation** | Zod schemas | `lib/validators.ts` |
| **SQL Injection** | Prisma ORM mapping | All database queries |

---

## 10. Monitoring & Observability

### Sentry Error Tracking

**Configuration:**
- `sentry.client.config.ts` - Browser errors, performance
- `sentry.server.config.ts` - Server-side errors

### Web Vitals
Tracked natively via `components/web-vitals.tsx` for metrics like LCP, FID, CLS, FCP, TTFB.

---

## 11. State Management

### TanStack Query (React Query)
Domain hooks live independently under their related `features` logic or specific hook folders instead of bloating a global context.

**Domain Hooks:**
- `features/dashboard/hooks/use-dashboard-blogs.ts`
- `features/dashboard/hooks/use-dashboard-applications.ts`
- `features/dashboard/hooks/use-dashboard-careers.ts`
- `features/dashboard/hooks/use-dashboard-newsletter.ts`
- `features/blogs/hooks/` (or related root `hooks/` depending on context)

Data queries execute their respective generated Server Action seamlessly.

---

## 12. File Uploads & Storage

### Current Implementation: Local Filesystem

**Process in `submitApplication` Server Action:**
1. Extract file from `FormData` argument block.
2. Validate size locally.
3. Use magic bytes to identify exact PDF/DOC mime-types via `file-type` safely.
4. Generates a secure `crypto.randomUUID()` file reference to stop path traversal hacking.
5. Emits to `public/uploads/` via `fs`.

*Note: Ready to be migrated to S3 natively via streaming.*

---

## 13. SEO & Metadata

### Sitemap (`app/sitemap.ts`)
Dynamic schema generated natively via Next Route fetching.

### Robots.txt (`app/robots.ts`)
Disallows `/api/`, `/dashboard/`, `/_next/`.

### Metadata Routing
Utilizes Next.js Server Components globally for `<meta>` generation across Home, Applications, and static blogs.

---

## 14. Testing & CI/CD

### Pipeline (`vitest`)
Vitest is configured over `vitest.config.ts` and runs parallel via GitHub action hooks on commits to `main` to intercept structural failures, typings, and linting problems in strict mode.

---

## 15. Environment Configuration

### Required Variables

**.env.local**
```env
DATABASE_URL="postgresql://user:pass@host:5432/beeclean"

AUTH_SECRET="32_length"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

SENTRY_DSN="key@o123"
NEXT_PUBLIC_SENTRY_DSN="key@"

UPSTASH_REDIS_REST_URL="url"
UPSTASH_REDIS_REST_TOKEN="token"
```

Uses `lib/env-validator.ts` directly in the Root Layout to crash immediately if booted missing critical tokens.

---

## 16. Deployment Checklist

1. ✅ Database schema applied (`npx prisma db push`).
2. ✅ Environment populated (Vercel).
3. ✅ Build Passes standard strict TS check (`bun run build`).
4. ✅ Next.js Server Actions properly bundled and linked against Upstash instances.
5. Ready for Node 20.x Next.js Runtime.
