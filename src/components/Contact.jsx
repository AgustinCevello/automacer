import { useState, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useInView } from 'react-intersection-observer'
import { z } from 'zod'
import DOMPurify from 'dompurify'
import LegalModal from './LegalModal'
import { Send, CheckCircle2 } from 'lucide-react'

// ─── Zod Schema ──────────────────────────────────────────────
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(30, 'El nombre no puede exceder 30 caracteres'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('El formato del email no es válido'),
  message: z
    .string()
    .min(10, 'El mensaje es muy corto')
    .max(500, 'El mensaje no puede exceder 500 caracteres'),
  consent: z
    .literal(true, {
      errorMap: () => ({ message: 'Debes aceptar las políticas para continuar' }),
    }),
})

// ─── Rate Limiting Helpers ───────────────────────────────────
const RATE_LIMIT_KEY = 'contact_form_metrics'
const RATE_WINDOW_MS = 600_000 // 10 minutes
const RATE_MAX_SUBMISSIONS = 3

function getRateLimitState() {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function setRateLimitState(state) {
  try {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(state))
  } catch {
    // localStorage unavailable — fail open
  }
}

function checkRateLimit() {
  const now = Date.now()
  const state = getRateLimitState()

  if (!state || now - state.windowStart > RATE_WINDOW_MS) {
    setRateLimitState({ count: 1, windowStart: now })
    return { blocked: false }
  }

  if (state.count >= RATE_MAX_SUBMISSIONS) {
    const elapsed = now - state.windowStart
    const remaining = RATE_WINDOW_MS - elapsed
    return { blocked: true, waitMinutes: Math.ceil(remaining / 60_000) }
  }

  setRateLimitState({ count: state.count + 1, windowStart: state.windowStart })
  return { blocked: false }
}

// ─── Input Sanitizers (onChange interceptors) ─────────────────
const NAME_REGEX = /[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-']/g

function sanitizeName(value) {
  return value.replace(NAME_REGEX, '').slice(0, 30)
}

function sanitizeEmail(value) {
  return value
    .replace(/\s/g, '')
    .replace(/@@+/g, '@')
    .replace(/\.\.+/g, '.')
}

function sanitizeMessage(value) {
  return value.replace(/^\s+/, '')
}

// ─── Contact Icon Set ────────────────────────────────────────
const contactIcons = [
  'material-symbols:location-on',
  'material-symbols:mail',
  'material-symbols:schedule',
]

// ─── Legal Content Renderer ──────────────────────────────────
function LegalContent({ sections, isDarkMode }) {
  const subHeadingColor = isDarkMode ? 'text-white' : 'text-slate-900'
  return (
    <>
      {sections.map((section) => (
        <div key={section.heading}>
          <h4 className={`font-[Syne] font-bold text-base mb-2 ${subHeadingColor}`}>
            {section.heading}
          </h4>
          <p className="mb-4">{section.text}</p>
        </div>
      ))}
    </>
  )
}

// ─── Component ───────────────────────────────────────────────
export default function Contact({ t, isDarkMode }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  // Form state
  const [form, setForm] = useState({ name: '', email: '', message: '', consent: false })
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [rateLimitMsg, setRateLimitMsg] = useState('')

  // Legal modals
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  // Anti-bot: honeypot
  const honeypotName = useMemo(
    () => `_hp_${Math.random().toString(36).substring(2)}`,
    []
  )
  const honeypotRef = useRef(null)

  // Anti-bot: mount timestamp
  const mountTimestamp = useRef(Date.now())

  // ─── onChange Handlers ────────────────────────────────────
  const handleNameChange = useCallback((e) => {
    const clean = sanitizeName(e.target.value)
    setForm((prev) => ({ ...prev, name: clean }))
    setFieldErrors((prev) => ({ ...prev, name: undefined }))
  }, [])

  const handleEmailChange = useCallback((e) => {
    const clean = sanitizeEmail(e.target.value)
    setForm((prev) => ({ ...prev, email: clean }))
    setFieldErrors((prev) => ({ ...prev, email: undefined }))
  }, [])

  const handleMessageChange = useCallback((e) => {
    const clean = sanitizeMessage(e.target.value)
    if (clean.length <= 500) {
      setForm((prev) => ({ ...prev, message: clean }))
      setFieldErrors((prev) => ({ ...prev, message: undefined }))
    }
  }, [])

  const handleConsentChange = useCallback((e) => {
    setForm((prev) => ({ ...prev, consent: e.target.checked }))
    setFieldErrors((prev) => ({ ...prev, consent: undefined }))
  }, [])

  // ─── Submit Handler ───────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()

    setFieldErrors({})
    setIsError(false)
    setIsSuccess(false)
    setRateLimitMsg('')

    // ▸ Zod Validation (includes consent)
    const result = contactSchema.safeParse(form)
    if (!result.success) {
      const errors = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (!errors[field]) errors[field] = issue.message
      })
      setFieldErrors(errors)
      return
    }

    // ▸ Anti-bot #1: Honeypot
    if (honeypotRef.current && honeypotRef.current.value) {
      setIsSuccess(true)
      return
    }

    // ▸ Anti-bot #2: Time-to-submit (< 3s = bot)
    if (Date.now() - mountTimestamp.current < 3000) {
      setIsSuccess(true)
      return
    }

    // ▸ Anti-bot #3: Rate limiting
    const rateCheck = checkRateLimit()
    if (rateCheck.blocked) {
      setRateLimitMsg(
        `Límite excedido. Por favor espera ${rateCheck.waitMinutes} minuto${
          rateCheck.waitMinutes === 1 ? '' : 's'
        } antes de intentar de nuevo.`
      )
      return
    }

    // ▸ DOMPurify sanitization + map to GAS expected keys
    const payload = {
      nombre: DOMPurify.sanitize(form.name),
      email: DOMPurify.sanitize(form.email),
      mensaje: DOMPurify.sanitize(form.message),
      aceptarTerminos: form.consent,
    }

    // ▸ Submit to endpoint
    setIsSubmitting(true)
    try {
      const endpoint = import.meta.env.VITE_SHEETS_URL
      if (!endpoint) throw new Error('Endpoint not configured')

      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })

      // Google Apps Script returns opaque response with no-cors,
      // so we trust the request was sent successfully
      setIsSuccess(true)
      setForm({ name: '', email: '', message: '', consent: false })
    } catch {
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ─── Style tokens ────────────────────────────────────────
  const headingColor = isDarkMode ? 'text-white' : 'text-slate-900'
  const inputClass = `w-full border rounded-lg px-4 py-3 focus:border-cyan-brand focus:ring-1 focus:ring-cyan-brand transition-colors outline-none
    ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white/60 border-slate-200 text-slate-900'}`
  const inputErrorClass = `w-full border rounded-lg px-4 py-3 focus:ring-1 transition-colors outline-none border-red-500 focus:border-red-500 focus:ring-red-500
    ${isDarkMode ? 'bg-white/5 text-white' : 'bg-white/60 text-slate-900'}`
  const labelClass = `text-sm font-[Inter] font-medium ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`
  const errorTextClass = 'text-red-400 text-xs font-[Inter] mt-1 h-4'
  const linkClass = 'text-cyan-brand underline underline-offset-2 hover:text-cyan-400 transition-colors cursor-pointer'

  return (
    <>
      <section className="py-20 px-8 relative overflow-hidden" id="contact" ref={ref}>
        <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
        <div className="orb bg-primary-container w-[700px] h-[700px] bottom-0 right-0 opacity-[0.1]" />
        <div className="orb bg-cyan-brand w-[400px] h-[400px] top-1/2 left-0 opacity-[0.05]" />

        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
          <motion.div initial={{ x: -40, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.6 }}>
            <span className="font-[Inter] text-xs font-semibold text-cyan-brand tracking-[0.1em] uppercase mb-4 block">
              {t.label}
            </span>
            <h2 className={`font-[Syne] text-[clamp(32px,5vw,48px)] leading-[1.2] font-bold mb-8 ${headingColor}`}>
              {t.title}
            </h2>

            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
              initial="hidden" animate={inView ? 'visible' : 'hidden'} className="space-y-8">
              {t.info.map((info, i) => (
                <motion.div key={info.title}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                  className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary-container/30 rounded-lg flex items-center justify-center border border-white/10 glass-panel">
                    <Icon icon={contactIcons[i]} className="text-cyan-brand text-2xl" />
                  </div>
                  <div>
                    <h4 className={`font-[Syne] text-lg font-medium mb-1 ${headingColor}`}>{info.title}</h4>
                    <p className="text-on-surface-variant">{info.detail}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ x: 40, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
                  className="relative z-10 flex flex-col items-center justify-center text-center py-16 space-y-6"
                >
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={40} className="text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className={`font-[Syne] text-2xl font-bold ${headingColor}`}>
                      ¡Mensaje Enviado!
                    </h3>
                    <p className={`font-[Inter] text-sm ${isDarkMode ? 'text-white/60' : 'text-slate-500'}`}>
                      Gracias por contactarnos. Hemos recibido tu solicitud y nos comunicaremos a la brevedad.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-4 px-6 py-2 rounded-lg font-[Inter] text-sm font-medium border border-cyan-brand/30 text-cyan-brand hover:bg-cyan-brand/10 transition-colors cursor-pointer"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 relative z-10" 
                  onSubmit={handleSubmit} 
                  noValidate
                >

                  {/* ─── Honeypot (invisible to humans) ──────────── */}
                  <input
                    ref={honeypotRef}
                    name={honeypotName}
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: 0, height: 0, overflow: 'hidden', zIndex: -1 }}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className={labelClass}>{t.form.name}</label>
                      <input
                        type="text"
                        placeholder={t.form.name_ph}
                        value={form.name}
                        onChange={handleNameChange}
                        maxLength={30}
                        className={fieldErrors.name ? inputErrorClass : inputClass}
                      />
                      <p className={errorTextClass}>{fieldErrors.name || '\u00A0'}</p>
                    </div>
                    {/* Email */}
                    <div className="space-y-2">
                      <label className={labelClass}>{t.form.email}</label>
                      <input
                        type="email"
                        placeholder={t.form.email_ph}
                        value={form.email}
                        onChange={handleEmailChange}
                        className={fieldErrors.email ? inputErrorClass : inputClass}
                      />
                      <p className={errorTextClass}>{fieldErrors.email || '\u00A0'}</p>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className={labelClass}>
                      {t.form.message}
                      <span className={`ml-2 text-xs ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>
                        ({form.message.length}/500)
                      </span>
                    </label>
                    <textarea
                      rows="4"
                      placeholder={t.form.message_ph}
                      value={form.message}
                      onChange={handleMessageChange}
                      className={`${fieldErrors.message ? inputErrorClass : inputClass} resize-none`}
                    />
                    <p className={errorTextClass}>{fieldErrors.message || '\u00A0'}</p>
                  </div>

                  {/* ─── Consent Checkbox ─────────────────────────── */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-3 cursor-pointer select-none group">
                      <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                        <input
                          type="checkbox"
                          checked={form.consent}
                          onChange={handleConsentChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`absolute inset-0 rounded-[4px] border transition-all duration-200 flex items-center justify-center
                          ${form.consent ? 'bg-cyan-brand border-cyan-brand shadow-[0_0_10px_rgba(34,211,238,0.4)]' : (isDarkMode ? 'bg-white/5 border-white/20 group-hover:border-white/40' : 'bg-white border-slate-300 group-hover:border-slate-400')}
                          ${fieldErrors.consent ? 'border-red-500 group-hover:border-red-400' : ''}
                        `}>
                          <motion.svg
                            initial={false}
                            animate={{ scale: form.consent ? 1 : 0, opacity: form.consent ? 1 : 0 }}
                            transition={{ duration: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                            className="w-3.5 h-3.5 text-slate-900"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </motion.svg>
                        </div>
                      </div>
                      <span className={`text-xs leading-relaxed font-[Inter] transition-colors ${isDarkMode ? 'text-white/50 group-hover:text-white/70' : 'text-slate-500 group-hover:text-slate-700'}`}>
                        {t.form.consent_pre}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setShowPrivacy(true) }}
                          className={linkClass}
                        >
                          {t.form.consent_privacy}
                        </button>
                        {t.form.consent_and}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setShowTerms(true) }}
                          className={linkClass}
                        >
                          {t.form.consent_terms}
                        </button>
                      </span>
                    </label>
                    <p className={errorTextClass}>{fieldErrors.consent || '\u00A0'}</p>
                  </div>

                  {/* Privacy clause */}
                  <p className={`text-[11px] leading-relaxed font-[Inter] ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>
                    {t.form.privacy_clause}
                  </p>

                  {/* Rate limit warning */}
                  {rateLimitMsg && (
                    <p className="text-amber-400 text-sm font-[Inter] text-center py-2 px-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      {rateLimitMsg}
                    </p>
                  )}

                  {/* Global error */}
                  {isError && (
                    <p className="text-red-400 text-sm font-[Inter] text-center py-2 px-4 rounded-lg bg-red-500/10 border border-red-500/20">
                      Ocurrió un error al enviar. Intenta nuevamente.
                    </p>
                  )}

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`relative overflow-hidden w-full py-4 bg-cyan-brand text-slate-900 font-[Syne] text-sm font-bold uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all group flex items-center justify-center gap-3 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] cursor-pointer hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]'
                    }`}
                  >
                    {/* Hover shine effect */}
                    <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] transition-all duration-700 ease-in-out group-hover:left-[200%]" />

                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <span>{t.form.submit}</span>
                        <Send 
                          size={18} 
                          className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:rotate-12" 
                        />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ─── Legal Modals ──────────────────────────────────── */}
      <LegalModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title={t.legal.privacy_title}
        isDarkMode={isDarkMode}
      >
        <LegalContent sections={t.legal.privacy_content} isDarkMode={isDarkMode} />
      </LegalModal>

      <LegalModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title={t.legal.terms_title}
        isDarkMode={isDarkMode}
      >
        <LegalContent sections={t.legal.terms_content} isDarkMode={isDarkMode} />
      </LegalModal>
    </>
  )
}
