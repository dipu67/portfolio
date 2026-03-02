'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Calendar, 
  Download, 
  ArrowRight, 
  Users, 
  Sparkles, 
  CheckCircle 
} from 'lucide-react'
import { PortfolioData } from './types'

interface AboutSectionProps {
  data: PortfolioData
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 px-3 sm:px-4 lg:px-8 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>About Me</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            {data.about.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            {data.about.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Content Column */}
          <motion.div 
            className="space-y-6 sm:space-y-8 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              {data.about.mainTitle}
            </h3>
            
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {data.about.description.map((paragraph: string, index: number) => (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Info Cards */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <motion.div 
                className="flex items-center space-x-3 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">{data.personal.location}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-700/50"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">Available for Projects</span>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.a
              href={data.personal.resumeUrl}
              className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 shadow-xl text-sm sm:text-base w-full sm:w-auto touch-manipulation"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Download Resume</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.a>
          </motion.div>

          {/* Highlights Card */}
          <motion.div 
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-2xl transform hover:rotate-1 transition-transform duration-500"
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h4 
                className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 flex items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                What I Bring to Your Project
              </motion.h4>
              
              <div className="space-y-4 sm:space-y-6">
                {data.about.highlights.map((item: any, index: number) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-3 sm:space-x-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <motion.div 
                      className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-semibold text-base sm:text-lg mb-1 leading-tight">{item.title}</h5>
                      <p className="text-white/80 text-sm sm:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
