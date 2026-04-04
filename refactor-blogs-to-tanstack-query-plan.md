# Refactor Blogs to Use TanStack Query Hooks

## Context

The current blog pages (`app/blogs/page.tsx` and `app/blogs/[slug]/page.tsx`) use manual `useEffect` + `useState` for data fetching. This should be refactored to use TanStack Query via custom hooks in the `hooks/` folder, following the pattern established by `hooks/use-auth.ts`.

---

## Goals

1. **Separation of concerns** - Move data fetching logic out of pages into reusable hooks
2. **Better caching** - TanStack Query provides automatic caching, background refetching, and stale-while-revalidate
3. **Simpler pages** - Pages become simpler, focusing on presentation only
4. **Consistent patterns** - Match existing `use-auth.ts` hook structure
5. **Optimistic updates** - Future potential for optimistic UI updates
6. **Type safety** - Proper TypeScript types for all data

---

## Files to Create

### 1. `hooks/use-blogs.ts`
**Purpose:** Fetch all blogs with optional tag filtering and computed tag counts

**Features:**
- Accept optional `tag` parameter to filter blogs
- Return filtered blogs, all tags (with counts), loading/error states
- Use `useMemo` to compute tag counts and filtering client-side (since we fetch all blogs anyway)
- Query key: `['blogs']` (no need for tag in key if we filter client-side)
- Options: `staleTime: 5 * 60 * 1000` (5 minutes), `gcTime: 10 * 60 * 1000`

**Return type:**
```typescript
{
  blogs: BlogData[];
  allTags: string[];
  tagCounts: Record<string, number>;
  filteredBlogs: BlogData[];
  isLoading: boolean;
  error: Error | null;
}
```

### 2. `hooks/use-blog-post.ts`
**Purpose:** Fetch a single blog post by slug

**Features:**
- Accept `slug` parameter (required)
- Return blog post data or null if not found
- Query key: `['blogPost', slug]`
- Options: `staleTime: 5 * 60 * 1000`, `gcTime: 10 * 60 * 1000`
- Handle 404 errors gracefully

**Return type:**
```typescript
{
  blog: Blog | null;
  isLoading: boolean;
  error: Error | null;
}
```

---

## Files to Update

### 1. `app/blogs/page.tsx`
**Changes:**
- Remove `useEffect`, `useState`, `useMemo` for blog data
- Remove `Suspense` boundary (not needed for TanStack Query)
- Import and use `useBlogs` hook
- Access `filteredBlogs`, `allTags`, `tagCounts`, `isLoading`, `error` from hook
- Remove manual data fetching logic
- Keep `handleTagClick` function (router logic)
- Update loading/error rendering to use TanStack Query states

### 2. `app/blogs/[slug]/page.tsx`
**Changes:**
- Remove `useEffect`, `useState` for blog data
- Import and use `useBlogPost` hook with `slug` parameter
- Access `blog`, `isLoading`, `error` from hook
- Remove manual fetch logic
- Update loading/error states
- Remove `notFound()` call - let the page render and handle null blog gracefully OR call notFound when `error` indicates 404

---

## Implementation Details

### Hook: `useBlogs`
```typescript
import { useQuery } from '@tanstack/react-query';

interface BlogData {
  // same as existing
}

export function useBlogs() {
  const fetchBlogs = async (): Promise<BlogData[]> => {
    const res = await fetch('/api/blogs');
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
  };

  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Compute all tags with counts
  const { allTags, tagCounts } = useMemo(() => {
    const tagsSet = new Set<string>();
    const counts: Record<string, number> = { All: blogs.length };

    blogs.forEach((blog) => {
      blog.tags?.forEach((tag) => {
        tagsSet.add(tag);
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return {
      allTags: ['All', ...Array.from(tagsSet).sort()],
      tagCounts: counts,
    };
  }, [blogs]);

  // Filtering function (accepts selected tag and returns filtered array)
  const getFilteredBlogs = useCallback((selectedTag: string): BlogData[] => {
    return selectedTag === 'All'
      ? blogs
      : blogs.filter((blog) => blog.tags?.includes(selectedTag));
  }, [blogs]);

  return {
    blogs,
    allTags,
    tagCounts,
    isLoading,
    error,
    getFilteredBlogs,
  };
};
```

**Usage in page:**
```typescript
const { allTags, tagCounts, getFilteredBlogs, isLoading, error } = useBlogs();
const filteredBlogs = getFilteredBlogs(selectedTag);
```

---

### Hook: `useBlogPost`
```typescript
import { useQuery } from '@tanstack/react-query';

export function useBlogPost(slug: string) {
  const fetchBlogPost = async (): Promise<Blog> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blogs/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      if (res.status === 404) throw new Error('Not found');
      throw new Error('Failed to fetch blog post');
    }
    return res.json();
  };

  const {
    data: blog = null,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: fetchBlogPost,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!slug, // Only fetch if slug is provided
  });

  return {
    blog,
    isLoading,
    error,
  };
}
```

**Usage in page:**
```typescript
const { blog, isLoading, error } = useBlogPost(slug);

if (isLoading) return <LoadingSpinner />;
if (error) notFound(); // or error handling
if (!blog) return null;

// render blog
```

---

## Benefits

1. **Automatic caching** - Blogs list cached for 5 minutes, shared across components
2. **Background refetching** - On window focus, data can be refetched automatically
3. **DevTools integration** - Can inspect queries in React Query DevTools
4. **Simpler pages** - No manual fetch logic, just use the hook
5. **Type-safe** - Full TypeScript support
6. **Error handling** - Centralized error handling with TanStack Query
7. **Loading states** - `isLoading`, `isFetching`, `isError` all available
8. **Refetching** - Easy to add manual refetch with `refetch()` from hook

---

## Migration Steps

1. Create `hooks/use-blogs.ts`
2. Create `hooks/use-blog-post.ts`
3. Update `app/blogs/page.tsx` to use `useBlogs`
4. Update `app/blogs/[slug]/page.tsx` to use `useBlogPost`
5. Test both pages functionality
6. Verify caching works (navigate between pages, check network tab)
7. Check error states still work
8. Verify loading states display correctly

---

## Expected Outcome

- ✅ Pages are simpler and cleaner
- ✅ Data fetching is standardized across the app
- ✅ Better performance with automatic caching
- ✅ Easier to add real-time updates in the future
- ✅ Better developer experience with TanStack Query DevTools
