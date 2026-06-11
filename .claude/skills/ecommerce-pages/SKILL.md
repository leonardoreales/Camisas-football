---
name: ecommerce-pages
description: "Use for e-commerce page design, structure, SEO, and conversion optimization. Covers product listing pages, category pages, and campaign landing pages. Triggers when the user mentions 'product page,' 'category page,' 'collection page,' 'shop page,' 'product grid,' 'product cards,' 'faceted navigation,' 'filters,' 'landing page,' 'PPC page,' or 'e-commerce listing.' Source: kostja94/marketing-skills (598 ★)."
metadata:
  version: 1.0.1
  sources:
    - kostja94/marketing-skills
---

# E-commerce Pages — Combined Skill

Covers the three core page types in an e-commerce store: **product listing pages**, **category/collection pages**, and **campaign landing pages**. Check `.claude/project-context.md` or `.cursor/project-context.md` for product catalog and positioning before starting.

---

# Part 1: Product Listing & Detail Pages

## Initial Assessment

Identify:
1. **Page type**: Category, collection, or product grid
2. **Products**: Count, filters, sorting options
3. **Audience**: Browsers, researchers, or ready-to-buy

## Category / Listing Page Structure

| Element | Purpose |
|---------|---------|
| **Category H1** | Clear; target primary keyword |
| **Description** | SEO intro copy; benefits of this category |
| **Filters** | Price, size, color, brand, availability |
| **Product cards** | Image, name, price, CTA |
| **Pagination** | Crawlable; rel prev/next |

## Product Card Anatomy

- **Image**: Alt text with product name + key attribute; multiple angles when possible
- **Name**: Descriptive; includes keyword (brand + type + key attribute)
- **Price**: Clear; show sale price vs. compare-at
- **CTA**: "Add to Cart" or "View Details" — never "Learn More"
- **Trust signal**: Star rating + review count inline

## SEO for Product Pages

- **Title tag**: Brand + Product Name + Key Attribute (50-60 chars)
- **Meta description**: Lead with benefit, include price/availability if relevant (150-160 chars)
- **Schema**: `Product` with `offers`, `aggregateRating`, `image` array
- **Internal links**: Breadcrumbs, cross-category links, related products

## Conversion Best Practices

- Above-fold: product name, price, primary image, add-to-cart button
- Trust: review stars, returns/shipping policy, stock indicator
- Urgency: low-stock badge, shipping deadline ("Order in 2h for delivery tomorrow")
- Cross-sell: "Complete the look" / "Frequently bought together" after CTA

---

# Part 2: Category Pages

Category pages drive 3x more organic revenue than product pages by ranking for broad, high-volume keywords.

## Initial Assessment

Identify:
1. **Catalog**: Product count, categories, subcategories
2. **Facets**: Available filters (size, color, price, brand, etc.)
3. **URL structure**: Current hierarchy, parameter handling

## Category Hierarchy

| Principle | Practice |
|-----------|----------|
| **Logical grouping** | General → specific (e.g., Jerseys → Nacional → Home) |
| **User search intent** | Match how users search ("Colombia jersey" not "jersey Colombia") |
| **Crawl depth** | ≤4 clicks from homepage |
| **Long-tail categories** | Niche categories convert better (36% vs 11.5% for broad) |

## URL Structure

- **Subfolders**: `tienda.com/camisas/colombia`, `tienda.com/camisas/nacional`
- **Slugs**: Descriptive, keyword-rich; lowercase; no stop words; no `/category/` prefix
- **Breadcrumbs**: Show full path; help users and crawlers

## Faceted Navigation (Filters)

Filters create URL combinations that cause duplicate content. Manage them:

| Strategy | Use when |
|----------|----------|
| **Canonical** | Point all faceted URLs to base category URL |
| **robots.txt** | Block faceted URLs from indexing if crawl budget is limited |
| **JavaScript filters** | Keep filters client-side; single URL per category |

## On-Page Content

- **150-300 words** unique copy per category; pages with this rank ~2.7x higher than product-only grids
- **Placement**: Below H1 hero; FAQ block at bottom of page
- **Purpose**: Help users decide — answer curation questions, materials, recommendations
- **Avoid**: Generic manufacturer copy; copy that crowds the product grid

## Category SEO Checklist

| Element | Practice |
|---------|----------|
| **H1** | One per page; primary keyword; clear purpose |
| **Title tag** | 50-60 chars; keyword; compelling for CTR |
| **Meta description** | 150-160 chars; include value props (free shipping, returns) |
| **Schema** | `ItemList`, `Product`; `AggregateRating` if reviews; `FAQPage` if FAQ |

## Trust & Conversion on Category Pages

- **Star ratings**: Show in product cards; adds review rich results in SERPs
- **FAQ section**: Answer "which material?", "what sizes?", "how to choose?" — adds +157% conversion when used
- **Guides**: Link to buying guides and care guides; builds topical authority

## Technical Requirements

- Consistent template across all categories (predictable UX)
- Mobile-first: touch targets ≥44×44px; filters accessible on mobile
- 301 redirects when categories are reorganized (never break SEO equity)

---

# Part 3: Landing Pages (Campaign / PPC)

Landing pages receive targeted traffic from paid ads, email campaigns, or social. Single goal, single CTA.

## When to Use a Landing Page vs. a Product/Category Page

| Use landing page | Use product/category page |
|-----------------|--------------------------|
| Paid ad traffic (PPC) | Organic search traffic |
| Single SKU promotion | Full catalog browsing |
| Campaign with specific offer | Regular storefront |
| Lead capture / waitlist | Direct purchase flow |

## Landing Page 5-Step Structure

| Step | Purpose | Elements |
|------|---------|----------|
| **1. Stop the scroll** | Capture attention in ~2.6 seconds | Headline, subheadline, hero image/video |
| **2. Earn trust** | Social proof before the ask | Logos, testimonials, ratings, customer count |
| **3. Explain value** | Benefits, not features | Clear copy: who it's for, what outcome they get |
| **4. Remove doubt** | Objection handling | FAQ, guarantees, comparison |
| **5. Make the ask** | Single primary CTA | One clear action; repeated at logical scroll points |

Pages with multiple competing offers get ~266% fewer leads.

## Headline Formula

**[Who it's for]** + **[Specific outcome]** + **[Time/qualifier]**

- Avoid: abstract promises ("Unlock your potential")
- Prefer: concrete ("Camisa oficial de tu equipo — envío en 24h a Colombia")

## CTA Best Practices

- **One primary CTA** — no competing actions
- **Above the fold on mobile** — thumb-reachable
- **Value-focused copy**: "Comprar ahora" > "Submit"
- **Pair with trust signals**: "Envío gratis | Devolución gratis | Pago seguro"
- **Remove or minimize navigation**: increases conversion 2-28%

## E-commerce Landing Page Types

| Type | Use case | CTA destination |
|------|---------|-----------------|
| **Product launch** | New jersey drop, limited edition | Product page / add to cart |
| **Seasonal campaign** | Copa América, World Cup | Category or collection page |
| **Discount / flash sale** | Black Friday, liquidación | Catalog filtered by sale |
| **Lead capture** | Pre-launch waitlist | Email signup → nurture |
| **Bundle offer** | Pack jersey + shorts | Cart with bundle pre-loaded |

## Performance & Design Requirements

- **Load time**: Under 2.5 seconds; each extra second costs ~7% conversion
- **Mobile-first**: CTA visible without scrolling; hero fits viewport
- **Hero image/video**: Real product photography; can improve conversion up to 80%
- **No navbar** (or minimal): Reduces exit paths; keeps visitor focused on CTA
- **FTC disclosure**: If affiliate or sponsored, add compliant disclosure

## Pre-Delivery Checklist

| Category | Check |
|----------|-------|
| **Visual** | No emoji icons (use SVG); consistent icon set; hover states don't shift layout |
| **Interaction** | All clickable elements have `cursor-pointer`; transitions 150-300ms |
| **Accessibility** | Alt text on images; form labels; color not sole indicator; `prefers-reduced-motion` |
| **Layout** | No horizontal scroll on mobile; content not hidden behind fixed nav; responsive at 375/768/1024px |
| **Performance** | Load < 2.5s; LCP optimized; images WebP + lazy loading |
| **Copy** | Message matches the ad/email that sent traffic; single CTA intent on page |

## Output Format

Provide:
- **Headline** and subheadline
- **Structure** (5-step flow with section content)
- **Trust signals** placement
- **CTA** copy and placement
- **Objection handling** (FAQ, guarantees, return policy)
- **SEO metadata** (if page is indexed)
