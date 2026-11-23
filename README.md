# OnlyPhysio — Expert Homecare Physiotherapy Website

A production-ready single-page website for **OnlyPhysio**, built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP ScrollTrigger, and Lenis smooth scrolling.

---

## 🌟 Tech Stack & Features

- **Framework**: Next.js 14 (App Router), TypeScript, React 18
- **Styling**: Tailwind CSS with custom clinical-premium tokens (Green #16A34A, Deep Green #14532D, Mint #DCFCE7, Navy badge #202530)
- **Smooth Scrolling**: Lenis smooth scrolling engine synchronized with GSAP ScrollTrigger
- **Animations**: Framer Motion component choreographies, 3D card tilt, cursor spotlight, and SVG stroke-dashoffset animations
- **Signature Physio Visuals**:
  1. **Spine Line-Art**: Segment-by-segment illuminating vertebrae column indicating step progression
  2. **Pulse / ECG Line**: Continuous cardiac rhythm divider
  3. **Range-of-Motion (ROM) Arc**: Functional joint recovery goniometer dial animating 0° → 120°
  4. **Breathing Blob**: Relaxing biological pulse behind key icons
- **Form & Validation**: `react-hook-form` + `zod` with inline validation, `/api/booking` route handler, and confetti celebration
- **Accessibility & SEO**: Semantic HTML5, WCAG AA contrast, JSON-LD `MedicalBusiness` structured schema, and Open Graph metadata

---

## 🚀 Getting Started

### 1. Installation

```bash
# Clone or navigate into the project directory
cd physio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Building for Production

```bash
npm run build
npm run start
```

---

## 📝 How to Edit Content

All client-facing copy, contacts, services, conditions, and FAQ items live in a single centralized file:
📁 **`src/data/content.ts`**

Search for `TODO` comments inside `src/data/content.ts` to customize:
- **Phone Number**: `contact.phone` and `contact.phoneDisplay`
- **Email Address**: `contact.email`
- **Physical Address & Google Maps link**: `contact.address`
- **Working Hours**: `contact.hours`
- **WhatsApp Helpline**: `contact.whatsappNumber`
- **Social Media Links**: `socials.youtube`, `socials.instagram`, `socials.facebook`
- **Testimonials, FAQ answers, and Service descriptions**

---

## 🖼️ How to Replace Images

Stock and placeholder photography are located in:
📁 **`public/images/`**

Simply replace any of the following image files with high-resolution client photography (keep the file name or update the paths in `src/data/content.ts`):

| File Name | Purpose | Recommended Dimensions |
| :--- | :--- | :--- |
| `logo.jpg` | Client Brand Logo (orange gradient on navy badge) | 512 × 512 px |
| `hero-physio.jpg` | Hero bedside physiotherapy session | 1200 × 1500 px |
| `elderly-rehab.jpg` | Geriatric mobility & balance exercise | 1000 × 800 px |
| `sports-recovery.jpg` | Athlete knee and joint rehabilitation | 1000 × 800 px |
| `therapist-team.jpg` | Senior registered BPT/MPT physiotherapist | 1000 × 1250 px |
| `equipment-rent.jpg` | CPM machine and hospital bed rental | 1000 × 800 px |
| `equipment-sale.jpg` | Braces, bands, and ergonomic aids | 1000 × 800 px |

---

## 🔌 Connecting the Booking API (`/api/booking`)

The booking endpoint is located at:
📁 **`src/app/api/booking/route.ts`**

It comes with typed Zod validation and clean integration hooks:

### Option A: Email Notification via Resend
```bash
npm install resend
```
```ts
// in src/app/api/booking/route.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'OnlyPhysio <care@onlyphysio.com>',
  to: validatedData.email,
  bcc: 'admin@onlyphysio.com',
  subject: `Appointment Confirmed: ${bookingId}`,
  html: `<p>Hi ${validatedData.fullName}, your appointment on ${validatedData.preferredDate} (${validatedData.preferredTime}) is confirmed.</p>`,
});
```

### Option B: Direct WhatsApp Alert (Interakt / Twilio)
Call the WhatsApp Business API webhook within the handler with `validatedData.phone` and `validatedData.fullName`.

### Option C: Google Sheets Auto-Append
Use Google Service Account credentials to push each booking row directly into a shared Google Spreadsheet.

---

## ☁️ Deployment on Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository. Next.js will be detected automatically.
4. Click **"Deploy"**. The site will build and be live worldwide in under 60 seconds with SSL and edge CDN caching.

---

## 🎨 Design System Tokens

- **Background**: `#FFFFFF`
- **Soft Section Background**: `#F4FAF6`
- **Primary Brand Green**: `#16A34A` (Hover `#15803D`)
- **Deep Clinical Green**: `#14532D`
- **Mint Accent**: `#DCFCE7`
- **Emerald Glow**: `#34D399`
- **Navy Badge (Logo Only)**: `#202530`
- **Text Headings**: `Plus Jakarta Sans`, font weights 600–800
- **Body Font**: `Inter`, font weights 400–600
