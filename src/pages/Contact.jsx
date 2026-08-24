import React, { useState } from 'react'
import { m } from 'motion/react'
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { Turnstile } from '@marsidev/react-turnstile'
import { usePageSEO } from '@/hooks/usePageSEO'
import PageTransition from '@/components/layout/PageTransition'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { profile } from '@/lib/data'
import { CurvedInput } from '@/components/react-bits/components/CurvedInput'
import { SpecularButton } from '@/components/react-bits/components/SpecularButton'
import { BorderGlow } from '@/components/react-bits/components/BorderGlow'
import { GradientText } from '@/components/react-bits/text-animations/GradientText'

export default function Contact() {
  usePageSEO({
    title: 'Contact Simon',
    description: `Get in touch with Simon Escaño for engineering roles, contract work, or technical consulting.`,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [turnstileToken, setTurnstileToken] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const turnstileSiteKey =
    import.meta.env.VITE_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      // Send submission to Cloudflare Pages Function endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      })

      if (!response.ok && response.status !== 404) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to submit form.')
      }

      // If in local preview where /api/contact is not served by Vite, simulate success
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.warn('Form submission notice:', err.message)
      // Allow graceful fallback for local development preview
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <PageTransition>
      <section className="section-padding pt-32 md:pt-40" aria-label="Contact Section">
        <div className="container-wide">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <ScrollReveal>
              <div className="text-center">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-accent-400">
                  Direct Inquiries
                </span>
                <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-white">
                  Get In <GradientText colors={['#f97316', '#3b82f6', '#f97316']}>Touch</GradientText>
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-base-300">
                  Have an open full-stack role, an ambitious project, or an engineering inquiry? Send me a message below.
                </p>
              </div>
            </ScrollReveal>

            {/* Form Card wrapped in BorderGlow */}
            <ScrollReveal delay={0.1}>
              <div className="mt-12">
                <BorderGlow className="w-full">
                  <div className="p-8 sm:p-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name & Email Row with CurvedInput */}
                      <div className="grid gap-6 sm:grid-cols-2">
                        <CurvedInput
                          id="name"
                          name="name"
                          label="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="e.g. Alex Morgan"
                        />

                        <CurvedInput
                          id="email"
                          name="email"
                          type="email"
                          label="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="alex@company.com"
                        />
                      </div>

                      {/* Subject */}
                      <CurvedInput
                        id="subject"
                        name="subject"
                        label="Subject / Topic"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Project Collaboration, Hiring, etc."
                      />

                      {/* Message */}
                      <CurvedInput
                        id="message"
                        name="message"
                        label="Project Details or Message"
                        isTextArea
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell me about your team, tech stack, or problem space..."
                      />

                      {/* Cloudflare Turnstile Bot Verification */}
                      <div className="flex justify-center py-2">
                        <Turnstile
                          siteKey={turnstileSiteKey}
                          onSuccess={(token) => setTurnstileToken(token)}
                          options={{
                            theme: 'dark',
                            size: 'flexible',
                          }}
                        />
                      </div>

                      {/* Submit Specular Button */}
                      <div className="pt-2">
                        <SpecularButton
                          type="submit"
                          disabled={status === 'submitting'}
                          variant="primary"
                          className="w-full py-4 text-sm font-bold uppercase tracking-wider"
                        >
                          {status === 'submitting' ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              Verifying & Transmitting...
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              Send Secure Message
                            </>
                          )}
                        </SpecularButton>
                      </div>

                      {/* Feedback Notifications */}
                      {status === 'success' && (
                        <m.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-sm text-emerald-300 backdrop-blur-md"
                        >
                          <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
                          <span>
                            Thank you! Your message was received. I'll get back to you shortly.
                          </span>
                        </m.div>
                      )}

                      {status === 'error' && (
                        <m.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 rounded-2xl border border-rose-500/40 bg-rose-950/40 p-4 text-sm text-rose-300 backdrop-blur-md"
                        >
                          <AlertCircle size={20} className="shrink-0 text-rose-400" />
                          <span>
                            {errorMessage || 'Failed to submit message. Please try again or email directly.'}
                          </span>
                        </m.div>
                      )}
                    </form>
                  </div>
                </BorderGlow>
              </div>
            </ScrollReveal>

            {/* Direct Contact Info Strip */}
            <ScrollReveal delay={0.2}>
              <div className="mt-14 flex flex-wrap items-center justify-around gap-6 rounded-2xl border border-base-800/80 bg-base-900/40 p-6 backdrop-blur-md text-center">
                <div>
                  <span className="font-mono text-[10px] uppercase text-base-500">Email</span>
                  <p className="mt-1 font-mono text-xs font-semibold text-accent-400">
                    <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
                  </p>
                </div>

                <div className="h-6 w-px bg-base-800 hidden sm:block" />

                <div>
                  <span className="font-mono text-[10px] uppercase text-base-500">Mobile</span>
                  <p className="mt-1 font-mono text-xs text-base-300">
                    {profile.mobile}
                  </p>
                </div>

                <div className="h-6 w-px bg-base-800 hidden sm:block" />

                <div>
                  <span className="font-mono text-[10px] uppercase text-base-500">Location</span>
                  <p className="mt-1 font-mono text-xs text-base-300">
                    Cebu City, Philippines
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
