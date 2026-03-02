'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Github, 
  ExternalLink, 
  Code, 
  Star, 
  Eye, 
  GitFork, 
  Award, 
  CheckCircle, 
  ArrowRight 
} from 'lucide-react'
import { PortfolioData } from './types'

interface ProjectsSectionProps {
  data: PortfolioData
  gitHubStats: Record<string, any>
  loadingGitHubStats: boolean
  lastUpdated: Date | null
  onRefreshStats: () => void
}

export default function ProjectsSection({ 
  data, 
  gitHubStats, 
  loadingGitHubStats, 
  lastUpdated, 
  onRefreshStats 
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-32 px-3 sm:px-4 lg:px-8 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Award className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Featured Projects</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            My Latest Work
            <div className="flex items-center justify-center gap-3 mt-3">
              {loadingGitHubStats && (
                <motion.span 
                  className="text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full flex items-center gap-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <motion.div
                    className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Loading GitHub Stats...
                </motion.span>
              )}
              {!loadingGitHubStats && data?.projects && (
                <motion.button
                  onClick={onRefreshStats}
                  className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full flex items-center gap-2 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                    ↻
                  </motion.div>
                  Refresh Stats
                </motion.button>
              )}
              {lastUpdated && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            A showcase of recent projects demonstrating technical expertise and creative solutions
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
          {data.projects.filter((project: any) => project.visible !== false).map((project: any, index: number) => (
            <motion.div
              key={project.id}
              className="group bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.02, y: -5, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Project image/hero */}
              <div className="h-36 sm:h-40 lg:h-44 relative overflow-hidden rounded-t-xl sm:rounded-t-2xl">
                {project.image && (project.image.startsWith('http') || project.image.startsWith('/')) ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full ${project.image || 'bg-gradient-to-br from-blue-500 to-purple-600'}`} />
                )}
                
                <motion.div 
                  className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10">
                  <motion.span 
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white shadow-xl backdrop-blur-sm border border-white/20 ${
                      project.status === 'Completed' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    }`}
                    initial={{ scale: 0, x: -20, opacity: 0 }}
                    whileInView={{ scale: 1, x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {project.status}
                  </motion.span>
                </div>
                
                <div className="absolute top-3 right-3 z-10">
                  <motion.span 
                    className="inline-block bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20 shadow-xl"
                    initial={{ scale: 0, x: 20, opacity: 0 }}
                    whileInView={{ scale: 1, x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {project.type}
                  </motion.span>
                </div>
                
                {/* Stats overlay */}
                <motion.div 
                  className="absolute bottom-6 left-2 flex flex-wrap gap-1.5 sm:gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                >
                  {gitHubStats[project.id] && (
                    <motion.div 
                      className="absolute -top-6 left-0 bg-green-500/90 text-white px-2 py-1 rounded text-xs font-semibold"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      🔴 LIVE
                    </motion.div>
                  )}
                  
                  <motion.div 
                    className="relative flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20 group/stars"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold">
                      {gitHubStats[project.id]?.stars ?? project.stats.stars}
                    </span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover/stars:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {gitHubStats[project.id] ? '🔴 Live GitHub Stars' : 'GitHub Stars (Cached)'}
                    </div>
                  </motion.div>
                  <motion.div 
                    className="relative flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20 group/forks"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    <GitFork className="w-3 h-3 text-blue-400" />
                    <span className="text-xs font-semibold">
                      {gitHubStats[project.id]?.forks ?? project.stats.forks}
                    </span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover/forks:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {gitHubStats[project.id] ? '🔴 Live Repository Forks' : 'Repository Forks (Cached)'}
                    </div>
                  </motion.div>
                  <motion.div 
                    className="relative flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20 group/watchers"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    <Eye className="w-3 h-3 text-green-400" />
                    <span className="text-xs font-semibold">
                      {gitHubStats[project.id]?.watchers ?? project.stats.views}
                    </span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover/watchers:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {gitHubStats[project.id] ? '🔴 Live Watchers' : 'Project Views (Cached)'}
                    </div>
                  </motion.div>
                  {gitHubStats[project.id]?.language && (
                    <motion.div 
                      className="relative flex items-center space-x-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20 group/language"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(0,0,0,0.5)' }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Code className="w-3 h-3 text-purple-400" />
                      <span className="text-xs font-semibold">{gitHubStats[project.id].language}</span>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover/language:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        🔴 Primary Language
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 lg:p-5">
                <motion.h3 
                  className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 leading-relaxed text-sm max-h-12 overflow-hidden"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  {project.description}
                </motion.p>

                {/* Features list */}
                <motion.div 
                  className="mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-green-500" />
                    Key Features:
                  </h4>
                  <div className="grid grid-cols-1 gap-1 sm:gap-2">
                    {project.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                      <motion.div 
                        key={featureIndex} 
                        className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.05 + featureIndex * 0.05 }}
                      >
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                        <span className="leading-tight">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  {project.features.length > 3 && (
                    <motion.p 
                      className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                    >
                      +{project.features.length - 3} more features
                    </motion.p>
                  )}
                </motion.div>

                {/* Technology tags */}
                <motion.div 
                  className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                >
                  {project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                    <motion.span
                      key={techIndex}
                      className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-xs sm:text-sm rounded-full font-medium"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7 + index * 0.05 + techIndex * 0.05, type: "spring" }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs sm:text-sm rounded-full font-medium">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                >
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center space-x-2 bg-gray-900 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg touch-manipulation border border-gray-700 dark:border-gray-600"
                    whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Source Code</span>
                    <motion.div className="w-0 group-hover:w-1 h-1 bg-white rounded-full transition-all duration-300" />
                  </motion.a>
                  
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg touch-manipulation"
                    whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    <span>Live Demo</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="w-1.5 h-1.5 bg-white rounded-full opacity-75"
                    />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href={data.personal.social.github}
            className="inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 shadow-xl text-sm sm:text-base w-full sm:w-auto max-w-sm sm:max-w-none mx-auto touch-manipulation"
            whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>View All Projects on GitHub</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
