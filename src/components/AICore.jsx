import { motion } from 'framer-motion'

function AICore({ name, title, offsetX, offsetY }) {
  const MotionDiv = motion.div

  return (
    <MotionDiv
      className="relative z-20 w-[min(88vw,26rem)] rounded-[2rem] border border-white/60 bg-white/70 p-8 text-center shadow-[0_20px_55px_-35px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      animate={{ x: offsetX * 16, y: offsetY * 16 }}
      transition={{ type: 'spring', stiffness: 60, damping: 18 }}
    >
      <MotionDiv
        className="pointer-events-none absolute -inset-px rounded-[2rem]"
        style={{
          background:
            'linear-gradient(130deg, rgba(59,130,246,0.28), rgba(168,85,247,0.22), rgba(34,197,94,0.2))',
          filter: 'blur(16px)',
          zIndex: -1,
        }}
        animate={{ opacity: [0.4, 0.65, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="mx-auto mb-6 h-24 w-24 rounded-full border border-white/70 bg-white/80 p-1 shadow-[0_8px_32px_-18px_rgba(0,0,0,0.45)]">
        <MotionDiv
          className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-300/70 via-purple-300/70 to-emerald-300/70 text-base font-semibold text-slate-700"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          AI
        </MotionDiv>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{name}</h1>
      <p className="mt-3 text-sm text-slate-600 md:text-base">{title}</p>
    </MotionDiv>
  )
}

export default AICore
