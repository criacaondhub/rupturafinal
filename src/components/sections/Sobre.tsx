import CTAButton from '../ui/CTAButton'
import SectionReveal from '../ui/SectionReveal'
import SignatureToledo from '../ui/SignatureToledo'

export default function Sobre() {
  return (
    <section className="bg-transparent py-14 md:py-32 px-6 overflow-hidden">
      <div className="max-w-full md:max-w-[78vw] mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">

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
              <SignatureToledo />
            </div>
          </div>
        </SectionReveal>

        {/* Conteúdo — lado direito */}
        <div className="flex flex-col gap-6 md:gap-8 text-left w-full md:max-w-[40vw]">

          {/* Subtítulo */}
          <SectionReveal delay={0.1} direction="right">
            <p className="font-body text-primary text-sm font-semibold uppercase tracking-widest text-center md:text-left">
              Quem está por trás<br className="md:hidden" /> da imersão "Ruptura Final"?
            </p>
          </SectionReveal>

          {/* Citação — título */}
          <SectionReveal delay={0.2} direction="right">
            <h2 className="font-title text-[8.5vw] md:text-[3.54vw] leading-[1.1] text-balance uppercase italic text-center md:text-left">
              "Todo dia eu <span className="text-primary">preciso provar para mim mesmo</span> que ainda sou capaz de fazer o que é difícil."
            </h2>
          </SectionReveal>

          {/* Corpo */}
          <SectionReveal delay={0.3} direction="right">
            <div className="font-body text-white/70 text-base md:text-[0.95vw] leading-relaxed space-y-6 md:space-y-5 text-center md:text-justify tracking-tight md:tracking-normal">
              <p>
                Minha experiência não é de sucesso ininterrupto. Fui atleta, programador, empreendedor, mas quebrei,
                passei por falência e separação, precisando me reconstruir do zero.
              </p>
              <p>
                <strong className="text-white">Fui sócio e diretor de engenharia no Nubank, escrevi bestsellers e tenho 1,7 milhão de seguidores. Esse
                sucesso veio depois das quedas, quando troquei a busca por motivação por construção de estrutura.</strong>
              </p>
              <p>
                A banheira de gelo, que uso há mais de 550 dias, é meu laboratório para responder à pergunta crucial:{' '}
                <strong className="text-white">
                  você consegue fazer o que é difícil quando não quer?
                </strong>{' '}
                Quem supera o desconforto físico, para de negociar com o desconforto da mudança.
              </p>
              <p>
                Sei o que é recomeçar e o que separa quem reconstrói de quem repete erros. Na Ruptura Final, revelarei
                esse mecanismo.
              </p>
            </div>
          </SectionReveal>

          {/* CTA */}
          <SectionReveal delay={0.45} direction="right">
            <CTAButton href="#hero" className="w-full md:w-auto">Me inscrever na<br className="md:hidden" /> Ruptura Final</CTAButton>
          </SectionReveal>

        </div>
      </div>
    </section>
  )
}
