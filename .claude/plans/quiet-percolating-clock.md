# Dashboard Implementation Plan

## Context
The dashboard section (`app/dashboard/`) has been partially created with empty page files, but the pages and hooks are not implemented. The dashboard will serve as an admin interface for managing blogs, careers/jobs, and viewing applications. It needs to follow the same premium Apple-style design, animation patterns, and TanStack Query patterns used throughout the app.

---

## What Exists

### Pages (Empty)
- `app/dashboard/page.tsx` - Main dashboard overview (0 lines)
- `app/dashboard/blogs/page.tsx` - Blog management (0 lines)
- `app/dashboard/career/page.tsx` - Job management (0 lines)
- `app/dashboard/applications/page.tsx` - Applications review (3 lines)

### Hooks (Some exist in root, none in hooks/dashboard/)
- `hooks/use-applications.ts` - Public applications fetch (already exists)
- `hooks/use-blogs.ts` - Public blogs fetch (already exists)
- `hooks/use-careers.ts` - Public jobs fetch (already exists)
- `hooks/use-career.ts` - Single job fetch (already exists)

**Missing**: Dashboard-specific hooks for CRUD operations in `hooks/dashboard/`

### API Endpoints
**Available:**
- `GET /api/blogs/admin` - Fetch all blogs (with author info) ✓
- `GET /api/careers` - Fetch published jobs (public)
- `GET /api/careers/[id]` - Fetch single job
- `POST /api/careers` - Create job (admin auth required)
- `PUT /api/careers/[id]` - Update job (admin auth required)
- `DELETE /api/careers/[id]` - Delete job (admin auth required)
- `GET /api/applications` - Fetch all applications (public for demo)

**Missing/Auth Issues:**
- Need POST/PUT/DELETE for blogs admin API (currently only GET exists)
- Need to ensure `/api/applications` has admin protection (currently public)
- Need status update endpoint for applications (PATCH `/api/applications/[id]`)

---

## Design System & Patterns to Follow

### Typography & Colors
- **Headings**: `font-satoshi`, `font-black` (900), `tracking-tight`
- **Body**: `font-inter`
- **Sizes**:
  - Page titles: `text-5xl md:text-6xl`
  - Section titles: `text-4xl md:text-5xl`
  - Card titles: `text-xl font-bold`
- **Colors**: Primary text `text-gray-900`, secondary `text-muted-foreground`

### Component Styling
- **Cards**: `rounded-3xl border-none shadow-apple bg-white hover:shadow-apple-hover transition-all duration-300 hover:-translate-y-1`
- **Buttons**:
  - Primary: `bg-[#1a1a1a] text-white shadow-apple hover:shadow-apple-hover`
  - Secondary: `bg-white text-gray-900 border border-gray-200 shadow-apple`
  - Use shadcn `size` prop (sm, default, lg)
- **Inputs**: `rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20`

### Animations (Framer Motion)
```tsx
// Page container
initial="hidden"
animate="visible"
variants={{
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
}}

// Child items
variants={{
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
}}

// Interactive hover
whileHover={{ scale: 1.02, y: -2 }}
whileTap={{ scale: 0.98 }}
```

### TanStack Query Patterns
- **staleTime**: 5 minutes for admin data
- **gcTime**: 10 minutes
- **retry**: 1
- Return: `{ data, isLoading, error, refetch }`
- Use `useQueryClient()` for mutations with `invalidateQueries`

---

## Implementation Plan

### Phase 1: Infrastructure Setup

1. **Create Dashboard Hooks Directory**
   - Create `hooks/dashboard/` directory
   - Will house all dashboard-specific hooks

2. **Enhance API Routes** (needs backend work)
   - Add POST/PUT/DELETE to `/api/blogs/admin` (currently only GET)
   - Add PATCH `/api/applications/[id]` for status updates
   - Ensure all dashboard APIs require admin auth
   - **Note**: Verify `app/api/applications/route.ts` needs auth guard

### Phase 2: Dashboard Hooks (in `hooks/dashboard/`)

All hooks follow the pattern: `useQuery` for fetch + `useMutation` for write ops.

1. **`use-dashboard-blogs.ts`**
   - `useDashboardBlogs()`: Fetch all blogs (admin data)
   - `useCreateBlog()`: POST new blog
   - `useUpdateBlog()`: PUT update blog
   - `useDeleteBlog()`: DELETE blog
   - Returns: `{ blogs, isLoading, error, createBlog, updateBlog, deleteBlog }`

2. **`use-dashboard-careers.ts`**
   - `useDashboardCareers()`: Fetch all jobs (including draft/published)
   - `useCreateCareer()`: POST new job
   - `useUpdateCareer()`: PUT update job
   - `useDeleteCareer()`: DELETE job
   - Returns: `{ careers, isLoading, error, createCareer, updateCareer, deleteCareer }`

3. **`use-dashboard-applications.ts`**
   - `useDashboardApplications()`: Fetch all applications (extend existing)
   - `useUpdateApplicationStatus()`: PATCH update status (pending/reviewed/accepted/rejected)
   - Returns: `{ applications, isLoading, error, updateStatus }` + computed stats

   **Stats**: Total, pending, reviewed, accepted, rejected counts

### Phase 3: Dashboard Layout & Navigation

1. **Dashboard Layout** (optional: `app/dashboard/layout.tsx`)
   - Create a consistent dashboard layout with:
     - Admin navbar (or reuse main navbar)
     - Side navigation for dashboard sections
   - **Decision**: Should we use sidebar or top-nav? Need user input.

2. **Main Dashboard Page** (`app/dashboard/page.tsx`)
   - Overview statistics cards: total blogs, jobs, applications (by status)
   - Recent activity (latest applications, recent blog posts, latest jobs)
   - Quick action buttons (Create Blog, Create Job, View Applications)
   - Use Card components with `shadow-apple` styling
   - Framer Motion entrance animations
   - Responsive grid layout

3. **Navigation Between Sections**
   - Use Next.js Link components
   - Active link styling (primary color)
   - Consistent navigation pattern

### Phase 4: Blog Management Page** (`app/dashboard/blogs/page.tsx`)
- **Header**: Page title "Blog Management" + "Create New Blog" button
- **Blog List**: Table or Card grid showing:
  - Title, slug, status (draft/published), featured badge, author, published date
  - Actions: Edit, Delete (with confirmation)
  - Filter by status (All/Draft/Published) - use URL query state like public blogs page
- **Empty State**: When no blogs
- **Loading State**: Spinner component
- **Modals/Sheets**: For create/edit (use Dialog/Sheet from shadcn)
  - Form fields: title, content (rich text?), slug, excerpt, description, tags, thumbnail, status, featured
  - Need blog editor - consider using MDX or simple textarea for now
- **Delete Confirmation**: AlertDialog

**Design**: Table layout with shadcn Table component + Card rows, or Card grid similar to Openings component.

### Phase 5: Career/Job Management Page** (`app/dashboard/career/page.tsx`)
- **Header**: Page title "Job Management" + "Create New Job" button
- **Job List**: Card grid showing:
  - Title, department, location, type, salary, status (draft/published)
  - Actions: Edit, Delete, View Details
  - Filter by status/department (URL query state)
- **Create/Edit Modal**: Form with all Job fields
  - title, department, location, type, salary, description, responsibilities[], requirements[], status
- **Delete Confirmation**: AlertDialog
- **Stats**: Quick stats at top (total jobs, published, drafts)

**Design**: Similar to `components/career/openings.tsx` but with admin actions.

### Phase 6: Applications Management Page** (`app/dashboard/applications/page.tsx`)
- **Header**: Page title "Applications" + filters
- **Filter**: By status (All/Pending/Reviewed/Accepted/Rejected)
- **Applications List**: Table or Card list showing:
  - Applicant name, email, job title, status, applied date, resume link
  - Actions: View details, Change status (dropdown), Delete
- **Stats Cards**: Row of stats cards at top showing counts by status
- **Application Detail Modal/Sheet**:
  - Full applicant info: name, email, phone, linkedin, message, resume download link
  - Status change dropdown
  - Notes section (optional)
- **Bulk Actions**: Select multiple to update status? (optional)

**Design**: Table with shadcn Table + Badge for status, Dropdown for status changes.

---

## Component Reuse & Creation

### Reusable Components (Already Exist)
- `components/ui/card.tsx`
- `components/ui/button.tsx`
- `components/ui/table.tsx`
- `components/ui/badge.tsx`
- `components/ui/dialog.tsx` (for modals)
- `components/ui/alert-dialog.tsx` (for delete confirm)
- `components/ui/sheet.tsx` (slide-over panels)
- `components/ui/select.tsx` (dropdowns)
- `components/ui/input.tsx`, `components/ui/textarea.tsx`, `components/ui/label.tsx` (forms)
- `components/ui/form.tsx` (form handling with react-hook-form)
- `components/ui/empty.tsx` (empty states)
- `components/ui/spinner.tsx` or `components/ui/skeleton.tsx` (loading states)

### New Components to Create

1. **Dashboard Stats Card** - reusable stats display
   - Props: `title`, `value`, `subtitle?`, `icon?`, `trend?`
   - Use Card + large number + icon

2. **Dashboard Blog Card/Row** - for blog list
   - Shows: title, status badge, featured badge, dates
   - Actions: Edit, Delete buttons

3. **Dashboard Job Card/Row** - for job list
   - Shows: title, department, location, status
   - Actions: Edit, Delete, View

4. **Application Card/Row** - for application list
   - Shows: applicant name, job title, status badge, date
   - Actions: View detail, status dropdown

5. **Blog Editor Component** - rich form for creating/editing blogs
   - Form with title, slug, content (textarea or rich editor), excerpt, description, tags (multiselect), thumbnail (file upload or URL), featured toggle, status select
   - Use shadcn Form with zod validation

6. **Job Form Component** - form for job CRUD
   - Already have application form as a pattern
   - Create similar component with all job fields

7. **Dashboard Navigation** (if using sidebar or top nav)
   - DashboardNav component with links to sections

---

## Authentication & Authorization

### Current Auth Setup
- Better-Auth client in `lib/auth-client.ts`
- Admin routes already check session (`auth.api.getSession()`)
- Need to ensure **only admins** can access dashboard

### Implementation
1. **Protect Dashboard Routes** in each `page.tsx`
   ```tsx
   // At top of each dashboard page
   import { auth } from "@/lib/auth";
   import { redirect } from "next/navigation";

   // In Server Component (default)
   const session = await auth.api.getSession();
   if (!session || !session.user.isAdmin) { // Need isAdmin flag
     redirect("/sign-in");
   }
   ```

2. **Add isAdmin Role** to User model in Prisma (if not exists)
   - Add `role` field to User: `enum` with values `user`, `admin`
   - Or use simple boolean `isAdmin`
   - Update auth to include role in session

3. **If no role system exists**, protect by checking email or a flag
   - Temporary: allow any authenticated user to access dashboard
   - But properly implement role-based access soon

---

## Data Flow Architecture

```
Dashboard Page (Server Component by default)
  │
  ├─ Import dashboard hooks (client hooks, so page becomes client)
  │   OR
  ├─ Fetch data in server component, pass as props to client components
  │
  └─ Render client components (Cards, Lists, Modals)
      │
      └─ Client components use dashboard hooks for mutations
          └─ Mutations invalidate queries → refetch
```

**Decision**: Server or Client pages?
- Option A: Server pages → fetch data server-side → pass to client components
- Option B: All client pages → use hooks directly

**Recommendation**: Use client pages (`"use client"`) for dashboard to leverage TanStack Query hooks directly, consistent with existing patterns in `app/blogs/page.tsx` which is client-side.

---

## File Structure After Implementation

```
hooks/
├── dashboard/
│   ├── use-dashboard-blogs.ts
│   ├── use-dashboard-careers.ts
│   └── use-dashboard-applications.ts
app/
└── dashboard/
    ├── page.tsx
    ├── layout.tsx (optional)
    ├── blogs/
    │   ├── page.tsx
    │   └── components/
    │       ├── blog-list.tsx
    │       ├── blog-card.tsx
    │       └── blog-editor.tsx
    ├── career/
    │   ├── page.tsx
    │   └── components/
    │       ├── job-list.tsx
    │       ├── job-card.tsx
    │       └── job-form.tsx
    └── applications/
        ├── page.tsx
        └── components/
            ├── application-list.tsx
            ├── application-card.tsx
            ├── application-detail.tsx
            └── stats-overview.tsx
```

---

## API Requirements (Backend Tasks)

### Must Have Before Dashboard Works

1. **Blogs Admin CRUD** (`app/api/blogs/admin/route.ts`)
   - Already has GET
   - **Add POST** (create blog)
   - **Add PUT** (update blog)
   - **Add DELETE** (delete blog)
   - All must be admin-auth protected
   - Handle image uploads (thumbnail) - either as URL or file upload to Vercel Blob/Cloudinary

2. **Applications Status Update** (`app/api/applications/[id]/route.ts` or same route)
   - Add PATCH endpoint to update status
   - Admin auth required
   - Payload: `{ status: "accepted" | "rejected" | "reviewed" | "pending" }`

3. **Fix Applications API Auth** (`app/api/applications/route.ts`)
   - Currently public - should be admin-only for GET
   - Or create separate admin endpoint at `/api/admin/applications`

4. **Blog Categories/Tags Management** (optional)
   - If needed, add API for managing categories
   - Or handle as simple strings for now

### Optional Enhancements
- Search/filter query params support in APIs
- Pagination for large datasets
- Bulk operations (bulk delete, bulk status update)

---

## Step-by-Step Implementation Order

### Day 1: Hooks & Blog Management
1. Create `hooks/dashboard/use-dashboard-blogs.ts`
2. Enhance `/api/blogs/admin` with POST/PUT/DELETE
3. Build `app/dashboard/blogs/page.tsx` with list
4. Create blog editor component (modal/sheet)
5. Test full CRUD flow for blogs

### Day 2: Job Management
6. Create `hooks/dashboard/use-dashboard-careers.ts` (extend existing pattern)
7. Build `app/dashboard/career/page.tsx` with list
8. Create job form component
9. Test CRUD for jobs

### Day 3: Applications Management
10. Create `hooks/dashboard/use-dashboard-applications.ts` (extend existing)
11. Add PATCH endpoint for applications status
12. Build `app/dashboard/applications/page.tsx` with stats + list
13. Create application detail view & status update
14. Test applications workflow

### Day 4: Main Dashboard & Polish
15. Build `app/dashboard/page.tsx` overview with stats
16. Add navigation between sections
17. Ensure consistent styling & animations
18. Add loading/error/empty states everywhere
19. Test all flows end-to-end

---

## Verification & Testing

### Manual Testing Checklist
- [ ] Dashboard routes require authentication (redirect non-auth to sign-in)
- [ ] Admin role check works (non-admins blocked)
- [ ] All pages load with proper animations
- [ ] Blog CRUD: Create, Read (list & detail), Update, Delete
- [ ] Job CRUD: Create, Read, Update, Delete
- [ ] Application status updates work
- [ ] Stats calculations correct on overview page
- [ ] Responsive design on mobile/tablet
- [ ] All modals/sheets open/close properly
- [ ] Loading states show during fetches
- [ ] Error states display properly
- [ ] Confirmations for delete actions

### Code Quality
- Follow design system (Satoshi/Inter, colors, shadows)
- Use Framer Motion variants consistently
- Proper TypeScript types for all props and data
- Error handling in all mutations
- Optimistic updates? (optional)

---

## Open Questions for User

1. **Dashboard Layout**: Should we use a sidebar navigation (persistent) or top navigation bar? Sidebar is more traditional for admin panels, top-nav matches public site.

2. **Blog Editor**: What editor should we use? Options:
   - Simple `textarea` with plain text (markdown)
   - Rich text editor (Tiptap, Lexical) - adds complexity
   - Import existing blog creation flow from Fumadocs?

3. **Image Uploads**: How to handle blog thumbnails?
   - Upload to Vercel Blob / Cloudinary / S3?
   - Or just paste URL for now?

4. **Admin Authorization**: How to determine admin users?
   - Add `role` field to User model?
   - Check against specific email list?
   - All authenticated users can access for now?

5. **Application Management**: Should we allow deleting applications? Or only status updates?

6. **Stale Data**: Dashboard data can be more dynamic. Should we use shorter staleTime (2 min) or manual refetch on focus?

7. **Real-time Updates**: Consider using TanStack Query `onWindowFocus: true` to refetch when tab gains focus?

---

## Notes

- All dashboard pages should be **client components** (`"use client"`) to use hooks freely
- Follow existing patterns from `app/blogs/page.tsx` for URL state management (nuqs) and filtering
- Reuse components from `components/` like Card, Button, Badge, Table, etc.
- Use `-translate-y-1` hover effect on cards
- Use `rounded-3xl` for all cards and containers
- Keep animations smooth with `easeOut` and `duration: 0.5`
- Use `cn()` utility from `@/lib/utils` for conditional class merging

---

## Critical Dependencies

The dashboard **depends** on these backend implementations:
1. POST/PUT/DELETE for `/api/blogs/admin` (MUST)
2. PATCH for applications status (MUST)
3. Auth guards on all dashboard APIs (MUST)

If these APIs are not ready, the dashboard UI can be built but will fail on mutations.

---

**Plan Status**: Ready for review. This plan covers all four dashboard pages, hooks, components, and API requirements following the established design patterns.
