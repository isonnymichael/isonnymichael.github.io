import { ExternalLink } from 'lucide-react'
import { profileLinks } from '../data/config'

function SectionCard({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
        <p className="text-lg font-medium text-slate-800">{title}</p>
        {title !== 'Social' && title !== 'Contact' && (
          <a
            href={profileLinks.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-1 hover:bg-slate-100 transition-colors"
            title="View on GitHub"
          >
            <ExternalLink size={14} className="text-slate-400" />
          </a>
        )}
      </div>
      {children}
    </section>
  )
}

export default SectionCard
