import { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'

// Lazy: GSAP + InertiaPlugin só são baixados em desktop
const DotGrid = lazy(() => import('./components/ui/DotGrid'))
const Obrigado = lazy(() => import('./pages/Obrigado'))

import Hero from './components/sections/Hero'
import PorQue from './components/sections/PorQue'
import Mecanismo from './components/sections/Mecanismo'
import Sobre from './components/sections/Sobre'
import FAQ from './components/sections/FAQ'
import Rodape from './components/sections/Rodape'

function LandingPage() {
  const [isDesktop] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches
  )

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="relative bg-[#0A0A0A]">
      {/* DotGrid — só desktop; lazy import impede GSAP de ser baixado no mobile */}
      {isDesktop && (
        <Suspense fallback={null}>
          <div className="fixed inset-0 z-0 pointer-events-none">
            <DotGrid
              dotSize={4}
              gap={12}
              baseColor="#141414"
              activeColor="#551402"
              proximity={160}
              shockRadius={200}
              shockStrength={1}
              resistance={1250}
              returnDuration={1}
            />
          </div>
        </Suspense>
      )}

      {/* Conteúdo da página acima do grid */}
      <main className="relative z-10 text-white">
        <Hero />
        <div className="md:hidden h-px mx-10 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <PorQue />
        <div className="md:hidden h-px mx-10 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <Mecanismo />
        <div className="md:hidden h-px mx-10 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <Sobre />
        <div className="md:hidden h-px mx-10 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <FAQ />
        <div className="md:hidden h-px mx-10 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <Rodape />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/obrigado"
        element={
          <Suspense fallback={null}>
            <Obrigado />
          </Suspense>
        }
      />
    </Routes>
  )
}
