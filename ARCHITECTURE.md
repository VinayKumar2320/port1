# VINAY.EXE — System Architecture & Developer Universe

> **Interactive personal universe and high-performance engineering portfolio of Vinay Kumar (M.S. Computer Science @ NYU Tandon).**

---

## 1. System Architecture Overview

`VINAY.EXE` is engineered to transcend conventional static web portfolios by functioning as a high-density, interactive engineering playground paired with a 30-second distraction-free recruiter executive brief.

```
                                    +-----------------------------------------------------+
                                    |                 VINAY.EXE Application               |
                                    +-----------------------------------------------------+
                                                              |
                  +-------------------------------------------+-------------------------------------------+
                  |                                           |                                           |
                  v                                           v                                           v
       +--------------------+                      +--------------------+                      +--------------------+
       |  Playground Mode   |                      |   Recruiter Mode   |                      |  UNIX Terminal CLI |
       | (Physics & Sim)    |                      | (30s Brief & PDF)  |                      |  (Interactive `~`) |
       +--------------------+                      +--------------------+                      +--------------------+
                  |                                           |                                           |
                  +-------------------------------------------+-------------------------------------------+
                                                              |
                                                              v
                                              +-------------------------------+
                                              |       Typed Content Layer     |
                                              | (Projects, Exper., Pubs, Edu) |
                                              +-------------------------------+
                                                              |
                                                              v
                                              +-------------------------------+
                                              |   GitHub Sync & Cache Engine  |
                                              | (Daily Actions Cron / API)    |
                                              +-------------------------------+
```

### Core Innovations & Technical Capabilities:

1. **Dual Universe Paradigm**:
   - **Playground Mode**: Tactile physics sandbox, draggable domain chips (`framer-motion`), live micro-simulators, telemetry status counters, and unlockable Easter eggs.
   - **Recruiter Mode**: Instant 1-click toggle stripping all animation distractions to deliver a scannable 30-second dossier with direct PDF resume download, verified key metrics, structured career milestones, and publication records.

2. **Embedded Interactive Miniature Experiences**:
   - **FraudGraph Simulator**: Interactive entity graph topology canvas with dynamic smurfing ring injection, Sybil attack toggles, streaming velocity sliders, and live sub-5ms latency meters.
   - **MedFlow Simulator**: SimPy 4.1 discrete-event healthcare twin with non-homogeneous Poisson arrival surges ($\lambda$), attending physician/nurse shift staffing, ESI 1–5 priority queue wait times, and strict mass conservation verification ($N_{arrived} = N_{departed} + N_{in\_system}$).
   - **CodeImpact Simulator**: Pull request risk prediction engine with Tree-sitter AST localization, cyclomatic complexity delta ($\Delta CC$) sliders, and local TreeSHAP game-theoretic attribution vectors.

3. **Docked Interactive UNIX Terminal (`VinayOS`)**:
   - Accessible via floating trigger or keyboard hotkey (`~`).
   - Supports live commands: `help`, `about`, `projects`, `simulate <fraud|hospital|risk>`, `experience`, `publications`, `education`, `cat resume`, `recruiter`, `contact`, `clear`, and `matrix`.

---

## 2. Technology Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
- **Styling & Design Tokens**: [Tailwind CSS 3.4](https://tailwindcss.com/) + Custom Industrial Editorial Palette (`#FBF9F5` / `#101216`)
- **Animation & Physics**: [Framer Motion](https://www.framer.com/motion/) + CSS hardware-accelerated transforms
- **Celebration Effects**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **CI/CD & Sync**: GitHub Actions + Netlify

---

## 3. Local Development

### Prerequisites:
- Node.js 18+ or 20+
- npm or bun

### Setup:
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Test production build
npm run build

# 4. Preview production build locally
npm run preview

# 5. Run ESLint checks
npm run lint
```

---

## 4. Automated Content Synchronization Architecture

### Daily Scheduled Synchronization (`.github/workflows/sync-portfolio.yml`):
Every 24 hours at 00:00 UTC, a GitHub Actions workflow:
1. Executes `scripts/sync-github.mjs`.
2. Queries the official GitHub REST API (`https://api.github.com/users/VinayKumar2320/repos?per_page=100`).
3. Extracts star counts, forks, primary languages, repository descriptions, and pushed timestamps.
4. Updates `src/data/github-cache.json` idempotently.
5. Runs `npm run build` to verify end-to-end type safety.
6. Automatically commits and pushes only when changes are detected.

### Manual GitHub Sync:
```bash
npm run sync:github
```

---

## 5. Authorized LinkedIn & Professional Record Workflow

In strict adherence to access restrictions and platform terms, this codebase avoids unauthorized scraping and instead provides a verified, type-safe data importer (`src/data/linkedin-importer.ts`):

1. **Exporting your LinkedIn Archive**:
   - Navigate to LinkedIn: `Settings & Privacy` -> `Data Privacy` -> `Get a copy of your data`.
   - Download your archive (contains `Positions.csv` / structured JSON).
2. **Importing & Validating**:
   - Pass the JSON export into `LinkedInImportService.parseUserDataArchive(rawJsonString)`.
   - The service enforces strict Zod schema validation (`LinkedInExportSchema`).
   - Approved items update `src/data/experience.ts` without risking API breaks.

---

## 6. How to Add or Approve Projects & Achievements

### Adding a New Flagship Project:
Edit `src/data/projects.ts` and add an object adhering to the `Project` interface:
```typescript
{
  id: "my-new-system",
  title: "System Name",
  tagline: "High-impact summary",
  category: "distributed", // 'ai-systems' | 'distributed' | 'simulation' | 'research-agents' | 'vision-hci'
  categoryLabel: "Distributed Systems",
  featured: true,
  date: "2026",
  summary: "Comprehensive technical narrative...",
  impactMetrics: [
    { label: "Throughput", value: "50k ops/sec", detail: "Benchmarked on cluster" }
  ],
  architecture: {
    overview: "Pipeline narrative...",
    flowSteps: ["Ingest", "Transform", "Score", "Alert"],
    keyChallenge: "Specific concurrency or distribution hurdle..."
  },
  tech: ["Go", "Kafka", "Docker"],
  links: {
    github: "https://github.com/VinayKumar2320/...",
    liveDemo: "https://..."
  }
}
```

### Adding Publications or Patents:
Add an entry to `src/data/publications.ts`:
```typescript
{
  id: "patent-id",
  title: "Patent or Paper Title",
  type: "Patent", // 'Patent' | 'Journal' | 'Conference'
  status: "Published",
  year: "2026",
  authors: "Vinay Kumar et al.",
  venue: "IEEE / ACM / PTO",
  category: "Reinforcement Learning",
  summary: "Brief...",
  impactMetrics: "Measured result..."
}
```

---

## 7. Deployment Configuration

### Netlify Deployment:
The root `netlify.toml` file automatically builds and routes all single-page paths:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages Deployment:
Configured via `.github/workflows/deploy.yml` with base URL configured in `vite.config.ts`.
