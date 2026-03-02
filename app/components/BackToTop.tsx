'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

interface BackToTopProps {
  show: boolean
  onClick: () => void
}

export default function BackToTop({ show, onClick }: BackToTopProps) {
  if (!show) return null

  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl z-50 flex items-center justify-center touch-manipulation"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ y: [-1, 1, -1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
      </motion.div>
    </motion.button>
  )
}
