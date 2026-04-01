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


      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-10 md:px-[5vw] md:py-24 w-full md:w-[48%]">

        {/* Pill */}
        <SectionReveal delay={0.1}>
          <div className="flex justify-center md:inline-flex md:justify-start flex-col items-center gap-1 md:flex-row md:gap-2 border border-primary/40 bg-primary/10 text-primary text-xs font-body font-semibold uppercase tracking-wider px-4 py-2 mb-8">
            <span className="flex items-center gap-2">
              <i className="fi fi-rr-calendar text-sm leading-none" />
              <span>07 de Maio</span>
            </span>
            <span className="hidden md:inline text-primary/40 mx-1">|</span>
            <span className="flex items-center gap-2">
              <i className="fi fi-rr-signal-stream text-sm leading-none" />
              <span>Ao Vivo, Online e Gratuito</span>
            </span>
          </div>
        </SectionReveal>

        {/* Headline */}
        <SectionReveal delay={0.2}>
          <h1 className="font-title text-[8.5vw] md:text-[3.54vw] leading-[1.1] text-white mb-6 text-balance uppercase text-center md:text-left">
            {content.headline}
          </h1>
        </SectionReveal>

        {/* Subtítulo */}
        <SectionReveal delay={0.3} className="max-w-[88%] md:max-w-none mx-auto md:mx-0">
          <p className="font-body text-white/70 text-base md:text-[1vw] leading-snug md:leading-relaxed tracking-tight md:tracking-normal mb-8 text-center md:text-left">
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
