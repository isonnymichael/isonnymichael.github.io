function RepoCard({ repo }) {
  return (
    <article className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-[0_12px_30px_-20px_rgba(30,41,59,0.35)] backdrop-blur">
      <h3 className="text-sm font-semibold text-slate-900">{repo.name}</h3>
      <p className="mt-2 text-xs leading-relaxed text-slate-600">{repo.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {repo.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-blue-200/70 bg-blue-50 px-2 py-1 text-[11px] text-blue-700"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>★ {repo.stars}</span>
        <span>⑂ {repo.forks}</span>
      </div>
      <a
        href={repo.url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
      >
        Open Repository
      </a>
    </article>
  )
}

export default RepoCard
