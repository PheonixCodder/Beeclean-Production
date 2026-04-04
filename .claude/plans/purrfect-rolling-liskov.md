# Migration Plan: Convert Public Pages to Server Components

## Context

**Why this change?**
- **Better SEO:** Server-rendered HTML is immediately visible to search engine crawlers
- **Faster Initial Load:** No loading spinners; content is in the initial HTML response
- **Reduced Client Bundle:** Less JavaScript needs to be downloaded and executed
- **Improved Core Web Vitals:** FCP, LCP improve with server-side rendering

**What's the problem with current architecture?**
All 5 public pages are client components that fetch data via TanStack Query on the client side. This results in:
- Content appears only after JavaScript loads and executes
- Loading states flash before content is visible
- Poor SEO (search engines see empty shells)
- Larger JavaScript bundles sent to client

**Why is this safe/feasible?**
- These pages serve public content (no sensitive user data)
- API routes can remain unchanged (they'll still be used by any remaining client-side code)
- Child components already use Framer Motion and stay as client components (no visual regression)
- No complex client-side state besides Blogs page search/filter (which we'll handle with a thin client wrapper)

---

## Goals

1. Convert these pages from client → server components:
   - ✅ `app/page.tsx` **(already server - no change needed)**
   - 🔄 `app/blogs/page.tsx`
   - 🔄 `app/career/page.tsx`
   - 🔄 `app/career/[id]/page.tsx`
   - 🔄 `app/blogs/[slug]/page.tsx`

2. Keep all existing hooks files intact (not removed, just not used by these pages)

3. Preserve all existing functionality:
   - URL search params (tag filtering, search)
   - Framer Motion animations (stay in client child components)
   - Form interactions (ApplicationForm stays client)
   - TOC, mobile drawer, hash scroll (stay client)

4. **Do NOT break:** Existing client-side navigation, SEO metadata, error handling

---

## Strategy Overview

### Pattern: Server Component + Client Child Components

```
Server Page Component (async)
  ├─ Fetches data directly using Prisma
  ├─ Formats data to match existing component props
  ├─ Passes data as props to child components
  └─ Child components that need client features ("use client") remain unchanged
      ├─ Components with Framer Motion
      ├─ Components with useState/useEffect
      ├─ Components with interactive forms
      └─ Components dependent on browser APIs (window, document)
```

### For Stateful Pages (Blogs Listing Only)

The blogs listing page needs:
- URL state sync (tag, search params) via Nuqs
- Client-side filtering (by tag & search text)
- Debounced search input

**Hybrid approach:**
```
Server Page (fetches all published blogs)
  └─> BlogsPageClient (client wrapper)
       ├─ useState for local search input
       ├─ useQueryState for URL sync
       ├─ useMemo for filtering
       └─ Framer Motion for animations
```

### Data Fetching: Direct Prisma vs API Routes

**We will use direct Prisma access in server components** because:
- Avoids HTTP overhead (no internal API call)
- Bypasses rate limiting that's meant for client requests
- Simpler error handling
- Full TypeScript type safety

**API routes remain unchanged** for:
- Mutations (blog creation, application submission) - still called from client
- Any external clients
- Backward compatibility

### Type Safety

Reuse existing interfaces from hooks:
- `BlogData` from `hooks/use-blogs.ts`
- `BlogPost` from `hooks/use-blog-post.ts`
- `Career` from `hooks/use-careers.ts` / `use-career.ts`

No duplicate types - just import them in server components.

---

## Detailed Migration Steps

### **Step 1: Create Optional Service Layer (Recommended)**

Create `lib/services/server-data.ts` with reusable data-fetching functions:

```typescript
import prisma from "@/lib/prisma";
import { BlogData } from "@/hooks/use-blogs";
import { BlogPost } from "@/hooks/use-blog-post";
import { Career } from "@/hooks/use-careers";

export async function getPublishedBlogs(): Promise<BlogData[]> {
  const blogs = await prisma.blog.findMany({
    where: { status: "published" },
    include: {
      author: true,
      categories: { include: { category: true } }
    },
    orderBy: { publishedAt: "desc" }
  });

  return blogs.map(blog => ({
    id: blog.id,
    title: blog.title,
    description: blog.description || blog.excerpt || "",
    slug: blog.slug,
    tags: blog.categories.map(c => c.category.name),
    thumbnail: blog.thumbnail,
    publishedAt: blog.publishedAt?.toISOString() || blog.createdAt.toISOString(),
    readTime: blog.readTime
  }));
}

export async function getPublishedBlogPost(slug: string): Promise<BlogPost | null> {
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      author: { select: { name: true, image: true, position: true, bio: true } },
      categories: { include: { category: true } }
    }
  });

  if (!blog || blog.status !== "published") return null;

  return {
    title: blog.title,
    description: blog.description || blog.excerpt || "",
    excerpt: blog.excerpt,
    publishedAt: blog.publishedAt?.toISOString() || blog.createdAt.toISOString(),
    author: blog.author ? {
      name: blog.author.name,
      image: blog.author.image || "/default-avatar.png",
      position: blog.author.position,
      bio: blog.author.bio
    } : undefined,
    tags: blog.categories.map(c => c.category.name),
    thumbnail: blog.thumbnail,
    content: blog.content,
    readTime: blog.readTime
  };
}

export async function getPublishedCareers(): Promise<Career[]> {
  const jobs = await prisma.job.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" }
  });

  return jobs.map(job => ({
    id: job.id,
    title: job.title,
    department: job.department,
    location: job.location,
    type: job.type,
    salary: job.salary,
    description: job.description,
    responsibilities: job.responsibilities as string[],
    requirements: job.requirements as string[]
  }));
}

export async function getPublishedCareer(id: string): Promise<Career | null> {
  const job = await prisma.job.findUnique({ where: { id } });

  if (!job || job.status !== "published") return null;

  return {
    id: job.id,
    title: job.title,
    department: job.department,
    location: job.location,
    type: job.type,
    salary: job.salary,
    description: job.description,
    responsibilities: job.responsibilities as string[],
    requirements: job.requirements as string[]
  };
}
```

**Note:** If we don't create this service layer now, we can inline Prisma queries in each page file. Service layer is cleaner and reduces duplication.

---

### **Step 2: Migrate `app/blogs/page.tsx`**

#### Current (client component):
- Uses `useBlogs()` hook
- Uses `useQueryState` for URL params
- Uses `useState` for debounced search
- Uses Framer Motion

#### Changes:
1. Remove `"use client"` directive
2. Add `import { getPublishedBlogs } from "@/lib/services/server-data"`
3. Change to `export default async function BlogsPage({ searchParams }: { searchParams: { tag?: string; search?: string } })`
4. Fetch: `const allBlogs = await getPublishedBlogs();`
5. Compute `allTags` and `tagCounts` inline (same logic as hook)
6. Extract initial values: `initialTag = searchParams.tag || 'All'`, `initialSearch = searchParams.search || ""`
7. Create client wrapper component `BlogsPageClient` in same file (below) or in separate file
8. Return `<BlogsPageClient blogs={allBlogs} allTags={allTags} tagCounts={tagCounts} initialTag={initialTag} initialSearch={initialSearch} />`

#### `BlogsPageClient` component:
- Copy existing logic from current page.tsx (everything after data fetching)
- Remove fetch calls, receive `blogs`, `allTags`, `tagCounts` as props
- Keep `useQueryState`, `useState`, Framer Motion, TagFilter, BlogCard
- Import types from `@/hooks/use-blogs` (BlogData)
- Mark with `"use client"` at top

#### Files modified:
- `app/blogs/page.tsx` (main change)
- `lib/services/server-data.ts` (new, optional but recommended)

---

### **Step 3: Migrate `app/career/page.tsx`**

#### Current:
- Client component using `useCareers()` hook
- Renders `<Openings careers={careers} />`

#### Changes:
1. Remove `"use client"`
2. Import: `import { getPublishedCareers } from "@/lib/services/server-data"`
3. Make async: `export default async function CareerPage()`
4. Fetch: `const careers = await getPublishedCareers();`
5. Render:
   ```tsx
   return (
     <div>
       <Navbar />
       <Openings careers={careers} isLoading={false} error={null} />
       <Footer />
     </div>
   );
   ```
6. No client wrapper needed because Openings already handles its own motion and loading states. We just pass data + `isLoading={false}`.

#### Files modified:
- `app/career/page.tsx`

---

### **Step 4: Migrate `app/career/[id]/page.tsx`**

#### Current:
- Client component using `useCareer(id)` hook
- Renders: `<JobDetail>`, `<Values>`, `<ApplicationForm>`

#### Changes:
1. Remove `"use client"`
2. Import: `import { getPublishedCareer } from "@/lib/services/server-data"`
3. Make async with params: `export default async function JobPage({ params }: { params: Promise<{ id: string }> })`
4. Destructure: `const { id } = await params;`
5. Fetch: `const career = await getPublishedCareer(id);`
6. If not found: `if (!career) notFound();`
7. Render:
   ```tsx
   return (
     <div>
       <Navbar />
       <JobDetail job={career} />
       <Values />
       <ApplicationForm jobTitle={career.title} jobId={career.id} />
       <Footer />
     </div>
   );
   ```
8. No client wrapper needed; child components are already client.

#### Files modified:
- `app/career/[id]/page.tsx`

---

### **Step 5: Migrate `app/blogs/[slug]/page.tsx`**

#### Current (complex):
- Client component with `useBlogPost(slug)` hook
- Uses Framer Motion for page-level animations
- Contains: `HashScrollHandler`, `TableOfContents`, `MobileTableOfContents`, `AuthorCard`, `PromoContent`, `ReadMoreSection`
- All child components are client (useEffect, motion, browser APIs)

#### Changes:
1. Remove `"use client"` directive
2. Import: `import { getPublishedBlogPost } from "@/lib/services/server-data"`
3. Make async: `export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> })`
4. Destructure: `const { slug } = await params;`
5. Fetch: `const blog = await getPublishedBlogPost(slug);`
6. If not found: `if (!blog) notFound();`
7. Create client wrapper component `BlogPostClient` (defined below or separate file)
8. Render: `<BlogPostClient blog={blog} />`

#### `BlogPostClient` component:
- Move ALL content from current page.tsx into this component
- Remove fetch logic and params handling
- Receive `blog` as prop (type: BlogPost)
- Mark with `"use client"`
- Keep all Framer Motion, HashScrollHandler, TableOfContents, etc.
- This preserves exact same UI/UX but fetches data server-side

#### Important: ReadMoreSection optimization (optional)
Currently `ReadMoreSection` fetches all blogs client-side. We can enhance it to receive `relatedBlogs` as prop from server:
- In server component, compute related blogs by tag overlap (same logic as current ReadMoreSection)
- Pass to `BlogPostClient` → `ReadMoreSection`
- Modify `ReadMoreSection` to accept optional `blogs` prop; if provided, use it instead of fetching

This reduces one extra API call on client. **Can be done as follow-up optimization.**

#### Files modified:
- `app/blogs/[slug]/page.tsx` (split into server + client parts)
- `lib/services/server-data.ts` (new, if not already created)

---

### **Step 6: Homepage Already Server Component**

✅ `app/page.tsx` already has no `"use client"` and uses no data fetching (static content). **No changes needed.**

---

## Component Compatibility Checklist

### Components That Must Remain Client ("use client")

| Component | Reason |
|-----------|--------|
| `HashScrollHandler` | Uses `useEffect`, `window.location` |
| `TableOfContents` | Uses `useEffect`, `document.querySelectorAll`, IntersectionObserver |
| `MobileTableOfContents` | Uses Drawer (Radix UI - client) |
| `TagFilter` | Uses `useState`, `useEffect`, `nuqs`, Framer Motion |
| `BlogCard` | Uses Framer Motion (whileHover) |
| `Openings` | Uses Framer Motion extensively |
| `JobDetail` | Uses Framer Motion |
| `ApplicationForm` | Uses `useState`, file upload, mutation hook |
| `ReadMoreSection` | Uses `useEffect`, fetch, Framer Motion |
| `AuthorCard`, `PromoContent`, etc. | May use Framer Motion (verify but safe as client) |

✅ All these are already marked `"use client"` - they'll work as client children of server components.

### Layouts

- `app/layout.tsx` stays server (root layout)
- `app/blogs/layout.tsx` stays server (BlogNavbar + BlogFooter)
- `app/(auth)/layout.tsx` stays server (auth middleware)

---

## Type Safety & Imports

- Import existing type interfaces from `@/hooks/*`:
  ```typescript
  import { BlogData } from "@/hooks/use-blogs";
  import { BlogPost } from "@/hooks/use-blog-post";
  import { Career } from "@/hooks/use-careers";
  ```
- Keep `prisma` singleton import: `import prisma from "@/lib/prisma";`
- If creating service layer, import from `@/lib/services/server-data`

---

## Error Handling & Edge Cases

### Not Found
- Use `import { notFound } from "next/navigation";`
- Call `notFound()` when data is null/undefined
- Triggers `app/[route]/not-found.tsx` if present

### Server Errors
- Let errors propagate to Next.js error boundary (`app/error.tsx` if exists)
- Or wrap in try/catch and rethrow with context

### Loading States
- Server components don't have loading states - they await before rendering
- First paint includes all data
- For streaming/Suspense, we could use `loading.tsx` files but not needed initially

### URL Search Params in Server Components
Next.js 16 passes `searchParams` as prop to page components:
```typescript
export default async function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const tag = searchParams.tag || null;
}
```
Works for simple params. For complex parsing, use `useSearchParams()` only in client components.

---

## Migration Order (Recommended)

**Day 1:**
1. ✅ Create `lib/services/server-data.ts` with all 4 functions
2. ✅ Migrate `app/career/page.tsx` (easiest, minimal changes)
3. ✅ Migrate `app/career/[id]/page.tsx` (medium)

**Day 2:**
4. ✅ Migrate `app/blogs/page.tsx` (needs client wrapper)
5. ✅ Migrate `app/blogs/[slug]/page.tsx` (needs client wrapper, careful with motion)

**Day 3:**
6. ✅ Test all pages locally (`npm run dev`)
7. ✅ Verify SEO: view source, check content is in HTML
8. ✅ Check analytics/Web Vitals
9. ✅ Deploy to staging and test

---

## Testing Checklist

After each page migration:

- [ ] Page loads without "Loading..." spinner
- [ ] All content visible in "View Page Source" (SEO check)
- [ ] Blog/Career data appears correctly
- [ ] Images load (Next.js Image component works with server components)
- [ ] Animations still work (Framer Motion in client children)
- [ ] URL navigation works (next/link navigations)
- [ ] Search and filter on blogs page still work
- [ ] Tag clicks update URL and filter blogs
- [ ] Blog post page: TOC generates correctly, hash scroll works
- [ ] Job application form still functional (File upload, submission)
- [ ] Error pages (404) work when data missing
- [ ] No console errors (especially about "use client" mismatches)
- [ ] No React hydration mismatches
- [ ] Web Vitals: FCP/LCP improved or same

---

## Rollout Strategy

**Option A: All at once**
- Migrate all 5 pages in one PR
- Test thoroughly before merge
- Higher risk but faster

**Option B: Incremental (Recommended)**
- PR 1: Migrate career pages (`/career` and `/career/[id]`) - low risk
- PR 2: Migrate blog listing (`/blogs`) - moderate risk (has state)
- PR 3: Migrate blog post (`/blogs/[slug]`) - higher complexity
- Each PR can be reviewed and tested separately
- Easier to isolate bugs

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Client components can't import server components** | Medium | Architecture: server (page) → client (child) only. Don't reverse. |
| **Framer Motion breaks** | Medium | Verify motion components stay in client parts. Server component should not contain `motion.*` without "use client". |
| **TanStack Query cache misses** | Low | Server components don't use React Query. Client-side cache for other parts unaffected. |
| **Rate limiting bypassed** | Positive | Public endpoints still rate-limited for client calls. Server components bypass safely (internal). |
| **SEO actually worse** | Low | Verify content is in HTML, not hydrated after. Test with curl and Googlebot. |
| **Increased server load** | Low | Static generation not used; always dynamic. Consider `revalidate` later if needed. |

---

## Success Criteria

- ✅ All 4 pages successfully render as server components (no "use client" at top)
- ✅ Initial HTML contains full content for blog posts and job listings
- ✅ Framer Motion animations still work (verified visually)
- ✅ Search/filter functionality unchanged
- ✅ No regressions in Lighthouse scores (ideally improvements in FCP/LCP)
- ✅ Code follows Next.js 16 best practices
- ✅ TypeScript compilation passes with no errors
- ✅ ESLint passes (no unused imports, proper directives)
- ✅ Hooks files remain intact and can be imported by other parts of app (dashboard)

---

## Additional Optimizations (Post-Migration)

After migration is stable, consider:

1. **Add `revalidate`** for ISR-like caching:
   ```typescript
   const blogs = await prisma.blog.findMany({ /* ... */ }, {
     next: { revalidate: 300 } // 5 minutes
   });
   ```

2. **Extract ReadMoreSection data-fetching** to server:
   - Pass `relatedBlogs` as prop from BlogPostPage server component
   - Remove client fetch from ReadMoreSection
   - Reduces one API call per blog view

3. **Remove unused hooks** if no longer used anywhere (ensure dashboard doesn't depend on them):
   - `useBlogs`
   - `useBlogPost`
   - `useCareers`
   - `useCareer`

4. **Add loading.tsx** for streaming loading states if desired (Next.js 16 streaming)

5. **Generate metadata dynamically** using `generateMetadata` in server components (if needed for SEO):
   ```typescript
   export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
     const blog = await getPublishedBlogPost(params.slug);
     return { title: blog?.title, description: blog?.description };
   }
   ```

6. **Parallel data fetching** with `Promise.all` if page needs multiple independent fetches (e.g., sidebar stats)

---

## File Changes Summary

### Files to modify:
- `app/page.tsx` - no change
- `app/blogs/page.tsx` - major refactor (server + client wrapper)
- `app/career/page.tsx` - straightforward conversion
- `app/career/[id]/page.tsx` - straightforward conversion
- `app/blogs/[slug]/page.tsx` - major refactor (server wrapper + client component)

### Files to create:
- `lib/services/server-data.ts` - shared Prisma queries (optional but recommended)

### Files to keep unchanged:
- All hook files (`hooks/use-*.ts`) - may be used by dashboard
- API routes - still needed for mutations and potential client-side calls
- Child components - remain as client (already "use client")
- Layouts, Navbar, Footer - already server-compatible

---

## Implementation Order Summary

1. **Prepare**: Create service layer (`lib/services/server-data.ts`)
2. **Easy wins**: Migrate career pages (no client wrapper needed)
3. **Medium**: Migrate blog listing (requires client wrapper for state)
4. **Complex**: Migrate blog post page (requires client wrapper for motion/TOC)
5. **Test**: Run dev server, check all pages, verify SEO
6. **Optimize**: Consider follow-up enhancements (ReadMoreSection, revalidate)

---

## Verification Commands

```bash
# Development
bun dev
# Visit each page, check functionality

# Build test
bun run build
# Should succeed with no TypeScript errors

# SEO check (in dev)
curl http://localhost:3000/blogs
# Should see blog HTML in response (not just <div id="root">)

# View source in browser
# Right-click → View Page Source
# Should see blog titles/content in HTML
```

---

## Questions & Clarifications

**Q: Do we need to preserve TanStack Query caching?**  
A: Server components fetch on each request (unless we add `revalidate`). This is fine for SEO. Client-side caching can still be used for dashboard pages.

**Q: What about error boundaries?**  
A: Existing ErrorBoundary component wraps QueryProvider in root layout. It will catch errors from client components. Server errors use Next.js error handling.

**Q: Can we delete the hooks now?**  
A: Not yet - the dashboard might still use them. Hold off until we refactor dashboard too.

**Q: Does this break Next.js Image component?**  
A: No - `next/image` works in client and server components when `src` is a string. Works fine.

**Q: What about `nuqs` dependency?**  
A: Only used in BlogsPageClient. Server page receives `searchParams` prop and passes initial values.

---

## Conclusion

This migration will significantly improve the perceived performance and SEO of the public-facing pages while preserving all existing functionality. The architecture follows Next.js 16 best practices: server components by default, client components only when necessary. The changes are incremental, low-risk, and thoroughly testable.

**Expected outcome:** Pages load instantly with content visible, animations smooth, SEO optimized, no regressions.
