---
name: marketing-digital
description: "Use for all marketing digital tasks: product positioning, conversion rate optimization (CRO), copywriting, and pricing strategy. Triggers when the user mentions 'marketing,' 'conversions,' 'copy,' 'landing page copy,' 'CRO,' 'this page isn't converting,' 'write copy for,' 'value proposition,' 'ICP,' 'target audience,' 'pricing strategy,' 'CTA copy,' or 'why isn't this page working.' Source: coreyhaines31/marketingskills (32.9k ★)."
metadata:
  version: 2.0.0
  sources:
    - coreyhaines31/marketingskills
---

# Marketing Digital — Combined Skill

Covers product marketing context, conversion rate optimization, and copywriting. Check `.agents/product-marketing.md` before any task — it stores product/audience context all skills share.

---

# Part 1: Product Marketing Context

You help users create and maintain a product marketing context document at `.agents/product-marketing.md`.

## Workflow

**If the file exists:** Read it, summarize, ask which sections to update.

**If not, offer two options:**
1. **Auto-draft from codebase** (recommended): Study README, landing pages, copy, package.json → draft V1 → user reviews.
2. **Start from scratch**: Walk sections conversationally, one at a time.

## Sections to Capture

### 1. Product Overview
- One-line description, what it does (2-3 sentences), product category, type, business model/pricing.

### 2. Target Audience
- Target company/person type, decision-makers, primary use case, jobs to be done, specific scenarios.

### 3. Problems & Pain Points
- Core challenge, why current solutions fail, cost (time/money), emotional tension.

### 4. Competitive Landscape
- **Direct**: Same solution, same problem
- **Secondary**: Different solution, same problem
- **Indirect**: Conflicting approach

### 5. Differentiation
- Key differentiators, how you solve it differently, why customers choose you.

### 6. Objections & Anti-Personas
- Top 3 objections + responses. Who is NOT a good fit.

### 7. Customer Language
- Verbatim phrases customers use for the problem and solution. Words to use / avoid.

### 8. Brand Voice
- Tone, communication style, 3-5 personality adjectives.

### 9. Proof Points
- Metrics, notable customers, testimonials, value themes.

---

# Part 2: Conversion Rate Optimization (CRO)

Use when the user wants to optimize conversions on any marketing page or form.

## CRO Analysis Framework

Analyze in order of impact:

### 1. Value Proposition Clarity (Highest Impact)
- Can a visitor understand what this is within 5 seconds?
- Is the benefit clear, specific, differentiated?
- Written in customer language, not company jargon?

**Common issues:** Feature-focused instead of benefit-focused; too vague; trying to say everything.

### 2. Headline Effectiveness
- Communicates core value? Specific? Matches traffic source messaging?

**Strong patterns:**
- Outcome-focused: "Get [outcome] without [pain point]"
- Specificity: numbers, timeframes, concrete details
- Social proof: "Join 10,000+ teams who..."

### 3. CTA Placement, Copy, and Hierarchy
- One clear primary action visible without scrolling?
- Button copy communicates value, not just action?
  - Weak: "Submit," "Sign Up," "Learn More"
  - Strong: "Start Free Trial," "Get My Report," "See Pricing"
- Primary vs. secondary CTA structure? CTAs repeated at key decision points?

### 4. Visual Hierarchy and Scannability
- Can someone scanning get the main message?
- Most important elements visually prominent? Enough whitespace?

### 5. Trust Signals and Social Proof
- Customer logos, testimonials with photos, case study numbers, review scores, security badges.
- Place near CTAs and after benefit claims.

### 6. Objection Handling
- Price/value, "will this work for me?", implementation difficulty, risk.
- Address via FAQ, guarantees, comparison content, process transparency.

### 7. Friction Points
- Too many form fields? Unclear next steps? Mobile issues? Long load times?

## Output Format

### Quick Wins (Implement Now)
Easy changes with likely immediate impact.

### High-Impact Changes (Prioritize)
Bigger changes worth the effort.

### Test Ideas
Hypotheses worth A/B testing.

### Copy Alternatives
2-3 alternatives for key elements with rationale.

## Page-Specific Frameworks

**Homepage CRO:** Clear positioning for cold visitors; quick path to primary conversion; serve "ready to buy" AND "still researching."

**Landing Page CRO:** Message match with traffic source; single CTA (remove navigation if possible); complete argument on one page.

**Pricing Page CRO:** Clear plan comparison; recommended plan indicator; address "which plan is right for me?" anxiety.

**E-commerce Product Page CRO:** Above-fold: product name, price, primary image, add-to-cart. Trust: reviews, returns policy. Urgency: stock levels. Cross-sell: related products after CTA.

---

# Part 3: Copywriting

Use when writing, rewriting, or improving marketing copy for any page.

## Before Writing

Check `.agents/product-marketing.md` first. Then gather:
- **Page purpose**: Type + ONE primary action.
- **Audience**: Ideal customer, problem, objections, language they use.
- **Product/Offer**: What's different, key transformation, proof points.
- **Context**: Traffic source, what visitors already know.

## Copywriting Principles

1. **Clarity over cleverness** — when in doubt, be clear.
2. **Benefits over features** — features are what it does, benefits are what that means for the customer.
3. **Specificity over vagueness** — "Cut reporting from 4 hours to 15 minutes" beats "Save time."
4. **Customer language** — mirror the words they use in reviews and interviews.
5. **One idea per section** — build a logical flow down the page.

## Writing Style Rules

- Simple over complex: "use" not "utilize"
- Active over passive: "We generate reports" not "Reports are generated"
- Confident: remove "almost," "very," "really"
- No exclamation points
- No buzzwords without substance ("streamline," "optimize," "innovative")

## Page Structure Framework

### Above the Fold
- **Headline**: Core value proposition — specific, not generic.
  - Formulas: "{Achieve outcome} without {pain point}" | "The {category} for {audience}" | "Never {unpleasant event} again"
- **Subheadline**: Expands headline, adds specificity, 1-2 sentences max.
- **Primary CTA**: Action + what they get: "Start Free Trial" > "Sign Up."

### Core Sections
| Section | Purpose |
|---------|---------|
| Social Proof | Logos, stats, testimonials — build credibility |
| Problem/Pain | Show you understand their situation |
| Solution/Benefits | Connect to outcomes (3-5 key benefits) |
| How It Works | Reduce perceived complexity (3-4 steps) |
| Objection Handling | FAQ, comparisons, guarantees |
| Final CTA | Recap value, repeat CTA, risk reversal |

## CTA Copy Guidelines

**Weak (avoid):** Submit, Sign Up, Learn More, Click Here, Get Started

**Strong (use):**
- Start Free Trial
- Get [Specific Thing]
- See [Product] in Action
- Add to Cart — [Product Name]

**Formula:** [Action Verb] + [What They Get] + [Qualifier if needed]

## Output Format

Provide:
1. **Page Copy** organized by section (headline, subheadline, CTA, section copy)
2. **Annotations** explaining key choices
3. **Alternatives** — 2-3 options for headlines and CTAs with rationale

---

# Part 4: Pricing Strategy

Use when working on pricing pages, plan structure, or packaging.

## Pricing Page Principles

- **Recommended plan**: Make the primary option visually obvious (highlight, "Most Popular" badge).
- **3 plans max**: More creates choice paralysis.
- **Lead with value, not features**: "Everything in Starter, plus..." is fine for feature lists; headlines should state the outcome.
- **Address anxiety**: "Which plan is right for me?" — add a decision helper ("For teams under 10" / "For teams that need X").
- **Annual toggle**: Surface savings clearly ("Save 20%").
- **CTA on each plan**: Not "Sign Up" — "Start [Plan] Trial" or "Get [Plan]."

## Pricing Psychology

- **Anchoring**: Show the expensive option first (left to right or top to bottom).
- **Decoy effect**: Middle option makes the premium look reasonable.
- **Risk reversal**: Free trial, money-back guarantee, no credit card required.
- **Specificity in savings**: "$240/year" beats "save 20%" for some audiences.
