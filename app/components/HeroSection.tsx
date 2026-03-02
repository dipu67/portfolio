'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Mail, 
  ArrowRight, 
  Zap, 
  Sparkles,
  Award,
} from 'lucide-react'
import { PortfolioData, iconMap } from './types'

interface HeroSectionProps {
  data: PortfolioData
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section id="home" className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-3 sm:px-4 lg:px-8 relative overflow-hidden min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-pink-400/20 to-blue-600/20 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center">
          {/* Profile Picture */}
          <motion.div 
            className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-6 sm:mb-8 group"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div 
              className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-0.5 sm:p-1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div 
                className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={data.personal.profileImage}
                  alt="Profile Picture"
                  width={180}
                  height={180}
                  className="w-full h-full object-cover rounded-full"
                  priority
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
            
            {/* Status indicators */}
            <motion.div 
              className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 sm:border-4 border-white dark:border-gray-900 flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.div 
                className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-white rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            
            <motion.div 
              className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-white m-0.5 sm:m-1" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.div 
            className="space-y-2 sm:space-y-3 lg:space-y-4 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 dark:text-white leading-tight tracking-tight"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.8, type: "spring" }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
              >
                {data.personal.name.split(' ')[0]}
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                {data.personal.name.split(' ').slice(1).join(' ')}
              </motion.span>
            </motion.h1>
            
            <motion.div 
              className="flex justify-center items-center space-x-2 text-xs sm:text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
              </motion.div>
              <span className="text-gray-600 dark:text-gray-400 text-center">{data.personal.tagline}</span>
              <motion.div 
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 lg:mb-12 max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            {data.personal.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-14 lg:mb-16 px-4 sm:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg overflow-hidden text-sm sm:text-base touch-manipulation"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span 
                className="flex items-center justify-center space-x-2 relative z-10"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span>Explore My Work</span>
                <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            <motion.a
              href="#contact"
              className="group relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm overflow-hidden text-sm sm:text-base touch-manipulation"
              whileHover={{ scale: 1.05, borderColor: "#3B82F6" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <motion.span 
                className="flex items-center justify-center space-x-2 relative z-10"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Let&apos;s Connect</span>
              </motion.span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-2xl lg:max-w-4xl mx-auto px-2 sm:px-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.8 }}
          >
            {data.stats.map((stat: any, index: number) => {
              const IconComponent = iconMap[stat.icon] || Award
              return (
                <motion.div
                  key={index}
                  className="group p-3 sm:p-4 lg:p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 2.8 + index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)", transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20 flex items-center justify-center`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-${stat.color}-600`} />
                  </motion.div>
                  <motion.div 
                    className={`text-xl sm:text-2xl lg:text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-1`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 3 + index * 0.1, duration: 0.5, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div 
                    className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3.2 + index * 0.1 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
