import { motion, AnimatePresence } from 'framer-motion'
import RepoCard from './RepoCard'

function Heatmap({ cells }) {
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {cells.flat().map((value, index) => (
        <div
          key={`cell-${index}`}
          className="h-4 w-4 rounded-sm"
          style={{
            backgroundColor:
              value === 0
                ? 'rgba(148, 163, 184, 0.2)'
                : `rgba(16, 185, 129, ${0.22 + value * 0.16})`,
          }}
        />
      ))}
    </div>
  )
}

function ModulePanel({ openModule, onClose, data }) {
  const isOpen = Boolean(openModule)
  const MotionDiv = motion.div
  const MotionSection = motion.section

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDiv
          className="fixed inset-0 z-30 flex items-center justify-center bg-slate-900/15 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <MotionSection
            className="relative max-h-[88vh] w-full max-w-4xl overflow-auto rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_30px_90px_-45px_rgba(30,41,59,0.5)] backdrop-blur-2xl md:p-8"
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-500 transition hover:text-slate-800"
              onClick={onClose}
            >
              Close
            </button>

            {openModule === 'github' && (
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">GitHub Stats</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <StatCard label="Commits" value={data.githubStats.commits} />
                  <StatCard label="Contributions" value={data.githubStats.contributions} />
                  <StatCard label="Commit Streak" value={`${data.githubStats.commitStreak} days`} />
                  <StatCard label="PRs Merged" value={data.githubStats.prsMerged} />
                </div>
                <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                    Contribution Heatmap
                  </p>
                  <div className="mt-3">
                    <Heatmap cells={data.githubStats.contributionHeatmap} />
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm font-medium text-slate-800">Most Used Languages</p>
                  <div className="mt-3 space-y-3">
                    {data.githubStats.languages.map((language) => (
                      <div key={language.name}>
                        <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
                          <span>{language.name}</span>
                          <span>{language.percent}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400"
                            style={{ width: `${language.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {openModule === 'repos' && (
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Repositories</h2>
                <p className="mt-2 text-sm text-slate-600">Featured projects and experiments.</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {data.repositories.map((repo) => (
                    <RepoCard key={repo.name} repo={repo} />
                  ))}
                </div>
              </div>
            )}

            {openModule === 'stack' && (
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Tech Stack</h2>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {Object.entries(data.techStack).map(([category, items]) => (
                    <div
                      key={category}
                      className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-[0_10px_30px_-22px_rgba(15,23,42,0.45)]"
                    >
                      <p className="text-sm font-semibold text-slate-800">{category}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {items.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs text-purple-700 transition hover:border-purple-300 hover:shadow-[0_0_20px_-10px_rgba(168,85,247,0.8)]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {openModule === 'social' && (
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Social / Identity</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <SocialLink href={data.profile.github} label="GitHub" primary />
                  <SocialLink href={data.profile.linkedIn} label="LinkedIn" />
                  <SocialLink href={data.profile.email} label="Email" />
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    Wallet
                    <p className="mt-1 font-mono text-xs text-slate-500">{data.profile.wallet}</p>
                  </div>
                </div>
              </div>
            )}

            {openModule === 'assistant' && (
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">AI Assistant</h2>
                <div className="mt-5 rounded-2xl border border-slate-200 bg-white/90 p-4">
                  <div className="space-y-3">
                    {data.assistantMessages.map((message, index) => (
                      <div
                        key={`${message.role}-${index}`}
                        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                          message.role === 'user'
                            ? 'ml-auto bg-blue-500 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {message.content}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    Type prompt...
                  </div>
                </div>
              </div>
            )}
          </MotionSection>
        </MotionDiv>
      )}
    </AnimatePresence>
  )
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/75 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
    </div>
  )
}

function SocialLink({ href, label, primary = false }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
      className={`rounded-2xl border p-4 text-sm transition ${
        primary
          ? 'border-blue-300 bg-blue-50 text-blue-700 hover:shadow-[0_0_30px_-14px_rgba(59,130,246,0.9)]'
          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
      }`}
    >
      {label}
    </a>
  )
}

export default ModulePanel
