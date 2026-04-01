import { useState, FormEvent } from 'react'
import CTAButton from './CTAButton'

interface FormData {
  nome: string
  email: string
  whatsapp: string
}

interface FormErrors {
  nome?: string
  email?: string
  whatsapp?: string
}

const WEBHOOK_CLINT = import.meta.env.VITE_WEBHOOK_CLINT as string
const WEBHOOK_N8N   = import.meta.env.VITE_WEBHOOK_N8N   as string

function formatWhatsApp(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function SuccessModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: 'rgba(0,0,0,0.82)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm p-px"
        style={{
          background: 'linear-gradient(135deg, rgba(34,197,94,0.9) 0%, rgba(34,197,94,0.3) 40%, rgba(255,255,255,0.06) 70%, transparent 100%)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex flex-col items-center gap-5 px-8 py-10 text-center"
          style={{ background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)' }}
        >
          {/* Ícone de check */}
          <div
            className="flex items-center justify-center w-16 h-16 rounded-full"
            style={{ background: 'rgba(34,197,94,0.12)', border: '1.5px solid rgba(34,197,94,0.4)' }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(34,197,94)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-title text-2xl text-white uppercase" style={{ color: 'rgb(34,197,94)' }}>
              Inscrição confirmada!
            </h3>
            <p className="font-body text-white/70 text-sm leading-relaxed">
              Você está inscrito na <strong className="text-white">Ruptura Final</strong>.<br />
              Fique de olho no seu WhatsApp e e-mail.
            </p>
          </div>

          <button
            onClick={onClose}
            className="font-body text-xs text-white/40 hover:text-white/70 transition-colors pt-1"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function LeadForm() {
  const [data, setData] = useState<FormData>({ nome: '', email: '', whatsapp: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [success, setSuccess] = useState(false)

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!data.nome.trim() || data.nome.trim().length < 2) errs.nome = 'Informe seu nome completo.'
    if (!validateEmail(data.email)) errs.email = 'Informe um e-mail válido.'
    if (data.whatsapp.replace(/\D/g, '').length < 11) errs.whatsapp = 'Informe o WhatsApp com DDD (11 dígitos).'
    return errs
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitError(false)
    setSubmitting(true)

    const payload = {
      nome:     data.nome.trim(),
      email:    data.email.trim(),
      whatsapp: data.whatsapp.replace(/\D/g, ''),
    }

    try {
      await Promise.all([
        fetch(WEBHOOK_CLINT, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        }),
        fetch(WEBHOOK_N8N, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        }),
      ])
      setSuccess(true)
    } catch {
      setSubmitError(true)
      setSubmitting(false)
    }
  }

  return (
    <>
      {success && <SuccessModal onClose={() => setSuccess(false)} />}

      <div className="glass-form-wrapper w-full">
        <div className="glass-form-inner">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 w-full">

            <div>
              <input
                type="text"
                placeholder="Seu nome completo"
                value={data.nome}
                onChange={(e) => setData((d) => ({ ...d, nome: e.target.value }))}
                className="glass-input font-body"
              />
              {errors.nome && (
                <p className="text-primary text-xs mt-1.5 font-body flex items-center gap-1">
                  <i className="fi fi-rr-exclamation text-xs leading-none" />
                  {errors.nome}
                </p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                value={data.email}
                onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                className="glass-input font-body"
              />
              {errors.email && (
                <p className="text-primary text-xs mt-1.5 font-body flex items-center gap-1">
                  <i className="fi fi-rr-exclamation text-xs leading-none" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="(00) 00000-0000"
                value={data.whatsapp}
                onChange={(e) => setData((d) => ({ ...d, whatsapp: formatWhatsApp(e.target.value) }))}
                className="glass-input font-body"
              />
              {errors.whatsapp && (
                <p className="text-primary text-xs mt-1.5 font-body flex items-center gap-1">
                  <i className="fi fi-rr-exclamation text-xs leading-none" />
                  {errors.whatsapp}
                </p>
              )}
            </div>

            {submitError && (
              <p className="text-primary text-xs font-body flex items-center gap-1 -mt-1">
                <i className="fi fi-rr-exclamation text-xs leading-none" />
                Ops, ocorreu um erro. Envie novamente por favor.
              </p>
            )}

            <CTAButton type="submit" disabled={submitting} className="w-full mt-2 cta-glow" glow>
              {submitting ? 'Aguarde...' : <>Garantir minha vaga<br className="md:hidden" /> na Ruptura Final</>}
            </CTAButton>

            <p className="text-white/35 text-xs font-body text-center leading-relaxed pt-1">
              <i className="fi fi-rr-lock text-[10px] leading-none mr-1" />
              Acesso 100% gratuito. Seus dados não serão compartilhados com terceiros.
            </p>

          </form>
        </div>
      </div>
    </>
  )
}
