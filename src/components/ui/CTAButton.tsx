import { motion } from 'framer-motion'

interface CTAButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  glow?: boolean
}

export default function CTAButton({ href, onClick, children, className = '', type = 'button', glow = false }: CTAButtonProps) {
  const base = [
    'inline-block bg-primary text-white font-body font-bold uppercase tracking-widest text-sm px-8 py-4',
    'rounded-none cursor-pointer select-none text-center',
    'cta-premium',
    glow ? 'cta-glow' : '',
  ].filter(Boolean).join(' ')

  const motionProps = {
    whileHover: {
      scale: 1.015,
      backgroundColor: '#e03d0e',
    },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.18 },
  }

  if (href) {
    return (
      <motion.a href={href} className={`${base} ${className}`} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} onClick={onClick} className={`${base} ${className}`} {...motionProps}>
      {children}
    </motion.button>
  )
}
