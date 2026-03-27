import { motion, useAnimation } from 'framer-motion'

const RESET_STATE = { y: 0, scaleX: 1, scaleY: 1, scale: 1, rotate: 0 }
const RESET_TRANSITION = { duration: 0.22, ease: 'easeOut' }

function HoverAnimCard({ tag = 'a', hoverAnim, hoverTransition, className, children, ...props }) {
  const controls = useAnimation()
  const MotionTag = motion[tag]
  return (
    <MotionTag
      animate={controls}
      initial={RESET_STATE}
      onHoverStart={() => controls.start({ ...hoverAnim, transition: hoverTransition })}
      onHoverEnd={() => {
        controls.stop()
        controls.start({ ...RESET_STATE, transition: RESET_TRANSITION })
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

export default HoverAnimCard
