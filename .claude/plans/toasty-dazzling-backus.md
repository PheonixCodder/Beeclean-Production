# Implementation Plan: Privacy Policy & Terms & Conditions Pages

## Context

The Beeclean project needs dedicated legal pages for Privacy Policy and Terms & Conditions. The app already has placeholder folders (`app/privacy-policy/` and `app/terms-conditions/`) but they contain only empty `page.tsx` files. Footer components reference these pages with `#` links that need to be updated to actual routes.

## Goal

Create fully functional, beautifully designed Privacy Policy and Terms & Conditions pages that:
- Follow the exact design system used throughout the app (Apple-style premium aesthetic)
- Use consistent typography (Satoshi for headings, Inter for body)
- Include smooth Framer Motion entrance animations
- Have proper SEO metadata
- Use the same Navbar and Footer as the main site
- Store reusable components in `components/privacy-policy/` and `components/terms-conditions/`
- Update footer links to point to the new routes

## Design System Reference

**Typography:**
- Headings: `font-satoshi font-black tracking-tight`
- Sizes: `text-5xl md:text-6xl lg:text-7xl` for page titles, `text-4xl` for section headings
- Body: `font-inter text-base text-gray-500` or `text-muted-foreground`

**Colors:**
- Primary text: `text-gray-900`
- Secondary: `text-gray-500` / `text-muted-foreground`
- Headings: `text-[#1a1a1a]`

**Spacing:**
- Container: `max-w-4xl mx-auto px-6 lg:px-0` (for content pages, narrower than home)
- Section padding: `py-20`
- Content padding: `p-8` or `p-10`
- Gap between sections: `gap-8` or `gap-12`

**Components:**
- Cards: `rounded-3xl border-none shadow-apple bg-white`
- Animations: `initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}`
- Child animations with `staggerChildren: 0.15`

## File Structure to Create

### Components

**`components/privacy-policy/legal-layout.tsx`**
- Wrapper component for legal pages
- Handles consistent formatting for both Privacy and Terms pages
- Props: `title`, `lastUpdated`, `children`
- Includes motion wrapper for entrance animation

**`components/privacy-policy/legal-section.tsx`**
- Individual section component
- Props: `heading`, `children`, `numbered?`
- Renders with proper typography and spacing
- Optional section numbering (e.g., "1.", "2.")

**`components/terms-conditions/legal-layout.tsx`** (similar structure)
**`components/terms-conditions/legal-section.tsx`** (similar structure)

### Pages

**`app/privacy-policy/page.tsx`**
- Server component (no "use client")
- Export `metadata` with proper title, description, robots
- Import and use `LegalLayout` component
- Import `Navbar` and `Footer` from components/layout
- Structure content with multiple `LegalSection` components
- Sections: Introduction, Information We Collect, How We Use It, Data Sharing, Security, Your Rights, Cookies, Updates

**`app/terms-conditions/page.tsx`**
- Similar structure
- Sections: Acceptance, Service Description, User Obligations, Intellectual Property, Limitation of Liability, Termination, Governing Law, Changes

### Updates to Existing Files

**`components/layout/footer.tsx`**
- Change footer links from `href="#"` to `href="/privacy-policy"` and `href="/terms-conditions"`
- Update the secondary links in the bottom right corner

**`components/layout/blog-footer.tsx`**
- Update Legal section links from `href="#"` to proper paths
- Update bottom bar links

## Content Plan

### Privacy Policy Content Structure

1. **Introduction**
   - Brief overview of Beeclean's commitment to privacy
   - Effective date and last updated

2. **Information We Collect**
   - Personal information (email, name if using premium)
   - Device information
   - Usage data
   - Photos/media (processed locally, not uploaded)

3. **How We Use Your Information**
   - Provide and maintain the service
   - Improve app performance
   - Customer support
   - Send service-related notifications

4. **Data Sharing & Disclosure**
   - Third-party service providers (App Store, analytics)
   - Legal requirements
   - Business transfers

5. **Data Security**
   - Local processing emphasis
   - Encryption practices
   - No upload of photos/data to servers

6. **Your Rights**
   - Access, correction, deletion
   - Opt-out of marketing
   - Data portability
   - GDPR/CCPA compliance

7. **Cookies & Tracking**
   - App Store analytics (if any)
   - Third-party SDKs

8. **Children's Privacy**
   - Not directed at children under 13

9. **Updates to This Policy**
   - How notifications are given

### Terms & Conditions Content Structure

1. **Acceptance of Terms**
   - By using Beeclean, you agree to these terms

2. **Description of Service**
   - What Beeclean does (iPhone cleaning/optimization app)
   - Subscription-based model

3. **User Responsibilities**
   - Account security
   - Acceptable use policy
   - Device compatibility

4. **Intellectual Property**
   - Beeclean trademarks and copyrights
   - User-generated content license

5. **Subscription & Billing**
   - Free vs Premium features
   - Payment through App Store
   - Refund policy (Apple's policy)

6. **Limitation of Liability**
   - Disclaimer of warranties
   - No guarantee of results
   - Service availability

7. **Indemnification**
   - User agrees to indemnify Beeclean

8. **Termination**
   - By user or Beeclean
   - Effect of termination

9. **Governing Law & Disputes**
   - Jurisdiction
   - Arbitration clause (if applicable)

10. **Miscellaneous**
    - Severability
    - Entire agreement
    - Contact information

## Implementation Approach

### Step 1: Create Reusable Legal Components

Create `components/privacy-policy/legal-layout.tsx`:
- Server component
- Accepts `title`, `lastUpdated`, `children`
- Returns structure: Navbar + <main> with motion.div + Footer
- The main content has max-w-4xl mx-auto with proper padding
- Title centered with `text-5xl font-black font-satoshi mb-8`
- Last updated text in `text-sm text-gray-400 mb-12`
- Children rendered with `space-y-8`

Create `components/privacy-policy/legal-section.tsx`:
- Accepts `heading`, `children`, `number?` (optional)
- Renders as: `<section className="space-y-4">`
- Heading: `<h2 className="text-4xl font-black font-satoshi text-gray-900 mb-4">`
- If `number` prop exists: `number + ". " + heading`
- Content: `<div className="text-base font-inter text-gray-500 leading-relaxed space-y-4">`
- Paragraphs: `<p className="mb-4">` with leading-relaxed

Similar components for `terms-conditions/` (or could share and use props to differentiate)

### Step 2: Create Page Components

**`app/privacy-policy/page.tsx`:**
```tsx
import type { Metadata } from "next";
import LegalLayout from "@/components/privacy-policy/legal-layout";
import LegalSection from "@/components/privacy-policy/legal-section";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy - Beeclean",
  description: "Privacy Policy for Beeclean - Professional iPhone Cleaning & Optimization",
  robots: {
    index: true,
    follow: true,
  },
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <LegalLayout
          title="Privacy Policy"
          lastUpdated="April 6, 2026"
        >
          <LegalSection heading="Introduction" number={1}>
            <p>Beeclean ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application...</p>
          </LegalSection>
          {/* More sections */}
        </LegalLayout>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
```

**`app/terms-conditions/page.tsx`:**
Similar structure with Terms-specific content.

### Step 3: Update Footer Links

**In `components/layout/footer.tsx`:**
- Find the secondary links section (bottom right)
- Change `href="#"` to `href="/privacy-policy"` and `href="/terms-conditions"`
- Also update the "Terms & Conditions" link text if needed

**In `components/layout/blog-footer.tsx`:**
- Update Legal section links
- Update bottom bar links to proper routes

### Step 4: Testing & Verification

1. **Visual Testing:**
   - Run `npm run dev` and navigate to `/privacy-policy` and `/terms-conditions`
   - Verify layout matches home page design patterns
   - Check typography, spacing, shadows on different screen sizes
   - Ensure animations work smoothly

2. **Link Testing:**
   - Click footer links to ensure they navigate correctly
   - Check that navigation from Navbar (if added) works

3. **SEO Testing:**
   - View page source to verify metadata
   - Check title and description appear correctly

4. **Responsive Testing:**
   - Check on mobile, tablet, desktop
   - Ensure max-w-4xl container works well on small screens

## Critical Files Reference

- `app/page.tsx` - for structural reference
- `app/globals.css` - for shadow definitions and CSS variables
- `components/layout/navbar.tsx` - for Navbar pattern
- `components/layout/footer.tsx` - to update footer links
- `components/layout/blog-footer.tsx` - to update blog footer links
- `components/ui/card.tsx` - for card component patterns
- `components/home/hero.tsx`, `components/home/faq.tsx` - for motion patterns

## Notes

- Both pages should be **server components** by default (no "use client" directive needed unless adding interactivity)
- Use `next/link` for internal navigation if needed within content
- Legal content should be comprehensive but concise
- Consider adding anchor links to section headings if content is long
- Maintain consistent brand voice (professional, friendly)
- Ensure all links within the legal pages have proper `target="_blank"` for external links

## Post-Implementation Checklist

- [ ] Components created in `components/privacy-policy/` and `components/terms-conditions/`
- [ ] Page files created with proper metadata
- [ ] Footer links updated in both footer components
- [ ] Animation patterns match existing pages
- [ ] Typography hierarchy consistent (Satoshi headings, Inter body)
- [ ] Responsive design verified (mobile, tablet, desktop)
- [ ] SEO metadata present
- [ ] No console errors in dev mode
- [ ] Pages deploy without build errors
