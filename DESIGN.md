---
name: Aether Glass
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#5c5f61'
  on-secondary: '#ffffff'
  secondary-container: '#e0e3e5'
  on-secondary-container: '#626567'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#271901'
  on-tertiary-container: '#98805d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#e0e3e5'
  secondary-fixed-dim: '#c4c7c9'
  on-secondary-fixed: '#191c1e'
  on-secondary-fixed-variant: '#444749'
  tertiary-fixed: '#fcdeb5'
  tertiary-fixed-dim: '#dec29a'
  on-tertiary-fixed: '#271901'
  on-tertiary-fixed-variant: '#574425'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  section-gap: 40px
  card-padding: 24px
  container-margin: 32px
  gutter: 24px
---

## Brand & Style

The design system is defined by a "Premium Tech-Minimalism" aesthetic. It targets high-end SaaS, fintech, and professional productivity tools where clarity and sophistication are paramount. The interface is designed to evoke a sense of calm, precision, and futuristic elegance.

The visual language blends **Glassmorphism** with **Soft UI**. It utilizes semi-transparent background blurs to create depth and a "frosted" glass effect, while employing large radius containers and soft, expansive shadows to mimic physical layers floating in a light-filled space. The personality is professional yet approachable, characterized by significant whitespace and a strictly controlled monochrome palette.

## Colors

The palette is predominantly monochromatic to ensure a high-tech, clean look. 

- **Primary:** Deep Onyx (#0F172A) is used for high-contrast elements, primary buttons, and critical text.
- **Surface:** A range of ultra-light grays and pure whites creates the layered effect. Semi-transparency (White at 60-80% opacity) is used for glass panels.
- **Accents:** Functional colors are used sparingly. Soft, desaturated greens and ambers are applied to small indicators (chips, dots) to convey status without breaking the monochrome serenity.
- **Backdrop:** A soft gradient or blurred organic shape background (using light grays) is essential to provide the "behind the glass" context.

## Typography

The typography system relies on a strong weight hierarchy to establish order within spacious layouts. **Plus Jakarta Sans** provides a modern, slightly geometric feel for headings, while **Inter** ensures maximum legibility for data-heavy body content and labels.

Letter spacing is tightened for large headings to create a "compact premium" feel, while labels utilize increased tracking and uppercase styling for distinct categorization.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous safe areas. 

- **Desktop:** 12-column grid with 24px gutters and 48px outside margins.
- **Tablet:** 8-column grid with 24px gutters and 32px margins.
- **Mobile:** 4-column grid with 16px gutters and 20px margins.

The spacing rhythm is intentional and airy. Large-scale components (cards, sections) are separated by a minimum of 40px to prevent visual clutter. Vertical rhythm is built on an 8px base unit. Sidebars are typically fixed at 280px on desktop, while the main content area remains fluid.

## Elevation & Depth

This design system uses a four-tier elevation model based on "Translucent Stacking":

1.  **Level 0 (Base):** The background layer, featuring soft organic gradients or blurred textures.
2.  **Level 1 (Panels):** Large container surfaces. 60% white opacity with a 32px backdrop blur and a subtle 1px white border (10% opacity) to catch "light" at the edges.
3.  **Level 2 (Cards):** Solid white or high-opacity glass surfaces. These use "Ambient Shadows": extremely soft, large-radius shadows (Blur: 40px, Y: 20px, Opacity: 4% Black).
4.  **Level 3 (Interactive):** Elements like tooltips or active buttons. Higher contrast, either solid Primary Onyx or white with a slightly more defined shadow.

## Shapes

The shape language is extremely soft and organic. 
- **Large Cards:** Use a 32px corner radius to emphasize the "Soft UI" feel.
- **Secondary Cards/Inputs:** Use a 16px-24px radius.
- **Buttons/Chips:** Fully pill-shaped (rounded-full) to provide a friendly, touch-accessible appearance.

Consistent use of high-radius corners is non-negotiable to maintain the premium, approachable brand identity.

## Components

### Buttons
- **Primary:** Solid Onyx background, white text, pill-shaped, 16px horizontal padding.
- **Secondary:** Semi-transparent glass background with a subtle border, dark text.
- **Icon Buttons:** Circular with a soft drop shadow on hover.

### Cards
Cards are the primary structural unit. They should always feature the standard 32px radius and Level 2 elevation. Content inside cards should be padded at 24px minimum.

### Input Fields
Inputs should be minimalist: a light gray background (#F1F5F9), no border (or a very soft one), and a 16px radius. Focus states are indicated by a subtle glow or a 1px primary-colored ring.

### Chips & Status Indicators
Used for "In Stock" or "Pending." These should be pill-shaped with low-saturation background tints (e.g., Soft Green) and darker text of the same hue.

### Charts
Charts must be minimalist. Use thin lines (1.5px or 2px) and soft area fills with gradients. Avoid heavy grid lines; use only essential labels to maintain the "airy" feel.