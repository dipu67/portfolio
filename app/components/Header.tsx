'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface HeaderProps {
  scrollY: number
  activeSection: string
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

const navItems = ['home', 'about', 'skills', 'projects', 'contact']

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function Header({ scrollY, activeSection, isMenuOpen, setIsMenuOpen }: HeaderProps) {
  return (
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
            <Link href="/"> &lt;Dipu Dev/&gt;</Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
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
              </motion.button>
            ))}
          </div>

          {/* Mobile Controls */}
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

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 shadow-lg">
              <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item}`}
                    onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setTimeout(() => scrollToSection(item), 350); }}
                    className="block w-full text-left py-4 px-4 capitalize text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-all duration-300 text-lg font-medium touch-manipulation active:bg-blue-50 dark:active:bg-blue-900/20"
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
        )}
      </AnimatePresence>
    </nav>
  )
}
