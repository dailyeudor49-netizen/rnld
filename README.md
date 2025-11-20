# Ionizi - E-commerce Website

A modern, responsive e-commerce website for home, garden, and everyday essentials. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Features

- Modern and clean showcase homepage
- Responsive layout (mobile, tablet, desktop)
- Header with logo and Footer components
- Europe-wide shipping with Cash on Delivery
- Legal pages:
  - Terms of Service
  - Privacy Policy
  - Shipping & Returns
  - Contact Us
- Built with Next.js App Router
- Styled with Tailwind CSS 4
- TypeScript for type safety
- Optimized images with Next.js Image component

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd mk
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── components/
│   ├── Header.tsx      # Header component with navigation
│   └── Footer.tsx      # Footer component with links
├── contact/
│   └── page.tsx        # Contact page
├── privacy/
│   └── page.tsx        # Privacy Policy page
├── shipping/
│   └── page.tsx        # Shipping & Returns page
├── terms/
│   └── page.tsx        # Terms of Service page
├── layout.tsx          # Root layout with Header and Footer
├── page.tsx            # Homepage
└── globals.css         # Global styles
```

## Deploy to Vercel

### Method 1: Deploy from GitHub (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. Go to [Vercel](https://vercel.com)
3. Sign in with GitHub
4. Click "New Project"
5. Import your repository
6. Vercel will automatically detect Next.js and configure the build settings
7. Click "Deploy"

### Method 2: Deploy with Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Run deploy command:
```bash
vercel
```

3. Follow the prompts to link your project and deploy

## Environment Variables

This project doesn't require any environment variables for basic functionality. Add any API keys or configuration as needed in a `.env.local` file.

## Customization

- **Colors**: Edit Tailwind classes in components or configure `tailwind.config.js`
- **Logo**: Place your logo at `public/images/logo.png` (recommended size: 120x40px or similar aspect ratio)
- **Content**: Update text content in each page component
- **Contact Info**: Update contact details in `app/contact/page.tsx`
- **Shipping Rates**: Update shipping costs and delivery times in `app/shipping/page.tsx`

## Technologies Used

- [Next.js 16](https://nextjs.org/) - React framework
- [React 19](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Deployment platform

## License

This project is open source and available under the MIT License.
