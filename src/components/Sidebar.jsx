import { useState } from 'react'
import { ExternalLink, ChevronDown } from 'lucide-react'
import profilePicture from '../assets/images/profile-picture.jpg'
import { profileLinks, stackRows, languageColorMap } from '../data/config'
import StackItem from './StackItem'

function Sidebar({ profileData, languageItems }) {
  const [stackOpen, setStackOpen] = useState(false)

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
      <div className="px-4 pb-5 sm:px-5">
        <div className="-mt-14 flex justify-center">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-slate-200">
            <img src={profilePicture} alt={profileData.name} className="h-full w-full object-cover" />
          </div>
        </div>
        <h1 className="mt-3 text-center text-xl font-semibold text-slate-900 sm:text-2xl">
          {profileData.name}
        </h1>
        <p className="mt-1 text-center text-sm text-slate-500">Let&apos;s connect and change the world!</p>

        <a
          href={profileLinks.github}
          target="_blank"
          rel="noreferrer"
          className="mt-4 block rounded-lg border border-slate-200 p-3 hover:border-blue-400 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-blue-600 sm:text-lg">Most Used Languages</p>
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
          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5">
            {leftLanguageList.map((item) => (
              <p key={`left-${item.name}`} className="flex items-center gap-1.5 text-slate-700 text-[12px]">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name} {item.usage}
              </p>
            ))}
            {rightLanguageList.map((item) => (
              <p key={`right-${item.name}`} className="flex items-center gap-1.5 text-slate-700 text-[12px]">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name} {item.usage}
              </p>
            ))}
          </div>
        </a>

        <section className="mt-4 rounded-lg border border-slate-200">
          <button
            onClick={() => setStackOpen((o) => !o)}
            className="flex w-full items-center justify-between p-3 md:cursor-default"
          >
            <p className="text-base font-semibold text-blue-600 sm:text-lg">Things I code with</p>
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform duration-200 md:hidden ${stackOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <div className={`px-3 pb-3 ${stackOpen ? 'block' : 'hidden'} md:block`}>
            <div className="space-y-3">
              {stackRows.map((row) => (
                <div key={row.label} className="grid grid-cols-[72px_1fr] gap-2 text-xs sm:grid-cols-[84px_1fr]">
                  <p className="font-medium text-slate-600 pt-1">{row.label}</p>
                  <div className="group flex flex-wrap items-center gap-y-1">
                    {row.items.map((item) => (
                      <StackItem key={`${row.label}-${item.name}`} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </aside>
  )
}

export default Sidebar
