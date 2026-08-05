# VoidSec Findings

## Workspace
- Project directory was empty at the start of implementation.
- No existing source files, dependencies, Git metadata, or user changes need preservation.

## Supplied Content
- Team: VoidSec
- blinkyy: Web Exploitation + OSINT
- nh72: Cryptography
- smAn: Reverse Engineering + Pwn
- Yass: Miscellaneous

## Content Constraints
- Player photos, biographies, social profiles, achievements, geographic identity, and contact address were not supplied.
- Use deliberate short role copy and generated initials/call signs, without inventing personal facts.
- Keep the contact action configurable until the final domain is purchased.

## Technical Direction
- Next.js App Router with TypeScript for the requested Node.js/Vercel workflow.
- CSS-first visual system and lightweight client interactions; no bitmap imagery required.
- Local data arrays for easy member and capability editing.

## Visual Verification
- Desktop hero at 1440x1000 renders cleanly: typography, radar graphic, header, grid, and ticker have the intended hierarchy.
- The first CLI mobile screenshot is not trustworthy because headless Chromium keeps a minimum layout viewport wider than the 390px capture, causing the right edge to be cropped.
- Independently of that capture limitation, reduce the smallest-screen hero type slightly so the complete words stay comfortably in the safe area.
- Direct fragment screenshots are also unreliable with the simple Chromium CLI: the SPA renders after native fragment navigation and smooth scrolling captures an intermediate/blank position.
- Use DevTools emulation for final mobile and lower-page captures so viewport and scroll state are explicit.
- True 390x844 emulation confirms the mobile header, complete hero headline, intro, CTA, and scope all fit without horizontal overflow.
- The desktop operator section renders all four members in a clean equal-width grid with readable role copy and no content collisions.
- Desktop capabilities section has strong light/dark contrast, aligned rows, and readable copy across all four disciplines.
- Desktop contact/footer treatment renders completely, including the intentionally pending email state; no unsupported address is published.
- Mobile operator and contact captures confirm the single-column roster, contact typography, pending channel state, and footer all remain readable at 390px.
- Both display and monospace fonts are now packaged locally, avoiding a runtime dependency on Google Fonts.
