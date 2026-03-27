import { monthNames } from '../data/config'
import SectionCard from './SectionCard'

function CommitsSection({ commitDots }) {
  const monthMarkers = Array.from({ length: 13 }, (_, index) => {
    const day = new Date()
    day.setDate(day.getDate() - (364 - index * 28))
    return { label: monthNames[day.getMonth()], colStart: index * 4 + 1 }
  })

  return (
    <SectionCard title="Commits">
      <div className="overflow-x-auto no-scrollbar rounded-md border border-slate-200 bg-white p-3">
        <div className="min-w-[530px]">
          <div
            className="mb-2 grid gap-1 text-xs text-slate-600"
            style={{ gridTemplateColumns: 'repeat(53, minmax(0, 1fr))' }}
          >
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
      </div>
    </SectionCard>
  )
}

export default CommitsSection
