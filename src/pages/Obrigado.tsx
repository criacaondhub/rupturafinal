import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const WEBHOOK_CHECKIN = import.meta.env.VITE_WEBHOOK_CHECKIN as string

interface LeadData {
  nome: string
  email: string
  whatsapp: string
}

// ─── Perguntas ────────────────────────────────────────────────────────────────

type QuestionType = 'select' | 'text' | 'multi'

interface Question {
  id: string
  label: string
  type: QuestionType
  options?: string[]
  placeholder?: string
}

const QUESTIONS: Question[] = [
  {
    id: 'idade',
    label: 'Qual sua idade?',
    type: 'select',
    options: ['Menos de 18 anos', '18-24 anos', '25-34 anos', '35-49 anos', 'Mais de 49 anos'],
  },
  {
    id: 'estado',
    label: 'Qual seu estado?',
    type: 'select',
    options: [
      'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará',
      'Distrito Federal', 'Espírito Santo', 'Goiás', 'Maranhão',
      'Mato Grosso', 'Mato Grosso do Sul', 'Minas Gerais', 'Pará',
      'Paraíba', 'Paraná', 'Pernambuco', 'Piauí', 'Rio de Janeiro',
      'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia', 'Roraima',
      'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins',
    ],
  },
  {
    id: 'genero',
    label: 'Qual seu gênero?',
    type: 'select',
    options: ['Masculino', 'Feminino', 'Prefiro não informar'],
  },
  {
    id: 'profissao',
    label: 'Qual sua profissão?',
    type: 'text',
    placeholder: 'Digite sua profissão',
  },
  {
    id: 'renda',
    label: 'Qual sua renda mensal?',
    type: 'select',
    options: [
      'Até R$ 2.000 ao mês',
      'Entre R$ 2.000 a R$ 4.000 ao mês',
      'Entre R$ 4.000 e R$ 7.000 ao mês',
      'Mais de R$ 7.000 ao mês',
    ],
  },
  {
    id: 'tempoMarcelo',
    label: 'Há quanto tempo você conhece o Marcelo Toledo?',
    type: 'select',
    options: ['Menos de 1 mês', '1-5 meses', '5-12 meses', '1-2 anos', 'Mais de 2 anos'],
  },
  {
    id: 'objetivo',
    label: 'Qual o seu principal objetivo ao participar do Ruptura Final?',
    type: 'multi',
    options: [
      'Construir bons hábitos',
      'Parar de procrastinar',
      'Ser mais disciplinado(a)',
      'Quebrar crenças limitantes internas',
      'Aumentar minha produtividade',
    ],
  },
  {
    id: 'perguntaMarcelo',
    label: 'Se tivesse uma pergunta para fazer ao Marcelo Toledo em um café, qual seria?',
    type: 'text',
    placeholder: 'Escreva sua pergunta',
  },
  {
    id: 'comunidade',
    label: 'Se você tivesse a oportunidade de participar de uma comunidade de impacto feita para você destruir desculpas, reconstruir sua identidade e forjar uma vida de domínio e prosperidade. Você teria interesse?',
    type: 'select',
    options: ['Sim', 'Não'],
  },
]

const WHATSAPP_LINK = '#' // substituir pelo link real

// ─── Componente ───────────────────────────────────────────────────────────────

export default function Obrigado() {
  const location = useLocation()
  void useNavigate()

  const rawLead = location.state as LeadData | null
  const lead: LeadData = {
    nome:      rawLead?.nome?.trim()      || 'Não respondido',
    email:     rawLead?.email?.trim()     || 'Não respondido',
    whatsapp:  rawLead?.whatsapp?.trim()  || 'Não respondido',
  }

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [currentValue, setCurrentValue] = useState<string | string[]>('')
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null)

  const question = QUESTIONS[step]

  // Foca input ao mudar de step
  useEffect(() => {
    setCurrentValue(answers[question?.id] ?? (question?.type === 'multi' ? [] : ''))
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus()
    }, 350)
  }, [step]) // eslint-disable-line react-hooks/exhaustive-deps

  function canAdvance(): boolean {
    if (question.type === 'multi') return (currentValue as string[]).length > 0
    return String(currentValue).trim().length > 0
  }

  async function handleNext() {
    if (!canAdvance()) return

    const newAnswers = { ...answers, [question.id]: currentValue }
    setAnswers(newAnswers)

    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1)
    } else {
      setSubmitting(true)
      const payload = {
        nome:            lead.nome,
        email:           lead.email,
        whatsapp:        lead.whatsapp,
        idade:           newAnswers.idade,
        estado:          newAnswers.estado,
        genero:          newAnswers.genero,
        profissao:       newAnswers.profissao,
        renda:           newAnswers.renda,
        tempoMarcelo:    newAnswers.tempoMarcelo,
        objetivo:        Array.isArray(newAnswers.objetivo)
                           ? (newAnswers.objetivo as string[]).join(', ')
                           : newAnswers.objetivo,
        perguntaMarcelo: newAnswers.perguntaMarcelo,
        comunidade:      newAnswers.comunidade,
      }
      try {
        if (WEBHOOK_CHECKIN) {
          await fetch(WEBHOOK_CHECKIN, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(payload),
          })
        }
      } catch {
        // falha silenciosa — não bloqueia o fluxo
      }
      setSubmitting(false)
      setDone(true)
    }
  }

  function toggleMulti(option: string) {
    setCurrentValue((prev) => {
      const arr = Array.isArray(prev) ? prev : []
      return arr.includes(option) ? arr.filter((o) => o !== option) : [...arr, option]
    })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && question.type !== 'multi') handleNext()
  }

  const progressPct = ((step + 1) / QUESTIONS.length) * 100

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      {/* Background — colorido, sem opacidade reduzida */}
      <img
        src="/assets/bg-obrigado.webp"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
      />
      {/* Overlay leve para garantir legibilidade do texto */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-8">

        {/* Logo maior */}
        <img src="/assets/logo-ruptura.svg" alt="Ruptura Final" className="h-20 w-auto" />

        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center gap-6"
            >
              {/* Título + subtítulo */}
              <div className="text-center flex flex-col gap-3">
                <h1 className="font-title text-[5.5vw] md:text-[4rem] uppercase text-white leading-tight whitespace-nowrap">
                  SIGA O PRÓXIMO PASSO PARA CONCLUIR A SUA{' '}
                  <span className="text-primary">INSCRIÇÃO.</span>
                </h1>
                <p className="font-body text-white/70 text-sm md:text-base leading-relaxed">
                  Preencha o <strong className="text-white">Check-in do Participante.</strong> Suas respostas são confidenciais.
                </p>
              </div>

              {/* Barra de progresso */}
              <div className="w-full max-w-xl flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px] font-body text-white/40 tabular-nums">
                  <span>Pergunta {step + 1} de {QUESTIONS.length}</span>
                  <span>{Math.round(progressPct)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: `${((step) / QUESTIONS.length) * 100}%` }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Card da pergunta */}
              <div
                className="glass-form-wrapper w-full max-w-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(252,70,18,0.7) 0%, rgba(252,70,18,0.2) 35%, rgba(255,255,255,0.05) 60%, transparent 100%)',
                }}
              >
                <div className="glass-form-inner">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="flex flex-col gap-5"
                    >
                      <div className="flex flex-col gap-1">
                        <label className="font-body text-white font-semibold text-base leading-snug">
                          {question.label}
                        </label>
                        {question.type === 'multi' && (
                          <span className="font-body text-white/50 text-xs">
                            Selecione quantas opções desejar
                          </span>
                        )}
                      </div>

                      {/* Select */}
                      {question.type === 'select' && (
                        <select
                          ref={inputRef as React.RefObject<HTMLSelectElement>}
                          value={currentValue as string}
                          onChange={(e) => setCurrentValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="checkin-select font-body"
                        >
                          <option value="" disabled>Selecione uma opção</option>
                          {question.options!.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      )}

                      {/* Text */}
                      {question.type === 'text' && (
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          type="text"
                          placeholder={question.placeholder}
                          value={currentValue as string}
                          onChange={(e) => setCurrentValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="glass-input font-body"
                        />
                      )}

                      {/* Multi-select pills */}
                      {question.type === 'multi' && (
                        <div className="flex flex-wrap gap-2">
                          {question.options!.map((opt) => {
                            const selected = (currentValue as string[]).includes(opt)
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => toggleMulti(opt)}
                                className={`checkin-pill font-body ${selected ? 'checkin-pill--active' : ''}`}
                              >
                                {opt}
                              </button>
                            )
                          })}
                        </div>
                      )}

                      {/* Botão avançar */}
                      <motion.button
                        type="button"
                        onClick={handleNext}
                        disabled={!canAdvance() || submitting}
                        whileHover={canAdvance() ? { scale: 1.015, backgroundColor: '#e03d0e' } : {}}
                        whileTap={canAdvance() ? { scale: 0.97 } : {}}
                        transition={{ duration: 0.18 }}
                        className={[
                          'w-full bg-primary text-white font-body font-bold uppercase tracking-widest text-sm px-8 py-4 text-center cta-premium',
                          !canAdvance() || submitting ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
                        ].join(' ')}
                      >
                        {submitting ? 'Aguarde...' : step < QUESTIONS.length - 1 ? 'Próxima' : 'Enviar Respostas'}
                      </motion.button>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center gap-6 text-center"
            >
              <div className="flex flex-col gap-3">
                <h2 className="font-title text-[9vw] md:text-[4rem] uppercase text-white leading-tight whitespace-nowrap">
                  Check-in <span className="text-primary">concluído!</span>
                </h2>
                <p className="font-body text-white/70 text-sm md:text-base leading-relaxed max-w-sm mx-auto">
                  Agora entre no grupo exclusivo do WhatsApp para receber todas as informações do evento.
                </p>
              </div>

              {/* Botão WhatsApp pulsante */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-button font-body font-bold uppercase tracking-widest text-sm px-10 py-5 text-white"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Entrar no Grupo VIP
              </a>

              <p className="font-body text-white/35 text-xs leading-relaxed max-w-xs">
                Caso não seja redirecionado automaticamente após concluir seu Check-in toque no botão acima.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
