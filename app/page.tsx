'use client'

import React, { useState, useEffect } from 'react'
import { PortfolioData } from './components/types'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadPortfolioData = async () => {
    try {
      const response = await fetch('/api/portfolio')
      const portfolioData = await response.json()
      setData(portfolioData)
      
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
      <Header 
        scrollY={scrollY} 
        activeSection={activeSection} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      <HeroSection data={data} />
      <AboutSection data={data} />
      <SkillsSection data={data} />
      <ProjectsSection 
        data={data} 
        gitHubStats={gitHubStats} 
        loadingGitHubStats={loadingGitHubStats} 
        lastUpdated={lastUpdated} 
        onRefreshStats={() => loadGitHubStats(data.projects)} 
      />
      <TestimonialsSection data={data} />
      <ContactSection 
        data={data} 
        contactForm={contactForm} 
        onInputChange={handleContactInputChange} 
        onSubmit={handleContactSubmit} 
        isSubmitting={isSubmitting} 
        submitMessage={submitMessage} 
        submitStatus={submitStatus} 
      />
      <Footer data={data} />
      <BackToTop show={showBackToTop} onClick={scrollToTop} />
    </div>
  )
}
