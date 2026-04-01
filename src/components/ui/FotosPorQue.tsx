import { useRef } from 'react'
import { motion, useScroll, useTransform, useAnimationFrame } from 'framer-motion'
import { useState } from 'react'

type Variant = 'stagger' | 'float' | 'parallax'

interface Props {
  variant: Variant
}

// ─── Variante 1: Entrada escalonada ───────────────────────────
function StaggerFotos() {
  return (
    <div className="relative w-full aspect-square">
      {/* Centro — entra primeiro, sobe */}
      <motion.img
        src="/assets/marcelo-pq-centro.webp"
        alt=""
        width="1080"
        height="941"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 w-full h-full object-contain"
      />
      {/* Esquerda — entra junto com direita, vem da esquerda */}
      <motion.img
        src="/assets/marcelo-pq-esquerda.webp"
        alt=""
        width="1080"
        height="941"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 w-full h-full object-contain"
      />
      {/* Direita — entra junto com esquerda, vem da direita */}
      <motion.img
        src="/assets/marcelo-pq-direita.webp"
        alt=""
        width="1080"
        height="941"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 w-full h-full object-contain"
      />
    </div>
  )
}

// ─── Variante 2: Float suave ───────────────────────────────────
function FloatImage({ src, delay, amplitude, speed }: { src: string; delay: number; amplitude: number; speed: number }) {
  const ref = useRef<HTMLImageElement>(null)
  const startTime = useRef(performance.now() + delay * 1000)

  useAnimationFrame(() => {
    if (!ref.current) return
    const t = (performance.now() - startTime.current) / 1000
    const y = Math.sin(t * speed) * amplitude
    const x = Math.cos(t * speed * 0.6) * (amplitude * 0.4)
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  })

  return (
    <motion.img
      ref={ref}
      src={src}
      alt=""
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute inset-0 w-full h-full object-contain will-change-transform"
    />
  )
}

function FloatFotos() {
  return (
    <div className="relative w-full aspect-square">
      <FloatImage src="/assets/marcelo-pq-centro.webp"   delay={0}    amplitude={6}  speed={0.6} />
      <FloatImage src="/assets/marcelo-pq-esquerda.webp" delay={0.35} amplitude={9}  speed={0.45} />
      <FloatImage src="/assets/marcelo-pq-direita.webp"  delay={0.35} amplitude={7}  speed={0.75} />
    </div>
  )
}

// ─── Variante 3: Parallax no scroll ───────────────────────────
function ParallaxFotos() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const yCentro    = useTransform(scrollYProgress, [0, 1], [40, -40])
  const yEsquerda  = useTransform(scrollYProgress, [0, 1], [80, -20])
  const yDireita   = useTransform(scrollYProgress, [0, 1], [20, -70])

  return (
    <div ref={ref} className="relative w-full aspect-square">
      <motion.img
        src="/assets/marcelo-pq-centro.webp"
        alt=""
        width="1080"
        height="941"
        style={{ y: yCentro }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 w-full h-full object-contain will-change-transform"
      />
      <motion.img
        src="/assets/marcelo-pq-esquerda.webp"
        alt=""
        width="1080"
        height="941"
        style={{ y: yEsquerda }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 w-full h-full object-contain will-change-transform"
      />
      <motion.img
        src="/assets/marcelo-pq-direita.webp"
        alt=""
        width="1080"
        height="941"
        style={{ y: yDireita }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 w-full h-full object-contain will-change-transform"
      />
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────
export default function FotosPorQue({ variant }: Props) {
  if (variant === 'float')    return <FloatFotos />
  if (variant === 'parallax') return <ParallaxFotos />
  return <StaggerFotos />
}
