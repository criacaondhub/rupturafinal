import { motion } from 'framer-motion'

interface CTAButtonProps {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  glow?: boolean
  disabled?: boolean
}

export default function CTAButton({ href, onClick, children, className = '', type = 'button', glow = false, disabled = false }: CTAButtonProps) {
  const base = [
    'inline-block bg-primary text-white font-body font-bold uppercase tracking-widest text-sm md:text-[0.73vw] px-8 py-4 md:px-[1.66vw] md:py-[0.83vw]',
    'rounded-none cursor-pointer select-none text-center',
    'cta-premium',
    glow ? 'cta-glow' : '',
    disabled ? 'opacity-70 cursor-not-allowed grayscale-[0.3]' : '',
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
    <motion.button type={type} onClick={onClick} className={`${base} ${className}`} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  )
}
