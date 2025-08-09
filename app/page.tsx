'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from "framer-motion"
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Database, 
  Server, 
  Globe, 
  Menu, 
  X, 
  ChevronRight, 
  Download, 
  MapPin, 
  Calendar, 
  Phone, 
  Star, 
  Eye, 
  GitFork,
  ArrowUp,
  Zap,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Sun,
  Moon,
  MoonStar,
  Settings,
} from 'lucide-react'

// Icon mapping for dynamic icons
const iconMap: Record<string, any> = {
  Globe,
  Server,
  Database,
  Code,
  Calendar,
  CheckCircle,
  Users,
  Award,
}

interface PortfolioData {
  personal: any
  about: any
  stats: any[]
  skills: any[]
  projects: any[]
  testimonials: any[]
}

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollY, setScrollY] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [data, setData] = useState<PortfolioData | null>(null)
  const [gitHubStats, setGitHubStats] = useState<Record<string, any>>({})
  const [loadingGitHubStats, setLoadingGitHubStats] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Fetch real GitHub stats
  const fetchGitHubStats = async (repo: string) => {
    try {
      const response = await fetch(`/api/github/${repo}`)
      const data = await response.json()
      
      if (response.ok) {
        return {
          stars: data.stars,
          forks: data.forks,
          watchers: data.watchers,
          language: data.language,
          updated: data.updated,
          description: data.description,
          topics: data.topics
        }
      } else {
        console.warn(`GitHub API error for ${repo}:`, data.error)
        return null
      }
    } catch (error) {
      console.error(`Error fetching GitHub stats for ${repo}:`, error)
      return null
    }
  }

  // Load GitHub stats for all projects
  const loadGitHubStats = async (projects: any[]) => {
    setLoadingGitHubStats(true)
    
    const statsPromises = projects.map(async (project) => {
      if (project.github) {
        // Extract repo name from GitHub URL
        const repoMatch = project.github.match(/github\.com\/dipu67\/(.+)/)
        if (repoMatch) {
          const repoName = repoMatch[1]
          const stats = await fetchGitHubStats(repoName)
          return { id: project.id, stats }
        }
      }
      return { id: project.id, stats: null }
    })

    const results = await Promise.all(statsPromises)
    const statsMap: Record<string, any> = {}
    
    results.forEach(({ id, stats }) => {
      if (stats) {
        statsMap[id] = stats
      }
    })
    
    setGitHubStats(statsMap)
    setLoadingGitHubStats(false)
    setLastUpdated(new Date())
  }

  // Contact form handlers
  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      setSubmitMessage('Please fill in all fields')
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitMessage('')
        setSubmitStatus('idle')
      }, 3000)
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submit',
          ...contactForm
        }),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubmitMessage('Message sent successfully! I\'ll get back to you soon.')
        setSubmitStatus('success')
        // Reset form
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setSubmitMessage(data.error || 'Failed to send message. Please try again.')
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitMessage('Failed to send message. Please check your connection and try again.')
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('')
        setSubmitStatus('idle')
      }, 5000)
    }
  }

  useEffect(() => {
    setMounted(true)
    loadPortfolioData()
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setShowBackToTop(currentScrollY > 400)
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const scrollPosition = currentScrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const loadPortfolioData = async () => {
    try {
      const response = await fetch('/api/portfolio')
      const portfolioData = await response.json()
      setData(portfolioData)
      
      // Load real GitHub stats after portfolio data is loaded
      if (portfolioData.projects) {
        loadGitHubStats(portfolioData.projects)
      }
    } catch (error) {
      console.error('Failed to load portfolio data:', error)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!mounted || !data) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      {/* Fully Responsive Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 lg:h-18">
            <motion.div 
              className="font-bold text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              &lt;DevPortfolio/&gt;
            </motion.div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex space-x-1 lg:space-x-2">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className={`px-3 lg:px-4 py-2 rounded-lg capitalize transition-all duration-300 relative overflow-hidden group text-sm lg:text-base ${
                    activeSection === item
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </motion.a>
              ))}
            </div>

            {/* Enhanced Mobile-First Controls */}
            <div className="flex items-center space-x-2 text-black dark:text-white sm:space-x-3">
            
              
              <motion.button
                className="md:hidden p-2 sm:p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 touch-manipulation"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Fully Responsive Mobile Navigation */}
        <motion.div
          className={`md:hidden overflow-hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0, 
            opacity: isMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 shadow-lg">
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className="block py-4 px-4 capitalize text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-300 text-lg font-medium touch-manipulation active:bg-blue-50 dark:active:bg-blue-900/20"
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.98, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                >
                  <div className="flex items-center justify-between">
                    <span>{item}</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </div>
                </motion.a>
              ))}
              
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Fully Responsive Hero Section */}
      <section id="home" className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-3 sm:px-4 lg:px-8 relative overflow-hidden min-h-screen flex items-center">
        {/* Responsive Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-pink-400/20 to-blue-600/20 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="text-center">
            {/* Responsive Profile Picture with Enhanced Mobile UX */}
            <motion.div 
              className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-6 sm:mb-8 group"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <motion.div 
                className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-0.5 sm:p-1"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
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
              
              {/* Responsive status indicators */}
              <motion.div 
                className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 sm:border-4 border-white dark:border-gray-900 flex items-center justify-center shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <motion.div 
                  className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-white rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              <motion.div 
                className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ 
                  delay: 1,
                  duration: 0.5,
                  type: "spring"
                }}
                whileHover={{ scale: 1.2 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 lg:w-4 lg:h-4 text-white m-0.5 sm:m-1" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Fully Responsive Title with Mobile-First Typography */}
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
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
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
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                </motion.div>
                <span className="text-gray-600 dark:text-gray-400 text-center">{data.personal.tagline}</span>
                <motion.div 
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Mobile-Optimized Description */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 lg:mb-12 max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-2 sm:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
            >
              {data.personal.description}
            </motion.p>

            {/* Fully Responsive CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-14 lg:mb-16 px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg overflow-hidden text-sm sm:text-base touch-manipulation"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="flex items-center justify-center space-x-2 relative z-10"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Explore My Work</span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
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
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "#3B82F6"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="flex items-center justify-center space-x-2 relative z-10"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Let's Connect</span>
                </motion.span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 0.1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>

            {/* Mobile-First Responsive Stats Grid */}
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
                    transition={{ 
                      delay: 2.8 + index * 0.1, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-3 rounded-lg sm:rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20 flex items-center justify-center`}
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-${stat.color}-600`} />
                    </motion.div>
                    <motion.div 
                      className={`text-xl sm:text-2xl lg:text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-1`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ 
                        delay: 3 + index * 0.1,
                        duration: 0.5,
                        type: "spring"
                      }}
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

      {/* Fully Responsive About Section */}
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
            {/* Content Column - Mobile First */}
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

              {/* Mobile-Optimized Info Cards */}
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

              {/* Mobile-Friendly CTA Button */}
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

            {/* Highlights Card - Responsive */}
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

      {/* Fully Responsive Ultra-Enhanced Skills Section */}
      <section id="skills" className="py-16 sm:py-24 lg:py-32 px-3 sm:px-4 lg:px-8 relative overflow-hidden">
        {/* Responsive animated background */}
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

          {/* Mobile-First Responsive Skills Grid - Compact Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-12 sm:mb-16">
            {data.skills.map((skillGroup: any, index: number) => {
              const colorMap: Record<string, { 
                bg: string; 
                darkBg: string; 
                text: string; 
                gradient: string;
                shadow: string;
                border: string;
              }> = {
                blue: { 
                  bg: 'bg-blue-50', 
                  darkBg: 'dark:bg-blue-900/10', 
                  text: 'text-blue-600', 
                  gradient: 'from-blue-400 via-blue-500 to-blue-600',
                  shadow: 'shadow-blue-500/25',
                  border: 'border-blue-200/50 dark:border-blue-700/50'
                },
                green: { 
                  bg: 'bg-emerald-50', 
                  darkBg: 'dark:bg-emerald-900/10', 
                  text: 'text-emerald-600', 
                  gradient: 'from-emerald-400 via-emerald-500 to-emerald-600',
                  shadow: 'shadow-emerald-500/25',
                  border: 'border-emerald-200/50 dark:border-emerald-700/50'
                },
                purple: { 
                  bg: 'bg-purple-50', 
                  darkBg: 'dark:bg-purple-900/10', 
                  text: 'text-purple-600', 
                  gradient: 'from-purple-400 via-purple-500 to-purple-600',
                  shadow: 'shadow-purple-500/25',
                  border: 'border-purple-200/50 dark:border-purple-700/50'
                },
                orange: { 
                  bg: 'bg-orange-50', 
                  darkBg: 'dark:bg-orange-900/10', 
                  text: 'text-orange-600', 
                  gradient: 'from-orange-400 via-orange-500 to-orange-600',
                  shadow: 'shadow-orange-500/25',
                  border: 'border-orange-200/50 dark:border-orange-700/50'
                }
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
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {/* Animated background gradient */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${color.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    whileHover={{ opacity: 0.1 }}
                  />
                  
                  {/* Responsive floating particles */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-gradient-to-r ${color.gradient} rounded-full opacity-0 group-hover:opacity-60`}
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 20}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0, 0.6, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Responsive icon container - Compact */}
                  <motion.div 
                    className={`relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${color.bg} ${color.darkBg} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-5 ${color.shadow} border ${color.border}`}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.6 }
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5, type: "spring" }}
                  >
                    <motion.div 
                      className={`${color.text} relative z-10`}
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        rotateY: [0, 180, 360],
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </motion.div>
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${color.gradient} rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-20`}
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  {/* Responsive title - Compact */}
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
                  
                  {/* Mobile-optimized technologies list - Compact */}
                  <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                    {skillGroup.technologies.map((tech: any, techIndex: number) => (
                      <motion.div 
                        key={techIndex} 
                        className="group/tech relative"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          delay: index * 0.1 + techIndex * 0.1 + 0.4,
                          duration: 0.5 
                        }}
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
                        
                        {/* Responsive progress bar - Compact */}
                        <div className="relative">
                          <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-1 sm:h-1.5 overflow-hidden backdrop-blur-sm">
                            <motion.div
                              className={`h-1 sm:h-1.5 rounded-full bg-gradient-to-r ${color.gradient} relative overflow-hidden`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${tech.level}%` }}
                              viewport={{ once: true }}
                              transition={{ 
                                duration: 2, 
                                delay: index * 0.1 + techIndex * 0.2 + 0.7,
                                ease: "easeOut"
                              }}
                              whileHover={{
                                boxShadow: `0 0 15px rgba(59, 130, 246, 0.5)`,
                                transition: { duration: 0.3 }
                              }}
                            >
                              {/* Shimmer effect */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ 
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                              />
                            </motion.div>
                          </div>
                        </div>
                        
                        {/* Mobile-friendly tech description */}
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

          {/* Responsive floating particles animation */}
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
                animate={{
                  y: [-20, -80, -20],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Mobile-optimized call to action */}
          <motion.div
            className="text-center mt-12 sm:mt-16 lg:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-lg cursor-pointer text-sm sm:text-base touch-manipulation"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
              }}
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

      {/* Fully Responsive Projects Section */}
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
                    onClick={() => loadGitHubStats(data.projects)}
                    className="text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full flex items-center gap-2 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
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

          {/* Mobile-First Responsive Projects Grid - Compact Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
            {data.projects.filter((project: any) => project.visible !== false).map((project: any, index: number) => (
              <motion.div
                key={project.id}
                className="group bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Responsive project image/hero - Compact with flexible image support */}
                <div className="h-36 sm:h-40 lg:h-44 relative overflow-hidden rounded-t-xl sm:rounded-t-2xl">
                  {/* Conditional rendering for image vs gradient */}
                  {project.image && (project.image.startsWith('http') || project.image.startsWith('/')) ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${project.image || 'bg-gradient-to-br from-blue-500 to-purple-600'}`} />
                  )}
                  
                  <motion.div 
                    className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                  />
                  
                  {/* Enhanced Mobile-optimized badges - Always Visible */}
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
                  
                  {/* Mobile-friendly stats overlay - Enhanced with Real GitHub Data */}
                  <motion.div 
                    className="absolute bottom-6  left-2  flex flex-wrap gap-1.5 sm:gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    {/* Live GitHub Stats Indicator */}
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

                {/* Mobile-optimized content - Compact */}
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

                  {/* Mobile-first features list */}
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

                  {/* Responsive technology tags */}
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

                  {/* Enhanced Action Buttons - Source Code & Live Demo */}
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
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Source Code</span>
                      <motion.div
                        className="w-0 group-hover:w-1 h-1 bg-white rounded-full transition-all duration-300"
                      />
                    </motion.a>
                    
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg touch-manipulation"
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                      }}
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

          {/* Mobile-friendly CTA */}
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
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>View All Projects on GitHub</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
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
              Don't just take my word for it - hear from satisfied clients about their experience
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
                  "{testimonial.content}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fully Responsive Contact Section */}
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
              Let's Work Together
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
              Ready to bring your ideas to life? Let's discuss your next project and create something amazing
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Contact Info - Mobile First */}
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
                Let's Connect
              </motion.h3>
              
              {/* Mobile-Optimized Contact Cards */}
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

              {/* Mobile-Friendly Social Links */}
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
                      href={social.href}
                      className={`w-12 h-12 sm:w-14 sm:h-14 ${social.color} text-white rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg touch-manipulation`}
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        delay: 0.8 + index * 0.1, 
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        scale: 1.1, 
                        y: -2,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Mobile-First Contact Form */}
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
              
              <form className="space-y-4 sm:space-y-6" onSubmit={handleContactSubmit}>
                {/* Submit Status Message */}
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

                {/* Responsive form grid */}
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
                      onChange={handleContactInputChange}
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
                      onChange={handleContactInputChange}
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
                    onChange={handleContactInputChange}
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
                    onChange={handleContactInputChange}
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

      {/* Enhanced Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="font-bold text-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              &lt;DevPortfolio/&gt;
            </div>
            <p className="text-gray-400 mb-8 text-lg">
              Building amazing web experiences with modern technologies
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { icon: Github, href: data.personal.social.github },
                { icon: Linkedin, href: data.personal.social.linkedin },
                { icon: Mail, href: data.personal.social.email }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-125"
                >
                  <social.icon className="w-8 h-8" />
                </a>
              ))}
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © 2025 My Portfolio. Built with Next.js, TypeScript, and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Fully Responsive Back to Top Button */}
      {showBackToTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl z-50 flex items-center justify-center touch-manipulation"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ y: [-1, 1, -1] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        </motion.button>
      )}
    </div>
  )
}
