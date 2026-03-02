'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Code, ArrowRight } from 'lucide-react'
import { PortfolioData, iconMap } from './types'

interface SkillsSectionProps {
  data: PortfolioData
}

export default function SkillsSection({ data }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-32 px-3 sm:px-4 lg:px-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-purple-500/10 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-pink-500/10 rounded-full blur-xl sm:blur-2xl animate-bounce delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-600 dark:text-purple-400 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50"
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Code className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
            <span>Skills & Technologies</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight block">
              Technologies
            </span>
            <motion.span 
              className="text-gray-900 dark:text-white relative block leading-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              I Master
              <motion.div
                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.span>
          </motion.h2>

          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Crafting exceptional digital experiences with cutting-edge technologies and modern frameworks
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-12 sm:mb-16">
          {data.skills.map((skillGroup: any, index: number) => {
            const colorMap: Record<string, { 
              bg: string; darkBg: string; text: string; gradient: string; shadow: string; border: string;
            }> = {
              blue: { bg: 'bg-blue-50', darkBg: 'dark:bg-blue-900/10', text: 'text-blue-600', gradient: 'from-blue-400 via-blue-500 to-blue-600', shadow: 'shadow-blue-500/25', border: 'border-blue-200/50 dark:border-blue-700/50' },
              green: { bg: 'bg-emerald-50', darkBg: 'dark:bg-emerald-900/10', text: 'text-emerald-600', gradient: 'from-emerald-400 via-emerald-500 to-emerald-600', shadow: 'shadow-emerald-500/25', border: 'border-emerald-200/50 dark:border-emerald-700/50' },
              purple: { bg: 'bg-purple-50', darkBg: 'dark:bg-purple-900/10', text: 'text-purple-600', gradient: 'from-purple-400 via-purple-500 to-purple-600', shadow: 'shadow-purple-500/25', border: 'border-purple-200/50 dark:border-purple-700/50' },
              orange: { bg: 'bg-orange-50', darkBg: 'dark:bg-orange-900/10', text: 'text-orange-600', gradient: 'from-orange-400 via-orange-500 to-orange-600', shadow: 'shadow-orange-500/25', border: 'border-orange-200/50 dark:border-orange-700/50' }
            }
            const color = colorMap[skillGroup.color] || colorMap.blue
            const IconComponent = iconMap[skillGroup.icon] || Code

            return (
              <motion.div
                key={index}
                className={`group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-3 sm:p-4 lg:p-5 rounded-xl sm:rounded-2xl border ${color.border} transition-all duration-500 overflow-hidden touch-manipulation`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.98 }}
                style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)" }}
              >
                {/* Animated background gradient */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${color.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  whileHover={{ opacity: 0.1 }}
                />
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gradient-to-r ${color.gradient} rounded-full opacity-0 group-hover:opacity-60`}
                      style={{ left: `${20 + i * 30}%`, top: `${20 + i * 20}%` }}
                      animate={{ y: [0, -15, 0], opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
                      transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.5 }}
                    />
                  ))}
                </div>
                
                {/* Icon container */}
                <motion.div 
                  className={`relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${color.bg} ${color.darkBg} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-5 ${color.shadow} border ${color.border}`}
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0], transition: { duration: 0.6 } }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5, type: "spring" }}
                >
                  <motion.div 
                    className={`${color.text} relative z-10`}
                    whileHover={{ scale: 1.1 }}
                    animate={{ rotateY: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </motion.div>
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${color.gradient} rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20`}
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
                
                {/* Title */}
                <motion.h3 
                  className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 lg:mb-5 relative leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  {skillGroup.category}
                  <motion.div
                    className={`absolute -bottom-0.5 sm:-bottom-1 left-0 h-0.5 bg-gradient-to-r ${color.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.8, duration: 0.8 }}
                  />
                </motion.h3>
                
                {/* Technologies list */}
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  {skillGroup.technologies.map((tech: any, techIndex: number) => (
                    <motion.div 
                      key={techIndex} 
                      className="group/tech relative"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + techIndex * 0.1 + 0.4, duration: 0.5 }}
                    >
                      <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                        <motion.span 
                          className="text-gray-700 dark:text-gray-300 font-semibold text-xs sm:text-sm"
                          whileHover={{ x: 3, color: "#3B82F6" }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech.name}
                        </motion.span>
                        <motion.span 
                          className={`text-xs font-bold ${color.text} px-1.5 py-0.5 rounded-full ${color.bg} ${color.darkBg}`}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + techIndex * 0.1 + 0.6, type: "spring" }}
                        >
                          {tech.level}%
                        </motion.span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="relative">
                        <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-1 sm:h-1.5 overflow-hidden backdrop-blur-sm">
                          <motion.div
                            className={`h-1 sm:h-1.5 rounded-full bg-gradient-to-r ${color.gradient} relative overflow-hidden`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tech.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, delay: index * 0.1 + techIndex * 0.2 + 0.7, ease: "easeOut" }}
                            whileHover={{ boxShadow: `0 0 15px rgba(59, 130, 246, 0.5)`, transition: { duration: 0.3 } }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Tech description */}
                      <motion.p 
                        className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 sm:mt-2 leading-relaxed opacity-0 group-hover/tech:opacity-100 transition-all duration-300 max-h-8 sm:max-h-none overflow-hidden"
                        initial={{ y: 10, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {tech.description}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${color.gradient} opacity-0 group-hover:opacity-10 blur-xl`}
                  whileHover={{ opacity: 0.1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: `linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899)`
              }}
              animate={{ y: [-20, -80, -20], opacity: [0, 0.6, 0], scale: [0, 1, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-lg cursor-pointer text-sm sm:text-base touch-manipulation"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Ready to collaborate?</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
