import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const githubUsername = 'isonnymichael'
const token = process.env.GITHUB_TOKEN
const headers = token ? { Authorization: `Bearer ${token}` } : {}

const contributionUrls = [
  'https://github.com/KiiChain/kiijs-sdk/pull/36',
  'https://github.com/KiiChain/kiijs-sdk/pull/39',
  'https://github.com/KiiChain/kiijs-sdk/pull/44',
]

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, { headers, ...options })
  if (!res.ok) {
    console.warn(`Failed to fetch ${url}: ${res.status}`)
    return null
  }
  return res.json()
}

mkdirSync(publicDir, { recursive: true })

// 1. User profile
console.log('Fetching user profile...')
const user = await fetchJSON(`https://api.github.com/users/${githubUsername}`)
writeFileSync(join(publicDir, 'github-user.json'), JSON.stringify(user))

// 2. Repos
console.log('Fetching repositories...')
const allRepos = []
let page = 1
while (true) {
  const repos = await fetchJSON(
    `https://api.github.com/users/${githubUsername}/repos?per_page=100&page=${page}&sort=updated`,
  )
  if (!Array.isArray(repos) || repos.length === 0) break
  allRepos.push(...repos)
  if (repos.length < 100) break
  page++
}

const normalizedRepos = allRepos
  .filter((repo) => !repo.fork && repo.visibility === 'public')
  .map((repo) => ({
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description || 'No description',
    stars: repo.stargazers_count || 0,
    forks: repo.forks_count || 0,
    issues: repo.open_issues_count || 0,
    contributors: 1,
    url: repo.html_url,
    avatarUrl: repo.owner?.avatar_url || null,
    languagesUrl: repo.languages_url,
  }))
  .sort((a, b) => b.stars - a.stars)

writeFileSync(join(publicDir, 'github-repos.json'), JSON.stringify(normalizedRepos))

// 3. Language totals across all repos
console.log('Fetching language data...')
const languageResponses = await Promise.all(
  normalizedRepos.map((repo) => fetchJSON(repo.languagesUrl)),
)
const languageTotals = languageResponses.reduce((acc, repoLanguages) => {
  Object.entries(repoLanguages || {}).forEach(([name, bytes]) => {
    acc[name] = (acc[name] || 0) + bytes
  })
  return acc
}, {})
writeFileSync(join(publicDir, 'github-languages.json'), JSON.stringify(languageTotals))

// 4. Contribution calendar (requires token for GraphQL)
console.log('Fetching contribution calendar...')
let contributionDots = []
if (token) {
  const graphRes = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      query: `query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }`,
      variables: { login: githubUsername },
    }),
  })
  const graphJson = graphRes.ok ? await graphRes.json() : null
  const weeks =
    graphJson?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || []
  contributionDots = weeks
    .flatMap((week) => week.contributionDays || [])
    .map((day) => day.contributionCount)
}
writeFileSync(join(publicDir, 'github-contributions.json'), JSON.stringify(contributionDots))

// 5. Open source PR contributions
console.log('Fetching PR contributions...')
const parsePullUrl = (url) => {
  const parts = new URL(url).pathname.split('/').filter(Boolean)
  return { owner: parts[0], repo: parts[1], number: parts[3] }
}

const prs = await Promise.all(
  contributionUrls.map(async (url) => {
    const { owner, repo, number } = parsePullUrl(url)
    const pr = await fetchJSON(`https://api.github.com/repos/${owner}/${repo}/pulls/${number}`)
    if (!pr) return null
    return {
      repoFullName: `${owner}/${repo}`,
      number,
      title: pr.title,
      url: pr.html_url,
      merged: pr.state === 'closed' && !!pr.merged_at,
      comments: (pr.comments || 0) + (pr.review_comments || 0),
      files: pr.changed_files || 0,
      additions: pr.additions || 0,
      deletions: pr.deletions || 0,
      commits: pr.commits || 1,
      authorLogin: pr.user?.login || owner,
      authorAvatar: pr.user?.avatar_url || null,
      updatedAt: pr.updated_at,
    }
  }),
)
writeFileSync(join(publicDir, 'github-prs.json'), JSON.stringify(prs.filter(Boolean)))

console.log('All GitHub data fetched successfully.')
