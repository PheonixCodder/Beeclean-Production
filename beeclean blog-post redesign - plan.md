# Redesign Blog Post Page to Match Homepage Design System

## Context

The blog post page (`app/blogs/[slug]/page.tsx`) and its associated components do not match the premium Apple-style design language used throughout the homepage. The current implementation has:

- **Flickering grid background** - busy pattern that doesn't align with clean white aesthetic
- **Old-style borders and dividers** - uses border hacks and pseudo-elements
- **Inconsistent typography** - missing font-satoshi for headings, wrong sizing
- **No proper motion wrapper** - missing scroll-triggered animations
- **Sidebar elements** - Table of Contents, AuthorCard, PromoContent need redesign
- **Mobile TOC** - needs design alignment
- **ReadMoreSection** - needs to match card styling

**Goal:** Transform the entire blog post page to match the sophisticated design system:
- Clean white/light backgrounds
- Apple-style shadows (`shadow-apple`, `shadow-apple-hover`)
- Proper typography hierarchy (Satoshi for headings, Inter for body)
- Smooth Framer Motion animations with stagger effects
- Premium component treatments with rounded corners
- Consistent spacing and max-width containers
- No border grid hacks

---

## Files to Modify

### 1. `app/blogs/[slug]/page.tsx`
**Current Issues:**
- FlickeringGrid background at top
- Border-b on header section
- Complex border-x/divide-x layout with pseudo-element border
- No proper motion wrapper for page-level animations
- Back button uses tiny w-6 h-6 (too small for touch targets)
- Tags use outdated styling (bg-muted, border)
- Title font-medium instead of bold
- Main content area has inconsistent padding

**Changes Needed:**
- Remove FlickeringGrid completely
- Wrap entire page in motion div with whileInView + staggerChildren
- Redesign header: large Satoshi title, better spacing, improved tag styling
- Redesign back button: proper size (h-10 w-auto px-4), with text label
- Update tags: solid design similar to TagFilter, or clean badge style
- Use white background with subtle gray sections where appropriate
- Simplify layout: remove complex border hacks, use spacing/gap instead
- Content wrapper: proper max-w-3xl for readability, centered
- Re-add HashScrollHandler (keep it but ensure it's styled correctly)
- Update featured image: rounded-3xl with shadow-apple
- Update sidebar components styling (pass proper className props or redesign them)
- Mobile TOC should use drawer matching mobile tag filter style

### 2. `components/blog/table-of-contents.tsx`
**Current Issues:**
- Likely uses basic styling with borders
- Needs to match card style with shadow-apple

**Changes Needed:**
- Wrap in Card component with `rounded-3xl border-none shadow-apple`
- Use proper typography for headings hierarchy
- Add smooth scroll active state styling
- Remove borders, use spacing instead

### 3. `components/blog/mobile-toc.tsx`
**Current Issues:**
- Drawer styling needs update

**Changes Needed:**
- Match Drawer style used in updated TagFilter
- Clean white background, dark buttons
- Proper typography

### 4. `components/blog/author-card.tsx`
**Current Issues:**
- Avatar + text layout may be basic

**Changes Needed:**
- Use Card component: `rounded-3xl border-none shadow-apple p-6`
- Avatar: proper sizing (h-16 w-16 or similar)
- Author name: `font-bold text-lg`
- Position: `text-sm text-muted-foreground`
- Clean white background
- Optional: add subtle hover effect

### 5. `components/blog/promo-content.tsx`
**Current Issues:**
- May use old styling

**Changes Needed:**
- Match CTA style from homepage (promo cards)
- Use `rounded-3xl`, `shadow-apple`, proper colors
- Smooth animations on hover

### 6. `components/blog/read-more-section.tsx`
**Current Issues:**
- Grid of blog cards - need to ensure they use updated BlogCard

**Changes Needed:**
- Ensure it uses the new BlogCard component (should be automatic)
- Wrap section in motion div for scroll animation
- Header styling: match "Featured Posts" or similar pattern
- Grid layout with gap-6

---

## Design System Reference

### Typography
- **Page Title:** `text-5xl md:text-6xl font-black tracking-tight text-gray-900`
- **Section Headers:** `text-3xl md:text-4xl font-black tracking-tight`
- **Body Text:** `text-base text-muted-foreground leading-relaxed`
- **Metadata/Tags:** `text-sm font-medium`
- **Prose Content:** `text-lg leading-relaxed tracking-tight` (for readability)

### Layout Structure
```tsx
<motion.div
  className="min-h-screen bg-white font-satoshi"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
  variants={staggerVariants}
>
  {/* Hero Header */}
  <div className="pt-30 pb-12 px-6 border-b border-gray-100">
    <div className="max-w-7xl mx-auto">
      {/* Back button */}
      <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-gray-900 mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to all articles
      </Link>

      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 mb-6">
        {title}
      </h1>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <time>{date}</time>
        <span>•</span>
        {tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-gray-100 rounded-lg font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* Excerpt */}
      {excerpt && (
        <p className="text-lg text-muted-foreground mt-6 max-w-4xl leading-relaxed">
          {excerpt}
        </p>
      )}
    </div>
  </div>

  {/* Main Content Area */}
  <div className="max-w-7xl mx-auto px-6 py-16 lg:px-0">
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
      {/* Main Column */}
      <div className="min-w-0">
        {thumbnail && (
          <div className="relative rounded-3xl overflow-hidden shadow-apple mb-12">
            <Image src={thumbnail} alt={title} fill className="object-cover" />
          </div>
        )}

        <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed">
          <ConvertToMarkdown text={content} />
        </article>

        {/* Read More Section */}
        <div className="mt-20">
          <ReadMoreSection currentSlug={[slug]} currentTags={tags} />
        </div>
      </div>

      {/* Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-8">
          {author && <AuthorCard author={...} />}
          <Card className="rounded-3xl border-none shadow-apple p-6">
            <TableOfContents />
          </Card>
          <PromoContent variant="desktop" />
        </div>
      </aside>
    </div>
  </div>
</motion.div>
```

### Component Styling Patterns

**Card (for TOC, Promo, Author):**
```tsx
<Card className="rounded-3xl border-none shadow-apple overflow-hidden bg-white">
  <CardHeader className="p-6 pb-4">
    <h3 className="text-xl font-bold text-gray-900">Section Title</h3>
  </CardHeader>
  <CardContent className="p-6 pt-0">
    {/* Content */}
  </CardContent>
</Card>
```

**Button Variants:**
- Primary: `bg-[#1a1a1a] text-white shadow-apple hover:shadow-apple-hover rounded-xl`
- Secondary: `bg-white text-gray-900 border border-gray-200 shadow-apple hover:shadow-apple-hover rounded-xl`
- Ghost: `text-muted-foreground hover:text-gray-900 hover:bg-gray-50`

**Tags/Badges:**
```tsx
<span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium text-sm">
  {tag}
</span>
```

### Spacing
- Container: `max-w-7xl mx-auto px-6 lg:px-0`
- Main content width: `max-w-3xl` (for prose) or `max-w-4xl`
- Section padding: `py-16`, `py-20`
- Gap between elements: `gap-4`, `gap-6`, `gap-8`
- Sidebar sticky offset: `top-24`

### Animations
- Page load: `initial="hidden" whileInView="visible"` with `staggerChildren: 0.1`
- Child elements: `fadeUpVariants` (opacity 0→1, y 30→0, 0.5s easeOut)
- Scroll-triggered: `viewport={{ once: true, amount: 0.1 }}`

---

## Implementation Order

1. **Update components first** (independent, reusable):
   - AuthorCard
   - TableOfContents
   - MobileTableOfContents
   - PromoContent
   - ReadMoreSection

2. **Update main page** (app/blogs/[slug]/page.tsx):
   - Remove flickering grid
   - Add motion wrapper
   - Redesign header with proper typography
   - Update content layout
   - Style sidebar with new component styles
   - Update all spacing and colors

3. **Test** thoroughly:
   - Responsive breakpoints
   - Animations
   - Performance (images, scroll)
   - Accessibility (headings, landmarks, focus)

---

## Verification Steps

1. **Visual check:**
   - Navigate to a blog post
   - Compare with homepage design language
   - Check typography hierarchy matches
   - Verify shadows and hover effects

2. **Responsive check:**
   - Mobile: single column, mobile TOC drawer
   - Tablet: single column max-width
   - Desktop: 2-column layout with sidebar

3. **Interaction check:**
   - Back button navigation
   - Table of contents smooth scroll
   - Hover effects on cards and buttons
   - Mobile drawer opens/closes properly

4. **Performance check:**
   - No layout shift on load
   - Images have proper aspect ratios
   - Motion animations are smooth (60fps)

---

## Expected Outcome

A premium, Apple-style blog post page that:
- ✅ Matches homepage design language perfectly
- ✅ Has clean white background with subtle gray accents
- ✅ Uses proper typography (Satoshi/Inter) with correct hierarchy
- ✅ Smooth scroll-triggered animations on all sections
- ✅ Premium card treatments with rounded corners and shadows
- ✅ Consistent spacing and layout
- ✅ Fully responsive with mobile-optimized TOC
- ✅ Feels like a cohesive part of the Beeclean app

---

## Notes

- The current `HashScrollHandler` should be kept as it provides important scroll behavior for TOC highlighting
- Prose configuration should be updated to match design system fonts and colors
- Consider adding a reading time indicator in header
- Mobile TOC button should be positioned properly (bottom-right floating or in header)
