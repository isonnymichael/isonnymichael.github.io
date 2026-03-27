import { Mail, Send, MessageSquare } from 'lucide-react'
import HoverAnimCard from './HoverAnimCard'
import SectionCard from './SectionCard'

const BOUNCE_ANIM = { y: [0, -18, 2, -10, 0.5, -4, 0] }
const BOUNCE_TRANSITION = {
  duration: 0.72,
  times: [0, 0.22, 0.42, 0.6, 0.75, 0.87, 1],
  ease: ['easeOut', 'easeIn', 'easeOut', 'easeIn', 'easeOut', 'easeIn'],
}

function ContactSection({ profileData }) {
  return (
    <SectionCard title="Contact">
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-3">
        <HoverAnimCard
          href={profileData.email}
          className="rounded-md bg-sky-600 p-3 text-white"
          hoverAnim={BOUNCE_ANIM}
          hoverTransition={BOUNCE_TRANSITION}
        >
          <p className="flex items-center gap-1.5 text-sm font-semibold">
            <Mail size={14} />
            Email
          </p>
          <p className="text-xs opacity-90">isonnymichael@gmail.com</p>
        </HoverAnimCard>

        <HoverAnimCard
          href={profileData.telegram}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-[#229ED9] p-3 text-white"
          hoverAnim={BOUNCE_ANIM}
          hoverTransition={BOUNCE_TRANSITION}
        >
          <p className="flex items-center gap-1.5 text-sm font-semibold">
            <Send size={14} />
            Telegram
          </p>
          <p className="text-xs opacity-90">t.me/isonnymichael</p>
        </HoverAnimCard>

        <HoverAnimCard
          href={profileData.discord}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-[#5865F2] p-3 text-white"
          hoverAnim={BOUNCE_ANIM}
          hoverTransition={BOUNCE_TRANSITION}
        >
          <p className="flex items-center gap-1.5 text-sm font-semibold">
            <MessageSquare size={14} />
            Discord
          </p>
          <p className="text-xs opacity-90">discord.com/users/isonnymichael</p>
        </HoverAnimCard>
      </div>
    </SectionCard>
  )
}

export default ContactSection
