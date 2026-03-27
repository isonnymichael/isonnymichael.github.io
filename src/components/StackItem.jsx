import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function StackItem({ item }) {
  const [showTip, setShowTip] = useState(false)
  return (
    <div
      className="relative -ml-2 first:ml-0 transition-[margin] duration-200 ease-out group-hover:ml-1"
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
      style={{ zIndex: showTip ? 20 : 1 }}
    >
      <motion.img
        src={item.icon}
        alt={item.name}
        whileHover={{ scale: 1.3, y: -5 }}
        transition={{ type: 'spring', stiffness: 420, damping: 14 }}
        className="h-7 w-7 rounded-sm border-2 border-white bg-white p-0.5 shadow-sm"
        loading="lazy"
      />
      <AnimatePresence>
        {showTip && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.82 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.82 }}
            transition={{ duration: 0.14 }}
            className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-white shadow-lg"
          >
            {item.name}
            <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

export default StackItem
