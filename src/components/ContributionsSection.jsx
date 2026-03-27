import { Code2 } from 'lucide-react'
import { monthNames } from '../data/config'
import HoverAnimCard from './HoverAnimCard'
import SkeletonCard from './SkeletonCard'
import SectionCard from './SectionCard'

const BOUNCE_ANIM = { y: [0, -18, 2, -10, 0.5, -4, 0] }
const BOUNCE_TRANSITION = {
  duration: 0.72,
  times: [0, 0.22, 0.42, 0.6, 0.75, 0.87, 1],
  ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'],
}

function ContributionCard({ c }) {
  const total = c.additions + c.deletions || 1
  const addSquares = Math.round((c.additions / total) * 5)
  const delSquares = 5 - addSquares
  const date = new Date(c.updatedAt)
  const dateStr = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`

  return (
    <HoverAnimCard
      href={c.url}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col rounded-md border border-slate-200 bg-white"
      hoverAnim={BOUNCE_ANIM}
      hoverTransition={BOUNCE_TRANSITION}
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
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
            </svg>
            {c.comments}
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.5 2.75a.25.25 0 0 1 .25-.25h12.5a.25.25 0 0 1 .25.25v8.5a.25.25 0 0 1-.25.25h-6.5a.75.75 0 0 0-.53.22L4.5 14.19v-2.44a.75.75 0 0 0-.75-.75h-2a.25.25 0 0 1-.25-.25Zm.25-1.75C.784 1 0 1.784 0 2.75v8.5C0 12.216.784 13 1.75 13H3v1.543a1.458 1.458 0 0 0 2.487 1.03L7.81 13.5h6.44A1.75 1.75 0 0 0 16 11.75v-9A1.75 1.75 0 0 0 14.25 1Z" />
            </svg>
            1 review
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z" />
            </svg>
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
                  style={{
                    backgroundColor:
                      i < addSquares ? '#16a34a' : i < addSquares + delSquares ? '#dc2626' : '#e2e8f0',
                  }}
                />
              ))}
            </span>
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 text-[11px] text-slate-500">
          <img
            src={c.authorAvatar}
            alt={c.authorLogin}
            className="h-5 w-5 rounded-full border border-slate-200 object-cover"
          />
          <span className="font-medium text-slate-700">{c.authorLogin}</span>
          <span>•</span>
          <span>{dateStr}</span>
          <span>•</span>
          <span>
            {c.commits} commit{c.commits !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="h-1 w-full rounded-b-md bg-gradient-to-r from-lime-400 via-yellow-400 via-orange-400 to-red-500" />
    </HoverAnimCard>
  )
}

function ContributionsSection({ contributionCards, isLoading }) {
  return (
    <SectionCard title="Contributions">
      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={`skeleton-contribution-${i}`} />)
          : contributionCards.map((c) => (
              <ContributionCard key={`contribution-${c.repoFullName}-${c.number}`} c={c} />
            ))}
      </div>
    </SectionCard>
  )
}

export default ContributionsSection
