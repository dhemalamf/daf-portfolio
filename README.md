# Dhema'alam Fajrianto - Product Manager Portfolio

A professional portfolio website built with Next.js 14 and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Fonts**: Inter (Google Fonts)

## Getting Started

### Prerequisites

Make sure you have Node.js 18+ installed on your machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── about/page.tsx      # About page
│   │   ├── work/page.tsx       # Work/Portfolio page
│   │   ├── work/[slug]/page.tsx # Individual case study
│   │   ├── contact/page.tsx    # Contact page
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/             # Reusable components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── CaseStudyCard.tsx
│   │   ├── ExperienceCard.tsx
│   │   ├── SkillsGrid.tsx
│   │   ├── ContactForm.tsx
│   │   └── SectionHeading.tsx
│   └── data/                   # Content data files
│       ├── profile.ts          # Personal info & metrics
│       └── caseStudies.ts      # Case study content
├── tailwind.config.ts          # Tailwind configuration
├── package.json
└── tsconfig.json
```

## Customization

### Updating Content

All content is stored in TypeScript files under `src/data/`:

- **profile.ts**: Your name, bio, contact info, skills, and experience
- **caseStudies.ts**: Detailed case studies with problem/process/outcome format

### Styling

The design system is defined in:
- `tailwind.config.ts`: Colors, fonts, animations
- `globals.css`: Custom utilities and base styles

## Deployment

Build for production:
```bash
npm run build
```

The site can be deployed to Vercel, Netlify, or any static hosting platform.

## License

Personal portfolio - All rights reserved.
