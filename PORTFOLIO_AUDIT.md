# Portfolio Audit and Redesign Assessment

**Audit date:** 21 November 2026  
**Scope:** Repository inspection and local lint/build checks. No application files were changed.  
**Repository:** `D:\main_projects\portfolio`

## 1. Executive Summary

This is a React 19/Vite single-page portfolio with an Express/MongoDB service. The repository shows initiative: section components, a résumé PDF, project and social links, certificate assets, a contact API, and several interactive ideas. The portfolio does not yet turn those ingredients into a strong engineering candidacy. Its role message is inconsistent, project cards have little technical evidence, contact is not mounted, and continuous visual effects account for substantial runtime and bundle cost.

**Recommendation: Option B — major redesign.** Keep React/Vite and the useful assets/content, then substantially rework information architecture, project storytelling, accessibility, metadata, and the design system. A full rebuild is not justified: the current foundation builds and is serviceable.

Highest-impact work: establish an accurate stable role statement; make contact obvious; present projects with verifiable engineering evidence; reduce/defer heavy animation; replace template metadata; and fix lint and keyboard/accessibility gaps.

**Evidence limits:** The deployed Vercel URL could not be opened by the available web reader, and browser automation was unavailable. I did not inspect rendered pages at 375, 768, or 1440 px. Visual appearance and responsive behavior are therefore marked unverified; source-level observations are not presented as browser observations. No Lighthouse, Core Web Vitals, or assistive-technology results are claimed.

## 2. Current Website Overview

- One scrolling page mounts Home, About, Skills, Achievements, Projects, and GitHub in `client/src/App.jsx` (87–92). There is no router or separate case-study route.
- The hero shows “Shivam,” a time-dependent greeting, and rotating role labels. It first displays “Full Stack Web Developer,” then cycles through “MERN Stack Specialist,” “Node.js Expert,” and “Cyber Enthusiast” (`client/src/components/Hero.jsx`, 6–10, 82–98).
- Two projects are configured: “Modern Portfolio” and “Pathfinder” (`client/src/data.jsx`, 13–17). Both have demo/source links but one-line descriptions, no screenshot, and no technical case study (`client/src/components/Projects.jsx`, 16–43).
- Social links include LinkedIn, GitHub, CodeChef, TryHackMe, and email (`client/src/data.jsx`, 5–11); the résumé PDF is linked in the hero (`Hero.jsx`, 105–107).
- Contact and AI-match components exist, but both are commented out of the rendered tree (`client/src/App.jsx`, 7–18, 93–94). No Experience, Education, or Footer section is mounted.
- Express/Mongoose persists contact submissions and Nodemailer attempts email notification. A Gemini endpoint compares a job description against hard-coded résumé content.

## 3. Repository Architecture

### Stack and structure

| Area | Evidence | Assessment |
|---|---|---|
| Frontend | React 19, Vite 7, JSX, ES modules (`client/package.json`) | Appropriate small-app foundation; JavaScript rather than TypeScript. |
| Styling | Tailwind CSS 4 Vite plugin and `@theme` tokens (`client/vite.config.js`, `client/src/index.css`) | Utility-first styling, but a separate Tailwind config duplicates some palette definitions. |
| Motion/graphics | Framer Motion, Three.js, canvas particles, type animation | High implementation/runtime complexity relative to portfolio content. |
| Backend | Express 5, Mongoose 8, Nodemailer, Google Generative AI (`server/package.json`) | Contact persistence/email and job-description analysis endpoints. |
| Routing | Anchor links only; Vercel routes `/api/*` to `server/server.js` | One-page SPA plus API route; no client router. |
| Assets | Résumé, four portrait variants, six certificate images under `client/public/images/` | Useful assets; two portrait variants and all six certificate images are referenced. Other portrait files appear unused. |
| Deployment | `client/vite.config.js`, `server/vercel.json`, `.gitignore` | Frontend hosting/root configuration is not evident in the repo; deployed behavior not verified. |

### Main files

- App composition/overlays: `client/src/App.jsx`
- Hero: `client/src/components/Hero.jsx`
- About: `client/src/components/About.jsx`
- Skills: `client/src/components/Skills.jsx`
- Projects/data: `client/src/components/Projects.jsx`, `client/src/data.jsx`
- Achievements: `client/src/components/Achievements.jsx`
- GitHub integration: `client/src/components/GitHub.jsx`
- Navigation/social: `client/src/components/Navbar.jsx`, `client/src/components/SocialLinks.jsx`
- Global 3D and hero canvas: `client/src/components/AnimatedBackground.jsx`, `client/src/components/ParticleBackground.jsx`
- Contact UI: `client/src/components/Contact.jsx` (not mounted)
- AI UI/API: `client/src/components/AIMatch.jsx`, `server/controllers/aiController.js` (UI not mounted)
- Contact API/model: `server/controllers/contactController.js`, `server/models/Message.js`
- HTML metadata: `client/index.html`

### Reuse, duplication, dead code

Section components and centralized project/social data are a workable start. Repeated card/heading/button styles remain inline instead of forming a consistent shared layer. Two always-running effects overlap: a global Three.js scene and a hero canvas. The 3D background creates OrbitControls on its canvas without a visible user-facing reason to manipulate it.

`client/src/App.css` is unimported in `main.jsx` and contains Vite starter styles. `client/public/images/shivam.jpg` and `shivam-professional.png` have no tracked source references. `AIMatch` is imported but only appears in commented markup; Contact is imported but not mounted. The project data contains a commented placeholder. The lint command reports 13 errors, mostly unused `motion` bindings and one unused caught error variable.

## 4. Visual Design Assessment

**Rendered review: Not verified.** Source classes suggest a dark neon blue/purple, glass-card look with glow, blur, gradients, and motion. The palette is coherent enough to be recognizable but uses familiar portfolio tropes and does not establish a distinctive engineering identity.

Source observations:

- Main theme colors are `#00BFFF`, `#9D4EDD`, and `#0E0E10` (`client/src/index.css`, 2–6; `tailwind.config.js`, 8–18); the hero adds a separate `#000011` (`Hero.jsx`, 55).
- Body requests Inter without loading a font file/provider (`index.css`, 8–11), so the intended face depends on local availability.
- Most headings use `text-4xl`; body copy is often 18 px; hero name is 60/96 px at responsive sizes. This provides a rough hierarchy but no explicit text measure system.
- Translucent cards, glow, gradients, and entrance animations recur across sections. They may compete with the work itself; project cards currently have no visual preview region.

Use a restrained neutral base, one purposeful accent, and real project UI/diagrams as visual material. Revisit this judgment with screenshots after browser inspection.

## 5. UI/UX Assessment

### Strengths

- Desktop/mobile navigation links map to mounted section IDs (`Navbar.jsx`, 55–158; `App.jsx`, 87–92).
- Hero offers résumé and project CTAs (`Hero.jsx`, 105–110).
- Social/project links exist. Some use `rel="noopener noreferrer"`.
- Terminal overlay has a close button, Escape handling, and dialog semantics (`App.jsx`, 57–80; `WebTerminal.jsx`, 5–15).

### Weaknesses

- There is no visible Contact section despite a component and API. Email is only an icon link.
- Desktop nav combines six links and five icons in a non-wrapping `w-max` pill (`Navbar.jsx`, 60–85); exact narrow-laptop fit is unverified.
- Mobile menu button has no accessible name, `aria-expanded`, or `aria-controls` (`Navbar.jsx`, 88–92). Escape does not close it and focus is not moved/trapped.
- Active nav state changes only on click, not scroll (`Navbar.jsx`, 33–34, 65–68).
- Icon-only social anchors lack accessible names (`SocialLinks.jsx`, 25–34). At mobile sizes they are fixed across the bottom (`SocialLinks.jsx`, 11–19), so overlap/touch sizing need browser checks.
- Certificate cards are clickable `motion.div`s rather than keyboard-operable buttons (`Achievements.jsx`, 67–83); the image overlay lacks dialog semantics, explicit close, and focus management (`Achievements.jsx`, 87–105).
- Portrait toggle is hidden until hover (`About.jsx`, 61–68), problematic for touch and potentially keyboard users.
- Terminal dialog does not manage focus or prevent background keyboard focus. Escape has listeners in App and WebTerminal.
- Custom cursor stores state on every mouse move (`CustomCursor.jsx`, 6–22), adding work without improving content discovery.

## 6. Responsive Design Assessment

**Rendered breakpoints: Not verified.** Responsive Tailwind classes are present, but no 375/768/1440 viewport tests were possible. Source evidence indicates responsive intent, not correct rendering.

Verify these specific risks in a browser:

- Fixed mobile social strip may compete with content at the bottom.
- Desktop `w-max` nav combines six anchors and five icons; inspect 768 px and laptop widths.
- Hero CTAs are a horizontal flex row without a wrap rule (`Hero.jsx`, 99–110); check 375 px and text zoom.
- Sections use large horizontal padding at medium/large breakpoints; check tablet/laptop reading widths.
- Both canvases resize to viewport dimensions without a visible low-power adaptation (`ParticleBackground.jsx`, 13–14, 127–131; `AnimatedBackground.jsx`, 21–22, 154–162).

After redesign, capture all three target widths; test menu, anchors, certificate view, terminal, résumé, and contact with keyboard and touch; check horizontal scrolling and fixed-element overlap.

## 7. Frontend Engineering Assessment

- **Architecture:** Componentized SPA with no unnecessary routing complexity. The problem is not the framework; it is content/config split and App also coordinating overlays. No global state library is needed at this size.
- **Types:** JavaScript/JSX only. There are no compile-time data/API contracts.
- **State:** Local component state suits menu, modal, terminal, and forms.
- **Error handling:** GitHub shows loading/error text. Contact uses toasts but is hidden. Email failure is logged while the endpoint returns success if database save worked (`server/controllers/contactController.js`, 30–38); user messaging should distinguish persistence from email delivery.
- **Maintainability:** Temporary comments, commented features, and starter CSS remain. Lint currently fails. No frontend test suite exists; server test script is a placeholder that exits with error (`server/package.json`).
- **Content integrity:** `server/controllers/aiController.js` embeds claims including “Certified Cybersecurity Expert (CompTIA)” and “Smart India Hackathon 2025 Winner” (7–28), not independently evidenced by this repo. Verify against the current résumé before presenting. About says DevOps, `data.jsx` says cybersecurity, and hero cycles several labels. Pick one accurate positioning.
- **External services:** GitHub API is requested on each mount without caching (`GitHub.jsx`, 15–30); the 3D model downloads from jsDelivr at runtime (`AnimatedBackground.jsx`, 83–101). Key content should remain usable when either fails.
- **Deployment:** `server/server.js` both calls `app.listen` and exports `app` (29–33), while Vercel routes requests to it. Verify this behavior in deployment logs; runtime variables and actual API deployment were not inspected.

## 8. Performance, SEO, and Accessibility

### Performance

The production build succeeded when output was directed to the system temporary directory. Vite reported JS **1,242.69 kB minified / 348.71 kB gzip**, CSS 25.62 kB / 5.10 kB gzip, and a warning for chunks over 500 kB. This is build output, not a network trace or performance score.

`AnimatedBackground.jsx` updates 22,500 point positions each animation frame and uses bloom (`33–46`, `114–152`). `ParticleBackground.jsx` separately animates 50 particles and pairwise links continuously (`17–25`, `78–95`, `115–125`). Both run without regard to viewport visibility or reduced-motion preference. This is a large baseline cost for a résumé site.

Reduce/remove or defer effects, pause offscreen animation, cap pixel ratio, and honor `prefers-reduced-motion`. Lazy-load noncritical interactions where that creates a genuine boundary. Measure after changes; do not promise scores in advance.

### SEO/social sharing

`client/index.html` has `<title>client</title>` and `/vite.svg` favicon, but no description, canonical URL, Open Graph/Twitter tags, theme color, or custom preview image (4–6). Replace template metadata with the real name and target role. The app mounts into an empty `#root`; crawlers that do not execute the SPA will not see its portfolio text. Consider prerendering only if search/link previews matter enough to justify it.

### Accessibility

Source review finds unnamed icon-only links/menu button, click-only certificate cards, hover-only portrait control, no authored focus system, no reduced-motion handling, and incomplete dialog focus behavior. Some semantic structure and labels exist (main, headings, terminal dialog). This is not a WCAG conformance audit. W3C WCAG 2.2 covers text alternatives, keyboard operation, focus, and contrast; check actual rendered colors/states against it ([W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)).

### Checks

- `npm.cmd run lint` in `client`: **failed**, 13 errors.
- Production Vite build: **passed**, with large-chunk warning and sizes above.
- `npm.cmd ls --depth=0`: **passed**, installed client dependencies resolve. `@google/generative-ai` is installed in frontend dependencies but the mounted UI does not import it; backend has its own dependency.
- No tests, typecheck, Lighthouse, Core Web Vitals, or browser/device tests were run. Browser access was unavailable.

## 9. Recruiter and Hiring Manager Evaluation

### Review A: 10-second recruiter scan

- **Who:** First name “Shivam” appears, but no full name or stable role is evident from source.
- **Target role:** Ambiguous; labels rotate across full-stack, MERN, Node.js, and cybersecurity.
- **Technologies:** Nine foundational tools are shown, without prioritization or project evidence.
- **Projects:** Two links are discoverable; descriptions do not explain problem, ownership, challenge, or outcome.
- **Résumé/contact:** Résumé is easy to find. Contact is only a social icon; the form is unmounted.

A recruiter can infer a web-development direction and retrieve the résumé, but cannot quickly identify the strongest engineering work or obvious contact route.

### Review B: 3-minute engineering-manager review

There is breadth in the repository: React, Express, Mongo persistence, email, GitHub data, and a Gemini endpoint. The portfolio does not translate that breadth into evidence: no case studies, architecture, testing, deployment notes, trade-offs, outcomes, or clear ownership. The only projects actually named in portfolio data are the portfolio and Pathfinder. AI prompt claims are not independently verified. A reviewer must leave the site and inspect external code to judge depth.

For each strong project, explain ownership, architecture/data flow, one difficult decision and its trade-off, tests/security/failure handling, and link to code/demo. Use measured results only when measured.

## 10. Section-by-Section Audit

| Section | Current implementation / strengths | Weaknesses and relevance | Retain / improve / remove / add |
|---|---|---|---|
| Navigation | Fixed desktop pill, slide-in mobile panel, links to existing IDs. | Mobile button lacks name/state; no contact/education/experience; no scroll tracking. | Keep anchors; improve semantics, focus, density; add Contact and résumé access. |
| Hero | Name, rotating role, résumé and project CTAs. | First name only, unstable role, generic copy, no target internship/backend emphasis. | Keep concise identity and CTAs; use stable accurate role and evidence-backed summary; remove greeting/typewriter if it delays clarity. |
| About | Portrait and short biography/toggle. | Generic and inconsistent with other positioning; no education/context; hover-only toggle. | Retain only useful portrait; rewrite with concrete facts; remove toggle if not useful. |
| Skills | Nine icon/tool cards. | Logos do not prove skill; backend/security depth is absent from displayed list; icons take space. | Group only evidenced skills and connect to projects; avoid proficiency claims without proof. |
| Projects | Two cards with stack, demo, repo. | One-line blurbs, no image, ownership, constraints, technical decisions, outcomes. | Keep 2–4 strongest; add role, problem, proof, case studies for substantial work. |
| Experience | Absent. | Relevant team/internship/open-source work cannot be screened. | Add if real relevant experience exists; otherwise do not fabricate. |
| Education | Absent. | User is a CS student; education facts help early screening. | Add concise accurate degree/institution/expected graduation details. |
| Achievements | Six credential/achievement cards with image modal. | Equal weighting, mouse-only cards, no context/selection rationale. | Keep strongest relevant verified items; make keyboard-operable and give context. |
| Contact | Contact form exists but is commented out; email icon is present. | No visible contact section, response expectation, or main-flow form status. | Add visible email CTA and form only if API is maintained; add compact footer. |
| Footer | Absent. | No closing identity/contact/navigation. | Add compact email/social links and copyright; avoid repeating every section. |

### Project case studies

Yes, for the strongest projects, especially backend/systems/security work. Include: problem/users/constraints and ownership; architecture diagram/data/API flows; implementation evidence; one difficult decision with alternatives/trade-offs; testing/security/failure handling/deployment; measured outcomes only when verified; screenshots/demo/repository and limitations. For small projects, a focused README or expandable detail is better than thin standalone pages.

## 11. Evidence-Based Scoring

Rendered-only categories are **Not verified** because no browser screenshots were available. Source/build evidence supports the other scores.

| Category | Score | Evidence-based rationale |
|---|---:|---|
| Visual design and aesthetics (15) | **Not verified** | Theme/effect classes are visible in source, but rendered balance and finish were not inspectable. |
| Typography, layout, consistency (10) | **5/10** | Some hierarchy and spacing; font is not explicitly loaded; role/palette vary; component patterns are inline. |
| UX/navigation (10) | **5/10** | Anchors, menu variants, résumé and project CTAs exist; contact is absent and menu/overlay interactions have gaps. |
| Responsive design (10) | **Not verified** | Responsive classes exist, but target widths were not rendered. |
| Accessibility (10) | **4/10** | Main/headings/dialog labels exist; unnamed controls, click-only cards, focus gaps, and no reduced-motion handling remain. |
| Performance/SEO (10) | **3/10** | 1.24 MB JS build, large chunk warning, two continuous effects, remote model load, template title/favicon; no runtime metric. |
| Project presentation (15) | **4/15** | Two projects have links/stacks; no screenshots, context, ownership, technical evidence, or outcomes. |
| Recruiter effectiveness (10) | **4/10** | Name, résumé, projects, socials; unclear role, hard-to-find contact, thin evidence. |
| Code quality/maintainability (10) | **5/10** | Build succeeds and components are separated; lint fails, dead code remains, deployment assumptions need checking. |

**Partial subtotal:** 26/70 across scored categories. **No overall score out of 100** is assigned because Visual Design and Responsive Design (20 points) are unverified. This subtotal is not a normalized grade.

## 12. Critical Problems

| Severity | Evidence | Why it matters | Recommended solution | Expected impact |
|---|---|---|---|---|
| **High** | `App.jsx` 93–94 comments out Contact; mounted sections end at GitHub (87–92). | Recruiter lacks an obvious contact section/form. | Mount contact or make labeled email prominent; verify backend first. | Fewer missed conversations. |
| **High** | `client/index.html` 4–6: title `client`, Vite favicon, no sharing metadata. | Browser tab and shared previews look unfinished. | Accurate title, description, favicon, canonical/social tags, preview image. | Better credibility and sharing. |
| **High** | Build: 1,242.69 kB JS; `AnimatedBackground.jsx` updates 22,500 points/frame; `ParticleBackground.jsx` also loops. | Startup, mobile battery/GPU, and low-end experience may suffer. | Remove/defer heavy effects, honor reduced motion, profile after redesign. | Faster, more reliable experience. |
| **High** | `Hero.jsx` 82–98 and `data.jsx` 3: multiple rotating labels and generic bio. | Candidate’s role is hard to classify. | Use a stable accurate target role and evidence-backed sentence. | Faster recruiter understanding. |
| **High** | `data.jsx` 13–17 and `Projects.jsx` 30–42: thin cards without previews/details. | Site does not demonstrate engineering depth itself. | Evidence-based case studies with role, decisions, proof. | Better engineering-manager review. |
| **Medium** | `Navbar.jsx` 88–92; `SocialLinks.jsx` 25–34; `Achievements.jsx` 67–83. | Core interactions are harder for keyboard/screen-reader users. | Accessible names/state, native buttons/links, focus and keyboard modal handling. | More robust, inclusive use. |
| **Medium** | Client lint output: 13 errors; `App.css` is unused starter CSS; AIMatch is unused/commented. | Quality gate fails and maintenance noise remains. | Clear lint; remove dead code after deciding which features stay. | Cleaner baseline. |
| **Medium** | `server/controllers/aiController.js` 7–28 hard-codes résumé claims. | AI may surface outdated/unsupported facts and arbitrary match scores. | Verify source data, label score heuristic, constrain/rate-limit requests before exposing. | Trustworthy output and lower abuse risk. |
| **Low** | `CustomCursor.jsx` 6–22 updates React state on pointer movement. | Adds churn without helping visitors understand the work. | Remove unless user testing demonstrates value. | Simpler interaction and less work. |

## 13. Design Strengths Worth Preserving

- Résumé PDF is a local asset and directly linked.
- Project/social data have a central source file.
- React/Vite is suitable for this portfolio size.
- Section components provide a useful starting boundary.
- Portrait and certificate assets can support credibility when selected carefully.
- Contact persistence/email code may become a case study if tested and currently deployed.
- Production build succeeds; this is a redesign/quality problem, not a reason to discard the whole repo.

## 14. Redesign vs. Rebuild Recommendation

### Option B — Major redesign

The foundation is usable, but candidate narrative, project evidence, contact, metadata, accessibility, and animation load need substantial change. Option A risks polishing around a weak message; Option C would discard a working React/Vite setup without repository evidence that it is unsalvageable.

**Reuse:** React/Vite, cleaned section components, content/assets, and backend only after its operation is verified.  
**Replace:** overlapping effects, custom cursor, role typewriter, template metadata, starter CSS, dead/commented feature code, and thin project copy.  
**Effort estimate:** 3–5 focused days for a polished one-page redesign and cleanup if copy is ready; 1–2 weeks with 2–3 evidence-rich case studies, API checks, and verification. This is a planning estimate.  
**Risks:** content facts need verification; minimalist design needs strong project visuals; contact form needs environment/database/spam/email checks. Confirm Vercel config and serverless `app.listen` behavior.

## 15. Proposed Modern Design Direction

**Direction:** Minimal editorial engineering portfolio. Use real project interfaces, diagrams, and compact architecture evidence as the visual material. Avoid generic neon/glass/3D as the main identity.

### Suggested tokens

- Choose one surface direction: warm near-white `#F7F8FA` or deep ink `#111827`.
- Primary text `#111827` on light / `#F3F4F6` on dark; muted `#536174` / `#AAB4C3`; check every contrast pair.
- Accent `#0F766E` light / `#5EEAD4` dark; use for links and restrained emphasis.
- Borders `#D8DEE8` light / `#334155` dark.
- Type: Inter or Geist for body/UI and IBM Plex Mono for labels/code, loaded locally or from a controlled provider with system fallbacks.
- Spacing: 4 px base with 8/12/16/24/32/48/64 px steps.
- Grid: centered 1120–1200 px max width; desktop 12-column/two-column case studies, tablet one readable column, mobile 20–24 px side padding.
- Components: flat surfaces, subtle borders, modest radius, clear focus ring; no blur behind body text.
- Motion: short state transitions only; no perpetual decoration; respect `prefers-reduced-motion` and pause offscreen media.

### Homepage architecture

1. Compact header: full name, Work, About, Resume, Contact.
2. Hero: stable target role, one specific evidence-backed sentence, location/availability if useful, resume/email CTAs.
3. Selected work: 2–3 strong projects with context and proof.
4. Engineering profile: backend/full-stack/security interests connected to shipped work.
5. Experience and Education: concise verified timeline, if applicable.
6. Selected recognition: only relevant verified items.
7. Contact and compact footer.

Cards should show real product UI/diagram, project name, problem/outcome, contribution, 2–4 technologies, Demo/Code. Case studies should explain one meaningful trade-off, backed by diagram, repository, tests, or deployed behavior. No invented metrics or decorative code without explanation.

For responsive/accessibility behavior: accessible compact menu; visible contact CTA; deliberate stacking; preserved image ratios; comfortable touch targets; visible keyboard focus; keyboard dismissal/focus return for dialogs; text alternatives and reduced-motion support; zoom/reflow and contrast checks. Verify in a browser at requested widths.

## 16. Suggested Homepage Structure

```text
Header: Shivam Kumar | Work | About | Resume | Contact
Hero: Software Engineer / Full-stack & Backend
      Evidence-backed sentence | Email | Resume
Selected Work: 2–3 projects with screenshot, contribution, proof, stack
Engineering Focus: APIs, systems, security (only as demonstrated)
Experience / Education: concise verified timeline
Selected Achievements: 2–4 relevant items
Contact: email and optional form
Footer: GitHub, LinkedIn, email, copyright
```

Use the full name if preferred. The repo currently exposes only “Shivam”; verify exact public identity and all facts before publication.

## 17. Prioritized Improvement Roadmap

### P0 — Must fix before applications

1. Verify public claims; choose one accurate target-role statement.
2. Add obvious contact and a visible section; confirm the API or use direct email.
3. Replace template title/favicon; add description and sharing preview metadata.
4. Rewrite project summaries around role, problem, decision, and proof; make no unsupported claims.
5. Clear lint and keep production build successful.
6. Reduce/remove perpetual 3D/canvas work and ensure third-party failure does not affect core content.

### P1 — High-impact redesign

1. Establish a minimal editorial visual system.
2. Add Education and relevant Experience if accurate data exists.
3. Create 2–3 focused case studies with architecture and trade-offs.
4. Fix names, focus, keyboard modal behavior, reduced motion, and touch targets.
5. Remove dead code and consolidate content. Consider TypeScript only if it helps as data/API surface grows; it is not required.
6. Verify Vercel/API deployment and runtime variables, including serverless entry behavior.

### P2 — Optional polish

1. Add only interaction transitions that clarify state.
2. Keep a GitHub area only if it highlights well-described relevant work.
3. Show a small selected certificate set.
4. Measure Lighthouse and field Core Web Vitals after deployment. Google’s current good thresholds are LCP ≤2.5s, INP ≤200ms, and CLS ≤0.1 at the 75th percentile, segmented by device ([web.dev Core Web Vitals](https://web.dev/articles/vitals?authuser=115)).

## 18. Final Verdict

The repo has a working base, but the portfolio currently communicates experimentation more than engineering depth. The issue is not the author’s background; the page gives little project evidence, changes its role message, hides contact, and spends much of its code/runtime on effects. A major redesign on the existing React/Vite foundation is the best balance of quality and effort.

The next review needs screenshots and keyboard testing at 375, 768, and 1440 px. Until then, this report does not claim that the deployed page’s visual polish, responsive behavior, accessibility conformance, or field performance has been verified.
