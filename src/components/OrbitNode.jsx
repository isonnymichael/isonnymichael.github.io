import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function OrbitNode({ title, subtitle, details, x, y, glow = 'blue' }) {
  const MotionDiv = motion.div
  const MotionButton = motion.button
  const glowMap = useMemo(
    () => ({
      blue: 'rgba(59,130,246,0.35)',
      purple: 'rgba(168,85,247,0.35)',
      green: 'rgba(16,185,129,0.35)',
    }),
    [],
  )
  const [isHovered, setIsHovered] = useState(false)
  const MotionUl = motion.ul

  return (
    <MotionDiv
      className="absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <MotionButton
        type="button"
        className="group relative rounded-3xl border border-white/70 bg-white/85 px-5 py-4 text-left shadow-[0_15px_40px_-28px_rgba(15,23,42,0.42)] backdrop-blur-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.07, y: -5 }}
        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
      >
        <MotionDiv
          className="pointer-events-none absolute -inset-px rounded-3xl"
          animate={{ opacity: isHovered ? 0.95 : 0.5 }}
          transition={{ duration: 0.25 }}
          style={{ boxShadow: `0 0 45px -15px ${glowMap[glow]}` }}
        />
        <MotionDiv
          className="absolute -left-8 top-1/2 h-px w-7 -translate-y-1/2 bg-slate-300/70"
          animate={{ opacity: isHovered ? 1 : 0.65 }}
        />
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      </MotionButton>

      <AnimatePresence>
        {isHovered && (
          <MotionUl
            className="absolute left-1/2 top-[calc(100%+0.85rem)] w-72 -translate-x-1/2 rounded-2xl border border-white/70 bg-white/92 p-4 text-left shadow-[0_24px_50px_-30px_rgba(15,23,42,0.48)] backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {details.map((item) => (
              <li
                key={`${title}-${item}`}
                className="mt-1 text-xs leading-relaxed text-slate-600 first:mt-0"
              >
                {item}
              </li>
            ))}
          </MotionUl>
        )}
      </AnimatePresence>
    </MotionDiv>
  )
}

export default OrbitNode
