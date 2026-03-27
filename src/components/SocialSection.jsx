import { socialItems } from '../data/config'
import HoverAnimCard from './HoverAnimCard'
import SectionCard from './SectionCard'

const WOBBLE_ANIM = { scale: [1, 1.08, 0.95, 1.03, 0.98, 1], rotate: [0, -2, 2, -1, 1, 0] }
const WOBBLE_TRANSITION = {
  duration: 0.5,
  times: [0, 0.15, 0.35, 0.55, 0.75, 1],
  ease: 'easeInOut',
}

function SocialSection() {
  return (
    <SectionCard title="Social">
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-3">
        {socialItems.map((item) => (
          <HoverAnimCard
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className={`${item.color} rounded-md p-3 text-white`}
            hoverAnim={WOBBLE_ANIM}
            hoverTransition={WOBBLE_TRANSITION}
          >
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <span className="w-[24px] h-[24px] flex items-center justify-center">{item.icon}</span>
              {item.label}
            </p>
            <p className="text-xs opacity-90">{item.desc}</p>
          </HoverAnimCard>
        ))}
      </div>
    </SectionCard>
  )
}

export default SocialSection
