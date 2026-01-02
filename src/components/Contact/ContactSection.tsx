'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Linkedin, Instagram, Mail, MapPin, Loader2 } from 'lucide-react'
import emailjs from '@emailjs/browser'
import type { FormData, SocialLink } from '../../types'

const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:Jaman@myazlifresh.com',
    color: 'hover:text-accent'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/jamanudeenp/',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/jamanudeenp?igsh=MWxuN3VxNXhsdzd5Mg%3D%3D&utm_source=qr',
    color: 'hover:text-pink-600'
  }
]

const ContactSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    // Check honeypot field for spam
    if (data.honeypot) {
      return // It's spam, don't submit
    }

    setIsSubmitting(true)

    // 🔴 KEYS: These read from your .env.local file
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

    // Check if keys exist before sending
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS Env Variables are missing!')
      setSubmitStatus('error')
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
      return
    }

    // Prepare data for EmailJS (Mapping your form fields to Template variables)
    const templateParams = {
        user_name: data.name,
        user_email: data.email,
        message: data.message
    }

    try {
      // Send directly to EmailJS
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

      setSubmitStatus('success')
      reset() // Clear form

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-32 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-page-contact-bg-left to-page-contact-bg-right"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6">
            Let&apos;s Build Together
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-3xl mx-auto px-2">
            Whether you&apos;re interested in partnership opportunities, want to learn more about our mission, or simply want to connect we&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 relative">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-[60]"
          >
            <div className="bg-[var(--card-bg)] p-6 sm:p-8 rounded-lg border-2 border-primary-new">
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                {/* Honeypot field for spam protection */}
                <input
                  type="text"
                  {...register('honeypot')}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Name field */}
                <div>
                  <label htmlFor="name" className="block text-[var(--text-primary)] font-medium mb-2 text-sm sm:text-base">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: {
                        value: 2,
                        message: 'Name must be at least 2 characters'
                      }
                    })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-primary-new rounded-lg focus:outline-none focus:border-secondary-new bg-[var(--card-bg)] text-[var(--text-primary)]" 
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-error-alert text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-[var(--text-primary)] font-medium mb-2 text-sm sm:text-base">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-primary-new rounded-lg focus:outline-none focus:border-secondary-new bg-[var(--card-bg)] text-[var(--text-primary)]"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-error-alert text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="message" className="block text-[var(--text-primary)] font-medium mb-2 text-sm sm:text-base">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', {
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-primary-new rounded-lg focus:outline-none focus:border-secondary-new bg-[var(--card-bg)] text-[var(--text-primary)] resize-none"
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="text-error-alert text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-[#03D6C4] text-white flex items-center justify-center gap-2"
                onMouseEnter={(e) => {
                  if (!isSubmitting && !document.documentElement.classList.contains('dark')) {
                    e.currentTarget.style.backgroundColor = '#02B6A5';
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!document.documentElement.classList.contains('dark')) {
                    e.currentTarget.style.backgroundColor = '#03D6C4';
                    e.currentTarget.style.color = '#FFFFFF';
                  }
                }}
              >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 h-5 w-5 text-white" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-secondary-new/10 border border-secondary-new/30 text-primary-new rounded-lg">
                    Thank you for your message! We&apos;ll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-error-alert/10 border border-error-alert/30 text-error-alert rounded-lg">
                    Something went wrong. Please try again later.
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 relative z-[60]"
          >
            {/* Contact details */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-4 sm:mb-6">
                Get in Touch
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <a 
                  href="mailto:Jaman@myazlifresh.com" 
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.location.href = 'mailto:Jaman@myazlifresh.com'
                  }}
                  className="flex items-start sm:items-center space-x-3 sm:space-x-4 hover:text-link-hover transition-colors break-words cursor-pointer"
                  aria-label="Send email to Jaman@myazlifresh.com"
                >
                  <Mail className="text-primary-new flex-shrink-0 mt-0.5 sm:mt-0 pointer-events-none" size={18} />
                  <span className="text-sm sm:text-base text-[var(--text-secondary)] break-all pointer-events-none">Jaman@myazlifresh.com</span>
                </a>
                <a 
                  href="https://g.co/kgs/h3mT45" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start sm:items-center space-x-3 sm:space-x-4 hover:text-link-hover transition-colors cursor-pointer"
                >
                  <MapPin className="text-primary-new flex-shrink-0 mt-0.5 sm:mt-0" size={18} />
                  <span className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">My Azli Fresh 
                      No :109/1 Immadihalli Main Rd, Nagondanahalli, Whitefield, Bengaluru, 560066</span>
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4">
                Follow Our Journey
              </h3>

              <div className="flex space-x-4 sm:space-x-6 relative z-10">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  const isEmail = social.name === 'Email'
                  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.stopPropagation()
                    if (isEmail) {
                      e.preventDefault()
                      window.location.href = social.url
                    }
                  }
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      onClick={handleClick}
                      {...(isEmail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                      className={`relative z-10 inline-flex items-center justify-center text-primary-new transition-colors cursor-pointer p-2 min-w-[44px] min-h-[44px] ${social.color}`}
                      aria-label={isEmail ? `Send email to ${social.url.replace('mailto:', '')}` : social.name}
                      style={{ 
                        WebkitTapHighlightColor: 'transparent'
                      }}
                    >
                      <Icon size={20} className="sm:w-6 sm:h-6 pointer-events-none" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Call to action */}
            <div className="bg-[var(--card-bg)] p-5 sm:p-6 rounded-lg border-2 border-primary-new relative z-10">
              <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">
                Partnership Inquiries
              </h4>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-3 sm:mb-4">
                Interested in partnering with My Azli Fresh? We&apos;re always looking for like-minded organizations to collaborate with.
              </p>
              <a 
                href="https://myazlifresh.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block text-sm sm:text-base no-underline relative z-10 bg-[#03D6C4] text-white px-4 py-2 rounded-lg"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection