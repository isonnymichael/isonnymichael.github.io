# isonnymichael.github.io

Personal portfolio website for Sonny Michael Wijaya — built with React, Vite, and Tailwind CSS. Deployed automatically to GitHub Pages via GitHub Actions.

Live: [isonnymichael.github.io](https://isonnymichael.github.io)

## Tech Stack

- **React 19** + **Vite**
- **Tailwind CSS v4**
- **Framer Motion** for animations
- **GitHub Actions** for CI/CD and data fetching

## How it works

GitHub data (repos, languages, contribution calendar, PRs) is fetched at **build time** using a GitHub token stored as a repository secret. The data is written to static JSON files in `public/` and bundled into the site — no token is ever shipped to the browser.

The workflow runs automatically on every push to `master` and once daily via cron to keep data fresh.

## Project Structure

```
src/
  App.jsx                       # Root layout
  data/config.jsx               # Static config: links, stack, social items
  hooks/useGitHubData.js        # Fetches pre-built GitHub JSON at runtime
  components/
    Sidebar.jsx                 # Profile, languages, tech stack
    ContributionsSection.jsx    # Open source PR contributions
    CommitsSection.jsx          # Contribution heatmap
    RepositoriesSection.jsx     # Paginated repo cards
    SocialSection.jsx           # Social media links
    ContactSection.jsx          # Contact links
    HoverAnimCard.jsx           # Animated card wrapper
    SkeletonCard.jsx            # Loading skeleton
    StackItem.jsx               # Tech icon with tooltip
    SectionCard.jsx             # Section wrapper with header
scripts/
  fetch-github-data.js          # Build-time GitHub data fetcher
.github/workflows/
  deploy.yml                    # Build, fetch data, deploy to Pages
```

## Local Development

**1. Clone and install**

```bash
git clone https://github.com/isonnymichael/isonnymichael.github.io.git
cd isonnymichael.github.io
npm install
```

**2. Create `.env.local` with your GitHub token**

```
GITHUB_TOKEN=your_github_pat_here
```

The token needs `public_repo` and `read:user` scopes. This file is gitignored.

**3. Fetch GitHub data locally**

```bash
npm run fetch-data
```

This writes `public/github-*.json` files (also gitignored).

**4. Start dev server**

```bash
npm run dev
```

## Deployment

Deployment is fully automated. To set it up on your fork:

1. Go to **Settings → Pages** and set source to **GitHub Actions**
2. Add a secret at **Settings → Secrets → Actions** named `REPO_PUBLIC_TOKEN` with a GitHub PAT (`public_repo` + `read:user` scopes)
3. Push to `master` — the workflow builds and deploys automatically

The site rebuilds daily at midnight UTC to refresh GitHub stats.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Production build |
| `npm run fetch-data` | Fetch GitHub data locally (requires `.env.local`) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
