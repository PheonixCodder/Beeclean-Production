# Redesign Blogs Page to Match Homepage Design System

## Context

The current `app/blogs/page.tsx` and its components do not match the premium Apple-style design language used throughout the homepage and other sections of the Beeclean app. The blogs page looks like a basic blog listing with:

- Outlined tag buttons (should be solid with shadows like navbar CTA)
- Simple cards with borders and minimal styling (should use Card component with shadows)
- Flickering grid background (doesn't match clean white backgrounds)
- No proper header/hero section
- Missing proper animations and motion patterns
- Inconsistent typography (missing font-satoshi for headings)
- No hover effects or interactive polish

**Goal:** Transform the blogs page to match the sophisticated design system used in `components/home/` sections with:
- White/light backgrounds (no busy grid patterns)
- Apple-style shadows (`shadow-apple`, `shadow-apple-hover`)
- Proper Typography hierarchy (Satoshi for headings, Inter for body)
- Smooth Framer Motion animations with stagger effects
- Premium card designs with rounded corners
- Modern tag filter with solid styling
- Consistent spacing and max-width containers

---

## Files to Modify

### 1. `app/blogs/page.tsx`
**Current Issues:**
- Uses flickering grid background (not in design system)
- Header is too minimal
- Grid uses border hacks with pseudo-elements (should use proper borders or gap)
- Loading/error states need redesign
- Missing proper motion wrapper with stagger

**Changes Needed:**
- Remove flickering grid background
- Redesign header section with proper typography and spacing (match Features/FAQ pattern)
- Use proper grid with gap instead of border-between-items approach
- Add `whileInView` animations for the blog grid
- Wrap entire page in motion div with staggers
- Use white/light background consistent with other pages
- Fix loading state to be minimal (skeleton or spinner)
- Fix error state to match design system

### 2. `components/blog/blog-card.tsx`
**Current Issues:**
- Uses custom border pseudo-elements for grid lines (not scalable, hacky)
- Card lacks proper shadow and rounded corners
- No hover elevation effect
- Typography inconsistent with design system
- Image aspect ratio not controlled (can cause layout shifts)

**Changes Needed:**
- Replace with shadcn/ui `Card` component structure
- Use `rounded-3xl` corners
- Apply `shadow-apple` on card, `shadow-apple-hover` on hover with translate-y
- Use Satoshi for title, Inter for body
- Add smooth image hover scale effect (already exists but improve)
- Fixed image aspect ratio (e.g., h-48 or aspect-video)
- Remove border-between approach (handled by grid gap)
- Add proper spacing with p-6/p-8

### 3. `components/blog/tag-filter.tsx`
**Current Issues:**
- Uses outlined buttons with border (should be solid like CTA buttons)
- Mobile drawer is fine but styling needs update
- Tag styling doesn't match premium aesthetic

**Changes Needed:**
- Desktop: Solid dark buttons (`bg-[#1a1a1a] text-white`) with `shadow-apple hover:shadow-apple-hover`
- Rounded-xl with proper padding
- Hover effect: `hover:-translate-y-0.5` lift
- Active/selected state: black background with white text
- Mobile drawer: Update button styles to match
- Remove outlined variants entirely

### 4. `components/blog/not-found.tsx` (if exists)
**Check and update** to match design system if it uses old styling

---

## Design System Reference

### Typography
- **Headings/Section Titles:** `font-satoshi`, `text-5xl md:text-6xl`, `font-black`, `tracking-tight`
- **Subtitles:** `text-lg text-muted-foreground font-medium`
- **Card Titles:** `text-xl font-bold text-gray-800` (or `text-card-foreground`)
- **Body Text:** `text-sm text-muted-foreground` or `text-gray-500`

### Colors
- **Backgrounds:** `bg-white` or `bg-gray-50` (for alternating sections)
- **Cards:** `bg-white` with `shadow-apple` OR `bg-[#F6F6F6]`
- **Buttons:** `bg-[#1a1a1a] text-white` or `bg-white text-gray-900`
- **Text:** `text-gray-800` (primary), `text-gray-500` (muted), `text-foreground/85` (secondary)

### Spacing
- **Container:** `max-w-7xl mx-auto px-6 lg:px-0`
- **Section Padding:** `py-20` or `pt-30` for first section
- **Card Padding:** `p-6` or `p-8`
- **Gaps:** `gap-4`, `gap-6`, `gap-8` depending on context

### Borders & Radius
- **Cards:** `rounded-3xl` (24px)
- **Buttons:** `rounded-xl` (16px)
- **Tag buttons:** `rounded-lg` (12px) or `rounded-xl`
- **No borders on cards** (use shadows instead)

### Shadows
- **Standard card shadow:** `shadow-apple` (0 5px 25px rgba(0,0,0,0.05), 0 50px 48px rgba(0,0,0,0.1))
- **Hover shadow:** `shadow-apple-hover` (0 20px 35px rgba(0,0,0,0.15), 0 30px 60px rgba(0,0,0,0.18))
- **Button shadow:** `shadow-apple hover:shadow-apple-hover`

### Animations
- **Page load:** `initial="hidden" animate="visible"` with `staggerChildren: 0.1`
- **Scroll reveal:** `whileInView="visible" viewport={{ once: true, amount: 0.2 }}`
- **Card entry:** `hidden: { opacity: 0, y: 30 } visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }`
- **Hover effects:** `whileHover={{ scale: 1.02, y: -2 }}` for interactive elements
- **Image zoom:** `group-hover:scale-105 transition-transform duration-300`

### Layout Pattern (from Features/FAQ/Pricing)
```tsx
<motion.div
  className="flex flex-col gap-12 p-10 justify-center items-center min-h-screen font-satoshi"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={staggerVariants}
>
  {/* Header */}
  <motion.div className="max-w-xl text-center" variants={fadeUpVariants}>
    <h4 className="text-5xl font-black tracking-tight">Title</h4>
    <p className="text-lg text-muted-foreground font-medium mt-4">
      Subtitle description
    </p>
  </motion.div>

  {/* Content Grid */}
  <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
    {items.map((item) => (
      <motion.div key={item.id} variants={fadeUpVariants}>
        <Card className="rounded-3xl border-none shadow-apple overflow-hidden bg-white hover:shadow-apple-hover transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-6">
            {/* Card content */}
          </CardContent>
        </Card>
      </motion.div>
    ))}
  </motion.div>
</motion.div>
```

---

## Implementation Order

1. **Update BlogCard component** first (independent, reusable)
2. **Update TagFilter component** next (independent)
3. **Update BlogsPage** to use new components and overall layout
4. **Test responsive behavior** on mobile/tablet/desktop
5. **Verify animations** are smooth and match pattern
6. **Remove** any commented-out code for `HowItWorks` if present

---

## Verification Steps

1. **Visual check:**
   - Run dev server: `bun run dev`
   - Navigate to `/blogs`
   - Compare with homepage sections (Features, Pricing)
   - Check that design language is consistent (shadows, typography, spacing, colors)

2. **Responsive check:**
   - Test mobile (< 768px): Single column, stacked tags in drawer
   - Test tablet (768-1024px): 2 columns, horizontal tag filter
   - Test desktop (> 1024px): 3 columns, full tag filter visible

3. **Animation check:**
   - Scroll to blogs page - cards should stagger in
   - Hover over cards - should lift with shadow increase
   - Hover over tag buttons - should lift slightly
   - Click tags - filter should animate smoothly

4. **Accessibility check:**
   - All images have alt text
   - Buttons have proper focus states
   - Keyboard navigation works
   - Color contrast is sufficient

5. **Performance check:**
   - No layout shifts on load
   - Images use proper aspect ratios
   - No unnecessary re-renders

---

## Expected Outcome

A premium, Apple-style blogs page that feels like a natural part of the Beeclean app:
- ✅ Consistent with homepage design language
- ✅ Smooth, performant animations
- ✅ Polished hover states and interactions
- ✅ Clean, maintainable code structure
- ✅ Properly structured with motion variants
- ✅ Fully responsive across all breakpoints
- ✅ SEO-friendly with proper metadata (bonus: add to page.tsx)
