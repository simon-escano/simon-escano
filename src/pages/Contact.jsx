import { useState } from 'react'
import { m } from 'motion/react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { usePageSEO } from '@/hooks/usePageSEO'
import PageTransition from '@/components/layout/PageTransition'
import ScrollReveal from '@/components/layout/ScrollReveal'
import { profile } from '@/lib/data'

export default function Contact() {
  usePageSEO({
    title: 'Contact',
    description: `Get in touch with ${profile.name}. I'm currently available for new opportunities.`,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    // TODO: Stage 5 — integrate with Cloudflare Pages Function + Turnstile
    // For now, simulate a submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <PageTransition>
      <section className="section-padding pt-32" aria-label="Contact">
        <div className="container-wide">
          <div className="mx-auto max-w-2xl">
            <ScrollReveal>
              <div className="text-center">
                <h1 className="text-base-100">
                  Get in <span className="text-accent-400">Touch</span>
                </h1>
                <p className="mt-4 text-base-400">
                  Have a project in mind or just want to chat? I'd love to hear from you.
                </p>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.1}>
              <form onSubmit={handleSubmit} className="mt-12 space-y-6">
                {/* Name & Email Row */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-medium text-base-300"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-base-700/50 bg-base-900/50 px-4 py-3 text-sm text-base-200 placeholder:text-base-500 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-medium text-base-300"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-base-700/50 bg-base-900/50 px-4 py-3 text-sm text-base-200 placeholder:text-base-500 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-medium text-base-300"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className="w-full rounded-xl border border-base-700/50 bg-base-900/50 px-4 py-3 text-sm text-base-200 placeholder:text-base-500 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium text-base-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me more about your project or opportunity..."
                    className="w-full resize-none rounded-xl border border-base-700/50 bg-base-900/50 px-4 py-3 text-sm text-base-200 placeholder:text-base-500 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 transition-colors"
                  />
                </div>

                {/* Turnstile placeholder — integrated in Stage 5 */}
                <div className="flex items-center justify-center rounded-xl border border-dashed border-base-700/50 py-4">
                  <p className="text-xs text-base-500">
                    🔒 Cloudflare Turnstile verification will appear here
                  </p>
                </div>

                {/* Submit Button — Specular Button replaces in Stage 4 */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 py-4 text-sm font-semibold text-white transition-all hover:bg-accent-600 hover:shadow-lg hover:shadow-accent-500/25 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {status === 'success' && (
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400"
                  >
                    <CheckCircle size={18} />
                    Message sent successfully! I'll get back to you soon.
                  </m.div>
                )}

                {status === 'error' && (
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400"
                  >
                    <AlertCircle size={18} />
                    Something went wrong. Please try again.
                  </m.div>
                )}
              </form>
            </ScrollReveal>

            {/* Alternative Contact */}
            <ScrollReveal delay={0.2}>
              <div className="mt-16 text-center">
                <p className="text-sm text-base-500">
                  Or reach me directly at{' '}
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="text-accent-400 hover:underline"
                  >
                    {profile.contact.email}
                  </a>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
