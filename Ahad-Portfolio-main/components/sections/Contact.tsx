'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { profileData } from '@/data/profile';
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiArrowUpRight
} from 'react-icons/fi';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Please write at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    setFallbackNotice(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmitSuccess(true);
        reset();

        if (resData.fallback && resData.mailtoUrl) {
          setFallbackNotice(
            'Opening your default email client with your prefilled message...'
          );
          window.location.href = resData.mailtoUrl;
        }
      } else {
        const mailtoSubject = encodeURIComponent(`Portfolio Inquiry from ${data.name}`);
        const mailtoBody = encodeURIComponent(
          `Hi Abdul,\n\n${data.message}\n\nFrom: ${data.name} (${data.email})`
        );
        window.location.href = `mailto:${profileData.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
        setSubmitSuccess(true);
        reset();
      }
    } catch (err) {
      const mailtoSubject = encodeURIComponent(`Portfolio Inquiry from ${data.name}`);
      const mailtoBody = encodeURIComponent(
        `Hi Abdul,\n\n${data.message}\n\nFrom: ${data.name} (${data.email})`
      );
      window.location.href = `mailto:${profileData.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      setSubmitSuccess(true);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-5 position-relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">Get in Touch</span>
          <h2 className="section-title">Contact & Communication</h2>
          <p className="section-subtitle">
            Open to discussing DevOps, AWS cloud architecture, CI/CD automation, and infrastructure engineering opportunities.
          </p>
        </motion.div>

        <div className="row g-4 align-items-stretch">
          {/* Direct Channels Column */}
          <div className="col-12 col-lg-5">
            <div className="glass-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between">
              <div>
                <h3 className="h4 fw-bold mb-2" style={{ color: 'var(--text-heading)' }}>
                  Direct Channels
                </h3>
                <p className="text-secondary small mb-4 leading-relaxed">
                  Feel free to reach out directly via email, phone, or LinkedIn. I typically respond within 24 hours.
                </p>

                <div className="d-flex flex-column gap-3 mb-4">
                  {/* Email */}
                  <a
                    href={`mailto:${profileData.email}`}
                    className="contact-channel-card"
                    aria-label="Send email to Abdul Ahad"
                  >
                    <div className="channel-icon-box" style={{ background: 'rgba(0, 240, 255, 0.1)', color: '#00f0ff' }}>
                      <FiMail size={20} />
                    </div>
                    <div className="flex-grow-1">
                      <span className="d-block font-monospace text-uppercase small text-secondary" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                        Email
                      </span>
                      <span className="fw-semibold small text-break" style={{ color: 'var(--text-heading)', fontSize: '0.925rem' }}>
                        {profileData.email}
                      </span>
                    </div>
                    <FiArrowUpRight className="channel-arrow flex-shrink-0" size={18} />
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${profileData.phone.replace(/\s+/g, '')}`}
                    className="contact-channel-card"
                    aria-label="Call Abdul Ahad"
                  >
                    <div className="channel-icon-box" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                      <FiPhone size={20} />
                    </div>
                    <div className="flex-grow-1">
                      <span className="d-block font-monospace text-uppercase small text-secondary" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                        Phone
                      </span>
                      <span className="fw-semibold small" style={{ color: 'var(--text-heading)', fontSize: '0.925rem' }}>
                        {profileData.phone}
                      </span>
                    </div>
                    <FiArrowUpRight className="channel-arrow flex-shrink-0" size={18} />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={profileData.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-channel-card"
                    aria-label="Abdul Ahad LinkedIn"
                  >
                    <div className="channel-icon-box" style={{ background: 'rgba(2, 132, 199, 0.1)', color: '#38bdf8' }}>
                      <FiLinkedin size={20} />
                    </div>
                    <div className="flex-grow-1">
                      <span className="d-block font-monospace text-uppercase small text-secondary" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                        LinkedIn
                      </span>
                      <span className="fw-semibold small" style={{ color: 'var(--text-heading)', fontSize: '0.925rem' }}>
                        linkedin.com/in/abdul-ahad-94007a27a
                      </span>
                    </div>
                    <FiArrowUpRight className="channel-arrow flex-shrink-0" size={18} />
                  </a>

                  {/* Location */}
                  <div className="contact-channel-card">
                    <div className="channel-icon-box" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                      <FiMapPin size={20} />
                    </div>
                    <div className="flex-grow-1">
                      <span className="d-block font-monospace text-uppercase small text-secondary" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
                        Location
                      </span>
                      <span className="fw-semibold small" style={{ color: 'var(--text-heading)', fontSize: '0.925rem' }}>
                        {profileData.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status footer pill */}
              <div className="pt-3 border-top border-white/10 d-flex flex-wrap align-items-center justify-content-between gap-2 text-secondary small font-monospace">
                <div className="d-flex align-items-center gap-2">
                  <span className="p-1 rounded-circle bg-emerald-400 d-inline-block" style={{ width: 8, height: 8 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Status: Active & Available</span>
                </div>
                <div className="d-flex align-items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                  <FiClock size={13} />
                  <span>PKT (UTC+5)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="col-12 col-lg-7">
            <div className="glass-card p-4 p-md-5 h-100">
              <div className="mb-4">
                <h3 className="h4 fw-bold mb-1" style={{ color: 'var(--text-heading)' }}>
                  Send a Message
                </h3>
                <p className="text-secondary small mb-0">
                  Have an infrastructure challenge, cloud project, or role opening? Fill out the details below.
                </p>
              </div>

              {submitSuccess && (
                <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 d-flex align-items-start gap-2.5 small">
                  <FiCheckCircle size={18} className="mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="fw-bold">Message formatted successfully!</div>
                    <div>Thank you for reaching out. I will respond to your inquiry shortly.</div>
                    {fallbackNotice && <div className="mt-1 text-slate-300 small">{fallbackNotice}</div>}
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 d-flex align-items-center gap-2 small">
                  <FiAlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
                {/* Name Field */}
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-1.5">
                    <label htmlFor="contact-name" className="form-label font-monospace small fw-semibold text-uppercase tracking-wider mb-0" style={{ color: 'var(--text-heading)', fontSize: '0.78rem' }}>
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                  </div>
                  <input
                    id="contact-name"
                    type="text"
                    {...register('name')}
                    placeholder="e.g. John Doe"
                    className={`modern-form-input ${errors.name ? 'is-invalid' : ''}`}
                  />
                  {errors.name && (
                    <span className="text-danger small mt-1 d-block font-monospace" style={{ fontSize: '0.78rem' }}>
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-1.5">
                    <label htmlFor="contact-email" className="form-label font-monospace small fw-semibold text-uppercase tracking-wider mb-0" style={{ color: 'var(--text-heading)', fontSize: '0.78rem' }}>
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                  </div>
                  <input
                    id="contact-email"
                    type="email"
                    {...register('email')}
                    placeholder="john@example.com"
                    className={`modern-form-input ${errors.email ? 'is-invalid' : ''}`}
                  />
                  {errors.email && (
                    <span className="text-danger small mt-1 d-block font-monospace" style={{ fontSize: '0.78rem' }}>
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <div className="d-flex align-items-center justify-content-between mb-1.5">
                    <label htmlFor="contact-message" className="form-label font-monospace small fw-semibold text-uppercase tracking-wider mb-0" style={{ color: 'var(--text-heading)', fontSize: '0.78rem' }}>
                      Message <span className="text-cyan-400">*</span>
                    </label>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={5}
                    {...register('message')}
                    placeholder="Detail your infrastructure requirements, project scope, or opportunity..."
                    className={`modern-form-input ${errors.message ? 'is-invalid' : ''}`}
                    style={{ resize: 'vertical' }}
                  />
                  {errors.message && (
                    <span className="text-danger small mt-1 d-block font-monospace" style={{ fontSize: '0.78rem' }}>
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-cyber-primary py-3 w-100 mt-2 d-inline-flex align-items-center justify-content-center gap-2"
                  style={{ fontSize: '0.975rem' }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
