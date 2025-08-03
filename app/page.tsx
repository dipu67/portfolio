'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
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
} from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollY, setScrollY] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const skills = [
    {
      category: 'Frontend Development',
      icon: <Globe className="w-7 h-7" />,
      color: 'blue',
      technologies: [
        { name: 'React.js', level: 95, description: 'Component-based UI development' },
        { name: 'Next.js', level: 90, description: 'Full-stack React framework' },
        { name: 'TypeScript', level: 85, description: 'Type-safe JavaScript' },
        { name: 'Tailwind CSS', level: 90, description: 'Utility-first CSS framework' },
        { name: 'HTML5/CSS3', level: 95, description: 'Modern web standards' }
      ]
    },
    {
      category: 'Backend Development',
      icon: <Server className="w-7 h-7" />,
      color: 'green',
      technologies: [
        { name: 'Node.js', level: 88, description: 'Server-side JavaScript runtime' },
        { name: 'Express.js', level: 92, description: 'Fast, minimalist web framework' },
        { name: 'REST APIs', level: 90, description: 'RESTful web services' },
        { name: 'GraphQL', level: 75, description: 'Query language for APIs' },
        { name: 'JWT Auth', level: 85, description: 'Secure authentication' }
      ]
    },
    {
      category: 'Database & Storage',
      icon: <Database className="w-7 h-7" />,
      color: 'purple',
      technologies: [
        { name: 'MongoDB', level: 88, description: 'NoSQL document database' },
        { name: 'Mongoose', level: 90, description: 'MongoDB object modeling' },
        { name: 'PostgreSQL', level: 75, description: 'Relational database' },
        { name: 'Redis', level: 70, description: 'In-memory data structure store' },
        { name: 'Database Design', level: 85, description: 'Schema design & optimization' }
      ]
    },
    {
      category: 'Tools & DevOps',
      icon: <Code className="w-7 h-7" />,
      color: 'orange',
      technologies: [
        { name: 'Git/GitHub', level: 92, description: 'Version control & collaboration' },
        { name: 'Docker', level: 80, description: 'Containerization platform' },
        { name: 'AWS/Vercel', level: 78, description: 'Cloud deployment platforms' },
        { name: 'CI/CD', level: 75, description: 'Automated deployment pipelines' },
        { name: 'Testing (Jest)', level: 82, description: 'Unit & integration testing' }
      ]
    }
  ]

  const projects = [
    {
      id: 1,
      title: 'E-Commerce MERN Platform',
      description: 'Full-stack e-commerce platform with comprehensive features including user authentication, payment processing, inventory management, and admin dashboard. Built with modern MERN stack technologies.',
      image: 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT', 'Tailwind CSS'],
      features: [
        'User Authentication & Authorization',
        'Stripe Payment Integration',
        'Real-time Inventory Management',
        'Admin Dashboard with Analytics',
        'Order Tracking System',
        'Product Reviews & Ratings',
        'Shopping Cart & Wishlist',
        'Email Notifications'
      ],
      github: 'https://github.com/yourusername/ecommerce-mern',
      live: 'https://ecommerce-demo.vercel.app',
      type: 'Full Stack',
      stats: { stars: 45, forks: 12, views: 1200 },
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Task Management System',
      description: 'Collaborative project management tool with real-time updates, drag-and-drop functionality, team management, and comprehensive project tracking features.',
      image: 'bg-gradient-to-br from-green-500 via-green-600 to-teal-600',
      technologies: ['Next.js', 'TypeScript', 'Express', 'Socket.io', 'MongoDB', 'Tailwind CSS'],
      features: [
        'Real-time Collaboration',
        'Drag & Drop Task Management',
        'Team Management & Roles',
        'File Upload & Sharing',
        'Progress Tracking & Analytics',
        'Notifications System',
        'Calendar Integration',
        'Time Tracking'
      ],
      github: 'https://github.com/yourusername/task-manager',
      live: 'https://taskmanager-demo.vercel.app',
      type: 'Full Stack',
      stats: { stars: 32, forks: 8, views: 890 },
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Social Media Analytics Dashboard',
      description: 'Comprehensive analytics dashboard for social media management with data visualization, automated reporting, and multi-platform integration capabilities.',
      image: 'bg-gradient-to-br from-pink-500 via-pink-600 to-rose-600',
      technologies: ['React', 'Express', 'MongoDB', 'Chart.js', 'REST APIs', 'Node.js'],
      features: [
        'Multi-platform Data Integration',
        'Interactive Data Visualization',
        'Automated Report Generation',
        'Real-time Analytics',
        'Custom Dashboard Creation',
        'Export Functionality',
        'Performance Metrics',
        'Trend Analysis'
      ],
      github: 'https://github.com/yourusername/social-analytics',
      live: 'https://analytics-demo.vercel.app',
      type: 'Full Stack',
      stats: { stars: 28, forks: 6, views: 750 },
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Real-time Chat Application',
      description: 'Modern chat application with real-time messaging, file sharing, group chats, video calls, and end-to-end encryption for secure communication.',
      image: 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-600',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Express', 'WebRTC'],
      features: [
        'Real-time Messaging',
        'File & Media Sharing',
        'Group Chat Management',
        'Video & Voice Calls',
        'End-to-end Encryption',
        'Message Search',
        'Online Status Indicators',
        'Push Notifications'
      ],
      github: 'https://github.com/yourusername/chat-app',
      live: 'https://chat-demo.vercel.app',
      type: 'Full Stack',
      stats: { stars: 67, forks: 15, views: 1500 },
      status: 'Completed'
    },
    {
      id: 5,
      title: 'Weather Analytics Platform',
      description: 'Comprehensive weather data platform with predictive analytics, interactive maps, customizable alerts, and detailed forecasting capabilities.',
      image: 'bg-gradient-to-br from-cyan-500 via-cyan-600 to-blue-500',
      technologies: ['Next.js', 'TypeScript', 'Express', 'MongoDB', 'Weather APIs', 'Chart.js'],
      features: [
        'Predictive Weather Analytics',
        'Interactive Weather Maps',
        'Custom Alert System',
        'Historical Data Analysis',
        'Multi-location Tracking',
        'Data Export & API',
        'Mobile Responsive Design',
        'Real-time Weather Updates'
      ],
      github: 'https://github.com/yourusername/weather-platform',
      live: 'https://weather-demo.vercel.app',
      type: 'Full Stack',
      stats: { stars: 23, forks: 5, views: 620 },
      status: 'In Progress'
    },
    {
      id: 6,
      title: 'Portfolio CMS Platform',
      description: 'Content management system for portfolios with drag-and-drop builder, SEO optimization, performance analytics, and multi-theme support.',
      image: 'bg-gradient-to-br from-violet-500 via-violet-600 to-purple-600',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'CMS Framework', 'SEO Tools'],
      features: [
        'Drag & Drop Page Builder',
        'SEO Optimization Tools',
        'Performance Analytics',
        'Multi-theme Support',
        'Content Scheduling',
        'Media Library Management',
        'Custom Domain Support',
        'Export/Import Functionality'
      ],
      github: 'https://github.com/yourusername/portfolio-cms',
      live: 'https://cms-demo.vercel.app',
      type: 'Full Stack',
      stats: { stars: 34, forks: 9, views: 980 },
      status: 'Completed'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Manager at TechCorp',
      content: 'Exceptional developer with deep understanding of modern web technologies. Delivered our e-commerce platform ahead of schedule with outstanding quality.',
      rating: 5,
      image: 'bg-gradient-to-br from-pink-500 to-rose-500',
      company: 'TechCorp'
    },
    {
      name: 'Mike Chen',
      role: 'CTO at StartupXYZ',
      content: 'Outstanding full-stack developer. Built our entire platform from scratch using MERN stack. Professional, reliable, and highly skilled.',
      rating: 5,
      image: 'bg-gradient-to-br from-blue-500 to-indigo-500',
      company: 'StartupXYZ'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder at InnovateLab',
      content: 'Transformed our vision into reality with clean, scalable code. Expert in React and Node.js. Highly recommend for any web development project.',
      rating: 5,
      image: 'bg-gradient-to-br from-green-500 to-teal-500',
      company: 'InnovateLab'
    }
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              &lt;DevPortfolio/&gt;
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`px-4 py-2 rounded-lg capitalize transition-all duration-300 relative overflow-hidden group ${
                    activeSection === item
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>

            {/* Enhanced Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
              >
                <div className="flex justify-center items-center w-5 h-5 text-2xl">
                  {theme === 'dark' ? <Sun className='text-yellow-500'/> : <Moon className='text-gray-500' />}
                </div>
              </button>
              
              <button
                className="md:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50">
            <div className="px-4 py-6 space-y-3">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="block py-3 px-4 capitalize text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            {/* Enhanced Profile Picture */}
            <div className="relative w-48 h-48 mx-auto mb-8 group">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-1 animate-spin-slow">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/profile.png"
                    alt="Profile Picture"
                    width={180}
                    height={180}
                    className="w-full h-full object-cover rounded-full"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse rounded-full"></div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-4 border-white dark:border-gray-900 flex items-center justify-center shadow-xl">
                <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
              </div>
              <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce delay-500">
                <Sparkles className="w-4 h-4 text-white m-1" />
              </div>
            </div>

            {/* Enhanced Title */}
            <div className="space-y-4 mb-8">
              <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
                Full Stack
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                  Developer
                </span>
              </h1>
              <div className="flex justify-center items-center space-x-2 text-sm font-medium">
                <Zap className="w-4 h-4 text-yellow-500 animate-pulse" />
                <span className="text-gray-600 dark:text-gray-400">Available for new projects</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Enhanced Description */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
              Passionate about creating exceptional digital experiences with modern technologies. 
              Specializing in{' '}
              <span className="font-bold text-blue-600 dark:text-blue-400 animate-pulse">React</span>,{' '}
              <span className="font-bold text-gray-900 dark:text-white animate-pulse delay-100">Next.js</span>, and the{' '}
              <span className="font-bold text-green-600 dark:text-green-400 animate-pulse delay-200">MERN stack</span>.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg"
              >
                <span className="flex items-center space-x-2">
                  <span>Explore My Work</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
              
              <a
                href="#contact"
                className="group relative px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              >
                <span className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Let's Connect</span>
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: '3+', label: 'Years Experience', icon: Calendar, color: 'blue' },
                { value: '50+', label: 'Projects Done', icon: CheckCircle, color: 'green' },
                { value: '25+', label: 'Happy Clients', icon: Users, color: 'purple' },
                { value: '24/7', label: 'Support', icon: Award, color: 'pink' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              <span>About Me</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Crafting Digital Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              That make a difference in people's lives through innovative technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                Building the Future, One Line of Code at a Time
              </h3>
              
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                <p>
                  I'm a passionate Full Stack Developer with over 3 years of experience creating 
                  robust, scalable web applications. My journey in tech started with curiosity 
                  and has evolved into a deep expertise in modern JavaScript ecosystems.
                </p>
                <p>
                  I specialize in the{' '}
                  <span className="font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    MERN stack
                  </span>{' '}
                  (MongoDB, Express.js, React, Node.js) and have extensive experience with{' '}
                  <span className="font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Next.js
                  </span>{' '}
                  for building performant, SEO-friendly applications.
                </p>
                <p>
                  My approach combines technical expertise with creative problem-solving to deliver 
                  solutions that not only meet requirements but exceed expectations.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">San Francisco, CA</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Available for Projects</span>
                </div>
              </div>

              <a
                href="#"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-3xl p-8 text-white shadow-2xl transform  hover:rotate-1 transition-transform duration-500">
                <h4 className="text-2xl font-bold mb-8 flex items-center">
                  <Sparkles className="w-6 h-6 mr-2" />
                  What I Bring to Your Project
                </h4>
                <div className="space-y-6">
                  {[
                    { title: 'Full Stack Expertise', desc: 'End-to-end development from database design to user interface' },
                    { title: 'Modern Technologies', desc: 'Latest frameworks and tools for optimal performance' },
                    { title: 'Problem Solving', desc: 'Creative solutions for complex technical challenges' },
                    { title: 'Continuous Learning', desc: 'Always staying updated with industry trends' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 group">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-lg mb-1">{item.title}</h5>
                        <p className="text-white/80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Code className="w-4 h-4" />
              <span>Skills & Technologies</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Technologies I Master
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Building powerful applications with cutting-edge tools and frameworks
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => {
              const colorMap: Record<string, { bg: string; darkBg: string; text: string; bar: string; gradient: string }> = {
                blue: { bg: 'bg-blue-100', darkBg: 'dark:bg-blue-900/20', text: 'text-blue-600', bar: 'bg-blue-600', gradient: 'from-blue-400 to-blue-600' },
                green: { bg: 'bg-green-100', darkBg: 'dark:bg-green-900/20', text: 'text-green-600', bar: 'bg-green-600', gradient: 'from-green-400 to-green-600' },
                purple: { bg: 'bg-purple-100', darkBg: 'dark:bg-purple-900/20', text: 'text-purple-600', bar: 'bg-purple-600', gradient: 'from-purple-400 to-purple-600' },
                orange: { bg: 'bg-orange-100', darkBg: 'dark:bg-orange-900/20', text: 'text-orange-600', bar: 'bg-orange-600', gradient: 'from-orange-400 to-orange-600' }
              }
              const color = colorMap[skillGroup.color] || colorMap.blue

              return (
                <div
                  key={index}
                  className="group bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
                  
                  <div className={`w-16 h-16 ${color.bg} ${color.darkBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <div className={color.text}>{skillGroup.icon}</div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {skillGroup.category}
                  </h3>
                  
                  <div className="space-y-5">
                    {skillGroup.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="group/tech">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-700 dark:text-gray-300 font-semibold">
                            {tech.name}
                          </span>
                          <span className="text-gray-500 dark:text-gray-400 font-medium">
                            {tech.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-3 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${color.gradient} shadow-sm`}
                            style={{ width: `${tech.level}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300">
                          {tech.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              <span>Featured Projects</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              My Latest Work
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A showcase of recent projects demonstrating technical expertise and creative solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className={`h-64 ${project.image} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  
                  <div className="absolute top-6 left-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg ${
                      project.status === 'Completed' ? 'bg-green-500/90' : 'bg-yellow-500/90'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="absolute top-6 right-6">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {project.type}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-6 left-6 flex space-x-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <GitFork className="w-4 h-4" />
                      <span className="text-sm font-medium">{project.stats.forks}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">{project.stats.views}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Key Features:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {project.features.slice(0, 4).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    {project.features.length > 4 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
                        +{project.features.length - 4} more features
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                      <Github className="w-5 h-5" />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="https://github.com/dipu67"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <Github className="w-5 h-5" />
              <span>View All Projects on GitHub</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
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
            {testimonials.map((testimonial, index) => (
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

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Mail className="w-4 h-4" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project and create something amazing
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Let's Connect
              </h3>
              
              <div className="space-y-6">
                {[
                  { icon: Mail, title: 'Email', value: 'email@example.com', href: 'mailto:email@example.com', color: 'blue' },
                  { icon: Phone, title: 'Phone', value: '+1 (234) 567-8900', href: 'tel:+1234567890', color: 'green' },
                  { icon: MapPin, title: 'Location', value: 'Bangladesh', href: '#', color: 'purple' }
                ].map((contact, index) => (
                  <a
                    key={index}
                    href={contact.href}
                    className="group flex items-center space-x-6 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className={`w-16 h-16 bg-${contact.color}-100 dark:bg-${contact.color}-900/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <contact.icon className={`w-8 h-8 text-${contact.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                        {contact.title}
                      </h4>
                      <p className={`text-${contact.color}-600 dark:text-${contact.color}-400 font-medium`}>
                        {contact.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-8">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-6">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Github, href: 'https://github.com/yourusername', color: 'bg-gray-800 hover:bg-gray-700' },
                    { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', color: 'bg-blue-600 hover:bg-blue-700' },
                    { icon: Mail, href: 'mailto:your.email@example.com', color: 'bg-red-600 hover:bg-red-700' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-14 h-14 ${social.color} text-white rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Send Message</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
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
                { icon: Github, href: 'https://github.com/yourusername' },
                { icon: Linkedin, href: 'https://linkedin.com/in/yourusername' },
                { icon: Mail, href: 'mailto:your.email@example.com' }
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

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
