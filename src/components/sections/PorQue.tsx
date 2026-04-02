import SectionReveal from '../ui/SectionReveal'
import FotosPorQue from '../ui/FotosPorQue'

export default function PorQue() {
  return (
    <section className="bg-transparent py-14 md:py-32 px-6">
      <div className="max-w-full md:max-w-[80vw] mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-16">

        {/* Fotos — lado esquerdo */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <FotosPorQue variant="stagger" />
        </div>

        {/* Conteúdo — lado direito */}
        <div className="flex-1 text-center md:text-left">

          <SectionReveal direction="right">
            <h2 className="font-title text-[8.5vw] md:text-[3.54vw] leading-[1.1] mb-10 text-balance uppercase">
              +30 milhões de{' '}
              <span className="text-primary">pessoas impactadas</span>{' '}
              mensalmente com reflexões para repensar sua forma de viver:{' '}
              <span className="text-primary">Chegou a hora da sua Ruptura Final!</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2} direction="right">
            <div className="font-body text-base md:text-[1vw] leading-relaxed space-y-6">
              <blockquote className="mx-auto md:mx-0 border-l-2 border-primary pl-6 text-white font-medium text-left italic">
                <p>
                  <strong>"Motivação não sustenta mudança.</strong> Cada decisão adiada tem um{' '}
                  <strong>custo muito alto</strong> e seus comportamentos mostram o{' '}
                  <strong>porquê você ainda não é quem você quer ser!"</strong>
                </p>
              </blockquote>

              <p className="text-white/70">
                Nesta imersão eu vou te mostrar como encontrar o{' '}<br className="hidden md:block" />seu caminho e despertar sua{' '}
                <strong className="text-white">melhor versão</strong>.
              </p>
            </div>
          </SectionReveal>

        </div>
      </div>
    </section>
  )
}
