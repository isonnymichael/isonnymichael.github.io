import { useEffect, useState } from 'react'
import { profileLinks } from '../data/config'

export function useGitHubData() {
  const [profileData, setProfileData] = useState({
    name: 'Sonny Michael Wijaya',
    ...profileLinks,
  })
  const [languageItems, setLanguageItems] = useState([])
  const [repoCards, setRepoCards] = useState([])
  const [contributionCards, setContributionCards] = useState([])
  const [commitDots, setCommitDots] = useState(Array.from({ length: 371 }, () => 0))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadGitHubData = async () => {
      setIsLoading(true)
      try {
        const [userRes, reposRes, languagesRes, contributionsRes, prsRes] =
          await Promise.allSettled([
            fetch('/github-user.json'),
            fetch('/github-repos.json'),
            fetch('/github-languages.json'),
            fetch('/github-contributions.json'),
            fetch('/github-prs.json'),
          ])

        const ok = (result) => result.status === 'fulfilled' && result.value.ok

        const user = ok(userRes) ? await userRes.value.json() : null
        if (user) {
          setProfileData({ name: user.name || 'Sonny Michael Wijaya', ...profileLinks })
        }

        const repos = ok(reposRes) ? await reposRes.value.json() : []
        setRepoCards(repos)

        const languageTotals = ok(languagesRes) ? await languagesRes.value.json() : {}
        const totalBytes = Object.values(languageTotals).reduce((sum, val) => sum + val, 0)
        const mappedLanguages = Object.entries(languageTotals)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, bytes]) => ({
            name,
            usage: totalBytes > 0 ? `${((bytes / totalBytes) * 100).toFixed(1)}%` : '0%',
          }))
        setLanguageItems(mappedLanguages)

        const dots = ok(contributionsRes) ? await contributionsRes.value.json() : []
        if (dots.length > 0) {
          setCommitDots(dots.slice(-371))
        }

        const prs = ok(prsRes) ? await prsRes.value.json() : []
        setContributionCards(prs)
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

  return { profileData, languageItems, repoCards, contributionCards, commitDots, isLoading }
}
