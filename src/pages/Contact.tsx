import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import dataService from '@/services/dataService';
import {
  BorderGlow,
  SpotlightCard,
  SpecularButton,
  GradientText,
  ShinyText,
} from '@/components/reactbits';

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const profile = dataService.getProfile();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Full-Stack Web Development');
  const [message, setMessage] = useState('');
  const [turnstileVerified, setTurnstileVerified] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const prefillMessage = searchParams.get('message');
    if (prefillMessage) {
      setMessage(prefillMessage);
    }
  }, [searchParams]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cobalt/10 border border-brand-cobalt/30 text-blue-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <ShinyText text="Direct Inquiries • Fast Response Time" speed={3} />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Let's <GradientText colors={['#3845C9', '#60a5fa', '#f97316']}>Build Together</GradientText>
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Whether you are discussing a full-stack engineering role, exploring game mechanics,
            or looking to partner for a technical venture — send a message directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            <SpotlightCard className="p-6 sm:p-8 bg-slate-900/50 border-white/10 space-y-6">
              <h3 className="font-display text-2xl font-bold text-white">Contact Information</h3>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/60 border border-white/5">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-brand-cobalt/20 text-brand-orange flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Email</div>
                      <a
                        href={`mailto:${profile.contact.email}`}
                        className="text-xs sm:text-sm font-mono text-slate-200 hover:text-brand-orange transition-colors truncate block"
                      >
                        {profile.contact.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 transition-colors flex-shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Mobile Phone */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-white/5">
                  <div className="p-2 rounded-lg bg-brand-cobalt/20 text-blue-400 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Mobile</div>
                    <a
                      href={`tel:${profile.mobile.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-sm font-mono text-slate-200 hover:text-brand-orange transition-colors"
                    >
                      {profile.mobile}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/60 border border-white/5">
                  <div className="p-2 rounded-lg bg-brand-cobalt/20 text-emerald-400 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Location</div>
                    <div className="text-xs sm:text-sm font-mono text-slate-200">
                      Cebu City, Philippines (UTC+8)
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase">Professional Links</div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 border border-white/10 text-white transition-colors"
                  >
                    <Github className="w-4 h-4 text-brand-orange" />
                    <span>GitHub Profile</span>
                  </a>

                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-slate-800 hover:bg-slate-700 border border-white/10 text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>LinkedIn Network</span>
                  </a>
                </div>
              </div>
            </SpotlightCard>

            {/* Availability Status Card */}
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                </span>
                <span>Active Opportunity Window</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Currently reviewing full-time engineering opportunities and high-impact technical initiatives for 2026.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="235 70 60"
              backgroundColor="rgba(19, 27, 46, 0.85)"
              borderRadius={28}
            >
              <div className="p-6 sm:p-10">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-white">Message Sent Successfully!</h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Thank you for reaching out, <span className="font-semibold text-white">{name}</span>. Simon will review your message and reply back to <span className="font-mono text-brand-orange">{email}</span> promptly.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setName('');
                          setEmail('');
                          setMessage('');
                        }}
                        className="px-6 py-2.5 rounded-full text-xs font-mono bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
                      <MessageSquare className="w-4 h-4 text-brand-orange" />
                      <span>Send Direct Inquiry</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="block text-xs font-mono text-slate-300">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Elena Rostova"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-brand-cobalt focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="block text-xs font-mono text-slate-300">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-brand-cobalt focus:outline-none text-sm text-white placeholder-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject / Scope */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-slate-300">Inquiry Scope</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-brand-cobalt focus:outline-none text-sm text-white transition-colors"
                      >
                        <option value="Full-Stack Web Development">Full-Stack Web Development</option>
                        <option value="Game Architecture & Development">Game Architecture & Development</option>
                        <option value="AI Diagnostics & Computer Vision">AI Diagnostics & Computer Vision</option>
                        <option value="Technical Consulting / Advisory">Technical Consulting / Advisory</option>
                        <option value="Hackathon Team / Collaboration">Hackathon Team / Collaboration</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-slate-300">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell Simon about your project, engineering role, or technical vision..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 focus:border-brand-cobalt focus:outline-none text-sm text-white placeholder-slate-500 transition-colors resize-y"
                      />
                    </div>

                    {/* Turnstile Bot Protection Verification Simulation */}
                    <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          id="turnstile"
                          checked={turnstileVerified}
                          onChange={(e) => setTurnstileVerified(e.target.checked)}
                          className="w-4 h-4 rounded text-brand-orange focus:ring-brand-orange bg-slate-700 border-slate-600"
                        />
                        <label htmlFor="turnstile" className="text-xs font-mono text-slate-300 cursor-pointer select-none">
                          I am a human (Cloudflare Turnstile Verified)
                        </label>
                      </div>
                      <ShieldCheck className={`w-4 h-4 ${turnstileVerified ? 'text-emerald-400' : 'text-slate-500'}`} />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <SpecularButton
                        type="submit"
                        size="lg"
                        disabled={submitting || !name || !email || !message}
                        className="w-full justify-center"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                            <span>Routing Message...</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <span>Submit Message</span>
                            <Send className="w-4 h-4 text-brand-orange" />
                          </span>
                        )}
                      </SpecularButton>
                    </div>
                  </form>
                )}
              </div>
            </BorderGlow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
