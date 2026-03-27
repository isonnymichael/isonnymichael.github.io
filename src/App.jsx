import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Globe,
  Hash,
  Headphones,
  Link2,
  Mail,
  MessageSquare,
  Music2,
  Play,
  Send,
  Users,
} from 'lucide-react'
import profilePicture from './assets/images/profile-picture.jpg'

const githubUsername = 'isonnymichael'
const githubToken = import.meta.env.VITE_GITHUB_TOKEN

const profileLinks = {
  github: `https://github.com/${githubUsername}`,
  linkedIn: 'https://www.linkedin.com/in/sonny-michael-95723512a/',
  email: 'mailto:isonnymichael@gmail.com',
  telegram: 'https://t.me/isonnymichael',
  discord: 'https://discord.com/users/isonnymichael',
}

const repositoryAvatar = 'https://avatars.githubusercontent.com/u/24585708?v=4'

const contributionUrls = [
  'https://github.com/KiiChain/kiijs-sdk/pull/36',
  'https://github.com/KiiChain/kiijs-sdk/pull/39',
  'https://github.com/KiiChain/kiijs-sdk/pull/44',
]

const deviconBase = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'
const simpleIcons = 'https://cdn.simpleicons.org'
const iconify = 'https://api.iconify.design'

const stackRows = [
  {
    label: 'Languages',
    items: [
      { name: 'JavaScript', icon: `${deviconBase}/javascript/javascript-original.svg` },
      { name: 'TypeScript', icon: `${deviconBase}/typescript/typescript-original.svg` },
      { name: 'PHP', icon: `${deviconBase}/php/php-original.svg` },
      { name: 'Python', icon: `${deviconBase}/python/python-original.svg` },
      { name: 'Solidity', icon: `${deviconBase}/solidity/solidity-original.svg` },
      { name: 'C#', icon: `${deviconBase}/csharp/csharp-original.svg` },
      { name: 'C++', icon: `${deviconBase}/cplusplus/cplusplus-original.svg` },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: `${deviconBase}/react/react-original.svg` },
      { name: 'Vue', icon: `${deviconBase}/vuejs/vuejs-original.svg` },
      { name: 'Svelte', icon: `${deviconBase}/svelte/svelte-original.svg` },
      { name: 'Astro', icon: `${deviconBase}/astro/astro-original.svg` },
      { name: 'Tailwind', icon: `${deviconBase}/tailwindcss/tailwindcss-original.svg` },
      { name: 'Vite', icon: `${deviconBase}/vitejs/vitejs-original.svg` },
    ],
  },
  {
    label: 'Framework',
    items: [
      { name: 'Node.js', icon: `${deviconBase}/nodejs/nodejs-original.svg` },
      { name: 'Express', icon: `${deviconBase}/express/express-original.svg` },
      { name: 'Next.js', icon: `${deviconBase}/nextjs/nextjs-original.svg` },
      { name: 'Laravel', icon: `${deviconBase}/laravel/laravel-original.svg` },
      { name: 'CakePHP', icon: `${deviconBase}/cakephp/cakephp-original.svg` },
      { name: 'Slim', icon: `${iconify}/logos/slim.svg` },
    ],
  },
  {
    label: 'Database',
    items: [
      { name: 'PostgreSQL', icon: `${deviconBase}/postgresql/postgresql-original.svg` },
      { name: 'MySQL', icon: `${deviconBase}/mysql/mysql-original.svg` },
      { name: 'Redis', icon: `${deviconBase}/redis/redis-original.svg` },
      { name: 'Firebase', icon: `${deviconBase}/firebase/firebase-original.svg` },
    ],
  },
  {
    label: 'Web3',
    items: [
      { name: 'Hardhat', icon: `${deviconBase}/hardhat/hardhat-original.svg` },
      { name: 'Ethers.js', icon: `${simpleIcons}/ethers` },
      { name: 'Wagmi', icon: `${simpleIcons}/wagmi` },
      { name: 'OpenZeppelin', icon: `${simpleIcons}/openzeppelin` },
    ],
  },
  {
    label: 'Mobile',
    items: [
      { name: 'Flutter', icon: `${deviconBase}/flutter/flutter-original.svg` },
      { name: 'Android', icon: `${deviconBase}/android/android-original.svg` },
    ],
  },
  {
    label: 'Game',
    items: [
      { name: 'Unity', icon: `${deviconBase}/unity/unity-original.svg` },
      { name: 'Cocos2dx', icon: `${simpleIcons}/cocos` },
      { name: 'Construct', icon: `${simpleIcons}/construct3` },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git', icon: `${deviconBase}/git/git-original.svg` },
      { name: 'GitHub', icon: `${deviconBase}/github/github-original.svg` },
      { name: 'GitLab', icon: `${deviconBase}/gitlab/gitlab-original.svg` },
      { name: 'Docker', icon: `${deviconBase}/docker/docker-original.svg` },
      { name: 'Vercel', icon: `${deviconBase}/vercel/vercel-original.svg` },
    ],
  },
  {
    label: 'Infrastructure',
    items: [
      { name: 'AWS', icon: `${deviconBase}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
      { name: 'DigitalOcean', icon: `${deviconBase}/digitalocean/digitalocean-original.svg` },
      { name: 'Cloudflare', icon: `${deviconBase}/cloudflare/cloudflare-original.svg` },
      { name: 'Nginx', icon: `${deviconBase}/nginx/nginx-original.svg` },
      { name: 'Ubuntu', icon: `${deviconBase}/ubuntu/ubuntu-original.svg` },
    ],
  },
  {
    label: 'AI Tools',
    items: [
      { name: 'Claude Code', icon: `${simpleIcons}/anthropic` },
      { name: 'Cursor', icon: `${simpleIcons}/cursor` },
      { name: 'Copilot', icon: `${simpleIcons}/githubcopilot` },
    ],
  },
  {
    label: 'Team',
    items: [
      { name: 'Slack', icon: `${deviconBase}/slack/slack-original.svg` },
      { name: 'Trello', icon: `${deviconBase}/trello/trello-original.svg` },
      { name: 'Notion', icon: `${deviconBase}/notion/notion-original.svg` },
      { name: 'TeamCity', icon: `${simpleIcons}/teamcity` },
      { name: 'YouTrack', icon: `${iconify}/logos/youtrack.svg` },
    ],
  },
]

const socialItems = [
  { label: 'LinkedIn', desc: '@isonnymichael', color: 'bg-[#0077B5]', icon: Link2, href: 'https://www.linkedin.com/in/sonny-michael-95723512a/' },
  { label: 'Facebook', desc: '@isonnymichael', color: 'bg-[#1877F2]', icon: Users, href: 'https://www.facebook.com/iSonnyMichael/' },
  { label: 'Instagram', desc: '@isonnymichael', color: 'bg-[#E4405F]', icon: Camera, href: 'https://www.instagram.com/isonnymichael/' },
  { label: 'Twitter', desc: '@isonnymichael', color: 'bg-black', icon: Hash, href: 'https://twitter.com/isonnymichael' },
  { label: 'YouTube', desc: '@isonnymichael', color: 'bg-[#FF0000]', icon: Play, href: 'https://www.youtube.com/@isonnymichael' },
  { label: 'TikTok', desc: '@isonnymichael', color: 'bg-black', icon: Music2, href: 'https://www.tiktok.com/@isonnymichael' },
  { label: 'GitHub', desc: '@isonnymichael', color: 'bg-slate-800', icon: Code2, href: 'https://github.com/isonnymichael' },
]

const languageColorMap = {
  PHP: '#5f6ac4',
  Vue: '#42d392',
  JavaScript: '#facc15',
  Python: '#1f6feb',
  TypeScript: '#3178c6',
  HTML: '#f97316',
  CSS: '#38bdf8',
  Svelte: '#ff3e00',
  Hack: '#9ca3af',
  Solidity: '#6b7280',
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const RESET_STATE = { y: 0, scaleX: 1, scaleY: 1, scale: 1, rotate: 0 }
const RESET_TRANSITION = { duration: 0.22, ease: 'easeOut' }

function HoverAnimCard({ tag = 'a', hoverAnim, hoverTransition, className, children, ...props }) {
  const controls = useAnimation()
  const MotionTag = motion[tag]
  return (
    <MotionTag
      animate={controls}
      initial={RESET_STATE}
      onHoverStart={() => controls.start({ ...hoverAnim, transition: hoverTransition })}
      onHoverEnd={() => { controls.stop(); controls.start({ ...RESET_STATE, transition: RESET_TRANSITION }) }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

function StackItem({ item, rowLabel }) {
  const [showTip, setShowTip] = useState(false)
  return (
    <div
      className="relative -ml-2 first:ml-0 transition-[margin] duration-200 ease-out group-hover:ml-1"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
      style={{ zIndex: showTip ? 20 : 1 }}
    >
      <motion.img
        src={item.icon}
        alt={item.name}
        whileHover={{ scale: 1.3, y: -5 }}
        transition={{ type: 'spring', stiffness: 420, damping: 14 }}
        className="h-7 w-7 rounded-sm border-2 border-white bg-white p-0.5 shadow-sm"
        loading="lazy"
      />
      <AnimatePresence>
        {showTip && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.82 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.82 }}
            transition={{ duration: 0.14 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-white shadow-lg"
          >
            {item.name}
            <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function SkeletonCard() {
  return (
    <div className="animate-shimmer relative rounded-md border border-slate-200 bg-slate-50 p-3">
      <div className="absolute right-3 top-3 h-8 w-8 rounded-full bg-slate-200" />
      <div className="h-4 w-3/4 rounded bg-slate-200" />
      <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
      <div className="mt-1 h-3 w-2/3 rounded bg-slate-200" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-3 w-12 rounded bg-slate-200" />
        <div className="h-3 w-12 rounded bg-slate-200" />
      </div>
      <div className="mt-3 h-1.5 w-full rounded bg-slate-200" />
    </div>
  )
}

function App() {
  const MotionMain = motion.main
  const [profileData, setProfileData] = useState({
    name: 'Sonny Michael Wijaya',
    ...profileLinks,
  })
  const [languageItems, setLanguageItems] = useState([])
  const [repoCards, setRepoCards] = useState([])
  const [contributionCards, setContributionCards] = useState([])
  const [commitDots, setCommitDots] = useState(Array.from({ length: 371 }, () => 0))
  const [repoSlideIndex, setRepoSlideIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const REPO_CARDS_PER_PAGE = 3

  useEffect(() => {
    const githubHeaders = githubToken
      ? {
        Authorization: `Bearer ${githubToken}`,
      }
      : undefined

    const parsePullUrl = (url) => {
      const parts = new URL(url).pathname.split('/').filter(Boolean)
      return { owner: parts[0], repo: parts[1], number: parts[3] }
    }

    const loadGitHubData = async () => {
      setIsLoading(true)
      try {
        const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`, {
          headers: githubHeaders,
        })
        const user = userResponse.ok ? await userResponse.json() : null
        if (user) {
          setProfileData({
            name: user.name || 'Sonny Michael Wijaya',
            ...profileLinks,
          })
        }

        const allRepos = []
        let page = 1
        while (true) {
          const repoResponse = await fetch(
            `https://api.github.com/users/${githubUsername}/repos?per_page=100&page=${page}&sort=updated`,
            { headers: githubHeaders },
          )
          const repoJson = repoResponse.ok ? await repoResponse.json() : []
          if (!Array.isArray(repoJson) || repoJson.length === 0) {
            break
          }
          allRepos.push(...repoJson)
          if (repoJson.length < 100) {
            break
          }
          page += 1
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
            avatarUrl: repo.owner?.avatar_url || repositoryAvatar,
            languagesUrl: repo.languages_url,
          }))
          .sort((first, second) => second.stars - first.stars)

        setRepoCards(normalizedRepos)

        const languageResponses = await Promise.all(
          normalizedRepos.map((repo) => fetch(repo.languagesUrl, { headers: githubHeaders })),
        )
        const languageJsonList = await Promise.all(
          languageResponses.map((response) => (response.ok ? response.json() : {})),
        )

        const languageTotals = languageJsonList.reduce((accumulator, repoLanguages) => {
          Object.entries(repoLanguages || {}).forEach(([name, bytes]) => {
            accumulator[name] = (accumulator[name] || 0) + bytes
          })
          return accumulator
        }, {})

        const totalBytes = Object.values(languageTotals).reduce((sum, value) => sum + value, 0)
        const mappedLanguages = Object.entries(languageTotals)
          .sort((first, second) => second[1] - first[1])
          .slice(0, 6)
          .map(([name, bytes]) => ({
            name,
            usage: totalBytes > 0 ? `${((bytes / totalBytes) * 100).toFixed(1)}%` : '0%',
          }))
        setLanguageItems(mappedLanguages)

        const contributionPromises = contributionUrls.map(async (url) => {
          const { owner, repo, number } = parsePullUrl(url)
          const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${number}`, {
            headers: githubHeaders,
          })
          const pr = response.ok ? await response.json() : null
          if (!pr) {
            return null
          }

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
        })

        const contributions = (await Promise.all(contributionPromises)).filter(Boolean)
        setContributionCards(contributions)

        if (githubToken) {
          const graphResponse = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${githubToken}`,
            },
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

          const graphJson = graphResponse.ok ? await graphResponse.json() : null
          const weeks = graphJson?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || []
          const calendarDots = weeks
            .flatMap((week) => week.contributionDays || [])
            .map((day) => day.contributionCount)
          if (calendarDots.length > 0) {
            setCommitDots(calendarDots.slice(-371))
          }
        } else {
          const eventResponse = await fetch(`https://api.github.com/users/${githubUsername}/events/public?per_page=100`)
          const events = eventResponse.ok ? await eventResponse.json() : []
          const eventsByDay = events.reduce((accumulator, event) => {
            const key = event.created_at.slice(0, 10)
            accumulator[key] = (accumulator[key] || 0) + 1
            return accumulator
          }, {})
          const today = new Date()
          const dots = Array.from({ length: 371 }, (_, index) => {
            const day = new Date(today)
            day.setDate(today.getDate() - (370 - index))
            const key = day.toISOString().slice(0, 10)
            return eventsByDay[key] || 0
          })
          setCommitDots(dots)
        }
      } catch {
        setLanguageItems([
          { name: 'JavaScript', usage: '0.0%' },
          { name: 'TypeScript', usage: '0.0%' },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    loadGitHubData()
  }, [])

  const languageSegments = languageItems.map((item) => ({
    ...item,
    numeric: Number.parseFloat(item.usage),
    color: languageColorMap[item.name] || '#94a3b8',
  }))

  const leftLanguageList = languageSegments.filter((_, index) => index % 2 === 0)
  const rightLanguageList = languageSegments.filter((_, index) => index % 2 === 1)

  const totalRepoPages = Math.ceil(repoCards.length / REPO_CARDS_PER_PAGE)
  const visibleRepos = repoCards.slice(
    repoSlideIndex * REPO_CARDS_PER_PAGE,
    (repoSlideIndex + 1) * REPO_CARDS_PER_PAGE,
  )

  const handleRepoPrev = () => {
    setSlideDirection(-1)
    setRepoSlideIndex((i) => Math.max(0, i - 1))
  }

  const handleRepoNext = () => {
    setSlideDirection(1)
    setRepoSlideIndex((i) => Math.min(totalRepoPages - 1, i + 1))
  }

  const monthMarkers = Array.from({ length: 13 }, (_, index) => {
    const day = new Date()
    day.setDate(day.getDate() - (364 - index * 28))
    return { label: monthNames[day.getMonth()], colStart: index * 4 + 1 }
  })

  return (
    <MotionMain
      className="relative min-h-screen overflow-hidden bg-white text-slate-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div className="grid-bg absolute inset-0" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] gap-4 px-4 py-5 md:grid-cols-[320px_1fr] md:px-6">
        <aside className="rounded-xl border border-slate-200 bg-white h shadow-[0_12px_40px_-30px_rgba(15,23,42,0.32)]">
          <div className="h-24 rounded-t-xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900" />
          <div className="px-5 pb-5">
            <div className="-mt-14 flex justify-center">
              <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-200">
                <img src={profilePicture} alt={profileData.name} className="h-full w-full object-cover" />
              </div>
            </div>
            <h1 className="mt-3 text-center text-2xl font-semibold text-slate-900">{profileData.name}</h1>
            <p className="mt-1 text-center text-sm text-slate-500">Let&apos;s connect and change the world!</p>

            <section className="mt-4 rounded-lg border border-slate-200 p-3">
              <p className="text-lg font-semibold text-blue-600">Most Used Languages</p>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                <div className="flex h-full w-full">
                  {languageSegments.map((item) => (
                    <span
                      key={`segment-${item.name}`}
                      className="h-full"
                      style={{ width: `${item.numeric}%`, backgroundColor: item.color }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
                {leftLanguageList.map((item) => (
                  <p key={`left-${item.name}`} className="flex items-center gap-1.5 text-slate-700 text-[12px]">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name} {item.usage}
                  </p>
                ))}
                {rightLanguageList.map((item) => (
                  <p key={`right-${item.name}`} className="flex items-center gap-1.5 text-slate-700 text-[12px]">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name} {item.usage}
                  </p>
                ))}
              </div>
            </section>

            <section className="mt-4 rounded-lg border border-slate-200 p-3">
              <p className="text-lg font-semibold text-blue-600">Things I code with</p>
              <div className="mt-3 space-y-3">
                {stackRows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[84px_1fr] gap-2 text-xs">
                    <p className="font-medium text-slate-600">{row.label}</p>
                    <div className="group flex flex-wrap items-center">
                      {row.items.map((item) => (
                        <StackItem key={`${row.label}-${item.name}`} item={item} rowLabel={row.label} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </aside>

        <main className="space-y-4">
          <SectionCard title="Contributions">
            <div className="grid gap-2 md:grid-cols-3">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`skeleton-contribution-${i}`} />)
                : contributionCards.map((c) => {
                  const total = c.additions + c.deletions || 1
                  const addSquares = Math.round((c.additions / total) * 5)
                  const delSquares = 5 - addSquares
                  const date = new Date(c.updatedAt)
                  const dateStr = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
                  return (
                    <HoverAnimCard
                      key={`contribution-${c.repoFullName}-${c.number}`}
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col rounded-md border border-slate-200 bg-white"
                      hoverAnim={{ y: [0, -18, 2, -10, 0.5, -4, 0] }}
                      hoverTransition={{ duration: 0.72, times: [0, 0.22, 0.42, 0.6, 0.75, 0.87, 1], ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'] }}
                    >
                      <div className="flex flex-1 flex-col gap-1.5 p-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[11px] text-slate-400">{c.repoFullName}</p>
                          <Code2 size={13} className="mt-0.5 shrink-0 text-slate-400" />
                        </div>

                        <p className="text-sm font-semibold leading-snug text-slate-800">
                          #{c.number} {c.title}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" /></svg>
                            {c.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M1.5 2.75a.25.25 0 0 1 .25-.25h12.5a.25.25 0 0 1 .25.25v8.5a.25.25 0 0 1-.25.25h-6.5a.75.75 0 0 0-.53.22L4.5 14.19v-2.44a.75.75 0 0 0-.75-.75h-2a.25.25 0 0 1-.25-.25Zm.25-1.75C.784 1 0 1.784 0 2.75v8.5C0 12.216.784 13 1.75 13H3v1.543a1.458 1.458 0 0 0 2.487 1.03L7.81 13.5h6.44A1.75 1.75 0 0 0 16 11.75v-9A1.75 1.75 0 0 0 14.25 1Z" /></svg>
                            1 review
                          </span>
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z" /></svg>
                            {c.files}
                          </span>
                          <span className="flex items-center gap-1 font-medium">
                            <span className="text-emerald-600">+{c.additions}</span>
                            <span className="text-red-500">-{c.deletions}</span>
                            <span className="flex gap-px">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className="h-2.5 w-2.5 rounded-[2px]"
                                  style={{ backgroundColor: i < addSquares ? '#16a34a' : i < addSquares + delSquares ? '#dc2626' : '#e2e8f0' }}
                                />
                              ))}
                            </span>
                          </span>
                        </div>

                        <div className="mt-auto flex items-center gap-2 pt-2 text-[11px] text-slate-500">
                          <img
                            src={c.authorAvatar}
                            alt={c.authorLogin}
                            className="h-5 w-5 rounded-full border border-slate-200 object-cover"
                          />
                          <span className="font-medium text-slate-700">{c.authorLogin}</span>
                          <span>•</span>
                          <span>{dateStr}</span>
                          <span>•</span>
                          <span>{c.commits} commit{c.commits !== 1 ? 's' : ''}</span>
                        </div>
                      </div>

                      <div className="h-1 w-full rounded-b-md bg-gradient-to-r from-lime-400 via-yellow-400 via-orange-400 to-red-500" />
                    </HoverAnimCard>
                  )
                })}
            </div>
          </SectionCard>

          <SectionCard title="Commits">
            <div className="rounded-md border border-slate-200 bg-white p-3">
              <div className="mb-2 grid grid-cols-53 gap-1 text-xs text-slate-600">
                {monthMarkers.map((marker) => (
                  <span
                    key={`${marker.label}-${marker.colStart}`}
                    className="col-span-4"
                    style={{ gridColumnStart: marker.colStart }}
                  >
                    {marker.label}
                  </span>
                ))}
              </div>
              <div className="grid grid-flow-col grid-rows-7 gap-1">
                {commitDots.map((value, index) => {
                  const opacity = value === 0 ? 0.07 : Math.min(0.85, 0.22 + value * 0.12)
                  return (
                    <span
                      key={`dot-${index}`}
                      className="h-2.5 w-2.5 rounded-[2px] border border-emerald-100/60"
                      style={{ backgroundColor: `rgba(22,163,74,${opacity})` }}
                    />
                  )
                })}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                <span>Total Contributions: {commitDots.reduce((a, b) => a + b, 0)}</span>
                <span className="flex items-center gap-1.5">
                  Less
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-100" />
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-300" />
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-500" />
                  <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-700" />
                  More
                </span>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Repositories">
            <div className="relative overflow-hidden">
              {isLoading ? (
                <div className="grid gap-2 md:grid-cols-3">
                  {Array.from({ length: REPO_CARDS_PER_PAGE }).map((_, i) => (
                    <SkeletonCard key={`skeleton-repo-${i}`} />
                  ))}
                </div>
              ) : (
                <>
                  <AnimatePresence mode="wait" custom={slideDirection}>
                    <motion.div
                      key={repoSlideIndex}
                      custom={slideDirection}
                      variants={{
                        enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="grid gap-2 md:grid-cols-3"
                    >
                      {visibleRepos.map((repo) => (
                        <HoverAnimCard
                          key={repo.name}
                          href={repo.url}
                          target="_blank"
                          rel="noreferrer"
                          className="relative block rounded-md border border-slate-200 bg-white p-3"
                          hoverAnim={{ scaleX: [1, 1.12, 0.92, 1.04, 0.98, 1], scaleY: [1, 0.88, 1.08, 0.96, 1.02, 1] }}
                          hoverTransition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: 'easeInOut' }}
                        >
                          <img
                            src={repo.avatarUrl}
                            alt={repo.name}
                            className="absolute right-3 top-3 h-8 w-8 rounded-full border border-slate-200 object-cover"
                          />
                          <p className="text-sm font-semibold text-slate-800">{repo.name}</p>
                          <p className="mt-1 line-clamp-2 pr-10 text-xs text-slate-500">{repo.description}</p>
                          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                            <span>★ {repo.stars === 0 ? '' : repo.stars}</span>
                            <span>⑂ {repo.forks === 0 ? '' : repo.forks}</span>
                          </div>
                          <div className="mt-2 h-1.5 rounded bg-gradient-to-r from-blue-500 via-sky-500 via-orange-500 to-pink-500" />
                        </HoverAnimCard>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={handleRepoPrev}
                      disabled={repoSlideIndex === 0}
                      className="flex h-7 w-7 items-center cursor-pointer justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft size={14} />
                    </button>

                    <div className="flex gap-1.5">
                      {Array.from({ length: totalRepoPages }).map((_, i) => (
                        <button
                          key={`dot-${i}`}
                          onClick={() => {
                            setSlideDirection(i > repoSlideIndex ? 1 : -1)
                            setRepoSlideIndex(i)
                          }}
                          className={`h-1.5 rounded-full transition-all ${i === repoSlideIndex ? 'w-4 bg-blue-500' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                            }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleRepoNext}
                      disabled={repoSlideIndex >= totalRepoPages - 1}
                      className="flex h-7 w-7 items-center cursor-pointer justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Social">
            <div className="grid gap-2 md:grid-cols-3">
              {socialItems.map((item) => (
                <HoverAnimCard
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${item.color} rounded-md p-3 text-white`}
                  hoverAnim={{ scale: [1, 1.08, 0.95, 1.03, 0.98, 1], rotate: [0, -2, 2, -1, 1, 0] }}
                  hoverTransition={{ duration: 0.5, times: [0, 0.15, 0.35, 0.55, 0.75, 1], ease: 'easeInOut' }}
                >
                  <p className="flex items-center gap-1.5 text-sm font-semibold">
                    <item.icon size={14} />
                    {item.label}
                  </p>
                  <p className="text-xs opacity-90">{item.desc}</p>
                </HoverAnimCard>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Contact">
            <div className="grid gap-2 md:grid-cols-3">
              <HoverAnimCard
                href={profileData.email}
                className="rounded-md bg-sky-600 p-3 text-white"
                hoverAnim={{ y: [0, -18, 2, -10, 0.5, -4, 0] }}
                hoverTransition={{ duration: 0.72, times: [0, 0.22, 0.42, 0.6, 0.75, 0.87, 1], ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'] }}
              >
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  <Mail size={14} />
                  Email
                </p>
                <p className="text-xs opacity-90">isonnymichael@gmail.com</p>
              </HoverAnimCard>
              <HoverAnimCard
                href={profileData.telegram}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[#229ED9] p-3 text-white"
                hoverAnim={{ y: [0, -18, 2, -10, 0.5, -4, 0] }}
                hoverTransition={{ duration: 0.72, times: [0, 0.22, 0.42, 0.6, 0.75, 0.87, 1], ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'] }}
              >
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  <Send size={14} />
                  Telegram
                </p>
                <p className="text-xs opacity-90">t.me/isonnymichael</p>
              </HoverAnimCard>
              <HoverAnimCard
                href={profileData.discord}
                target="_blank"
                rel="noreferrer"
                className="rounded-md bg-[#5865F2] p-3 text-white"
                hoverAnim={{ y: [0, -18, 2, -10, 0.5, -4, 0] }}
                hoverTransition={{ duration: 0.72, times: [0, 0.22, 0.42, 0.6, 0.75, 0.87, 1], ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'] }}
              >
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  <MessageSquare size={14} />
                  Discord
                </p>
                <p className="text-xs opacity-90">discord.com/users/isonnymichael</p>
              </HoverAnimCard>
            </div>
          </SectionCard>
        </main>
      </div>

    </MotionMain>
  )
}

function SectionCard({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
        <p className="text-lg font-medium text-slate-800">{title}</p>
        <ExternalLink size={14} className="text-slate-400" />
      </div>
      {children}
    </section>
  )
}

export default App
