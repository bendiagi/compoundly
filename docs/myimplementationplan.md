# Compoundly Implementation Plan

---

## 0. Restate Your Query

You want a detailed, actionable implementation plan for building Compoundly—a modern, mobile-first React (Next.js) app for simulating compound interest, with a beautiful, accessible UI, animated charts, and export features. You want the plan to be grounded in the design/PRD docs and your tech stack prompt, not just generic advice.

---

## 1. Project Setup

- **Scaffold Next.js App** (App Router, TypeScript, Tailwind CSS)
- **Install dependencies**:  
  - UI: tailwindcss, @headlessui/react, lucide-react or heroicons  
  - Forms: react-hook-form, zod  
  - Charts: recharts or chart.js  
  - Animations: framer-motion  
  - State: zustand or context  
  - Export: html2canvas, file-saver, papaparse  
  - Fonts: @fontsource/inter or import from Google Fonts  
  - Testing (optional): vitest or jest  
- **Set up Tailwind config**: custom colors, font, breakpoints per design spec
- **Add global styles**: /styles/globals.css

---

## 2. File Structure

- /components
  - InvestmentForm.tsx
  - CurrencyToggle.tsx
  - RateSelector.tsx
  - InvestmentChart.tsx
  - SummaryStats.tsx
  - ExportButtons.tsx
- /lib
  - calculateCompoundReturns.ts
  - validateInputs.ts
- /data
  - rates.json (preset investment options)
- /app
  - layout.tsx (global styles, font, meta)
  - page.tsx (main UI)
- /public
  - favicon.svg, social-share.jpg

---

## 3. Core Features

### 3.1 Input Form

- **Fields**:  
  - Currency toggle (auto-detect via browser locale, fallback to USD/NGN)
  - Initial investment (required, numeric, currency-formatted)
  - Recurring frequency (weekly/monthly)
  - Interest rate (dropdown from /data/rates.json or custom)
  - Compounding frequency (monthly/quarterly/annually)
  - User age (optional, numeric)
- **Validation**:  
  - Use zod + react-hook-form for schema validation, error messages
- **UI**:  
  - Floating labels, rounded fields, mobile-friendly spacing
  - Accessible: aria-labels, keyboard nav, touch targets ≥44px

### 3.2 Calculation Logic

- **/lib/calculateCompoundReturns.ts**:  
  - Implement compound interest formulas (one-time + recurring, see PRD 5.1)
  - Map frequencies to periods/year (see PRD 5.2)
  - Support inflation adjustment (optional, future)
  - Return time series: principal, interest, total for each year/month
- **/lib/validateInputs.ts**:  
  - Centralize input validation logic

### 3.3 Chart & Output

- **InvestmentChart.tsx**:  
  - Use Recharts/Chart.js for animated line/area chart
  - X: years (0–25), Y: value
  - Two lines: principal, interest (stacked or separate)
  - Animate draw-in (framer-motion or chart lib)
  - Tooltips, legend, color-coded per design
  - Responsive, mobile-first
- **SummaryStats.tsx**:  
  - Show: final value, total invested, interest earned, projected age
  - Large, legible, color-coded, animated count-up

### 3.4 Export Feature

- **ExportButtons.tsx**:  
  - Download chart as PNG (html2canvas)
  - Download data as CSV (papaparse)
  - Accessible, animated feedback

---

## 4. UI/UX & Design System

- **Typography**: Inter, responsive scaling (clamp)
- **Colors**: Use palette from prompt/designspecs (light/dark mode ready)
- **Buttons**: rounded-2xl, px-4 py-2, hover/active/disabled states, transitions
- **Inputs**: minimal, floating labels, focus ring, error state
- **Layout**:  
  - Mobile-first, vertical stacking, sticky CTA on mobile
  - Sectioned: Input ➝ Chart ➝ Summary ➝ Export
  - Use 8pt grid, spacing per designspecs
- **Accessibility**:  
  - All controls keyboard-accessible, aria-labels, color contrast AA+
  - Responsive font sizes, semantic HTML

---

## 5. State Management

- **Form state**: react-hook-form
- **App state**: zustand/context for currency, theme, results
- **Persist user settings**: (optional) localStorage for last-used values

---

## 6. Animations & Microinteractions

- **Chart draw-in**: animate on calculation
- **Button ripple/scale**: framer-motion
- **Summary count-up**: framer-motion or custom
- **Modal/Export**: slide/fade in

---

## 7. Performance & Quality

- **Optimize bundle**: tree-shake, code-split, lazy-load chart
- **Memoize calculations**: useMemo for results
- **Lighthouse**: target 90+ mobile, check color contrast, tap targets, perf
- **Testing**: (optional) unit test calculation logic, basic UI tests

---

## 8. Deployment

- **Vercel/Netlify**: auto-deploy from main branch
- **SEO**: meta tags, social image, favicon
- **PWA**: (optional) add manifest for installability

---

## 9. Future Enhancements (Phase 2+)

- Dark mode toggle
- Save/share sessions (localStorage or shortlink)
- More chart types (bar, donut)
- Comparison view (multiple scenarios)
- Inflation toggle

---

## 10. Implementation Order

1. Scaffold project, set up Tailwind, fonts, colors
2. Build form UI, validation, state
3. Implement calculation logic, test with sample data
4. Build chart component, connect to results
5. Add summary stats, animated transitions
6. Implement export features
7. Polish UI, add microinteractions, accessibility
8. Test on mobile, run Lighthouse, fix issues
9. Deploy

---

**Let me know if you want a more granular breakdown (e.g. per-component todos, code snippets, or a starter repo structure).** 