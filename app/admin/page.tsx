'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Eye, EyeOff, Settings, Plus, Trash2, Edit3, ArrowLeft, Image as ImageIcon, Upload, Code, Copy, Star, MessageSquare, ChevronUp, ChevronDown, GripVertical, Hash, Send, RefreshCw } from 'lucide-react'
import ImagePicker from '../components/ImagePicker'

interface PortfolioData {
  personal: any
  about: any
  stats: any[]
  skills: any[]
  projects: any[]
  testimonials: any[]
}

interface ContactMessage {
  id: number
  name: string
  email: string
  subject: string
  message: string
  status: 'unread' | 'read' | 'responded' | 'archived'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  submittedAt: string
  readAt: string | null
  respondedAt: string | null
  notes: string
}

export default function AdminPanel() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [activeTab, setActiveTab] = useState('personal')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showImagePicker, setShowImagePicker] = useState(false)
  const [currentImageField, setCurrentImageField] = useState<{
    type: 'project' | 'personal' | 'testimonial'
    index?: number
    field: string
  } | null>(null)
  const [telegramStatus, setTelegramStatus] = useState<{
    configured: boolean
    connected: boolean
    botInfo: any
  } | null>(null)
  const [telegramTesting, setTelegramTesting] = useState(false)
  const [telegramMessage, setTelegramMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const authStatus = localStorage.getItem('admin_authenticated')
    if (authStatus !== 'true') {
      router.push('/admin/login')
      return
    }
    setIsAuthenticated(true)
    loadData()
    loadMessages()
    loadTelegramStatus()
  }, [router])

  const loadData = async () => {
    try {
      const response = await fetch('/api/portfolio')
      const portfolioData = await response.json()
      setData(portfolioData)
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  const loadMessages = async () => {
    try {
      const response = await fetch('/api/contact')
      const messagesData = await response.json()
      setMessages(messagesData)
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const saveData = async () => {
    if (!data) return
    
    setIsSaving(true)
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      
      if (response.ok) {
        setSaveMessage('✅ Changes saved successfully!')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage('❌ Failed to save changes')
      }
    } catch (error) {
      console.error('Failed to save data:', error)
      setSaveMessage('❌ Failed to save changes')
    } finally {
      setIsSaving(false)
    }
  }

  const updatePersonal = (field: string, value: any) => {
    if (!data) return
    setData({
      ...data,
      personal: {
        ...data.personal,
        [field]: value
      }
    })
  }

  const updateAbout = (field: string, value: any) => {
    if (!data) return
    setData({
      ...data,
      about: {
        ...data.about,
        [field]: value
      }
    })
  }

  const updateStat = (index: number, field: string, value: any) => {
    if (!data) return
    const newStats = [...data.stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setData({ ...data, stats: newStats })
  }

  const addProject = (template?: string) => {
    if (!data) return
    
    const projectTemplates = {
      'fullstack': {
        title: 'Full Stack Web Application',
        description: 'A comprehensive web application with both frontend and backend functionality, featuring modern UI/UX design and robust server-side architecture.',
        image: 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600',
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        features: [
          'User Authentication & Authorization',
          'CRUD Operations',
          'Responsive Design',
          'API Integration',
          'Data Validation',
          'Security Features'
        ],
        type: 'Full Stack',
        status: 'In Progress'
      },
      'frontend': {
        title: 'Frontend React Application',
        description: 'Modern, responsive frontend application built with React and contemporary UI libraries for optimal user experience.',
        image: 'bg-gradient-to-br from-green-500 via-green-600 to-teal-600',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        features: [
          'Modern UI/UX Design',
          'Responsive Layout',
          'Interactive Animations',
          'Component-based Architecture',
          'State Management',
          'Performance Optimization'
        ],
        type: 'Frontend',
        status: 'In Progress'
      },
      'mobile': {
        title: 'Mobile Application',
        description: 'Cross-platform mobile application with native performance and modern mobile UI patterns.',
        image: 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600',
        technologies: ['React Native', 'TypeScript', 'Expo', 'Native Base'],
        features: [
          'Cross-platform Compatibility',
          'Native Performance',
          'Mobile-first Design',
          'Offline Capabilities',
          'Push Notifications',
          'Device Integration'
        ],
        type: 'Mobile',
        status: 'In Progress'
      },
      'api': {
        title: 'REST API Service',
        description: 'Robust and scalable REST API service with comprehensive documentation and security features.',
        image: 'bg-gradient-to-br from-orange-500 via-orange-600 to-red-600',
        technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
        features: [
          'RESTful Architecture',
          'Authentication & Authorization',
          'Data Validation',
          'API Documentation',
          'Error Handling',
          'Rate Limiting'
        ],
        type: 'Backend',
        status: 'In Progress'
      }
    }

    const selectedTemplate = template && projectTemplates[template as keyof typeof projectTemplates] 
      ? projectTemplates[template as keyof typeof projectTemplates]
      : projectTemplates.fullstack

    const newProject = {
      id: Date.now(),
      title: selectedTemplate.title,
      description: selectedTemplate.description,
      image: selectedTemplate.image,
      technologies: selectedTemplate.technologies,
      features: selectedTemplate.features,
      github: 'https://github.com/yourusername/project',
      live: 'https://project-demo.vercel.app',
      type: selectedTemplate.type,
      stats: { stars: 0, forks: 0, views: 0 },
      status: selectedTemplate.status
    }
    
    setData({
      ...data,
      projects: [...data.projects, newProject]
    })

    // Show success message
    setSaveMessage('✅ New project added successfully!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const updateProject = (index: number, field: string, value: any) => {
    if (!data) return
    const newProjects = [...data.projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    setData({ ...data, projects: newProjects })
  }

  const deleteProject = (index: number) => {
    if (!data) return
    
    const projectTitle = data.projects[index]?.title || 'this project'
    
    if (confirm(`Are you sure you want to delete "${projectTitle}"? This action cannot be undone.`)) {
      const newProjects = data.projects.filter((_, i) => i !== index)
      setData({ ...data, projects: newProjects })
      
      // Show success message
      setSaveMessage(`✅ Project "${projectTitle}" deleted successfully!`)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const duplicateProject = (index: number) => {
    if (!data) return
    
    const originalProject = data.projects[index]
    const duplicatedProject = {
      ...originalProject,
      id: Date.now(),
      title: `${originalProject.title} (Copy)`,
      status: 'In Progress'
    }
    
    const newProjects = [...data.projects]
    newProjects.splice(index + 1, 0, duplicatedProject)
    setData({ ...data, projects: newProjects })
    
    // Show success message
    setSaveMessage('✅ Project duplicated successfully!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const moveProjectUp = (index: number) => {
    if (!data || index === 0) return
    
    const newProjects = [...data.projects]
    const temp = newProjects[index]
    newProjects[index] = newProjects[index - 1]
    newProjects[index - 1] = temp
    setData({ ...data, projects: newProjects })
    
    setSaveMessage('✅ Project moved up!')
    setTimeout(() => setSaveMessage(''), 2000)
  }

  const moveProjectDown = (index: number) => {
    if (!data || index === data.projects.length - 1) return
    
    const newProjects = [...data.projects]
    const temp = newProjects[index]
    newProjects[index] = newProjects[index + 1]
    newProjects[index + 1] = temp
    setData({ ...data, projects: newProjects })
    
    setSaveMessage('✅ Project moved down!')
    setTimeout(() => setSaveMessage(''), 2000)
  }

  const moveProjectToPosition = (fromIndex: number, toIndex: number) => {
    if (!data || fromIndex === toIndex) return
    
    const newProjects = [...data.projects]
    const projectToMove = newProjects.splice(fromIndex, 1)[0]
    newProjects.splice(toIndex, 0, projectToMove)
    setData({ ...data, projects: newProjects })
    
    setSaveMessage(`✅ Project moved to position ${toIndex + 1}!`)
    setTimeout(() => setSaveMessage(''), 2000)
  }

  const toggleProjectVisibility = (index: number) => {
    if (!data) return
    
    const newProjects = [...data.projects]
    newProjects[index] = { 
      ...newProjects[index], 
      visible: newProjects[index].visible !== false ? false : true 
    }
    setData({ ...data, projects: newProjects })
    
    const isVisible = newProjects[index].visible
    setSaveMessage(`✅ Project ${isVisible ? 'shown' : 'hidden'}!`)
    setTimeout(() => setSaveMessage(''), 2000)
  }

  const loadTelegramStatus = async () => {
    try {
      const response = await fetch('/api/telegram/test')
      const result = await response.json()
      setTelegramStatus({
        configured: result.success,
        connected: result.success,
        botInfo: result.botInfo || null
      })
    } catch (error) {
      console.error('Failed to check Telegram status:', error)
      setTelegramStatus({
        configured: false,
        connected: false,
        botInfo: null
      })
    }
  }

  const testTelegram = async () => {
    setTelegramTesting(true)
    try {
      const response = await fetch('/api/telegram/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Test notification from portfolio admin panel!'
        })
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSaveMessage('✅ Test notification sent successfully!')
      } else {
        setSaveMessage('❌ Failed to send test notification')
      }
    } catch (error) {
      console.error('Failed to send test notification:', error)
      setSaveMessage('❌ Failed to send test notification')
    } finally {
      setTelegramTesting(false)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const addTestimonial = () => {
    if (!data) return
    
    const newTestimonial = {
      name: 'Client Name',
      role: 'Position at Company',
      content: 'Add your testimonial content here. Describe the experience working together and the results achieved.',
      rating: 5,
      image: 'bg-gradient-to-br from-blue-500 to-purple-500',
      company: 'Company Name'
    }
    
    setData({
      ...data,
      testimonials: [...data.testimonials, newTestimonial]
    })

    // Show success message
    setSaveMessage('✅ New testimonial added successfully!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const updateTestimonial = (index: number, field: string, value: any) => {
    if (!data) return
    const newTestimonials = [...data.testimonials]
    newTestimonials[index] = { ...newTestimonials[index], [field]: value }
    setData({ ...data, testimonials: newTestimonials })
  }

  const deleteTestimonial = (index: number) => {
    if (!data) return
    
    const testimonialName = data.testimonials[index]?.name || 'this testimonial'
    
    if (confirm(`Are you sure you want to delete the testimonial from "${testimonialName}"? This action cannot be undone.`)) {
      const newTestimonials = data.testimonials.filter((_, i) => i !== index)
      setData({ ...data, testimonials: newTestimonials })
      
      // Show success message
      setSaveMessage(`✅ Testimonial from "${testimonialName}" deleted successfully!`)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const duplicateTestimonial = (index: number) => {
    if (!data) return
    
    const originalTestimonial = data.testimonials[index]
    const duplicatedTestimonial = {
      ...originalTestimonial,
      name: `${originalTestimonial.name} (Copy)`,
      content: originalTestimonial.content
    }
    
    const newTestimonials = [...data.testimonials]
    newTestimonials.splice(index + 1, 0, duplicatedTestimonial)
    setData({ ...data, testimonials: newTestimonials })
    
    // Show success message
    setSaveMessage('✅ Testimonial duplicated successfully!')
    setTimeout(() => setSaveMessage(''), 3000)
  }

  // Message management functions
  const updateMessageStatus = async (messageId: number, status: string) => {
    try {
      const updatedMessages = messages.map(msg => 
        msg.id === messageId 
          ? { 
              ...msg, 
              status: status as any,
              readAt: status === 'read' && !msg.readAt ? new Date().toISOString() : msg.readAt,
              respondedAt: status === 'responded' && !msg.respondedAt ? new Date().toISOString() : msg.respondedAt
            }
          : msg
      )
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMessages)
      })
      
      if (response.ok) {
        setMessages(updatedMessages)
        setSaveMessage('✅ Message status updated successfully!')
        setTimeout(() => setSaveMessage(''), 3000)
      }
    } catch (error) {
      console.error('Failed to update message status:', error)
      setSaveMessage('❌ Failed to update message status')
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const updateMessagePriority = async (messageId: number, priority: string) => {
    try {
      const updatedMessages = messages.map(msg => 
        msg.id === messageId ? { ...msg, priority: priority as any } : msg
      )
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMessages)
      })
      
      if (response.ok) {
        setMessages(updatedMessages)
        setSaveMessage('✅ Message priority updated successfully!')
        setTimeout(() => setSaveMessage(''), 3000)
      }
    } catch (error) {
      console.error('Failed to update message priority:', error)
    }
  }

  const updateMessageNotes = async (messageId: number, notes: string) => {
    try {
      const updatedMessages = messages.map(msg => 
        msg.id === messageId ? { ...msg, notes } : msg
      )
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMessages)
      })
      
      if (response.ok) {
        setMessages(updatedMessages)
      }
    } catch (error) {
      console.error('Failed to update message notes:', error)
    }
  }

  const deleteMessage = async (messageId: number) => {
    const message = messages.find(msg => msg.id === messageId)
    if (!message) return

    if (confirm(`Are you sure you want to delete the message from "${message.name}"? This action cannot be undone.`)) {
      try {
        const response = await fetch(`/api/contact?id=${messageId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          setMessages(messages.filter(msg => msg.id !== messageId))
          setSaveMessage(`✅ Message from "${message.name}" deleted successfully!`)
          setTimeout(() => setSaveMessage(''), 3000)
        }
      } catch (error) {
        console.error('Failed to delete message:', error)
        setSaveMessage('❌ Failed to delete message')
        setTimeout(() => setSaveMessage(''), 3000)
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_authenticated')
    router.push('/admin/login')
  }

  const openImagePicker = (type: 'project' | 'personal' | 'testimonial', field: string, index?: number) => {
    setCurrentImageField({ type, field, index })
    setShowImagePicker(true)
  }

  const handleImageSelect = (imageUrl: string) => {
    if (!currentImageField || !data) return

    if (currentImageField.type === 'project' && currentImageField.index !== undefined) {
      updateProject(currentImageField.index, currentImageField.field, imageUrl)
    } else if (currentImageField.type === 'personal') {
      updatePersonal(currentImageField.field, imageUrl)
    } else if (currentImageField.type === 'testimonial' && currentImageField.index !== undefined) {
      updateTestimonial(currentImageField.index, currentImageField.field, imageUrl)
    }

    setShowImagePicker(false)
    setCurrentImageField(null)
  }

  if (!isAuthenticated || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile-Responsive Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-1">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="hidden sm:inline">Back to Portfolio</span>
                <span className="sm:hidden">Back</span>
              </button>
              <div className="h-4 sm:h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                <span className="hidden sm:inline">Portfolio CMS Admin</span>
                <span className="sm:hidden">Admin</span>
              </h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
              {saveMessage && (
                <span className="text-xs sm:text-sm font-medium hidden md:inline">{saveMessage}</span>
              )}
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors text-sm"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Preview</span>
              </button>
              <button
                onClick={saveData}
                disabled={isSaving}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm"
              >
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save Changes'}</span>
                <span className="sm:hidden">{isSaving ? '...' : 'Save'}</span>
              </button>
              <button
                onClick={logout}
                className="px-2 sm:px-4 py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
              >
                <span className="hidden sm:inline">Logout</span>
                <span className="sm:hidden">Exit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Mobile Save Message */}
        {saveMessage && (
          <div className="md:hidden mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg">
            <span className="text-sm font-medium text-green-800 dark:text-green-200">{saveMessage}</span>
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Mobile-Responsive Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4">
              {/* Mobile: Horizontal scroll navigation */}
              <nav className="lg:space-y-2">
                <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                  {[
                    { id: 'personal', label: 'Personal Info', icon: Settings, shortLabel: 'Personal' },
                    { id: 'about', label: 'About Section', icon: Edit3, shortLabel: 'About' },
                    { id: 'stats', label: 'Statistics', icon: Settings, shortLabel: 'Stats' },
                    { id: 'skills', label: 'Skills', icon: Settings, shortLabel: 'Skills' },
                    { id: 'projects', label: 'Projects', icon: Settings, shortLabel: 'Projects' },
                    { id: 'messages', label: `Messages (${messages.filter(m => m.status === 'unread').length})`, icon: MessageSquare, shortLabel: 'Messages' },
                    { id: 'telegram', label: 'Telegram Bot', icon: Send, shortLabel: 'Telegram' },
                    { id: 'images', label: 'Image Manager', icon: ImageIcon, shortLabel: 'Images' },
                    { id: 'testimonials', label: 'Testimonials', icon: Settings, shortLabel: 'Reviews' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 lg:w-full flex items-center space-x-2 lg:space-x-3 px-3 py-2 rounded-lg text-left transition-colors whitespace-nowrap text-sm lg:text-base ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="lg:hidden">{tab.shortLabel}</span>
                      <span className="hidden lg:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 lg:p-6">
              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-4 sm:space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        value={data.personal.name}
                        onChange={(e) => updatePersonal('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                      <input
                        type="text"
                        value={data.personal.title}
                        onChange={(e) => updatePersonal('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={data.personal.email}
                        onChange={(e) => updatePersonal('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                      <input
                        type="text"
                        value={data.personal.phone}
                        onChange={(e) => updatePersonal('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                      <input
                        type="text"
                        value={data.personal.location}
                        onChange={(e) => updatePersonal('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
                      <input
                        type="url"
                        value={data.personal.social.github}
                        onChange={(e) => updatePersonal('social', { ...data.personal.social, github: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL</label>
                      <input
                        type="url"
                        value={data.personal.social.linkedin}
                        onChange={(e) => updatePersonal('social', { ...data.personal.social, linkedin: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                        placeholder="https://linkedin.com/in/yourusername"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Resume URL</label>
                      <input
                        type="url"
                        value={data.personal.resumeUrl}
                        onChange={(e) => updatePersonal('resumeUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                        placeholder="Link to your resume/CV"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Image</label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                        <div className="flex-1 w-full">
                          <input
                            type="url"
                            value={data.personal.profileImage || ''}
                            onChange={(e) => updatePersonal('profileImage', e.target.value)}
                            placeholder="Enter image URL or use image picker"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => openImagePicker('personal', 'profileImage')}
                          className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                        >
                          <ImageIcon className="w-4 h-4" />
                          <span>Browse Images</span>
                        </button>
                      </div>
                      {data.personal.profileImage && (
                        <div className="mt-3">
                          <img
                            src={data.personal.profileImage}
                            alt="Profile preview"
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea
                      value={data.personal.description}
                      onChange={(e) => updatePersonal('description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm sm:text-base"
                      placeholder="Write a brief description about yourself..."
                    />
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === 'projects' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Projects Management</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Create, edit, and manage your portfolio projects
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => addProject('fullstack')}
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Full Stack</span>
                      </button>
                      <button
                        onClick={() => addProject('frontend')}
                        className="flex items-center space-x-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Frontend</span>
                      </button>
                      <button
                        onClick={() => addProject('mobile')}
                        className="flex items-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Mobile</span>
                      </button>
                      <button
                        onClick={() => addProject('api')}
                        className="flex items-center space-x-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>API</span>
                      </button>
                    </div>
                  </div>

                  {/* Projects Overview */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                      Projects Overview ({data.projects.length} total)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 text-xs sm:text-sm mb-4">
                      <div className="text-blue-800 dark:text-blue-200">
                        <span className="font-medium">Completed:</span> {data.projects.filter(p => p.status === 'Completed').length}
                      </div>
                      <div className="text-blue-800 dark:text-blue-200">
                        <span className="font-medium">In Progress:</span> {data.projects.filter(p => p.status === 'In Progress').length}
                      </div>
                      <div className="text-blue-800 dark:text-blue-200">
                        <span className="font-medium">Planned:</span> {data.projects.filter(p => p.status === 'Planned').length}
                      </div>
                      <div className="text-green-800 dark:text-green-200">
                        <span className="font-medium">Visible:</span> {data.projects.filter(p => p.visible !== false).length}
                      </div>
                      <div className="text-red-800 dark:text-red-200">
                        <span className="font-medium">Hidden:</span> {data.projects.filter(p => p.visible === false).length}
                      </div>
                    </div>
                    <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800/30 rounded p-2">
                      💡 <strong>Tip:</strong> Use ↑↓ arrows to reorder projects, the eye icon to show/hide, and the dropdown to jump to specific positions. Only visible projects appear on your portfolio.
                    </div>
                  </div>

                  {/* Project Ordering Help */}
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center">
                      <Hash className="w-5 h-5 mr-2" />
                      Project Display Order
                    </h3>
                    <p className="text-green-800 dark:text-green-200 text-sm mb-3">
                      Control how projects appear on your portfolio. Project #1 shows first, #2 shows second, etc.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-green-800 dark:text-green-200">
                      <div className="flex items-center space-x-2">
                        <ChevronUp className="w-4 h-4" />
                        <span>Move up in order</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ChevronDown className="w-4 h-4" />
                        <span>Move down in order</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4" />
                        <span>Jump to specific position</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {data.projects.map((project, index) => (
                      <div key={project.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-bold flex-shrink-0">
                                #{index + 1}
                              </span>
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                                {project.title || `Project ${index + 1}`}
                              </h3>
                            </div>
                            
                            {/* Mobile: Compact status badges */}
                            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                              <span className={`px-1 sm:px-2 py-1 text-xs rounded-full font-medium flex items-center ${
                                project.status === 'Completed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : project.status === 'In Progress'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' 
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              }`}>
                                <span className="block sm:hidden">
                                  {project.status === 'Completed' && '✓'}
                                  {project.status === 'In Progress' && '●'}
                                  {project.status === 'Planned' && '○'}
                                </span>
                                <span className="hidden sm:block">{project.status}</span>
                              </span>
                              
                              <span className={`px-1 sm:px-2 py-1 text-xs rounded-full font-medium flex items-center ${
                                project.visible !== false
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                              }`}>
                                {project.visible !== false ? (
                                  <>
                                    <Eye className="w-3 h-3" />
                                    <span className="hidden sm:inline ml-1">Visible</span>
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-3 h-3" />
                                    <span className="hidden sm:inline ml-1">Hidden</span>
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                          
                          {/* Mobile: Controls in separate row */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                            {/* Project Ordering Controls */}
                            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                              <button
                                onClick={() => moveProjectUp(index)}
                                disabled={index === 0}
                                className={`p-1 rounded transition-colors ${
                                  index === 0 
                                    ? 'text-gray-400 cursor-not-allowed' 
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20'
                                }`}
                                title="Move up"
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => moveProjectDown(index)}
                                disabled={index === data.projects.length - 1}
                                className={`p-1 rounded transition-colors ${
                                  index === data.projects.length - 1 
                                    ? 'text-gray-400 cursor-not-allowed' 
                                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20'
                                }`}
                                title="Move down"
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                              <select
                                value={index}
                                onChange={(e) => moveProjectToPosition(index, parseInt(e.target.value))}
                                className="text-xs bg-transparent border-none focus:ring-0 text-gray-600 dark:text-gray-300 pr-1"
                                title="Move to position"
                              >
                                {data.projects.map((_, i) => (
                                  <option key={i} value={i}>#{i + 1}</option>
                                ))}
                              </select>
                            </div>
                            
                            {/* Action buttons */}
                            <div className="flex items-center space-x-1">
                              <button
                                onClick={() => toggleProjectVisibility(index)}
                                className={`transition-colors p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                  project.visible !== false 
                                    ? 'text-green-600 hover:text-green-800' 
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                                title={project.visible !== false ? 'Hide project' : 'Show project'}
                              >
                                {project.visible !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => duplicateProject(index)}
                                className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                title="Duplicate project"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteProject(index)}
                                className="text-red-600 hover:text-red-800 transition-colors p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                                title="Delete project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                            <input
                              type="text"
                              value={project.title}
                              onChange={(e) => updateProject(index, 'title', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                            <select
                              value={project.status}
                              onChange={(e) => updateProject(index, 'status', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value="Completed">Completed</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Planned">Planned</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Type</label>
                            <select
                              value={project.type}
                              onChange={(e) => updateProject(index, 'type', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value="Full Stack">Full Stack</option>
                              <option value="Frontend">Frontend</option>
                              <option value="Backend">Backend</option>
                              <option value="Mobile">Mobile</option>
                              <option value="API">API</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub URL</label>
                            <input
                              type="url"
                              value={project.github}
                              onChange={(e) => updateProject(index, 'github', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
                            <input
                              type="url"
                              value={project.linkedin}
                              onChange={(e) => updateProject(index, 'linkedin', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Live Demo URL</label>
                            <input
                              type="url"
                              value={project.live}
                              onChange={(e) => updateProject(index, 'live', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Image</label>
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={project.image || ''}
                                  onChange={(e) => updateProject(index, 'image', e.target.value)}
                                  placeholder="Enter image URL, gradient class, or use image picker"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => openImagePicker('project', 'image', index)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                              >
                                <ImageIcon className="w-4 h-4" />
                                <span>Browse</span>
                              </button>
                            </div>
                            {project.image && (
                              <div className="mt-3">
                                {project.image.startsWith('http') || project.image.startsWith('/') ? (
                                  <img
                                    src={project.image}
                                    alt="Project preview"
                                    className="w-32 h-20 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-600"
                                  />
                                ) : (
                                  <div className={`w-32 h-20 rounded-lg ${project.image} flex items-center justify-center text-white text-sm font-medium`}>
                                    Gradient Preview
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                          <textarea
                            value={project.description}
                            onChange={(e) => updateProject(index, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Technologies (comma-separated)</label>
                          <input
                            type="text"
                            value={project.technologies.join(', ')}
                            onChange={(e) => updateProject(index, 'technologies', e.target.value.split(', ').map(tech => tech.trim()))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>

                        {/* Project Features Management */}
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Project Features</label>
                            <button
                              type="button"
                              onClick={() => {
                                const currentFeatures = project.features || []
                                updateProject(index, 'features', [...currentFeatures, 'New Feature'])
                              }}
                              className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Feature</span>
                            </button>
                          </div>
                          
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {(project.features || []).map((feature: string, featureIndex: number) => (
                              <div key={featureIndex} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={(e) => {
                                    const newFeatures = [...(project.features || [])]
                                    newFeatures[featureIndex] = e.target.value
                                    updateProject(index, 'features', newFeatures)
                                  }}
                                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                                  placeholder="Enter feature description"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newFeatures = (project.features || []).filter((_: string, i: number) => i !== featureIndex)
                                    updateProject(index, 'features', newFeatures)
                                  }}
                                  className="text-red-600 hover:text-red-700 p-1"
                                  title="Remove feature"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                            {(!project.features || project.features.length === 0) && (
                              <p className="text-gray-500 dark:text-gray-400 text-sm italic">No features added yet. Click "Add Feature" to start.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Empty state for projects */}
                    {data.projects.length === 0 && (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <Settings className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Projects Yet</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Start building your portfolio by adding your first project.
                          <br />
                          Choose from our templates or create a custom project.
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          <button
                            onClick={() => addProject('fullstack')}
                            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Full Stack Project</span>
                          </button>
                          <button
                            onClick={() => addProject('frontend')}
                            className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Frontend Project</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* About Tab */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About Section</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Main Title</label>
                    <input
                      type="text"
                      value={data.about.title}
                      onChange={(e) => updateAbout('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={data.about.subtitle}
                      onChange={(e) => updateAbout('subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description Paragraphs</label>
                    {data.about.description.map((paragraph: string, index: number) => (
                      <textarea
                        key={index}
                        value={paragraph}
                        onChange={(e) => {
                          const newDescription = [...data.about.description]
                          newDescription[index] = e.target.value
                          updateAbout('description', newDescription)
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-3"
                        placeholder={`Paragraph ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Statistics Tab */}
              {activeTab === 'stats' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Statistics</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {data.stats.map((stat, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Stat {index + 1}</h3>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Value</label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => updateStat(index, 'value', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => updateStat(index, 'label', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Management */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills Management</h2>
                    <button
                      onClick={() => {
                        const newSkill = {
                          category: 'New Category',
                          icon: 'Code',
                          color: 'blue',
                          technologies: [
                            {
                              name: 'Sample Technology',
                              level: 80,
                              description: 'Technology description'
                            }
                          ]
                        }
                        setData(prev => prev ? { ...prev, skills: [...prev.skills, newSkill] } : null)
                      }}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Skill Category</span>
                    </button>
                  </div>

                  {/* Skills Overview */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Skills Management Guide:</h3>
                    <ul className="text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside text-sm">
                      <li>Create skill categories (Frontend, Backend, Tools, etc.)</li>
                      <li>Add technologies to each category with skill levels (0-100%)</li>
                      <li>Choose appropriate icons and color themes for visual appeal</li>
                      <li>Skill levels help visitors understand your expertise depth</li>
                      <li>Use descriptive names and descriptions for each technology</li>
                    </ul>
                  </div>

                  <div className="grid gap-6">
                    {data?.skills.map((skillGroup: any, index: number) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {skillGroup.category || `Skill Category ${index + 1}`}
                          </h3>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete the "${skillGroup.category}" skill category?`)) {
                                const newSkills = data.skills.filter((_, i) => i !== index)
                                setData(prev => prev ? { ...prev, skills: newSkills } : null)
                              }
                            }}
                            className="text-red-600 hover:text-red-700 p-1"
                            title="Delete skill category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Category Name
                            </label>
                            <input
                              type="text"
                              value={skillGroup.category}
                              onChange={(e) => {
                                const newSkills = [...data.skills]
                                newSkills[index].category = e.target.value
                                setData(prev => prev ? { ...prev, skills: newSkills } : null)
                              }}
                              placeholder="e.g., Frontend Development"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Icon
                            </label>
                            <select
                              value={skillGroup.icon}
                              onChange={(e) => {
                                const newSkills = [...data.skills]
                                newSkills[index].icon = e.target.value
                                setData(prev => prev ? { ...prev, skills: newSkills } : null)
                              }}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                              <option value="Code">Code (Programming)</option>
                              <option value="Globe">Globe (Web/Internet)</option>
                              <option value="Server">Server (Backend/Infrastructure)</option>
                              <option value="Database">Database (Data Management)</option>
                              <option value="Settings">Settings (Tools/DevOps)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Color Theme
                            </label>
                            <select
                              value={skillGroup.color}
                              onChange={(e) => {
                                const newSkills = [...data.skills]
                                newSkills[index].color = e.target.value
                                setData(prev => prev ? { ...prev, skills: newSkills } : null)
                              }}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            >
                              <option value="blue">Blue (Professional)</option>
                              <option value="green">Green (Growth/Success)</option>
                              <option value="purple">Purple (Creative)</option>
                              <option value="orange">Orange (Energy/Tools)</option>
                            </select>
                          </div>
                        </div>

                        {/* Technologies in this category */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">
                              Technologies ({skillGroup.technologies?.length || 0})
                            </h4>
                            <button
                              onClick={() => {
                                const newTechnology = {
                                  name: 'New Technology',
                                  level: 80,
                                  description: 'Add description for this technology'
                                }
                                const newSkills = [...data.skills]
                                if (!newSkills[index].technologies) {
                                  newSkills[index].technologies = []
                                }
                                newSkills[index].technologies.push(newTechnology)
                                setData(prev => prev ? { ...prev, skills: newSkills } : null)
                              }}
                              className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Technology</span>
                            </button>
                          </div>

                          {skillGroup.technologies && skillGroup.technologies.length > 0 ? (
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                              {skillGroup.technologies.map((tech: any, techIndex: number) => (
                                <div key={techIndex} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border">
                                  <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      Technology #{techIndex + 1}
                                    </span>
                                    <button
                                      onClick={() => {
                                        if (confirm(`Are you sure you want to remove "${tech.name}"?`)) {
                                          const newSkills = [...data.skills]
                                          newSkills[index].technologies = newSkills[index].technologies.filter((_: any, i: number) => i !== techIndex)
                                          setData(prev => prev ? { ...prev, skills: newSkills } : null)
                                        }
                                      }}
                                      className="text-red-600 hover:text-red-700 p-1"
                                      title="Remove technology"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>

                                  <div className="grid md:grid-cols-3 gap-3">
                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Technology Name
                                      </label>
                                      <input
                                        type="text"
                                        value={tech.name}
                                        onChange={(e) => {
                                          const newSkills = [...data.skills]
                                          newSkills[index].technologies[techIndex].name = e.target.value
                                          setData(prev => prev ? { ...prev, skills: newSkills } : null)
                                        }}
                                        placeholder="e.g., React.js"
                                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                                      />
                                    </div>

                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Skill Level (0-100%)
                                      </label>
                                      <div className="flex items-center space-x-2">
                                        <input
                                          type="range"
                                          min="0"
                                          max="100"
                                          value={tech.level}
                                          onChange={(e) => {
                                            const newSkills = [...data.skills]
                                            newSkills[index].technologies[techIndex].level = parseInt(e.target.value)
                                            setData(prev => prev ? { ...prev, skills: newSkills } : null)
                                          }}
                                          className="flex-1"
                                        />
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-12">
                                          {tech.level}%
                                        </span>
                                      </div>
                                    </div>

                                    <div>
                                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                        Description
                                      </label>
                                      <input
                                        type="text"
                                        value={tech.description}
                                        onChange={(e) => {
                                          const newSkills = [...data.skills]
                                          newSkills[index].technologies[techIndex].description = e.target.value
                                          setData(prev => prev ? { ...prev, skills: newSkills } : null)
                                        }}
                                        placeholder="Brief description"
                                        className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-600 dark:text-white"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                              <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
                              <p>No technologies added yet.</p>
                              <p className="text-sm">Click "Add Technology" to start building this skill category.</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Empty state for skills */}
                    {(!data?.skills || data.skills.length === 0) && (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <Settings className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Skills Added Yet</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">Start building your skills portfolio by adding your first skill category.</p>
                        <button
                          onClick={() => {
                            const newSkill = {
                              category: 'Frontend Development',
                              icon: 'Code',
                              color: 'blue',
                              technologies: [
                                {
                                  name: 'React.js',
                                  level: 90,
                                  description: 'Modern JavaScript library for building user interfaces'
                                }
                              ]
                            }
                            setData(prev => prev ? { ...prev, skills: [newSkill] } : null)
                          }}
                          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Your First Skill Category</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Messages Management */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Messages Management</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Manage contact form submissions and client inquiries
                      </p>
                    </div>
                    
                    <button
                      onClick={loadMessages}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Refresh Messages</span>
                    </button>
                  </div>

                  {/* Messages Overview */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Messages Overview ({messages.length} total)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-blue-800 dark:text-blue-200">
                        <span className="font-medium">Unread:</span> {messages.filter(m => m.status === 'unread').length}
                      </div>
                      <div className="text-blue-800 dark:text-blue-200">
                        <span className="font-medium">Read:</span> {messages.filter(m => m.status === 'read').length}
                      </div>
                      <div className="text-blue-800 dark:text-blue-200">
                        <span className="font-medium">Responded:</span> {messages.filter(m => m.status === 'responded').length}
                      </div>
                      <div className="text-blue-800 dark:text-blue-200">
                        <span className="font-medium">High Priority:</span> {messages.filter(m => m.priority === 'high' || m.priority === 'urgent').length}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {messages.length > 0 ? (
                      messages
                        .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                        .map((message, index) => (
                        <div 
                          key={message.id} 
                          className={`bg-white dark:bg-gray-800 border rounded-xl p-6 space-y-4 ${
                            message.status === 'unread' 
                              ? 'border-blue-300 dark:border-blue-600 bg-blue-50/30 dark:bg-blue-900/10' 
                              : 'border-gray-200 dark:border-gray-600'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {message.name}
                                </h3>
                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                  message.status === 'unread' 
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                    : message.status === 'read'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                    : message.status === 'responded'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                }`}>
                                  {message.status}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                  message.priority === 'urgent' 
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                    : message.priority === 'high'
                                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                                    : message.priority === 'normal'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                }`}>
                                  {message.priority}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteMessage(message.id)}
                              className="text-red-600 hover:text-red-800 transition-colors p-1"
                              title="Delete message"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700 dark:text-gray-300">Email:</span>
                              <a href={`mailto:${message.email}`} className="text-blue-600 dark:text-blue-400 hover:underline ml-2">
                                {message.email}
                              </a>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700 dark:text-gray-300">Subject:</span>
                              <span className="ml-2 text-gray-600 dark:text-gray-400">{message.subject}</span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700 dark:text-gray-300">Submitted:</span>
                              <span className="ml-2 text-gray-600 dark:text-gray-400">
                                {new Date(message.submittedAt).toLocaleDateString()} at {new Date(message.submittedAt).toLocaleTimeString()}
                              </span>
                            </div>
                            {message.readAt && (
                              <div>
                                <span className="font-medium text-gray-700 dark:text-gray-300">Read:</span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">
                                  {new Date(message.readAt).toLocaleDateString()} at {new Date(message.readAt).toLocaleTimeString()}
                                </span>
                              </div>
                            )}
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Message:</h4>
                            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border-l-4 border-blue-500">
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {message.message}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                              <select
                                value={message.status}
                                onChange={(e) => updateMessageStatus(message.id, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                              >
                                <option value="unread">Unread</option>
                                <option value="read">Read</option>
                                <option value="responded">Responded</option>
                                <option value="archived">Archived</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                              <select
                                value={message.priority}
                                onChange={(e) => updateMessagePriority(message.id, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                              >
                                <option value="low">Low</option>
                                <option value="normal">Normal</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                              </select>
                            </div>

                            <div className="md:col-span-1">
                              <a
                                href={`mailto:${message.email}?subject=Re: ${message.subject}&body=Hi ${message.name},%0D%0A%0D%0AThank you for your message. `}
                                className="w-full inline-flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                              >
                                <MessageSquare className="w-4 h-4" />
                                <span>Reply via Email</span>
                              </a>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Internal Notes</label>
                            <textarea
                              value={message.notes}
                              onChange={(e) => updateMessageNotes(message.id, e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                              placeholder="Add internal notes about this message..."
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Messages Yet</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Contact form submissions will appear here.
                          <br />
                          Messages are automatically saved when users submit the contact form.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Images Tab */}
              {activeTab === 'images' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Image Manager</h2>
                    <button
                      onClick={() => setShowImagePicker(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload & Manage Images</span>
                    </button>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">How to use images:</h3>
                    <ul className="text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
                      <li>Upload images using the button above</li>
                      <li>Copy image URLs from the image manager</li>
                      <li>Use the "Browse" button in projects and personal info to select uploaded images</li>
                      <li><strong>Click the edit icon</strong> next to image names to rename them</li>
                      <li>Images are stored in <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">/public/images/</code> folder</li>
                      <li>Supported formats: JPG, PNG, GIF, WebP, SVG (Max: 5MB)</li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h4>
                      <div className="space-y-3">
                        <button
                          onClick={() => setShowImagePicker(true)}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          <Upload className="w-5 h-5" />
                          <span>Upload New Image</span>
                        </button>
                        
                        <button
                          onClick={() => setShowImagePicker(true)}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                        >
                          <ImageIcon className="w-5 h-5" />
                          <span>Browse All Images</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Image Best Practices</h4>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>Use WebP format for better compression</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>Optimize images before upload (recommended size: 800x600px for projects)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>Use descriptive filenames (you can rename them after upload)</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>Click the edit icon to rename uploaded images</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>Keep file sizes under 1MB for better performance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'testimonials' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Testimonials Management</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Manage client testimonials and reviews
                      </p>
                    </div>
                    
                    <button
                      onClick={addTestimonial}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Testimonial</span>
                    </button>
                  </div>

                  {/* Testimonials Overview */}
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                      Testimonials Overview ({data.testimonials.length} total)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-green-800 dark:text-green-200">
                        <span className="font-medium">Total Reviews:</span> {data.testimonials.length}
                      </div>
                      <div className="text-green-800 dark:text-green-200">
                        <span className="font-medium">5-Star Reviews:</span> {data.testimonials.filter(t => t.rating === 5).length}
                      </div>
                      <div className="text-green-800 dark:text-green-200">
                        <span className="font-medium">Companies:</span> {new Set(data.testimonials.map(t => t.company)).size}
                      </div>
                      <div className="text-green-800 dark:text-green-200">
                        <span className="font-medium">Avg Rating:</span> {data.testimonials.length > 0 ? (data.testimonials.reduce((acc, t) => acc + t.rating, 0) / data.testimonials.length).toFixed(1) : '0'}⭐
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {data.testimonials.map((testimonial, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {testimonial.name || `Testimonial ${index + 1}`}
                            </h3>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  className={`w-4 h-4 ${
                                    starIndex < testimonial.rating
                                      ? 'text-yellow-400 fill-yellow-400'
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                ({testimonial.rating}/5)
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => duplicateTestimonial(index)}
                              className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                              title="Duplicate testimonial"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteTestimonial(index)}
                              className="text-red-600 hover:text-red-800 transition-colors p-1"
                              title="Delete testimonial"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name</label>
                            <input
                              type="text"
                              value={testimonial.name}
                              onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="Enter client name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                            <input
                              type="text"
                              value={testimonial.company}
                              onChange={(e) => updateTestimonial(index, 'company', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="Enter company name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role/Position</label>
                            <input
                              type="text"
                              value={testimonial.role}
                              onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="e.g., CEO, Product Manager"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                            <select
                              value={testimonial.rating}
                              onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                              <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                              <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                              <option value={3}>⭐⭐⭐ (3 Stars)</option>
                              <option value={2}>⭐⭐ (2 Stars)</option>
                              <option value={1}>⭐ (1 Star)</option>
                            </select>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Image</label>
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={testimonial.image || ''}
                                  onChange={(e) => updateTestimonial(index, 'image', e.target.value)}
                                  placeholder="Enter image URL, gradient class, or use image picker"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => openImagePicker('testimonial', 'image', index)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                              >
                                <ImageIcon className="w-4 h-4" />
                                <span>Browse</span>
                              </button>
                            </div>
                            {testimonial.image && (
                              <div className="mt-3">
                                {testimonial.image.startsWith('http') || testimonial.image.startsWith('/') ? (
                                  <img
                                    src={testimonial.image}
                                    alt="Client preview"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                                  />
                                ) : (
                                  <div className={`w-16 h-16 rounded-full ${testimonial.image} flex items-center justify-center text-white text-sm font-medium`}>
                                    {testimonial.name ? testimonial.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'CL'}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Testimonial Content</label>
                          <textarea
                            value={testimonial.content}
                            onChange={(e) => updateTestimonial(index, 'content', e.target.value)}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="Enter the testimonial content..."
                          />
                          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {testimonial.content?.length || 0} characters
                          </div>
                        </div>

                        {/* Testimonial Preview */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Preview:</h4>
                          <div className="text-sm text-gray-600 dark:text-gray-300 italic mb-2">
                            "{testimonial.content}"
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {testimonial.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {testimonial.role} at {testimonial.company}
                              </div>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(testimonial.rating)].map((_, starIndex) => (
                                <Star key={starIndex} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Empty state for testimonials */}
                    {data.testimonials.length === 0 && (
                      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                        <Star className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Testimonials Yet</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Start building social proof by adding your first client testimonial.
                          <br />
                          Great testimonials help build trust with potential clients.
                        </p>
                        <button
                          onClick={addTestimonial}
                          className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Your First Testimonial</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Telegram Bot Tab */}
              {activeTab === 'telegram' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Telegram Bot Configuration</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Configure Telegram bot for real-time contact form notifications
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium ${
                        telegramStatus?.connected 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          telegramStatus?.connected ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <span>{telegramStatus?.connected ? 'Connected' : 'Disconnected'}</span>
                      </div>
                      
                      <button
                        onClick={loadTelegramStatus}
                        className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Refresh Status</span>
                      </button>
                    </div>
                  </div>

                  {/* Configuration Status */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                      Setup Instructions
                    </h3>
                    <div className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                      <p><strong>1.</strong> Create a new bot by messaging @BotFather on Telegram</p>
                      <p><strong>2.</strong> Get your bot token and add it to your .env file as TELEGRAM_BOT_TOKEN</p>
                      <p><strong>3.</strong> Get your chat ID and add it to your .env file as TELEGRAM_CHAT_ID</p>
                      <p><strong>4.</strong> Test the connection using the button below</p>
                    </div>
                  </div>

                  {/* Bot Information */}
                  {telegramStatus?.botInfo && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
                        Bot Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-green-800 dark:text-green-200">Bot Name:</span>
                          <span className="ml-2 text-green-700 dark:text-green-300">{telegramStatus.botInfo.first_name}</span>
                        </div>
                        <div>
                          <span className="font-medium text-green-800 dark:text-green-200">Username:</span>
                          <span className="ml-2 text-green-700 dark:text-green-300">@{telegramStatus.botInfo.username}</span>
                        </div>
                        <div>
                          <span className="font-medium text-green-800 dark:text-green-200">Status:</span>
                          <span className="ml-2 text-green-700 dark:text-green-300">
                            {telegramStatus.botInfo.can_join_groups ? 'Active' : 'Limited'}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-green-800 dark:text-green-200">Type:</span>
                          <span className="ml-2 text-green-700 dark:text-green-300">
                            {telegramStatus.botInfo.is_bot ? 'Bot' : 'User'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Test Section */}
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Test Telegram Notifications
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Test Message
                        </label>
                        <textarea
                          value={telegramMessage}
                          onChange={(e) => setTelegramMessage(e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
                          placeholder="Enter a test message to send to your Telegram..."
                        />
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => {
                            const message = telegramMessage || 'Test notification from portfolio admin panel!'
                            setTelegramMessage(message)
                            testTelegram()
                          }}
                          disabled={telegramTesting}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors text-sm"
                        >
                          <Send className="w-4 h-4" />
                          <span>{telegramTesting ? 'Sending...' : 'Send Test Message'}</span>
                        </button>
                        
                        <button
                          onClick={loadTelegramStatus}
                          className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Check Bot Status</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Configuration Help */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                      Environment Variables
                    </h3>
                    <div className="space-y-2 text-yellow-800 dark:text-yellow-200 text-sm">
                      <p><strong>Required in your .env file:</strong></p>
                      <div className="bg-yellow-100 dark:bg-yellow-800/30 rounded p-2 font-mono text-xs">
                        <div>TELEGRAM_BOT_TOKEN=your_bot_token_here</div>
                        <div>TELEGRAM_CHAT_ID=your_chat_id_here</div>
                      </div>
                      <p className="mt-2">
                        <strong>To get your chat ID:</strong> Start a chat with your bot and visit 
                        <code className="bg-yellow-100 dark:bg-yellow-800/30 px-1 rounded mx-1">
                          https://api.telegram.org/bot&lt;YOUR_BOT_TOKEN&gt;/getUpdates
                        </code>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Picker Modal */}
      <ImagePicker
        isOpen={showImagePicker}
        selectedImage={currentImageField ? '' : undefined}
        onImageSelect={handleImageSelect}
        onClose={() => {
          setShowImagePicker(false)
          setCurrentImageField(null)
        }}
      />
    </div>
  )
}
