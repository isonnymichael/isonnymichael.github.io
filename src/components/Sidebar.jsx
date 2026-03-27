import { ExternalLink } from 'lucide-react'
import profilePicture from '../assets/images/profile-picture.jpg'
import { profileLinks, stackRows, languageColorMap } from '../data/config'
import StackItem from './StackItem'

function Sidebar({ profileData, languageItems }) {
  const languageSegments = languageItems.map((item) => ({
    ...item,
    numeric: Number.parseFloat(item.usage),
    color: languageColorMap[item.name] || '#94a3b8',
  }))

  const leftLanguageList = languageSegments.filter((_, index) => index % 2 === 0)
  const rightLanguageList = languageSegments.filter((_, index) => index % 2 === 1)

  return (
    <aside className="rounded-xl border border-slate-200 bg-white shadow-[0_12px_40px_-30px_rgba(15,23,42,0.32)]">
      <div className="h-24 rounded-t-xl bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900" />
      <div className="px-5 pb-5">
        <div className="-mt-14 flex justify-center">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-200">
            <img src={profilePicture} alt={profileData.name} className="h-full w-full object-cover" />
          </div>
        </div>
        <h1 className="mt-3 text-center text-2xl font-semibold text-slate-900">{profileData.name}</h1>
        <p className="mt-1 text-center text-sm text-slate-500">Let&apos;s connect and change the world!</p>

        <a
          href={profileLinks.github}
          target="_blank"
          rel="noreferrer"
          className="mt-4 block rounded-lg border border-slate-200 p-3 hover:border-blue-400 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-blue-600">Most Used Languages</p>
            <ExternalLink size={14} className="text-blue-400 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
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
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name} {item.usage}
              </p>
            ))}
            {rightLanguageList.map((item) => (
              <p key={`right-${item.name}`} className="flex items-center gap-1.5 text-slate-700 text-[12px]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name} {item.usage}
              </p>
            ))}
          </div>
        </a>

        <section className="mt-4 rounded-lg border border-slate-200 p-3">
          <p className="text-lg font-semibold text-blue-600">Things I code with</p>
          <div className="mt-3 space-y-3">
            {stackRows.map((row) => (
              <div key={row.label} className="grid grid-cols-[84px_1fr] gap-2 text-xs">
                <p className="font-medium text-slate-600">{row.label}</p>
                <div className="group flex flex-wrap items-center">
                  {row.items.map((item) => (
                    <StackItem key={`${row.label}-${item.name}`} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  )
}

export default Sidebar
