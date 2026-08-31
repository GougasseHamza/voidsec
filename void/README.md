# VoidSec

Public website for VoidSec — a security consultancy in Rabat, Morocco.

Next.js (App Router) + TypeScript, no CSS framework. All styling lives in one
stylesheet; all content lives in one data file.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run check   # tsc --noEmit
npm run build
```

## Structure

```
app/
  layout.tsx          header, footer, fonts, site-wide metadata
  page.tsx            home
  services/page.tsx   the four practices + engagement model
  team/page.tsx       roster, principles, track record
  contact/page.tsx    contact form + details
  api/contact/route.ts  form handler
  globals.css         the entire design system
components/           header, footer, contact form, hero graphic, icons
lib/site-data.ts      all site content
```

## Editing content

Almost everything is in `lib/site-data.ts`:

| What | Where |
|---|---|
| Contact email, city, coordinates, domain | `site` |
| Nav items | `nav` |
| Scrolling strip under the hero | `strip` |
| The four services, their scope and deliverables | `services` |
| The five engagement steps | `engagementModel` |
| Capability areas shown on /team | `disciplines` |
| The three working principles | `principles` |
| Client engagements (empty) | `engagements` |
| CTF results (empty) | `competitions` |

`engagements` and `competitions` are intentionally empty arrays. The team page
renders an honest empty state while they are empty and switches to a list the
moment you add entries — so nothing has to be redesigned to publish a result.

The site deliberately does not name individuals. `disciplines` describes what
the team covers; if you ever want named profiles back, that is a new data
array and a new component, not an edit to this one.

## Before going live

1. **Confirm `contact@voidsec.sh` actually receives mail.** It is published on
   every page and in the footer. If the mailbox does not exist yet, either
   create it or change `site.email` in `lib/site-data.ts`.
2. **Verify the regulatory references** in the `compliance-readiness` service
   (Law 05-20, DGSSI, CNDP, ISO/IEC 27001) against current Moroccan
   requirements before publishing them as a service scope.
3. **Wire the contact form** (below). Until you do, the form returns a 503 and
   tells the sender to email directly. It never shows a false success.

## Contact form

`POST /api/contact` sends over SMTP via nodemailer, so it works with any mail
provider without a code change.

`voidsec.sh` already runs on Zoho Mail, and its SPF record authorises Zoho and
nothing else. Sending through Zoho therefore needs no DNS changes and passes SPF
as-is. To turn the form on:

1. In Zoho Mail, open **Settings > Security > App passwords** and generate one
   for `contact@voidsec.sh`. Use that, not the account login password.
2. In Vercel, under **Settings > Environment Variables**, add:

```
SMTP_HOST=smtp.zoho.com          # smtp.zoho.eu if the account is in the EU DC
SMTP_PORT=465
SMTP_USER=contact@voidsec.sh
SMTP_PASS=<the app password>
CONTACT_TO=contact@voidsec.sh
```

3. Redeploy so the new variables are picked up.

`CONTACT_FROM` is optional and defaults to `SMTP_USER`. Set it only if you want
to send as a verified alias.

Mail is sent from the mailbox with `Reply-To` set to whoever filled in the form,
so replying in Zoho goes straight back to the enquirer.

Until all four required variables are set, the route logs that fact server-side
and returns 503 with a message pointing at the email address. It never reports a
message as delivered when it was not. The endpoint is rate limited to five
submissions per IP per ten minutes, caps the body at 32 KB, drops honeypot
submissions silently, and strips CR/LF from user input so the form cannot be
used to inject mail headers.

## Deploy to Vercel

Import this directory into Vercel and keep the detected Next.js defaults. Add
the environment variables above under **Settings → Environment Variables**, and
the domain under **Settings → Domains**. Email MX/TXT records stay with your DNS
provider and do not conflict with the site.
