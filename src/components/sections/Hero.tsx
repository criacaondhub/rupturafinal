import { useLocation } from 'react-router-dom'
import { heroVariants, HERO_VARIANT } from '../../config/hero'
import LeadForm from '../ui/LeadForm'
import SectionReveal from '../ui/SectionReveal'

export default function Hero() {
  const { pathname } = useLocation()
  const variant = pathname === '/v2' ? 2 : pathname === '/v3' ? 3 : pathname === '/v1' ? 1 : HERO_VARIANT
  const content = heroVariants[variant]
  return (
    <section id="hero" className="relative flex flex-col md:flex-row min-h-screen overflow-hidden">

      {/* Background desktop — absoluto, só aparece md+ */}
      <img
        src="/assets/marcelo-hero.webp"
        alt="Marcelo Toledo"
        fetchPriority="high"
        className="hidden md:block absolute inset-0 w-[100vw] h-[100vh] object-cover object-center"
      />

      {/* Imagem mobile — topo, largura total */}
      <img
        src="/assets/marcelo-hero-mobile.webp"
        alt="Marcelo Toledo"
        fetchPriority="high"
        width="1080"
        height="989"
        className="block md:hidden w-full"
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-12 md:px-[5vw] md:py-[5vw] w-full md:w-[48%] min-h-screen">

        {/* Pill */}
        <SectionReveal delay={0.1}>
          <div className="hidden md:flex justify-start mb-[2.08vw]">
            <img src="/assets/logo-ruptura.svg" alt="Ruptura Final" width="750" height="422" className="h-[3.33vw] w-auto" />
          </div>
        </SectionReveal>

        {/* Headline */}
        <SectionReveal>
          <h1 className="font-title text-[32px] md:text-[3.54vw] leading-[1.1] text-white mb-[1.25vw] text-balance uppercase text-center md:text-left">
            {content.headline.map((part, i) =>
              part.primary
                ? <span key={i} className="text-primary">{part.text}</span>
                : <span key={i}>{part.text}</span>
            )}
          </h1>
        </SectionReveal>

        {/* Subtítulo */}
        <SectionReveal delay={0.3} className={`${variant === 2 || variant === 3 ? 'max-w-[84%]' : 'max-w-[88%]'} md:max-w-none mx-auto md:mx-0`}>
          <p className={`font-body text-white/70 text-base md:text-[1vw] leading-snug md:leading-relaxed tracking-tight md:tracking-normal mb-[2.08vw] text-center md:text-left ${variant === 2 ? 'md:max-w-[30vw]' : variant === 3 ? 'md:max-w-[32vw]' : ''}`}>
            {(content.subtitleMobile
              ? content.subtitleMobile.map((part, i) =>
                  part.bold
                    ? <strong key={i} className="text-white font-semibold md:hidden">{part.text}</strong>
                    : <span key={i} className="md:hidden">{part.text}</span>
                )
              : null
            )}
            {content.subtitle.map((part, i) =>
              part.bold
                ? <strong key={`d${i}`} className={content.subtitleMobile ? 'hidden md:inline' : ''}>{part.text}</strong>
                : <span key={`d${i}`} className={content.subtitleMobile ? 'hidden md:inline' : ''}>{part.text}</span>
            )}
          </p>
        </SectionReveal>

        {/* Formulário */}
        <SectionReveal delay={0.4}>
          <LeadForm />
        </SectionReveal>

      </div>
    </section>
  )
}
