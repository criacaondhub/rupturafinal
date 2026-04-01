import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionReveal from '../ui/SectionReveal'

const items = [
  {
    question: 'Este evento é pago?',
    answer: (
      <>
        <p>
          Não. A Ruptura Final é um evento <strong>100% gratuito</strong> por um único motivo: Queremos despertar o
          maior número de pessoas que conseguirmos.
        </p>
        <p className="mt-3">
          Para garantir uma vaga e não perder absolutamente nada sobre o evento — materiais complementares, avisos sobre
          a live e o link da imersão ao vivo que acontecerá no dia 07 de maio —, é preciso que você se inscreva nesta
          página e entre para o <strong>GRUPO VIP do WhatsApp!</strong>
        </p>
      </>
    ),
  },
  {
    question: 'Preciso ter feito algo antes para assistir?',
    answer: (
      <>
        <p>
          Não. A live é aberta para qualquer pessoa que quer entender o mecanismo por trás da mudança de comportamento.
          Nenhum conhecimento prévio é necessário.
        </p>
        <p className="mt-3">
          O objetivo é transformar vidas, construir homens e mulheres mais corajosos, disciplinados, focados,
          determinados e felizes!
        </p>
      </>
    ),
  },
  {
    question: 'Por que preciso me inscrever se é gratuita?',
    answer: (
      <p>
        O link de acesso aos materiais de apoio da live e a transmissão ao vivo só será enviado para quem se inscrever
        (e entrar no <strong>GRUPO VIP DO WHATSAPP</strong>).
      </p>
    ),
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-transparent py-14 md:py-32 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Título */}
        <SectionReveal>
          <h2 className="font-title text-[8.5vw] md:text-[3.54vw] text-center mb-12 uppercase">
            Perguntas Frequentes
          </h2>
        </SectionReveal>

        {/* Accordion dentro do glass */}
        <SectionReveal delay={0.05}>
          <div className="glass-form-wrapper">
            <div className="glass-form-inner !p-0">
              <div className="flex flex-col divide-y divide-white/[0.07]">
                {items.map((item, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group cursor-pointer"
                    >
                      <span className="font-body font-semibold text-white text-base md:text-[1vw] group-hover:text-primary transition-colors duration-200">
                        {item.question}
                      </span>
                      <motion.span
                        animate={{ rotate: open === i ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex-shrink-0 text-primary text-2xl font-light leading-none"
                      >
                        +
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open === i && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className="font-body text-white/65 text-sm md:text-[0.9vw] leading-relaxed px-6 pb-6">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
