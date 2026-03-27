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

export default SkeletonCard
