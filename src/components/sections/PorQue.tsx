import SectionReveal from '../ui/SectionReveal'

export default function PorQue() {
  return (
    <section className="bg-transparent py-20 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">

        {/* Título */}
        <SectionReveal>
          <h2 className="font-title text-[8.5vw] md:text-[3.54vw] leading-[1.1] mb-10 text-balance uppercase">
            +30 milhões de{' '}
            <span className="text-primary">pessoas impactadas</span>{' '}
            mensalmente com reflexões para repensar sua forma de viver:{' '}
            <span className="text-primary">Chegou a hora da sua Ruptura Final!</span>
          </h2>
        </SectionReveal>

        {/* Separador */}
        <SectionReveal delay={0.1}>
          <div className="w-12 h-[2px] bg-primary mx-auto mb-10" />
        </SectionReveal>

        {/* Corpo */}
        <SectionReveal delay={0.2}>
          <div className="font-body text-white/70 text-base md:text-[1vw] leading-relaxed space-y-6 text-justify">
            <p>
              Depois de mergulhar no gelo por mais de 550 dias, eu validei algo que muitas pessoas levam anos para entender:
            </p>

            <blockquote className="border-l-2 border-primary pl-6 text-white font-medium text-left">
              <p>
                <strong>"Motivação não sustenta mudança.</strong> Cada decisão adiada tem um{' '}
                <strong>custo muito alto</strong> e seus comportamentos mostram o{' '}
                <strong>porquê você ainda não é quem você quer ser!"</strong>
              </p>
            </blockquote>

            <p>
              Só que a banheira de gelo foi o MEU CAMINHO. Para encontrar o seu você precisa romper com as amarras
              invisíveis que ainda te prendem na vida mediana.
            </p>

            <p>
              E nesse encontro, eu quero te mostrar como encontrar o seu caminho e despertar a{' '}
              <strong className="text-white">melhor versão</strong> que existe dentro de você. Sem motivação barata e
              sem atalhos que não te levam a lugar nenhum.
            </p>
          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
