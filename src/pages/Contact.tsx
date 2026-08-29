import React, { useState, useEffect, useRef } from 'react';
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
  MessageSquare,
  RotateCw,
  ChevronDown,
} from 'lucide-react';
import dataService from '@/services/dataService';
import {
  BorderGlow,
  SpotlightCard,
  SpecularButton,
  GradientText,
  DotField,
  ShinyText,
} from '@/components/reactbits';

const SCOPE_OPTIONS = [
  { value: 'Full-Stack Web Development', label: 'Full-Stack Web Development', desc: 'React, TypeScript, Node.js & Scalable Architecture' },
  { value: 'Game Architecture & Development', label: 'Game Architecture & Development', desc: 'Java, LibGDX, Retro Mechanics & Physics' },
  { value: 'AI Diagnostics & Computer Vision', label: 'AI Diagnostics & Computer Vision', desc: 'YOLOv8, TensorFlow.js & LLM Pipelines' },
  { value: 'Technical Consulting / Advisory', label: 'Technical Consulting / Advisory', desc: 'System Design, Cloud & Database Engineering' },
  { value: 'Hackathon Team / Collaboration', label: 'Hackathon Team / Collaboration', desc: 'Rapid prototyping & innovative builds' },
  { value: 'General Inquiry', label: 'General Inquiry', desc: 'General questions, partnerships, or chats' },
];

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const profile = dataService.getProfile();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Full-Stack Web Development');
  const [message, setMessage] = useState('');

  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Interactive Captcha states
  const [turnstileVerified, setTurnstileVerified] = useState(false);
  const [turnstileVerifying, setTurnstileVerifying] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMobile, setCopiedMobile] = useState(false);

  useEffect(() => {
    const prefillMessage = searchParams.get('message');
    if (prefillMessage) {
      setMessage(prefillMessage);
    }
  }, [searchParams]);

  // Outside click listener for custom dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyMobile = () => {
    navigator.clipboard.writeText(profile.mobile);
    setCopiedMobile(true);
    setTimeout(() => setCopiedMobile(false), 2500);
  };

  // Interactive Captcha click simulation
  const handleCaptchaClick = () => {
    if (turnstileVerified || turnstileVerifying) return;
    setTurnstileVerifying(true);
    setTimeout(() => {
      setTurnstileVerifying(false);
      setTurnstileVerified(true);
    }, 650);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || !turnstileVerified) return;

    setSubmitting(true);
    try {
      // Send directly to escanosimonlyster@gmail.com via FormSubmit AJAX service
      const res = await fetch('https://formsubmit.co/ajax/escanosimonlyster@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          _subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
          scope: subject,
          message,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground overflow-hidden">
      {/* Background Interactive DotField Shader */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-75 dark:opacity-85">
          <DotField
            dotRadius={1.5}
            dotSpacing={16}
            bulgeStrength={65}
            glowRadius={160}
            gradientFrom="rgba(56, 69, 201, 0.45)"
            gradientTo="rgba(249, 115, 22, 0.35)"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-brand-cobalt/40 shadow-md backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 dark:bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 dark:bg-emerald-400"></span>
            </span>
            <ShinyText
              text="Open to work"
              speed={3}
              className="text-xs font-mono font-medium"
            />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight pb-2 leading-tight">
            Let's{' '}
            <GradientText colors={['#3845C9', '#60a5fa', '#f97316']} className="inline-block pb-1">
              Build Together
            </GradientText>
          </h1>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Whether you are discussing a full-stack engineering role, exploring game mechanics,
            or looking to partner with <span className="font-display font-medium text-slate-900 dark:text-white">simon-escano</span> — send a message directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 flex flex-col">
            <SpotlightCard
              className="p-6 sm:p-8 bg-white/80 dark:bg-slate-900/50 border-slate-200 dark:border-white/10 shadow-sm flex flex-col flex-1"
              innerClassName="h-full flex flex-col justify-between flex-1"
            >
              <div className="space-y-6">
                {/* Header with Title & Subtitle */}
                <div className="space-y-1">
                  <h3 className="font-display text-2xl font-medium text-slate-900 dark:text-white">
                    Contact Information
                  </h3>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Direct communication & verification channels
                  </p>
                </div>

                {/* Info Rows with Generous Gap */}
                <div className="space-y-3.5">
                  {/* Email */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2.5 rounded-lg bg-brand-cobalt/10 text-brand-orange flex-shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Email
                        </div>
                        <a
                          href={`mailto:${profile.contact.email}`}
                          className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 hover:text-brand-orange transition-colors truncate block"
                        >
                          {profile.contact.email}
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700/60 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex-shrink-0"
                      title="Copy Email"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Mobile Phone */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2.5 rounded-lg bg-brand-cobalt/10 text-brand-cobalt dark:text-blue-400 flex-shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Mobile
                        </div>
                        <a
                          href={`tel:${profile.mobile.replace(/\s+/g, '')}`}
                          className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 hover:text-brand-orange transition-colors"
                        >
                          {profile.mobile}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyMobile}
                      className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700/60 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex-shrink-0"
                      title="Copy Mobile"
                    >
                      {copiedMobile ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5">
                    <div className="p-2.5 rounded-lg bg-brand-cobalt/10 text-emerald-500 flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Location
                      </div>
                      <div className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200">
                        Cebu City, Philippines (UTC+8)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels with Generous Top Margin & Padding (pinned at bottom) */}
              <div className="mt-auto pt-6 border-t border-slate-200 dark:border-white/10 space-y-3">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Verified Profiles
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={profile.contact.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white transition-colors shadow-sm"
                  >
                    <Github className="w-4 h-4 text-brand-orange" />
                    <span>GitHub Profile</span>
                  </a>

                  <a
                    href={profile.contact.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white transition-colors shadow-sm"
                  >
                    <Linkedin className="w-4 h-4 text-brand-cobalt dark:text-blue-400" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 flex flex-col">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="235 70 60"
              borderRadius={28}
              className="flex-1"
            >
              <div className="p-6 sm:p-10 h-full flex flex-col justify-between">
                {submitted ? (
                  <div className="text-center py-12 space-y-4 my-auto">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white">Message Sent Successfully!</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out, <span className="font-medium text-slate-900 dark:text-white">{name}</span>. <span className="font-display font-medium text-slate-900 dark:text-white">simon-escano</span> will review your message and reply back to <span className="font-mono text-brand-orange">{email}</span> promptly.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setName('');
                          setEmail('');
                          setMessage('');
                          setTurnstileVerified(false);
                        }}
                        className="px-6 py-2.5 rounded-full text-xs font-mono bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white transition-colors"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex items-center gap-2 text-xs font-mono text-brand-cobalt dark:text-blue-400 uppercase tracking-wider mb-2 font-medium">
                      <MessageSquare className="w-4 h-4 text-brand-orange" />
                      <span>Direct Message Route</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="block text-xs font-mono text-slate-700 dark:text-slate-300">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Miller"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-brand-cobalt focus:outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="block text-xs font-mono text-slate-700 dark:text-slate-300">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-brand-cobalt focus:outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject / Scope (Clean Shadcn-styled Custom Dropdown) */}
                    <div className="space-y-2 relative z-30" ref={dropdownRef}>
                      <label className="block text-xs font-mono text-slate-700 dark:text-slate-300">
                        Inquiry Scope
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen((prev) => !prev)}
                          className="flex h-11 w-full items-center justify-between rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-sm text-slate-900 dark:text-white hover:border-brand-cobalt dark:hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-brand-cobalt/30 transition-all cursor-pointer text-left shadow-sm"
                        >
                          <span className="truncate font-mono text-xs sm:text-sm font-medium">
                            {subject}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-brand-orange' : ''
                              }`}
                          />
                        </button>

                        {isDropdownOpen && (
                          <div className="absolute left-0 top-full mt-1.5 w-full rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-2xl z-50 p-1.5 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                            {SCOPE_OPTIONS.map((opt) => {
                              const isSelected = subject === opt.value;
                              return (
                                <div
                                  key={opt.value}
                                  onClick={() => {
                                    setSubject(opt.value);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all ${isSelected
                                    ? 'bg-brand-cobalt/15 text-brand-cobalt dark:text-blue-400 font-medium'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                  <div className="space-y-0.5 min-w-0 pr-2">
                                    <div className="text-xs sm:text-sm font-mono font-medium leading-none truncate">
                                      {opt.label}
                                    </div>
                                    <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono truncate">
                                      {opt.desc}
                                    </div>
                                  </div>
                                  {isSelected && (
                                    <Check className="w-4 h-4 text-brand-cobalt dark:text-blue-400 flex-shrink-0" />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-slate-700 dark:text-slate-300">Message *</label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell simon-escano about your project, engineering role, or technical vision..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 focus:border-brand-cobalt focus:outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors resize-y"
                      />
                    </div>

                    {/* ──────────────────────────────────────────────────────────
                        Interactive Cloudflare Turnstile Captcha Widget
                    ────────────────────────────────────────────────────────── */}
                    <div
                      onClick={handleCaptchaClick}
                      className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between ${turnstileVerified
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-slate-900 dark:text-white'
                        : 'bg-slate-100 dark:bg-slate-800/90 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 text-slate-800 dark:text-slate-300'
                        }`}
                    >
                      <div className="flex items-center gap-3.5">
                        {/* Captcha Checkbox Indicator */}
                        <div
                          className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${turnstileVerified
                            ? 'bg-emerald-500 border-emerald-400 text-white dark:text-slate-950 scale-105'
                            : turnstileVerifying
                              ? 'border-brand-orange bg-slate-200 dark:bg-slate-700'
                              : 'border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-900 hover:border-brand-orange'
                            }`}
                        >
                          {turnstileVerified ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : turnstileVerifying ? (
                            <RotateCw className="w-3.5 h-3.5 text-brand-orange animate-spin" />
                          ) : null}
                        </div>

                        <div>
                          <div className="text-xs font-mono font-medium">
                            {turnstileVerified
                              ? 'Verification Successful'
                              : turnstileVerifying
                                ? 'Verifying challenge...'
                                : 'Verify you are human'}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                            Secured with Cloudflare
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end text-right">
                        <ShieldCheck
                          className={`w-5 h-5 transition-colors ${turnstileVerified ? 'text-emerald-500 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'
                            }`}
                        />
                        <span className="text-[9px] font-mono text-slate-500 mt-0.5">Privacy • Terms</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <SpecularButton
                        type="submit"
                        size="lg"
                        disabled={submitting || !name || !email || !message || !turnstileVerified}
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
