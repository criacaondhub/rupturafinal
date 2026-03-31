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

export default function LeadForm() {
  const [data, setData] = useState<FormData>({ nome: '', email: '', whatsapp: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)

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
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 600))
    window.location.href = '/obrigado'
  }

  return (
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

          <CTAButton type="submit" className="w-full mt-2 cta-glow" glow>
            {submitting ? 'Aguarde...' : 'Garantir minha vaga na Ruptura Final'}
          </CTAButton>

          <p className="text-white/35 text-xs font-body text-center leading-relaxed pt-1">
            <i className="fi fi-rr-lock text-[10px] leading-none mr-1" />
            Acesso 100% gratuito. Seus dados não serão compartilhados com terceiros.
          </p>

        </form>
      </div>
    </div>
  )
}
