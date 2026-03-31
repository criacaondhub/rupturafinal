import { heroVariants, HERO_VARIANT } from '../../config/hero'
import LeadForm from '../ui/LeadForm'
import SectionReveal from '../ui/SectionReveal'

const content = heroVariants[HERO_VARIANT]

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen overflow-hidden">

      {/* Background — foto full-width */}
      <img
        src="assets/marcelo-hero.webp"
        alt="Marcelo Toledo"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay esquerda: escurece a área do conteúdo para legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 via-40% to-transparent" />

      {/* Overlay base: garante contraste mínimo em telas menores */}
      <div className="absolute inset-0 bg-[#0A0A0A]/40 md:bg-transparent" />

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-16 md:px-[5vw] md:py-24 w-full md:w-[52%]">

        {/* Pill */}
        <SectionReveal delay={0.1}>
          <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 text-primary text-xs font-body font-semibold uppercase tracking-wider px-4 py-2 mb-8">
            <i className="fi fi-rr-calendar text-sm leading-none" />
            <span>07 de Maio</span>
            <span className="text-primary/40 mx-1">|</span>
            <i className="fi fi-rr-signal-stream text-sm leading-none" />
            <span>Ao Vivo, Online e Gratuito</span>
          </div>
        </SectionReveal>

        {/* Headline */}
        <SectionReveal delay={0.2}>
          <h1 className="font-title text-[8.5vw] md:text-[3.54vw] leading-[1.1] text-white mb-6 text-balance uppercase">
            {content.headline}
          </h1>
        </SectionReveal>

        {/* Subtítulo */}
        <SectionReveal delay={0.3}>
          <p className="font-body text-white/70 text-base md:text-[1vw] leading-relaxed mb-8">
            {content.subtitle.map((part, i) =>
              part.bold
                ? <strong key={i} className="text-white font-semibold">{part.text}</strong>
                : part.text
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
