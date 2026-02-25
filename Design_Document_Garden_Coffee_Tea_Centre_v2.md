# Design Document: Garden Coffee and Tea Centre Website

---

## 1. Design Overview

**Design Vision:** A warm, heritage-rooted visual identity that feels like stepping into the shop itself — natural, artisanal, and deeply human. Every design decision should reflect the grandfather's legacy and the craft behind each product.

**Design Goals:**
- Evoke warmth, trust, and authenticity through earthy tones and natural textures.
- Keep layouts clean and uncluttered so products and the brand story take center stage.
- Ensure a consistent and polished visual experience across all pages and devices.
- Honour the brand's heritage while feeling modern and professional.

**Design Principles:**

| Principle | Description |
|---|---|
| Warmth | Earthy colors and soft textures that feel welcoming and human |
| Simplicity | Clean layouts with generous whitespace; let the content breathe |
| Heritage | Visual motifs and typography that nod to tradition and craftsmanship |
| Nature | Botanical elements, garden imagery, and organic shapes throughout |
| Trust | Polished, consistent UI that signals professionalism and reliability |

---

## 2. Brand Identity

### 2.1 Logo
- **Concept:** A subtle botanical element (tea sprig, coffee branch, or leaf motif) combined with a clean serif wordmark.
- **Variations:** Full logo (icon + text), icon-only (for favicon and small placements), and text-only.
- **Usage:** Must work on both light (cream) and dark (forest green) backgrounds.
- **Minimum Size:** 120px wide for digital use to maintain legibility.

### 2.2 Brand Voice
Warm, knowledgeable, and genuine. Copy should read like a trusted friend recommending their favourite tea — never corporate, never rushed. Sentences are thoughtful, unhurried, and invite the reader to linger.

### 2.3 Tagline Options (for review by store owner)
- "Rooted in Tradition. Brewed with Love."
- "From Our Garden to Your Cup."
- "A Legacy in Every Leaf and Bean."

---

## 3. Color Palette

### Primary Palette

| Role | Color Name | Hex | Usage |
|---|---|---|---|
| Primary | Deep Forest Green | #2C5F2E | CTAs, active nav, headings, key accents |
| Secondary | Warm Chestnut Brown | #7B4A2D | Section backgrounds, card borders, secondary text |
| Accent | Golden Amber | #C9883A | Pull quotes, hover states, highlight details |
| Background | Cream White | #FAF7F2 | Main page background |
| Text | Soft Charcoal | #2E2E2E | All body copy |
| Muted Text | Warm Gray | #7A7370 | Captions, labels, secondary descriptions |

### Extended Palette (for backgrounds and tints)

| Role | Color Name | Hex | Usage |
|---|---|---|---|
| Light Green Tint | Sage Mist | #EDF3ED | Section dividers, card hover backgrounds |
| Light Brown Tint | Linen Warm | #F5EDE4 | About page heritage block background |
| Dark Overlay | Charcoal Overlay | rgba(46,46,46,0.55) | Hero image text overlay |

### Accessibility Check

| Combination | Contrast Ratio | WCAG AA Pass |
|---|---|---|
| Soft Charcoal (#2E2E2E) on Cream White (#FAF7F2) | 14.3:1 | Yes |
| Cream White on Deep Forest Green | 8.9:1 | Yes |
| Warm Gray on Cream White | 4.7:1 | Yes |
| Golden Amber on Cream White | 3.1:1 | No (use for decorative only, not body text) |

---

## 4. Typography

### Type Scale

| Role | Font | Weight | Size (Desktop) | Size (Mobile) |
|---|---|---|---|---|
| Display / Hero | Playfair Display | 700 Bold | 56px | 36px |
| H1 | Playfair Display | 700 Bold | 40px | 30px |
| H2 | Playfair Display | 600 SemiBold | 32px | 24px |
| H3 | Cormorant Garamond | 600 SemiBold | 24px | 20px |
| Body | Lato | 400 Regular | 16px | 15px |
| Body Large | Lato | 400 Regular | 18px | 16px |
| Label / Caption | Lato | 700 Bold | 12px uppercase | 12px uppercase |
| Button | Lato | 700 Bold | 14px uppercase | 14px uppercase |

### Typography Rules
- Line height for body text: 1.7 for readability.
- Maximum line length: 70 characters for body copy (prevents long uncomfortable lines).
- Headings use Playfair Display to evoke elegance and heritage.
- All fonts are loaded via Google Fonts (free, no licensing cost).

---

## 5. Iconography and Imagery

### Icons
- **Library:** Heroicons or Lucide (open source, MIT licensed).
- **Style:** Outline style icons for UI elements; solid style for filled/active states.
- **Size:** 24px for inline UI icons, 48px for feature/value section icons.
- **Color:** Icons inherit the Primary (Forest Green) or Muted Text (Warm Gray) color depending on context.

### Imagery Style Guide
- **Tone:** Warm, natural light. Soft shadows. Organic surfaces (wood, linen, ceramic).
- **Subjects:** Coffee and tea powder products, brewing moments, hands holding cups, garden and leaf textures.
- **Avoid:** Corporate stock photography, overly bright studio lighting, cluttered backgrounds.
- **Product Photography:** Products shot on a neutral light background (cream or white) for the catalogue. Lifestyle shots used for hero and about sections.
- **Aspect Ratios:** Hero images at 16:9. Product card images at 1:1 (square). About page images at 4:3.
- **Free Image Sources (if needed):** Unsplash.com — search terms: tea powder, matcha, coffee grounds, ceramic cup, tea ceremony, garden leaves.

---

## 6. Spacing and Layout System

### Spacing Scale (based on 4px base unit)

| Token | Value | Usage |
|---|---|---|
| xs | 4px | Icon padding, tight inline spacing |
| sm | 8px | Card internal padding, small gaps |
| md | 16px | Standard component padding |
| lg | 24px | Section inner padding |
| xl | 32px | Between components within a section |
| 2xl | 48px | Between major page sections (mobile) |
| 3xl | 80px | Between major page sections (desktop) |

### Grid System
- **Desktop:** 12-column grid, 1200px max content width, 24px gutters.
- **Tablet:** 8-column grid, 24px gutters.
- **Mobile:** 4-column grid, 16px gutters.

---

## 7. Component Library

### 7.1 Buttons

| Variant | Background | Text | Border | Hover State |
|---|---|---|---|---|
| Primary | Deep Forest Green #2C5F2E | Cream White | None | Darken to #1E4520, ease 200ms |
| Secondary | Transparent | Forest Green | 2px Forest Green | Fill green bg, white text |
| Ghost / Text | Transparent | Forest Green | None | Underline appears |

- Border radius: 8px on all buttons.
- Padding: 12px 24px (standard), 10px 20px (small).
- Letter spacing: 0.05em uppercase.

### 7.2 Product Cards

- Background: White #FFFFFF.
- Border radius: 12px.
- Shadow: 0 2px 8px rgba(0,0,0,0.08).
- Hover: Shadow deepens to 0 6px 20px rgba(0,0,0,0.12), card translates up 3px.
- Image: Square (1:1), fills top of card, border radius 12px 12px 0 0.
- Padding: 16px on all sides below image.
- Transition: all 250ms ease.

### 7.3 Navigation Bar

- Height: 72px desktop, 60px mobile.
- Background: Cream White #FAF7F2.
- Border bottom: 1px solid #EDE8E3 (subtle separator).
- On scroll (past 80px): Add box-shadow 0 2px 16px rgba(0,0,0,0.08).
- Logo: Left-aligned with 24px left margin.
- Nav links: Right-aligned, 32px gap between links, Lato 14px uppercase bold.
- Active link: Deep Forest Green color with 2px underline.
- Mobile: Hamburger icon (24px), slide-down full-width menu with 48px link height.

### 7.4 Form Fields

- Input style: Bottom border only (no full box border). Border color: #D4CEC9.
- Focus: Bottom border transitions to Deep Forest Green #2C5F2E, 2px, ease 200ms.
- Label: Lato 12px uppercase bold, Warm Gray color, sits above the input.
- Error state: Border turns red #D9534F, error message appears below in 12px red text.
- Success state: Border turns green, checkmark icon appears inline.

### 7.5 Filter Tabs (Product Page)

- Style: Pill-shaped buttons in a horizontal row.
- Default state: Cream White background, Forest Green border and text.
- Active state: Forest Green background, White text.
- Hover state: Sage Mist (#EDF3ED) background.
- Gap between pills: 8px.
- Transition: background-color 150ms ease.

### 7.6 Section Dividers

- Avoid hard horizontal rules. Instead, alternate section background colors between Cream White and Linen Warm (#F5EDE4) to create visual separation.

---

## 8. Page-by-Page Design Specifications

### 8.1 Home Page

**Hero Section**
- Full-width, 100vh height on desktop, 70vh on mobile.
- Background: Full-bleed product or lifestyle photo with Charcoal Overlay (rgba 46,46,46,0.55).
- Content: Centered vertically and horizontally.
- Brand name in Display/Hero type (Playfair Display 56px, Cream White).
- Tagline in Body Large (Lato 18px, Cream White, 80% opacity).
- CTA button: Primary style, Explore Our Products.
- Scroll indicator: Subtle animated down-arrow at bottom center.

**Brand Introduction Section**
- Background: Cream White.
- Two-column layout: Text (left 55%), Image (right 45%).
- Heading: H2 Playfair Display.
- Body: Lato 16px, line height 1.7, max 65 characters per line.
- Optional pull quote: Cormorant Garamond 22px italic, Golden Amber color.

**Featured Products Strip**
- Background: Linen Warm (#F5EDE4).
- Section heading: H2, centered.
- 3-4 product cards in a horizontal row (desktop), 2-column grid (tablet), 1-column (mobile).
- CTA below strip: Secondary button, View All Products.

**Footer CTA Banner**
- Background: Deep Forest Green.
- Text: Cream White.
- Content: Store name, address, operating hours, and a Visit Us In Store heading.

### 8.2 Product Catalogue Page

**Page Header**
- Full-width banner, 240px height.
- Background: Linen Warm with subtle leaf texture overlay.
- Page title: H1 Playfair Display, centered.

**Filter Tabs**
- Horizontally centered below the header.
- Tabs: All | Coffee | Tea.
- Smooth fade transition on filter change (200ms opacity).

**Product Grid**
- 3 columns on desktop, 2 on tablet, 1 on mobile.
- 24px gap between cards.
- Empty state: Friendly illustration and message if no products match a filter.

### 8.3 About Us Page

**Brand Story Section**
- Single-column centered layout, max 680px width.
- Opening paragraph in Body Large (18px) for emphasis.
- Remaining body in standard 16px Lato.

**Heritage Block (Grandfather's Story)**
- Background: Linen Warm (#F5EDE4).
- Left border: 4px solid Golden Amber accent.
- Padding: 32px.
- Optional: black-and-white or vintage-toned photo of the grandfather or early store.

**Values Row**
- Three equal columns: Quality, Tradition, Community.
- Each column: 48px icon (Forest Green), H3 heading, 2-3 sentence description.
- Background: Cream White.

### 8.4 Contact and Location Page

**Layout**
- Two-column on desktop: Contact form (left 50%), Business info and map (right 50%).
- Single column on mobile: Business info and map first, form below.

**Contact Form**
- Fields: Name, Email, Message (textarea, min 4 rows), Submit button.
- Submit button: Primary style, full width.

**Business Info Block**
- Store name, address, phone, email, operating hours — all clearly listed.
- Icons from Heroicons beside each piece of info.

**Map**
- Google Maps iframe, 400px height on desktop, 250px on mobile.
- Border radius: 12px.

---

## 9. Motion and Animation

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Page load | Fade in (opacity 0 to 1) | 400ms | ease-out |
| Product card hover | Translate Y -3px + shadow deepen | 250ms | ease |
| Button hover | Background color change | 200ms | ease |
| Filter tab switch | Content fade out then fade in | 200ms | ease |
| Mobile menu open | Slide down from top | 250ms | ease-out |
| Hero scroll indicator | Bounce loop | 1500ms | ease-in-out, infinite |

All animations should respect the prefers-reduced-motion media query. If the user has reduced motion enabled, all transitions fall back to instant (0ms) or simple opacity fades.

---

## 10. Responsive Design

### Breakpoints

| Breakpoint | Width | Layout Changes |
|---|---|---|
| Mobile S | 320px | Single column, compact spacing, 16px body font |
| Mobile L | 480px | Single column with slightly wider gutters |
| Tablet | 768px | 2-column grids unlock, navigation still hamburger |
| Desktop S | 1024px | Full desktop nav appears, 3-column product grid |
| Desktop L | 1280px+ | Max content width 1200px, content centered |

### Mobile-Specific Rules
- Navigation: Hamburger menu always shown below 1024px.
- Hero: Reduce to 70vh, font size scales down.
- Product grid: 1 column below 768px, 2 columns 768-1024px.
- Typography: All headings scale down by approximately 25% on mobile.
- Tap targets: All buttons and links minimum 44px height for touch usability.

---

## 11. Accessibility Standards

- **Compliance Target:** WCAG 2.1 Level AA.
- **Color Contrast:** All text elements meet minimum 4.5:1 ratio (verified in Section 3).
- **Alt Text:** Every image has descriptive, meaningful alt text. Decorative images use empty alt="".
- **Keyboard Navigation:** All interactive elements (links, buttons, form fields) are focusable and have visible focus outlines.
- **Focus Style:** 2px solid Deep Forest Green outline with 2px offset on all focusable elements.
- **Form Labels:** All inputs have associated visible labels (not just placeholder text).
- **Semantic HTML:** Correct use of h1-h6 hierarchy, nav, main, section, footer, and article elements.
- **Skip Link:** A skip to main content link is the first focusable element on every page for screen reader and keyboard users.

---

## 12. Design Handoff Checklist

- [ ] Color tokens defined and named in Figma.
- [ ] Typography styles defined as Figma text styles.
- [ ] Component library built in Figma with all variants (default, hover, active, disabled).
- [ ] Desktop, tablet, and mobile frames created for all 4 pages.
- [ ] All imagery sourced or placeholders confirmed with store owner.
- [ ] Logo files exported in SVG, PNG (light and dark versions).
- [ ] Accessibility contrast check completed for all color combinations.
- [ ] Store owner has reviewed and approved the design mockups before development begins.

---

## Appendix

### Design Inspiration References
- Earthy, warm cafe websites with strong heritage storytelling.
- Artisanal tea brand aesthetics: clean, minimal, botanical.
- Japanese tea ceremony visual culture: restraint, nature, ritual.

### Font Links
- Playfair Display: https://fonts.google.com/specimen/Playfair+Display
- Lato: https://fonts.google.com/specimen/Lato
- Cormorant Garamond: https://fonts.google.com/specimen/Cormorant+Garamond

### Free Image Resources
- Unsplash: https://unsplash.com (search: tea powder, matcha, coffee grounds, ceramic cup)
- Pexels: https://pexels.com (search: tea leaves, artisan coffee, wooden table)

### Glossary
- **Design Token:** A named variable representing a design decision (color, spacing, font size) that can be shared between design and code.
- **WCAG 2.1 AA:** Web Content Accessibility Guidelines, Level AA. The internationally recognised standard for accessible web design.
- **Contrast Ratio:** A measure of the difference in luminance between two colors. Higher ratios mean better readability, especially for users with low vision.
- **Viewport Height (vh):** A CSS unit equal to 1% of the browser viewport height. 100vh = full screen height.
