---
name: Merchant Flow System
colors:
  surface: '#f9f9ff'
  surface-dim: '#d0daf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e8eeff'
  surface-container-high: '#dfe8ff'
  surface-container-highest: '#d9e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#3c4a3c'
  inverse-surface: '#273143'
  inverse-on-surface: '#ecf0ff'
  outline: '#6c7b6b'
  outline-variant: '#bbcbb9'
  surface-tint: '#006e2e'
  primary: '#006e2e'
  on-primary: '#ffffff'
  primary-container: '#03c75a'
  on-primary-container: '#004c1e'
  inverse-primary: '#3ee271'
  secondary: '#565e71'
  on-secondary: '#ffffff'
  secondary-container: '#dbe2f9'
  on-secondary-container: '#5c6477'
  tertiary: '#5c5f61'
  on-tertiary: '#ffffff'
  tertiary-container: '#aaadb0'
  on-tertiary-container: '#3e4144'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#67ff8d'
  primary-fixed-dim: '#3ee271'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#dbe2f9'
  secondary-fixed-dim: '#bfc6dc'
  on-secondary-fixed: '#141b2c'
  on-secondary-fixed-variant: '#3f4759'
  tertiary-fixed: '#e0e3e6'
  tertiary-fixed-dim: '#c4c7ca'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#44474a'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d9e3fb'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  section-gap: 24px
  element-gap-lg: 16px
  element-gap-md: 12px
  container-padding: 24px
  sidebar-width: 260px
---

## Brand & Style

The design system is engineered for high-efficiency merchant management, specifically tailored for solo entrepreneurs balancing side hustles. The brand personality is **reliable, systematic, and transparent**, ensuring that sellers feel in control of their data at a glance.

The visual style follows a **Modern Corporate** approach with a heavy emphasis on white space and functional clarity. Taking inspiration from leading commerce platforms, it utilizes a clean white base to maximize readability and reduce cognitive load during fast-paced operations. The emotional response should be one of "effortless productivity"—where the interface stays out of the way of the user's workflow.

## Colors

This design system utilizes a high-contrast palette to drive action and hierarchy:

- **Primary (#03C75A):** The signature green used for primary actions, success states, and brand presence. It signifies growth and operational health.
- **Secondary (#101828):** A deep charcoal for high-level headings and primary navigation text to ensure maximum legibility against white backgrounds.
- **Neutral/Surface:** A scale of grays (from #F9FAFB for backgrounds to #667085 for captions) is used to create structural separation without adding visual noise.
- **Semantic Colors:** Clear red (#D92D20) for alerts/low stock and amber (#F79009) for pending tasks are essential for the seller's dashboard.

## Typography

The typography system uses **Plus Jakarta Sans** (as a high-quality alternative to Pretendard available in this suite) to provide a modern, geometric, and highly legible experience in Korean and English contexts.

- **Headlines:** Reserved for page titles and section headers (20-24px). Bold weights are used to anchor the user's attention.
- **Body:** Standardized at 14px for all data entries and descriptions to balance information density with readability.
- **Captions/Labels:** 12px is used for secondary metadata, table headers, and status badges to maintain a clear visual hierarchy.
- **Line Height:** Tightened for headers (1.2-1.3) and expanded for body text (1.5) to facilitate easy scanning of lists and tables.

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid model**. The navigation sidebar is fixed at 260px, while the main content area utilizes a fluid grid that expands to fill the screen, allowing data tables to utilize maximum horizontal real estate.

- **Rhythm:** A 4px baseline grid governs all spacing.
- **Sections:** Large dashboard modules (e.g., Sales Graph vs. Recent Orders) are separated by a 24px gap.
- **Components:** Internal elements within cards or forms use 12px (compact) or 16px (standard) spacing.
- **Safe Zones:** Content containers maintain a 24px internal padding to prevent visual crowding against borders.

## Elevation & Depth

This design system prioritizes **Tonal Layers** and **Low-Contrast Outlines** over heavy shadows to maintain a professional, "software-as-a-tool" feel.

- **Level 0 (Base):** The background layer, using a subtle off-white (#F9FAFB).
- **Level 1 (Cards):** Pure white (#FFFFFF) surfaces with a 1px solid border (#EAECF0). This is the primary container for all seller data.
- **Interactive States:** Subtle, natural shadows are used only on hovered elements (buttons or active cards) to indicate interactivity without breaking the flat aesthetic.
- **Separators:** 1px horizontal lines in #F2F4F7 are used within cards to divide list items or table rows.

## Shapes

The shape language is **Semi-Rounded**, striking a balance between the precision of a professional tool and the approachability of a modern startup.

- **Containers & Cards:** 8px (0.5rem) radius is the standard for all major UI blocks and data cards.
- **Buttons & Inputs:** 8px radius ensures consistency across all interactive touchpoints.
- **Badges:** Small status tags (e.g., "Shipping") use a 4px or fully rounded pill shape to distinguish them from functional buttons.

## Components

### Navigation Sidebar
A high-contrast vertical bar on the left. Active states use a "ghost" background with a primary green vertical indicator line on the left edge. Icons should be stroke-based for a lightweight feel.

### Stat Cards
Summary cards for "Today's Sales" or "New Orders." Large 24px bold values with a secondary color (#101828), accompanied by 12px labels and trend indicators (green/red small text).

### Data Tables
The core of the dashboard. Use a pure white background with a sticky header in light gray (#F9FAFB). Row height should be fixed at 52px for optimal density. Text within cells uses `body-md`.

### Status Badges
- **Success:** Light green background with dark green text.
- **Pending:** Light orange background with dark orange text.
- **Critical:** Light red background with dark red text.
All badges use `label-md` typography.

### Quick Action Buttons
Primary buttons are solid #03C75A with white text. Secondary buttons use a white background with #D0D5DD borders and #344054 text. Always use 8px rounded corners.

### Input Fields
Standardized height of 40px. Use #D0D5DD for borders, changing to #03C75A on focus with a subtle glow effect.