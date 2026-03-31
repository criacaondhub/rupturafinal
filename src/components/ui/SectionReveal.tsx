import { motion } from 'framer-motion'

interface SectionRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right'
}

export default function SectionReveal({ children, delay = 0, className = '', direction = 'up' }: SectionRevealProps) {
  const initial = {
    opacity: 0,
    y: direction === 'up' ? 40 : 0,
    x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
