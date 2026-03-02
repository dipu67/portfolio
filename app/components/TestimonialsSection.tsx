'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { PortfolioData } from './types'

interface TestimonialsSectionProps {
  data: PortfolioData
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            <span>Client Testimonials</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            What Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don&apos;t just take my word for it - hear from satisfied clients about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.testimonials.map((testimonial: any, index: number) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl"></div>
              
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 ${testimonial.image} rounded-2xl flex items-center justify-center text-white font-bold text-xl mr-4 shadow-lg`}>
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
              
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-gray-600 dark:text-gray-400 italic text-lg leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
