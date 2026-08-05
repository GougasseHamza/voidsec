# VoidSec

Public website for the VoidSec capture-the-flag team.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run check
npm run build
```

## Customize

- Team member names, roles, and descriptions: `lib/site-data.ts`
- Page sections and metadata: `app/page.tsx` and `app/layout.tsx`
- Colors, layout, animation, and responsive behavior: `app/globals.css`
- Contact channel: replace the provisioning state in the `#contact` section after the official domain and mailbox are active

## Deploy to Vercel

Push this directory to a Git repository, import it into Vercel, and keep the detected Next.js defaults. No custom build or output settings are required.

After buying the official domain, add it under **Project Settings → Domains** in Vercel. Email MX/TXT records should remain managed through the domain's DNS provider; they do not conflict with the website configuration.
