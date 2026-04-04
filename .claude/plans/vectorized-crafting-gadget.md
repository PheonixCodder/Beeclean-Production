# Auth System Redesign Plan

## Context
The current authentication pages (`/sign-in`, `/sign-up`) do NOT match the premium Apple-style design system used on the homepage (`app/page.tsx`). They have multiple design inconsistencies:

### Current Issues

**Layout (`app/(auth)/layout.tsx`)**
- Uses `font-sequel` (undefined font)
- Uses `bg-muted` (light gray) instead of clean white background
- No Apple-style shadows or animations

**Sign In/Up Cards (`components/auth/signin-view.tsx`, `signup-view.tsx`)**
- Two-column split layout is fine (keep per user decision)
- Right panel: Uses `bg-primary` (pinkish) which may not match brand; user wants logo only (already present)
- Card lacks `rounded-3xl`, `shadow-apple`, `border-none`
- No hover shadow effect
- missing animations (Framer Motion)
- Typography: `text-2xl font-bold` too small; should be `text-4xl font-black tracking-tight` with `font-satoshi`
- Body text not using `font-inter`
- Inputs have default rounded (`rounded-md`), should be `rounded-lg` (12px) per design
- Buttons are `w-full` but lack Apple styling: missing `bg-[#1a1a1a]`, `shadow-apple`, `rounded-xl`, proper hover
- Alert styling is generic (destructive colors) - could be refined
- Form labels not using consistent font weights
- Overall spacing is good but could be more generous

**Images**: Right panel uses `/logo.svg` - okay, but positioned poorly; needs better centering and maybe larger.

---

## Design System Reference (from CLAUDE.md & homepage)

- **Fonts**: `font-satoshi` for headings, `font-inter` for body
- **Shadows**: `shadow-apple` (base), `shadow-apple-hover` (interactive)
- **Radius**: Cards `rounded-3xl` (24px), Buttons/Inputs `rounded-xl` (16px) or `rounded-lg` (12px)
- **Colors**: Background `bg-white`, Text `text-gray-900`, Buttons `bg-[#1a1a1a] text-white`
- **Animations**: Use Framer Motion (fade-in, slide-up) with `easeOut`
- **Spacing**: Generous padding (`p-6`, `p-8`, `py-20`)
- **Typography**:
  - Headings: `text-4xl md:text-5xl font-black tracking-tight`
  - Body: `text-base font-medium`
  - Labels: `text-sm font-semibold`

---

## Implementation Plan

### 1. Update Auth Layout (`app/(auth)/layout.tsx`)
- Replace `bg-muted` → `bg-white`
- Remove `font-sequel` (not needed; fonts set in children)
- Ensure `min-h-screen` and center content properly
- Add subtle fade-in animation for children

```tsx
<div className="bg-white font-satoshi flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
  <div className="w-full max-w-sm md:max-w-3xl">{children}</div>
</div>
```

### 2. Update Sign In/Up Views (both files)

**A. Card Component**
- Add `rounded-3xl border-none shadow-apple hover:shadow-apple-hover transition-shadow duration-300`
- Ensure CardContent retains `grid p-0 md:grid-cols-2`

**B. Right Panel (logo section)**
- Keep `hidden md:flex` behavior
- Background: Keep `bg-primary` for now (user didn't request change)
- Center logo + text with `flex-col items-center justify-center gap-4`
- Use `font-satoshi` for logo text:
  ```tsx
  <img src="/logo.svg" alt="logo" className="h-16 w-16" />
  <p className="text-3xl font-black tracking-tight text-white">Beeclean</p>
  ```
- Add larger size for logo and text

**C. Left Panel (form area)**
- Wrap form in `motion.div` with initial/animate for fade-in + slide-up
- Heading (`h1`): 
  - Change from `text-2xl font-bold` → `text-4xl font-black tracking-tight text-gray-900 mb-2`
  - Add `font-satoshi`
  - Center text
- Subtitle (`p`): 
  - Add `font-inter text-base text-muted-foreground`
- Form fields:
  - Labels: `text-sm font-semibold text-gray-700 mb-2` (or use design's muted)
  - Input: add `rounded-lg` and ensure proper focus ring (already shadcn)
- Submit Button:
  - Change to: `bg-[#1a1a1a] text-white shadow-apple hover:shadow-apple-hover hover:bg-black/90 rounded-xl text-sm font-bold tracking-tight transition-all duration-200`
  - Keep `disabled` state styling
- Error Alert:
  - Keep but ensure margin top
- "Already have an account?" / "Don't have an account?" links:
  - Use `text-sm text-gray-600` with `underline-offset-4`
  - Center with `text-center`
- Ensure all text uses `font-inter` except heading

**D. Animation**
- Add to the CardContent's left panel:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {/* entire form content */}
</motion.div>
```

### 3. Consistency Between Sign In and Sign Up
- Apply identical styling to both `signin-view.tsx` and `signup-view.tsx`
- They share same structure, just different form fields.

### 4. Optional Refinements
- Add custom primary color to match brand if needed? Not required.
- Could add a decorative element (e.g., bee icon) on right panel but not necessary.

---

## Files to Modify

1. `app/(auth)/layout.tsx` - background, font, centering
2. `components/auth/signin-view.tsx` - complete styling overhaul
3. `components/auth/signup-view.tsx` - complete styling overhaul

All changes are CSS/Tailwind class updates and adding Framer Motion wrappers. No logic changes.

---

## Verification

1. Run dev server and navigate to `/sign-in` and `/sign-up`
2. Check that:
   - Background is clean white
   - Card has smooth shadow, rounded corners
   - Right panel shows logo clearly centered
   - Form fields are properly styled with rounded-lg
   - Submit button is black with shadow
   - Heading is large and bold (Satoshi)
   - Animations fade in smoothly
   - Page is centered vertically and horizontally
   - Mobile: card stacks (no right panel) and is full width
3. Test form submission (should still work via Better-Auth)
4. No console errors

---

## Notes

- Changing background to white may need to consider dark mode? Not in scope.
- We are NOT modifying auth logic - only UI styling.
- The split layout (2 columns) is kept, with right panel for branding.
- The current `bg-primary` color is retained; if it clashes, can be adjusted later.
- All font changes: ensure `font-satoshi` and `font-inter` are correctly loaded (they are from globals.css).

---

This redesign will bring the auth pages in line with the premium Apple aesthetic seen throughout the rest of the site.
