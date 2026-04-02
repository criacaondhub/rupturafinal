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
    <section className="relative bg-transparent overflow-hidden">

      {/* Imagem background — só desktop */}
      <img
        src="/assets/mecanismo-img.webp"
        alt=""
        className="hidden md:block absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Imagem mobile — topo, largura total */}
      <img
        src="/assets/mecanismo-img-mobile.webp"
        alt=""
        width="900"
        height="633"
        className="block md:hidden w-full"
      />

      {/* Conteúdo — lado esquerdo */}
      <div className="relative z-10 -mt-[80px] md:mt-0 py-14 md:py-[6.66vw] pl-6 md:pl-[6vw] pr-6 w-full md:max-w-[42%]">

        <SectionReveal direction="left">
          <h2 className="font-title text-[8.5vw] md:text-[3.54vw] leading-[1.1] mb-4 text-balance uppercase text-center md:text-left">
            Na <span className="text-primary">Ruptura Final</span> você entende o mecanismo e como ajustar as
            engrenagens.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1} direction="left">
          <p className="font-body text-white/60 text-base md:text-[1vw] mb-10 text-center md:text-left">
            Uma imersão online que vai pôr em "xeque" quem você almeja ser:
          </p>
        </SectionReveal>

        <div className="flex flex-col gap-4 mb-8">
          {boxes.map((box, i) => (
            <SectionReveal key={i} delay={0.15 + i * 0.1} direction="left">
              <div className="flex items-start gap-4 bg-background/60 border border-border p-5">
                <i className={`${box.icon} text-primary text-xl leading-none mt-1 flex-shrink-0`} />
                <p className="font-body text-white/75 text-sm md:text-[0.85vw] leading-relaxed">{box.text}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.5} direction="left">
          <div className="bg-primary/10 border border-primary/30 p-5 mb-10 backdrop-blur-md">
            <p className="font-body text-white/80 text-base md:text-[0.85vw] leading-snug md:leading-relaxed italic text-center md:text-left">
              "A disciplina, a resiliência, o confronto e o desconforto tem o poder de mudar sua vida, seus resultados
              e todas as áreas da sua vida."
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.6} direction="left">
          <CTAButton href="#hero" className="w-full md:w-auto">Garantir minha vaga<br className="md:hidden" /> na imersão</CTAButton>
        </SectionReveal>

      </div>
    </section>
  )
}
