# 🎨 Compoundly — UI/UX Design Specification Document

**Product Type**: Mobile-First Web App
**Tone**: Clean · Minimal · Confident · Financially Empowering
**Design Principles**: Clarity, Efficiency, Visual Delight, Trust

---

## 1. 🧠 Design Philosophy

* **Show, don’t overwhelm**: Financial tools often feel complex. Compoundly will distill complexity into clarity.
* **Motion with meaning**: Subtle transitions and chart animations build intuition.
* **Form follows feeling**: The user should *feel* calm and empowered.
* **Mobile-first = thumb-first**: Every primary action is thumb-accessible.

---

## 2. 📱 Viewport Breakpoints

| Viewport | Width Range    |
| -------- | -------------- |
| Mobile   | ≤ 480px        |
| Tablet   | 481px – 1024px |
| Desktop  | > 1024px       |

---

## 3. 🌈 Color Palette

### ✅ Primary Brand Colors

| Use                   | Color     | Hex       | Notes                   |
| --------------------- | --------- | --------- | ----------------------- |
| Primary Accent        | Blue 500  | `#2563EB` | CTA buttons, links      |
| Primary Hover         | Blue 600  | `#1D4ED8` | Button hover states     |
| Success/Interest Line | Green 500 | `#22C55E` | Interest earned line    |
| Info/Principal Line   | Blue 400  | `#60A5FA` | Principal line on chart |

### 🎨 Neutral Tones

| Use                  | Color    | Hex       |
| -------------------- | -------- | --------- |
| Background           | White    | `#FFFFFF` |
| Card Background      | Gray 50  | `#F9FAFB` |
| Input Background     | Gray 100 | `#F3F4F6` |
| Border Color         | Gray 200 | `#E5E7EB` |
| Body Text            | Gray 700 | `#374151` |
| Label / Caption Text | Gray 500 | `#6B7280` |

### 🔲 Dark Mode (v2 optional)

Design in mind for toggled theme — invert neutral tones.

---

## 4. 🕋️ Typography

| Type     | Font              | Use Cases                                          |
| -------- | ----------------- | -------------------------------------------------- |
| Primary  | **Inter**         | All body, buttons, headings (system font fallback) |
| Numerals | **IBM Plex Mono** | Charts, calculated results (optional)              |

### Type Scale (Mobile-First)

| Style        | Size | Weight | Use                      |
| ------------ | ---- | ------ | ------------------------ |
| H1           | 28px | 700    | Result headline          |
| H2           | 22px | 600    | Section headers          |
| Body Large   | 16px | 500    | Primary readable content |
| Body Regular | 14px | 400    | Form inputs, help texts  |
| Caption      | 12px | 400    | Labels, tooltip info     |

---

## 5. 🧹 Layout & Components

### 5.1 Overall Layout

* Vertical scroll, mobile-first
* Sectioned by: Input ➔ Graph ➔ Summary ➔ Export
* Sticky **"Calculate" CTA** on bottom of mobile screen when input active

### 5.2 Core Components

#### 🎠 Input Cards

* Use **card components** (rounded-xl, shadow-md)
* 16px padding
* Label above input, light grey
* Focus state: subtle blue ring

```plaintext
[ Amount to Invest ]      ₦ [____]
[ Frequency ]              ☑ Weekly ☑ Monthly
[ Interest Rate ]          ☑ Manual ☑ Choose Fund [Dropdown]
[ Compounding ]            ☑ Monthly ☑ Annually
```

#### 🔘 Toggles & Selectors

* Rounded pill buttons
* Clear toggle states (e.g., solid fill when active)
* Hover/active: light blue for selection

#### 📈 Graph

* Smooth animated draw
* Tooltip on hover/tap:

```
Month 18 (Feb 2027)
Total: ₦1,254,000
Principal: ₦900,000
Interest: ₦354,000
```

* Chart Legend:

  * Blue = Principal
  * Green = Interest

#### 📃 Result Summary Block

* Display in big bold numbers:

```
Final Balance: ₦12,455,320
Interest Earned: ₦6,755,320
Total Invested: ₦5,700,000
```

* Use color coding + icon for clarity

  * 🟢 Up arrow for interest
  * 🔵 Circle dot for principal

#### 📤 Export Modal

* Slide-up modal on mobile
* Buttons:

  * "Download PDF"
  * "Copy Summary"
  * (Optional) “Share via WhatsApp”

---

## 6. 📲 Micro-Interactions & UX Enhancements

| Element          | Animation / Effect                            |
| ---------------- | --------------------------------------------- |
| Chart load       | Animate draw line on first load               |
| Input focus      | Expand/zoom slightly on mobile                |
| Calculate button | Ripple or pulse effect after tap              |
| Summary reveal   | Fade up and count-up numbers                  |
| Modal popups     | Slide from bottom with dim background overlay |

---

## 7. 🧰 Icons & Visual Elements

Use modern icon set: [Lucide](https://lucide.dev/) or [Heroicons](https://heroicons.com/)

| Icon Use            | Icon                    |
| ------------------- | ----------------------- |
| Currency Toggle     | `dollar-sign` / `naira` |
| Info Tooltips       | `info`                  |
| Recurring Frequency | `calendar`              |
| Export              | `download`, `share`     |
| Success/Interest    | `trending-up`           |

---

## 8. 💢 Accessibility (WCAG 2.1 AA)

* Ensure 4.5:1 color contrast
* All inputs labeled with `aria-label`
* Buttons are large/tappable (>44px height)
* Keyboard navigation supported

---

## 9. 🛠️ Reusability & Atomic Design

Follow **Atomic Design** principles:

| Atom          | Example                           |
| ------------- | --------------------------------- |
| Text Label    | “Monthly Recurring Investment”    |
| Input Field   | Number input with currency prefix |
| Toggle Button | Weekly / Monthly switch   |

| Molecule       | Description                 |
| -------------- | --------------------------- |
| InvestmentCard | Labeled input + helper text |
| ResultBox      | Shows one summary metric    |

| Organism      | Description                  |
| ------------- | ---------------------------- |
| InputForm     | All inputs in vertical stack |
| ResultDisplay | Graph + Summary + Actions    |

---

## 10. 🔧 Dev Handoff & Prototyping

Design in **Figma** with:

* Well-named layers and components
* Autolayout + constraints for responsiveness
* Mobile-first prototype (iPhone 13, 360px width)

Export specs with:

* `Rem` / `Px` annotations
* Component reuse instructions
* Spacing guide: 8pt system

---

## 11. 🧱 Navigation Flow (Mobile)

```
[Home Page]
 └── Input Form
     └── Calculate (CTA)
         └── Result Chart + Summary
             └── Export Modal
```

---

## 12. ✅ UX Success Checklist

| Success Criteria                      | Met? |
| ------------------------------------- | ---- |
| User completes input under 60s        | ☑    |
| Graph is legible & animated           | ☑    |
| Summary is skimmable at a glance      | ☑    |
| Export works without friction         | ☑    |
| Works beautifully on iPhone + Android | ☑    |