import CTAButton from '../ui/CTAButton'
import SectionReveal from '../ui/SectionReveal'

const boxes = [
  {
    icon: 'fi fi-rr-chart-line-up',
    text: (
      <>
        Entenda a diferença crucial entre{' '}
        <strong className="text-white">buscar um resultado e cultivar um padrão</strong>, e por que somente o segundo
        está sob seu controle efetivo;
      </>
    ),
  },
  {
    icon: 'fi fi-rr-user-pen',
    text: (
      <>
        A chave para a mudança: por que tentar mudar o comportamento é{' '}
        <strong className="text-white">ineficaz sem antes transformar</strong> a sua auto imagem (quem você acredita
        ser);
      </>
    ),
  },
  {
    icon: 'fi fi-rr-snowflake',
    text: (
      <>
        Os aprendizados sobre constância revelados por{' '}
        <strong className="text-white">500 dias ininterruptos</strong> de desconforto intencional.
      </>
    ),
  },
]

export default function Mecanismo() {
  return (
    <section
      className="relative bg-transparent py-20 md:py-32 px-6 overflow-hidden"
      // Imagem de background será inserida posteriormente
      // style={{ backgroundImage: 'url(assets/mecanismo-bg.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay sutil para legibilidade quando o bg for inserido */}
      <div className="absolute inset-0 bg-transparent pointer-events-none" />

      <div className="relative z-10 max-w-xl md:ml-auto md:mr-[8vw]">

        {/* Título */}
        <SectionReveal direction="right">
          <h2 className="font-title text-[8.5vw] md:text-[3.54vw] leading-[1.1] mb-4 text-balance uppercase">
            Na <span className="text-primary">Ruptura Final</span> você entende o mecanismo e como ajustar as
            engrenagens.
          </h2>
        </SectionReveal>

        {/* Subtítulo */}
        <SectionReveal delay={0.1} direction="right">
          <p className="font-body text-white/60 text-base md:text-[1vw] mb-10">
            Uma imersão online que vai pôr em "xeque" quem você almeja ser:
          </p>
        </SectionReveal>

        {/* Boxes */}
        <div className="flex flex-col gap-4 mb-8">
          {boxes.map((box, i) => (
            <SectionReveal key={i} delay={0.15 + i * 0.1} direction="right">
              <div className="flex items-start gap-4 bg-background/60 border border-border p-5">
                <i className={`${box.icon} text-primary text-xl leading-none mt-1 flex-shrink-0`} />
                <p className="font-body text-white/75 text-sm md:text-[0.85vw] leading-relaxed">{box.text}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Disclaimer */}
        <SectionReveal delay={0.5} direction="right">
          <div className="bg-primary/10 border border-primary/30 p-5 mb-10">
            <p className="font-body text-white/80 text-sm md:text-[0.85vw] leading-relaxed italic">
              "A disciplina, a resiliência, o confronto e o desconforto tem o poder de mudar sua vida, seus resultados
              e todas as áreas da sua vida."
            </p>
          </div>
        </SectionReveal>

        {/* CTA */}
        <SectionReveal delay={0.6} direction="right">
          <CTAButton href="#hero">Garantir minha vaga na imersão</CTAButton>
        </SectionReveal>

      </div>
    </section>
  )
}
