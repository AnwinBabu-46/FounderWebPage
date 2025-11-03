import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Linkedin, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

interface FormData {
  name: string
  email: string
  message: string
  honeypot?: string
}

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/jamanudeen-p',
    color: 'hover:text-blue-600'
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/myazlifresh',
    color: 'hover:text-pink-600'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://twitter.com/myazlifresh',
    color: 'hover:text-blue-400'
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

    try {
      // Simulate form submission (replace with actual service like Formspree)
      await new Promise(resolve => setTimeout(resolve, 2000))

      setSubmitStatus('success')
      reset()

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      setSubmitStatus('error')

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 md:py-32 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark-blue mb-6">
            Let's Build Together
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Whether you're interested in partnership opportunities, want to learn more about our mission, or simply want to connect — we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-peach p-8 rounded-lg border-2 border-navy">
              <h3 className="text-2xl font-bold text-navy mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  <label htmlFor="name" className="block text-navy font-medium mb-2">
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
                    className="w-full px-4 py-3 border-2 border-navy rounded-lg focus:outline-none focus:border-navy/70 bg-white"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-navy font-medium mb-2">
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
                    className="w-full px-4 py-3 border-2 border-navy rounded-lg focus:outline-none focus:border-navy/70 bg-white"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="message" className="block text-navy font-medium mb-2">
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
                    className="w-full px-4 py-3 border-2 border-navy rounded-lg focus:outline-none focus:border-navy/70 bg-white resize-none"
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    Thank you for your message! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
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
            className="space-y-8"
          >
            {/* Contact details */}
            <div>
              <h3 className="text-2xl font-bold text-navy mb-6">
                Get in Touch
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="text-navy" size={20} />
                  <span className="text-gray-700">contact@myazlifresh.com</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-navy" size={20} />
                  <span className="text-gray-700">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-navy" size={20} />
                  <span className="text-gray-700">Mumbai, India</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-xl font-bold text-navy mb-4">
                Follow Our Journey
              </h3>

              <div className="flex space-x-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-navy transition-colors ${social.color}`}
                      aria-label={social.name}
                    >
                      <Icon size={24} />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Call to action */}
            <div className="bg-peach p-6 rounded-lg border-2 border-navy">
              <h4 className="text-lg font-bold text-navy mb-2">
                Partnership Inquiries
              </h4>
              <p className="text-gray-700 mb-4">
                Interested in partnering with My Azli Fresh? We're always looking for like-minded organizations to collaborate with.
              </p>
              <button className="btn-primary">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection