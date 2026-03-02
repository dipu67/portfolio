'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight, Github, Linkedin } from 'lucide-react'
import { PortfolioData } from './types'

interface ContactSectionProps {
  data: PortfolioData
  contactForm: { name: string; email: string; subject: string; message: string }
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  submitMessage: string
  submitStatus: 'idle' | 'success' | 'error'
}

export default function ContactSection({ 
  data, 
  contactForm, 
  onInputChange, 
  onSubmit, 
  isSubmitting, 
  submitMessage, 
  submitStatus 
}: ContactSectionProps) {
  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 px-3 sm:px-4 lg:px-8 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Get In Touch</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Let&apos;s Work Together
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Ready to bring your ideas to life? Let&apos;s discuss your next project and create something amazing
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div 
            className="space-y-6 sm:space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Let&apos;s Connect
            </motion.h3>
            
            {/* Contact Cards */}
            <div className="space-y-4 sm:space-y-6">
              {[
                { icon: Mail, title: 'Email', value: data.personal.email, href: `mailto:${data.personal.email}`, color: 'blue' },
                { icon: Phone, title: 'Phone', value: data.personal.phone, href: `tel:${data.personal.phone.replace(/\s/g, '')}`, color: 'green' },
                { icon: MapPin, title: 'Location', value: data.personal.location, href: '#', color: 'purple' }
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  className="group flex items-center space-x-4 sm:space-x-6 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 touch-manipulation"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-${contact.color}-100 dark:bg-${contact.color}-900/20 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <contact.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-${contact.color}-600`} />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-1">
                      {contact.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base truncate">
                      {contact.value}
                    </p>
                  </div>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </motion.div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div 
              className="pt-6 sm:pt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-4 sm:mb-6">
                Follow Me
              </h4>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[
                  { icon: Github, href: data.personal.social.github, color: 'bg-gray-800 hover:bg-gray-700', label: 'GitHub' },
                  { icon: Linkedin, href: data.personal.social.linkedin, color: 'bg-blue-600 hover:bg-blue-700', label: 'LinkedIn' },
                  { icon: Mail, href: data.personal.social.email, color: 'bg-red-600 hover:bg-red-700', label: 'Email' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    target='_blank'
                    href={social.href}
                    className={`w-12 h-12 sm:w-14 sm:h-14 ${social.color} text-white rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg touch-manipulation`}
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl order-1 lg:order-2 border border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.h3 
              className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Send me a message
            </motion.h3>
            
            <form className="space-y-4 sm:space-y-6" onSubmit={onSubmit}>
              {/* Status Message */}
              {submitMessage && (
                <motion.div
                  className={`p-4 rounded-lg text-sm font-medium ${
                    submitStatus === 'success' 
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700'
                      : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-700'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {submitMessage}
                </motion.div>
              )}

              {/* Form grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={onInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 text-black dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your Name"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={onInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 text-black dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={onInputChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 text-black dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Project Discussion"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
              >
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={onInputChange}
                  rows={5}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-3 sm:py-4 text-black dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-sm sm:text-base touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell me about your project..."
                ></textarea>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {contactForm.message.length}/1000 characters
                </div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2 text-sm sm:text-base touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                whileHover={{ 
                  scale: isSubmitting ? 1 : 1.02,
                  boxShadow: isSubmitting ? undefined : "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
