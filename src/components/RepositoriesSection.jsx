import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import HoverAnimCard from './HoverAnimCard'
import SkeletonCard from './SkeletonCard'
import SectionCard from './SectionCard'

const REPO_CARDS_PER_PAGE = 3

const JELLY_ANIM = {
  scaleX: [1, 1.12, 0.92, 1.04, 0.98, 1],
  scaleY: [1, 0.88, 1.08, 0.96, 1.02, 1],
}
const JELLY_TRANSITION = { duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: 'easeInOut' }

function RepositoriesSection({ repoCards, isLoading }) {
  const [repoSlideIndex, setRepoSlideIndex] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)

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

  return (
    <SectionCard title="Repositories">
      <div className="relative overflow-hidden">
        {isLoading ? (
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
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
                className="grid gap-2 sm:grid-cols-2 md:grid-cols-3"
              >
                {visibleRepos.map((repo) => (
                  <HoverAnimCard
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="relative block rounded-md border border-slate-200 bg-white p-3"
                    hoverAnim={JELLY_ANIM}
                    hoverTransition={JELLY_TRANSITION}
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
                    className={`h-1.5 rounded-full transition-all ${
                      i === repoSlideIndex ? 'w-4 bg-blue-500' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
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
  )
}

export default RepositoriesSection
