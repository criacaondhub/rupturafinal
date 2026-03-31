import CTAButton from '../ui/CTAButton'
import SectionReveal from '../ui/SectionReveal'

export default function Sobre() {
  return (
    <section className="bg-transparent py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">

        {/* Foto — lado esquerdo (placeholder até o asset chegar) */}
        <SectionReveal direction="left" className="w-full md:w-[38%] flex-shrink-0">
          <div className="relative aspect-[3/4] bg-surface border border-border overflow-hidden">
            <img
              src="assets/marcelo-secondary.webp"
              alt="Marcelo Toledo"
              className="absolute inset-0 w-full h-full object-cover object-top"
              onError={(e) => {
                // placeholder enquanto o asset não chega
                ;(e.target as HTMLImageElement).style.display = 'none'
              }}
            />
            {/* Placeholder visual */}
            <div className="absolute inset-0 flex items-end p-6">
              <span className="font-body text-white/20 text-xs uppercase tracking-widest">
                Foto — a inserir
              </span>
            </div>
          </div>
        </SectionReveal>

        {/* Conteúdo — lado direito */}
        <div className="flex flex-col gap-6 md:gap-8 text-left">

          {/* Subtítulo */}
          <SectionReveal delay={0.1} direction="right">
            <p className="font-body text-primary text-sm font-semibold uppercase tracking-widest">
              Quem está por trás da imersão "Ruptura Final"?
            </p>
          </SectionReveal>

          {/* Citação — título */}
          <SectionReveal delay={0.2} direction="right">
            <h2 className="font-title text-[8.5vw] md:text-[3.54vw] leading-[1.1] text-balance uppercase">
              "Todo dia eu preciso provar para mim mesmo que ainda sou capaz de fazer o que é difícil."
            </h2>
          </SectionReveal>

          {/* Corpo */}
          <SectionReveal delay={0.3} direction="right">
            <div className="font-body text-white/70 text-base md:text-[0.95vw] leading-relaxed space-y-5 text-justify">
              <p>
                O que eu falo não veio de uma vida que sempre funcionou. Fui atleta, programador, empreendedor. Quebrei.
                Passei por separação, por falência, por momentos em que precisei decidir quem eu queria ser quando tudo
                havia desmoronado.
              </p>
              <p>
                Fui sócio e diretor de engenharia no Nubank. Escrevi livros que chegaram às listas de bestseller. Tenho
                1,7 milhão de seguidores. Nada disso veio antes da queda, tudo veio depois, porque parei de buscar
                motivação e aprendi a construir estrutura.
              </p>
              <p>
                Todo dia de manhã eu entro na banheira de gelo. 550 dias consecutivos. Não por hype. Porque existe uma
                pergunta que precisa ser respondida antes de qualquer outra:{' '}
                <strong className="text-white">
                  você ainda consegue fazer o que é difícil quando não quer?
                </strong>{' '}
                A banheira é o laboratório. Quem aprende a não negociar com o desconforto físico para de negociar com o
                desconforto da mudança.
              </p>
              <p>
                Eu sei o que é reconstruir do zero. E sei o que separa quem reconstrói de quem repete o ciclo. Na
                Ruptura Final, vou mostrar esse mecanismo.
              </p>
            </div>
          </SectionReveal>

          {/* CTA */}
          <SectionReveal delay={0.45} direction="right">
            <CTAButton href="#hero">Me inscrever na Ruptura Final</CTAButton>
          </SectionReveal>

        </div>
      </div>
    </section>
  )
}
